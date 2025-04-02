from fastapi import FastAPI
from pymongo import MongoClient
from dotenv  import load_dotenv
import os

load_dotenv()

app = FastAPI()

client = MongoClient(os.getenv("MONGO_URI"))
db = client["sample_mflix"]

@app.get("/comments")
def listar_comentarios():
    comentarios = db.comments.find()
    return {"comments": list(comentarios)}

@app.post("/comments")
def agregar_comentario(comentario: dict):
    db.comments.insert_one(comentario)
    return {"message": "Comentario agregado exitosamente"}

