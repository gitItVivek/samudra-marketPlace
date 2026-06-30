package com.samudra.messaging.dal.impl;

import com.samudra.messaging.dal.MessageDal;
import com.samudra.messaging.entity.Message;
import com.samudra.messaging.repository.MessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class MessageDalImpl implements MessageDal {

    private final MessageRepository messageRepository;

    @Override
    public Message save(Message message) {
        return messageRepository.save(message);
    }

    @Override
    public List<Message> saveAll(Iterable<Message> messages) {
        return messageRepository.saveAll(messages);
    }

    @Override
    public Optional<Message> findById(UUID id) {
        return messageRepository.findById(id);
    }

    @Override
    public List<Message> findByConversationId(UUID conversationId) {
        return messageRepository.findByConversationIdOrderByCreatedAtAsc(conversationId);
    }

    @Override
    public long countUnreadByConversationId(UUID conversationId) {
        return messageRepository.countByConversationIdAndIsReadFalse(conversationId);
    }
}
