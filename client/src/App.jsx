import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from 'react-router-dom';
import { getSocket } from './logic/socket.js'
import { UserProvider } from './ctx/User.jsx' 
import HomeView from './views/Home.jsx'
import LoginView from './views/Login.jsx'
import RegisterView from './views/Register.jsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeView/>,
  },
  {
    path: '/login',
    element: <LoginView/>,
  },
  {
    path: '/register',
    element: <RegisterView/>,
  },
]);

function App () { 
  return (
    <UserProvider>
      <RouterProvider router={router}/>
    </UserProvider>
  )
}

export default App;