import os
import requests
from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import FileResponse
from dotenv import load_dotenv

load_dotenv()
app = FastAPI()