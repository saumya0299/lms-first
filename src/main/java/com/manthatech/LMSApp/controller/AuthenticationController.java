package com.manthatech.LMSApp.controller;

import com.manthatech.LMSApp.dto.LoginDto;
import com.manthatech.LMSApp.model.User;
import com.manthatech.LMSApp.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {

    private final JwtService jwtService;

    private final AuthenticationService authenticationService;

    public AuthenticationController(JwtService jwtService, AuthenticationService authenticationService) {
        this.jwtService = jwtService;
        this.authenticationService = authenticationService;
    }

    @Autowired
    private UserService userService;

    @CrossOrigin
    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestParam String newPassword, @AuthenticationPrincipal UserDetails userDetails) {
        if (newPassword == null || newPassword.isEmpty()) {
            return ResponseEntity.badRequest().body("newPassword parameter is required");
        }
        User user = userService.findByEmail(userDetails.getUsername());
        if (user != null) {
            user.setPassword(newPassword);
            user.setDefaultPassword(false);
            userService.save(user);
            return ResponseEntity.ok("Password changed successfully");
        }
        return ResponseEntity.badRequest().body("Invalid request");
    }

    @CrossOrigin
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> authenticate(@RequestBody LoginDto loginUserDto) {
        User authenticatedUser = authenticationService.authenticate(loginUserDto);

        String jwtToken = jwtService.generateToken((UserDetails) authenticatedUser);
        boolean isDefaultPassword = authenticatedUser.isDefaultPassword();
        String role = authenticatedUser.getRole();

        LoginResponse loginResponse = new LoginResponse(jwtToken, jwtService.getExpirationTime(), isDefaultPassword, role, loginUserDto.getEmail(), authenticatedUser.getId());


        return ResponseEntity.ok(loginResponse);
    }


}
