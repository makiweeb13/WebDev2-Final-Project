import Dashboard from './components/Dashboard'
import Login from './components/Login'
import Signup from './components/Signup'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css'

function App() {

  return (
    <Router>
      <div className="content">
        <Routes>
          <Route exact path="/" element={<Dashboard />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
