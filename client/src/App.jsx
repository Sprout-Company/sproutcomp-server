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


const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeView/>,
  },
  {
    path: '/login',
    element: <LoginView/>,
  },
]);

function App () { 
  getSocket();
  return (
    <UserProvider>
      <RouterProvider router={router}/>
    </UserProvider>
  )
}

export default App;