package com.samudra.integration.model;

import com.samudra.common.notifications.ListingDigestItem;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class UserDigestPayload {

    private UUID userId;
    private List<ListingDigestItem> listings = new ArrayList<>();

    public UserDigestPayload() {
    }

    public UserDigestPayload(UUID userId) {
        this.userId = userId;
    }

    public UUID getUserId() {
        return userId;
    }

    public void setUserId(UUID userId) {
        this.userId = userId;
    }

    public List<ListingDigestItem> getListings() {
        return listings;
    }

    public void setListings(List<ListingDigestItem> listings) {
        this.listings = listings;
    }

    public void addListing(ListingDigestItem item) {
        listings.add(item);
    }
}
