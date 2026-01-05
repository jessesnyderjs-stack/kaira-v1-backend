const chatWindow = document.getElementById('chat-window');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

const API_URL = 'https://kaira-v1-backend-2.onrender.com/chat';

function appendMessage(text, sender = 'kaira') {
  const msg = document.createElement('div');
  msg.className = `message ${sender}`;
  msg.textContent = text;
  chatWindow.appendChild(msg);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

async function sendMessage() {
  const input = userInput.value.trim();
  if (!input) return;

  appendMessage(input, 'user');
  userInput.value = '';
  
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input })
    });

    const data = await response.json();
    const reply = data?.response || 'Hmm, something went wrong.';
    appendMessage(reply, 'kaira');
  } catch (error) {
    appendMessage('Sorry, I’m having trouble responding right now.', 'kaira');
    console.error(error);
  }
}

sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') sendMessage();
});