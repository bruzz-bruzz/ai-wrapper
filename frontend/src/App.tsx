import './App.css'
import {useCookies} from 'react-cookie'
import axios from 'axios'
import sendSVG from './assets/send.svg'
import Toast from './Toast'
import Github from './Github'
import ResponseCard from './ResponseCard'
import {useState,useEffect} from 'react'
export default function App(){
  type Toast = {
    msg:string,
    ok:boolean
  }
  const [prompt,setPrompt] = useState("")
  const [cookies,setCookie] = useCookies(['user'])
  const [mode,setMode] = useState('')
  const [toast,setToast] = useState<Toast>({msg:"",ok:false})
  const [aiHistory,setAIHistory] = useState<string[]|never[]>([])
  const [userHistory,setUserHistory] =  useState<string[]|never[]>([])
  function loadMode(){
    setMode(cookies?.user || 'light')
  }
  function clearToast(){
    setTimeout(()=>{
      setToast({msg:"",ok:false})
    },3000)
  }
  async function getResponse() {
    if (prompt.length > 0) {
      const userPrompt = prompt;
      setUserHistory((h) => [...h, 'User: ' + userPrompt]);
      setPrompt("");
      console.log(userPrompt);
      try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}`, {
          prompt: userPrompt
        });
        setAIHistory((h) => [...h, "AI: " + response.data]);
      } catch (error: any) {
        console.error(error);
        setAIHistory((h) => [...h, "AI: " + 'An error occurred.']);
        setToast({ msg: error.response?.data?.message || "An error occurred", ok: false });
      }
    } else {
      setToast({ msg: "Write a prompt!", ok: false });
    }
    clearToast();
  }
  useEffect(()=>{
    loadMode()
  },[])
  return (
    <div className={`h-screen flex flex-col ${mode === 'light' ? 'bg-gray-100 text-gray-900' : 'bg-gray-900 text-gray-100'}`}>
      {/* Header */}
      <header className="p-4 border-b border-gray-300">
        <h2 className="text-xl font-bold">AI ChatBot</h2>
        <h5>Powered by Gemini</h5>
        <button className='absolute right-5 top-5 hover:cursor-pointer' onClick={()=>{
          setMode((m)=>{
            let curr = m
            if(curr === 'light'){
              setCookie('user','dark')
              return 'dark'
            } else {
              setCookie("user",'light')
                return 'light'
            }
          })
        }}>{mode === 'light' ? 'Light' : "Dark"}</button>
      </header>

      {/* Chat History */}
      <main className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
        {userHistory.length === 0 && (
          <div className="flex items-center justify-center h-full">
            <h3 className="text-lg text-gray-500">Let's get started!</h3>
          </div>
        )}
        {userHistory.map((val, idx) => (
          <div key={idx}>
            <ResponseCard key={'User' + String(idx)} mode={mode} text={val} />
            <ResponseCard key={'AI' + String(idx)} mode={mode} text={idx < aiHistory.length ? aiHistory[idx] : '...'} />
          </div>
        ))}
      </main>

      {/* Input Area */}
      <footer className="p-4 border-t border-gray-300 ">
        <div className="flex gap-2 max-w-4xl mx-auto">
          <textarea  
            onKeyDown={(e)=>{
              if(e.key === 'Enter'){
                getResponse()
                setPrompt("")
              }
            }}
            rows={2} 
            className='flex-1 resize-none p-2 border border-gray-300 rounded-lg focus:outline-none' 
            value={prompt} 
            onChange={(e)=>setPrompt(e.target.value)}
            placeholder="Type your message..."
          />
          <button 
            onClick={getResponse} 
            title='Send prompt' 
            className='bg-gray-500 hover:bg-gray-600 text-white rounded-lg px-4 py-2 cursor-pointer transition-colors'
          >
            <img src={sendSVG} alt="Send" className="w-6 h-6" />
          </button>
        </div>
      </footer>
      {toast.msg.length > 0 && (
        <Toast msg={toast.msg} ok={toast.ok} mode={mode}/>
      )}
      <Github repoURL={'https://github.com/bruzz-bruzz/ai-wrapper'} profileURL={"https://github.com/bruzz-bruzz"} />
    </div>
  )}