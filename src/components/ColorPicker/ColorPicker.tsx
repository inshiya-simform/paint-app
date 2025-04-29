import { ChangeEvent} from 'react'
import ColorPickerInput from './ColorPickerInput/ColorPickerInput'
import styles from './ColorPickerInput/ColorPicker.module.css'
import { PRIMARY, SECONDARY } from '../../Constants/Constants'

export type InputFunc = (e: ChangeEvent<HTMLInputElement>,color:number)=>void
interface ColorPickerProp {
    color1:string,
    color2:string,
    pickColor: InputFunc,
}

const ColorPicker = ({color1,color2,pickColor}:ColorPickerProp) => {
  return (
    <div className={styles.pickerSection}>
      <ColorPickerInput type={PRIMARY} color={color1} pickColor={pickColor}/>
      <ColorPickerInput type={SECONDARY} color={color2} pickColor={pickColor}/>
    </div>
  )
}

export default ColorPicker
