import { Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home/Home'
import { Session } from './pages/Session/Session'
import { SessionRecap } from './pages/SessionRecap/SessionRecap'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/session" element={<Session />} />
      <Route path="/session/recap" element={<SessionRecap />} />
    </Routes>
  )
}

export default App
