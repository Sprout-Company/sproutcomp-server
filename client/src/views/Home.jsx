
import { useNavigate } from "react-router-dom"

export default function HomeView () {
  const navigate = useNavigate();
  
  return (
    <div>
      Esta es la pantalla principal
      <button onClick={()=>{navigate('login')}}> Navegar a /login </button>
    </div>
  )
}