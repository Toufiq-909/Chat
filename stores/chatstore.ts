import { create } from "zustand"

type Friends={
  chatid:string,
  username:string,
  img:string
}
type store={
  friends:Friends[]
  selectedUser:Friends
  setSelectedUser:(name:Friends)=>void,
  addFriend:(user:Friends)=>void
}
 export const useChatStore=create<store>((set)=>({
    friends:[],
    selectedUser:{
        chatid: "",
        username: "",
        img: ""
    },
    setSelectedUser:(name)=>{
      set({selectedUser:name})
     
    },
    addFriend:(user)=>{
      set((state)=>({
      
        friends:[...state.friends,user]
      })
    )}
    

     

   
    
   
    
  }))