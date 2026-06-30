package com.samudra.core.events;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.samudra.common.events.MarketplaceEventPublisher;
import com.samudra.common.events.NoOpMarketplaceEventPublisher;
import org.apache.kafka.clients.producer.ProducerConfig;
import org.apache.kafka.common.serialization.StringSerializer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.core.DefaultKafkaProducerFactory;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.core.ProducerFactory;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class MarketplaceEventConfig {

    @Bean
    @ConditionalOnProperty(name = "samudra.events.kafka.enabled", havingValue = "false", matchIfMissing = true)
    MarketplaceEventPublisher noOpMarketplaceEventPublisher() {
        return NoOpMarketplaceEventPublisher.INSTANCE;
    }

    @Configuration
    @ConditionalOnProperty(name = "samudra.events.kafka.enabled", havingValue = "true")
    static class KafkaMarketplaceEventProducerConfig {

        @Bean
        ProducerFactory<String, String> marketplaceEventProducerFactory(
                @Value("${spring.kafka.bootstrap-servers:localhost:9092}") String bootstrapServers) {
            Map<String, Object> config = new HashMap<>();
            config.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, bootstrapServers);
            config.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
            config.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
            config.put(ProducerConfig.ACKS_CONFIG, "all");
            return new DefaultKafkaProducerFactory<>(config);
        }

        @Bean
        KafkaTemplate<String, String> marketplaceKafkaTemplate(ProducerFactory<String, String> producerFactory) {
            return new KafkaTemplate<>(producerFactory);
        }

        @Bean
        MarketplaceEventPublisher kafkaMarketplaceEventPublisher(
                KafkaTemplate<String, String> kafkaTemplate,
                ObjectMapper objectMapper) {
            return new KafkaMarketplaceEventPublisher(kafkaTemplate, objectMapper);
        }
    }
}
