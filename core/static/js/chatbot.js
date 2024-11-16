const messagesList = document.getElementsByClassName('messages-list')[0]; 
const messageForm = document.getElementsByClassName('message-form')[0];     
const messageInput = document.getElementsByClassName('message-input')[0];   

messageForm.addEventListener('submit', (event) => {
  event.preventDefault(); 
  const message = messageInput.value.trim(); 
  if (message.length === 0) { 
    return;
  }

  const messageItem = document.createElement('li');
  messageItem.classList.add('message', 'sent');
  messageItem.innerHTML = `
    <div class="message-text">
        <div class="message-sender">
            <b>You</b>
        </div>
        <div class="message-content">
            ${message}
        </div>
    </div>`;
  messagesList.appendChild(messageItem);

  messageInput.value = '';


    
  // Function to add the typing indicator
  function showTypingIndicator() {
    const typingIndicator = document.createElement('li');
    typingIndicator.classList.add('typing-indicator');
    typingIndicator.innerHTML = `
        <div class="dots">
            <h4>Hang in there I'll respond to you in a moment.</h4><span></span><span></span><span></span>
        </div>`;
    document.querySelector('#messagesList').appendChild(typingIndicator);
    return typingIndicator; // Return the indicator so we can remove it later
  }

  // Function to remove the typing indicator
  function removeTypingIndicator(typingIndicator) {
    if (typingIndicator && typingIndicator.parentElement) {
        typingIndicator.parentElement.removeChild(typingIndicator);
    }
  }

  // Example fetch call with the typing indicator
  const typingIndicator = showTypingIndicator();

  fetch('', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
        'csrfmiddlewaretoken': document.querySelector('[name=csrfmiddlewaretoken]').value,
        'message': message
    })
  })
  .then(response => {
    removeTypingIndicator(typingIndicator);
    return response.json();
  })
  .then(data => {
    const response = data.response;
    const responseItem = document.createElement('li');
    responseItem.classList.add('message', 'received');
    responseItem.innerHTML = `
        <div class="message-text">
            <div class="message-sender">
                <b>Virtual Therapist</b>
            </div>
            <div class="message-content">
                ${response}
            </div>
        </div>`;
    document.querySelector('#messagesList').appendChild(responseItem);
  })
  .catch(error => {
    removeTypingIndicator(typingIndicator);
    console.error('Error:', error);
    alert('Failed to send your message. Please try again later.');
  });  
  fetch('', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
          'csrfmiddlewaretoken': document.querySelector('[name=csrfmiddlewaretoken]').value,
          'message': message
      })
  })
  .then(response => {
      messagesList.removeChild(typingIndicator); // Remove the indicator once the response is received
      return response.json();
  })
  .then(data => {
      // Add the response to the chat
      const response = data.response;
      const responseItem = document.createElement('li');
      responseItem.classList.add('message', 'received');
      responseItem.innerHTML = `
          <div class="message-text">
              <div class="message-sender">
                  <b>AI Therapist</b>
              </div>
              <div class="message-content">
                  ${response}
              </div>
          </div>`;
      messagesList.appendChild(responseItem);
  })
  .catch(error => {
      messagesList.removeChild(typingIndicator);
      console.error('Error:', error);
      alert('Failed to send your message. Please try again later.');
  });
  
});

