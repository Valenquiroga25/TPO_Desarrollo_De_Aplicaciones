package com.uade.api.models;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import lombok.*;


import java.time.LocalDateTime;

@Entity
@Table(name="personal")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "legajo")

public class PersonalModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int legajo;
    private String nombre;
    private String apellido;
    private String documento;
    private String password;
    private Sector sector;
    private int categoria;
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private LocalDateTime fechaIngreso;
}
