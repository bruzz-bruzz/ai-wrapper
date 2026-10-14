import './App.css'
import Markdown from 'react-markdown'
type Data = {
    text:string,
    mode:string
}
export default function ResponseCard({text,mode}:Data){
    return (
        <div>
            <div className={`p-2 ${mode === 'light' ? 'bg-gray-100 text-gray-900' : 'bg-gray-900 text-gray-100'}`}>
                <Markdown>{text}</Markdown>
            </div>
        </div>
    )
}