import { Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home/Home'
import { Session } from './pages/Session/Session'
import { SessionEnd } from './pages/SessionEnd/SessionEnd'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/session" element={<Session />} />
      <Route path="/session/end" element={<SessionEnd />} />
    </Routes>
  )
}

export default App
