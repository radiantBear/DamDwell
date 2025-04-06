from urllib.parse import urljoin
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager
from bs4 import BeautifulSoup
import time

def get_all_listings(url, base_url):
    # Set up the Selenium WebDriver with options
    options = webdriver.ChromeOptions()
    options.add_argument('--headless')  # Run in headless mode (no browser window)
    
    # Add a User-Agent to make the request look like it's from a regular browser
    options.add_argument('User-Agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36')
    
    # Use WebDriverManager to handle ChromeDriver setup
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)
    
    # Open the URL
    driver.get(url)
    
    # Wait for the page to load fully (adjust the sleep time if necessary)
    time.sleep(3)
    
    # Get the page content after it's rendered
    soup = BeautifulSoup(driver.page_source, "html.parser")

    first_body = soup.find('div', id="dmFirstContainer")
    if first_body:
        print("first-body found")
        container = first_body.find('div', id='1586610897')
        if container:
            print("Container found.")
            listings_container = container.find('div', class_='listings-container')
            if listings_container:
                print("Listing-container found")
                all_listings = listings_container.find('div', class_='all-listings')
                if all_listings:
                    print("all listing found")
                    listing_section = all_listings.find('section', class_= 'listing-section')
                    if listing_section:
                        print("listing section found")
                        listing_item = listing_section.find_all('div', class_="listing-item")
                        if listing_item: 
                            print("List item found")
                            links = set()
                            for item in listing_item:
                                anchor_tag = item.find('a', class_='slider-link')
                                href = anchor_tag.get('href')
                                links.add(urljoin(base_url, href))
                            return links

                    else: 
                        return []
                else:
                    return []
            else:
                return []
        else:
            return []
    else:
        return []

    # Close the browser when done
    driver.quit()

def scrape_data(url):
    options = webdriver.ChromeOptions()
    options.add_argument('--headless')  # Run in headless mode (no browser window)
    
    # Add a User-Agent to make the request look like it's from a regular browser
    options.add_argument('User-Agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36')
    
    # Use WebDriverManager to handle ChromeDriver setup
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)
    
    # Open the URL
    driver.get(url)
    
    # Wait for the page to load fully (adjust the sleep time if necessary)
    time.sleep(3)
    
    # Get the page content after it's rendered
    soup = BeautifulSoup(driver.page_source, "html.parser")

    rent = soup.find('div', class_='rent-info').get_text() if soup.find('div', class_='rent-info') else 'N/A'
    print(rent )
    if rent == "-":
        return 
    address = soup.find('h1', id='1531620706').get_text()
    print(address)
    bath_rooms = soup.find('div', class_='feature beds').get_text() if soup.find('div', class_='feature beds').get_text() else 'N/A'
    print(bath_rooms)
    bed_rooms = soup.find('div', class_='feature baths').get_text() if soup.find('div', class_='feature baths').get_text() else 'N/A'
    print(bed_rooms)
    square_feet_element = soup.find('div', class_='feature sqft')
    square_feet = square_feet_element.get_text() if square_feet_element else "N/A"    
    print(square_feet)



# Example usage:
url = "https://www.athomepm.net/availability?city=Corvallis"
base_url = "https://www.athomepm.net/listings"
listings = get_all_listings(url, base_url)

for listing in listings:
    print(listing)
    scrape_data(listing)
