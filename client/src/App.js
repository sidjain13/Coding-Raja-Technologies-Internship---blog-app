import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login1 from './components/Login';
import SignUp1 from './components/SignUp';
import Home1 from './components/Home';
import Create1 from './components/Create';
import Update1 from './components/Update';

function App() {

  const Routing=()=>{
    return(
      <Routes>
          <Route path="/" exact Component={Home1}/>
          <Route path="/login" exact Component={Login1}/>
          <Route path="/signup" exact Component={SignUp1}/>
          <Route path="/create" exact Component={Create1}/>
          <Route path="/update" exact Component={Update1}/>
          <Route path="/*" Component={Home1}/>
      </Routes>
    )
  }



  return (
   <> 
      <Navbar/>
      <Routing/>
   </>
  );
}

export default App;
