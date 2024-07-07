import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log(`Username: ${username}, Password: ${password}`)

    try {
      const loggedInUser = await loginService.login({
        username, password
      })

      window.localStorage.setItem("loggedBloglistUser", JSON.stringify(loggedInUser))

      blogService.setToken(loggedInUser.token) // after user logged in succeed, we need to save 'token' for other APIs with authorization
      setUser(loggedInUser)
      setUsername("")
      setPassword("")
    } catch (error) {
      console.log(error)
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="username" id="username"
              onChange={({ target }) => setUsername(target.value)}
              required
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="password" id="password"
              onChange={({ target }) => setPassword(target.value)}
              required
            />
          </div>
          <button type="submit" id='login-button'>login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <p className='loggedInUserInfo'>
        <span className="loggedInUsername">{user.name}</span> logged in
        <button type="submit" onClick={handleLogout} className='logoutBtn'>logout</button>
      </p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App