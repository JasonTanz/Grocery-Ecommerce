import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import * as Screens from './screens';
import GERoutes from './hoc/GERoutes';
function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<GERoutes roles="cust" component={Screens.Landing} />}
        />
        <Route
          path="/product/detail/:product_id"
          element={<GERoutes roles="cust" component={Screens.ProductDetail} />}
        />

        <Route
          path="/products/*"
          element={
            <GERoutes roles="cust" component={Screens.ProductListings} />
          }
        />
        <Route
          path="/cart"
          element={
            <GERoutes isProtected roles="cust" component={Screens.Cart} />
          }
        />
        <Route
          path="/cust/dashboard"
          element={
            <GERoutes
              isProtected
              roles="cust"
              component={Screens.CustDashboard}
            />
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <GERoutes
              isProtected
              roles="admin"
              header={false}
              component={Screens.AdminDashbaord}
              footer={false}
            />
          }
        />
        <Route
          path="/admin/login"
          element={
            <GERoutes
              header={false}
              component={Screens.AdminLogin}
              footer={false}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
