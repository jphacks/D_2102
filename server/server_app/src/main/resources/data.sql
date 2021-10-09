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
    users_name, school_id, users_login_id, users_password, student_group_id
) values(
    "佐藤瞳", 1, "st00002","password", 1
);


INSERT INTO users(
    users_name, school_id, users_login_id, users_password, student_group_id
) values(
    "田中智", 1, "st00001","password", 1
);