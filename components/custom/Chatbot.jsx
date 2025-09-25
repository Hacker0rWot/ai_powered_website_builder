import React, { useState, useRef, useEffect } from 'react';

const BOT_NAME = 'AI Bot';

const defaultWelcome = [
  { sender: BOT_NAME, text: 'Hello! How can I help you today?' }
];

export default function Chatbot() {
  const [messages, setMessages] = useState(defaultWelcome);
  const [input, setInput] = useState('');
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const faqs = [
    { q: /pricing|cost|price/i, a: 'Our service has a free tier and premium plans. Visit the Pricing page for details.' },
    { q: /features|what can you do/i, a: 'I can help you generate websites, code, and answer questions about the platform.' },
    { q: /contact|support/i, a: 'You can reach support via the Contact page or email us at support@example.com.' },
    { q: /reset|clear/i, a: 'To reset the chat, simply refresh the page.' },
    { q: /ai|bot/i, a: 'I am an AI-powered assistant here to help you with your website and code needs!' },
  ];

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { sender: 'You', text: input };
    setMessages((msgs) => [...msgs, userMsg]);
    setTimeout(() => {
      let botReply = '';
      if (/hello|hi|hey|good morning|good afternoon|good evening/i.test(input)) {
        botReply = 'Hello! 👋 How can I assist you today?';
      } else if (/help|support/i.test(input)) {
        botReply = 'How can I assist you? You can ask about features, pricing, or how to use the platform.';
      } else {
        // Check FAQ patterns
        const faq = faqs.find(f => f.q.test(input));
        if (faq) {
          botReply = faq.a;
        } else {
          botReply = 'I am just a simple bot. You said: ' + input;
        }
      }
      setMessages((msgs) => [...msgs, { sender: BOT_NAME, text: botReply }]);
    }, 600);
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 w-80 max-w-full bg-gray-900/90 rounded-2xl shadow-2xl border-2 border-cyan-400/30 z-50 flex flex-col overflow-hidden">
      <div className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 p-4 text-cyan-200 font-bold text-lg">Chatbot</div>
      <div className="flex-1 p-4 space-y-2 overflow-y-auto h-64 custom-scrollbar">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.sender === 'You' ? 'justify-end' : 'justify-start'}`}>
            <div className={`rounded-xl px-4 py-2 max-w-[80%] text-sm font-mono shadow-md ${msg.sender === 'You' ? 'bg-cyan-500/80 text-white' : 'bg-gray-800/80 text-cyan-200'}`}>
              <span className="block font-semibold mb-1">{msg.sender}</span>
              <span>{msg.text}</span>
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
      <div className="p-3 bg-gray-800/80 flex gap-2">
        <textarea
          className="flex-1 rounded-lg p-2 bg-gray-900/80 text-cyan-100 border-2 border-cyan-400/20 focus:border-cyan-400/60 outline-none resize-none h-10 font-mono"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
        />
        <button
          onClick={handleSend}
          className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold px-4 py-2 rounded-lg transition-all duration-200 shadow-cyan-400/20 shadow-md"
        >
          Send
        </button>
      </div>
    </div>
  );
}
