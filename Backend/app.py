from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

import pandas as pd
import sqlite3
import os
import uuid
import json

from dotenv import load_dotenv
from google import genai


app = FastAPI()


# --------------------------------------------------
# CORS
# --------------------------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://query-mind-ai-eight.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --------------------------------------------------
# GEMINI
# --------------------------------------------------

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)


# --------------------------------------------------
# REQUEST MODEL
# --------------------------------------------------

class Question(BaseModel):
    dataset_id: int
    question: str


# --------------------------------------------------
# UPLOAD FOLDER
# --------------------------------------------------

UPLOAD_FOLDER = "uploads"

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)


# --------------------------------------------------
# DATABASE INITIALIZATION
# --------------------------------------------------

def init_db():

    conn = sqlite3.connect("querymind.db")
    cursor = conn.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS datasets(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            filename TEXT,
            table_name TEXT,
            rows INTEGER,
            columns TEXT,
            questions_asked INTEGER DEFAULT 0
        )
    """)

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS queries(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            dataset_id INTEGER,
            question TEXT,
            generated_sql TEXT
        )
    """)

    conn.commit()
    conn.close()


init_db()

def update_queries_table():

    conn = sqlite3.connect("querymind.db")
    cursor = conn.cursor()

    columns = cursor.execute(
        "PRAGMA table_info(queries)"
    ).fetchall()

    column_names = [column[1] for column in columns]

    if "results_json" not in column_names:
        cursor.execute(
            """
            ALTER TABLE queries
            ADD COLUMN results_json TEXT
            """
        )

    if "insight" not in column_names:
        cursor.execute(
            """
            ALTER TABLE queries
            ADD COLUMN insight TEXT
            """
        )

    conn.commit()
    conn.close()


update_queries_table()


# --------------------------------------------------
# HOME
# --------------------------------------------------

@app.get("/")
def home():

    return {
        "message": "QueryMind AI Backend Running"
    }


# --------------------------------------------------
# UPLOAD CSV
# --------------------------------------------------

@app.post("/upload")
async def upload_csv(file: UploadFile = File(...)):

    file_path = os.path.join(
        UPLOAD_FOLDER,
        file.filename
    )

    with open(file_path, "wb") as buffer:
        buffer.write(await file.read())

    df = pd.read_csv(file_path)

    conn = sqlite3.connect("querymind.db")

    base_table_name = (
        file.filename
        .replace(".csv", "")
        .replace(" ", "_")
        .replace("-", "_")
        .lower()
    )

    table_name = (
        f"{base_table_name}_"
        f"{uuid.uuid4().hex[:6]}"
    )

    df.to_sql(
        table_name,
        conn,
        if_exists="replace",
        index=False
    )

    cursor = conn.cursor()

    cursor.execute(
        """
        INSERT INTO datasets
        (filename, table_name, rows, columns)
        VALUES (?, ?, ?, ?)
        """,
        (
            file.filename,
            table_name,
            len(df),
            json.dumps(list(df.columns))   
        )
    )

    conn.commit()
    conn.close()

    preview = df.head().to_dict(
        orient="records"
    )

    return {
        "filename": file.filename,
        "preview": preview,
        "rows": len(df),
        "columns": list(df.columns),
        "table_name": table_name,
        "message": "CSV uploaded successfully"
    }


# --------------------------------------------------
# GET DATASETS
# --------------------------------------------------

@app.get("/datasets")
def get_datasets():

    conn = sqlite3.connect("querymind.db")

    df = pd.read_sql_query(
        "SELECT * FROM datasets ORDER BY id DESC",
        conn
    )

    conn.close()

    return df.to_dict(
        orient="records"
    )

# --------------------------------------------------
# DELETE DATASET
# --------------------------------------------------

@app.delete("/datasets/{dataset_id}")
def delete_dataset(dataset_id: int):

    conn = sqlite3.connect("querymind.db")

    try:

        # Find dataset
        dataset = conn.execute(
            """
            SELECT table_name
            FROM datasets
            WHERE id=?
            """,
            (dataset_id,)
        ).fetchone()

        if not dataset:
            return {
                "error": "Dataset not found"
            }

        table_name = dataset[0]

        # Delete the actual uploaded data table
        conn.execute(
            f'DROP TABLE IF EXISTS "{table_name}"'
        )

        # Delete query history belonging to dataset
        conn.execute(
            """
            DELETE FROM queries
            WHERE dataset_id=?
            """,
            (dataset_id,)
        )

        # Delete dataset record
        conn.execute(
            """
            DELETE FROM datasets
            WHERE id=?
            """,
            (dataset_id,)
        )

        conn.commit()

        return {
            "message": "Dataset deleted successfully",
            "dataset_id": dataset_id
        }

    except Exception as e:

        conn.rollback()

        print("DELETE ERROR:", str(e))

        return {
            "error": str(e)
        }

    finally:

        conn.close()


