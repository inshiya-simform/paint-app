import styles from './ButtonPanel.module.css'

interface ButtonPanelProp {
    handleDraw: ()=>void,
    handleErase: ()=>void,
    isDraw: boolean,
    handleEraseAll: ()=>void,
    handleFill: ()=>void
}
const ButtonPanel = ({handleDraw,handleErase,isDraw,handleEraseAll,handleFill}:ButtonPanelProp) => {
    
  return (
    <div className={styles.panel}>
        <div>
            <button className={isDraw ? styles.inactive : styles.active} onClick={handleErase}>Erase</button>
            <button className={isDraw ? styles.active : styles.inactive} onClick={handleDraw}>Draw</button>
        </div>
        <button className={styles.eraseAllBtn} onClick={handleEraseAll}>Erase All</button>
        <button className={styles.eraseAllBtn} onClick={handleFill}>Fill Canvas</button>
    </div>
  )
}

export default ButtonPanel
