const input = document.getElementById('chatbot-input');
const messages = document.getElementById('chatbot-messages');

input.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    const userMessage = input.value;
    appendMessage('You', userMessage);
    input.value = '';
    // Placeholder for bot response
    setTimeout(() => {
      appendMessage('Bot', 'This is a placeholder response.');
    }, 500);
  }
});

function appendMessage(sender, message) {
  const messageElement = document.createElement('div');
  messageElement.textContent = `${sender}: ${message}`;
  messages.appendChild(messageElement);
  messages.scrollTop = messages.scrollHeight;
}
