package com.uade.api.controllers;

import com.uade.api.models.DTOs.ImagenDevueltaDTO;
import com.uade.api.models.ImagenServicioModel;
import com.uade.api.models.ServicioModel;
import com.uade.api.services.ImagenService;
import com.uade.api.services.ServicioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/tpo-desarrollo-mobile/imagenes")
public class ImagenController {
    @Autowired
    private ImagenService imagenService;
    @Autowired
    private ServicioService servicioService;

    @PostMapping("/servicio")
    public ResponseEntity<String> uploadImagenServicio(@RequestParam("archivo") MultipartFile archivo, @RequestParam("idServicio") Long idServicio) {
        try {
            ServicioModel servicio = this.servicioService.findServicioById(idServicio);
            ImagenServicioModel imagenAux = new ImagenServicioModel(archivo.getBytes(), servicio);
            imagenService.createImagenServicio(imagenAux);
            return ResponseEntity.ok("Imagen subida exitosamente.");
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al subir la imagen.");
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @GetMapping("/servicio/{idServicio}")
    public ResponseEntity<?> downloadAllServicio(@PathVariable Long idServicio) {
        try{
            List<ImagenServicioModel> imagenes = this.imagenService.findImagenesByIdServicio(idServicio);
            List<ImagenDevueltaDTO> imagenesDevuetas = new ArrayList<>();
            for(ImagenServicioModel imagen : imagenes)
                imagenesDevuetas.add(convertToDTO(imagen));

            return new ResponseEntity<>(imagenesDevuetas, HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.CONFLICT);
        }
    }

    @DeleteMapping("/servicio/{idServicio}")
    public ResponseEntity<?> deleteAllServicio(@PathVariable Long idServicio) {
        try{
            List<ImagenServicioModel> imagenes = this.imagenService.findImagenesByIdServicio(idServicio);
            for(ImagenServicioModel imagen : imagenes)
                this.imagenService.deleteImagenServicio(imagen.getIdImagen());

            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.CONFLICT);
        }
    }

    private ImagenDevueltaDTO convertToDTO(ImagenServicioModel imagen){
        return new ImagenDevueltaDTO(imagen.getDatosImagenBase64());
    }
}

