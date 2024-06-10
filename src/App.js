import React from 'react';
import { Route, Routes } from "react-router-dom";
import DashboardDetail from './components/Dashboard/DashboardDetail';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<DashboardDetail />} />
      </Routes>
    </>
  );  
}

export default App;
