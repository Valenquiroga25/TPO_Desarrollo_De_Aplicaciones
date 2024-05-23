package com.uade.api.services;

import com.uade.api.models.ComercioModel;
import com.uade.api.models.RubroModel;
import com.uade.api.models.ServicioProfesionalModel;
import com.uade.api.repositories.ServicioProfesionalRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class ServicioProfesionalService {
    @Autowired
    ServicioProfesionalRepository servicioProfesionalRepository;
    @Autowired
    RubrosService rubrosService;

    public ServicioProfesionalModel createServicio(ServicioProfesionalModel newServicio) throws Exception {
        if(newServicio.getRubro() != null){
            Optional<RubroModel> rubroOp = Optional.ofNullable(rubrosService.findRubroById(newServicio.getRubro().getIdRubro()));
            if(rubroOp.isEmpty()){
                log.error("El rubro indicado no se encuentra en la base de datos!");
                throw new Exception("El rubro indicado no se encuentra en la base de datos!");
            }
        }
        if(newServicio.getImagenes().size() > 5){
            log.error("La publicación del servicio no puede tener más de 5 imágenes.");
            throw new Exception("La publicación del servicio no puede tener más de 5 imágenes.");
        }
        return this.servicioProfesionalRepository.save(newServicio);
    }

    public ServicioProfesionalModel updateServicio(Long id, String descripcion) throws Exception{
        if(id < 0){
            log.error("El Id no es válido. El Id debe ser positivo!");
            throw new Exception("El Id no es válido. El Id debe ser positivo!");
        }

        Optional<ServicioProfesionalModel> servicioOp = servicioProfesionalRepository.findById(id);

        if(servicioOp.isEmpty()){
            log.error("El servicio con el Id " + id + " no se encuentra registrado en la base de datos.");
            throw new Exception("El servicio con el Id " + id + " no se encuentra registrado en la base de datos.");
        }

        ServicioProfesionalModel servicioDb = servicioOp.get();
        servicioDb.setDescripcion(descripcion);

        log.info("Descripción actualizada del servicio " + servicioDb.getIdServicio());
        return this.servicioProfesionalRepository.save(servicioDb);
    }

    public String deleteServicio(Long id) throws Exception{
        Optional<ServicioProfesionalModel> servicioOp = this.servicioProfesionalRepository.findById(id);

        if (servicioOp.isEmpty()){
            log.error("El servicio con el id " + id + " no está registrado en la base de datos.");
            throw new Exception("El servicio con el id " + id + " no está registrado en la base de datos.");
        }

        ServicioProfesionalModel servicioDb = servicioOp.get();
        this.servicioProfesionalRepository.delete(servicioDb);

        return "Servicio eliminado con éxito!";
    }

    public ServicioProfesionalModel findServicioById (Long id) throws Exception{
        Optional<ServicioProfesionalModel> servicioOp = this.servicioProfesionalRepository.findById(id);
        if(servicioOp.isEmpty()){
            log.error("El servicio con el id " + id + " no está registrado en la base de datos.");
            throw new Exception("El servicio con el id " + id + " no está registrado en la base de datos.");
        }
        return servicioOp.get();
    }

    public List<ServicioProfesionalModel> getAllServicios(){
        List<ServicioProfesionalModel> allServicios = this.servicioProfesionalRepository.findAll();
        return allServicios;
    }

}
