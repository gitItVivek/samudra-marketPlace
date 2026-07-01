package com.samudra.core.events;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.samudra.common.events.ListingCreatedEvent;
import com.samudra.common.events.SamudraTopics;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

@Slf4j
@Component
@ConditionalOnProperty(name = "samudra.events.kafka.enabled", havingValue = "true")
@RequiredArgsConstructor
public class ListingKafkaEventListener {

    private final KafkaTemplate<String, String> kafkaTemplate;
    private final ObjectMapper objectMapper;

    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    public void onListingCreated(ListingCreatedEvent event) {
        try {
            String json = objectMapper.writeValueAsString(event);
            kafkaTemplate.send(SamudraTopics.LISTING_CREATED, event.listingId().toString(), json);
            log.debug("Published {} listingId={}", SamudraTopics.LISTING_CREATED, event.listingId());
        } catch (Exception ex) {
            log.warn("Failed to publish listing.created: {}", ex.getMessage());
        }
    }
}
