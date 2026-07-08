package org.example.ecommerse.domains.dto.response;

import java.time.LocalDateTime;

public record GeneralResponse(
        String uri,
        String message,
        int status,
        LocalDateTime time,
        Object data
) {
}
