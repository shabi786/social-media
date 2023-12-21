import { Outlet, createBrowserRouter } from 'react-router-dom'
import './App.css'
import Feed from './components/Feed'
import UserProfile from './components/UserProfile'
import PostDetails from './components/PostDetails'

function App() {

  return (
    <div className="bg-gray-background">
    <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
      <Outlet/>
    </div>
  </div>
  )
}

export const router =  createBrowserRouter([
  {
    path: '/',
    element: <Feed/>
  },
  {
    path: 'user/:userId',
    element:<UserProfile/>
  },
  {
    path: 'post/:postId',
    element: <PostDetails/>
  }
])

export default App
