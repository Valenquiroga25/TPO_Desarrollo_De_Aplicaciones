package com.uade.api.models.DTOs;

import com.uade.api.models.Estado;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReclamoPersonalDevueltoDTO {
    private Long idReclamo;
    private String legajoPersonal;
    private String calleSitio;
    private Long numeroSitio;
    private Estado estado;
    private String desperfecto;
    private String descripcion;
    private Long idReclamoUnificado;

    public ReclamoPersonalDevueltoDTO(String calle, Long numero, String descripcion, Long idReclamoUnificado) {
        this.calleSitio = calle;
        this.numeroSitio = numero;
        this.estado = Estado.EN_PROCESO;
        this.desperfecto = desperfecto;
        this.idReclamoUnificado = idReclamoUnificado;
    }
}
