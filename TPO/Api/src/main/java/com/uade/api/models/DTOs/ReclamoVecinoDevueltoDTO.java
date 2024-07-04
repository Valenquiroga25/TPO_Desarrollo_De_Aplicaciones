package com.uade.api.models.DTOs;

import com.uade.api.models.Estado;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ReclamoVecinoDevueltoDTO {
    private Long idReclamo;
    private String documentoVecino;
    private String calleSitio;
    private Long numeroSitio;
    private Estado estado;
    private String desperfecto;
    private String descripcion;
    private Long idReclamoUnificado;

    public ReclamoVecinoDevueltoDTO(String calle, Long numero, String desperfecto, Long idReclamoUnificado) {
        this.calleSitio = calle;
        this.numeroSitio = numero;
        this.estado = Estado.EN_PROCESO;
        this.desperfecto = desperfecto;
        this.idReclamoUnificado = idReclamoUnificado;
    }

    public ReclamoVecinoDevueltoDTO(Long idReclamo, String documento, String calle, Long numero, Estado estado, String desperfecto, String descripcion, Long idReclamoUnificado) {
    this.idReclamo = idReclamo;
    this.documentoVecino = documento;
    this.calleSitio = calle;
    this.numeroSitio = numero;
    this.estado = Estado.EN_PROCESO;
    this.desperfecto = desperfecto;
    this.descripcion = descripcion;
    this.idReclamoUnificado = idReclamoUnificado;
    }
}
