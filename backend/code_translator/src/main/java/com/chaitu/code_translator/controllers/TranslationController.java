package com.chaitu.code_translator.controllers;

import com.chaitu.code_translator.model.TranslationRequest;
import com.chaitu.code_translator.model.TranslationResponse;
import com.chaitu.code_translator.services.TranslationService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class TranslationController {

    private final TranslationService translationService;

    // Constructor injection replaces field @Autowired
    public TranslationController(TranslationService translationService) {
        this.translationService = translationService;
    }

    @PostMapping("/translate")
    public TranslationResponse translateCode(@RequestBody TranslationRequest request) {
        return translationService.translate(request);
    }

    @GetMapping("/")
    public String test() {
        return "Hello";
    }
}