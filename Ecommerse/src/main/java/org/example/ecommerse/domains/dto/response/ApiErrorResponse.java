package org.example.ecommerse.domains.dto.response;

import java.time.LocalDate;
import java.time.LocalDateTime;

public record ApiErrorResponse(
        Object message,
        int status,
        String url,
        LocalDateTime time
) {}
