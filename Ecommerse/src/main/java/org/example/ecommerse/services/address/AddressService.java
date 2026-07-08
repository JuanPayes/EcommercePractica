package org.example.ecommerse.services.address;

import lombok.RequiredArgsConstructor;
import org.example.ecommerse.domains.dto.request.address.AddressRequest;
import org.example.ecommerse.domains.dto.response.address.AddressResponse;
import org.example.ecommerse.domains.entities.Address;
import org.example.ecommerse.domains.entities.User;
import org.example.ecommerse.exceptions.ResourceNotFoundException;
import org.example.ecommerse.helpers.mappers.AddressMapper;
import org.example.ecommerse.repositories.AddressRepository;
import org.example.ecommerse.repositories.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AddressService {

    private final AddressRepository addressRepository;
    private final UserRepository userRepository;



    @Transactional
    public AddressResponse crear(Long userId, AddressRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado con id: " + userId));

        Address address = AddressMapper.toEntity(request);
        address.setUser(user);

        return AddressMapper.toResponse(addressRepository.save(address));
    }

    @Transactional(readOnly = true)
    public List<AddressResponse> listarPorUsuario(Long userId) {
        return addressRepository.findByUserId(userId).stream()
                .map(AddressMapper::toResponse)
                .toList();
    }
}
