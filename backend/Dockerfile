# Use an official OpenJDK base image
FROM openjdk:21

# Set working directory
WORKDIR /app

# Copy backend (Spring Boot) and microservice (Flask) into the container
COPY code_translator /app/code_translator

# Install Python dependencies for Flask
RUN pip3 install -r /app/code_translator/requirements.txt

# Make the start script executable
RUN chmod +x /app/code_translator/start.sh

# Expose ports (adjust if needed)
EXPOSE 8080 5001

# Run the startup script
CMD ["/bin/bash", "/app/code_translator/start.sh"]
