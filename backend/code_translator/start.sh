#!/bin/bash
# Start Flask in the background
python backend/code_translator/src/main/python/translate_microservice/app.py &
# Start Java application
java -jar backend/code_translator/target/code_translator-0.0.1-SNAPSHOT.jar