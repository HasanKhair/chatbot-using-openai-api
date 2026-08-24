const form = document.getElementById("chat-form");
const input = document.getElementById("message");
const chat = document.getElementById("chat");

function addMessage(text, sender) {
    const message = document.createElement("div");

    message.classList.add("message");
    message.classList.add(sender);

    message.textContent = text;

    chat.appendChild(message);

    chat.scrollTop = chat.scrollHeight;
}

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const message = input.value.trim();

    if (!message) {
        return;
    }

    addMessage(message, "user");

    input.value = "";

    try {
        const response = await fetch("/api/chat", {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify({
                message: message,
            }),
        });

        const data = await response.json();

        if (data.error) {
            addMessage(data.error, "bot");
            return;
        }

        addMessage(data.reply, "bot");

    } catch (error) {
        console.error(error);

        addMessage(
            "Unable to connect to the server.",
            "bot"
        );
    }
});