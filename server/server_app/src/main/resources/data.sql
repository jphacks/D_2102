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

INSERT INTO users(
    schools_id, users_name, users_login_id, users_login_password, student_group_id
) values(
    1, "中本英二","th00002","password", null
);

INSERT INTO users(
    schools_id, users_name, users_login_id, users_login_password, student_group_id
) values(
    1, "高坂美希","th00003","password", null
);

INSERT INTO users(
    schools_id, users_name, users_login_id, users_login_password, student_group_id
) values(
    1, "加藤薫","th00004","password", null
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
    schools_id, subjects_name,subject_one_to_one
) values(
    1, "3年国語",0
);

INSERT INTO subjects(
    schools_id, subjects_name, subject_one_to_one
) values(
    1, "3年数学",0
);

INSERT INTO subjects(
    schools_id, subjects_name, subject_one_to_one
) values(
    1, "3年理科", 0
);

INSERT INTO subjects(
    schools_id, subjects_name, subject_one_to_one
) values(
    1, "3年英語", 0
);

INSERT INTO subjects(
    schools_id, subjects_name, subject_one_to_one
) values(
    1, "3年社会", 0
);


INSERT INTO subjects(
    schools_id, subjects_name, subject_one_to_one
) values(
    1, "スクールカウンセラー", 1
);



INSERT INTO course_director(
    subjects_id, users_id
) values(
    1, 3
);

INSERT INTO course_director(
    subjects_id, users_id
) values(
    2, 4
);

INSERT INTO course_director(
    subjects_id, users_id
) values(
    4, 5
);

INSERT INTO course_director(
    subjects_id, users_id
) values(
    6, 6
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

INSERT INTO comments(
    users_id, subjects_id, comment_content, comment_is_answered
) values(
    1, 1, "国語の問題のここがわかりません", 9
);

INSERT INTO comments(
    users_id, subjects_id, comment_content, comment_is_answered
) values(
    1, 1, "国語のワークの意図がわかりません",0
);

INSERT INTO comments(
    users_id, subjects_id, comment_content, comment_is_answered
) values(
    2, 2, "数学のワークのp56の問2がわかりません", 8
);

INSERT INTO comments(
    users_id, subjects_id, comment_content, comment_is_answered
) values(
    1, 4, "問題がよくわかりません。", 7
);

INSERT INTO comments(
    users_id, subjects_id, comment_content, comment_is_answered
) values(
    1, 5, "理科問題がよくわかりません。", 0
);

INSERT INTO comments(
    users_id, subjects_id, comment_content, comment_is_answered
) values(
    1, 6, "勉強がわからんくてとても不安です。", 10
);

INSERT INTO comments(
    users_id, subjects_id, comment_content, comment_is_answered
) values(
    5, 1, "教科書をよく読みましょう", 0
);

INSERT INTO comments(
    users_id, subjects_id, comment_content, comment_is_answered
) values(
    4, 2, "公式を使いましょう。", 0
);

INSERT INTO comments(
    users_id, subjects_id, comment_content, comment_is_answered
) values(
    3, 1, "そこは筆者の意図を読めばわかります。", 0
);

INSERT INTO comments(
    users_id, subjects_id, comment_content, comment_is_answered
) values(
    6, 1, "急ぐ必要はありません。ゆっくりで大丈夫ですよ。", 0
);


INSERT INTO comments(
    users_id, subjects_id, comment_content, comment_is_answered
) values(
    1, 1, "テストのテストです",0
);


INSERT INTO comments(
    users_id, subjects_id, comment_content, comment_is_answered
) values(
    1, 1, "親譲おやゆずりの無鉄砲むてっぽうで小供の時から損ばかりしている。小学校に居る時分学校の二階から飛び降りて一週間ほど腰こしを抜ぬかした事がある。なぜそんな無闇むやみをしたと聞く人があるかも知れぬ。",0
);

INSERT INTO comments(
    users_id, subjects_id, comment_content, comment_is_answered
) values(
    1, 1, "国語のワークでここがわかりません。どのように解きますか？？",0
);


INSERT INTO question_group(
    answer_comment_id, question_comment_id
) values(
    9, 1
);

INSERT INTO question_group(
    answer_comment_id, question_comment_id
) values(
    8, 3
);

INSERT INTO question_group(
    answer_comment_id, question_comment_id
) values(
    7, 4
);

INSERT INTO question_group(
    answer_comment_id, question_comment_id
) values(
    10, 6
);


INSERT INTO comment_vote(
    comment_id, users_id, comment_vote_is_deleted
) values(
    1, 1, 0
);

INSERT INTO comment_vote(
    comment_id, users_id, comment_vote_is_deleted
) values(
    1, 2, 0
);

INSERT INTO comment_vote(
    comment_id, users_id, comment_vote_is_deleted
) values(
    1, 3, 0
);

INSERT INTO comment_vote(
    comment_id, users_id, comment_vote_is_deleted
) values(
    1, 4, 0
);


INSERT INTO comment_vote(
    comment_id, users_id, comment_vote_is_deleted
) values(
    1, 5, 1
);

INSERT INTO comment_vote(
    comment_id, users_id, comment_vote_is_deleted
) values(
    2, 1, 1
);

INSERT INTO comment_vote(
    comment_id, users_id, comment_vote_is_deleted
) values(
    2, 2, 0
);

INSERT INTO comment_vote(
    comment_id, users_id, comment_vote_is_deleted
) values(
    3, 1, 0
);

INSERT INTO comment_vote(
    comment_id, users_id, comment_vote_is_deleted
) values(
    3, 2, 0
);