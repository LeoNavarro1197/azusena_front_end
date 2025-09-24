import io from 'socket.io-client';

// Configuración centralizada de la API
const API_URL = 'http://localhost:5000';

// Función para enviar consultas al chat
export const queryAPI = async (queryText) => {
  const response = await fetch(`${API_URL}/query`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query_text: queryText }),
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch');
  }
  
  return response.json();
};

// Función para crear y configurar la conexión WebSocket
export const createSocketConnection = () => {
  const socket = io(API_URL, { 
    transports: ['websocket', 'polling'] 
  });
  
  return socket;
};

// Función para configurar los listeners del WebSocket
export const setupSocketListeners = (socket, callbacks) => {
  const { onConnect, onPreResponse, onFinalResponse } = callbacks;
  
  socket.on('connect', () => {
    console.log('Conectado al servidor WebSocket');
    if (onConnect) onConnect();
  });

  socket.on('pre_response', (data) => {
    if (onPreResponse) onPreResponse(data.pre_response);
  });

  socket.on('final_response', (data) => {
    if (onFinalResponse) onFinalResponse(data.response);
  });

  return () => {
    socket.off('pre_response');
    socket.off('final_response');
    socket.off('connect');
  };
};

// Exportar la URL base para uso externo si es necesario
export { API_URL };
