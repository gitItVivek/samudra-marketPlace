# Samudra-backend

Gradle **multi-module modular monolith**. Only `samudra-core` is runnable.

## Modules

| Module | Role |
|--------|------|
| `samudra-common` | Shared utilities (no entities) |
| `samudra-listing` | Listing domain |
| `samudra-community` | Communities |
| `samudra-auction` | Auctions (Phase 2) |
| `samudra-messaging` | Messaging (Phase 3) |
| `samudra-core` | Spring Boot app, Flyway, REST |

## Build and run

From this directory (`Samudra-backend`):

```bash
./gradlew clean build
./gradlew :samudra-core:bootRun
```

On Windows:

```bat
gradlew.bat clean build
gradlew.bat :samudra-core:bootRun
```

## Database

Configure in `samudra-core/src/main/resources/application.properties`.

Flyway migrations: `samudra-core/src/main/resources/db/migration/`
