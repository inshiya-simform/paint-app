import { ChangeEvent } from 'react'
import styles from './ColorPicker.module.css'

type InputFunc = (e: ChangeEvent<HTMLInputElement>)=>void
interface ColorPickerProp {
    color:string,
    pickColor: InputFunc
}
function throttledOnChange (func:InputFunc,delay:number){
  let isRunning:boolean = false;
  return function(e:ChangeEvent<HTMLInputElement>){
    if(!isRunning){
      isRunning = true
      func(e)
      setTimeout(()=>{
        isRunning = false
      },delay)
    }
  }
}
const ColorPicker = ({color,pickColor}:ColorPickerProp) => {
  const throttled = throttledOnChange(pickColor,50000)
  return (
    <div>
      <p>Color: {color}</p>
      <input className={styles.colorPicker} value={color} onChange={(e)=>throttled(e)} type='color'/>
    </div>
  )
}

export default ColorPicker
