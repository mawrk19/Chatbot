function ChatBox() {
  return (
    //create a chat box with a text area and a send button
    <div className="flex flex-col gap-4 w-full h-full bg-white rounded-lg shadow-lg p-4 text-bl-400">
        <div className="flex flex-col gap-2 h-full overflow-y-auto"></div>
        <div className="flex items-center gap-2">
            <input type="text" placeholder="Type a message..." className="border border-gray-300 rounded-lg p-2 w-full" />
            <button className="bg-blue-500 text-white rounded-lg p-2">Send</button>
        </div>
    </div>
  );
}

export default ChatBox;