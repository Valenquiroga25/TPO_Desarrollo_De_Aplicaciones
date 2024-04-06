package com.uade.api.repositories;

import com.uade.api.models.SitioModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SitiosRepository extends JpaRepository<SitioModel, Long>{

}
