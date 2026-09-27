import { useState } from 'react'
import { 
  Send, Plus, Bot, Smile, User
} from 'lucide-react'

function App() {
  const [messages] = useState([
    { id: 1, text: "Welcome! I'm your AI assistant. How can I help you today?", sender: 'bot', time: '10:00 AM' },
    { id: 2, text: "Can you help me design a modern dashboard?", sender: 'user', time: '10:01 AM' },
    { id: 3, text: "I'd love to! We should start with a clean color palette and a consistent grid system.", sender: 'bot', time: '10:02 AM' },
  ])

  return (
    <div className="flex h-screen bg-slate-50 font-sans antialiased text-slate-900 overflow-hidden justify-center">
      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col max-w-4xl w-full bg-white shadow-2xl shadow-slate-200">
        <header className="h-20 flex items-center justify-between px-8 border-b border-slate-100 sticky top-0 z-10 bg-white/80 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
              <Bot size={24} className="text-white" />
            </div>
            <div>
              <h2 className="font-bold text-slate-800 text-base leading-tight">AI Assistant</h2>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <p className="text-[11px] text-green-600 font-bold uppercase tracking-wider">Online</p>
              </div>
            </div>
          </div>
        </header>

        <section className="flex-1 overflow-y-auto p-8 space-y-8 scroll-smooth">
          {messages.map((m) => (
            <div key={m.id} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex gap-4 max-w-[80%] ${m.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-1 shadow-sm ${m.sender === 'user' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-indigo-600'}`}>
                  {m.sender === 'user' ? <User size={16} /> : <Bot size={16} />}
                </div>
                <div className="space-y-1.5">
                  <div className={`p-4 rounded-2xl text-[15px] leading-relaxed shadow-sm ${
                    m.sender === 'user' 
                      ? 'bg-indigo-600 text-white rounded-tr-none shadow-indigo-100' 
                      : 'bg-slate-100 text-slate-700 rounded-tl-none'
                  }`}>
                    {m.text}
                  </div>
                  <p className={`text-[10px] text-slate-400 font-medium ${m.sender === 'user' ? 'text-right' : 'text-left'}`}>
                    {m.time}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </section>

        <footer className="p-6 border-t border-slate-100 bg-white">
          <div className="max-w-3xl mx-auto relative group">
            <div className="relative bg-slate-50 border border-slate-200 rounded-2xl p-2.5 flex items-center gap-3 focus-within:border-indigo-300 focus-within:ring-4 focus-within:ring-indigo-500/5 transition-all shadow-sm">
              <button className="p-2 text-slate-400 hover:text-indigo-500 transition-colors">
                <Plus size={22} />
              </button>
              <input 
                placeholder="Message AI Assistant..." 
                className="flex-1 bg-transparent border-none focus:ring-0 text-[15px] py-2 outline-none text-slate-700 placeholder:text-slate-400" 
              />
              <div className="flex items-center gap-1.5 pr-1">
                <button className="p-2 text-slate-400 hover:text-indigo-500 transition-colors">
                  <Smile size={22} />
                </button>
                <button className="p-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 shadow-md shadow-indigo-100 active:scale-95 transition-all">
                  <Send size={18} />
                </button>
              </div>
            </div>
          </div>
          <p className="text-center text-[11px] text-slate-400 mt-4 font-medium">
            AI can make mistakes. Check important info.
          </p>
        </footer>
      </main>
    </div>
  )
}

export default App

