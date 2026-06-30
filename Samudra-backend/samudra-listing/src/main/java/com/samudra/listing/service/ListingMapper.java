package com.samudra.listing.service;

import com.samudra.common.enums.ListingStatus;
import com.samudra.common.enums.SaleType;
import com.samudra.common.listing.response.ListingDetailResponse;
import com.samudra.common.listing.response.ListingImageResponse;
import com.samudra.common.listing.response.ListingSummaryResponse;
import com.samudra.listing.entity.Category;
import com.samudra.listing.entity.Listing;
import com.samudra.listing.entity.ListingImage;
import org.springframework.stereotype.Component;

import java.util.Comparator;
import java.util.List;

@Component
public class ListingMapper {

    public ListingSummaryResponse toSummary(Listing listing, String coverImageUrl) {
        return new ListingSummaryResponse(
                listing.getId(),
                listing.getUserId(),
                listing.getTitle(),
                listing.getDescription(),
                listing.getCategoryType(),
                listing.getListingType(),
                listing.getStatus(),
                listing.getSaleType(),
                listing.getPrice(),
                listing.getStartingPrice(),
                listing.getCurrentBidAmount(),
                listing.getCurrency(),
                listing.getCity(),
                listing.getState(),
                listing.getLocality(),
                coverImageUrl,
                listing.getCreatedAt(),
                listing.getAuctionEndsAt()
        );
    }

    public ListingDetailResponse toDetail(Listing listing, Category category, List<ListingImage> images) {
        List<ListingImageResponse> imageResponses = images.stream()
                .sorted(Comparator.comparingInt(ListingImage::getDisplayOrder))
                .map(img -> new ListingImageResponse(img.getUrl(), img.getDisplayOrder(), img.getIsCover()))
                .toList();

        return new ListingDetailResponse(
                listing.getId(),
                listing.getUserId(),
                category.getId(),
                listing.getTitle(),
                listing.getDescription(),
                listing.getCategoryType(),
                listing.getListingType(),
                listing.getCondition(),
                listing.getStatus(),
                listing.getSaleType(),
                listing.getPrice(),
                listing.getStartingPrice(),
                listing.getCurrentBidAmount(),
                listing.getCurrency(),
                listing.getCity(),
                listing.getState(),
                listing.getLocality(),
                listing.getLatitude(),
                listing.getLongitude(),
                imageResponses,
                listing.getCreatedAt(),
                listing.getUpdatedAt(),
                listing.getAuctionEndsAt()
        );
    }

    public String resolveCoverUrl(List<ListingImage> images) {
        return images.stream()
                .filter(ListingImage::getIsCover)
                .findFirst()
                .or(() -> images.stream().min(Comparator.comparingInt(ListingImage::getDisplayOrder)))
                .map(ListingImage::getUrl)
                .orElse(null);
    }

    public boolean isAuctionActive(Listing listing) {
        return listing.getSaleType() == SaleType.AUCTION
                && listing.getStatus() == ListingStatus.ACTIVE;
    }
}
