# Use a lightweight Java 21 runtime
FROM eclipse-temurin:21-jre-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the pre-built JAR from your local machine into the Docker container
# (Make sure the name matches the exact name of your JAR inside the target folder)
COPY backend/code_translator/target/code_translator-1.0.0-SNAPSHOT.jar app.jar

# Expose the port Spring Boot runs on
EXPOSE 8080

# Run the application (with memory limits for Render's free tier)
ENTRYPOINT ["java", "-Xmx512m", "-jar", "app.jar"]