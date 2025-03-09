package com.chaitu.code_translator.controllers;

import com.chaitu.code_translator.model.TranslationRequest;
import com.chaitu.code_translator.model.TranslationResponse;
import com.chaitu.code_translator.services.TranslationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class TranslationController {

    @Autowired
    private TranslationService translationService;

    @PostMapping("/translate")
    public TranslationResponse translateCode(@RequestBody TranslationRequest request) {
        return translationService.translate(request);
    }
}
