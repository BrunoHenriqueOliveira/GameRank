FROM eclipse-temurin:21-jdk
LABEL authors="bruno"

# Define o diretório de trabalho
WORKDIR /app

# Copia apenas arquivos necessários para baixar dependências primeiro
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

# Dá permissão ao Maven wrapper
RUN chmod +x mvnw

# Baixa as dependências (sem compilar ainda)
RUN ./mvnw dependency:go-offline -B

# Agora copia o restante do código (src + configs)
COPY src ./src

# Compila a aplicação (sem rodar testes)
RUN ./mvnw clean package -DskipTests

# Comando para rodar a aplicação
CMD ["java", "-jar", "target/gamerank-backend-0.0.1-SNAPSHOT.jar"]

