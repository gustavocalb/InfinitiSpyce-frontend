/* eslint-disable react-hooks/exhaustive-deps */
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import api from "../services/api";
import Cookies from "js-cookie";
import Router from "next/router";
import { UserContext } from "./UserContext";
interface UserPostsData {
  followingsPosts: Post[];
  loading: boolean;
  listAllFollowingsPosts: () => void;
}

interface UserPostsProps {
  children: ReactNode
}

interface Post {
  id: string;
  user_id: string;
  username: string;
  description: string;
  created_at: Date;
  updated_at: Date;
}

export const UserPostsContext = createContext({} as UserPostsData)

export function UserPostsProvider({ children }: UserPostsProps) {
  const {
    isLoggedIn
  } = useContext(UserContext)

  const [loading, setLoading] = useState(false); 
  const [followingsPosts, setFollowingsPosts] = useState([])
  const [followingsPostsArray, setFollowingsPostsArray] = useState([])
  
  async function listAllFollowingsPosts() {
    const token = Cookies.get("@infinitiSpyce:authorization")
    api.defaults.headers.authorization = `Bearer ${token}`
   
    setLoading(true)
    const response = await api.get('/posts/list-followings-posts')

    // console.log(response.data)

    const teste = await response.data

    console.log(teste)

    setFollowingsPosts(response.data)
    console.log(followingsPosts, 'teste')
    setLoading(false)
  }

  async function listAllFollowingsPostss() {
    const token = Cookies.get("@infinitiSpyce:authorization")
    api.defaults.headers.authorization = `Bearer ${token}`
   
    setLoading(true)
    const response = await api.get('/posts/list-followings-posts')

    // console.log(response.data)

    const teste = await response.data

    console.log(teste)

    setFollowingsPosts(response.data)
    console.log(followingsPosts, 'teste')
    setLoading(false)
  }

  // useEffect(() => {
  //   setLoading(true)
  // }, [])

  return (
    <UserPostsContext.Provider value={{
      loading,
      followingsPosts,
      listAllFollowingsPosts
    }}>
      {children}
    </UserPostsContext.Provider>
  )
}