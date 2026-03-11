import re
import requests
import time
import json

from bs4 import BeautifulSoup

def kijiji_scraper():
    ILLEGAL_PATTERNS = {

        "gender_restriction": [

            # direct
            r"\bfemale\s*only\b",
            r"\bfemales\s*only\b",
            r"\bmale\s*only\b",
            r"\bmales\s*only\b",
            r"\bgirls?\s*only\b",
            r"\bguys?\s*only\b",

            # reversed order
            r"\bonly\s*female\b",
            r"\bonly\s*females\b",
            r"\bonly\s*male\b",
            r"\bonly\s*males\b",
            r"\bonly\s*girl\b",

            # preference phrasing
            r"\bprefer\s*female\b",
            r"\bpreferably\s*female\b",
            r"\bprefer\s*male\b",

            # working/student gender
            r"\bworking\s*female\b",
            r"\bworking\s*male\b",
            r"\bfemale\s*student\b",
            r"\bmale\s*student\b",

            # roommate gender
            r"\bfemale\s*roommate\b",
            r"\bmale\s*roommate\b",

            # gender requirement phrasing
            r"\bmust\s*be\s*female\b",
            r"\bmust\s*be\s*male\b",
            r"\blooking\s*for\s*female\b",
            r"\blooking\s*for\s*male\b"
        ],


        "ethnicity_restriction": [

            # common nationality restrictions
            r"\bindian\s*only\b",
            r"\bpunjabi\s*only\b",
            r"\bgujarati\s*only\b",
            r"\bpakistani\s*only\b",
            r"\bbangladeshi\s*only\b",
            r"\bchinese\s*only\b",
            r"\bfilipino\s*only\b",
            r"\bvietnamese\s*only\b",
            r"\bkorean\s*only\b",
            r"\bjapanese\s*only\b",
            r"\bnigerian\s*only\b",

            # nationality + gender combos
            r"\bindian\s*female\b",
            r"\bpunjabi\s*female\b",
            r"\bgujarati\s*female\b",
            r"\bchinese\s*female\b",

            # preference phrasing
            r"\bprefer\s*indian\b",
            r"\bprefer\s*punjabi\b",
            r"\bprefer\s*gujarati\b",
            r"\bprefer\s*asian\b",

            # religious restrictions
            r"\bmuslim\s*only\b",
            r"\bhindu\s*only\b",
            r"\bchristian\s*only\b",
            r"\bsikh\s*only\b"
        ],


        "age_restriction": [

            r"\bstudents?\s*only\b",
            r"\bworking\s*professionals?\s*only\b",
            r"\bno\s*students\b",
            r"\bno\s*kids\b",
            r"\badults?\s*only\b",
            r"\b18\+\s*only\b",
            r"\b30\s*and\s*under\b"
        ],


        "pet_restriction": [

            r"\bno\s*pets?\b",
            r"\bpets?\s*not\s*allowed\b",
            r"\bno\s*dogs?\b",
            r"\bno\s*cats?\b",
            r"\bpet\s*free\s*home\b"
        ],


        "guest_restriction": [

            r"\bno\s*guests?\b",
            r"\bguests?\s*not\s*allowed\b",
            r"\bno\s*visitors?\b",
            r"\bvisitors?\s*not\s*allowed\b",
            r"\bno\s*overnight\s*guests?\b"
        ],


        "sublet_restriction": [

            r"\bno\s*subletting\b",
            r"\bsubletting\s*not\s*allowed\b",
            r"\bno\s*sublease\b"
        ],


        "family_status_restriction": [

            r"\bno\s*famil(y|ies)\b",
            r"\bno\s*couples\b",
            r"\bcouples?\s*not\s*allowed\b",
            r"\bsingle\s*person\s*only\b"
        ]
    }

    results = []

    for page in range(1, 4):
        # Open the link for all propety listings in the GTA
        url = f'https://www.kijiji.ca/b-apartments-condos/gta-greater-toronto-area/page-{page}/c37l1700272'
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
            
            # Test to see what BeautifulSoup sees
            # with open("debug.html", "w", encoding="utf-8") as f:
            #     f.write(listing.prettify())

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

            date_posted = None
            # This does not work as the date_posted value is dynamically generated by Javascript so BeautifulSoup cannot read it
            # date_posted = listing.find('p', attrs={'aria-label': lambda x: x and 'Published listing' in x})
            # date_posted = date_posted.get_text(strip=True) if date_posted else "Not Found"

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


            description_lower = description.lower() if description else ""

            illegal_flags = []

            for illegal_type in ILLEGAL_PATTERNS:
                for phrase in ILLEGAL_PATTERNS[illegal_type]:
                    if _ := re.search(phrase, description_lower):
                        illegal_flags.append(phrase)


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


    with open("listings.json", "w") as f:
        json.dump(results, f, indent=4)

def main():
    kijiji_scraper()

if __name__ == '__main__':
    main()