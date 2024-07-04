import { useState } from "react";
import "./App.css";
import Navbar from "./components/Nav";
import Prompt from './components/prompt'
import Bubbles from './components/bubbles'
import Upload from './components/upload'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

function App() {
  // const pdfUrl = Pdfurll;
  return (
    <>
        <Router>
      <Routes>
        <Route path="/" element={<Upload />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/Chat" element={<Bubbles />} />
      </Routes>
    </Router>
    {/* <Upload /> */}

      
      {/* <Navbar />
      <div className="relative min-h-screen flex flex-col">
        <div className="flex-grow main sm:ml-64 xs:mt-16 mb-24 pb-12">
          <div className="chat_container m-8">
            <Bubbles />
          </div>
        </div>
        <Prompt />
      </div> */}



    </>

  );
}

export default App;
