import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import Login from './components/Login';
import Signup from './components/Signup';
import Questions from './components/Questions'
import NewQuestion from './components/NewQuestion'
import OneQuestion from './components/OneQuestion'
import EditQuestion from './components/EditQuestion'


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/questions' element={<Questions/>}/>
          <Route path='/new-question' element={<NewQuestion/>}/>
          <Route path='/one-question/:id' element={<OneQuestion/>}/>

          <Route path='/edit-question/:id' element={<EditQuestion/>}/>



        </Routes>      
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
