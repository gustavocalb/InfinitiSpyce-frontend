import { useContext, useState } from 'react';
import styles from './home.module.scss'
import { GetServerSideProps } from 'next';
import api from '../services/api'
import { Posts } from '../components/Posts'


import { UserContext } from '../contexts/UserContext'
import { UserPostsContext, UserPostsProvider} from '../contexts/UserPostsContext';

export default function Home(props) {

  const { 
    isLoggedIn,
    handleLoginSubmit,
    listAllFollowingsPosts,
  } = useContext(UserContext);

  const {
  } = useContext(UserPostsContext)

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  function formChange(event: any) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    console.log(form)

    handleLoginSubmit(form);
  }

  async function handlelistAllFollowingsPosts() {
    listAllFollowingsPosts()
  }

  return (
    <>
    { isLoggedIn ? (
      <>
      <UserPostsProvider>
      <div className={styles.homepage}>
          <header>
            <h2>Home</h2>
            <button 
                type="button"
                onClick={handlelistAllFollowingsPosts}
              >Atualizar</button>
          </header>
          <div className={styles.container}>
            <main>
              <div className={styles.mainContainer}>
                <Posts />
              </div>
            </main>
          </div>
        </div>
        </UserPostsProvider>
        </>
      ) : (
        <>
         <UserPostsProvider>
          <div className={styles.containerNoLoggedIn}>
            <div className={styles.container}>
              <header>
                <h2>Bem vindo(a) ao Infiniti Spyce</h2>
              </header>
              <main>
                <form method="post" onSubmit={handleSubmit}>
                <strong>Faça login para visualizar novas publicações</strong>
                  <input name="email" type="text" onChange={formChange} placeholder="E-mail" />
                  <input name="password" type="password" onChange={formChange} placeholder="Password" />
                  <button>Sing In</button>
                </form>
                <p>Não possue conta? <a href="">Criar conta</a></p>
              </main>
              </div>
            </div>
          </UserPostsProvider>
        </>
      ) }
      </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  if (!ctx.req.cookies["@infinitiSpyce:authorization"]) {
    return {
      props: {},
    };
  }

  api.defaults.headers.authorization =
    "Bearer " + ctx.req.cookies["@infinitiSpyce:authorization"];

    console.log(ctx.req.cookies["@infinitiSpyce:authorization"])

  return {
    props: {},
  };
};
