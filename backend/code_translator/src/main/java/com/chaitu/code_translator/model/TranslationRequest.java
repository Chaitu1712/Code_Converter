package com.chaitu.code_translator.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TranslationRequest {
    private String sourceLanguage;
    private String targetLanguage;
    private String code;
}
