import re
import requests
import time
import json

from bs4 import BeautifulSoup

def kijiji_scraper():
    results = []

    for page in range(1, 4):
        # Open the link for all propety listings in the GTA
        url = f'https://www.kijiji.ca/b-apartments-condos/mississauga-peel-region/females-only/k0c37l1700276?view=list'
        # Mississauga test URL
        # url = f'https://www.kijiji.ca/b-apartments-condos/mississauga-peel-region/page-{page}/c37l1700276'
        # Headers to show user-agent and not get blocked
        headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

        response = requests.get(url, headers=headers)
        # print(response.text)

        soup = BeautifulSoup(response.text, 'html.parser')

        # All listings are prefaced with li tags, hence this search command
        listings = soup.find_all("li", attrs={"data-testid": lambda x: x and "listing-card-list-item" in x})


        for listing in listings:

            title = listing.find("h3", {"data-testid": "listing-title"})
            title = title.get_text(strip=True) if title else None

            price = listing.find("p", {"data-testid": "listing-price"})
            if price:
                price = price.get_text(strip=True)

                if price.startswith('$'):
                    price = re.sub(r'\$|,', '', price)
                else:
                    price = 0
            else:
                price = 0

            location = listing.find("p", {"data-testid": "listing-location"})
            location = location.get_text(strip=True) if location else None

            description = listing.find("p", {"data-testid": "listing-description"})
            description = description.get_text(strip=True) if description else None

            date_tag = listing.select_one('[data-testid="listing-date"]')
            date_posted = date_tag.text.strip() if date_tag else None

            link = listing.find("a", {"data-testid": "listing-link"})
            link = link["href"] if link else None

            image = listing.find("img", {"data-testid": "listing-card-image"})
            image = image["src"] if image else None

            # Accessing other relevant information from attributes functionality
            bedrooms = None
            bathrooms = None
            size = None
            unit_type = None
            parking = None

            attribute_list = listing.find("ul", {"data-testid": "re-attribute-list-non-mobile"})
            attributes = attribute_list.find_all("li") if attribute_list else []

            for attr in attributes:
                label = attr.get("aria-label")
                value = attr.get_text(strip=True)

                if label == "Bedrooms":
                    bedrooms = value

                elif label == "Bathrooms":
                    bathrooms = value

                elif label == "Unit type":
                    unit_type = value

                elif label == "Parking included":
                    parking = True if value != "0" else False

                elif label == "Size (sqft)":
                    size = value.replace("sqft", "").strip()
            
            # Add functionality that using the link of the listing, go into that listing,
            # and scrape the longer description to get more accurate illegal flags,
            # as well as whether the owner doesn't allow pets, etc.

            # Add checking for illegal flags, to add to dictionary
            banned_phrases = [
                r'no\s*pets?',
                r'no\s*subletting',
                r'female\s*only',
                r'male\s*only',
                r'students?\s*only'
            ]

            description_lower = description.lower() if description else ""

            illegal_flags = []
            
            for phrase in banned_phrases:
                if match := re.search(phrase, description_lower):
                    illegal_flags.append(phrase)


            # illegal_flags = [phrase for phrase in banned_phrases if phrase in description_lower]

            results.append({
                "title": title,
                "price": price,
                "location": location,
                "description": description,
                "url": link,
                "image": image,
                "bedrooms": bedrooms,
                "bathrooms": bathrooms,
                "size_sqft": size,
                "unit_type": unit_type,
                "parking_included": parking,
                "illegal_flags": illegal_flags,
                "date_posted": date_posted
            })

            # time.sleep(0.125)


    with open("listings__2.json", "w") as f:
        json.dump(results, f, indent=4)

def main():
    kijiji_scraper()

if __name__ == '__main__':
    main()