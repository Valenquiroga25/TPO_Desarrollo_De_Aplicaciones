package com.uade.api.models.DTOs;

import com.uade.api.models.*;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReclamoModelDTO {
    private String documentoVecino;
    private String legajoPersonal;
    private Long idSitio;
    private Long idDesperfecto;
    private String descripcion;
    private List<ImagenModel> imagenes;
    private int idReclamoUnificado;

    public ReclamoModelDTO(VecinoModel vecino, SitioModel sitio, DesperfectoModel desperfecto, String descripcion, List<ImagenModel> imagenes, int idReclamoUnificado){
    }

    public ReclamoModelDTO(PersonalModel personal, SitioModel sitio, DesperfectoModel desperfecto, String descripcion, List<ImagenModel> imagenes, int idReclamoUnificado){
    }
}
