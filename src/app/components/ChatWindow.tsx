'use client'

import { Mic, PlusCircle, Search, FilePlus, Send, StopCircle, CornerDownLeft } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  attachment?: {
    type: 'image' | 'file';
    name: string;
    url?: string;
  };
}

interface ChatWindowProps {
  isLoggedIn: boolean;
}

const ChatWindow = ({ isLoggedIn }: ChatWindowProps) => {
  const [inputMessage, setInputMessage] = useState<string>('')
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([])
  const [isThinking, setIsThinking] = useState<boolean>(false)
  const [isVoiceRecording, setIsVoiceRecording] = useState<boolean>(false)
  const chatEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [chatHistory, isThinking, isVoiceRecording])

  useEffect(() => {
    if (isLoggedIn && chatHistory.length === 0) {
      const timer = setTimeout(() => {
        setShowWelcomeMessage(true);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setShowWelcomeMessage(false);
    }
  }, [isLoggedIn, chatHistory.length]);

  const handleSendMessage = (attachment?: ChatMessage['attachment']) => {
    if ((inputMessage.trim() === '' && !attachment) || isThinking || isVoiceRecording) return

    const newUserMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputMessage.trim(),
      timestamp: new Date().toLocaleTimeString(),
      attachment: attachment,
    }

    setChatHistory((prev) => [...prev, newUserMessage])
    setInputMessage('')
    setIsThinking(true)

    const thinkingDuration = 2000
    setTimeout(() => {
      const aiResponseText = generateDummyAIResponse(newUserMessage.text, newUserMessage.attachment);
      const newAiMessage: ChatMessage = {
        id: Date.now().toString() + '-ai',
        sender: 'ai',
        text: aiResponseText,
        timestamp: new Date().toLocaleTimeString(),
      }
      setChatHistory((prev) => [...prev, newAiMessage])
      setIsThinking(false)
    }, thinkingDuration)
  }

  const generateDummyAIResponse = (userText: string, attachment?: ChatMessage['attachment']): string => {
    if (attachment) {
      if (attachment.type === 'image') {
        return `I've received your image "${attachment.name}". What would you like to do with it?`;
      }
      return `I've received your file "${attachment.name}". How can I help you with it?`;
    }

    const lowerText = userText.toLowerCase();
    if (lowerText.includes('hello') || lowerText.includes('hi')) {
      return "Hello there! How can I assist you today?";
    } else if (lowerText.includes('name')) {
      return "I am Wizly, your personal AI assistant, inspired by Gemini.";
    } else if (lowerText.includes('how are you')) {
      return "I'm just a program, but I'm ready to help! How are you doing?";
    } else if (lowerText.includes('next.js')) {
      return "Next.js is a React framework for building full-stack web applications. It enables functionality like server-side rendering and static site generation.";
    } else if (lowerText.includes('weather')) {
      return "I cannot provide real-time weather information, but I can tell you about weather patterns in general if you'd like!";
    } else if (lowerText.includes('features')) {
      return "I can help you with a wide range of topics, generate creative text formats, and even assist with coding queries. Try asking me anything!";
    } else if (lowerText.includes('voice input')) {
        return "You've successfully tested voice input! What else can I do for you?";
    }
    else {
      return "That's an interesting query! Can you please elaborate, or is there something specific you'd like to know?";
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handlePlusClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      console.log('File selected:', file.name, file.type)
      const attachmentType = file.type.startsWith('image/') ? 'image' : 'file';
      const fileUrl = attachmentType === 'image' ? URL.createObjectURL(file) : undefined;

      handleSendMessage({
        type: attachmentType,
        name: file.name,
        url: fileUrl,
      });

      if (fileUrl) {
        setTimeout(() => URL.revokeObjectURL(fileUrl), 5000);
      }
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }

  const handleMicClick = () => {
    if (isThinking) return;

    setIsVoiceRecording(true);
    setInputMessage('Listening...');

    setTimeout(() => {
      setInputMessage('Voice input received: "Tell me about Next.js."');
      setIsVoiceRecording(false);
    }, 3000);
  };

  const handleStopVoiceRecording = () => {
    setIsVoiceRecording(false);
    setInputMessage('');
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Chat Messages Display Area */}
      <div className="flex-grow flex flex-col p-8 overflow-y-auto custom-scrollbar">
        {chatHistory.length === 0 && !isThinking && !isVoiceRecording && showWelcomeMessage ? (
          <div
            className={`flex-grow flex flex-col items-center justify-center px-8
                        transition-opacity duration-500 ease-in-out
                        ${showWelcomeMessage ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          >
            <div className="bg-blue-50 rounded-xl px-6 py-4 max-w-3xl">
              {/* UPDATED TEXT HERE */}
              <p className="text-sm text-center">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-pink-500 font-medium text-lg">
                  The AI Platform for Independent Consultants and Professionals
                </span>
                <br />
                Transforming solo practices into AI-powered firms
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4 max-w-4xl mx-auto w-full">
            {chatHistory.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[70%] p-3 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-blue-500 text-white rounded-br-none'
                      : 'bg-white text-gray-800 rounded-bl-none shadow-md'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  {message.attachment && message.attachment.type === 'image' && message.attachment.url && (
                    <img
                      src={message.attachment.url}
                      alt={message.attachment.name}
                      className="mt-2 rounded-lg max-h-48 w-auto object-contain"
                    />
                  )}
                  {message.attachment && message.attachment.type === 'file' && (
                    <div className="mt-2 text-xs text-gray-500">
                      Attachment: {message.attachment.name}
                    </div>
                  )}
                  <span className="text-xs opacity-75 mt-1 block text-right">
                    {message.timestamp}
                  </span>
                </div>
              </div>
            ))}
            {(isThinking || isVoiceRecording) && (
              <div className="flex justify-start">
                <div className="max-w-[70%] p-3 rounded-lg bg-white text-gray-800 rounded-bl-none shadow-md flex items-center gap-3">
                  {isThinking && <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-blue-500"></div>}
                  {isVoiceRecording && <Mic size={20} className="text-red-500 animate-pulse" />}
                  <p className="text-sm">{isThinking ? 'Just a second...' : 'Listening...'}</p>
                  <button
                    onClick={isThinking ? () => setIsThinking(false) : handleStopVoiceRecording}
                    className="p-1 rounded-full text-gray-500 hover:bg-gray-100 transition-colors"
                    aria-label={isThinking ? "Stop generating" : "Stop recording"}
                  >
                    <StopCircle size={20} />
                  </button>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-6 border-t bg-white">
        <div className="w-full max-w-4xl mx-auto bg-white border border-gray-300 rounded-3xl shadow-sm px-6 py-4 flex items-center gap-4">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/*, application/pdf, .doc, .docx, .txt"
          />
          <button
            onClick={handlePlusClick}
            className="text-gray-500 hover:text-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            disabled={isThinking || isVoiceRecording}
            aria-label="Attach file"
          >
            <PlusCircle size={20} />
          </button>

          <input
            type="text"
            placeholder={isVoiceRecording ? 'Listening...' : 'Ask Wizly'}
            className="flex-1 text-sm text-gray-700 placeholder-gray-400 outline-none bg-transparent"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isThinking || isVoiceRecording}
          />
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1 text-gray-500 text-sm cursor-pointer hover:text-blue-500 transition-colors" style={{ pointerEvents: (isThinking || isVoiceRecording) ? 'none' : 'auto', opacity: (isThinking || isVoiceRecording) ? 0.6 : 1 }}>
              <Search size={16} /> Deep Research
            </span>
            <span className="flex items-center gap-1 text-gray-500 text-sm cursor-pointer hover:text-blue-500 transition-colors" style={{ pointerEvents: (isThinking || isVoiceRecording) ? 'none' : 'auto', opacity: (isThinking || isVoiceRecording) ? 0.6 : 1 }}>
              <FilePlus size={16} /> Canvas
            </span>
          </div>

          {isThinking || isVoiceRecording ? (
            <button
              onClick={isThinking ? () => setIsThinking(false) : handleStopVoiceRecording}
              className="w-10 h-10 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center ml-2 hover:bg-gray-300 transition-colors relative"
              aria-label={isThinking ? "Stop generating" : "Stop recording"}
            >
              {isThinking && <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-blue-500"></div>}
              {isVoiceRecording && <Mic size={20} className="text-red-500 animate-pulse" />}
              <StopCircle size={20} className="absolute text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          ) : inputMessage.trim().length > 0 ? (
            <button
              onClick={() => handleSendMessage()}
              className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center ml-2 hover:bg-blue-700 transition-colors"
              aria-label="Send message"
            >
              <Send size={20} />
            </button>
          ) : (
            <button
              onClick={handleMicClick}
              className="text-gray-500 hover:text-gray-700 transition-colors ml-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              aria-label="Voice input"
            >
              <Mic size={20} />
            </button>
          )}
        </div>
        {!isThinking && !isVoiceRecording && inputMessage.trim().length === 0 && (
          <div className="flex justify-end text-xs text-gray-400 mt-2 pr-2">
            <CornerDownLeft size={12} className="inline-block mr-1" /> Press Enter to send
          </div>
        )}
      </div>
    </div>
  )
}

export default ChatWindow