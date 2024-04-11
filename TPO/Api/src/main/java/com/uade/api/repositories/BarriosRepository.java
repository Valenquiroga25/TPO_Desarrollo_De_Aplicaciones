package com.uade.api.repositories;

import com.uade.api.models.BarrioModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BarriosRepository extends JpaRepository<BarrioModel, Long>{

}