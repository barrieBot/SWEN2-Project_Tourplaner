package at.s_sal.tourplaner.controller;


import at.s_sal.tourplaner.security.TokenHolder;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/search")
@Validated
public class SearchController {

    @GetMapping
    public ResponseEntity<?> search(
            @AuthenticationPrincipal TokenHolder user,
            @RequestParam("q") String query){

        return ResponseEntity.ok("test-get-search");
    }

    @GetMapping("/suggestions")
    public ResponseEntity<?> getSuggestions(
            @AuthenticationPrincipal TokenHolder user,
            @RequestParam("q") String query){

        return ResponseEntity.ok("test-get-suggestions");
    }


}
