import styles from './ButtonPanel.module.css'

interface ButtonPanelProp {
    handleDraw: ()=>void,
    handleErase: ()=>void,
    isDraw: boolean
}
const ButtonPanel = ({handleDraw,handleErase,isDraw}:ButtonPanelProp) => {
  return (
    <div className={styles.panel}>
      <button className={isDraw ? styles.inactive : styles.active} onClick={handleErase}>Erase</button>
      <button className={isDraw ? styles.active : styles.inactive} onClick={handleDraw}>Draw</button>
    </div>
  )
}

export default ButtonPanel
