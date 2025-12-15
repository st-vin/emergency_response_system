package org.groupx.emergencyresponse.service;

import org.groupx.emergencyresponse.entity.Responder;
import org.groupx.emergencyresponse.repository.ResponderRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ResponderService {
    private final ResponderRepository responderRepository;

    // Constructor-based dependency injection
    public ResponderService(ResponderRepository responderRepository) {
        this.responderRepository = responderRepository;
    }

    // Retrieve all responders who are currently available
    public List<Responder> getAvailableResponders() {
        return responderRepository.findAvailable();
    }

    // Retrieve all responders in the system
    public List<Responder> getAllResponders() {
        return responderRepository.findAll();
    }

    // Retrieve a responder by their ID; return null if not found
    public Responder getResponder(Long id) {
        return responderRepository.findById(id).orElse(null);
    }

    // Save a new responder; default availability to true if not set
    public Responder save(Responder responder) {
        if (responder.getAvailability() == null) responder.setAvailability(true);
        return responderRepository.save(responder);
    }

    // Update the location (latitude and longitude) of a responder
    public Responder updateLocation(Long id, double lat, double lng) {
        Responder r = responderRepository.findById(id).orElse(null);
        if (r == null) return null; // responder not found
        r.setCurrentLat(lat);
        r.setCurrentLng(lng);
        return responderRepository.save(r);
    }
}
