package org.groupx.emergencyresponse.config;

import org.groupx.emergencyresponse.entity.Responder;
import org.groupx.emergencyresponse.repository.ResponderRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataSeeder implements CommandLineRunner {
    private final ResponderRepository responderRepository;

    public DataSeeder(ResponderRepository responderRepository) {
        this.responderRepository = responderRepository;
    }

    @Override
    public void run(String... args) {
        // Seed some test responders
        if (responderRepository.count() == 0) {
            Responder r1 = new Responder();
            r1.setName("James Mwangi");
            r1.setRole("MEDIC");
            r1.setCurrentLat(-1.2921); // Nairobi
            r1.setCurrentLng(36.8219);
            r1.setAvailability(true);
            responderRepository.save(r1);

            Responder r2 = new Responder();
            r2.setName("Aisha Odhiambo");
            r2.setRole("POLICE");
            r2.setCurrentLat(-4.0435); // Mombasa
            r2.setCurrentLng(39.6682);
            r2.setAvailability(true);
            responderRepository.save(r2);

            Responder r3 = new Responder();
            r3.setName("Peter Ochieng");
            r3.setRole("FIRE");
            r3.setCurrentLat(-0.0917); // Kisumu
            r3.setCurrentLng(34.7679);
            r3.setAvailability(true);
            responderRepository.save(r3);

            Responder r4 = new Responder();
            r4.setName("Grace Wanjiku");
            r4.setRole("MEDIC");
            r4.setCurrentLat(0.5204); // Eldoret
            r4.setCurrentLng(35.2694);
            r4.setAvailability(false);
            responderRepository.save(r4);

            System.out.println("Seeded " + responderRepository.count() + " responders");
        }
    }
}
