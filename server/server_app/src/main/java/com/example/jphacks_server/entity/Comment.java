package com.example.jphacks_server.entity;

import java.text.SimpleDateFormat;

public class Comment {
    private int commentId;
    private int subjectsId;
    private int vote;
    private String subjectsName;
    private String commentContent;
    private String isAnswered;
    private String createdAt;
    private int commentIsAnswered;

    public int getCommentIsAnswered() {
        return commentIsAnswered;
    }

    public void setCommentIsAnswered(int commentIsAnswered) {
        this.commentIsAnswered = commentIsAnswered;
    }

    public String getIsAnswered() {
        return isAnswered;
    }

    public void setIsAnswered(String isAnswered) {
        this.isAnswered = isAnswered;
    }

    public int getVote() {
        return vote;
    }

    public void setVote(int vote) {
        this.vote = vote;
    }

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



    public String getCreatedAt() {
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
        return createdAt.substring(0, createdAt.length() - 3);
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }
}
