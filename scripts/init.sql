CREATE DATABASE IF NOT EXISTS damdwell;

USE damdwell;

CREATE TABLE IF NOT EXISTS listing (
    id INT PRIMARY KEY AUTO_INCREMENT,
    month_rent DECIMAL(7, 2) NOT NULL,
    address VARCHAR(255) NOT NULL,
    campus_walk_time TIME NOT NULL,
    campus_bike_time TIME NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS scraped_listing (
    id INT PRIMARY KEY AUTO_INCREMENT,
    month_rent DECIMAL(7, 2) NOT NULL,
    address VARCHAR(255) NOT NULL,
    campus_walk_time TIME NOT NULL,
    campus_bike_time TIME NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS feature (
    id INT PRIMARY KEY AUTO_INCREMENT,
    feature VARCHAR(255) NOT NULL,
    color VARCHAR(8) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS listing_feature (
    listing_id INT NOT NULL,
    feature_id INT NOT NULL,
    PRIMARY KEY (listing_id, feature_id),
    FOREIGN KEY (listing_id) REFERENCES listing(id) ON DELETE CASCADE,
    FOREIGN KEY (feature_id) REFERENCES feature(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS scraped_listing_feature (
    listing_id INT NOT NULL,
    feature_id INT NOT NULL,
    PRIMARY KEY (listing_id, feature_id),
    FOREIGN KEY (listing_id) REFERENCES listing(id) ON DELETE CASCADE,
    FOREIGN KEY (feature_id) REFERENCES feature(id) ON DELETE CASCADE
);
