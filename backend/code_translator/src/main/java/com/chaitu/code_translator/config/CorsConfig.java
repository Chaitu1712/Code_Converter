package com.chaitu.code_translator.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")  // Apply CORS to API routes
                        .allowedOrigins("https://code-converter-dun.vercel.app/")  // Allow frontend
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")  // Allow all methods
                        .allowedHeaders("*")
                        .allowCredentials(true);
            }
        };
    }
}