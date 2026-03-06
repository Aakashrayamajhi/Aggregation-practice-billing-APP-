import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Admin from "./pages/admin";
import Product from "./pages/Product";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/" element={<Product />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;