package com.chaitu.code_translator.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TranslationResponse {
    private String translatedCode;
    private String explanation;

    public TranslationResponse(String translatedCode, String explanation) {
        this.translatedCode = translatedCode;
        this.explanation = explanation;
    }
}
