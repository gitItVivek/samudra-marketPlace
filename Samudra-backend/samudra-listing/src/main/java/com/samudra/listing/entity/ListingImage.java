package com.samudra.listing.entity;

import com.samudra.common.config.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "listing_images")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ListingImage extends BaseEntity {

    // real FK — within samudra-listing module
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "listing_id", nullable = false)
    private Listing listing;

    @Column(nullable = false, length = 500)
    private String url;

    @Column(nullable = false)
    private Integer displayOrder = 0;

    @Column(nullable = false)
    private Boolean isCover = false;

    @Column
    private Integer width;

    @Column
    private Integer height;

    @Column
    private Integer sizeBytes;
}
