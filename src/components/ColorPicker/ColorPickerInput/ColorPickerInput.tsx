import styles from './ColorPicker.module.css'
import { ChangeEvent } from 'react'
import { InputFunc } from "../ColorPicker"

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
interface ColorPickerInputProp {
    color:string,
    pickColor: InputFunc
}
const ColorPickerInput = ({color,pickColor}:ColorPickerInputProp) => {
    const throttled = throttledOnChange(pickColor,50000)
  return (
    <div>
      <p>Color: {color}</p>
      <input className={styles.colorPicker} value={color} onChange={(e)=>throttled(e)} type='color'/>
    </div>
  )
}

export default ColorPickerInput
