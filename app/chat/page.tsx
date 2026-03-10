"use client"
import { api } from "@/convex/_generated/api";
import { useChatStore } from "@/stores/chatstore";
import { useUser } from "@clerk/clerk-react";
import { useMutation, useAction, useQuery } from "convex/react";
import { useEffect, useState } from "react";
import { Id } from "@/convex/_generated/dataModel";

type conversation={name:string,msg:string,timestamp:string[],img:string,ai:string}
export default  function Chat()
{
  
     let createConnection=useMutation(api.chat.createChat)
     let sendMessage=useMutation(api.chat.createMessage)
     
        let userdetails=useUser();
    let selectedUser=useChatStore((state)=>state.selectedUser)
    let friends=useChatStore((state)=>state.friends)
    let addFriend=useChatStore((state)=>state.addFriend)
    let setselectedUser=useChatStore((state)=>state.setSelectedUser)
   let [messagetext,setmessagetext]=useState<string>("")
    let messages=useQuery(api.chat.getMessage,{chatid:selectedUser.chatid})
    
    useEffect(()=>{
        let Add=async ()=>{
           
    
        let participants=[String(userdetails.user?.username??""),String(selectedUser.username??"")].sort().join(",")
        console.log(participants)

        let response=await createConnection({participants})
       
        console.log("asdf"+response)
      
      setselectedUser({chatid:String(response??""),username:selectedUser.username,img:selectedUser.img
      })
      
      console.log("Sai ram")
        console.log(selectedUser)
        addFriend(selectedUser)
        console.log(friends)//assuming  it gets updated
    
    
        }
        Add()
    }
        ,[])
    return(
        <div className={""}>
            {
                messages?.length==0 ?
                <div>

                  <input className={"input"} placeholder={"start Messsaging"} onChange={(e)=>{
                    setmessagetext(e.target.value)
                  }}/>
               <button className="btn btn-neutral join-item" onClick={async ()=>{
               
                  setmessagetext("");
                let msg={chatid:selectedUser.chatid,sender:String(userdetails.user?.username??""),msg:messagetext}
                await sendMessage(msg)
                
               

               }}>Send</button>

                    </div> :
                    <div>
                      {
                        messages?.map((el)=>{

                          
                          return(
                            <div>
                              {el.sender==userdetails.user?.username ?
                              <Sender ai={el.ai??""} name={el.sender} msg={el.msg} timestamp={new Date(parseInt(el.timestamp)).toLocaleString('en-IN',{timeStyle:"short"}).split(",")} img={userdetails.user.imageUrl}/>
                              :<Reciever ai={el.ai??""} name={el.sender} msg={el.msg} timestamp={new Date(parseInt(el.timestamp)).toLocaleString('en-IN',{timeStyle:"short"}).split(",")} img={selectedUser.img}/>
                              }
                             
                              </div>
                            
                          )
                        })
                      }
                       <input className={"input"} value={messagetext} placeholder={"start Messsaging"} onChange={(e)=>{
                    setmessagetext(e.target.value)
                  }}/>
               <button className="btn btn-neutral join-item" onClick={async ()=>{
               
                  setmessagetext("");
                let msg={chatid:selectedUser.chatid,sender:String(userdetails.user?.username??""),msg:messagetext}
                await sendMessage(msg)
               

               }}>Send</button>
                    </div>
            }
            

        </div>
    )
    
}


function Reciever({ai,name,msg,timestamp,img}:conversation)
{
  let date=new Date().toLocaleString("en-In").split(",")
  if(date[0]==timestamp[0])
  {
    timestamp.shift()
  }
    return(
        <div className="chat chat-start">
  <div className="chat-image avatar">
    <div className="w-10 rounded-full">
      <img
        alt="Tailwind CSS chat bubble component"
        src={img}
      />
    </div>
  </div>
  <div className="chat-header">
    {name}

  </div>
  <div className="chat-bubble">{msg}</div>
  <div className="chat-footer opacity-50">{timestamp}</div>
     

  
</div>
    )
}

function Sender({ai,name,msg,timestamp,img}:conversation)
{



const answerMatch = ai?.match(/Answer:\s*(\w+)/);
const confidenceMatch = ai?.match(/Confidence:\s*([\d.]+)/);

const answer = answerMatch ? answerMatch[1] : null;
const confidence = confidenceMatch ? parseFloat(confidenceMatch[1]) : null;


  let date=new Date().toLocaleString("en-In").split(",")
  if(date[0]==timestamp[0])
  {
    timestamp.shift()
  }
    return (
        
     <div>
             <div className="chat chat-end">
  <div className="chat-image avatar">
    <div className="w-10 rounded-full">
      <img
        alt="Tailwind CSS chat bubble component"
        src={img}
      />
    </div>
  </div>
  <div className="chat-header">
   
    <p className={""}>{name}</p>
  </div>
  <div className="chat-bubble">{msg}</div>
  <div className="chat-footer opacity-50">{timestamp}</div>
  

</div>
{
   answer && confidence && confidence>0.69 && confidence<0.80 &&
   <p className={"text-blue-500 text-lg font-bold text-center "}>{"This message might be AI generated"}</p>
}
{
  answer && confidence && confidence>=0.8 &&
   <p className={"text-red-600 text-lg font-bold text-center "}>{"This message is AI generated"}</p>
}
     </div>
      
    )
}
