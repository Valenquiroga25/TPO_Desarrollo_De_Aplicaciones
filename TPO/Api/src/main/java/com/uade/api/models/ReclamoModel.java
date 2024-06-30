package com.uade.api.models;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name="reclamos")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "idReclamo")

public class ReclamoModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idReclamo;
    @ManyToOne
    @JoinColumn(name="documentoVecino")
    private VecinoModel vecino;
    @ManyToOne
    @JoinColumn(name="legajo")
    private PersonalModel personal;
    @ManyToOne
    @JoinColumn(name="idSitio")
    private SitioModel sitio;
    @ManyToOne
    @JoinColumn(name="idDesperfecto")
    private DesperfectoModel desperfecto; // Consultar si un reclamo puede tener más de un desperfecto.
    private String descripcion;
    @OneToMany
    @JoinColumn(name="idImagen")
    private List<ImagenServicioModel> imagenes;

    @Enumerated(EnumType.STRING)
    private Estado estado;
    private Long idReclamoUnificado;

    public ReclamoModel(VecinoModel vecino, SitioModel sitio, DesperfectoModel desperfecto, String descripcion, List<ImagenServicioModel> imagenes, Long idReclamoUnificado){
        this.vecino = vecino;
        this.sitio = sitio;
        this.desperfecto = desperfecto;
        this.descripcion = descripcion;
        this.estado = Estado.EN_PROCESO;
        this.idReclamoUnificado = idReclamoUnificado;
    }

    public ReclamoModel(PersonalModel personal, SitioModel sitio, DesperfectoModel desperfecto, String descripcion){
        this.personal = personal;
        this.sitio = sitio;
        this.desperfecto = desperfecto;
        this.descripcion = descripcion;
        this.estado = Estado.EN_PROCESO;
        this.idReclamoUnificado = null;
    }
}
