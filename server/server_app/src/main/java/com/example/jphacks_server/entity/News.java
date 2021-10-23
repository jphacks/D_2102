package com.example.jphacks_server.entity;

public class News {
    private int newsId;
    private int studentGroupId;
    private String newsSubject;
    private String newsText;
    private String isRead;

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
