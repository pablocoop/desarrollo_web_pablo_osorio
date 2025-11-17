package com.petadopt.Tarea4.models;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AvisoAdopcionRepository extends JpaRepository<AvisoAdopcion, Long> {
    // No necesitas métodos adicionales para la Tarea 4
}
