package com.uade.api.controllers;

import com.uade.api.models.ImagenModel;
import com.uade.api.models.ServicioModel;
import com.uade.api.models.UsuarioModel;
import com.uade.api.services.ImagenService;
import com.uade.api.services.ServicioService;
import com.uade.api.services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;
import java.util.List;

@RestController
@RequestMapping("/tpo-desarrollo-mobile/imagenes")
public class ImagenController {
    @Autowired
    private ImagenService imagenService;
    @Autowired
    private ServicioService servicioService;

    @PostMapping("/")
    public ResponseEntity<String> uploadImagen(@RequestParam("archivo") MultipartFile archivo, @RequestParam("idServicio") Long idServicio) {
        try {
            ServicioModel servicio = this.servicioService.findServicioById(idServicio);
            ImagenModel imagenAux = new ImagenModel(archivo.getBytes(), servicio);
            imagenService.createImagen(imagenAux);
            return ResponseEntity.ok("Imagen subida exitosamente.");
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al subir la imagen.");
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @GetMapping("/{idServicio}")
    public ResponseEntity<byte[]> download(@PathVariable Long idServicio) {
        ImagenModel imagen = imagenService.findImagenById(idServicio);
        if (imagen != null) {
            return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(imagen.getDatosImagen());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
/*
    @GetMapping("/{idServicio}")
    public ResponseEntity<?> downloadAll(@PathVariable Long idServicio) {
        try{
        return new ResponseEntity<>(imagenService.findImagenesByIdServicio(idServicio), HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.CONFLICT);
        }
    }
 */
}

