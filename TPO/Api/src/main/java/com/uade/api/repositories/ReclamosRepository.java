package com.uade.api.repositories;

import com.uade.api.models.ReclamoModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReclamosRepository extends JpaRepository<ReclamoModel, Long>{

}
