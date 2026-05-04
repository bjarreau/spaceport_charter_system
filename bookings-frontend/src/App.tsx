import {BrowserRouter, Routes, Route} from "react-router-dom";
import DashboardPage from "./pages/DashboardPage"; 
import BookingPage from "./pages/BookingPage"; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<DashboardPage />} />
		<Route path="/ships/:shipId" element={<BookingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
