package com.example.app.services;

import com.example.app.domain.Membro;
import com.example.app.domain.Ministerio;
import com.example.app.repositories.MinisterioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MinisterioService {

    @Autowired
    private MinisterioRepository ministerioRepository;


    public List<Ministerio> findAll() {
       return ministerioRepository.findAll();
    }

    public Ministerio findById(Integer id) {
        Optional<Ministerio> ministerio = ministerioRepository.findById(id);
        return ministerio.get();
    }


    public Ministerio insert(Ministerio obj) {
        return ministerioRepository.save(obj);
    }

    public void delete(Integer id) {
        ministerioRepository.deleteById(id);
    }

    public Ministerio update(Integer id, Ministerio newObj) {
        Ministerio obj = ministerioRepository.getOne(id);
        updateData(obj, newObj);
        return ministerioRepository.save(obj);
    }

    public void updateData(Ministerio obj, Ministerio newObj){
        obj.setNome(newObj.getNome());
    }


    public Ministerio session(Ministerio obj) {
        Optional<Ministerio> newObj = ministerioRepository.findById(obj.getId());


        System.out.println("");
        return newObj.get();
    }
}
