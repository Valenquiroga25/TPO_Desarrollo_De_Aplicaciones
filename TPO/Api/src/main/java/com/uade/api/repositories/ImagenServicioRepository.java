package com.uade.api.repositories;

import com.uade.api.models.ImagenServicioModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImagenServicioRepository extends JpaRepository<ImagenServicioModel, Long> {
    ImagenServicioModel findImagenServicioById(Long idImagen);
}
