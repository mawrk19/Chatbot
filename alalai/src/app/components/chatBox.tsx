'use client';

import { useEffect, useRef, useState } from 'react';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export default function ChatBox() {
  const [input, setInput] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const submit = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    const res = await fetch('/api', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: [...messages, userMessage] }),
    });

    const data = await res.json();
    const botMessage = data.choices?.[0]?.message;

    if (botMessage) {
      setMessages((prev) => [...prev, botMessage]);
    }
  };

  const generate = async () => {
    if (!input.trim() || !imageURL.trim()) return;

    const userMessage: Message = {
      role: 'user',
      content: `Analyzing image: ${imageURL}\nQuestion: ${input}`,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setImageURL('');

    const res = await fetch('/api/image', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: [
          { type: 'text', text: input },
          { type: 'image_url', image_url: { url: imageURL } },
        ],
      }),
    });

    const data = await res.json();
    const botMessage = data.choices?.[0]?.message;

    if (botMessage) {
      setMessages((prev) => [...prev, botMessage]);
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full h-full bg-white rounded-lg shadow-lg p-4 text-black">
      <div className="flex flex-col gap-2 h-full overflow-y-auto max-h-96">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 rounded max-w-[75%] ${
              msg.role === 'user' ? 'bg-blue-100 self-end' : 'bg-gray-100 self-start'
            }`}
          >
            <strong>{msg.role === 'user' ? 'You' : 'Bot'}:</strong> {msg.content}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex flex-col gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question about the image..."
          className="border border-gray-300 rounded-lg p-2 w-full"
          onKeyDown={(e) => {
            if (e.key === 'Enter') submit();
          }}
        />
        <input
          type="text"
          value={imageURL}
          onChange={(e) => setImageURL(e.target.value)}
          placeholder="Paste an image URL for analysis..."
          className="border border-gray-300 rounded-lg p-2 w-full"
        />
        <div className="flex gap-2">
          <button
            onClick={submit}
            className="bg-blue-500 text-white rounded-lg p-2 hover:bg-blue-600"
          >
            Send
          </button>
          <button
            onClick={generate}
            className="bg-blue-500 text-white rounded-lg p-2 hover:bg-blue-600"
          >
            Analyze Image
          </button>
        </div>
      </div>
    </div>
  );
}