# --------------------------------------------------
# GET DATA
# --------------------------------------------------

@app.get("/data/{table_name}")
def get_data(table_name: str):

    conn = sqlite3.connect("querymind.db")

    df = pd.read_sql_query(
        f"""
        SELECT *
        FROM {table_name}
        LIMIT 10
        """,
        conn
    )

    conn.close()

    return df.to_dict(
        orient="records"
    )


# --------------------------------------------------
# GEMINI TEST
# --------------------------------------------------

@app.get("/gemini-test")
def gemini_test():

    try:

        response = client.models.generate_content(
            model="gemini-3.5-flash-lite",
            contents="Say hello!"
        )

        return {
            "response": response.text
        }

    except Exception as e:

        return {
            "error": str(e),
            "type": type(e).__name__
        }


# --------------------------------------------------
# GENERATE SQL
# --------------------------------------------------

def generate_sql(
    question,
    table_name,
    columns,
    sample_values
):

    prompt = f"""
You are an expert SQLite SQL generator for a data analytics application.

Your ONLY task is to convert the user's question into ONE SQL query
that answers the question using ONLY the specified table.

STRICT RULES:

1. Return ONLY the SQL query.
2. Do NOT explain anything.
3. Do NOT use markdown or code fences.
4. NEVER query sqlite_master.
5. NEVER query system tables.
6. NEVER query any table other than the specified table.
7. Use ONLY the columns provided below.
8. When filtering text, use the exact values that exist in the dataset.
9. Do not pluralize, singularize, or otherwise modify dataset values.
10. The SQL must be valid SQLite.
11. Always use the specified table name.
12. Do not invent values that are not present in the sample data.
13. Do not use tables mentioned in the user's question.
14. The table name MUST be exactly:
{table_name}

Table Name:
{table_name}

Columns:
{columns}

Sample Values:
{sample_values}

User Question:
{question}

Return ONLY the SQL query.
"""

    response = client.models.generate_content(
        model="gemini-3.5-flash-lite",
        contents=prompt
    )

    sql = response.text.strip()

    sql = sql.replace("```sql", "")
    sql = sql.replace("```", "")
    sql = sql.strip()

    return sql


# --------------------------------------------------
# ASK
# --------------------------------------------------

# --------------------------------------------------
# ASK
# --------------------------------------------------

# --------------------------------------------------
# ASK
# --------------------------------------------------

