import styles from './ColorPicker.module.css'
import { ChangeEvent, useMemo } from 'react'
import { InputFunc } from "../ColorPicker"
import { COLOR, PRIMARY } from '../../../Constants/Constants';

function throttledOnChange (func:InputFunc,delay:number){
    let isRunning:boolean = false;
    return function(e:ChangeEvent<HTMLInputElement>,color:number){
      if(!isRunning){
        isRunning = true
        func(e,color)
        setTimeout(()=>{
          isRunning = false
        },delay)
      }
    }
  }
interface ColorPickerInputProp {
    color:string,
    pickColor: InputFunc,
    type: "primary" | "secondary"
}
const ColorPickerInput = ({color,pickColor,type}:ColorPickerInputProp) => {
    const throttled = useMemo(()=>throttledOnChange(pickColor,1000),[pickColor])
  return (
    <div>
      <span>{type} color: </span>
      {
        type === PRIMARY ? (
          
          <input className={styles.colorPicker} value={color} onChange={(e)=>throttled(e,COLOR.PRIMARY)} type='color'/>
        ) :
        (
          <input className={styles.colorPicker} value={color} onChange={(e)=>throttled(e,COLOR.SECONDARY)} type='color'/>
        )
      }
    </div>
  )
}

export default ColorPickerInput
