package com.example.app.services;

import com.example.app.domain.Membro;
import com.example.app.domain.Ministerio;
import com.example.app.repositories.MembroRepository;
import com.example.app.repositories.MinisterioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MembroService {

    @Autowired
    private MembroRepository membroRepository;

    @Autowired
    private MinisterioRepository ministerioRepository;


    public List<Membro> findAll(Integer id) {
        Optional<Ministerio> obj = ministerioRepository.findById(id);
        System.out.println("");
        return obj.get().getMembros();
    }

    public Membro findById(Integer idMin, Integer idMem) {
        Optional<Ministerio> objMin = ministerioRepository.findById(idMin);
        //Optional<Membro> objMem = membroRepository.findById(idMem);

        Membro membro = null;

        for (Membro x : objMin.get().getMembros()) {
            if (x.getId().equals(idMem)) {
                membro = x;
            }
        }

        System.out.println("");
        return membro;
    }

    public Membro insert(Integer id, Membro objMem) {
        Optional<Ministerio> obj = ministerioRepository.findById(id);

        obj.get().getMembros().add(objMem);
        System.out.println("");
        return membroRepository.save(objMem);
    }

    public void delete(Integer idMin, Integer idMem) {
        Optional<Ministerio> objMin = ministerioRepository.findById(idMin);

        if (objMin.isPresent()) {
            for (Membro x : objMin.get().getMembros()) {
                if (x.getId().equals(idMem)) {
                    //ministerioRepository.deleteById(x.getId());
                    objMin.get().getMembros().remove(x);
                    ministerioRepository.save(objMin.get());
                    break;
                }
            }
        }

        System.out.println("");
    }

}
