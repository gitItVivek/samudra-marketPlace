package com.samudra.listing.service;

import com.samudra.common.events.ListingCloseReason;
import com.samudra.common.events.ListingClosedEvent;
import com.samudra.common.events.ListingPublishedEvent;
import com.samudra.common.events.MarketplaceEventPublisher;
import com.samudra.common.enums.CategoryType;
import com.samudra.common.enums.ListingStatus;
import com.samudra.common.enums.ListingType;
import com.samudra.common.enums.SaleType;
import com.samudra.common.listing.request.CreateListingRequest;
import com.samudra.common.listing.request.UpdateListingRequest;
import com.samudra.common.listing.response.ListingDetailResponse;
import com.samudra.common.listing.response.ListingSummaryResponse;
import com.samudra.common.response.PagedResponse;
import com.samudra.listing.dal.ListingAttributeDal;
import com.samudra.listing.dal.ListingDal;
import com.samudra.listing.dal.ListingImageDal;
import com.samudra.listing.entity.Category;
import com.samudra.listing.entity.Listing;
import com.samudra.listing.entity.ListingAttribute;
import com.samudra.listing.entity.ListingImage;
import com.samudra.listing.exception.InvalidListingStateException;
import com.samudra.listing.exception.ListingForbiddenException;
import com.samudra.listing.exception.ListingNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ListingService {

    private final ListingDal listingDal;
    private final ListingImageDal listingImageDal;
    private final ListingAttributeDal listingAttributeDal;
    private final CategoryService categoryService;
    private final ListingMapper listingMapper;
    private final MarketplaceEventPublisher marketplaceEventPublisher;

    @Transactional
    public ListingDetailResponse create(UUID userId, CreateListingRequest request) {
        Category category = categoryService.resolveCategory(request.categoryType());
        SaleType saleType = request.resolvedSaleType();
        validateCreateRequest(request, saleType);

        Listing listing = Listing.builder()
                .userId(userId)
                .categoryId(category.getId())
                .categoryType(request.categoryType())
                .title(request.title().trim())
                .description(request.description())
                .listingType(request.listingType())
                .condition(request.condition())
                .status(ListingStatus.ACTIVE)
                .saleType(saleType)
                .currency(request.currency() != null ? request.currency() : "INR")
                .city(request.city().trim())
                .state(request.state().trim())
                .locality(request.locality())
                .latitude(request.latitude())
                .longitude(request.longitude())
                .build();

        if (saleType == SaleType.FIXED_PRICE) {
            listing.setPrice(request.price());
        } else {
            listing.setStartingPrice(request.startingPrice());
            listing.setAuctionEndsAt(request.auctionEndsAt());
        }

        listing = listingDal.save(listing);
        List<ListingImage> images = saveImages(listing, request.imageUrls());
        saveCustomTag(listing, request.customTag());
        marketplaceEventPublisher.onListingPublished(new ListingPublishedEvent(
                listing.getId(),
                userId,
                saleType,
                listing.getCity(),
                request.categoryType(),
                Instant.now()));
        return listingMapper.toDetail(listing, category, images);
    }

    @Transactional(readOnly = true)
    public ListingDetailResponse getById(UUID listingId) {
        Listing listing = listingDal.findById(listingId)
                .orElseThrow(ListingNotFoundException::new);
        Category category = categoryService.requireById(listing.getCategoryId());
        List<ListingImage> images = listingImageDal.findByListingId(listingId);
        return listingMapper.toDetail(listing, category, images);
    }

    @Transactional(readOnly = true)
    public PagedResponse<ListingSummaryResponse> search(
            String city,
            String state,
            CategoryType categoryType,
            ListingType listingType,
            SaleType saleType,
            String q,
            BigDecimal minPrice,
            BigDecimal maxPrice,
            String sort,
            int page,
            int size) {
        Pageable pageable = PageRequest.of(page, size, resolveSort(sort));
        Page<Listing> results = listingDal.search(
                ListingStatus.ACTIVE, city, state, categoryType, listingType, saleType, q, minPrice, maxPrice, pageable);

        List<ListingSummaryResponse> items = results.getContent().stream()
                .map(listing -> {
                    List<ListingImage> images = listingImageDal.findByListingId(listing.getId());
                    return listingMapper.toSummary(listing, listingMapper.resolveCoverUrl(images));
                })
                .toList();

        return new PagedResponse<>(items, page, size, results.getTotalElements(), results.getTotalPages());
    }

    @Transactional(readOnly = true)
    public PagedResponse<ListingSummaryResponse> getMyListings(UUID userId, int page, int size) {
        Page<Listing> results = listingDal.findByUserId(userId, PageRequest.of(page, size));
        List<ListingSummaryResponse> items = results.getContent().stream()
                .map(listing -> {
                    List<ListingImage> images = listingImageDal.findByListingId(listing.getId());
                    return listingMapper.toSummary(listing, listingMapper.resolveCoverUrl(images));
                })
                .toList();
        return new PagedResponse<>(items, page, size, results.getTotalElements(), results.getTotalPages());
    }

    @Transactional(readOnly = true)
    public List<ListingSummaryResponse> getSummariesByIds(List<UUID> listingIds) {
        return listingDal.findByIds(listingIds).stream()
                .map(listing -> {
                    List<ListingImage> images = listingImageDal.findByListingId(listing.getId());
                    return listingMapper.toSummary(listing, listingMapper.resolveCoverUrl(images));
                })
                .toList();
    }

    @Transactional
    public ListingDetailResponse update(UUID userId, UUID listingId, UpdateListingRequest request) {
        Listing listing = requireOwnedListing(userId, listingId);
        if (request.title() != null) {
            listing.setTitle(request.title().trim());
        }
        if (request.description() != null) {
            listing.setDescription(request.description());
        }
        if (request.price() != null) {
            if (listing.getSaleType() == SaleType.AUCTION && listing.getCurrentBidId() != null) {
                throw new InvalidListingStateException("Cannot change price after bids have been placed");
            }
            listing.setPrice(request.price());
        }
        if (request.status() != null) {
            ListingStatus previousStatus = listing.getStatus();
            listing.setStatus(request.status());
            if (request.status() == ListingStatus.SOLD) {
                listing.setSoldAt(Instant.now());
            }
            if (request.status() == ListingStatus.SOLD && previousStatus != ListingStatus.SOLD) {
                publishListingClosed(listing, ListingCloseReason.MANUAL_SOLD, listing.getCurrentBidId());
            }
        }
        listing = listingDal.save(listing);
        Category category = categoryService.requireById(listing.getCategoryId());
        List<ListingImage> images = listingImageDal.findByListingId(listingId);
        return listingMapper.toDetail(listing, category, images);
    }

    @Transactional
    public void delete(UUID userId, UUID listingId) {
        Listing listing = requireOwnedListing(userId, listingId);
        listing.setStatus(ListingStatus.REMOVED);
        listing.setRemovedAt(Instant.now());
        listingDal.save(listing);
    }

    @Transactional
    public void markBidsSeen(UUID userId, UUID listingId) {
        Listing listing = requireOwnedListing(userId, listingId);
        listing.setSellerBidsSeenAt(Instant.now());
        listingDal.save(listing);
    }

    public Listing requireListing(UUID listingId) {
        return listingDal.findById(listingId)
                .orElseThrow(ListingNotFoundException::new);
    }

    public Listing requireOwnedListing(UUID userId, UUID listingId) {
        Listing listing = requireListing(listingId);
        if (!listing.getUserId().equals(userId)) {
            throw new ListingForbiddenException();
        }
        return listing;
    }

    private void validateCreateRequest(CreateListingRequest request, SaleType saleType) {
        if (saleType == SaleType.AUCTION) {
            if (request.startingPrice() == null || request.auctionEndsAt() == null) {
                throw new InvalidListingStateException("Auction listings require startingPrice and auctionEndsAt");
            }
            if (!request.auctionEndsAt().isAfter(Instant.now())) {
                throw new InvalidListingStateException("auctionEndsAt must be in the future");
            }
        } else if (request.price() == null
                && request.listingType() != com.samudra.common.enums.ListingType.FREE
                && request.listingType() != com.samudra.common.enums.ListingType.BUY
                && request.listingType() != com.samudra.common.enums.ListingType.RENT_WANTED) {
            throw new InvalidListingStateException(
                    "Fixed price listings require a price (unless listing type is FREE, BUY, or RENT_WANTED)");
        }
    }

    private void saveCustomTag(Listing listing, String customTag) {
        if (customTag == null || customTag.isBlank()) {
            return;
        }
        listingAttributeDal.save(ListingAttribute.builder()
                .listing(listing)
                .attributeKey("custom_tag")
                .attributeValue(customTag.trim())
                .displayLabel("Tag")
                .displayOrder(0)
                .build());
    }

    private List<ListingImage> saveImages(Listing listing, List<String> imageUrls) {
        if (imageUrls == null || imageUrls.isEmpty()) {
            return List.of();
        }
        List<ListingImage> images = new ArrayList<>();
        for (int i = 0; i < imageUrls.size(); i++) {
            images.add(ListingImage.builder()
                    .listing(listing)
                    .url(imageUrls.get(i))
                    .displayOrder(i)
                    .isCover(i == 0)
                    .build());
        }
        return listingImageDal.saveAll(images);
    }

    private Sort resolveSort(String sort) {
        if ("price_asc".equalsIgnoreCase(sort)) {
            return Sort.by(Sort.Order.asc("price"));
        }
        if ("price_desc".equalsIgnoreCase(sort)) {
            return Sort.by(Sort.Order.desc("price"));
        }
        return Sort.by(Sort.Order.desc("createdAt"));
    }

    private void publishListingClosed(Listing listing, ListingCloseReason reason, UUID winningBidId) {
        marketplaceEventPublisher.onListingClosed(new ListingClosedEvent(
                listing.getId(),
                listing.getUserId(),
                reason,
                winningBidId,
                Instant.now()));
    }
}
