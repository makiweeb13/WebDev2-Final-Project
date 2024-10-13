import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from './components/Login'
import Signup from './components/Signup'
import ProtectedRoutes from './util/ProtectedRoutes';
import UserDashboard from './components/user/UserDashboard';
import MainContent from './components/user/MainContent';
import Profile from './components/user/Profile';
import CreatePost from './components/user/CreatePost';
import PageNotFound from './components/PageNotFound';
import './App.css'
import ErrorPage from './components/ErrorPage';
import PostDetails from './components/user/PostDetails';

function App() {
  return (
    <Router>
      <div className="content">
        <Routes>
          <Route exact path="/" element={<UserDashboard />}>
            <Route index element={<MainContent />}/>
            <Route element={<ProtectedRoutes />}>
              <Route path="/profile/:id" element={<Profile />} errorElement={<ErrorPage />}/>
              <Route path="/post/:id" element={<PostDetails />} errorElement={<ErrorPage />}/>
              <Route path="/create-post" element={<CreatePost />}/>
            </Route>
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<PageNotFound />}/>
        </Routes>
      </div>
    </Router>
  )
}

export default App
