package org.groupx.emergencyresponse.entity;

import jakarta.persistence.*;
import java.util.Date;

@Entity
public class Assignment {
    @Id
    // Tells JPA to let the database auto-generate the primary key using an identity column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long emergencyId; // stored as value, not FK
    private Long responderId;
    private Integer etaMinutes;

    // Instructs JPA to store this Date field as a full timestamp (both date and time)
    @Temporal(TemporalType.TIMESTAMP)
    private Date assignmentTime;
    private String syncStatus; // PENDING, SYNCED

    public Assignment() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getEmergencyId() { return emergencyId; }
    public void setEmergencyId(Long emergencyId) { this.emergencyId = emergencyId; }
    public Long getResponderId() { return responderId; }
    public void setResponderId(Long responderId) { this.responderId = responderId; }
    public Integer getEtaMinutes() { return etaMinutes; }
    public void setEtaMinutes(Integer etaMinutes) { this.etaMinutes = etaMinutes; }
    public Date getAssignmentTime() { return assignmentTime; }
    public void setAssignmentTime(Date assignmentTime) { this.assignmentTime = assignmentTime; }
    public String getSyncStatus() { return syncStatus; }
    public void setSyncStatus(String syncStatus) { this.syncStatus = syncStatus; }
}
