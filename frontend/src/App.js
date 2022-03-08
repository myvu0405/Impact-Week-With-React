import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import HomePage from './components/Pages/Home/Homepage';
import Signup from './components/Pages/Signup/Signup';
import Login from './components/Pages/Login/Login';
import AddQuestion from './components/Pages/AddQuestion/AddQuestion';
import EditQuestion from './components/Pages/EditQuestion/EditQuestion';
import EditAnswer from './components/Pages/Answer/EditAnswer';
import ShowOneQuestion from './components/Pages/ShowOneQuestion/ShowOneQuestion';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';


export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/questions' element={<HomePage/>}/>
          <Route path='/new-question' element={<AddQuestion/>}/>
          <Route path='/one-question/:id' element={<ShowOneQuestion/>}/>

          <Route path='/edit-question/:id' element={<EditQuestion/>}/>
          <Route path='/edit-answer/:id' element={<EditAnswer/>}/>


        </Routes>      
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

