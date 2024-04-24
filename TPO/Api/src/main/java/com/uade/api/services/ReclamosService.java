package com.uade.api.services;

import com.uade.api.models.*;
import com.uade.api.repositories.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Slf4j
@Service
public class ReclamosService {

    @Autowired
    private ReclamosRepository reclamosRepository;
    @Autowired
    private VecinosRepository vecinosRepository;
    @Autowired
    private PersonalRepository personalRepository;
    @Autowired
    private SitiosRepository sitioRepository;
    @Autowired
    private DesperfectosRepository desperfectosRepository;

    /*
    public ReclamoModel createReclamo(ReclamoModel newReclamo) throws Exception{
        Optional<VecinoModel> vecinoOp = Optional.ofNullable(VecinosService);
    }
     */
}
