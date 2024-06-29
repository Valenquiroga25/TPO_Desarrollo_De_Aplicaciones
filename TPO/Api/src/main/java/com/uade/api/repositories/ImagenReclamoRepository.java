package com.uade.api.repositories;
import com.uade.api.models.ImagenReclamoModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImagenReclamoRepository extends JpaRepository<ImagenReclamoModel, Long>{
    ImagenReclamoModel findImagenReclamoByIdImagen(Long idImagen);
}
