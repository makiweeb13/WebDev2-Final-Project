import Dashboard from './components/guest/Dashboard'
import Login from './components/Login'
import Signup from './components/Signup'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import ProtectedRoutes from './util/ProtectedRoutes';
import UserDashboard from './components/user/UserDashboard';
import './App.css'

function App() {

  return (
    <Router>
      <div className="content">
        <Routes>
          <Route element={<ProtectedRoutes />}>
            <Route exact path="/home" element={<UserDashboard />}/>
          </Route>
          <Route exact path="/" element={<Dashboard />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
