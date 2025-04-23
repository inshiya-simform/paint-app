import { useState } from "react"
import { CANVAS_SIZE } from "../../Constants/Constants"
import styles from './Canvas.module.css'

interface CanvasProp{
    isDraw:boolean,
    color:string
}
const Canvas = ({isDraw,color}:CanvasProp) => {
  const [isMouseOverActive,setIsMouseOverActive] = useState(false)
    function generateCanvasGrid():string[][]{
        const initialCanvas = []
        for(let i=0;i<CANVAS_SIZE;i++){
            const row =[]
            for(let j=0;j<CANVAS_SIZE;j++){
                row.push('#ffffff')
            }
            initialCanvas.push(row)
        }
        return initialCanvas
    }
   const [canvas,setCanvas] = useState(generateCanvasGrid())
   function handlePaint(e:React.MouseEvent<HTMLButtonElement>,rowIndex:number,colIndex:number){
    if(!isMouseOverActive){
      return;
    }
    if(e.target instanceof HTMLButtonElement){
      if(isDraw){
        setCanvas((prevCanvas)=>{
          const newCanvas = prevCanvas.map((row)=>[...row])
          newCanvas[rowIndex][colIndex] = color
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
  function handleMouseDown(){
    setIsMouseOverActive(()=>true)
  }
  function handleMouseUp(){
    setIsMouseOverActive(()=>false)
  }
  return (
    <div className={styles.grid} id="grid">
      {canvas.map((row,rowIndex)=>(
        <div className={styles.cell} key={rowIndex}>
        {
            row.map((cell,colIndex)=>(
                <button key={colIndex} style={{backgroundColor: cell}} onMouseOver={(e)=>handlePaint(e,rowIndex,colIndex)} onMouseUp={handleMouseUp} onMouseDown={handleMouseDown}>{cell ? undefined : undefined}</button>
            ))
        }
        </div>
      ))}
    </div>
  )
}

export default Canvas
