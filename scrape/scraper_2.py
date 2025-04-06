import requests
from bs4 import BeautifulSoup


url = "https://chateaumanagement.appfolio.com/listings?1743896615335&filters%5Border_by%5D=date_posted"
response = requests.get(url)
html_content = response.content

soup=BeautifulSoup(html_content,"html.parser")
housing_list =[]

first_layer=soup.find("div",{"class":"listings js-listings-container"})
if first_layer:
    while first_layer.find_next("div",{"class":"listing-item__body"}):
        second_layer=first_layer.find_next("div",{"class":"listing-item__body"})
        if second_layer:
            third_layer=second_layer.find("div",{"class":"listing-item result js-listing-item"})
            if third_layer:
                fourth_layer=third_layer.find("div",{"class":"listing-item__body"})
                if fourth_layer:
                    four_two=fourth_layer.find_next("p",{"class","u-space-an"})
                    if four_two:
                        temp_house=[]
                        four_two_span=four_two.find("span", {"class","u-space-an"})
                        temp_house.append(four_two_span)
                        fifth_layer=fourth_layer.find("div",{"class","detail-box hand-hidden u-space-bs js-listing-quick-facts"})
                        if fifth_layer:
                            seventh=fifth_layer.find("dl")
                            if seventh:
                                while seventh.find_next("div",{"class","detail-box__item"}):
                                    eighth=seventh.find_next("div",{"class","detail-box__item"})
                                    if eighth:
                                        ninth=eighth.find("dt").get_text()
                                        temp_house.append(ninth)
                                        tenth=eighth.find("dd").get_text()
                                        temp_house.append(tenth)
                        housing_list.append(temp_house)
                                        








