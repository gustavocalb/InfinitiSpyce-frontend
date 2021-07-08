/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';

import styles from './sidebar.module.scss'
import { UserContext } from '../../contexts/UserContext'
import { useContext } from 'react';
import Router from 'next/router';


export function Sidebar() {
  const {
    username,
    isLoggedIn
  } = useContext(UserContext)

  const [isActiveHomeButton, setIsActiveHomeButton] = useState(false)
  const [isActiveProfileButton, setIsActiveProfileButton] = useState(false)
  const [isActiveNotificationButton, setIsActiveNotificationButton] = useState(false)


  function handleHomeButton() {
    if (isActiveProfileButton) {
      setIsActiveProfileButton(false)
      setIsActiveNotificationButton(false)
    }
    setIsActiveHomeButton(true)
    Router.push('/')
  }

  function handleProfileButton() {
    if (isActiveHomeButton) {
      setIsActiveNotificationButton(false)
      setIsActiveHomeButton(false)
    }
    setIsActiveProfileButton(true)
    Router.push('/profile')
  }

  function handleNotificationButton() {
    if (isActiveHomeButton) {
      setIsActiveHomeButton(false)
      setIsActiveProfileButton(false)
    }
    setIsActiveNotificationButton(true)
    Router.push('/')
  }
  

  return (
    <>
    { isLoggedIn ? (
      <div className={styles.sidebarContainer}>
        <header>
          <img src="assets/images/logo.png" alt="logo" />

          <p>Infiniti Spyce</p>
        </header>
        <main>
        <ul>
            <>
              <li>
                <button
                  onClick={handleHomeButton}
                  className={
                    isActiveHomeButton ? styles.activeButton : styles.button
                  }
                >
                  <img src="/assets/icons/home.svg" alt="" />
                  Home
                  </button>
              </li>
              <li>
                <button
                onClick={handleNotificationButton}
                className={
                  isActiveNotificationButton ? styles.activeButton : styles.button
                }
                >
                  <img src="/assets/icons/notifications.svg" alt="" />
                  Notifications
                </button>
              </li>
              <li>
                <button
                  onClick={handleProfileButton}
                   className={
                    isActiveProfileButton ? styles.activeButton : styles.button
                  }
                >
                  <img src="/assets/icons/profile.svg" alt="" />
                  Profile
                  </button>
              </li>
            </>
            </ul>
          </main>
          <footer> 
            <img src="https://github.com/gustavocalb.png" alt="User logo" />
            <p>@{username}</p>
          </footer>
        </div>  
        ) : null }
    </>
  )
}