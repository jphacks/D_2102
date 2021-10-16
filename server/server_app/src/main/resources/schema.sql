
DROP TABLE IF EXISTS comment_image;
DROP TABLE IF EXISTS question_group;
DROP TABLE IF EXISTS comment_vote;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS course_director;
DROP TABLE IF EXISTS group_director;
DROP TABLE IF EXISTS student_group;
DROP TABLE IF EXISTS news_checked;
DROP TABLE IF EXISTS news;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS subjects;
DROP TABLE IF EXISTS master_users;
DROP TABLE IF EXISTS schools;


CREATE TABLE IF NOT EXISTS schools(
    schools_id integer PRIMARY KEY AUTO_INCREMENT,
    schools_name varchar(30) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
    created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at datetime on update CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS master_users(
    master_users_id integer PRIMARY KEY AUTO_INCREMENT,
    schools_id integer NOT NULL,
    master_users_name varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
    master_users_login_id varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
    master_users_login_password varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
    created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at datetime on update CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    foreign key (schools_id) references schools(schools_id)
);

CREATE TABLE IF NOT EXISTS subjects(
    subjects_id integer PRIMARY KEY AUTO_INCREMENT,
    schools_id integer NOT NULL,
    subjects_name varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
    created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at datetime on update CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    foreign key (schools_id) references schools(schools_id)
);

CREATE TABLE IF NOT EXISTS student_group(
    student_group_id integer PRIMARY KEY AUTO_INCREMENT,
    student_group_name varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
    student_group_grade integer NOT NULL,
    created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at datetime on update CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS users(
    users_id integer PRIMARY KEY AUTO_INCREMENT,
    schools_id integer NOT NULL,
    users_name varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
    users_image_path varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
    users_login_id varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
    users_login_password varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
    student_group_id integer,
    created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at datetime on update CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    foreign key (schools_id) references schools(schools_id)
);



CREATE TABLE IF NOT EXISTS group_director(
    subjects_id integer NOT NULL,
    student_group_id integer NOT NULL,
    created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at datetime on update CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    foreign key (subjects_id) references subjects(subjects_id),
    foreign key (student_group_id) references student_group(student_group_id)
);

CREATE TABLE IF NOT EXISTS course_director(
    subjects_id integer NOT NULL,
    users_id integer NOT NULL,
    created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at datetime on update CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    foreign key (subjects_id) references subjects(subjects_id),
    foreign key (users_id) references users(users_id)
);


CREATE TABLE IF NOT EXISTS news(
    news_id integer PRIMARY KEY AUTO_INCREMENT,
    users_id integer NOT NULL,
    student_group_id integer NOT NULL,
    news_subject integer NOT NULL,
    news_text varchar(500) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
    created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at datetime on update CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    foreign key (users_id) references users(users_id)
);


CREATE TABLE IF NOT EXISTS news_checked(
    news_id integer PRIMARY KEY AUTO_INCREMENT,
    users_id integer NOT NULL,
    created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at datetime on update CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    foreign key (users_id) references users(users_id)
);


CREATE TABLE IF NOT EXISTS comments(
    comment_id integer PRIMARY KEY AUTO_INCREMENT,
    users_id integer NOT NULL,
    subjects_id integer NOT NULL,
    comment_content varchar(500) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
    comment_is_answered integer default 0,
    created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at datetime on update CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    foreign key (users_id) references users(users_id),
    foreign key (subjects_id) references subjects(subjects_id)
);

CREATE TABLE IF NOT EXISTS question_group(
    answer_comment_id integer PRIMARY KEY AUTO_INCREMENT,
    question_comment_id integer NOT NULL,
    created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at datetime on update CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    foreign key (answer_comment_id) references comments(comment_id),
    foreign key (question_comment_id) references comments(comment_id)
);

CREATE TABLE IF NOT EXISTS comment_vote(
    comment_id integer NOT NULL,
    users_id integer NOT NULL,
    created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at datetime on update CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    foreign key (comment_id) references comments(comment_id),
    foreign key (users_id) references users(users_id)
);


CREATE TABLE IF NOT EXISTS comment_image(
    commen_image_id integer PRIMARY KEY AUTO_INCREMENT,
    comment_id integer NOT NULL,
    comment_image_path varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
    foreign key (comment_id) references comments(comment_id)
);