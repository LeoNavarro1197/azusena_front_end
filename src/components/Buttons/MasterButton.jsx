import React, { useEffect, useState } from 'react';
import { ReactComponent as Microphone } from '../../assets/button-icons/micro-03.svg';
import { ReactComponent as SendIcon } from '../../assets/button-icons/send.svg';
import { ReactComponent as StopIcon } from '../../assets/button-icons/stop.svg';
import '../../App.css';
import { stopSpeaking } from '../../voiceUtils';

const MasterButton = ({ onTranscript, text = '', isResponding, isSpeaking, stopSpeakingOverride, onSubmit }) => {
    const [recognition, setRecognition] = useState(null);
    const [isListening, setIsListening] = useState(false);

    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            const recognitionInstance = new SpeechRecognition();
            recognitionInstance.lang = 'es-ES';
            recognitionInstance.interimResults = false;
            recognitionInstance.maxAlternatives = 1;

            recognitionInstance.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                console.log(`Audio capturado: ${transcript}`);

                if (onTranscript) {
                    onTranscript(transcript);
                }
                setIsListening(false);
            };

            recognitionInstance.onerror = (event) => {
                console.error('Error de reconocimiento de voz:', event.error);
                setIsListening(false);
            };

            recognitionInstance.onend = () => {
                setIsListening(false);
                console.log('Reconocimiento de voz finalizado.');
            };

            setRecognition(recognitionInstance);
        } else {
            console.warn('El reconocimiento de voz no está soportado en este navegador.');
        }
    }, [onTranscript]);

    const startListening = () => {
        if (recognition && !isListening) {
            try {
                recognition.start();
                setIsListening(true);
                console.log('Iniciando reconocimiento de voz...');
            } catch (error) {
                setIsListening(false);
                console.error('Error al iniciar reconocimiento de voz:', error);
            }
        }
    };

    const stopListening = () => {
        if (recognition && isListening) {
            try {
                recognition.stop();
                setIsListening(false);
                console.log('Reconocimiento de voz detenido.');
            } catch (error) {
                console.error('Error al detener reconocimiento de voz:', error);
            }
        }
    };

    const handleClick = () => {
        if (isSpeaking) {
            stopSpeaking(); // Detiene la reproducción de voz
            if (stopSpeakingOverride) stopSpeakingOverride(); // Llama a una función adicional si es necesaria
        } else if (text && text.trim() !== '') {
            if (onSubmit) {
                onSubmit(); // Llama a la función de envío cuando hay texto
            } else {
                console.warn('Función onSubmit no definida.');
            }
        } else {
            if (isListening) {
                stopListening(); // Detener si ya está escuchando antes de iniciar nuevamente
            } else {
                startListening(); // Iniciar reconocimiento de voz
            }
        }
    };

    return (
        <button
            onClick={handleClick}
            onMouseDown={!isResponding && !isSpeaking && (!text || text.trim() === '') ? startListening : undefined}
            onMouseUp={!isResponding && !isSpeaking && (!text || text.trim() === '') ? stopListening : undefined}
            onTouchStart={!isResponding && !isSpeaking && (!text || text.trim() === '') ? startListening : undefined}
            onTouchEnd={!isResponding && !isSpeaking && (!text || text.trim() === '') ? stopListening : undefined}
            className={`master-button ${isListening || isSpeaking ? 'listening' : ''} ${text && text.trim() !== '' ? 'has-text' : ''}`}
            aria-label="Hold to speak or send"
        >
            {isSpeaking ? (
                <StopIcon className="button-icon stop-icon" /> // Botón de stop mientras se reproduce la voz
            ) : text && text.trim() !== '' ? (
                <SendIcon className="button-icon send-icon" />
            ) : (
                <Microphone className="button-icon microphone-icon" />
            )}
        </button>
    );
};

export default MasterButton;
