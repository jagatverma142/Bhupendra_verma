import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Home from "./Home";
import About from "./Pages/About";
import Navbar from "./Components/Navbar";
import "./App.css";

function App() {
  return (
    <>
    <div className="navbar">
        <Navbar />
    </div>
    <BrowserRouter>
      <Routes>
        
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
    
    
    </>


    
  );
}

export default App;
