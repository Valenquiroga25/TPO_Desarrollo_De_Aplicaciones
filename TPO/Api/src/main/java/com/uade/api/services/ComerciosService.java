package com.uade.api.services;

import com.uade.api.models.ComercioModel;
import com.uade.api.repositories.ComercioRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Slf4j
@Service
public class ComerciosService {
    @Autowired
    ComercioRepository comercioRepository;

    public ComercioModel createComercio(ComercioModel newComercio) throws Exception{
        if (newComercio.getImagenes().size() > 5) {
            log.error("La publicacion del comercio no puede tener mas de 5 imagenes.");
            throw new Exception("La publicacion del comercio no puede tener mas de 5 imagenes.");
        }
        return this.comercioRepository.save(newComercio);
    }

    public ComercioModel updateComercio(Long id, String descripcion)throws Exception {
        if(id < 0){
            log.error("El id no es válido.");
            throw new Exception("El id no es válido.");
        }
        Optional<ComercioModel> comercioOp = comercioRepository.findById(id);

        if(comercioOp.isEmpty()){
            log.error("El comercio con el Id "+id+" no se encuentra registrado en la base de datos.");
            throw new Exception("El comercio con el Id "+id+" no se encuentra registrado en la base de datos.");
        }

        ComercioModel comercioDb = comercioOp.get();
        comercioDb.setDescripcion(descripcion);

        log.info("Descripción actualizada del comercio "+ comercioDb.getIdComercio());
        return this.comercioRepository.save(comercioDb);
    }

    public String deleteComercio(Long id) throws Exception{
        Optional<ComercioModel> comercioOp = comercioRepository.findById(id);
        if(comercioOp.isEmpty()){
            log.error("El comercio con el Id "+id+" no se encuentra registrado en la base de datos.");
            throw new Exception("El comercio con el Id "+id+" no se encuentra registrado en la base de datos.");
        }

        ComercioModel comercioDb = comercioOp.get();
        this.comercioRepository.delete(comercioDb);

        return "Comercio eliminado con exito";
    }

    public ComercioModel findComercioById(Long id) throws Exception{
        Optional<ComercioModel> comercioOp = comercioRepository.findById(id);
        if(comercioOp.isEmpty()){
            log.error("El comercio con el Id "+id+" no se encuentra registrado en la base de datos.");
            throw new Exception("El comercio con el Id "+id+" no se encuentra registrado en la base de datos.");
        }
        return comercioOp.get();
    }
}
