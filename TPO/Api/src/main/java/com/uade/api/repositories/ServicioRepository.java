package com.uade.api.repositories;

import com.uade.api.models.ReclamoModel;
import com.uade.api.models.ServicioModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ServicioRepository  extends JpaRepository<ServicioModel, Long> {
}
