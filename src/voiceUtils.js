// src/voiceUtils.js

let isSpeaking = false; // Control global para determinar si se está hablando

export const stopSpeaking = () => {
    const synth = window.speechSynthesis;
    isSpeaking = false;
    synth.cancel(); // Detiene la reproducción de voz inmediatamente
    console.log("Reproducción de voz detenida.");
};

// Elimina la sintaxis Markdown, conservando el texto legible
const stripMarkdown = (input) => {
    let output = input || '';
    // Quitar imágenes conservando el alt
    output = output.replace(/!\[(.*?)\]\((.*?)\)/g, '$1');
    // Quitar enlaces conservando el texto
    output = output.replace(/\[(.*?)\]\((.*?)\)/g, '$1');
    // Quitar código en bloque ```...
    output = output.replace(/```([\s\S]*?)```/g, '$1');
    // Quitar backticks de código en línea
    output = output.replace(/`([^`]*)`/g, '$1');
    // Quitar negritas y cursivas
    output = output.replace(/\*\*([^*]+)\*\*/g, '$1'); // **texto**
    output = output.replace(/\*([^*]+)\*/g, '$1');       // *texto*
    output = output.replace(/__([^_]+)__/g, '$1');         // __texto__
    output = output.replace(/_([^_]+)_/g, '$1');           // _texto_
    // Quitar encabezados (#, ##, ### ...)
    output = output.replace(/^#{1,6}\s+/gm, '');
    // Quitar citas >
    output = output.replace(/^>\s+/gm, '');
    // Quitar marcadores de lista (-, *, +) y numeradas
    output = output.replace(/^\s*[-*+]\s+/gm, '');
    output = output.replace(/^\s*\d+\.\s+/gm, '');
    // Quitar reglas horizontales
    output = output.replace(/^\s*(?:-\s*){3,}$|^\s*(?:_\s*){3,}$|^\s*(?:\*\s*){3,}$/gm, '');
    // Quitar piping de tablas, dejando el texto
    output = output.replace(/\|/g, ' ');
    // Quitar escapes de Markdown
    output = output.replace(/\\([\\`*_{}\[\]()#+\-.!])/g, '$1');
    // Reducir espacios y saltos de línea excesivos
    output = output.replace(/[ ]{2,}/g, ' ').replace(/\n{3,}/g, '\n\n');
    return output.trim();
};

// Normaliza el texto para TTS: elimina bullets, emojis y signos que dicen "punto/guion"
const normalizeForSpeech = (input) => {
    let output = stripMarkdown(input);

    // Quitar emojis y pictogramas comunes
    output = output.replace(/[\u{1F1E6}-\u{1F1FF}\u{1F300}-\u{1F5FF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{1F900}-\u{1F9FF}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '');

    // Quitar bullets visibles al inicio de línea y en el resto
    output = output.replace(/^\s*[•▪◦·►]\s+/gm, '');
    output = output.replace(/[•▪◦·►]/g, ' ');

    // Reemplazar raya/en dash por pausa breve
    output = output.replace(/[—–]/g, ', ');

    // Reemplazar dos puntos por pausa breve para evitar "dos puntos"
    output = output.replace(/:\s*/g, ', ');

    // Reemplazar puntos suspensivos por pausa
    output = output.replace(/…|\.\.\./g, ' ');

    // Eliminar paréntesis pero conservar su contenido
    output = output.replace(/[()]/g, '');

    // Compactar espacios y saltos
    output = output.replace(/[ ]{2,}/g, ' ').replace(/\n{3,}/g, '\n\n');

    return output.trim();
};

export const speakTextWithSpecificVoice = (text, options = {}) => {
    const synth = window.speechSynthesis;

    if (isSpeaking) {
        console.warn("Ya se está reproduciendo una respuesta. Detén la reproducción actual antes de comenzar una nueva.");
        return;
    }

    // Limpiar Markdown y normalizar para TTS antes de dividir y hablar
    const plainText = normalizeForSpeech(text);

    const onVoicesChanged = () => {
        const voices = synth.getVoices();

        let targetVoice = voices.find(voice =>
            voice.name.includes('Google español de Estados Unidos') && voice.lang.includes('es-US')
        );

        if (!targetVoice) {
            console.warn('Specific voice not found. Selecting another available voice.');
            targetVoice = voices.find(voice => voice.lang.startsWith('es')) || voices[0];
        }

        if (targetVoice) {
            console.log(`Speaking with: ${targetVoice.name} [${targetVoice.lang}]`);
            const utterances = splitTextIntoChunks(plainText); // Dividir el texto en fragmentos

            // Iniciar reproducción secuencial de fragmentos
            isSpeaking = true;
            playChunksSequentially(utterances, targetVoice, options, 0);
        } else {
            console.error("No available voices found.");
        }

        synth.removeEventListener('voiceschanged', onVoicesChanged);
    };

    synth.addEventListener('voiceschanged', onVoicesChanged);

    if (synth.getVoices().length !== 0) {
        onVoicesChanged();
    }
};

// Función para dividir el texto en fragmentos más naturales
const splitTextIntoChunks = (text, maxChunkLength = 100) => {
    const sentenceDelimiters = /([.!?])(\s|$)/g;
    const sentences = text.split(sentenceDelimiters).reduce((acc, part, index) => {
        if (index % 2 === 0) {
            acc.push(part);
        } else {
            acc[acc.length - 1] += part;
        }
        return acc;
    }, []);

    const chunks = [];
    let currentChunk = "";

    for (const sentence of sentences) {
        if ((currentChunk + sentence).length <= maxChunkLength) {
            currentChunk += sentence;
        } else {
            chunks.push(currentChunk.trim());
            currentChunk = sentence;
        }
    }
    if (currentChunk) {
        chunks.push(currentChunk.trim());
    }

    return chunks;
};

// Función para reproducir los fragmentos secuencialmente
const playChunksSequentially = (chunks, voice, options, index) => {
    const synth = window.speechSynthesis;

    if (index >= chunks.length || !isSpeaking) {
        console.log("Finished speaking all chunks or stopped by user.");
        isSpeaking = false;
        if (options.onEnd) options.onEnd();
        return;
    }

    const utterance = new SpeechSynthesisUtterance(chunks[index]);
    utterance.voice = voice;
    utterance.rate = options.rate || 1.1;
    utterance.pitch = options.pitch || 1;
    utterance.volume = options.volume || 1;

    utterance.onend = () => {
        console.log(`Finished chunk ${index + 1} of ${chunks.length}`);
        setTimeout(() => playChunksSequentially(chunks, voice, options, index + 1), 50);
    };

    utterance.onerror = (event) => {
        console.error(`Error occurred while speaking chunk ${index + 1}:`, event.error);
        setTimeout(() => playChunksSequentially(chunks, voice, options, index + 1), 50);
    };

    console.log(`Speaking chunk ${index + 1} of ${chunks.length}`);
    synth.speak(utterance);
};
