import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import HomePage from './components/Pages/Home/Homepage';
import Signup from './components/Pages/Signup/Signup';
import Login from './components/Pages/Login/Login';
import AddQuestion from './components/Pages/AddQuestion/AddQuestion';
import EditQuestion from './components/Pages/EditQuestion/EditQuestion';
import EditAnswer from './components/Pages/EditAnswer/EditAnswer';
import ShowOneQuestion from './components/Pages/ShowOneQuestion/ShowOneQuestion';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* <Header/> */}
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/questions' element={<HomePage/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path="/addQuestion" element={<AddQuestion/>} />
          <Route path="/editQuestion/:id" element={<EditQuestion/> }/>
          <Route path="/editAnswer" element={<EditAnswer/> } />
          <Route path="/ShowOneQuestion/:id" element={<ShowOneQuestion/>} />
        </Routes>      
        {/* <Footer/> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
