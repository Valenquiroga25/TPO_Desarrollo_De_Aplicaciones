package com.uade.api.repositories;

import com.uade.api.models.SitioModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SitiosRepository extends JpaRepository<SitioModel, Long>{

    Optional<SitioModel> findSitioById(int idSitio);
}
