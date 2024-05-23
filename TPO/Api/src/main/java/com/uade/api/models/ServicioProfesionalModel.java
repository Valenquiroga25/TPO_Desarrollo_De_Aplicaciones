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
@Table(name="serviciosProfesionales")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "idServicio")
public class ServicioProfesionalModel extends ServicioModel{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idServicio;
    @ManyToOne
    @JoinColumn(name="rubro")
    private RubroModel rubro;

    public ServicioProfesionalModel(VecinoModel vecino, String direccion, String telefono, String descripcion, List<ImagenModel> imagenes, RubroModel rubro){
        super(vecino, direccion, telefono, descripcion, imagenes);
        this.rubro = rubro;
    }
}
