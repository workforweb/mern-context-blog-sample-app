import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import './App.css';
import GetAll from './pages/getAll';
import GetOne from './pages/getOne';
import UpdatePost from './pages/updatePost';
import PostOne from './pages/postOne';
import NoMatch from './pages/noMatch';
import AppState from './context/GlobalState';
import useToggle from './hooks/useToggle';
import useWindowDimensions from './hooks/useWindowDimensions';
import { CloseIcon, HamburgerIcon } from './components/SvgButtonIcons';

function App() {
  return (
    <AppState>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<GetAll />} />
          <Route path="/post/:slug" element={<GetOne />} />
          <Route path="/update" element={<UpdatePost />} />
          <Route path="/add" element={<PostOne />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </BrowserRouter>
    </AppState>
  );
}

export default App;

function Navbar() {
  const { width } = useWindowDimensions();
  const [toggle, setToggle] = useToggle();

  const onMobileClick = width <= 460 && setToggle;

  return (
    <nav className="navbar">
      <button
        className="nav-btn"
        aria-label={toggle ? 'Sidebar-open' : 'Sidebar-close'}
        onClick={setToggle}
      >
        {/* {toggle ? 'Close' : 'Open'} */}
        {toggle ? <CloseIcon /> : <HamburgerIcon />}
      </button>
      <div
        onClick={setToggle}
        className={`overlay ${toggle ? 'd-flex' : 'd-none'}`}
      />
      <div
        className={`navbar-nav ${toggle ? 'positive-left' : 'negative-left'}`}
      >
        <div className="navlink-box">
          <NavbarLink to="/" linkname="GetAll" onClick={onMobileClick} />
          <NavbarLink to="/add" linkname="PostOne" onClick={onMobileClick} />
        </div>
      </div>
    </nav>
  );
}

function NavbarLink({ to, linkname, onClick }) {
  return (
    <NavLink
      onClick={onClick}
      to={to}
      className={({ isActive }) => (isActive ? 'navlink active' : 'navlink')}
    >
      {linkname}
    </NavLink>
  );
}

// function ProtectedRoute({ user, children }) {

//   if(!user) {
//     return (
//       <Navigate to="/login" replace/>
//     );
//   }

//   return children;
// }

// <Route path="/stats" element={<ProtectedRoute user={user}><Stats/></ProtectedRoute>} />
