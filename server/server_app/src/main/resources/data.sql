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
    "3-8", 3
);

INSERT INTO users(
    schools_id, users_name, users_login_id, users_login_password, student_group_id
) values(
    1, "佐藤瞳","st00002","password", 1
);


INSERT INTO users(
    schools_id, users_name, users_login_id, users_login_password, student_group_id
) values(
    1, "田中智", "st00001","password", 1
);


INSERT INTO users(
    schools_id, users_name, users_login_id, users_login_password, student_group_id
) values(
    1, "本郷武","th00001","password", null
);


INSERT INTO news(
    users_id, student_group_id, news_subject, news_text
) values(
    1, 1, "数学のワーク提出期限の変更について", "数学のワーク提出期限の変更。数学のワーク提出期限の変更。数学のワーク提出期限の変更。"
);

INSERT INTO news(
    users_id, student_group_id, news_subject, news_text
) values(
    1, 1, "数学の小テスト範囲変更について", "数学の小テスト範囲変更について。数学の小テスト範囲変更について。数学の小テスト範囲変更について。"
);