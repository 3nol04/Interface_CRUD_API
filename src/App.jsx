import React ,{Suspense} from "react"
import { BrowserRouter  as Router , Routes, Route, Link, NavLink } from "react-router-dom"

const Home = React.lazy(() => import('./components/Home'))
const Falkultas = React.lazy(() => import('./components/fakultas/List'))
const Prodi = React.lazy(() => import('./components/fakultas/podi'))
const CreateFalkultas = React.lazy(() => import('./components/fakultas/create'))
const CreateProdi = React.lazy(() => import('./components/fakultas/createProdi'))
const EditList = React.lazy(() => import('./components/fakultas/edit'))
const EditProdi = React.lazy(() => import('./components/fakultas/editProdi'))
function App() {

  return (
    <Router>
       <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">Navbar</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
        <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} aria-current="page" >Home</NavLink>
        </li>
        <li className="nav-item">
        <NavLink to="/fakultas" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} aria-current="page">Fakultas</NavLink>
        </li>
        <li className="nav-item">
        <NavLink to="/prodi" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} aria-current="page">Prodi</NavLink>
        </li>
      </ul>
    </div>
  </div>
</nav>
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>

          <Route path="/" 
          element={<Home />}/>

          <Route path="/fakultas" 
          element={<Falkultas />}/>
          
          <Route path="/prodi" 
          element={<Prodi />}/>

          <Route path="/fakultas/create" 
          element={<CreateFalkultas/>}/>

          <Route path="/prodi/create" 
          element={<CreateProdi />}/>
          
          <Route path="/fakultas/edit/:id" 
          element={<EditList />}/>

          <Route path="/prodi/edit/:id" 
          element={<EditProdi />}/>
      </Routes>
    </Suspense>
  </Router>
  )
}

export default App
