package com.samudra.auction.exception;

public class AuctionClosedException extends RuntimeException {
    public AuctionClosedException() {
        super("This auction is no longer accepting bids");
    }
}
