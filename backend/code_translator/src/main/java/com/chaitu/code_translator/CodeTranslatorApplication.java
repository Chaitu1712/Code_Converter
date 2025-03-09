package com.chaitu.code_translator;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class CodeTranslatorApplication {
	public static void startFlaskApi() {
		try {
			ProcessBuilder pb = new ProcessBuilder();
			pb.directory(new java.io.File("src\\main\\python\\translate_microservice"));
			pb.command("python", "app.py");
			pb.inheritIO();
			pb.start();
			System.out.println("Flask API Started");
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	public static void main(String[] args) {
		startFlaskApi();
		SpringApplication.run(CodeTranslatorApplication.class, args);
		System.out.println("Code Translator Application Started");
		
	}
}
