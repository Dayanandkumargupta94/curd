
// import './App.css';
// import {BrowserRouter as Router,Switch,Route} from  "react-router-dom";
// import Homepage from './component/homepage/homepage';
// import Login from './component/homepage/login/login';
// import Register from './component/register/register';

// function App() {
//   return (
//     <div className="App">
//       <Router>
//         {/* <Switch> */}
//           <Route path="/"><Homepage/></Route>
//           <Route path="/login"><Login/></Route>
//           <Route path="/register"><Register/></Route>
//           {/* </Switch> */}
        
//         </Router>
      
      
//     </div>
//   );
// }


// export default App;





import './App.css'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Homepage from "./component/homepage";
import Login from './component/login';
import Register from "./component/register";
import Resetpassword from "./component/resetpassword";
import Forgetpassword from "./component/forgetpassword";
import Profileupdate from "./component/profileupdate";
import { useState } from 'react';
function App() {

  const [ user, setLoginUser] = useState({})
  return (
    <div className="App">
      
      <Router>
        <Switch>
        <Route exact path="/">
            {
              user && user._id ? <Homepage user={user} setLoginUser={setLoginUser} /> : <Login setLoginUser={setLoginUser}/>
            }
          </Route>
           <Route path="/login">
            <Login setLoginUser={setLoginUser}/>
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/resetpassword">
            <Resetpassword />
          </Route>
          <Route path="/forgetpassword">
            <Forgetpassword />
          </Route>
          <Route path="/profileupdate">
          {
              user && user._id ? <Profileupdate users={user} setLoginUser={setLoginUser} /> : <Login setLoginUser={setLoginUser}/>
            }
          </Route>
        </Switch>
      </Router>
    
    </div>
  );
}

export default App;