const micBtn = document.getElementById('mic-btn');
const messages = document.getElementById('chatbot-messages');

const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = 'en-US';
recognition.interimResults = false;

micBtn.addEventListener('click', () => {
  recognition.start();
});

recognition.onresult = (event) => {
  const userMessage = event.results[0][0].transcript;
  appendMessage('You', userMessage);
  fetchReply(userMessage);
};

recognition.onerror = (event) => {
  console.error('🎤 Speech recognition error:', event.error);
};

function appendMessage(sender, message) {
  const msg = document.createElement('div');
  msg.textContent = `${sender}: ${message}`;
  messages.appendChild(msg);
  messages.scrollTop = messages.scrollHeight;
}

function fetchReply(userMessage) {
  appendMessage('Bot', 'Thinking...');

  fetch('https://chatbot-widget-rust.vercel.app/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: userMessage })
  })
    .then(res => res.json())
    .then(data => {
      messages.lastChild.remove(); // remove 'Thinking...'
      const reply = data.reply;
      appendMessage('Bot', reply);
      speakText(reply);
    })
    .catch(err => {
      messages.lastChild.remove();
      appendMessage('Bot', 'Sorry, something went wrong.');
      console.error('🧠 GPT error:', err);
    });
}

function speakText(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  utterance.rate = 1;
  utterance.pitch = 1;
  window.speechSynthesis.speak(utterance);
}
