package org.example.ecommerse.helpers;

import org.example.ecommerse.domains.dto.response.GeneralResponse;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.time.LocalDateTime;

public class ResponseBuilder {

    public static GeneralResponse build(String message, int status, Object data) {
        String uri = ServletUriComponentsBuilder.fromCurrentRequestUri().build().getPath();
        return new GeneralResponse(uri, message, status, LocalDateTime.now(), data);
    }
}
