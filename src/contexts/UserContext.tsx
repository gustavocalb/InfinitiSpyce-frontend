import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import api from "../services/api";
import Cookies from "js-cookie";
import Router from "next/router";
import { UserPostsContext, UserPostsProvider } from "./UserPostsContext";

interface UserContextData {
  username: string;
  email: string;
  password: string;
  userBio: string;
  isLoggedIn: boolean;
  followingsPosts: Post[];
  userPosts: Post[];
  loading: boolean;
  verificationAccount: boolean;
  userFollowingsCount: number;
  userFollowersCount: number
  handleLoginSubmit: (form: { email: string; password: string }) => void;
  listAllFollowingsPosts: () => void;
}

interface UserProviderProps {
  children: ReactNode;
}

interface Post {
  id: string;
  user_id: string;
  username: string;
  description: string;
  created_at: Date;
  updated_at: Date;
}

export const UserContext = createContext({} as UserContextData)

export function UserProvider({ children }: UserProviderProps) {
  // const {
  //   listAllFollowingsPosts
  // } = useContext(UserPostsContext)

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [loading, setLoading] = useState(false); 
  const [followingsPosts, setFollowingsPosts] = useState([])
  const [userPosts, setUserPosts] = useState([])

  const [message, setMessage] = useState(null);
  const [verificationAccount, setVerificationAccount] = useState(true)
  const [username, setUsername] = useState("");
  const [name, setName] = useState("")
  const [userBio, setUserBio] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [userFollowersCount, setUserFollowersCount] = useState<number>(0)
  const [userFollowingsCount, setUserFollowingsCount] = useState<number>(0)

  useEffect(() => {
    const auth = Cookies.get("@infinitiSpyce:auth");

    
    if (!auth) {
        // Cookies.remove("@infinitiSpyce:authorization");
        setIsLoggedIn(false);
      } else {
        setIsLoggedIn(true);
      }
  }, [isLoggedIn]);

  async function handleFindUser() {
    const token = Cookies.get("@infinitiSpyce:authorization")
    api.defaults.headers.authorization = `Bearer ${token}`

    await api
      .get("/users/")
      .then((response) => {
        console.log(response)
        setUsername(response.data.username);
        setEmail(response.data.email);
        setUserBio(response.data.bio)
        setUserPosts(response.data.posts)
        setUserFollowersCount(response.data.userFollowersCount.total_followers)
        setUserFollowingsCount(response.data.userFollowersCount.total_followings)
      })
      .catch((error) => {
        console.log(error)
      });

    await api.get("/users")
  }

  useEffect(() => {
    handleFindUser();
    listAllFollowingsPosts()
  }, [email, username])

  async function listAllFollowingsPosts() {
    const token = Cookies.get("@infinitiSpyce:authorization")
    api.defaults.headers.authorization = `Bearer ${token}`
   
    setLoading(true)
    const response = await api.get('/posts/list-followings-posts')

    const teste = await response.data

    console.log(teste)

    setFollowingsPosts(response.data)
    console.log(followingsPosts, 'teste')
    setLoading(false)
  }

  async function handleLoginSubmit(form) {
    await api
      .post("/sessions/", form)
      .then((response) => {

        console.log(response.data.token)
        Cookies.set("@infinitiSpyce:authorization", String(response.data.token));

        setEmail(response.data.userWithoutPassowrd.email);
        setUsername(response.data.userWithoutPassowrd.name);
        setIsLoggedIn(true);
        listAllFollowingsPosts()
        
        Cookies.set("@infinitiSpyce:auth", String("true"));

        Router.push("/");
      })
      .catch((error) => {
        console.log(error)
      });
  }

  return (
    <UserContext.Provider value={{
      username,
      email,
      password,
      userBio,
      isLoggedIn,
      handleLoginSubmit,
      followingsPosts,
      userPosts,
      loading,
      verificationAccount,
      userFollowersCount,
      userFollowingsCount,
      listAllFollowingsPosts,
    }}>
      <UserPostsProvider>
       { children }
      </UserPostsProvider>
    </UserContext.Provider>
  )
}