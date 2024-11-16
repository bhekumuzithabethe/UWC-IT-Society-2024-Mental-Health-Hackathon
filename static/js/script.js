document.querySelector('.message-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const language = document.querySelector('#language').value;
    const messageInput = document.querySelector('.message-input');
    const message = messageInput.value.trim();
    const messagesList = document.getElementsByClassName('messages-list')[0];

    if (!message || !language) {
        alert('Please select a language and enter a message.');
        return;
    }

    // Add user message to the chat
    const messageItem = document.createElement('li');
    messageItem.classList.add('message', 'sent');
    messageItem.innerHTML = `
        <div class="message-text">
            <div class="message-sender"><b>You</b></div>
            <div class="message-content">${message}</div>
        </div>`;
    messagesList.appendChild(messageItem);
    messageInput.value = '';

    // Show typing indicator
    const typingIndicator = document.createElement('li');
    typingIndicator.classList.add('typing-indicator');
    typingIndicator.innerHTML = `
        <div class="dots">
            <h4>Hang in there! I'll respond to you in a moment.</h4>
            <span></span><span></span><span></span>
        </div>`;
    messagesList.appendChild(typingIndicator);

    // Send the message to the server
    fetch('', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
            'csrfmiddlewaretoken': document.querySelector('[name=csrfmiddlewaretoken]').value,
            'message': message,
            'language': language,
        }),
    })
        .then((response) => response.json())
        .then((data) => {
            // Remove typing indicator and show server response
            messagesList.removeChild(typingIndicator);

            const responseItem = document.createElement('li');
            responseItem.classList.add('message', 'received');
            responseItem.innerHTML = `
                <div class="message-text">
                    <div class="message-sender"><b>Virtual Therapist</b></div>
                    <div class="message-content">${data.response}</div>
                </div>`;
            messagesList.appendChild(responseItem);
        })
        .catch((error) => {
            messagesList.removeChild(typingIndicator);
            console.error('Error:', error);
            alert('Failed to send your message. Please try again later.');
        });
});
const sidebar = document.getElementById('sidebar');
function toggleSidebar() {
    if (sidebar) {
        sidebar.classList.toggle('show');
    }
}
const timeoutIds = [];

function scheduleReminder() {
    const title = document.getElementById('title').value.trim();
    const description = document.getElementById('description').value.trim();
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;

    if (!title || !description || !date || !time) {
        alert('Please fill in all reminder fields.');
        return;
    }

    const dateTimeString = `${date} ${time}`;
    const scheduledTime = new Date(dateTimeString);
    const currentTime = new Date();

    if (scheduledTime <= currentTime) {
        alert('The scheduled time is in the past!');
        return;
    }

    addReminder(title, description, dateTimeString);

    // Schedule notifications
    const timeDifference = scheduledTime - currentTime;
    const exactTimeoutId = setTimeout(() => {
        new Notification(title, { body: description, requireInteraction: true });
        document.getElementById('notificationSound').play();
    }, timeDifference);

    timeoutIds.push({ exactTimeoutId });
}

function addReminder(title, description, dateTimeString) {
    const tableBody = document.getElementById('reminderTableBody');
    const row = tableBody.insertRow();

    row.innerHTML = `
        <td>${title}</td>
        <td>${description}</td>
        <td>${dateTimeString}</td>
        <td><button onclick="deleteReminder(this)">Delete</button></td>`;
}

function deleteReminder(button) {
    const row = button.closest('tr');
    const index = row.rowIndex;

    if (timeoutIds[index - 1]) {
        clearTimeout(timeoutIds[index - 1].exactTimeoutId);
        timeoutIds.splice(index - 1, 1);
    }
    row.remove();
}

// Request notification permission once
if ('Notification' in window) {
    Notification.requestPermission().then((permission) => {
        if (permission !== 'granted') {
            alert('Please allow notification access!');
        }
    });
}
