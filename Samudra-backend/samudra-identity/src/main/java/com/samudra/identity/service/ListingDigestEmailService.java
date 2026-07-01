package com.samudra.identity.service;

import com.samudra.common.notifications.ListingDigestItem;
import com.samudra.common.notifications.ListingDigestNotificationRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

@Slf4j
@Service
@RequiredArgsConstructor
public class ListingDigestEmailService {

    private final JavaMailSender mailSender;

    @Value("${samudra.mail.from:samudramarketplace@gmail.com}")
    private String fromAddress;

    @Value("${samudra.marketplace.base-url:https://samudra.digital}")
    private String marketplaceBaseUrl;

    public void sendDigest(ListingDigestNotificationRequest request) {
        if (!StringUtils.hasText(request.email())) {
            log.warn("Skipping digest for userId={} — no email", request.userId());
            return;
        }
        String body = buildBody(request);
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromAddress);
            message.setTo(request.email());
            message.setSubject("New listings matching your interests on Samudra");
            message.setText(body);
            mailSender.send(message);
            log.info("Listing digest email sent to userId={} listings={}", request.userId(), request.listings().size());
        } catch (Exception ex) {
            log.warn("Failed to send digest to userId={}: {}", request.userId(), ex.getMessage());
            throw ex;
        }
    }

    private String buildBody(ListingDigestNotificationRequest request) {
        StringBuilder sb = new StringBuilder();
        String name = StringUtils.hasText(request.displayName()) ? request.displayName() : "there";
        sb.append("Hi ").append(name).append(",\n\n");
        sb.append("New listings were posted that match what you are looking for:\n\n");
        for (ListingDigestItem item : request.listings()) {
            sb.append("- ").append(item.title()).append(" (").append(item.city()).append(")\n");
            sb.append("  ").append(marketplaceBaseUrl).append("/listings/").append(item.listingId()).append("\n\n");
        }
        sb.append("Manage your alert preferences in Account → Notifications.\n");
        return sb.toString();
    }
}
