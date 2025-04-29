import { Action } from '../../App'
import { ACTION } from '../../Constants/Constants'
import styles from './ButtonPanel.module.css'

interface ButtonPanelProp {
    action: Action,
    handleEraseAll: ()=>void,
    handleAction: (action:Action)=>void
}
const ButtonPanel = ({action,handleEraseAll,handleAction}:ButtonPanelProp) => {
    
  return (
    <div className={styles.panel}>
        <div>
            <button className={action === "erase" ? styles.active : styles.inactive} onClick={()=>handleAction(ACTION.ERASE)}>Erase</button>
            <button className={action === "draw" ? styles.active : styles.inactive} onClick={()=>handleAction(ACTION.DRAW)}>Draw</button>
            <button className={action === "fill" ? styles.active: styles.inactive} onClick={()=>handleAction(ACTION.FILL)}>Fill Canvas</button>
        </div>
        <button className={styles.eraseAllBtn} onClick={handleEraseAll}>Erase All</button>
    </div>
  )
}

export default ButtonPanel
