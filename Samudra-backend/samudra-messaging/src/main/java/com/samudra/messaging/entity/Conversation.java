package com.samudra.messaging.entity;

import com.samudra.common.enums.ConversationStatus;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import com.samudra.common.config.BaseEntity;
import jakarta.persistence.*;

import java.time.Instant;
import java.util.UUID;
import lombok.Builder;

@Entity
@Table(name = "conversations")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Conversation extends BaseEntity {

    // logical reference to listings.id — no FK constraint (cross-module)
    @Column(nullable = false)
    private UUID listingId;

    // logical reference to users.id — no FK constraint (cross-module)
    @Column(nullable = false)
    private UUID buyerId;

    // logical reference to users.id — no FK constraint (cross-module)
    @Column(nullable = false)
    private UUID sellerId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private ConversationStatus status = ConversationStatus.ACTIVE;

    // updated on every new message — drives chat list ordering
    @Column
    private Instant lastMessageAt;

    // preview text shown in chat list
    @Column(length = 255)
    private String lastMessageText;

    @Column(nullable = false)
    private Integer buyerUnreadCount = 0;

    @Column(nullable = false)
    private Integer sellerUnreadCount = 0;
}
