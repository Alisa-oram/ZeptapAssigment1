const chatMessages = document.getElementById("chat-messages");
const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");

// Mock documentation data
const docs = {
  segment: {
    "set up a new source": "To set up a new source in Segment, go to the Sources tab, click 'Add Source,' select the source type, and follow the setup instructions.",
  },
  mparticle: {
    "create a user profile": "To create a user profile in mParticle, use the Identity API to set up user attributes and link devices to the profile.",
  },
  lytics: {
    "build an audience segment": "To build an audience segment in Lytics, navigate to the Segments page, click 'Create New Segment,' and define the conditions for your audience.",
  },
  zeotap: {
    "integrate data": "To integrate your data with Zeotap, upload your datasets via the Data Ingestion API or directly through the dashboard.",
  },
};

// Handle sending a message
function sendMessage() {
  const question = userInput.value.trim();
  if (!question) return;

  addMessage("user", question);

  const response = handleQuestion(question.toLowerCase());
  addMessage("bot", response);

  userInput.value = "";
}

// Add a message to the chat
function addMessage(sender, text) {
  const message = document.createElement("div");
  message.className = `message ${sender}`;
  message.textContent = text;
  chatMessages.appendChild(message);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Handle user questions
function handleQuestion(question) {
  // Basic logic to check for keywords in the question
  for (const [cdp, faq] of Object.entries(docs)) {
    for (const [task, answer] of Object.entries(faq)) {
      if (question.includes(task)) {
        return answer;
      }
    }
  }

  return "I'm sorry, I couldn't find an answer to your question. Please try rephrasing.";
}

// Event listeners
sendButton.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});
