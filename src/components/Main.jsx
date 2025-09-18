import React, { useState, useRef, useEffect } from "react";
import MasterButton from "./Buttons/MasterButton.jsx";
import AdmissionButton from "./Buttons/AdmissionButton.jsx";
import AffiliationButton from "./Buttons/AffiliationButton.jsx";
import BillingButton from "./Buttons/BillingButton.jsx";
import PQRSButton from "./Buttons/OrientacionAlUsuarioButton.jsx";
import Render from "./Render";
import { speakTextWithSpecificVoice } from '../voiceUtils';
import io from 'socket.io-client';
import { useNavigate } from 'react-router-dom';

const socket = io('http://localhost:5000', { transports: ['websocket', 'polling'] });

export default function Main() {
    const [text, setText] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [showChat, setShowChat] = useState(false);
    const [isResponding, setIsResponding] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const textareaRef = useRef(null);
    const chatEndRef = useRef(null);
    const navigate = useNavigate();

    const handleSubmit = async (queryText = text) => {
        if (!queryText || !queryText.trim()) {
            console.log("El texto está vacío, no se ejecuta el submit.");
            return;
        }
        try {
            setChatHistory(prevHistory => [
                ...prevHistory,
                { text: queryText, isUser: true }
            ]);

            setIsResponding(true);

            await fetch("http://localhost:5000/query", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ query_text: queryText }),
            });

            setText('');
            setShowChat(true);
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setIsResponding(false);
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleSubmit();
        }
    };

    const handleVoiceRecognition = (transcript) => {
        setText(transcript);
        handleSubmit(transcript);
    };

    const handleButtonClickWithText = (buttonText) => {
        setText(buttonText);
        handleSubmit(buttonText);
    };

    const handleSpeak = (text) => {
        setIsSpeaking(true);
        speakTextWithSpecificVoice(text, {
            onEnd: () => {
                setIsSpeaking(false);
            }
        });
    };

    const stopSpeaking = () => {
        const synth = window.speechSynthesis;
        if (synth.speaking) {
            synth.cancel();
            setIsSpeaking(false);
        }
    };

    const handleDisplayWordByWord = (generatedText) => {
        const words = generatedText.split(" ");
        let index = 0;
        const interval = setInterval(() => {
            if (index < words.length) {
                setChatHistory((prevHistory) => [
                    ...prevHistory.slice(0, -1),
                    { text: `${prevHistory[prevHistory.length - 1]?.text || ""} ${words[index]}`.trim(), isUser: false }
                ]);
                index++;
            } else {
                clearInterval(interval);
            }
        }, 50);
    };

    useEffect(() => {
        socket.on('connect', () => {
            console.log('Conectado al servidor WebSocket');
        });

        socket.on('pre_response', (data) => {
            const preResponseText = data.pre_response;

            if (textareaRef.current) {
                textareaRef.current.value = preResponseText;
            }

            if (preResponseText) {
                handleSpeak(preResponseText);
            }
        });

        socket.on('final_response', (data) => {
            const generatedText = data.response;

            setChatHistory(prevHistory => [
                ...prevHistory,
                { text: "", isUser: false }
            ]);

            handleDisplayWordByWord(generatedText);

            if (generatedText) {
                handleSpeak(generatedText);
            }
        });

        return () => {
            socket.off('pre_response');
            socket.off('final_response');
            socket.off('connect');
        };
    }, []);

    useEffect(() => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [chatHistory]);

    return (
        <div className="flex container mx-auto p-2 overflow-hidden">
            <div className="w-2/5 bg-transparent relative">
                <Render isSpeaking={isSpeaking} />

                {showChat && (
                    <div className="absolute bottom-4 w-full flex justify-center">
                        <button
                            onClick={() => {
                                setShowChat(false);
                                setChatHistory([]);
                                stopSpeaking();
                            }}
                            className="bg-customGreen hover:bg-green text-white py-2 px-4 rounded"
                        >
                            &lt; Volver al inicio
                        </button>
                    </div>
                )}
            </div>
            <div className="w-3/5 bg-transparent p-2 flex flex-col justify-between max-h-60vh">
                <div className="flex flex-col space-y-2">
                    <div className="flex flex-col space-y-2 p-2">
                        <p className="font-work text-5xl text-customGreen pt-16">
                            Hola, soy AzuSENA
                        </p>
                        <p className="font-work text-sm text-white italic">
                            IA Procesos Administrativos
                        </p>
                    </div>
                    <div className="flex-grow flex flex-col pt-9 text-2xl text-white overflow-y-auto">
                        {!showChat ? (
                            <div className="flex flex-col items-start gap-4 w-full">
                                <div className="text-left mb-4">Pregúntame por alguno de los siguientes ítems:</div>
                                <div className="flex flex-wrap justify-between gap-4 w-full p-3 ">
                                    <AdmissionButton onClick={handleButtonClickWithText} />
                                    <AffiliationButton onClick={handleButtonClickWithText} />
                                    <BillingButton onClick={handleButtonClickWithText} />
                                    <PQRSButton onClick={handleButtonClickWithText} />
                                </div>
                            </div>
                        ) : (
                            <div className="relative flex-grow bg-transparent">
                                <div className="chat-container px-4 pb-10 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200 scrollbar-thumb-rounded scrollbar-track-rounded max-h-96">
                                    {chatHistory.map((message, index) => {
                                        const isUserMessage = message.isUser;
                                        return (
                                            <div key={index} className={`flex ${isUserMessage ? 'justify-end' : 'justify-start'}`}>
                                                <div className={`px-4 py-2 mb-2 text-white text-xs rounded-2xl ${isUserMessage ? 'border border-white' : 'bg-transparent border-2 border-customGreen'}`}>
                                                    {message.text}
                                                </div>
                                            </div>
                                        );
                                    })}
                                    <div ref={chatEndRef} />
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex items-center space-x-2 mt-2">
                        <textarea
                            placeholder="Escribe o habla aquí con AzuSENA"
                            className="flex-grow p-4 border rounded-2xl border-gray-300 resize-none overflow-auto"
                            style={{
                                minHeight: '60px',
                                maxHeight: '60px'
                            }}
                            ref={textareaRef}
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        <MasterButton 
                            onTranscript={handleVoiceRecognition} 
                            text={text} 
                            isResponding={isResponding} 
                            isSpeaking={isSpeaking} 
                            stopSpeaking={stopSpeaking} 
                            onSubmit={handleSubmit} // Ajuste agregado
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
