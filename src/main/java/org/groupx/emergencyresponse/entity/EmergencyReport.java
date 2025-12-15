package org.groupx.emergencyresponse.entity;

import jakarta.persistence.*;
import java.util.Date;

@Entity
public class EmergencyReport {
    @Id
    // Tells JPA to let the database auto-generate the primary key using an identity column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String type;
    private String description;
    private Double locationLat;
    private Double locationLng;

    // Instructs JPA to store this Date field as a full timestamp (both date and time)
    @Temporal(TemporalType.TIMESTAMP)
    private Date timestamp;
    private String status;
    private String reporterId;

    public EmergencyReport() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public Double getLocationLat() { return locationLat; }
    public void setLocationLat(Double locationLat) { this.locationLat = locationLat; }
    public Double getLocationLng() { return locationLng; }
    public void setLocationLng(Double locationLng) { this.locationLng = locationLng; }
    public Date getTimestamp() { return timestamp; }
    public void setTimestamp(Date timestamp) { this.timestamp = timestamp; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getReporterId() { return reporterId; }
    public void setReporterId(String reporterId) { this.reporterId = reporterId; }
}
