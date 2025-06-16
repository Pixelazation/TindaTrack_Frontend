import { BrowserRouter, Routes, Route } from "react-router";
import Test from './pages/test';
import Home from './pages';
import Items from './pages/items';
import Salesmen from './pages/salesmen';
import MainLayout from './layouts/main-layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout/>}>
          <Route index element={<Home />} />
          <Route path="/test" element={<Test />} />
          <Route path="/items" element={<Items />} />
          <Route path="/salesmen" element={<Salesmen />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
