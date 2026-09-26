package at.s_sal.tourplaner.controller;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/search")
public class SearchController {

    @GetMapping
    public ResponseEntity<?> search(@RequestParam("q") String query){
        return ResponseEntity.ok("test-get-search");
    }

    @GetMapping("/suggestions")
    public ResponseEntity<?> getSuggestions(@RequestParam("q") String query){

        return ResponseEntity.ok("test-get-suggestions");
    }


}
