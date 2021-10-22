package com.example.jphacks_server.entity;

import javax.swing.tree.RowMapper;
import java.time.LocalDateTime;
import java.util.Date;

public class Users{

    private int usersId;
    private int schoolsId;
    private String usersName;
    private String usersImagePath;
    private String usersLoginId;
    private String usersLoginPassword;
    private String schoolsName;
    private String studentGroupName;
    private int studentGroupGrade;
    private int studentGroupId;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;


    public int getUsersId() {
        return usersId;
    }

    public void setUsersId(int usersId) {
        this.usersId = usersId;
    }

    public int getSchoolsId() {
        return schoolsId;
    }

    public void setSchoolsId(int schoolsId) {
        this.schoolsId = schoolsId;
    }

    public String getUsersName() {
        return usersName;
    }

    public void setUsersName(String usersName) {
        this.usersName = usersName;
    }

    public String getUsersImagePath() {
        return usersImagePath;
    }

    public void setUsersImagePath(String usersImagePath) {
        this.usersImagePath = usersImagePath;
    }

    public String getUsersLoginId() {
        return usersLoginId;
    }

    public void setUsersLoginId(String usersLoginId) {
        this.usersLoginId = usersLoginId;
    }

    public String getUsersLoginPassword() {
        return usersLoginPassword;
    }

    public void setUsersLoginPassword(String usersLoginPassword) {
        this.usersLoginPassword = usersLoginPassword;
    }

    public String getSchoolsName() {
        return schoolsName;
    }

    public void setSchoolsName(String schoolsName) {
        this.schoolsName = schoolsName;
    }

    public String getStudentGroupName() {
        return studentGroupName;
    }

    public void setStudentGroupName(String studentGroupName) {
        this.studentGroupName = studentGroupName;
    }

    public int getStudentGroupGrade() {
        return studentGroupGrade;
    }

    public void setStudentGroupGrade(int studentGroupGrade) {
        this.studentGroupGrade = studentGroupGrade;
    }

    public int getStudentGroupId() {
        return studentGroupId;
    }

    public void setStudentGroupId(int studentGroupId) {
        this.studentGroupId = studentGroupId;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
