from flask import Flask
from flask_cors import CORS

from config import Config
from database.db import db

app = Flask(__name__)
app.config.from_object(Config)

CORS(app)

db.init_app(app)


@app.route("/")
def home():
    return {
        "message": "BuildCraft Backend is Running 🚀"
    }


@app.route("/test-db")
def test_db():
    try:
        db.session.execute(db.text("SELECT 1"))
        return {
            "status": "success",
            "message": "Database Connected Successfully ✅"
        }
    except Exception as e:
        return {
            "status": "error",
            "message": str(e)
        }, 500

if __name__ == "__main__":
    app.run(debug=True)