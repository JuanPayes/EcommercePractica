package org.example.ecommerse.helpers.mappers;

import org.example.ecommerse.domains.dto.request.address.AddressRequest;
import org.example.ecommerse.domains.dto.response.address.AddressResponse;
import org.example.ecommerse.domains.entities.Address;

public class AddressMapper {

    public static AddressResponse toResponse(Address address) {
        return new AddressResponse(
                address.getId(),
                address.getCalle(),
                address.getCiudad(),
                address.getReferencia(),
                address.isEsPrincipal()
        );
    }

    public static Address toEntity(AddressRequest dto) {
        Address address = new Address();
        address.setCalle(dto.calle());
        address.setCiudad(dto.ciudad());
        address.setReferencia(dto.referencia());
        address.setEsPrincipal(dto.esPrincipal());
        return address;
    }
}
