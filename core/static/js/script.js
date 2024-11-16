// Ask user to allow notification access
if ("Notification" in window) {
    Notification.requestPermission().then(function (permission) {
      if (Notification.permission !== "granted") {
        alert("Please allow notification access!");
        location.reload();
      }
    });
  }

  var timeoutIds = [];

  function scheduleReminder() {
    var title = document.getElementById("title").value;
    var description = document.getElementById("description").value;
    var date = document.getElementById("date").value;
    var time = document.getElementById("time").value;

    var dateTimeString = date + " " + time;
    var scheduledTime = new Date(dateTimeString);
    var currentTime = new Date();
    var timeDifference = scheduledTime - currentTime;

    if (timeDifference > 0) {
      addReminder(title, description, dateTimeString);

      // Schedule notification at the exact reminder time
      var exactTimeoutId = setTimeout(function () {
        document.getElementById("notificationSound").play();

        var notification = new Notification(title, {
          body: description,
          requireInteraction: true,
        });
      }, timeDifference);

      // Schedule notification 24 hours before
      var twentyFourHoursBeforeTimeDifference = timeDifference - 86400000; // 24 hours in milliseconds
      var twentyFourHourTimeoutId;
      if (twentyFourHoursBeforeTimeDifference > 0) {
        twentyFourHourTimeoutId = setTimeout(function () {
          document.getElementById("notificationSound").play();

          var notification = new Notification("24 Hour Reminder: " + title, {
            body: "This is a reminder for: " + description,
            requireInteraction: true,
          });
        }, twentyFourHoursBeforeTimeDifference);
      }

      // Schedule notification 1 hour before
      var oneHourBeforeTimeDifference = timeDifference - 3600000; // 1 hour in milliseconds
      var oneHourTimeoutId;
      if (oneHourBeforeTimeDifference > 0) {
        oneHourTimeoutId = setTimeout(function () {
          document.getElementById("notificationSound").play();

          var notification = new Notification("1 Hour Reminder: " + title, {
            body: "This is a reminder for: " + description,
            requireInteraction: true,
          });
        }, oneHourBeforeTimeDifference);
      }

      // Store all timeout IDs
      timeoutIds.push({ exactTimeoutId, twentyFourHourTimeoutId, oneHourTimeoutId });
    } else {
      alert("The scheduled time is in the past!");
    }
  }

  function addReminder(title, description, dateTimeString) {
    var tableBody = document.getElementById("reminderTableBody");

    var row = tableBody.insertRow();

    var titleCell = row.insertCell(0);
    var descriptionCell = row.insertCell(1);
    var dateTimeCell = row.insertCell(2);
    var actionCell = row.insertCell(3);

    titleCell.innerHTML = title;
    descriptionCell.innerHTML = description;
    dateTimeCell.innerHTML = dateTimeString;
    actionCell.innerHTML =
      '<button onclick="deleteReminder(this)">Delete</button>';
  }

  function deleteReminder(button) {
    var row = button.closest("tr");
    var index = row.rowIndex;

    // Clear all timeout IDs for the reminder
    if (timeoutIds[index - 1]) {
      clearTimeout(timeoutIds[index - 1].exactTimeoutId);
      clearTimeout(timeoutIds[index - 1].twentyFourHourTimeoutId);
      clearTimeout(timeoutIds[index - 1].oneHourTimeoutId);
      timeoutIds.splice(index - 1, 1);
    }

    row.remove();
  }

  // Ask user to allow notification access
if ("Notification" in window) {
    Notification.requestPermission().then(function (permission) {
      if (Notification.permission !== "granted") {
        alert("Please allow notification access!");
        location.reload();
      }
    });
  }

  var timeoutIds = [];

  function scheduleReminder() {
    var title = document.getElementById("title").value;
    var description = document.getElementById("description").value;
    var date = document.getElementById("date").value;
    var time = document.getElementById("time").value;

    var dateTimeString = date + " " + time;
    var scheduledTime = new Date(dateTimeString);
    var currentTime = new Date();
    var timeDifference = scheduledTime - currentTime;

    if (timeDifference > 0) {
      addReminder(title, description, dateTimeString);

      // Schedule notification at the exact reminder time
      var exactTimeoutId = setTimeout(function () {
        document.getElementById("notificationSound").play();

        var notification = new Notification(title, {
          body: description,
          requireInteraction: true,
        });
      }, timeDifference);

      // Schedule notification 24 hours before
      var twentyFourHoursBeforeTimeDifference = timeDifference - 86400000; // 24 hours in milliseconds
      var twentyFourHourTimeoutId;
      if (twentyFourHoursBeforeTimeDifference > 0) {
        twentyFourHourTimeoutId = setTimeout(function () {
          document.getElementById("notificationSound").play();

          var notification = new Notification("24 Hour Reminder: " + title, {
            body: "This is a reminder for: " + description,
            requireInteraction: true,
          });
        }, twentyFourHoursBeforeTimeDifference);
      }

      // Schedule notification 1 hour before
      var oneHourBeforeTimeDifference = timeDifference - 3600000; // 1 hour in milliseconds
      var oneHourTimeoutId;
      if (oneHourBeforeTimeDifference > 0) {
        oneHourTimeoutId = setTimeout(function () {
          document.getElementById("notificationSound").play();

          var notification = new Notification("1 Hour Reminder: " + title, {
            body: "This is a reminder for: " + description,
            requireInteraction: true,
          });
        }, oneHourBeforeTimeDifference);
      }

      // Store all timeout IDs
      timeoutIds.push({ exactTimeoutId, twentyFourHourTimeoutId, oneHourTimeoutId });
    } else {
      alert("The scheduled time is in the past!");
    }
  }

  function addReminder(title, description, dateTimeString) {
    var tableBody = document.getElementById("reminderTableBody");

    var row = tableBody.insertRow();

    var titleCell = row.insertCell(0);
    var descriptionCell = row.insertCell(1);
    var dateTimeCell = row.insertCell(2);
    var actionCell = row.insertCell(3);

    titleCell.innerHTML = title;
    descriptionCell.innerHTML = description;
    dateTimeCell.innerHTML = dateTimeString;
    actionCell.innerHTML =
      '<button onclick="deleteReminder(this)">Delete</button>';
  }

  function deleteReminder(button) {
    var row = button.closest("tr");
    var index = row.rowIndex;

    // Clear all timeout IDs for the reminder
    if (timeoutIds[index - 1]) {
      clearTimeout(timeoutIds[index - 1].exactTimeoutId);
      clearTimeout(timeoutIds[index - 1].twentyFourHourTimeoutId);
      clearTimeout(timeoutIds[index - 1].oneHourTimeoutId);
      timeoutIds.splice(index - 1, 1);
    }

    row.remove();
  }

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

