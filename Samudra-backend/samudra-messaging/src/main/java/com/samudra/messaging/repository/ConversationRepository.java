package com.samudra.messaging.repository;

import com.samudra.messaging.entity.Conversation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ConversationRepository extends JpaRepository<Conversation, UUID> {

    Optional<Conversation> findByListingIdAndBuyerId(UUID listingId, UUID buyerId);

    List<Conversation> findByBuyerIdOrderByLastMessageAtDesc(UUID buyerId);

    List<Conversation> findBySellerIdOrderByLastMessageAtDesc(UUID sellerId);
}
