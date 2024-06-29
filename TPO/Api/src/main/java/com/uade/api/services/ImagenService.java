package com.uade.api.services;

import com.uade.api.models.ImagenDenunciaModel;
import com.uade.api.models.ImagenReclamoModel;
import com.uade.api.models.ImagenServicioModel;
import com.uade.api.repositories.ImagenDenunciaRepository;
import com.uade.api.repositories.ImagenReclamoRepository;
import com.uade.api.repositories.ImagenServicioRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import org.springframework.stereotype.Service;
@Slf4j
@Service
public class ImagenService{

    @Autowired
    private ImagenServicioRepository imagenServicioRepository;
    @Autowired
    private ImagenReclamoRepository imagenReclamoRepository;
    @Autowired
    private ImagenDenunciaRepository imagenDenunciaRepository;
    public void createImagenServicio(ImagenServicioModel newImagen) {
        this.imagenServicioRepository.save(newImagen);
    }

    public ImagenServicioModel findImagenServicioById(Long id) {
        return this.imagenServicioRepository.findImagenServicioById(id);
    }

    public List<ImagenServicioModel> findImagenesByIdServicio(Long idServicio) {
        List<ImagenServicioModel> imagenes = this.imagenServicioRepository.findAll();
        List<ImagenServicioModel> imagenesBuscadas = new ArrayList<>();

        for(ImagenServicioModel imagen : imagenes){
            if(Objects.equals(imagen.getServicio().getIdServicio(), idServicio))
                imagenesBuscadas.add(imagen);
        }
        return imagenesBuscadas;
    }

    public void deleteImagenServicio(Long id){
        ImagenServicioModel imagen = this.findImagenServicioById(id);
        this.imagenServicioRepository.delete(imagen);
    }

    public void createImagenReclamo(ImagenReclamoModel newImagenReclamo) {
        this.imagenReclamoRepository.save(newImagenReclamo);
    }

    public ImagenReclamoModel findImagenReclamoById(Long id) {
        return this.imagenReclamoRepository.findImagenReclamoById(id);
    }

    public List<ImagenReclamoModel> findImagenesByIdReclamos(Long idReclamo) {
        List<ImagenReclamoModel> imagenes = this.imagenReclamoRepository.findAll();
        List<ImagenReclamoModel> imagenesBuscadas = new ArrayList<>();

        for(ImagenReclamoModel imagen : imagenes){
            if(Objects.equals(imagen.getReclamo().getIdReclamo(), idReclamo))
                imagenesBuscadas.add(imagen);
        }
        return imagenesBuscadas;
    }

    public void deleteImagenReclamo(Long id){
        ImagenReclamoModel imagen = this.findImagenReclamoById(id);
        this.imagenReclamoRepository.delete(imagen);
    }

    public void createImagenDenuncia(ImagenDenunciaModel newImagen) {
        this.imagenDenunciaRepository.save(newImagen);
    }

    public ImagenDenunciaModel findImagenDenunciaById(Long id) {
        return this.imagenDenunciaRepository.findDenunciaById(id);
    }

    public List<ImagenDenunciaModel> findImagenesByIdDenuncias(Long idDenuncia) {
        List<ImagenDenunciaModel> imagenes = this.imagenDenunciaRepository.findAll();
        List<ImagenDenunciaModel> imagenesBuscadas = new ArrayList<>();

        for(ImagenDenunciaModel imagen : imagenes){
            if(Objects.equals(imagen.getDenuncia().getIdDenuncia(), idDenuncia))
                imagenesBuscadas.add(imagen);
        }
        return imagenesBuscadas;
    }

    public void deleteImagenDeuncia(Long id){
        ImagenDenunciaModel imagen = this.findImagenDenunciaById(id);
        this.imagenDenunciaRepository.delete(imagen);
    }
}
