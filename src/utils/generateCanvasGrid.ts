import { CANVAS_SIZE } from "../Constants/Constants"

export function generateCanvasGrid(color?:string):string[][]{
    const initialCanvas = []
    for(let i=0;i<CANVAS_SIZE;i++){
      const row =[]
      for(let j=0;j<CANVAS_SIZE;j++){
        if(color) row.push(color)
        else row.push('#ffffff')
      }
      initialCanvas.push(row)
    }
    return initialCanvas
  }