/* IMPORTING PAGES */
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';

/* IMPORTING ROUTING COMPONENTS */
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

/* Start of App */
const App = () => {

  return (
   <>
      <Router>
         <Routes>
            <Route path = "/" element = {<Home />} />
            {/* <Route path = "/login" element = {<Login />} />
            <Route path = "/signup" element = {<Signup />}/>  */}
         </Routes>
      </Router>  
   </>
  );
}

export default App;