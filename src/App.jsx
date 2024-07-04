import {useState,useCallback,useEffect,useRef} from "react"

import "./index.css"
 function App() {
 const [length,setLength]=useState(0)
 const [pass,setPass]=useState("")
 const [num,setNum]=useState(false)
 const [char,setChar]=useState(false)
 const passWord_generator=useCallback(()=>{
let pass="";
let Character="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
let number="0123456789"
let specialChar="!@#$%^&*(){}_+-~`"
if(num){
  Character=Character+number;
  console.log(Character)
}

if(char){
  Character=Character+specialChar;
  console.log(Character)
}
if(num&&char){
  Character=Character+number+specialChar;
  console.log(Character)
}
for(let i=1;i<=length;i++){
  let index=Math.floor(Math.random()*Character.length+1)
  pass +=Character.charAt(index);
}
setPass(pass)


 },[length,num,char,setPass])
useEffect(()=>{
passWord_generator()
},[length,char,num,setPass,passWord_generator]) 
 useEffect(()=>{
  passWord_generator()
 },[length,char,num,setPass,passWord_generator])
const ref=useRef(null)

 const copy_text=useCallback(()=>{
  ref.current?.select();

  window.navigator.clipboard.writeText(pass);

 },[pass])

  return (<div className="bg-gray-800 rounded-lg py-5 flex flex-col justify-center items-center px-2 sm:px-10">

    <h1 className="sm:text-3xl sm:mb-2 flex justify-center  text-2xl mb-2 text-white">Password Generator</h1>
    <div className="flex  w-full"><input value={pass} ref={ref} onChange={setPass} className="rounded-l-lg px-2 font-semibold  w-full"></input><button onClick={copy_text} className="bg-blue-500 flex text-center justify-center items-center  text-white font-semibold text-xl px-5 rounded-r-lg">Copy</button></div>
    <div className="sm:flex mt-2 gap-5">
      <div className="flex sm:flex-row flex-col items-center  gap-2"><label form="select" className="text-lg font-semibold text-white">Select range</label><input id="select" type="range" value={length} min={0} max={100} onChange={(e)=>{setLength(e.target.value)}} name="select" step={1}></input> <span className="text-lg font-semibold text-white ">Length   {length}</span></div>
      <div className="flex justify-center"><input id="number" onChange={()=>{setNum((prev)=>!prev)}} name="number" type="checkbox"></input><label form="number" className="text-lg font-semibold text-white">Number</label></div>
      <div className="flex justify-center"><input id="char"  onChange={()=>{setChar((prev)=>!prev)}} name="number" type="checkbox"></input><label form="char" className="text-lg font-semibold text-white">Character</label></div>
    </div>
  </div>)
}

export default App
