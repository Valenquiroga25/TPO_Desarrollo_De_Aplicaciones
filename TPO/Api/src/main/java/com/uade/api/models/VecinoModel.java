package com.uade.api.models;

import com.fasterxml.jackson.annotation.*;
import javax.persistence.*;
import lombok.*;

@Entity
@Table(name="vecinos")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "documento")

public class VecinoModel {
    @Id
    private String documento;
    private String nombre;
    private String apellido;
    private String direccion;
    private int codigoBarrio;
}
