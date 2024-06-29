package com.uade.api.services;

import com.uade.api.models.RubroModel;
import com.uade.api.models.ServicioModel;
import com.uade.api.repositories.ServicioRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Slf4j
@Service
public class ServicioService {
    @Autowired
    ServicioRepository servicioRepository;
    @Autowired
    RubrosService rubrosService;
    @Autowired
    VecinosService vecinosService;
    @Autowired
    ImagenService imagenService;

    public ServicioModel createServicio(ServicioModel newServicio) throws Exception {
        if(Objects.equals(newServicio.getTipoServicio(), "Profesional")){
            if(newServicio.getRubro()==null){
                log.error("El rubro no puede ser nulo");
                throw new Exception("El rubro no puede ser nulo");
            }else{
                Optional<RubroModel> rubroOp = Optional.ofNullable(rubrosService.findRubroById(newServicio.getRubro().getIdRubro()));
                if(rubroOp.isEmpty()){
                    log.error("El rubro indicado no se encuentra en la base de datos!");
                    throw new Exception("El rubro indicado no se encuentra en la base de datos!");
                }
            }
        }

        return this.servicioRepository.save(newServicio);
    }
    public ServicioModel updateServicio(Long id, String descripcion) throws Exception{
        if(id < 0){
            log.error("El Id no es válido. El Id debe ser positivo!");
            throw new Exception("El Id no es válido. El Id debe ser positivo!");
        }

        Optional<ServicioModel> servicioOp = servicioRepository.findById(id);

        if(servicioOp.isEmpty()){
            log.error("El servicio con el Id " + id + " no se encuentra registrado en la base de datos.");
            throw new Exception("El servicio con el Id " + id + " no se encuentra registrado en la base de datos.");
        }

        ServicioModel servicioDb = servicioOp.get();

        if(descripcion != null)
            servicioDb.setDescripcion(descripcion);

        log.info("Servicio con id " + servicioDb.getIdServicio() + " actualizado con éxito ");
        return this.servicioRepository.save(servicioDb);
    }

    public String deleteServicio(Long id) throws Exception{
        Optional<ServicioModel> servicioOp = this.servicioRepository.findById(id);

        if (servicioOp.isEmpty()){
            log.error("El servicio con el id " + id + " no está registrado en la base de datos.");
            throw new Exception("El servicio con el id " + id + " no está registrado en la base de datos.");
        }

        ServicioModel servicioDb = servicioOp.get();
        this.servicioRepository.delete(servicioDb);

        return "Servicio eliminado con éxito!";
    }

    public ServicioModel findServicioById (Long id) throws Exception{
        Optional<ServicioModel> servicioOp = this.servicioRepository.findById(id);
        if(servicioOp.isEmpty()){
            log.error("El servicio con el id " + id + " no está registrado en la base de datos.");
            throw new Exception("El servicio con el id " + id + " no está registrado en la base de datos.");
        }
        return servicioOp.get();
    }

    public List<ServicioModel> getAllServicios(){
        return this.servicioRepository.findAll();
    }
    public List<ServicioModel> getProfesionales(){
        List<ServicioModel> allServicios = this.servicioRepository.findAll();
        List<ServicioModel> servicioProfesionales = new ArrayList<>();

        for(ServicioModel servicio : allServicios){
            if (Objects.equals(servicio.getTipoServicio(), "Profesional"))
                servicioProfesionales.add(servicio);
        }
        return servicioProfesionales;
    }

    public List<ServicioModel> getComercios(){
        List<ServicioModel> allServicios = this.servicioRepository.findAll();
        List<ServicioModel> comercios = new ArrayList<>();

        for(ServicioModel servicio : allServicios){
            if (Objects.equals(servicio.getTipoServicio(), "Comercio"))
                comercios.add(servicio);
        }
        return comercios;
    }
}
