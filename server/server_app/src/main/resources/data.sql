INSERT INTO schools(
    schools_name
) values(
    "テスト高校"
);

INSERT INTO schools(
    schools_name
) values(
    "サンプル中学校"
);


INSERT INTO student_group(
    student_group_name, student_group_grade
) values(
    "3-1", 3
);
INSERT INTO users(
    schools_id, users_name, users_login_id, users_login_password, student_group_id
) values(
    1, "田中智", "st00001","password", 1
);

INSERT INTO users(
    schools_id, users_name, users_login_id, users_login_password, student_group_id
) values(
    1, "佐藤瞳","st00002","password", 1
);





INSERT INTO users(
    schools_id, users_name, users_login_id, users_login_password, student_group_id
) values(
    1, "本郷武","th00001","password", null
);


INSERT INTO news(
    users_id, student_group_id, news_subject, news_text
) values(
    3, 1, "数学のワーク提出期限の変更について", "数学のワーク提出期限の変更。数学のワーク提出期限の変更。数学のワーク提出期限の変更。"
);

INSERT INTO news(
    users_id, student_group_id, news_subject, news_text
) values(
    3, 1, "数学の小テスト範囲変更について", "数学の小テスト範囲変更について。数学の小テスト範囲変更について。数学の小テスト範囲変更について。"
);

INSERT INTO news_checked(
    news_id, users_id
) values(
    1, 1
);

INSERT INTO news_checked(
    news_id, users_id
) values(
    1, 2
);

INSERT INTO news_checked(
    news_id, users_id
) values(
    2, 2
);

INSERT INTO student_group(
    student_group_name, student_group_grade
) values(
    "3-8", 3
);

INSERT INTO subjects(
    schools_id, subjects_name
) values(
    1, "3年国語"
);

INSERT INTO subjects(
    schools_id, subjects_name
) values(
    1, "3年数学"
);

INSERT INTO subjects(
    schools_id, subjects_name
) values(
    1, "3年理科"
);

INSERT INTO subjects(
    schools_id, subjects_name
) values(
    1, "3年英語"
);

INSERT INTO subjects(
    schools_id, subjects_name
) values(
    1, "3年社会"
);


INSERT INTO subjects(
    schools_id, subjects_name
) values(
    1, "スクールカウンセラー"
);


INSERT INTO group_director(
    subjects_id, student_group_id
) values(
    1, 1
);


INSERT INTO group_director(
    subjects_id, student_group_id
) values(
    2, 1
);


INSERT INTO group_director(
    subjects_id, student_group_id
) values(
    3, 1
);


INSERT INTO group_director(
    subjects_id, student_group_id
) values(
    4, 1
);


INSERT INTO group_director(
    subjects_id, student_group_id
) values(
    5, 1
);


INSERT INTO group_director(
    subjects_id, student_group_id
) values(
    6, 1
);