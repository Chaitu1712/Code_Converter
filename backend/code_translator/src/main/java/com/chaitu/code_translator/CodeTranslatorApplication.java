package com.chaitu.code_translator;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class CodeTranslatorApplication {

	public static void main(String[] args) {
		var context = SpringApplication.run(CodeTranslatorApplication.class, args);
		System.out.println("Code Translator Application Started");
		
		SpringApplication.exit(context);
	}

}
