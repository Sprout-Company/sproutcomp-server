
import { Switch, Route } from 'wouter'

import { 
  HomePage,
  LoginPage,
  RegisterPage,
} from './features' 

function App () { 
  return (
    <Switch>
      <Route path='/' component={HomePage}/>
      <Route path='/login' component={LoginPage}/>
      <Route path='/register' component={RegisterPage}/>
    </Switch>
  )
}

export default App;