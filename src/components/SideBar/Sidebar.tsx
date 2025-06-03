import React from 'react'
import ColorPicker from '../ColorPicker/ColorPicker'
import styles from './Sidebar.module.css'

interface SidebarProps {
  children:React.ReactNode,
}
const Sidebar = ({children}:SidebarProps) => {
  return (
    <div className={styles.sidebarContainer}>
      <ColorPicker/>
      {children}
    </div>
  )
}

export default Sidebar
