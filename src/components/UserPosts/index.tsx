/* eslint-disable @next/next/no-img-element */
import { useContext } from "react"
import styles from './posts.module.scss'

import { UserContext } from "../../contexts/UserContext"

export function UserPosts() {
  const {
    userPosts,
    loading,
  } = useContext(UserContext)

  return (
    <>
    {loading ? (
      <>
      <div className={styles.loading}>
        <div className={styles.cLoader}></div>
      </div>
      </>
    ) : (
      <>
      { userPosts.length === 0 ? (
        <div className={styles.notFindAnyPosts}>
          <h2>Esse usuário não possue nenhuma <p>publicação</p></h2>
        </div>
      ) : (
        <>
        { userPosts.map(post => (
        <>
          <div className={styles.containerMaster}>
            <div className={styles.imageContainer}>
              <img src="https://github.com/gustavocalb.png" alt="Logo" />
            </div>
            <div className={styles.container}>
              <header>
                <strong>{post.username}</strong>
              </header>
              <main>  
                { post.description }
              </main>
            </div>
          </div>
        </>
      )) 
      }
        </>
      ) }
      </>
    )
    }
    </>
  )
}