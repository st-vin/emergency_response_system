package org.groupx.emergencyresponse.entity;

import jakarta.persistence.*;

@Entity
public class Responder {
    @Id
    // Tells JPA to let the database auto-generate the primary key using an identity column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String role; // MEDIC, POLICE, FIRE
    private Double currentLat;
    private Double currentLng;
    private Boolean availability;

    public Responder() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
    public Double getCurrentLat() { return currentLat; }
    public void setCurrentLat(Double currentLat) { this.currentLat = currentLat; }
    public Double getCurrentLng() { return currentLng; }
    public void setCurrentLng(Double currentLng) { this.currentLng = currentLng; }
    public Boolean getAvailability() { return availability; }
    public void setAvailability(Boolean availability) { this.availability = availability; }
}
