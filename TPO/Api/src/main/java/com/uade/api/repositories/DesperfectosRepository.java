package com.uade.api.repositories;

import com.uade.api.models.DesperfectoModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DesperfectosRepository extends JpaRepository<DesperfectoModel, Long>{

}