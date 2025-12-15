package org.groupx.emergencyresponse.repository;

import org.groupx.emergencyresponse.entity.Responder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ResponderRepository extends JpaRepository<Responder, Long> {
    @Query("select r from Responder r where r.availability = true")
    List<Responder> findAvailable();
}
