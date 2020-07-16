package com.example.app.resources;

import com.example.app.domain.Membro;
import com.example.app.domain.Ministerio;
import com.example.app.services.MinisterioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/")
@CrossOrigin(origins = "http://localhost:3000")
public class MinisterioResource {

    @Autowired
    private MinisterioService ministerioService;


    @GetMapping(value = "/ministries")
    public ResponseEntity<List<Ministerio>> findAll(){
        List<Ministerio> ministerioList = ministerioService.findAll();
        return ResponseEntity.ok().body(ministerioList);
    }

    @GetMapping(value = "/ministries/{id}")
    public ResponseEntity<Ministerio> findById(@PathVariable Integer id){
        Ministerio obj = ministerioService.findById(id);
        return ResponseEntity.ok().body(obj);
    }

    @PostMapping(value = "/ministries")
    public ResponseEntity<Ministerio> insert(@RequestBody Ministerio obj){
        obj = ministerioService.insert(obj);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(obj.getId()).toUri();

        return ResponseEntity.created(uri).body(obj);
    }

    @PostMapping(value = "/sessions", consumes = "application/json")
    public ResponseEntity<Ministerio> session(@RequestBody Ministerio obj){
        Ministerio newObj = ministerioService.session(obj);
        System.out.println("");
        return ResponseEntity.ok().body(newObj);
    }

    @DeleteMapping(value = "/ministries/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id){
        ministerioService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping(value = "/ministries/{id}")
    public ResponseEntity<Ministerio> update(@PathVariable Integer id, @RequestBody Ministerio obj){
        obj = ministerioService.update(id, obj);
        return ResponseEntity.noContent().build();
    }
}
