package com.samudra.core.events;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.samudra.common.events.BidPlacedEvent;
import com.samudra.common.events.ListingClosedEvent;
import com.samudra.common.events.ListingPublishedEvent;
import com.samudra.common.events.MarketplaceEventPublisher;
import com.samudra.common.events.SamudraTopics;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;

@Slf4j
@RequiredArgsConstructor
public class KafkaMarketplaceEventPublisher implements MarketplaceEventPublisher {

    private final KafkaTemplate<String, String> kafkaTemplate;
    private final ObjectMapper objectMapper;

    @Override
    public void onListingPublished(ListingPublishedEvent event) {
        publish(SamudraTopics.LISTING_PUBLISHED, event.listingId().toString(), event);
    }

    @Override
    public void onBidPlaced(BidPlacedEvent event) {
        publish(SamudraTopics.AUCTION_BID_PLACED, event.listingId().toString(), event);
    }

    @Override
    public void onListingClosed(ListingClosedEvent event) {
        publish(SamudraTopics.LISTING_CLOSED, event.listingId().toString(), event);
    }

    private void publish(String topic, String key, Object payload) {
        try {
            String json = objectMapper.writeValueAsString(payload);
            kafkaTemplate.send(topic, key, json);
            log.debug("Published {} key={}", topic, key);
        } catch (Exception ex) {
            log.warn("Failed to publish to {}: {}", topic, ex.getMessage());
        }
    }
}
