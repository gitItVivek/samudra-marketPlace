package com.samudra.identity.entity;

import com.samudra.common.config.BaseEntity;
import com.samudra.common.enums.UserRole;
import com.samudra.common.enums.UserStatus;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.time.Instant;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User extends BaseEntity {

    @Column(unique = true)
    private String email;

    @Column(unique = true, length = 15)
    private String phone;

    @Column
    private String passwordHash;

    @Column(unique = true)
    private String googleId;

    @Column(unique = true)
    private String facebookId;

    @Column(nullable = false, length = 100)
    private String displayName;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private UserStatus status = UserStatus.ACTIVE;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private UserRole role = UserRole.USER;

    @Column(nullable = false)
    private Boolean isVerified = false;

    @Column
    private Instant deletedAt;
}
