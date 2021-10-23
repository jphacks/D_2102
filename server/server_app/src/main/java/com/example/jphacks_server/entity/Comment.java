package com.example.jphacks_server.entity;

import java.text.SimpleDateFormat;

public class Comment {
    private int commentId;
    private String subjectsName;
    private String comment_content;
    private String isAnswered;
    private String createdAt;

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

    public String getComment_content() {
        return comment_content;
    }

    public void setComment_content(String comment_content) {
        this.comment_content = comment_content;
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
