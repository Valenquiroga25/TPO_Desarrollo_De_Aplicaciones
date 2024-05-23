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
@Table(name = "comercios")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,property = "idComercio")
public class ComercioModel extends ServicioModel{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idComercio;

    public ComercioModel(VecinoModel vecino, String direccion, String telefono, String descripcion, List<ImagenModel> imagenes){
        super(vecino, direccion, telefono, descripcion, imagenes);
    }
}
