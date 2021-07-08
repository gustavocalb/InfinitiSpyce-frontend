/* eslint-disable @next/next/no-img-element */
import { useContext } from "react"
import { UserContext } from "../contexts/UserContext"
import { UserPosts } from '../components/UserPosts'

import styles from '../styles/pages/profile.module.scss'

export default function Profile() {
  const {
    username,
    isLoggedIn,
    userPosts,
    userBio,
    verificationAccount,
    userFollowingsCount,
    userFollowersCount,
  } = useContext(UserContext)

  return (
    <>
      { isLoggedIn ? (
        <>
          <div className={styles.homepage}>
            <header>
              <h2>Profile</h2>
            </header>
            <div className={styles.container}>
              <main>
                <div className={styles.mainContainer}>
                  <section className={styles.sectionHeader}>
                    <img className={styles.logoIcon} src="https://github.com/gustavocalb.png" alt="logo" />
                    { verificationAccount ? (
                      <div className={styles.verificationContainer}>
                         <strong>@{username}</strong>
                         <img className={styles.verificationAccount} src="/assets/icons/verification_account.svg" alt="Conta verificada" />
                      </div>
                    ) : (
                      <>
                         <strong>@{username}</strong>
                      </>
                    )}
                    <p>{userBio}</p>
                    <div className={styles.followesCounteContainer}>
                      <table cellSpacing={0}>
                      <thead>
                        <tr>
                          <th>Followers</th>
                        </tr>
                        <tbody>
                          { userFollowersCount }
                        </tbody>
                      </thead>
                      </table>
                      <table cellSpacing={0}>
                      <thead>
                        <tr>
                          <th>Publications</th>
                        </tr>
                        <tbody>
                          { userPosts.length }
                        </tbody>
                      </thead>
                      </table>
                      <table cellSpacing={0}>
                      <thead>
                        <tr>
                          <th>Followings</th>
                        </tr>
                        <tbody>
                          { userFollowingsCount }
                        </tbody>
                      </thead>
                      </table>
                    </div>
                  </section>
                    <p>Publicações do usuario</p>
                </div>
              </main>
              <div className={styles.userPostsContainer}>
                  <UserPosts />
              </div>
            </div>
          </div>
        </>
      ) : null }
    </>
  )
}