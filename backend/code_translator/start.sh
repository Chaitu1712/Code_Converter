#!/bin/bash
# Start Flask in the background
python app/code_translator/src/main/python/translate_microservice/app.py &
sleep 10
# Start Java application
cd app/code_translator
./mvnw clean package
java -jar app/code_translator/target/code_translator-0.0.1-SNAPSHOT.jar