import { BrowserRouter, Routes, Route } from "react-router";
import Test from './pages/test';
import Home from './pages';
import Items from './pages/items';
import Salesmen from './pages/salesmen';
import MainLayout from './layouts/main-layout';
import Accounts from './pages/accounts';
import Orders from './pages/orders';
import { useLocationDropdown } from './stores/locations';
import { useEffect } from 'react';

function App() {
  const { setMunicipalities } = useLocationDropdown();

  useEffect(() => {
    setMunicipalities();
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout/>}>
          <Route index element={<Home />} />
          <Route path="/test" element={<Test />} />
          <Route path="/items" element={<Items />} />
          <Route path="/salesmen" element={<Salesmen />} />
          <Route path="/accounts" element={<Accounts />} />
          <Route path="/orders" element={<Orders />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
