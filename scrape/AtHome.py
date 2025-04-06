from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager
from bs4 import BeautifulSoup
import time

def get_all_listings(url):
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
        container = first_body.find('div', id='1586610897')
        if container:
            print("Container found.")
            listing_tile = container.find_all('div', class_='listings-container')  # Use find_all() for multiple listings
            
            if listing_tile:
                return listing_tile  # Return the list of found listings
            else:
                print("No listings found.")
                return []
        else:
            print("No listing container found inside the first body.")
            return []
    else:
        print("No body with id='dmFirstContainer' found.")
        return []

    # Close the browser when done
    driver.quit()

# Example usage:
url = "https://www.athomepm.net/availability?city=Corvallis"
listings = get_all_listings(url)

if listings:
    for listing in listings:
        print(listing.prettify())  # Print each listing's prettified HTML
