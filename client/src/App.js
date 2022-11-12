import './App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import GetStarted from './pages/Getstarted/GetStarted';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Userhome from './pages/Userhome/Userhome';
import Discover from './pages/Discover/Discover';
import Artist from './pages/Artists/Artist';
import Recent from './pages/Recent/Recent';
import Favourite from './pages/Favourites/Favourite';
import Playlist from './pages/Playlists/Playlist';
import Explore from './pages/Explore/Explore';
import { useEffect, useState } from 'react';
import AdminHome from './AdminPages/AdminHome/AdminHome';
import Dashboard from './AdminPages/Dashboard/Dashboard';
import Users from './AdminPages/Users/Users';
import { UserAuthContextProvider } from './context/UserAuthContext';
import UserProfile from './pages/UserProfile/UserProfile';
import AddMusic from './AdminPages/AddMusic/AddMusic';
import AdLogin from './AdminPages/AdLogin/AdminLogin';
import EditMusic from './AdminPages/EditMusic/EditMusic';
import New from './pages/New/New';
import Album from './pages/Albums';
import ProtectedRoutes from './ProtectedRoute';
import AdminRouteProtect from './AdminRouteProtect';

function App() {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const token = hash.substring(1).split("&")[0].split("=")[1]
      localStorage.setItem('token', token)
    }
  }, [])

  const [toggleDark, settoggleDark] = useState(false);
  const theme = createTheme({
    palette: {
      mode: toggleDark ? 'dark' : 'light',
    },
  });

  return (
    <>
      <div className="App"
        style={{
          position: 'absolute', bgcolor: '#121139',
          background: "linear-gradient(to right, #0f0c29, #302b63, #24243e)",
          maxHeight: '400vh', minHeight: '100vh', width: '100%'
        }}
      >
        <ThemeProvider theme={theme} >
          <CssBaseline />
          <Router>
            <UserAuthContextProvider>
              <Routes>
                <Route exact path='/' element={<GetStarted />} />
                <Route exact path='/login' element={<Login />} />
                <Route exact path='/signup' element={<Signup />} />
                <Route path='/adminlogin' element={<AdLogin />} />
                <Route path="/" element={<ProtectedRoutes />}>
                  <Route path='/Home' element={<Userhome />}>
                    <Route path='explore' element={<Explore />} />
                    <Route path='discover' element={<Discover />} />
                    <Route path='albums' element={<Album />} >
                    </Route>
                    <Route path='artists' element={<Artist />} />
                    <Route path='recent' element={<Recent />} />
                    <Route path='new' element={<New />} />
                    <Route path='favourite' element={<Favourite />} />
                    <Route path='playlists' element={<Playlist />} >
                    </Route>
                    <Route path='profile' element={<UserProfile />} />
                  </Route>
                </Route>
                <Route path="/" element={<AdminRouteProtect/>}>
                  <Route exact path='/admin' element={<AdminHome />} >
                    <Route path='dashboard' element={<Dashboard />} />
                    <Route path='users' element={<Users />} />
                    <Route path='addmusic' element={<AddMusic />} />
                    <Route path='editmusic' element={<EditMusic />} />
                  </Route>
                </Route>
              </Routes>
            </UserAuthContextProvider>
          </Router>
        </ThemeProvider>
      </div>
    </>
  );
}

export default App;
