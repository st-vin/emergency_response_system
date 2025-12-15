package org.groupx.emergencyresponse.repository;

import org.groupx.emergencyresponse.entity.EmergencyReport;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EmergencyReportRepository extends JpaRepository<EmergencyReport, Long> {
    List<EmergencyReport> findByReporterId(String reporterId);
}
