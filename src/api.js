const API_URL = 'http://localhost:8000';

export const queryAPI = async (query) => {
  const response = await fetch(`${API_URL}/query`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  });
  if (!response.ok) {
    throw new Error('Failed to fetch');
  }
  return response.json();
};
