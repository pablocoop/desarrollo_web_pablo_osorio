package com.petadopt.Tarea4.controllers;

import com.petadopt.Tarea4.models.AvisoAdopcion;
import com.petadopt.Tarea4.models.AvisoAdopcionRepository;
import com.petadopt.Tarea4.models.Nota;
import com.petadopt.Tarea4.models.NotaRepository;
import com.petadopt.Tarea4.models.NotaRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/notas")
public class NotaRestController {

    private final AvisoAdopcionRepository avisoRepo;
    private final NotaRepository notaRepo;

    public NotaRestController(AvisoAdopcionRepository avisoRepo, NotaRepository notaRepo) {
        this.avisoRepo = avisoRepo;
        this.notaRepo = notaRepo;
    }

    @PostMapping
    public ResponseEntity<?> agregarNota(@Valid @RequestBody NotaRequest req) {

        long avisoId = req.getAvisoId();
        int valorNota = req.getNota();

        // Validación: Aviso debe existir
        Optional<AvisoAdopcion> optAviso = avisoRepo.findById(avisoId);

        if (optAviso.isEmpty()) {
            return ResponseEntity.badRequest().body(
                Map.of("ok", false, "mensaje", "El aviso no existe.")
            );
        }

        AvisoAdopcion aviso = optAviso.get();

        // Crear y guardar la nota
        Nota nueva = new Nota();
        nueva.setAviso(aviso);
        nueva.setNota(valorNota);
        notaRepo.save(nueva);

        // Obtener nuevo promedio
        Double nuevoPromedio = notaRepo.promedioPorAviso(avisoId);

        return ResponseEntity.ok(
            Map.of(
                "ok", true,
                "mensaje", "Nota registrada correctamente.",
                "promedio", nuevoPromedio
            )
        );
    }
}
