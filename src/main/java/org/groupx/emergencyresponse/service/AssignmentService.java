package org.groupx.emergencyresponse.service;

import org.groupx.emergencyresponse.dto.AssignmentDTO;
import org.groupx.emergencyresponse.entity.Assignment;
import org.groupx.emergencyresponse.entity.EmergencyReport;
import org.groupx.emergencyresponse.entity.Responder;
import org.groupx.emergencyresponse.repository.AssignmentRepository;
import org.groupx.emergencyresponse.repository.EmergencyReportRepository;
import org.groupx.emergencyresponse.repository.ResponderRepository;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class AssignmentService {
    private final AssignmentRepository assignmentRepository;
    private final ResponderRepository responderRepository;
    private final EmergencyReportRepository emergencyReportRepository;

    // Constructor-based dependency injection of repositories
    public AssignmentService(AssignmentRepository assignmentRepository,
                             ResponderRepository responderRepository,
                             EmergencyReportRepository emergencyReportRepository) {
        this.assignmentRepository = assignmentRepository;
        this.responderRepository = responderRepository;
        this.emergencyReportRepository = emergencyReportRepository;
    }

    // Assigns a responder to a given emergency and returns assignment details
    public AssignmentDTO assignResponder(Long emergencyId) {
        // Fetch the emergency report; return null if not found
        EmergencyReport report = emergencyReportRepository.findById(emergencyId).orElse(null);
        if (report == null) return null;

        // Get all available responders; return null if none
        List<Responder> available = responderRepository.findAvailable();
        if (available.isEmpty()) return null;

        // Pick the first available responder
        Responder chosen = available.get(0);

        // Calculate estimated time of arrival (ETA) in minutes
        int eta = calculateETA(chosen.getCurrentLat(), chosen.getCurrentLng(),
                report.getLocationLat(), report.getLocationLng());

        // Create and save a new assignment record
        Assignment a = new Assignment();
        a.setEmergencyId(emergencyId);
        a.setResponderId(chosen.getId());
        a.setEtaMinutes(eta);
        a.setAssignmentTime(new Date());
        a.setSyncStatus("PENDING"); // mark as pending for sync purposes
        Assignment saved = assignmentRepository.save(a);

        // Map saved assignment to DTO for returning
        AssignmentDTO dto = new AssignmentDTO();
        dto.id = saved.getId();
        dto.emergencyId = saved.getEmergencyId();
        dto.responderId = saved.getResponderId();
        dto.etaMinutes = saved.getEtaMinutes() == null ? 0 : saved.getEtaMinutes();
        return dto;
    }

    // Retrieve an assignment by its ID
    public AssignmentDTO getAssignment(Long id) {
        return assignmentRepository.findById(id).map(a -> {
            AssignmentDTO dto = new AssignmentDTO();
            dto.id = a.getId();
            dto.emergencyId = a.getEmergencyId();
            dto.responderId = a.getResponderId();
            dto.etaMinutes = a.getEtaMinutes() == null ? 0 : a.getEtaMinutes();
            return dto;
        }).orElse(null);
    }

    // Retrieve an assignment by the associated emergency ID
    public AssignmentDTO getByEmergencyId(Long emergencyId) {
        return assignmentRepository.findByEmergencyId(emergencyId).map(a -> {
            AssignmentDTO dto = new AssignmentDTO();
            dto.id = a.getId();
            dto.emergencyId = a.getEmergencyId();
            dto.responderId = a.getResponderId();
            dto.etaMinutes = a.getEtaMinutes() == null ? 0 : a.getEtaMinutes();
            return dto;
        }).orElse(null);
    }

    // Calculate ETA in minutes based on responder and emergency coordinates
    private int calculateETA(Double rLat, Double rLng, Double eLat, Double eLng) {
        if (rLat == null || rLng == null || eLat == null || eLng == null) return 15; // default ETA
        double dx = rLat - eLat;
        double dy = rLng - eLng;
        double distance = Math.sqrt(dx*dx + dy*dy) * 111.0; // approximate degrees to km
        double minutes = (distance / 40.0) * 60.0; // assume average speed 40 km/h
        int eta = (int)Math.round(minutes);
        if (eta < 3) eta = 3; // minimum ETA of 3 minutes
        return eta;
    }
}

