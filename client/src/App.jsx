import './App.css'
import { BrowserRouter as Router, Link, Routes, Route } from "react-router-dom";
import Home from './pages/home/home';
import Search from './pages/search/search';
function App() {

  return (
    <div className="App">
       <Router>
          <nav className='nav'>
            <Link to='/' className='link-nav'>HOME</Link>
            <Link to='/search' className='link-nav'>SEARCH</Link>
          </nav>
          <Routes>
              <Route index element= {<Home/>}/>
              <Route path='search' element={<Search/>}/>
          </Routes>
      </Router>
    </div>
  )
}

export default App
