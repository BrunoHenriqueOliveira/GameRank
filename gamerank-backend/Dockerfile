FROM eclipse-temurin:21-jdk
LABEL authors="bruno"

WORKDIR /app
COPY . .
RUN ./mvnw clean package -DskipTests
CMD ["java", "-jar", "target/gamerank-0.0.1-SNAPSHOT.jar"]