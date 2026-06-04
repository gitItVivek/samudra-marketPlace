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
@Table(name = "listing_attributes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ListingAttribute extends BaseEntity {

    // real FK — within samudra-listing module
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "listing_id", nullable = false)
    private Listing listing;

    @Column(nullable = false, length = 100)
    private String attributeKey;

    @Column(nullable = false, length = 500)
    private String attributeValue;

    @Column(length = 100)
    private String displayLabel;

    @Column(nullable = false)
    private Integer displayOrder = 0;
}
