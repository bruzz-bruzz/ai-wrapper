import { useState } from 'react'
import { 
  Send, Plus, MessageSquare, Settings, User, Bot, MoreVertical, Search, Image, Paperclip, Smile
} from 'lucide-react'

function App() {
  const [messages] = useState([
    { id: 1, text: "Welcome! I'm your AI assistant. How can I help you today?", sender: 'bot', time: '10:00 AM' },
    { id: 2, text: "Can you help me design a modern dashboard?", sender: 'user', time: '10:01 AM' },
    { id: 3, text: "I'd love to! We should start with a clean color palette and a consistent grid system.", sender: 'bot', time: '10:02 AM' },
  ])

  return (
    <div className="flex h-screen bg-slate-50 font-sans antialiased text-slate-900 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-slate-200 flex flex-col hidden md:flex">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">AI Chat</h1>
            <button className="p-2 bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors"><Plus size={18} /></button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input type="text" placeholder="Search..." className="w-full pl-10 pr-4 py-2 bg-slate-100 border-none rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-2">
          <p className="px-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Recent</p>
          {['Dashboard Design', 'React Perf', 'Tailwind Tips'].map((title, i) => (
            <button key={i} className={`w-full flex items-center gap-3 p-3 rounded-2xl transition-all ${i === 0 ? 'bg-indigo-50 text-indigo-700' : 'hover:bg-slate-50 text-slate-600'}`}>
              <div className={`p-2 rounded-xl ${i === 0 ? 'bg-indigo-100' : 'bg-slate-100'}`}><MessageSquare size={16} /></div>
              <div className="text-left overflow-hidden"><p className="text-sm font-semibold truncate">{title}</p></div>
            </button>
          ))}
        </div>
        <div className="p-4 border-t border-slate-100 space-y-1">
          <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 text-slate-600 text-sm font-medium"><Settings size={18} /> Settings</button>
          <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 text-slate-600 text-sm font-medium"><User size={18} /> Profile</button>
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-white">
        <header className="h-16 flex items-center justify-between px-6 border-b border-slate-100 sticky top-0 z-10 bg-white/80 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200"><Bot size={20} className="text-white" /></div>
            <div><h2 className="font-bold text-slate-800 text-sm">AI Assistant</h2><p className="text-[10px] text-green-500 font-bold">ONLINE</p></div>
          </div>
          <div className="flex gap-1">
            <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-400"><Search size={18} /></button>
            <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-400"><MoreVertical size={18} /></button>
          </div>
        </header>

        <section className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((m) => (
            <div key={m.id} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex gap-3 max-w-[85%] ${m.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${m.sender === 'user' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-indigo-600'}`}>
                  {m.sender === 'user' ? <User size={14} /> : <Bot size={14} />}
                </div>
                <div className={`p-4 rounded-2xl text-sm ${m.sender === 'user' ? 'bg-indigo-600 text-white rounded-tr-none shadow-md shadow-indigo-100' : 'bg-slate-100 text-slate-700 rounded-tl-none'}`}>
                  {m.text}
                </div>
              </div>
            </div>
          ))}
        </section>

        <footer className="p-4 border-t border-slate-100">
          <div className="max-w-4xl mx-auto relative group">
            <div className="relative bg-slate-50 border border-slate-200 rounded-2xl p-2 flex items-center gap-2 focus-within:border-indigo-300 focus-within:ring-4 focus-within:ring-indigo-500/5 transition-all">
              <button className="p-2 text-slate-400 hover:text-indigo-500"><Plus size={20} /></button>
              <input placeholder="Type your message..." className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-2 outline-none" />
              <div className="flex items-center gap-1">
                <button className="p-2 text-slate-400 hover:text-indigo-500"><Smile size={20} /></button>
                <button className="p-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 shadow-md shadow-indigo-100"><Send size={16} /></button>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}

export default App

