package com.uade.api.models;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name="servicios")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "idServicio")
public class ServicioModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idServicio;
    @ManyToOne
    @JoinColumn(name="documentoVecino")
    private VecinoModel vecino;
    private String direccion;
    private String telefono;
    @ManyToOne
    @JoinColumn(name="rubro")
    private RubroModel rubro;
    private String descripcion;
    @OneToMany
    @JoinColumn(name="idImagen")
    private List<ImagenModel> imagenes;

    public ServicioModel(VecinoModel vecino, String direccion, String telefono, RubroModel rubro, String descripcion, List<ImagenModel> imagenes){
        this.vecino = vecino;
        this.direccion = direccion;
        this.telefono = telefono;
        this.rubro = rubro;
        this.descripcion = descripcion;
        this.imagenes = imagenes;
    }
}
