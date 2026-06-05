package com.samudra.messaging.repository;

import com.samudra.messaging.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface MessageRepository extends JpaRepository<Message, UUID> {

    List<Message> findByConversationIdOrderByCreatedAtAsc(UUID conversationId);

    long countByConversationIdAndIsReadFalse(UUID conversationId);
}
