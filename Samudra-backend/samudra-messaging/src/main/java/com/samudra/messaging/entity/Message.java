package com.samudra.messaging.entity;


import com.samudra.common.enums.MessageType;
import jakarta.persistence.Column;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import com.samudra.common.config.BaseEntity;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;
import lombok.Builder;


@Entity
@Table(name = "messages")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Message extends BaseEntity {

    // real FK — within samudra-messaging module
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "conversation_id", nullable = false)
    private Conversation conversation;

    // logical reference to users.id — no FK constraint (cross-module)
    @Column(nullable = false)
    private UUID senderId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private MessageType messageType = MessageType.TEXT;

    // null for IMAGE type
    @Column(columnDefinition = "TEXT")
    private String content;

    // null for TEXT type
    @Column(length = 500)
    private String imageUrl;

    // only populated for OFFER type
    @Column(precision = 12, scale = 2)
    private BigDecimal offerAmount;

    @Column(nullable = false)
    private Boolean isRead = false;

    @Column
    private Instant readAt;
}
