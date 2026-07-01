package com.samudra.common.events;

public final class SamudraTopics {

    public static final String LISTING_CREATED = "samudra.listing.created";
    public static final String USER_INTEREST_RECORDED = "samudra.user.interest.recorded";
    public static final String NOTIFICATIONS_DLQ = "samudra.notifications.dlq";

    private SamudraTopics() {
    }
}
