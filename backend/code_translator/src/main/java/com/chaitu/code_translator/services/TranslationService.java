package com.chaitu.code_translator.services;

import com.chaitu.code_translator.model.TranslationRequest;
import com.chaitu.code_translator.model.TranslationResponse;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class TranslationService {
    private final String FLASK_API_URL = "http://localhost:5001/translate";

    public TranslationResponse translate(TranslationRequest request) {
        RestTemplate restTemplate = new RestTemplate();
        TranslationResponse response = restTemplate.postForObject(FLASK_API_URL, request, TranslationResponse.class);
        return response;
    }
}