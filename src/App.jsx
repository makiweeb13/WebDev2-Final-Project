import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Dashboard from './components/guest/Dashboard'
import Login from './components/Login'
import Signup from './components/Signup'
import ProtectedRoutes from './util/ProtectedRoutes';
import UserDashboard from './components/user/UserDashboard';
import MainContent from './components/user/MainContent';
import Profile from './components/user/Profile';
import CreatePost from './components/user/CreatePost';
import PageNotFound from './components/PageNotFound';
import './App.css'

function App() {

  return (
    <Router>
      <div className="content">
        <Routes>
          <Route element={<ProtectedRoutes />}>
            <Route  element={<UserDashboard />}>
              <Route index path="/" element={<MainContent />}/>
              <Route path="/profile" element={<Profile />}/>
              <Route path="/create-post" element={<CreatePost />}/>
            </Route>
          </Route>
          {/* <Route exact path="/" element={<Dashboard />} /> will implement guest mode soon*/}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<PageNotFound />}/>
        </Routes>
      </div>
    </Router>
  )
}

export default App
