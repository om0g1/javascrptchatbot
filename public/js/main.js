const botResponse = document.querySelector("#bot-response");
const messageInput = document.querySelector("#message-input");
const chatInput = document.querySelector("#chat-input");

function sendMessage(message) {
    fetch("http://localhost:8080/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: message })
    })
    .then((response) => response.json())
    .then((data) => botResponse.innerHTML = data.response)
    .catch((error) => console.error(error));

}

chatInput.onsubmit = (e) => {
    e.preventDefault();
    sendMessage(messageInput.value);
}