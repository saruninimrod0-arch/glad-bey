import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Addproducts from './components/Addproducts';
import Getproducts from './components/Getproducts';
import Notfound from './components/Notfound';
import Makepayment from './components/Makepayment';
import Footer from './components/Footer';
import Navbar from './components/Navbar';

function App() {
  return (
 <Router>
     <div className="App">
      <header className="App-header">
        <h2>Welcome to Glad-Bey Purchase your Price</h2>
      </header>
      <Navbar/>
      <Routes>
         <Route path='/signup' element={<Signup />} />
        <Route path='/signin' element={<Signin />} />
         <Route path='/addproducts' element={<Addproducts />} />
          <Route path='/' element={<Getproducts />} />
          <Route path='/makepayment' element={<Makepayment/>} />
          <Route path='/footer' element={<Footer/>} />
        <Route path='*' element={<Notfound/>} />
      </Routes>
        <Footer/>
    </div>
 </Router>
  );
}

export default App;
