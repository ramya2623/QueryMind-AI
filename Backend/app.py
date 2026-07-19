from fastapi import FastAPI, UploadFile, File
import pandas as pd
import os

app = FastAPI()

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

    preview = df.head().to_dict(orient="records")

    return {
        "filename": file.filename,
        "preview": preview,
        "rows": len(df),
        "columns": list(df.columns)
    }