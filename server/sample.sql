
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'dharun@sql';
-- Create the specializations table
CREATE TABLE specializations (
    user_id INT PRIMARY KEY,
    specialization_name VARCHAR(255) NOT NULL,
    reading_preference VARCHAR(255), -- Only applicable for reader specialization
    writing_style VARCHAR(255),     -- Only applicable for writer specialization
    badge VARCHAR(255),              -- Badge for both reader and writer specialization
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);



CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    date_of_join DATE NOT NULL,
    last_sign DATETIME,
    specialization_id INT,
    FOREIGN KEY (specialization_id) REFERENCES specializations(specialization_id)
);

alter table users add email varchar(50);
ALTER TABLE users DROP COLUMN specialization_id;


create table session(
	user_id int ,
    session_id int primary key,
    time_created datetime,
    expire_time datetime,
    foreign key (user_id) references users(user_id)
);

CREATE TABLE data (
    data_id INT AUTO_INCREMENT PRIMARY KEY,
    data_content text,
    writer_id INT,
    time DATETIME,
    FOREIGN KEY (writer_id) REFERENCES users(user_id)
);

create table version_history(
	session_id int,
    version_id int primary key auto_increment,
    old_data text,
    new_data text,
    created_at timestamp,
    last_modified timestamp,
    is_latest boolean,
    foreign key (session_id) references session(session_id)
);

create table comments(
	comment_id int primary key,
    time datetime,
    comment_data text,
    user_id int,
    session_id int,
    data_id int,
    foreign key (user_id) references users(user_id),
    foreign key (session_id) references session(session_id),
    foreign key (data_id) references data(data_id)
    );

create table read_data(
	data_id int,
    user_id int,
    primary key (data_id,user_id),
    foreign key (data_id) references data(data_id),
    foreign key (user_id) references users(user_id)
);

create table bookmarks(
	data_id int,
    user_id int,
    primary key (data_id,user_id),
    foreign key (data_id) references data(data_id),
    foreign key (user_id) references users(user_id)
);

CREATE TABLE follows (

    follow_id INT AUTO_INCREMENT PRIMARY KEY,
    ruser_id INT,
    wuser_id INT,
    FOREIGN KEY (ruser_id) REFERENCES users(user_id),
    FOREIGN KEY (wuser_id) REFERENCES users(user_id)
);

SHOW GRANTS FOR 'root'@'localhost';

GRANT DELETE ON content_management_system.specializations TO 'root'@'localhost';
FLUSH PRIVILEGES;
SELECT USER();
GRANT DELETE ON database_name.table_name TO 'root'@'localhost';
drop table users;
drop table follows;
CREATE TABLE follows (

    follow_id INT AUTO_INCREMENT PRIMARY KEY,
    ruser_id INT,
    wuser_id INT,
    FOREIGN KEY (ruser_id) REFERENCES users(user_id),
    FOREIGN KEY (wuser_id) REFERENCES users(user_id)
);





    
    





