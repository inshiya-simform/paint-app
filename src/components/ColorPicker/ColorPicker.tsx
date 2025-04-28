import { ChangeEvent } from 'react'
import ColorPickerInput from './ColorPickerInput/ColorPickerInput'
import styles from './ColorPickerInput/ColorPicker.module.css'
import { COLOR } from '../../Constants/Constants'

export type InputFunc = (e: ChangeEvent<HTMLInputElement>,color:number)=>void
interface ColorPickerProp {
    color1:string,
    color2:string,
    pickColor: InputFunc,
}

const ColorPicker = ({color1,color2,pickColor}:ColorPickerProp) => {
  return (
    <div className={styles.pickerSection}>
      <ColorPickerInput color={color1} pickColor={(e)=>pickColor(e,COLOR.PRIMARY)}/>
      <ColorPickerInput color={color2} pickColor={(e)=>pickColor(e,COLOR.SECONDARY)}/>
    </div>
  )
}

export default ColorPicker
