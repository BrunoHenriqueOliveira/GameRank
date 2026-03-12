from flask import Flask, jsonify
from pymongo import MongoClient
import os

app = Flask(__name__)

mongo_uri = os.getenv("MONGO_URI", "mongodb://localhost:27017/gamerankdb")

client = MongoClient(mongo_uri)
db = client["gamerankdb"]
reviews = db["reviews"]


@app.route("/health")
def health():
    return jsonify({"status": "ok"})


@app.route("/recommendations")
def recommendations():
    data = list(reviews.find({}, {"_id": 0}))

    return jsonify({
        "total_reviews": len(data),
        "message": "Recommendation service running"
    })


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)