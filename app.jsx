function ChatInput({ chatMessages, setChatMessages }) {
    const [inputText, setInputText] = React.useState("");

    function saveInputText(event) {
        setInputText(event.target.value);
    }

    async function sendMessage() {
        setInputText("");

        const newChatMessages = [
            ...chatMessages,
            {
                message: inputText,
                sender: "user",
                id: crypto.randomUUID(),
            },
        ];

        setChatMessages([
            ...newChatMessages,
            {
                message: "Loading...",
                sender: "robot",
                id: crypto.randomUUID(),
            },
        ]);

        const response = await Chatbot.getResponseAsync(inputText);

        setChatMessages([
            ...newChatMessages,
            {
                message: response,
                sender: "robot",
                id: crypto.randomUUID(),
            },
        ]);

        setInputText("");
    }

    function onKeyDown(event) {
        if (event.key === "Enter") {
            sendMessage();
        } else if (event.key === "Escape") {
            setInputText("");
        }
    }

    return (
        <div className="chat-input-container">
            <input
                type="text"
                placeholder="Send a message to ChatBot"
                size="30"
                onChange={saveInputText}
                value={inputText}
                onKeyDown={onKeyDown}
                className="chat-input"
            />
            <button onClick={sendMessage} className="send-button">
                Send
            </button>
        </div>
    );
}

function ChatMessage({ message, sender }) {
    return (
        <div
            className={sender === "user" 
                ? "chat-message-user" 
                : "chat-message-robot"
        }>
            {sender === "robot" && (
                <img 
                    src="assets/robot.png" 
                    className="chat-message-profile"
                />
            )}
            <div 
                className="chat-message-text">{message}
            </div>
            {sender === "user" && (
                <img 
                    src="assets/user.png" 
                    className="chat-message-profile"
                />
            )}
        </div>
    );
}

function ChatMessages({ chatMessages }) {
    const chatMessagesRef = React.useRef(null);

    React.useEffect(() => {
        const containerElem = chatMessagesRef.current;
        if (containerElem) {
            containerElem.scrollTop = containerElem.scrollHeight;
        }
    }, [chatMessages]);

    return (
        <div className="chat-messages-container" ref={chatMessagesRef}>
            {chatMessages.map((chatMessage) => {
                return (
                    <ChatMessage
                        message={chatMessage.message}
                        sender={chatMessage.sender}
                        key={chatMessage.id}
                    />
                );
            })}
        </div>
    );
}

function App() {
    const [chatMessages, setChatMessages] = React.useState([
        { message: "hello chatbot", sender: "user", id: "id1" },
        { message: "Hello! how can i help you?", sender: "robot", id: "id2" },
        { message: "can you get me todays date?", sender: "user", id: "id3" },
        { message: "Today is September 27", sender: "robot", id: "id4" },
    ]);

    return (
        <div className="app-container">
            <ChatMessages
                chatMessages={chatMessages}
                setChatMessages={setChatMessages}
            />
            <ChatInput
                chatMessages={chatMessages}
                setChatMessages={setChatMessages}
            />
        </div>
    );
}

const container = document.querySelector(".js-container");
ReactDOM.createRoot(container).render(<App />);
