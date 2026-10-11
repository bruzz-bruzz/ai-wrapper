import './App.css'
import {useCookies} from 'react-cookie'
import axios from 'axios'
import {useState,useEffect} from 'react'
export default function App(){
  type Toast = {
    msg:string,
    ok:boolean
  }
  const [prompt,setPrompt] = useState("")
  const [cookies,setCookie] = useCookies("")
  const [response,setResponse] = useState("")
  const [mode,setMode] = useState('')
  const [toast,setToast] = useState<Toast>({msg:"",ok:false})
  function loadMode(){
    if(cookies?.mode === undefined){
      setCookie('mode','light')
      setMode("light")
    } else {
      setMode(cookies?.mode)
    }
  }
  function clearToast(){
    setTimeout(()=>{
      setToast({msg:"",ok:false})
    },3000)
  }
  async function getResponse(){
    if(prompt.length > 0){
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}`,{
        prompt:prompt
      })
      setResponse(res.data)
    } else{
      setToast({msg:"Write a prompt!",ok:false})
    }
    clearToast()
  }
  useEffect(()=>{
    loadMode()
  },[])
  return (
    <div>
      <div className='flex flex-col items-center justify-center h-screen'>
        <h2>AI ChatBot</h2>
        <button></button>
        {response.length === 0 && (
          <div>
            <h3>Let's get started!</h3>
          </div>
        )}
        {response.length > 0 && (
          <div>
            
          </div>
        )}
        <div>
          <input type='text' className='border border-black rounded-lg' value={prompt} onChange={(e)=>setPrompt(e.target.value)} />
        </div>
      </div>
    </div>
  )
}