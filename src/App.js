import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {StockOverviewPage} from './pages/StockOverviewPage'
import {StockDetailPage} from './pages/StockDetailPage'
function App() {
  return (
    <main className='container' >
    <Router>
      <Routes>
        <Route path='/' element={<StockOverviewPage/>}/>
        <Route path='/details/:symbol' element={<StockDetailPage/>}/>
      </Routes>
    </Router>
    </main>
  );
}

export default App;
