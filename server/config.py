from dotenv import load_dotenv
import os

load_dotenv()

CLIENT_URL = os.getenv("CLIENT_URL")
DB_URL = os.getenv("DB_URL")
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")
