import { useSelector,useDispatch } from "react-redux";
import './RoomViewModal.scss';
import Logo from "../Header/Logo";
import ActionButton from "../../controls/ActionButton";
import Button from '@mui/material/Button';
import CloseIcon from '@material-ui/icons/Close';
import { RoomManagementActions } from "../../Store/RoomManagement-slice";
import { UserManagementSliceActions } from "../../Store/UserManagement-slice";
import Youtube from "react-youtube";

const RoomViewModal = ({selectedViewRoomId}) => {
   const allRooms = useSelector(state => state.roomManagement.rooms);
   /* Logic to be implemented once authentication is integrated */

   // const currentUser = useSelector(state => state.userManagement.currentUser);
   // const isLoggedIn = useSelector(state => state.userManagement.isLoggedIn);
   // const isLeasee = useSelector(state => state.UserManagement.isLeasee);
   // const isAuthorizedBookRequest = isLoggedIn && isLeasee; // in case not logged in, or you are lessor; should throw notif error on clicking book

   const selectedRoom = allRooms.find((room) => room.id === selectedViewRoomId);
   // const isAlreadyBooked =  currentUser && true;
   const dispatch = useDispatch();
   const bookedUsers = selectedRoom.bookedLeaseeIds;
   
   function _onReady(event) { event.target.pauseVideo();}
   const moviePlayOptions = {
      height: '250',
      width: '100%',
      top : "50",
      playerVars: {
          autoplay: 1
      }
      }

   return (
     <div className="room-view-modal-overlay">
       <div className="room-view-modal">
         <div className="room-view-modal-header">
            <div className="modal-header-left">
               <Logo />
            </div>
            <div className="modal-header-middle">
            Room Details
            </div>
         
           <ActionButton
             color="close"
             position = "headerTopRight"
             size = "small"
             onClick={() =>
               dispatch(RoomManagementActions.setSelectedViewRoomId(null))
             }
           >
             <CloseIcon />
           </ActionButton>
         </div>
         <div className="trailer-container">
            <Youtube
               videoId={selectedRoom.features.properties.trailerURL.split("?v=")[1]}
               opts={moviePlayOptions}
               onReady={_onReady}
               />
         </div>
         <div className="stats-container">
            <h2>{`$ ${selectedRoom.features.properties.Cost}`}</h2>
            <h2>{`Applications : ${selectedRoom.features.properties.applications}`}</h2>
            <h2>{`Capacity : ${selectedRoom.features.properties.MaxCapacity}`}</h2>
         </div>
         <div className="address-container">
            <h2>{selectedRoom.features.properties.NAME}</h2>
         </div>
         <div className = "room-desc-container">
            <img src={selectedRoom.features.properties.Image} className = "room-img" />
             <p className = "modal-view-room-desc">{selectedRoom.features.properties.DESCRIPTION}</p>
         </div>
         <div className = "room-view-modal-owner-container">
            <h2 className = "modal-owner-name">{`Lessor name : ${selectedRoom.ownerId.name}`}</h2>
         </div>
        <div className="room-view-button-container">
             {false ? (<Button variant="contained" color="secondary" size="small" sx ={{m:5}}>
               Cancel Booking
             </Button>)
              : (<Button variant="contained" color="primary" size="small" sx ={{m:5}}>
              Make Booking
            </Button>)}

            <Button variant="contained" color="primary" size="small" sx ={{m:5}}>
               Contact Owner
            </Button>
        </div>
       </div>
     </div>
   );
}
 
export default RoomViewModal;