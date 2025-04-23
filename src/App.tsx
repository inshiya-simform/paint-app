import './App.css'
import ButtonPanel from './components/ButtonPanel/ButtonPanel'
import Canvas from './components/Canvas/Canvas'
import ColorPicker from './components/ColorPicker/ColorPicker'
import Header from './components/Header/Header'
import { ChangeEvent, useState } from 'react'

function App() {
  const [color,setColor] = useState('#000000')
  const [isDraw,setIsDraw] = useState(true)
  function handleDraw(){
    setIsDraw(()=>true)
  }
  function handleErase(){
    setIsDraw(()=>false)
  }
  function pickColor(e:ChangeEvent<HTMLInputElement>){
    console.log("called")
      setColor(()=> e.target.value) 
  }
  
  return (
    <>
      <Header/>
      <Canvas color={color} isDraw={isDraw}/>
      <ColorPicker color={color} pickColor={pickColor}/>
      <ButtonPanel handleDraw={handleDraw} handleErase={handleErase} isDraw={isDraw}/>
    </>
  )
}

export default App
