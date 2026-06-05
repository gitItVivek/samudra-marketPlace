package com.samudra.messaging.dal;

import com.samudra.messaging.entity.Conversation;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ConversationDal {

    Conversation save(Conversation conversation);

    Optional<Conversation> findById(UUID id);

    Optional<Conversation> findByListingIdAndBuyerId(UUID listingId, UUID buyerId);

    List<Conversation> findByBuyerId(UUID buyerId);

    List<Conversation> findBySellerId(UUID sellerId);
}
