package com.manthatech.LMSApp.dto;

import com.manthatech.LMSApp.model.Course;

import java.util.Set;

public class RegistrationDto {

    private String email;

    private String role;

    private Set<String> courseNames;

    private String fullName;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }


    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public Set<String> getCourseNames() {
        return courseNames;
    }

    public void setCourseNames(Set<String> courseName) {
        this.courseNames = courseName;
    }
}
