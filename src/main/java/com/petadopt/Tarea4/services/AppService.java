package com.petadopt.Tarea4.services;

import com.petadopt.Tarea4.models.AvisoAdopcion;
import com.petadopt.Tarea4.models.AvisoAdopcionRepository;
import com.petadopt.Tarea4.models.NotaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppService {

    private final AvisoAdopcionRepository avisoRepo;
    private final NotaRepository notaRepo;

    public AppService(AvisoAdopcionRepository avisoRepo, NotaRepository notaRepo) {
        this.avisoRepo = avisoRepo;
        this.notaRepo = notaRepo;
    }

    //Obtiene todos los avisos y les calcula el promedio de notas.
    public List<AvisoAdopcion> obtenerAvisosConPromedio() {

        List<AvisoAdopcion> avisos = avisoRepo.findAll();

        avisos.forEach(aviso -> {
            Double promedio = notaRepo.promedioPorAviso(aviso.getId());
            aviso.setPromedio(promedio);
        });

        return avisos;
    }
}