@app.post("/ask")
def ask(question: Question):

    conn = sqlite3.connect("querymind.db")

    try:

        # ------------------------------------------
        # Find dataset
        # ------------------------------------------

        dataset = pd.read_sql_query(
            """
            SELECT *
            FROM datasets
            WHERE id=?
            """,
            conn,
            params=(question.dataset_id,)
        )

        if dataset.empty:
            return {
                "error": "Dataset not found"
            }

        # ------------------------------------------
        # Get dataset information
        # ------------------------------------------

        table_name = dataset.iloc[0]["table_name"]
        columns = dataset.iloc[0]["columns"]

        # ------------------------------------------
        # Get sample data
        # ------------------------------------------

        sample_data = pd.read_sql_query(
            f'SELECT * FROM "{table_name}" LIMIT 20',
            conn
        )

        sample_values = sample_data.to_dict(
            orient="records"
        )

        # ------------------------------------------
        # Generate SQL
        # ------------------------------------------

        sql_query = generate_sql(
            question.question,
            table_name,
            columns,
            sample_values
        )

        print("\n========================")
        print("QUESTION:")
        print(question.question)

        print("\nGENERATED SQL:")
        print(sql_query)

        print("========================\n")

        # ------------------------------------------
        # Safety check
        # ------------------------------------------

        sql_lower = sql_query.lower()

        if "sqlite_master" in sql_lower:
            return {
                "error": "Generated SQL attempted to access a system table."
            }

        if "pragma " in sql_lower:
            return {
                "error": "Generated SQL attempted to use PRAGMA."
            }

        # ------------------------------------------
        # Execute SQL
        # ------------------------------------------

        df = pd.read_sql_query(
            sql_query,
            conn
        )

        # ------------------------------------------
        # Prepare results
        # ------------------------------------------

        results = df.to_dict(
            orient="records"
        )

        # ------------------------------------------
        # Generate AI insight
        # ------------------------------------------

        insight = ""

        try:

            insight_prompt = f"""
You are an analytics assistant for an Indian business analytics application.

IMPORTANT:
- All monetary values in the dataset are in Indian Rupees (INR).
- Always represent money using the Indian Rupee symbol ₹.
- NEVER use $, USD, dollars, or any other currency.
- If you mention a monetary amount, format it as ₹ followed by the amount.
- Do not convert the values to another currency.

User question:
{question.question}

SQL query:
{sql_query}

Results:
{results}

Give one short, useful business insight based ONLY on these results.

Do not invent information.
Do not use markdown.
Keep it to 1-2 sentences.
"""

            insight_response = client.models.generate_content(
                model="gemini-3.5-flash-lite",
                contents=insight_prompt
            )

            insight = insight_response.text.strip()

        except Exception as e:

            print(
                "INSIGHT ERROR:",
                str(e)
            )

            insight = "No AI insight was generated for this query."

        # ------------------------------------------
        # Save query history
        # ------------------------------------------

        cursor = conn.cursor()

        cursor.execute(
            """
            INSERT INTO queries
            (dataset_id, question, generated_sql, results_json, insight)
            VALUES (?, ?, ?, ?, ?)
            """,
            (
                question.dataset_id,
                question.question,
                sql_query,
                json.dumps(results),
                insight
            )
        )

        # ------------------------------------------
        # Update question count
        # ------------------------------------------

        cursor.execute(
            """
            UPDATE datasets
            SET questions_asked = questions_asked + 1
            WHERE id=?
            """,
            (
                question.dataset_id,
            )
        )

        conn.commit()

        # ------------------------------------------
        # Return response
        # ------------------------------------------

        return {
            "dataset": table_name,
            "question": question.question,
            "generated_sql": sql_query,
            "results": results,
            "insight": insight
        }

    except Exception as e:

        print(
            "ERROR:",
            str(e)
        )

        return {
            "error": str(e)
        }

    finally:

        conn.close()
@app.get("/history/{dataset_id}")
def get_history(dataset_id: int):

    conn = sqlite3.connect("querymind.db")

    df = pd.read_sql_query(
        """
        SELECT
            id,
            question,
            generated_sql
        FROM queries
        WHERE dataset_id=?
        ORDER BY id DESC
        """,
        conn,
        params=(dataset_id,)
    )

    conn.close()

    return df.to_dict(
        orient="records"
    )

