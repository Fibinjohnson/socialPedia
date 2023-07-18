import { Box,Typography,useTheme } from "@mui/material"
import Friend from "components/Friend"
import SugggestedFriends from "components/SugggestedFriends"
import { useDispatch,useSelector } from "react-redux"
import { useEffect } from "react"
import { setFriends } from "state"
import{setFriendsDetails} from "state"
import WidgetWrap from "components/WidgetWrap"
function FriendListWidget({userId}) {
    const {palette}=useTheme();
    const dispatch=useDispatch()
    const token=useSelector((state)=>state.token)
    console.log(token,"token")
    const friends=useSelector((state)=>state.user)
    const friendDetails=useSelector((state)=>state.friendDetails)
    const getFriends=async()=>{
        const response= await fetch(`http://localhost:3001/users/${userId}/friends`,{
            method:"GET",
            headers: {Authorization:`Bearer ${token}`}
        })
        const data= await response.json();
        dispatch(setFriendsDetails({details:data}))
       
    }
    useEffect(()=>{
      getFriends()
    },[])
  return (
    <>
   <WidgetWrap>
    <Typography color={palette.neutral.dark}
    variant="h5"
    fontWeight={"500"}
    sx={{mb:"1.5rem"}}
    >
      Your Friends 
      

    </Typography>
    <Box display={"flex" } flexDirection={"column"} gap="1.5rem"> 
    {friendDetails.map((friend)=>
        <Friend key={friend._id} friendId={friend._id} name={`${friend.firstname} ${friend.lastname}`} userPicturePath={friend.picture} subtitle={friend.occupation}/> 
    )

    }
    </Box>
   </WidgetWrap>
   <SugggestedFriends></SugggestedFriends>
   </>
   
  )
}

export default FriendListWidget