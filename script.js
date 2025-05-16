const input = document.getElementById('chatbot-input');
const messages = document.getElementById('chatbot-messages');

input.addEventListener('keypress', async function (e) {
  if (e.key === 'Enter') {
    const userMessage = input.value.trim();
    if (!userMessage) return;

    appendMessage('You', userMessage);
    input.value = '';

    appendMessage('Bot', 'Typing...');

    try {
      const response = await fetch('https://chatbot-widget-rust.vercel.app/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: userMessage })
      });

      const data = await response.json();

      // Remove the "Typing..." placeholder
      messages.lastChild.remove();
      appendMessage('Bot', data.reply);
    } catch (error) {
      messages.lastChild.remove();
      appendMessage('Bot', 'Sorry, something went wrong.');
      console.error('Chatbot error:', error);
    }
  }
});

function appendMessage(sender, message) {
  const messageElement = document.createElement('div');
  messageElement.textContent = `${sender}: ${message}`;
  messages.appendChild(messageElement);
  messages.scrollTop = messages.scrollHeight;
}
