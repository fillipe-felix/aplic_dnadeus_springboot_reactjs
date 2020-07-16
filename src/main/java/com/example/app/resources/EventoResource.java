package com.example.app.resources;

import com.example.app.domain.Evento;
import com.example.app.domain.Ministerio;
import com.example.app.services.EventoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.text.ParseException;
import java.util.List;

@RestController
@RequestMapping(value = "/ministries")
@CrossOrigin(origins = "http://localhost:3000")
public class EventoResource {

    @Autowired
    private EventoService eventoService;

    @PostMapping(path = "/{id}/events")
    public ResponseEntity<Void> insert(@PathVariable Integer id, @RequestBody Evento obj) throws ParseException {
        eventoService.insert(id, obj);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(obj.getId()).toUri();
        System.out.println("");
        return ResponseEntity.created(uri).build();
    }

    @GetMapping(value = "/{id}/events")
    public ResponseEntity<List<Evento>> findAll(@PathVariable Integer id){
        List<Evento> eventoList = eventoService.findAll(id);
        return ResponseEntity.ok().body(eventoList);
    }


    @DeleteMapping(value = "/{idMin}/events/{idEve}")
    public ResponseEntity<Void> delete(@PathVariable Integer idMin, @PathVariable Integer idEve){
        eventoService.delete(idMin, idEve);
        return ResponseEntity.noContent().build();
    }

}
