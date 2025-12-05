console.log('Popup JS loaded');

document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded');
  const sendBtn = document.getElementById('sendBtn');
  console.log('Send button:', sendBtn);
  
  if (sendBtn) {
    sendBtn.addEventListener('click', function() {
      console.log('Button clicked!');
      handleSend();
    });
  } else {
    console.error('Send button not found!');
  }
});

async function handleSend() {
  console.log('Handle send called');
  
  const message = document.getElementById('message').value.trim();
  const statusDiv = document.getElementById('status');
  
  console.log('Message:', message);
  
  if (!message) {
    statusDiv.textContent = '⚠️ Please enter a message';
    statusDiv.className = 'error';
    statusDiv.style.display = 'block';
    return;
  }
  
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    console.log('Current tab:', tab);
    
    chrome.tabs.sendMessage(tab.id, {
      action: 'sendFollowups',
      message: message
    }, function(response) {
      console.log('Response:', response);
      
      if (response && response.status === 'started') {
        statusDiv.textContent = '⏳ Processing...';
        statusDiv.className = 'info';
        statusDiv.style.display = 'block';
        
        setTimeout(() => {
          window.close();
        }, 2000);
      }
    });
  } catch (error) {
    console.error('Error:', error);
    statusDiv.textContent = '❌ Error: ' + error.message;
    statusDiv.className = 'error';
    statusDiv.style.display = 'block';
  }
}