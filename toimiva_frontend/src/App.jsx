import { useState, useEffect, useReducer, createContext } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import "../style.css";
import Notification from "./components/Notification";

import NewBlogForm from "./components/NewBlogForm";
import NotificationContext from "./NotificationContext";
import { useQuery, useMutation, useQueryClient, QueryClient } from "@tanstack/react-query";
import { likedBlog } from "./services/blogs";

const App = () => {
  /* const [blogs, setBlogs] = useState([]); */
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const [notification, setNotification] = useState(null);
  const [addedBlog, setAddedBlog] = useState(null);

  const notificationReducer = (state, action) => {
    switch (action.type) {
      case 'FAILEDLOGIN':
        return {type: 'failedLogin'}
      case 'SUCCESS':
        return {type: 'success', message: action.payload}
      case 'DISABLE':
        return null
      case 'DELETE':
       return {type: 'DELETE', message: action.payload}
      default:
        return state
    }
  }


  const [notification2, dispatchNotification2] = useReducer(notificationReducer, null)

  const queryClient = useQueryClient()

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      blogService.getToken(user.token);
      setUserInfo(user);
    }
  }, []);

  const newBlogMutation = useMutation({mutationFn: blogService.createBlog,
  onSuccess: () => {
    queryClient.invalidateQueries({queryKey: ['blogs']})
  }})

  const newLikeMutation = useMutation({mutationFn: likedBlog,
  onSuccess: () => queryClient.invalidateQueries({queryKey: ['blogs']})})

  const deleteMutation = useMutation({mutationFn: blogService.deleteBlog,
  onSuccess: () => {
    queryClient.invalidateQueries({queryKey: ['blogs']})
  }})

  /* useEffect(() => {
    if (userInfo !== null) {
      blogService.getAll().then(blogs => setBlogs(blogs.filter(blog => blog.user.username === userInfo.username)))
    }
  }, [userInfo]) */
  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: () => blogService.getAll()
  })

  console.log(JSON.parse(JSON.stringify(result)))
  if (result.isLoading) {
    return <div>loading...</div>
  }
  const blogs = result.data
  console.log(blogs)

  
  

 /*  useEffect(() => {
    blogService.getAll().then((blogs) => {
      setBlogs(blogs);
      console.log(blogs);
    });
  }, []); */



  const createBlog = (blogObject) => {
    try {
      newBlogMutation.mutate({...blogObject})
      setNotification("success");
      dispatchNotification2({type: 'SUCCESS', payload: blogObject.title})
      setTimeout(() => {
        dispatchNotification2({type: 'DISABLE'});
      }, 3000);
    } catch (exception) {
      console.log("error creating a blog");
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const userInfo = await loginService.login({ username, password });
      setUserInfo(userInfo);
      setUsername("");
      setPassword("");
      console.log(`token after logging in is ${userInfo.token}`);
      blogService.getToken(userInfo.token);
      window.localStorage.setItem("loggedInUser", JSON.stringify(userInfo));
      console.log("login successful");
    } catch (error) {
      console.log("wrong credentials");
      dispatchNotification2({type: 'FAILEDLOGIN'});
      setTimeout(() => {
        dispatchNotification2({type: 'DISABLE'});
      }, 2000);
    }
  };

  const loginForm = () => {
    return (
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            id="username"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            id="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login-button" type="submit">
          login
        </button>
      </form>
    );
  };

  const handleLogOut = () => {
    setUserInfo(null);
    window.localStorage.removeItem("loggedInUser");
  };

  const handleLikes = async (id, newObject) => {
    try {
      newLikeMutation.mutate({...newObject, id: id})
    } catch (exception) {
      console.log("error liking a blog", exception);
    }
  };

  const handleDelete = async (id, blogName) => {
    try {
      deleteMutation.mutate(id)
      console.log("deleted a blog");
      setNotification("deletedBlog");
      dispatchNotification2({type: 'DELETE', payload: blogName})
      setAddedBlog(blogName);
      setTimeout(() => {
        dispatchNotification2({type: 'DISABLE'});
      }, 2000);
    } catch (exception) {
      console.log("error deleting a blog", exception);
    }
  };

  if (userInfo === null) {
    return (
      <div>
        <NotificationContext.Provider value={[notification2, dispatchNotification2]}>
        <Notification notification={notification} />
        </NotificationContext.Provider>
        <h2>log in to application</h2>
        {loginForm()}
      </div>
    );
  }
  return (
    <div>
      <h2>blogs</h2>
      <NotificationContext.Provider value={[notification2, dispatchNotification2]}>
      <Notification notification={notification} addedBlog={addedBlog} />
      </NotificationContext.Provider>
      <NewBlogForm
        userInfo={userInfo}
        handleLogOut={handleLogOut}
        createBlog={createBlog}
      />

      <div>
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              username={blog.user.name}
              handleLikes={handleLikes}
              handleDelete={handleDelete}
              canRemove={userInfo && blog.user.name === userInfo.name}
            />
          ))}
      </div>
    </div>
  );
};

export default App;
