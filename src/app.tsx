import { Provider } from "@/contexts/provider"
import { Router } from "@/routes/router"

function App() {
  return (
    <Provider>
      <Router />
    </Provider>
  )
}

export default App
