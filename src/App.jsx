import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from './components/Home'
import Navbar from './components/Navbar'
import ReadData from './components/ReadData'
import Update from "./components/Update";

const App=()=> {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/read" element={<ReadData />} />
          <Route path="/update/:id" element={<Update />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
