package com.uade.api.repositories;

import com.uade.api.models.VecinoModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VecinosRepository extends JpaRepository<VecinoModel, Long>{

}
