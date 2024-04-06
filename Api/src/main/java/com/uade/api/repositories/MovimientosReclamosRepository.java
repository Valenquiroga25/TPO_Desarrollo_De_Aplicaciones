package com.uade.api.repositories;

import com.uade.api.models.MovimientoReclamoModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MovimientosReclamosRepository extends JpaRepository<MovimientoReclamoModel, Long>{

}