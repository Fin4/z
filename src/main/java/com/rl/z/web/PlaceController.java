package com.rl.z.web;

import com.rl.z.dao.PlaceRepository;
import com.rl.z.domain.Place;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class PlaceController {

    @Autowired
    private PlaceRepository placeRepository;

    @GetMapping("/places")
    public List<Place> getAll() {
        return placeRepository.findAll();
    }

    @GetMapping("/places/{id}")
    public Place getById(@PathVariable Long id) {
        return placeRepository.getOne(id);
    }

    @PostMapping("/places")
    public Place create(@RequestBody Place place) {
        return placeRepository.save(place);
    }

    @PutMapping("/places/{id}")
    public void update(@RequestBody Place place) {
        placeRepository.save(place);
    }
}
