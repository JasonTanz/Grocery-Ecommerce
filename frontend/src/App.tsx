import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import * as Screens from './screens';
import GERoutes from './hoc/GERoutes';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GERoutes component={Screens.Landing} />} />
        <Route
          path="/product/detail"
          element={<GERoutes component={Screens.ProductDetail} />}
        />
        <Route
          path="/product/detail"
          element={<GERoutes component={Screens.ProductDetail} />}
        />
        <Route
          path="/product/"
          element={<GERoutes component={Screens.ProductListings} />}
        />
        <Route path="/cart" element={<GERoutes component={Screens.Cart} />} />
      </Routes>
    </Router>
  );
}

export default App;
