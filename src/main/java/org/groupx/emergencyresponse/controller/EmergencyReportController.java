package org.groupx.emergencyresponse.controller;

import org.groupx.emergencyresponse.dto.CreateEmergencyReportDTO;
import org.groupx.emergencyresponse.dto.EmergencyResponseDTO;
import org.groupx.emergencyresponse.entity.EmergencyReport;
import org.groupx.emergencyresponse.service.EmergencyReportService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/alerts")
public class EmergencyReportController {
    private final EmergencyReportService service;

    // Constructor-based dependency injection of the EmergencyReportService
    public EmergencyReportController(EmergencyReportService service) {
        this.service = service;
    }

    // Create a new emergency report
    @PostMapping
    public ResponseEntity<?> createReport(@RequestBody CreateEmergencyReportDTO dto) {
        // Validate reporterId before creating the report
        if (!service.validateReporter(dto.reporterId)) {
            return ResponseEntity.badRequest().body("Invalid reporterId"); // Return 400 if invalid
        }
        Long id = service.createReport(dto);
        return ResponseEntity.ok(id); // Return 200 OK with the newly created report ID
    }

    // Retrieve an emergency report by its ID
    @GetMapping("/{id}")
    public ResponseEntity<EmergencyReport> getReport(@PathVariable Long id) {
        EmergencyReport report = service.getReport(id);
        if (report == null) {
            return ResponseEntity.notFound().build(); // Return 404 if not found
        }
        return ResponseEntity.ok(report); // Return 200 OK with report details
    }

    // Retrieve all reports submitted by a specific reporter
    @GetMapping("/reporter/{reporterId}")
    public ResponseEntity<List<EmergencyReport>> getReportsByReporter(@PathVariable String reporterId) {
        List<EmergencyReport> reports = service.getReportsByReporterId(reporterId);
        return ResponseEntity.ok(reports); // Return 200 OK with list of reports (may be empty)
    }

    // Assign a responder to a specific emergency report
    @PostMapping("/{id}/assign")
    public ResponseEntity<EmergencyResponseDTO> assignResponder(@PathVariable Long id) {
        EmergencyResponseDTO response = service.notifyResponderService(id);
        if (response == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // Return 404 if no responder assigned
        }
        return ResponseEntity.ok(response); // Return 200 OK with responder assignment info
    }
}
