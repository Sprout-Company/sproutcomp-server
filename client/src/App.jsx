import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from 'react-router-dom';
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
  return <RouterProvider router={router}/>
}

export default App;