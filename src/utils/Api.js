
const API_URL = process.env.CV_API_URL || 'http://localhost:8000/api';

export const getChatbotResponse = (question, onChunk, onDone, onError) => {
  const eventSource = new EventSource(`${API_URL}/chatbot/?question=${encodeURIComponent(question)}`, {
    headers: {
      'Accept': 'text/event-stream'
    }
  });

  eventSource.onmessage = (event) => {
    if (event.data === '[DONE]') {
      eventSource.close();
      onDone();
    } else {
      const { chunk } = JSON.parse(event.data);
      onChunk(chunk);
    }
  };

  eventSource.onerror = (error) => {
    console.error('EventSource failed:', error);
    eventSource.close();
    onError(error);
  };

  return () => {
    eventSource.close();
  };
};