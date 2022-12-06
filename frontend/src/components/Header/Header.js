/* IMPORTING COMPONENTS AND STYLES */
import './Header.scss';
import Button from '@mui/material/Button';
import Logo from "./Logo";

/* IMPORTING APIS */
import {useDispatch, useSelector} from 'react-redux';
import { UserManagementSliceActions } from '../../Store/UserManagement-slice';
import {useNavigate} from 'react-router-dom';

/* Start of Header Component */
const Header = () => {
   /* Initialize states to render appropriate content based on loggedIn status and type of user */
   const isLoggedIn = useSelector(state => state.userManagement.isLoggedIn);
   const currentUser = useSelector(state => state.userManagement.currentUser);
   const isLeasee = useSelector(state => state.userManagement.isLeasee);
   const dispatch = useDispatch();
  //  const navigate = useNavigate();
   
   const handleLogout = async() => {
      // auth code to logout needs to be added here
      dispatch(UserManagementSliceActions.setCurrentUser(null)); // after logout, set current to null
   }

  //  const handleLogin = () =>{
  //     // redirect to login page for further processing
  //     navigate('/login');
  //  }
  //  const handleSignUp = () => {
  //     // redirect to sign up page for further processing
  //     navigate('/signup');
  //  }

   return (
     <div className="header">
       <div className="header-left">
         <Logo />
         <h2 className="header-title">BeMyGuest</h2>
       </div>
       <div className="header-middle">
         {currentUser && (
           <h1 className="salutation-text">{currentUser.name}</h1>
         )}
         <button onClick = {()=>{dispatch(UserManagementSliceActions.setIsLoggedIn(!isLoggedIn))}}>Toggle Logged in status</button>
         <button onClick = {()=>{dispatch(UserManagementSliceActions.setIsLeasee(!isLeasee))}}>Toggle Leasee status</button>

       </div>
       <div className="header-right">
         <nav className="nav-link-container">
           {isLoggedIn &&
             (isLeasee ? (
               <Button variant="outlined" color="secondary" size="small">
                 My Bookings
               </Button>
             ) : (
               <Button variant="outlined" color="secondary" size="small">
                 My Postings
               </Button>
             ))}
         </nav>
         <div className="button-container">
           {isLoggedIn ? (
             <Button variant="contained" color="error" size="small" sx ={{m:1}}>
               Logout
             </Button>
           ) : (
             <>
               <Button variant="contained" color="secondary" size="small" sx ={{m:1}}>
                 Login
               </Button>
             </>
           )}
         </div>
       </div>
     </div>
   );
}
 
export default Header;