package com.example.jphacks_server.entity;

import java.time.LocalDateTime;

public class Users {

    private int users_id;
    private int schools_id;
    private String users_name;
    private String users_image_path;
    private String users_login_id;
    private String users_login_password;
    private int student_group_id;
    private LocalDateTime created_at;
    private LocalDateTime updated_at;

    public int getUsers_id() {
        return users_id;
    }

    public void setUsers_id(int users_id) {
        this.users_id = users_id;
    }

    public int getSchools_id() {
        return schools_id;
    }

    public void setSchools_id(int schools_id) {
        this.schools_id = schools_id;
    }

    public String getUsers_name() {
        return users_name;
    }

    public void setUsers_name(String users_name) {
        this.users_name = users_name;
    }

    public String getUsers_image_path() {
        return users_image_path;
    }

    public void setUsers_image_path(String users_image_path) {
        this.users_image_path = users_image_path;
    }

    public String getUsers_login_id() {
        return users_login_id;
    }

    public void setUsers_login_id(String users_login_id) {
        this.users_login_id = users_login_id;
    }

    public String getUsers_login_password() {
        return users_login_password;
    }

    public void setUsers_login_password(String users_login_password) {
        this.users_login_password = users_login_password;
    }

    public int getStudent_group_id() {
        return student_group_id;
    }

    public void setStudent_group_id(int student_group_id) {
        this.student_group_id = student_group_id;
    }

    public LocalDateTime getCreated_at() {
        return created_at;
    }

    public void setCreated_at(LocalDateTime created_at) {
        this.created_at = created_at;
    }

    public LocalDateTime getUpdated_at() {
        return updated_at;
    }

    public void setUpdated_at(LocalDateTime updated_at) {
        this.updated_at = updated_at;
    }
}
