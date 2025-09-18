// src/voiceUtils.js

let isSpeaking = false; // Control global para determinar si se está hablando

export const stopSpeaking = () => {
    const synth = window.speechSynthesis;
    isSpeaking = false;
    synth.cancel(); // Detiene la reproducción de voz inmediatamente
    console.log("Reproducción de voz detenida.");
};

export const speakTextWithSpecificVoice = (text, options = {}) => {
    const synth = window.speechSynthesis;

    if (isSpeaking) {
        console.warn("Ya se está reproduciendo una respuesta. Detén la reproducción actual antes de comenzar una nueva.");
        return;
    }

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
            const utterances = splitTextIntoChunks(text); // Dividir el texto en fragmentos

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
