package com.example.jphacks_server.entity;

public class Vote {

    private int commentId;
    private int usersId;
    private int commentVoteIsDeleted;
    private String createdAt;

    public int getCommentId() {
        return commentId;
    }

    public void setCommentId(int commentId) {
        this.commentId = commentId;
    }

    public int getUsersId() {
        return usersId;
    }

    public void setUsersId(int usersId) {
        this.usersId = usersId;
    }

    public int getCommentVoteIsDeleted() {
        return commentVoteIsDeleted;
    }

    public void setCommentVoteIsDeleted(int commentVoteIsDeleted) {
        this.commentVoteIsDeleted = commentVoteIsDeleted;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }
}
