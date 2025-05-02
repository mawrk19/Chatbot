function ChatBox() {
  return (
    <div className="chat-box border rounded-lg shadow-lg p-4 bg-white w-full max-w-md text-black">
      <div className="chat-header">Chat</div>
      <div className="chat-messages">
        <div className="message">Hello!</div>
        <div className="message">How are you?</div>
      </div>
      <input type="text" placeholder="Type a message..." />
    </div>
  );
}

export default ChatBox;