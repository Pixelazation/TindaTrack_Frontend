import { BrowserRouter, Routes, Route } from "react-router";
import Test from './pages/test';
import Home from './pages';
import Items from './pages/items';
import Salesmen from './pages/salesmen';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<Test />} />
        <Route path="/items" element={<Items />} />
        <Route path="/salesmen" element={<Salesmen />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
