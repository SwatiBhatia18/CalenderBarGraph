import React from 'react';
import { useSelector } from 'react-redux';
import Header from './components/Layout/Header';
import CalendarComponent from './components/Calendar/CalendarComponent';
import BarGraphModal from './components/BarGraph/BarGraphModal';
import './App.css';

function App() {
  const { showModal } = useSelector((state) => state.calendar);

  return (
    <div className="App">
      <Header />
      <main className="main-content">
        <div className="container">
          <div className="welcome-section">
            <h2>📅 Interactive Calendar with Analytics</h2>
            <p>Click on highlighted dates to view detailed data analytics and bar graphs</p>
          </div>
          <CalendarComponent />
        </div>
      </main>
      {showModal && <BarGraphModal />}
    </div>
  );
}

export default App;
