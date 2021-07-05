import '../styles/globals.scss'
import { Sidebar } from '../components/sidebar'
import { Header } from '../components/header'
import { UserProvider } from '../contexts/UserContext';
import { UserPostsProvider } from '../contexts/UserPostsContext'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <UserProvider>
        <UserPostsProvider>
          <Sidebar />
          <Header />
          <Component {...pageProps} />
        </UserPostsProvider>
      </UserProvider>
    </>
  )
}

export default MyApp
