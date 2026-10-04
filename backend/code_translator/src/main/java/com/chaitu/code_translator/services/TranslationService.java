package com.chaitu.code_translator.services;

import com.chaitu.code_translator.model.TranslationRequest;
import com.chaitu.code_translator.model.TranslationResponse;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientResponseException;

import java.util.List;
import java.util.Map;

@Service
public class TranslationService {

    private static final Logger log = LoggerFactory.getLogger(TranslationService.class);

    private final RestClient restClient;
    private final ObjectMapper objectMapper;
    private final String apiKey;
    private final String model;

    public TranslationService(
            @Value("${gemini.api.key}") String apiKey,
            @Value("${gemini.api.model:gemini-1.5-flash}") String model) {
        this.restClient = RestClient.create();
        this.objectMapper = new ObjectMapper();
        this.apiKey = apiKey != null ? apiKey.trim() : "";
        this.model = model != null ? model.trim() : "gemini-1.5-flash";
    }

    public TranslationResponse translate(TranslationRequest request) {
        if (apiKey.isEmpty() || apiKey.startsWith("AI*") || apiKey.contains("YOUR_ACTUAL")) {
            throw new IllegalArgumentException("Invalid or missing Google Gemini API key in application.properties!");
        }

        String prompt = """
                You are an expert programming language compiler and translator.
                Convert the following %s code into %s.
                If translating to Java and no enclosing class is provided, create a suitable public class.
                
                Code to convert:
                %s
                
                Respond ONLY with a valid JSON object matching this exact schema:
                {
                  "translatedCode": "The pure converted code without markdown backticks",
                  "explanation": "Clear explanation of syntax, data types, and logic changes made"
                }
                """.formatted(request.getSourceLanguage(), request.getTargetLanguage(), request.getCode());

        // Native Google Gemini request structure
        Map<String, Object> requestBody = Map.of(
                "contents", List.of(
                        Map.of("parts", List.of(Map.of("text", prompt)))
                ),
                "generationConfig", Map.of(
                        "responseMimeType", "application/json",
                        "temperature", 0.2
                )
        );

        String endpointUrl = "https://generativelanguage.googleapis.com/v1beta/models/" 
                + model + ":generateContent";

        try {
            String rawJsonResponse = restClient.post()
                    .uri(endpointUrl)
                    .header("x-goog-api-key", apiKey)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(requestBody)
                    .retrieve()
                    .body(String.class);

            // Parse response: candidates[0].content.parts[0].text
            JsonNode root = objectMapper.readTree(rawJsonResponse);
            JsonNode candidates = root.path("candidates");
            if (candidates.isEmpty()) {
                throw new IllegalStateException("Gemini returned no candidates. Possible safety block or empty response: " + rawJsonResponse);
            }

            String aiJsonText = candidates
                    .get(0)
                    .path("content")
                    .path("parts")
                    .get(0)
                    .path("text")
                    .asText();

            return objectMapper.readValue(aiJsonText, TranslationResponse.class);

        } catch (RestClientResponseException e) {
            String errorBody = e.getResponseBodyAsString();
            log.error("Google Gemini API error [HTTP {}]: {}", e.getStatusCode(), errorBody);
            throw new RuntimeException("Google API error (" + e.getStatusCode() + "): " + errorBody, e);
        } catch (Exception e) {
            log.error("Translation processing error: {}", e.getMessage(), e);
            throw new RuntimeException("Translation failed: " + e.getMessage(), e);
        }
    }
}