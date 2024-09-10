import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/Home';
import DashboardPage from './pages/Dashboard';
import Coin from './pages/Coin';
import ComparePage from './pages/Compare';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import WatchList from './pages/WatchList';
import ErrorPage from './pages/Error';

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/dashboard' element={<DashboardPage/>}/>
          <Route path='/coin/:id' element={<Coin/>}/>
          <Route path='/compare' element={<ComparePage/>}/>
          <Route path='/watchlist' element={<WatchList/>}/>
          <Route path='/error' element={<ErrorPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
