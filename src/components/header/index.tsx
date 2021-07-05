/* eslint-disable @next/next/no-img-element */
import styles from './styles.module.scss';
import { UserContext } from '../../contexts/UserContext'
import { useContext } from 'react';

export function Header() {
  const {
    username,
    isLoggedIn
  } = useContext(UserContext)
  
  return (
    <>
    { isLoggedIn ? (
      <>
      <div className={styles.headerContainer}>
        <div className={styles.container}>
          <h2>Welcome back, <strong>{username}</strong></h2>
          
          <button>
            <img src="https://github.com/gustavocalb.png" alt="Logo" />
          </button>
        </div>
      </div>
    </>
    ) : null }
      </>
  )
}