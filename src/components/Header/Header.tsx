import styles from './Header.module.css'

const Header = () => {
  return (
    <header className={styles.header}>
      <div>
        <h1>PixelSplash</h1>
        <p>Splash your imagination, one pixel at a time.</p>
      </div>
      <div>
        <img src="/logo.svg" alt="paint brush logo" width={ 100 } height={ 100 }/>
      </div>
    </header>
  )
}

export default Header
