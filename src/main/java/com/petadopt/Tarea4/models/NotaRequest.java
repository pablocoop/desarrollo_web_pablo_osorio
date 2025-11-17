package com.petadopt.Tarea4.models;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public class NotaRequest {

    @NotNull
    private Long avisoId;

    @NotNull
    @Min(1)
    @Max(7)
    private Integer nota;

    public Long getAvisoId() {
        return avisoId;
    }
    public void setAvisoId(Long avisoId) {
        this.avisoId = avisoId;
    }

    public Integer getNota() {
        return nota;
    }
    public void setNota(Integer nota) {
        this.nota = nota;
    }
}
