package com.petadopt.Tarea4.models;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.query.Param;

@Repository
public interface NotaRepository extends JpaRepository<Nota, Long> {

    @Query("SELECT AVG(n.nota) FROM Nota n WHERE n.aviso.id = :avisoId")
    Double promedioPorAviso(@Param("avisoId") Long avisoId);
}
