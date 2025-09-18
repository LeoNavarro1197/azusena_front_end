# AzuSena-React

## Repositorio de proyecto AzuSena - 2024

Repositorio del Frontend del proyecto AzuSena, creado en ReactJS, Junio 2024

## Descripción
Este proyecto está relacionado con una herramienta de inteligencia artificial creada por el SENA en Colombia, la cual es un chatbot para usuarios con información relacionada con temas de la institución. El proyecto utiliza ReactJS como tecnología principal y Tailwind CSS para los estilos.

## Instalación
Para clonar y ejecutar este proyecto localmente, sigue estos pasos:

1. Clona [este repositorio](https://github.com/farrojo/AzuSena-React).
```
   git clone https://github.com/farrojo/AzuSena-React.git
```

2. Navega hasta el directorio del proyecto.

3. Instala las dependencias del proyecto.
   ```
   npm install
   ```

## Cómo iniciar
Para iniciar la aplicación en un entorno de desarrollo, puedes usar el siguiente comando. 
```
npm start
```
Esto iniciará la aplicación en [http://localhost:3000](http://localhost:3000) en tu navegador.

# Arquitectura de la solución

## Proyecto AzuSena

### 1. Proyecto React (Frontend)

El proyecto React constituye la interfaz de usuario del chatbot. Este proyecto está ubicado en la raíz del repositorio y utiliza las siguientes tecnologías:

- **React**: Biblioteca de JavaScript para construir interfaces de usuario.
- **Tailwind CSS**: Framework CSS para estilos rápidos y responsivos.
- **API de Backend**: Se conecta con el backend a través de llamadas API para enviar preguntas y recibir respuestas del chatbot.

### 2. Proyecto Backend (FastAPI)

El backend está desarrollado con FastAPI y se encarga de procesar las preguntas del usuario, enviar las preguntas y el contexto extraído de los documentos PDF al modelo de lenguaje (LLM), y devolver las respuestas al frontend. Los elementos clave del backend incluyen:

- **FastAPI**: Framework web para construir APIs rápidas y escalables en Python.
- **PyPDF2**: Biblioteca para leer y extraer texto de archivos PDF.
- **requests**: Biblioteca para realizar solicitudes HTTP a la instancia local de Ollama o al API externo de Ollama2.

#### Dependencias

- **OLLAMA2_API_KEY**: Clave API para el servicio externo de Ollama2.
- **OLLAMA_API_MODE**: Modo de operación (`local` o `external`).
- **OLLAMA_LOCAL_URL**: URL de la instancia local de Ollama.
- **DOCUMENTS_PATH**: Ruta a la carpeta que contiene los documentos PDF.

### 3. Base de Datos Vectorial (Elasticsearch o Alternative)

La base de datos vectorial se utiliza para almacenar y recuperar contextos relevantes de grandes volúmenes de texto. Aunque Elasticsearch es una opción común, se pueden considerar alternativas como Milvus o Qdrant.

- **Elasticsearch**: Motor de búsqueda y análisis distribuido y de código abierto.
- **Milvus**: Sistema de gestión de bases de datos vectoriales para grandes volúmenes de datos.
- **Qdrant**: Motor vectorial de búsqueda con soporte para indexación y recuperación eficiente.

### 4. Interacción del Sistema

1. **Usuario Interactúa con el Frontend**: El usuario ingresa una pregunta en la interfaz React.
2. **Frontend Envía Pregunta al Backend**: La pregunta se envía al endpoint `/query` del backend.
3. **Backend Procesa la Pregunta**:
    - Lee y extrae texto de los documentos PDF en la carpeta especificada.
    - Si el modo es `local`, envía la pregunta y el contexto al modelo Ollama en `127.0.0.1:11434`.
    - Si el modo es `external`, envía la pregunta y el contexto al API de Ollama2.
4. **Backend Recibe Respuesta y la Envía al Frontend**: El backend recibe la respuesta del modelo de lenguaje y la envía de vuelta al frontend.
5. **Frontend Muestra la Respuesta al Usuario**: La interfaz React muestra la respuesta del chatbot al usuario.

### Archivos Clave

- **Frontend**: Código React en la raíz del repositorio.
- **Backend**: Código FastAPI en el directorio `backend/`.
- **Documentos**: Archivos PDF ubicados en la ruta especificada por `DOCUMENTS_PATH`.

Esta estructura permite un flujo de trabajo eficiente entre el frontend y el backend, facilitando el desarrollo y la implementación del chatbot en Azure.

## Iniciador local

Para inciar los proyectos en modo DEMO localmente, descargue el Iniciador para [windows](https://github.com/farrojo/AzuSena-React/blob/main/Iniciador.bat) o para [linux](https://github.com/farrojo/AzuSena-React/blob/main/Iniciador.sh), al ejecutarlo este se encarga de correr el front y el back, este archivo debe estar en la carpeta del front.