@app.get("/analytics")
def get_analytics():

    conn = sqlite3.connect("querymind.db")

    try:

        # --------------------------------------------------
        # BASIC COUNTS
        # --------------------------------------------------

        total_datasets = conn.execute(
            "SELECT COUNT(*) FROM datasets"
        ).fetchone()[0]

        total_rows = conn.execute(
            "SELECT COALESCE(SUM(rows), 0) FROM datasets"
        ).fetchone()[0]

        total_questions = conn.execute(
            "SELECT COUNT(*) FROM queries"
        ).fetchone()[0]


        # --------------------------------------------------
        # TOTAL COLUMNS
        # --------------------------------------------------

        total_columns = 0

        dataset_records = conn.execute(
            "SELECT columns FROM datasets"
        ).fetchall()

        for row in dataset_records:

            try:

                columns = json.loads(row[0])

                total_columns += len(columns)

            except Exception:

                pass


        # --------------------------------------------------
        # BUSINESS ANALYTICS
        # --------------------------------------------------

        total_sales = 0
        total_revenue = 0
        total_orders = 0
        total_customers = 0


        # --------------------------------------------------
        # CHART DATA
        # --------------------------------------------------

        product_sales = {}
        region_sales = {}


        # --------------------------------------------------
        # GET ALL UPLOADED DATASETS
        # --------------------------------------------------

        datasets = conn.execute(
            """
            SELECT table_name
            FROM datasets
            """
        ).fetchall()


        for dataset in datasets:

            table_name = dataset[0]

            try:

                # --------------------------------------------------
                # GET COLUMN NAMES
                # --------------------------------------------------

                table_info = conn.execute(
                    f'PRAGMA table_info("{table_name}")'
                ).fetchall()

                column_names = [
                    column[1]
                    for column in table_info
                ]

                lower_columns = {
                    column.lower(): column
                    for column in column_names
                }


                # --------------------------------------------------
                # FIND SALES COLUMN
                # --------------------------------------------------

                sales_column = None

                sales_names = [
                    "sales",
                    "total_sales",
                    "sale",
                    "selling_price"
                ]

                for name in sales_names:

                    if name in lower_columns:

                        sales_column = lower_columns[name]

                        break


                # --------------------------------------------------
                # FIND REVENUE COLUMN
                # --------------------------------------------------

                revenue_column = None

                revenue_names = [
                    "revenue",
                    "total_revenue",
                    "income",
                    "turnover"
                ]

                for name in revenue_names:

                    if name in lower_columns:

                        revenue_column = lower_columns[name]

                        break


                # --------------------------------------------------
                # TOTAL SALES
                # --------------------------------------------------

                if sales_column:

                    result = conn.execute(
                        f'''
                        SELECT COALESCE(
                            SUM("{sales_column}"), 0
                        )
                        FROM "{table_name}"
                        '''
                    ).fetchone()[0]

                    total_sales += result or 0


                # --------------------------------------------------
                # TOTAL REVENUE
                # --------------------------------------------------

                if revenue_column:

                    result = conn.execute(
                        f'''
                        SELECT COALESCE(
                            SUM("{revenue_column}"), 0
                        )
                        FROM "{table_name}"
                        '''
                    ).fetchone()[0]

                    total_revenue += result or 0

                elif sales_column:

                    # If no revenue column exists,
                    # use sales as revenue.

                    result = conn.execute(
                        f'''
                        SELECT COALESCE(
                            SUM("{sales_column}"), 0
                        )
                        FROM "{table_name}"
                        '''
                    ).fetchone()[0]

                    total_revenue += result or 0


                # --------------------------------------------------
                # FIND PRODUCT COLUMN
                # --------------------------------------------------

                product_column = None

                product_names = [
                    "product",
                    "product_name",
                    "item",
                    "item_name",
                    "productname"
                ]

                for name in product_names:

                    if name in lower_columns:

                        product_column = lower_columns[name]

                        break


                # --------------------------------------------------
                # SALES BY PRODUCT
                # --------------------------------------------------

                if product_column and sales_column:

                    rows = conn.execute(
                        f'''
                        SELECT
                            "{product_column}",
                            COALESCE(SUM("{sales_column}"), 0)
                        FROM "{table_name}"
                        WHERE "{product_column}" IS NOT NULL
                        GROUP BY "{product_column}"
                        '''
                    ).fetchall()


                    for product, value in rows:

                        product_name = str(product).strip()

                        product_sales[product_name] = (
                            product_sales.get(product_name, 0)
                            + (value or 0)
                        )


                # --------------------------------------------------
                # FIND REGION COLUMN
                # --------------------------------------------------

                region_column = None

                region_names = [
                    "region",
                    "area",
                    "zone",
                    "location"
                ]

                for name in region_names:

                    if name in lower_columns:

                        region_column = lower_columns[name]

                        break


                # --------------------------------------------------
                # SALES BY REGION
                # --------------------------------------------------

                if region_column and sales_column:

                    rows = conn.execute(
                        f'''
                        SELECT
                            "{region_column}",
                            COALESCE(SUM("{sales_column}"), 0)
                        FROM "{table_name}"
                        WHERE "{region_column}" IS NOT NULL
                        GROUP BY "{region_column}"
                        '''
                    ).fetchall()


                    for region, value in rows:

                        region_name = str(region).strip()

                        region_sales[region_name] = (
                            region_sales.get(region_name, 0)
                            + (value or 0)
                        )


                # --------------------------------------------------
                # FIND ORDER COLUMN
                # --------------------------------------------------

                order_column = None

                order_names = [
                    "order_id",
                    "orderid",
                    "order",
                    "order_number",
                    "order_no"
                ]

                for name in order_names:

                    if name in lower_columns:

                        order_column = lower_columns[name]

                        break


                # --------------------------------------------------
                # COUNT ORDERS
                # --------------------------------------------------

                if order_column:

                    result = conn.execute(
                        f'''
                        SELECT COUNT(
                            DISTINCT "{order_column}"
                        )
                        FROM "{table_name}"
                        '''
                    ).fetchone()[0]

                    total_orders += result or 0

                else:

                    result = conn.execute(
                        f'''
                        SELECT COUNT(*)
                        FROM "{table_name}"
                        '''
                    ).fetchone()[0]

                    total_orders += result or 0


                # --------------------------------------------------
                # FIND CUSTOMER COLUMN
                # --------------------------------------------------

                customer_column = None

                customer_names = [
                    "customer_id",
                    "customerid",
                    "customer",
                    "customer_name",
                    "customer_no",
                    "customer_number"
                ]

                for name in customer_names:

                    if name in lower_columns:

                        customer_column = lower_columns[name]

                        break


                # --------------------------------------------------
                # COUNT CUSTOMERS
                # --------------------------------------------------

                if customer_column:

                    result = conn.execute(
                        f'''
                        SELECT COUNT(
                            DISTINCT "{customer_column}"
                        )
                        FROM "{table_name}"
                        WHERE "{customer_column}" IS NOT NULL
                        '''
                    ).fetchone()[0]

                    total_customers += result or 0


            except Exception as e:

                print(
                    f"Analytics error for {table_name}: {e}"
                )


        # --------------------------------------------------
        # FORMAT CHART DATA
        # --------------------------------------------------

        sales_by_product = [
            {
                "name": product,
                "value": value
            }
            for product, value in product_sales.items()
        ]


        sales_by_region = [
            {
                "name": region,
                "value": value
            }
            for region, value in region_sales.items()
        ]


        # --------------------------------------------------
        # SORT CHART DATA
        # --------------------------------------------------

        sales_by_product.sort(
            key=lambda x: x["value"],
            reverse=True
        )

        sales_by_region.sort(
            key=lambda x: x["value"],
            reverse=True
        )


        # --------------------------------------------------
        # RETURN ANALYTICS
        # --------------------------------------------------

        return {

            "total_datasets": total_datasets,

            "total_rows": total_rows,

            "total_columns": total_columns,

            "total_questions": total_questions,

            "total_sales": total_sales,

            "total_revenue": total_revenue,

            "orders": total_orders,

            "customers": total_customers,

            "sales_by_product": sales_by_product,

            "sales_by_region": sales_by_region

        }


    except Exception as e:

        print(
            "ANALYTICS ERROR:",
            str(e)
        )

        return {
            "error": str(e)
        }


    finally:

        conn.close()

