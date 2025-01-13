import React from 'react'
import styles from './footer.module.scss'
import Logo from '../../LogoImage/campLogo.png'

function Footer() {
  return (
    <div className={styles.footerLength}>
      <img src={Logo} />
    </div>
  )
}

export default Footer
