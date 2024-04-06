package com.uade.api.models;

public enum Sector {
    AREAS_VERDES("Áreas Verdes"),
    ESCUELAS("Escuelas"),
    MUSEOS("Museos"),
    BACHEO_Y_DEMARCACION("Bacheo y Demarcación"),
    PLAZAS_Y_PARQUES("Plazas y Parques"),
    SEMAFOROS_Y_SENALETICA("Semáforos y Señalética"),
    SEGURIDAD("Seguridad"),
    EDIFICIOS_PUBLICOS_Y_OFICINAS("Edificios Públicos y Oficinas");

    private final String descripcion;

    Sector(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getDescripcion() {
        return descripcion;
    }
}

