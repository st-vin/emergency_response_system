package org.groupx.emergencyresponse.controller;

import org.groupx.emergencyresponse.dto.ResponderDTO;
import org.groupx.emergencyresponse.entity.Responder;
import org.groupx.emergencyresponse.service.ResponderService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/responders")
public class ResponderController {
    private final ResponderService service;

    // Constructor-based dependency injection of ResponderService
    public ResponderController(ResponderService service) {
        this.service = service;
    }

    // Retrieve all responders in the system
    @GetMapping
    public ResponseEntity<List<ResponderDTO>> getAllResponders() {
        List<Responder> responders = service.getAllResponders();
        // Map Responder entities to DTOs for API response
        List<ResponderDTO> dtos = responders.stream().map(r -> {
            ResponderDTO dto = new ResponderDTO();
            dto.id = r.getId();
            dto.name = r.getName();
            dto.role = r.getRole();
            dto.availability = r.getAvailability();
            return dto;
        }).collect(Collectors.toList());
        return ResponseEntity.ok(dtos); // Return 200 OK with list of responder DTOs
    }

    // Retrieve a specific responder by ID
    @GetMapping("/{id}")
    public ResponseEntity<ResponderDTO> getResponder(@PathVariable Long id) {
        Responder responder = service.getResponder(id);
        if (responder == null) {
            return ResponseEntity.notFound().build(); // Return 404 if responder not found
        }
        // Map entity to DTO for API response
        ResponderDTO dto = new ResponderDTO();
        dto.id = responder.getId();
        dto.name = responder.getName();
        dto.role = responder.getRole();
        dto.availability = responder.getAvailability();
        return ResponseEntity.ok(dto); // Return 200 OK with responder DTO
    }

    // Update the location of a responder
    @PatchMapping("/{id}/location")
    public ResponseEntity<ResponderDTO> updateLocation(@PathVariable Long id,
                                                       @RequestParam double lat,
                                                       @RequestParam double lng) {
        Responder responder = service.updateLocation(id, lat, lng);
        if (responder == null) {
            return ResponseEntity.notFound().build(); // Return 404 if responder not found
        }
        // Map updated entity to DTO for API response
        ResponderDTO dto = new ResponderDTO();
        dto.id = responder.getId();
        dto.name = responder.getName();
        dto.role = responder.getRole();
        dto.availability = responder.getAvailability();
        return ResponseEntity.ok(dto); // Return 200 OK with updated responder DTO
    }
}
