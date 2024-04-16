import React from "react";
import { useState, useEffect } from "react";

function Room({ username }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const newWs = new WebSocket("ws://localhost:3333");
    setWs(newWs);

    newWs.onopen = () => {
      console.log("Connected to WebSocket server");
    };

    newWs.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages([...messages, message]);
    };

    return () => {
      newWs.close();
    };
  }, [messages]);

  const sendMessage = () => {
    const message = { from: username, text: input };
    ws.send(JSON.stringify(message));
    setInput("");
  };
  return (
    <div className="chatRoom-container">
      <div>
        {messages.map((message, index) => (
          <div key={index}>
            <strong>{message.from}: </strong>
            {message.text}
          </div>
        ))}
        <input
          className="chatRoom-input"
          type="text"
          placeholder="Ready to chat..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="btn" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}

export default Room;
