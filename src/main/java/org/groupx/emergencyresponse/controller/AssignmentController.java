package org.groupx.emergencyresponse.controller;

import org.groupx.emergencyresponse.dto.AssignmentDTO;
import org.groupx.emergencyresponse.service.AssignmentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/assign")
public class AssignmentController {
    private final AssignmentService service;

    // Constructor-based dependency injection of the AssignmentService
    public AssignmentController(AssignmentService service) {
        this.service = service;
    }

    // Create a new assignment for a given emergency ID
    @PostMapping
    public ResponseEntity<AssignmentDTO> createAssignment(@RequestParam Long emergencyId) {
        AssignmentDTO dto = service.assignResponder(emergencyId);
        if (dto == null) {
            return ResponseEntity.notFound().build(); // Return 404 if no responder assigned
        }
        return ResponseEntity.ok(dto); // Return 200 OK with assignment details
    }

    // Retrieve an assignment by its ID
    @GetMapping("/{id}")
    public ResponseEntity<AssignmentDTO> getAssignment(@PathVariable Long id) {
        AssignmentDTO dto = service.getAssignment(id);
        if (dto == null) {
            return ResponseEntity.notFound().build(); // Return 404 if assignment not found
        }
        return ResponseEntity.ok(dto); // Return 200 OK with assignment details
    }

    // Retrieve an assignment by the associated emergency ID
    @GetMapping("/emergency/{emergencyId}")
    public ResponseEntity<AssignmentDTO> getAssignmentByEmergency(@PathVariable Long emergencyId) {
        AssignmentDTO dto = service.getByEmergencyId(emergencyId);
        if (dto == null) {
            return ResponseEntity.notFound().build(); // Return 404 if no assignment exists for this emergency
        }
        return ResponseEntity.ok(dto); // Return 200 OK with assignment details
    }
}
