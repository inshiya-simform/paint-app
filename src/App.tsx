import './App.css'
import ButtonPanel from './components/ButtonPanel/ButtonPanel'
import Canvas from './components/Canvas/Canvas'
import ColorPicker from './components/ColorPicker/ColorPicker'
import Header from './components/Header/Header'
import { ChangeEvent, useState } from 'react'
import { generateCanvasGrid } from './utils/generateCanvasGrid'
import { COLOR } from './Constants/Constants'

function App() {
  const [color1,setColor1] = useState('#000000')
  const [color2,setColor2] = useState('#000000')
  const [isDraw,setIsDraw] = useState(true)
  const [canvas,setCanvas] = useState(generateCanvasGrid())
  const [mouseClick,setMouseclick] = useState<1|2|null>(null)

   function handlePaint(e:React.MouseEvent<HTMLButtonElement>,rowIndex:number,colIndex:number){
    if(!mouseClick){
      return;
    }
    if(e.target instanceof HTMLButtonElement){
      if(isDraw){
        setCanvas((prevCanvas)=>{
          const newCanvas = prevCanvas.map((row)=>[...row])
          newCanvas[rowIndex][colIndex] = mouseClick === 1 ? color1 : color2
          return newCanvas
        })
      }else{
        setCanvas((prevCanvas)=>{
          const newCanvas = prevCanvas.map((row)=>[...row])
          newCanvas[rowIndex][colIndex] = '#ffffff'
          return newCanvas
        })
      }
    }
  }
  function handleMouseDown(e:React.MouseEvent<HTMLButtonElement>){
    if(e.button === 2){
      setMouseclick(()=>2)
    }else{
      setMouseclick(()=>1)
    }
  }
  function handleMouseUp(){
    setMouseclick(()=>null)
  }
  function handleDraw(){
    setIsDraw(()=>true)
  }
  function handleErase(){
    setIsDraw(()=>false)
  }
  function pickColor(e:ChangeEvent<HTMLInputElement>,color:number){
    if (color === COLOR.PRIMARY){
      setColor1(()=> e.target.value)
    }else{
      setColor2(()=> e.target.value)
    }
  }
  function handleEraseAll(){
    setCanvas(()=>generateCanvasGrid())
  }
  function handleFill(){
    setCanvas(()=>generateCanvasGrid(color1))
  }
  return (
    <>
      <Header/>
      <Canvas canvas={canvas} handlePaint={handlePaint} handleMouseDown={handleMouseDown} handleMouseUp={handleMouseUp}/>
      <ColorPicker color1={color1} color2={color2} pickColor={pickColor}/>
      <ButtonPanel handleDraw={handleDraw} handleErase={handleErase} isDraw={isDraw} handleEraseAll={handleEraseAll} handleFill={handleFill}/>
    </>
  )
}

export default App
