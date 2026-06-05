package com.chaitu.code_translator.services;

import com.chaitu.code_translator.model.TranslationRequest;
import com.chaitu.code_translator.model.TranslationResponse;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.converter.BeanOutputConverter;
import org.springframework.stereotype.Service;

@Service
public class TranslationService {

    private final ChatClient chatClient;

    // Spring AI auto-injects the ChatClient builder based on your application.properties
    public TranslationService(ChatClient.Builder chatClientBuilder) {
        this.chatClient = chatClientBuilder.build();
    }

    public TranslationResponse translate(TranslationRequest request) {
        // This enforces a strict JSON output matching your Java class
        var converter = new BeanOutputConverter<>(TranslationResponse.class);

        String promptTemplate = """
                Convert the following {source} code into {target}.
                For conversion to Java, if no class is provided, generate a suitable short class name and main method.
                
                Code to translate:
                {code}
                
                {format}
                """;

        String responseText = chatClient.prompt()
                .user(u -> u.text(promptTemplate)
                        .param("source", request.getSourceLanguage())
                        .param("target", request.getTargetLanguage())
                        .param("code", request.getCode())
                        // Appends the strict JSON schema instruction to the prompt
                        .param("format", converter.getFormat())
                )
                .call()
                .content();

        // Parses the JSON securely into your TranslationResponse object
        return converter.convert(responseText);
    }
}