package com.manthatech.LMSApp.controller;

import com.manthatech.LMSApp.dto.AdminResponseDto;
import com.manthatech.LMSApp.dto.RegistrationDto;
import com.manthatech.LMSApp.dto.UserDto;
import com.manthatech.LMSApp.dto.UserProjection;
import com.manthatech.LMSApp.model.Course;
import com.manthatech.LMSApp.model.User;
import com.manthatech.LMSApp.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/admin")
@PreAuthorize("hasRole('ADMIN')")
@CrossOrigin
public class AdminController {

    @Autowired
    private AdminService adminService;

    @CrossOrigin
    @GetMapping("/users")
    public List<UserProjection> getAllUsers() {
        return adminService.getAllUsers();
    }

    @CrossOrigin
    @GetMapping("/users/{id}")
    public ResponseEntity<AdminResponseDto> getUserById(@PathVariable Long id) {
        return adminService.getUserById(id)
                .map(u -> ResponseEntity.ok(new AdminResponseDto(u)))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @CrossOrigin
    @PostMapping("/users")
    public ResponseEntity<AdminResponseDto> addUser(@RequestBody RegistrationDto user) {
        return ResponseEntity.ok(new AdminResponseDto(adminService.addUser(user)));
    }

    @CrossOrigin
    @PutMapping("/users/{id}")
    public ResponseEntity<AdminResponseDto> updateUser(@PathVariable Long id, @RequestBody RegistrationDto user) {
        return ResponseEntity.ok(new AdminResponseDto(adminService.updateUser(id, user)));
    }

    @CrossOrigin
    @DeleteMapping("/users/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        adminService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    @CrossOrigin
    @DeleteMapping("/users/{userId}/courses/{courseId}")
    public ResponseEntity<AdminResponseDto> removeCourseFromUser(@PathVariable Long userId, @PathVariable Long courseId) {
        User updatedUser = adminService.removeCourseFromUser(userId, courseId);
        return ResponseEntity.ok(new AdminResponseDto(updatedUser));
    }

    @CrossOrigin
    @PostMapping("/users/{id}/toggle-status")
    public ResponseEntity<AdminResponseDto> toggleUserStatus(@PathVariable Long id, @RequestParam boolean enable) {
        return ResponseEntity.ok(new AdminResponseDto(adminService.toggleUserStatus(id, enable)));
    }

    @CrossOrigin
    @PostMapping("/users/{id}/reset-password")
    public ResponseEntity<AdminResponseDto> resetPassword(@PathVariable Long id) {
        return ResponseEntity.ok(new AdminResponseDto(adminService.resetPassword(id)));
    }

    @CrossOrigin
    @GetMapping("/courses")
    public List<Course> getAllCourses() {
        return adminService.getAllCourses();
    }

    @CrossOrigin
    @PostMapping("/courses/{courseId}/enroll-users")
    public ResponseEntity<List<AdminResponseDto>> enrollMultipleUsersInCourse(@PathVariable Long courseId, @RequestBody List<Long> userIds) {
        List<User> updatedUsers = adminService.addUsersToCourse(courseId, userIds);
        List<AdminResponseDto> response = updatedUsers.stream()
                .map(AdminResponseDto::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(response);
    }

    @CrossOrigin
    @GetMapping("/users-with-courses")
    public ResponseEntity<List<UserDto>> getAllUsersWithCourses() {
        return ResponseEntity.ok(adminService.getAllUsersWithCourses());
    }

    @CrossOrigin
    @PostMapping("/courses")
    public ResponseEntity<Course> createCourse(@RequestBody Course course) {
        return ResponseEntity.ok(adminService.createCourse(course));
    }

    @CrossOrigin
    @PostMapping("/users/{userId}/courses/{courseId}")
    public ResponseEntity<AdminResponseDto> enrollUserInCourse(@PathVariable Long userId, @PathVariable Long courseId) {
        return ResponseEntity.ok(new AdminResponseDto(adminService.addUserToCourse(userId, courseId)));
    }
}
