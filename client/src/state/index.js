import {createSlice} from "@reduxjs/toolkit"
const initialState={
    mode:"dark",
    name:null,
    posts:[],
    token:"null",
    user:"null",
    friendDetails:[],
    chatName:[],
    allChats:[]
};
export const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
    setMode:(state)=>{
      state.mode=state.mode==="dark"?"light":"dark";
    },
    setLogin:(state,action)=>{
        state.user=action.payload.user;
        state.token=action.payload.token;
    },
    setLogout:(state)=>{
        state.user=null;
        state.token=null;
        state.allChats=[null];
        
    },
    setFriends:(state,action)=>{
        if(state.user){
            state.user.friends=action.payload.friends;
        }else{
            console.error("No user found")
        }
    },
    setPosts:(state,action)=>{
         state.posts=action.payload.posts;
    },
    setPost:(state,action)=>{
        const updatedPost=state.posts.map((post)=>{
            if(post._id===action.payload.post._id){
                return action.payload.post;
            }else{
                return post;
            }
        })
        state.posts=updatedPost;
    },setFriendsDetails:(state,action)=>{
        state.friendDetails=action.payload.details;
    },
    setChatName:(state,action)=>{
        state.chatName=action.payload.chatName;
    },
    setAllChats:(state,action)=>{
        state.allChats=action.payload.allChats
    }
}
})
export const {setMode,setLogin,setLogout,setPost,setPosts,setFriends,setFriendsDetails,setChatName,setAllChats}=authSlice.actions;
export default authSlice;