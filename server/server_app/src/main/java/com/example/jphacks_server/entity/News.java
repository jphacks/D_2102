package com.example.jphacks_server.entity;

import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.Date;

public class News {
    private int newsId;
    private int studentGroupId;
    private int usersId;
    private String usersName;
    private String newsSubject;
    private String newsText;
    private String isRead;
    private String createdAt;

    public String getCreatedAt() {
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
        return createdAt.substring(0, createdAt.length() - 3);
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }

    public int getUsersId() {
        return usersId;
    }

    public void setUsersId(int usersId) {
        this.usersId = usersId;
    }

    public String getUserName() {
        return usersName;
    }

    public void setUsers_name(String usersName) {
        this.usersName = usersName;
    }

    public int getNewsId() {
        return newsId;
    }

    public void setNewsId(int newsId) {
        this.newsId = newsId;
    }

    public int getStudentGroupId() {
        return studentGroupId;
    }

    public void setStudentGroupId(int studentGroupId) {
        this.studentGroupId = studentGroupId;
    }

    public String getNewsSubject() {
        return newsSubject;
    }

    public void setNewsSubject(String newsSubject) {
        this.newsSubject = newsSubject;
    }

    public String getNewsText() {
        return newsText;
    }

    public void setNewsText(String newsText) {
        this.newsText = newsText;
    }

    public String getIsRead() {
        return isRead;
    }

    public void setIsRead(String isRead) {
        this.isRead = isRead;
    }
}
