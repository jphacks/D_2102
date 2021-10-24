package com.example.jphacks_server.entity;

import java.text.SimpleDateFormat;

public class Comment {
    private int commentId;
    private int subjectsId;
    private String subjectsName;
    private String commentContent;
    private String isAnswered;
    private String createdAt;

    public int getSubjectsId() {
        return subjectsId;
    }

    public void setSubjectsId(int subjectsId) {
        this.subjectsId = subjectsId;
    }

    public int getCommentId() {
        return commentId;
    }

    public void setCommentId(int commentId) {
        this.commentId = commentId;
    }

    public String getSubjectsName() {
        return subjectsName;
    }

    public void setSubjectsName(String subjectsName) {
        this.subjectsName = subjectsName;
    }

    public String getCommentContent() {
        return commentContent;
    }

    public void setComment_content(String commentContent) {
        this.commentContent = commentContent;
    }

    public String getIsAnswered() {
        return isAnswered;
    }

    public void setIsAnswered(String isAnswered) {
        this.isAnswered = isAnswered;
    }

    public String getCreatedAt() {
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
        return createdAt.substring(0, createdAt.length() - 3);
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }
}
