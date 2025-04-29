import styles from './Canvas.module.css'

interface CanvasProp{
    canvas: string[][],
    handlePaint: (e: React.MouseEvent<HTMLButtonElement>, rowIndex: number, colIndex: number)=> void,
    handleMouseUp: ()=>void,
    handleMouseDown: (e:React.MouseEvent<HTMLButtonElement>,rowIndex:number, colIndex:number)=>void,
}

const Canvas = ({canvas,handlePaint,handleMouseUp, handleMouseDown}:CanvasProp) => {
  
  return (
    <div className={styles.grid} id="grid" onContextMenu={(e)=>e.preventDefault()}>
      {canvas.map((row,rowIndex)=>(
        <div className={styles.cell} key={rowIndex}>
        {
            row.map((cell,colIndex)=>(
                <button key={colIndex} style={{backgroundColor: cell}} onMouseOver={(e)=>handlePaint(e,rowIndex,colIndex)} onContextMenu={(e)=>e.preventDefault()} onMouseUp={handleMouseUp} onMouseDown={(e)=>handleMouseDown(e,rowIndex,colIndex)}>{cell ? undefined : undefined}</button>
            ))
        }
        </div>
      ))}
    </div>
  )
}

export default Canvas
