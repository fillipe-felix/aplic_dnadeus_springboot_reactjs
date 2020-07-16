package com.example.app.services;

import com.example.app.domain.Evento;
import com.example.app.domain.Membro;
import com.example.app.domain.Ministerio;
import com.example.app.repositories.EventoRepository;
import com.example.app.repositories.MinisterioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class EventoService {

    @Autowired
    private EventoRepository eventoRepository;

    @Autowired
    private MinisterioRepository ministerioRepository;

    public Evento insert(Integer id, Evento objEvento) throws ParseException {
        Optional<Ministerio> obj = ministerioRepository.findById(id);

        objEvento.setMinisterio(obj.get());

        obj.get().getEventos().add(objEvento);

        System.out.println("");
        return eventoRepository.save(objEvento);
    }

    public List<Evento> findAll(Integer id) {
        Optional<Ministerio> obj = ministerioRepository.findById(id);
        System.out.println("");
        return obj.get().getEventos();
    }

    public void delete(Integer idMin, Integer idEve) {
        Optional<Ministerio> objMin = ministerioRepository.findById(idMin);

        if (objMin.isPresent()) {
            for (Evento x : objMin.get().getEventos()) {
                if (x.getId().equals(idEve)) {
                    //ministerioRepository.deleteById(x.getId());
                    objMin.get().getEventos().remove(x);
                    ministerioRepository.save(objMin.get());
                    break;
                }
            }
        }

        System.out.println("");
    }
}