@app.get("/history")
def get_all_history():

    conn = sqlite3.connect("querymind.db")

    df = pd.read_sql_query(
        """
        SELECT
            queries.id,
            queries.question,
            queries.generated_sql,
            queries.dataset_id,
            datasets.filename
        FROM queries
        LEFT JOIN datasets
        ON queries.dataset_id = datasets.id
        ORDER BY queries.id DESC
        """,
        conn
    )

    conn.close()

    return df.to_dict(orient="records")
# --------------------------------------------------
# GET SINGLE QUERY HISTORY
# --------------------------------------------------

@app.get("/history/query/{query_id}")
def get_history_query(query_id: int):

    conn = sqlite3.connect("querymind.db")

    try:

        query = conn.execute(
            """
            SELECT
                queries.id,
                queries.question,
                queries.generated_sql,
                queries.results_json,
                queries.insight,
                queries.dataset_id,
                datasets.filename
            FROM queries
            LEFT JOIN datasets
            ON queries.dataset_id = datasets.id
            WHERE queries.id=?
            """,
            (query_id,)
        ).fetchone()

        if not query:

            return {
                "error": "Query not found"
            }

        return {
            "id": query[0],
            "question": query[1],
            "generated_sql": query[2],
            "results": json.loads(query[3]) if query[3] else [],
            "insight": query[4] or "",
            "dataset_id": query[5],
            "filename": query[6]
        }

    except Exception as e:

        print("HISTORY QUERY ERROR:", str(e))

        return {
            "error": str(e)
        }

    finally:

        conn.close()