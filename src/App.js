import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/App.css';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import CreateJobOffer from './components/CreateJobOffer';
import JobOfferList from './components/JobOfferList';
import UpdateJobOffer from './components/UpdateJobOffer';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/create-job-offer" element={<CreateJobOffer />} />
            <Route path="/job-list" element={<JobOfferList />} />
            <Route path="/job-offers/edit/:id" element={<UpdateJobOffer />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
