import { useCallback, useEffect, useRef, useState } from 'react'


function App() {
  const[length,setLength] = useState(9)
  const[numberAllowed,setNumberAllowed] = useState(false);
  const[charAllowed,setCharAllowed]=useState(false);
  const[password,setPassword]=useState("")
  const passwordRef=useRef(null)
  const passwordGenerator= useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed){
      str+="01234567890"
    }
    if(charAllowed){
      str+="~`!@#$%^&*()_-+={}[]|\"':;><.,/?"
    }
    for(let i=1;i<=length;i++){
      let char = Math.floor(Math.random()*str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)
  },[length,numberAllowed,charAllowed,setPassword])
  
  const copyPass=useCallback(()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  },[password])
  
  useEffect(()=>{
    passwordGenerator();
  },[length,charAllowed,numberAllowed,passwordGenerator]);
  return (
    <>
      <div
        className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center"
        style={{ backgroundImage: 'url(https://images.playground.com/689a6d151c694996b35b5e367846c6a3.jpeg)' }}
      >
        <div className="w-full max-w-md mx-auto shadow-lg rounded-lg px-6 py-8 text-2xl text-white text-center bg-gray-800 bg-opacity-90">
          <h1 className="text-lg md:text-2xl lg:text-3xl mb-4 font-bold">Password Generator</h1>
          <div className="w-full flex shadow rounded-lg overflow-hidden mb-4 bg-white">
            <input
              type="text"
              value={password}
              className="outline-none w-full py-2 px-3 text-sm md:text-base lg:text-lg text-gray-900 bg-gray-200"
              placeholder="password"
              readOnly
              ref={passwordRef}
            />
            <button
              onClick={copyPass}
              className="outline-none bg-blue-500 text-white px-4 py-1 shrink-0 hover:bg-blue-600 transition-colors duration-200 text-sm md:text-base lg:text-lg"
            >
              Copy
            </button>
          </div>
          <div className="w-full flex flex-col md:flex-row text-sm gap-x-2">
            <div className="flex items-center gap-x-1 mb-2 md:mb-0">
              <input
                type="range"
                min={3}
                max={100}
                value={length}
                className="cursor-pointer"
                onChange={(e) => setLength(e.target.value)}
              />
              <label className="ml-2">Length: {length}</label>
            </div>
            <div className="flex items-center gap-x-1 mb-2 md:mb-0">
              <input
                type="checkbox"
                defaultChecked={numberAllowed}
                id="numberinput"
                onChange={(e) => setNumberAllowed((prev) => !prev)}
              />
              <label className="ml-2">Numbers</label>
            </div>
            <div className="flex items-center gap-x-1">
              <input
                type="checkbox"
                defaultChecked={charAllowed}
                id="characterinput"
                onChange={(e) => setCharAllowed((prev) => !prev)}
              />
              <label className="ml-2">Characters</label>
            </div>
          </div>
        </div>
        <div className="fixed bottom-4 right-4">
          <a
            href="https://github.com/odk1572"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center px-4 py-2 text-white bg-gray-800 rounded-full hover:bg-gray-700 transition-colors duration-200"
          >
            GitHub Profile
          </a>
        </div>
      </div>
    </>
  );
  
}

export default App
