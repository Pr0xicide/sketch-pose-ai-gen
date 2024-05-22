import { Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { Session } from './pages/Session'
import { SessionEnd } from './pages/SessionEnd'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/session/form" element={<Session />} />
      <Route path="/session/end" element={<SessionEnd />} />
    </Routes>
  )
}

export default App
