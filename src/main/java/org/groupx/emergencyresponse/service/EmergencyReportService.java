package org.groupx.emergencyresponse.service;

import org.groupx.emergencyresponse.dto.CreateEmergencyReportDTO;
import org.groupx.emergencyresponse.dto.EmergencyResponseDTO;
import org.groupx.emergencyresponse.entity.EmergencyReport;
import org.groupx.emergencyresponse.repository.EmergencyReportRepository;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class EmergencyReportService {
    private final EmergencyReportRepository repo;
    private final AssignmentService assignmentService;
    private final ResponderService responderService;

    public EmergencyReportService(EmergencyReportRepository repo, 
                                   AssignmentService assignmentService,
                                   ResponderService responderService) {
        this.repo = repo;
        this.assignmentService = assignmentService;
        this.responderService = responderService;
    }

    // Validates the reporterId: must not be null, empty, or shorter than 3 characters
    public boolean validateReporter(String reporterId) {
        if (reporterId == null) return false;
        String s = reporterId.trim();
        return !s.isEmpty() && s.length() >= 3;
    }

    // Creates a new emergency report, saves it to the database, and returns its generated ID
    public Long createReport(CreateEmergencyReportDTO dto) {
        // Map incoming DTO fields to a new EmergencyReport entity
        EmergencyReport er = new EmergencyReport();
        er.setType(dto.type);
        er.setDescription(dto.description);
        er.setLocationLat(dto.locationLat);
        er.setLocationLng(dto.locationLng);
        er.setReporterId(dto.reporterId);
        er.setTimestamp(new Date());// Record the creation timestamp
        er.setStatus("NEW");// Initial status of the report

        // Persist the report and return its ID
        EmergencyReport saved = repo.save(er);
        return saved.getId();
    }

    public EmergencyReport getReport(Long id) {
        return repo.findById(id).orElse(null);
    }

    public List<EmergencyReport> getReportsByReporterId(String reporterId) {
        return repo.findByReporterId(reporterId);
    }

    // Notifies the responder service by assigning a responder to the emergency
    public EmergencyResponseDTO notifyResponderService(Long emergencyId) {
        // Ask assignmentService to pick a responder; stop if none assigned
        var assignmentDTO = assignmentService.assignResponder(emergencyId);
        if (assignmentDTO == null) return null;

        // Fetch the responder details; stop if responder not found
        var responder = responderService.getResponder(assignmentDTO.responderId);
        if (responder == null) return null;

        // Build and return the response object containing responder info and ETA
        EmergencyResponseDTO response = new EmergencyResponseDTO();
        response.reportId = emergencyId;
        response.responderName = responder.getName();
        response.responderRole = responder.getRole();
        response.etaMinutes = assignmentDTO.etaMinutes;
        return response;
    }
}
