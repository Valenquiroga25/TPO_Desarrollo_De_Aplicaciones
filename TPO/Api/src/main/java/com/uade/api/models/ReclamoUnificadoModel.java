package com.uade.api.models;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="reclamosUnificados")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "idReclamoUnificado")

public class ReclamoUnificadoModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idReclamoUnificado;
    @ManyToOne
    @JoinColumn(name="idSitio")
    private SitioModel sitio;
    @ManyToOne
    @JoinColumn(name="idDesperfecto")
    private DesperfectoModel desperfecto;

    @Enumerated(EnumType.STRING)
    private Estado estado;
    public ReclamoUnificadoModel(SitioModel sitio, DesperfectoModel desperfecto){
        this.sitio = sitio;
        this.desperfecto = desperfecto;
        this.estado = Estado.EN_PROCESO;
    }
}