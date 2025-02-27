"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Chat() {
  const [chatStarted, setChatStarted] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    if (!chatStarted) setChatStarted(true);
    setMessages([...messages, { role: "user", content: input }]);
    setInput("");
  };

  const handleCardClick = (text) => {
    if (!chatStarted) setChatStarted(true);
    setMessages([...messages, { role: "user", content: text }]);
  };

  return (
    <div className="bg-white min-h-screen text-black flex flex-col items-center p-6">
      <AnimatePresence>
        {!chatStarted && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="pt-32 HelveticaN text-8xl font-bold text-center"
          >
            <div className="mr-72">Doctor</div>
            <div className="ml-72">[-&gt;]Bot</div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {!chatStarted && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="HelveticaN grid grid-cols-2 gap-4 mt-10 text-left tracking-tighter"
          >
            {["What’s the benefits of a carnivore diet", "How to reduce blood pressure", "How to live with diabetes", "HIV and Aid awareness"].map((text, index) => (
              <button
                key={index}
                className="w-[215px] p-2 border border-[#E8E9ED] rounded-xl text-[#C5C5C7] text-xl font-extralight hover:bg-gray-100 transition"
                onClick={() => handleCardClick(text)}
              >
                {text}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="mt-6 w-full max-w-2xl space-y-2">
        {messages.map((msg, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`p-3 rounded-lg max-w-[70%] relative ${
              msg.role === "user" 
                ? "bg-[#0078FF] text-white self-end" 
                : "bg-gray-200 text-black self-start"
            }`}
          >
            {msg.content}
            <div
              className={`absolute bottom-[-5px] w-3 h-3 ${
                msg.role === "user" ? "bg-[#0078FF] right-1 rotate-45" : "bg-gray-200 left-1 rotate-45"
              }`}
            />
          </motion.div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-2xl mt-6 flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="What are your health concerns..."
          className="flex-grow p-4 border border-[#E8E9ED] rounded-2xl text-[#C5C5C7] text-xl font-extralight outline-none"
        />
      </form>
    </div>
  );
}
