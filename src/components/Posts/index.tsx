/* eslint-disable @next/next/no-img-element */
import { useContext } from "react"
import styles from './posts.module.scss'

import { UserContext } from "../../contexts/UserContext"

export function Posts() {
  const {
    followingsPosts,
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
      { followingsPosts.length === 0 ? (
        <div className={styles.notFindAnyPosts}>
          <h2>Siga outros usuários para visualizar <p>novas publicações</p></h2>
        
          <a href="">Busque agora influenciadores do seu gosto</a>
        </div>
      ) : (
        <>
        { followingsPosts.map(post => (
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