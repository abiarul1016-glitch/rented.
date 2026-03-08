from flask import Flask, request, jsonify
from flask_cors import CORS
import json

from kijiji_V2 import kijiji_scraper

app = Flask(__name__)
CORS(app)  # allows your React UI to talk to this server

class Listing:
    def __init__(self, title, price, location, description, image,
                 bedrooms, bathrooms, size_sqft, unit_type,
                 parking_included, illegal_flags, url, date_posted):
        self.title = title
        self.price = price
        self.location = location
        self.description = description
        self.image = image
        self.bedrooms = bedrooms
        self.bathrooms = bathrooms
        self.size_sqft = size_sqft
        self.unit_type = unit_type
        self.parking_included = parking_included
        self.url = url
        self.date_posted = date_posted
        self.score = 0
        self.illegal_flags = illegal_flags


def get_filtered(listings, location, min_price, max_price):
    filtered = []
    for listing in listings:
        in_location = not location or location.lower() in listing.location.lower()
        in_price = float(min_price) <= float(listing.price) <= float(max_price)
        if in_location and in_price:
            filtered.append(listing)
    return filtered


def get_scores(listings, min_price, number_of_bedrooms, number_of_bathrooms):
    for listing in listings:
        if float(listing.price) == float(min_price):
            listing.score += 40
        if listing.bedrooms is not None and str(listing.bedrooms) == str(number_of_bedrooms):
            listing.score += 20
        if listing.bathrooms is not None and float(listing.bathrooms) >= float(number_of_bathrooms):
            listing.score += 20
        if listing.illegal_flags:
            listing.score -= 20 * len(listing.illegal_flags)

    top_ten = sorted(listings, key=lambda l: l.score, reverse=True)[:10]
    return top_ten


@app.route("/search", methods=["POST"])
def search():
    body = request.get_json()

    location      = body.get("location", "")
    min_price     = body.get("minPrice", 0)
    max_price     = body.get("maxPrice", 99999)
    bedrooms      = body.get("bedrooms", "")
    bathrooms     = body.get("bathrooms", "")

    # Optional: re-scrape fresh data on each request (slow ~10s)
    kijiji_scraper()

    with open("listings.json") as f:
        data = json.load(f)

    listings = [Listing(**item) for item in data]

    filtered = get_filtered(listings, location, min_price, max_price)
    top = get_scores(filtered, min_price, bedrooms, bathrooms)

    results = []
    for l in top:
        results.append({
            "title":            l.title,
            "price":            l.price,
            "location":         l.location,
            "description":      l.description,
            "image":            l.image,
            "bedrooms":         l.bedrooms,
            "bathrooms":        l.bathrooms,
            "size_sqft":        l.size_sqft,
            "unit_type":        l.unit_type,
            "parking_included": l.parking_included,
            "illegal_flags":    l.illegal_flags,
            "url":              l.url,
            "score":            l.score,
        })

    return jsonify(results)


if __name__ == "__main__":
    print("Scraping fresh listings...")
    kijiji_scraper()
    print("Done. Starting server.")
    app.run(debug=True, port=5000)