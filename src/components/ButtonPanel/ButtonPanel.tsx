import { Action } from '../../App'
import { ACTION } from '../../Constants/Constants'
import styles from './ButtonPanel.module.css'
import Erase from '../../assets/eraser.svg'
import EraseAll from '../../assets/eraseAll.svg'
import Pencil from '../../assets/pencil.svg'
import Fill from '../../assets/fill.svg'
import Mirror from '../../assets/mirror.svg'

interface ButtonPanelProp {
    action: Action,
    handleEraseAll: ()=>void,
    handleAction: (action:Action)=>void
}
const ButtonPanel = ({action,handleEraseAll,handleAction}:ButtonPanelProp) => {
    
  return (
    <div className={styles.panel}>
        <div>
            <button className={action === "erase" ? styles.active : styles.inactive} title="Eraser" onClick={()=>handleAction(ACTION.ERASE)}>
              <img src={Erase} alt='eraser'/>
            </button>
            <button className={action === "draw" ? styles.active : styles.inactive} title="Pencil" onClick={()=>handleAction(ACTION.DRAW)}>
              <img src={Pencil} alt='pencil'/>
            </button>
            <button className={action === "fill" ? styles.active: styles.inactive} title="Fill" onClick={()=>handleAction(ACTION.FILL)}>
              <img src={Fill} alt='fill'/>
            </button>
        </div>
        <button className={styles.eraseAllBtn} title='Erase All' onClick={handleEraseAll}>
          <img src={EraseAll} alt='eraser all'/>
        </button>
        <button className={styles.eraseAllBtn} title='Mirror' onClick={handleEraseAll}>
          <img src={Mirror} alt='mirror'/>
        </button>
    </div>
  )
}

export default ButtonPanel
