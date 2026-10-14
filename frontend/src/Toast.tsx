import './App.css'
type Data = {
    msg:string,
    ok:boolean,
    mode:string
}
export default function Toast({msg,ok,mode}:Data){
    return (
        <div className={`absolute bottom-5 right-5 border border-black rounded-lg p-2 ${ok === true ? 'bg-green-100':'bg-red-100'} ${mode === 'light' ? 'text-black' : 'text-gray-900'}`}>
            {msg}
        </div>
    )
}