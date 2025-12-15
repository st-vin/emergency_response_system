package org.groupx.emergencyresponse.repository;

import org.groupx.emergencyresponse.entity.Assignment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AssignmentRepository extends JpaRepository<Assignment, Long> {
    Optional<Assignment> findByEmergencyId(Long emergencyId);
}
