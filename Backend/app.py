from fastapi import FastAPI, UploadFile, File
import pandas as pd
import sqlite3
import os

from google import genai
from dotenv import load_dotenv

from pydantic import BaseModel

load_dotenv()

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

app = FastAPI()
class Question(BaseModel):
    question: str

UPLOAD_FOLDER = "uploads"

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)


@app.get("/")
def home():
    return {"message": "QueryMind AI Backend Running"}


@app.post("/upload")
async def upload_csv(file: UploadFile = File(...)):

    file_path = os.path.join(UPLOAD_FOLDER, file.filename)

    with open(file_path, "wb") as buffer:
        buffer.write(await file.read())

    df = pd.read_csv(file_path)

    conn = sqlite3.connect("querymind.db")

    table_name = "uploaded_data"

    df.to_sql(table_name, conn, if_exists="replace", index=False)

    conn.close()

    preview = df.head().to_dict(orient="records")

    return {
        "filename": file.filename,
        "preview": preview,
        "rows": len(df),
        "columns": list(df.columns),
        "table_name": table_name,
        "message": "CSV uploaded and stored successfully"
    }

@app.get("/data")
def get_data():

    conn = sqlite3.connect("querymind.db")

    query = "SELECT * FROM uploaded_data LIMIT 10"

    df = pd.read_sql_query(query, conn)

    conn.close()

    return df.to_dict(orient="records")

@app.get("/gemini-test")
def gemini_test():
    try:
        response = client.models.generate_content(
            model="gemini-2.0-flash",
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

@app.post("/ask")
def ask(question: Question):

    user_question = question.question.lower()

    if "south" in user_question:
        sql_query = "SELECT * FROM uploaded_data WHERE region='South'"

    elif "north" in user_question:
        sql_query = "SELECT * FROM uploaded_data WHERE region='North'"

    elif "laptop" in user_question:
        sql_query = "SELECT * FROM uploaded_data WHERE product='Laptop'"

    elif "sales" in user_question:
        sql_query = "SELECT product, SUM(sales) AS total_sales FROM uploaded_data GROUP BY product"

    else:
        sql_query = "SELECT * FROM uploaded_data"

    conn = sqlite3.connect("querymind.db")

    df = pd.read_sql_query(sql_query, conn)

    conn.close()

    return {
        "question": question.question,
        "generated_sql": sql_query,
        "results": df.to_dict(orient="records")
    }