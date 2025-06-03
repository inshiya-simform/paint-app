import { ChangeEvent, useContext} from 'react'
import ColorPickerInput from './ColorPickerInput/ColorPickerInput'
import styles from './ColorPickerInput/ColorPicker.module.css'
import { ColorContext } from '../../contextStore/ColorsContext'
import { PRIMARY, SECONDARY } from '../../Constants/Constants'

export type InputFunc = (e: ChangeEvent<HTMLInputElement>,color:number)=>void

const ColorPicker = () => {
  const {color1,color2,pickColor} = useContext(ColorContext);
  return (
    <div className={styles.pickerSection}>
      <ColorPickerInput type={PRIMARY} color={color1} pickColor={pickColor}/>
      <ColorPickerInput type={SECONDARY} color={color2} pickColor={pickColor}/>
    </div>
  )
}

export default ColorPicker
