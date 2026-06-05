package com.samudra.messaging.dal;

import com.samudra.messaging.entity.Message;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface MessageDal {

    Message save(Message message);

    List<Message> saveAll(Iterable<Message> messages);

    Optional<Message> findById(UUID id);

    List<Message> findByConversationId(UUID conversationId);

    long countUnreadByConversationId(UUID conversationId);
}
