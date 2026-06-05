package com.samudra.messaging.dal.impl;

import com.samudra.messaging.dal.ConversationDal;
import com.samudra.messaging.entity.Conversation;
import com.samudra.messaging.repository.ConversationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class ConversationDalImpl implements ConversationDal {

    private final ConversationRepository conversationRepository;

    @Override
    public Conversation save(Conversation conversation) {
        return conversationRepository.save(conversation);
    }

    @Override
    public Optional<Conversation> findById(UUID id) {
        return conversationRepository.findById(id);
    }

    @Override
    public Optional<Conversation> findByListingIdAndBuyerId(UUID listingId, UUID buyerId) {
        return conversationRepository.findByListingIdAndBuyerId(listingId, buyerId);
    }

    @Override
    public List<Conversation> findByBuyerId(UUID buyerId) {
        return conversationRepository.findByBuyerIdOrderByLastMessageAtDesc(buyerId);
    }

    @Override
    public List<Conversation> findBySellerId(UUID sellerId) {
        return conversationRepository.findBySellerIdOrderByLastMessageAtDesc(sellerId);
    }
}
