import mysql.connector

cnx = mysql.connector.connect(
    host="127.0.0.1",
    port=3306,
    user="root",
    password="PASSWORD")

cur = cnx.cursor()


def insert_listing(rent, address, walk, bike, description, start, end):
    cur.execute("""
    INSERT INTO `damdwell`.`scraped_listing` (
    `month_rent`,
    `address`,
    `campus_walk_time`,
    `campus_bike_time`,
    `description`,
    `availability_start`,
    `availability_end`)
    VALUES(%s,%s,%s,%s,%s,%s,%s)
    """, 
    (rent, address, walk, bike, description, start, end)
    )

    cnx.commit()
