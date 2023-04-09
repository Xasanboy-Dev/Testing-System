import { useRoutes } from 'react-router-dom'
import AdminPage from './Pages/Admin'
import NotFouund from './Pages/NotFound'
import HomePage from './Pages/HomePage'
import { useEffect, useState } from 'react'
function App() {
  const [toggle, setToggle] = useState("")
  useEffect(() => {
    let mood = localStorage.getItem("toggle")
    setToggle(mood!)
  })
  const routes = useRoutes([
    { path: "/admin", element: <AdminPage setToggle={setToggle} toggle={toggle} /> },
    { path: "/admin/:id", element: <AdminPage setToggle={setToggle} toggle={toggle} /> },
    { path: "/", element: <HomePage setToggle={setToggle} toggle={toggle} /> },
    { path: "*", element: <NotFouund /> },
  ])
  return routes
}

export default App
