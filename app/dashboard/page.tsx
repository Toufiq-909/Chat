"use client";
import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarInput,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { api } from "@/convex/_generated/api"
import { useMutation, useQuery } from "convex/react"
import { useEffect,useState } from "react";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler"
import { Send, Trash2 } from "lucide-react";
import { useChatStore } from "@/stores/chatstore";
import Chat from "@/app/chat/page";
import { AvatarCircles } from "@/components/ui/avatar-circles";
import { useUser } from "@clerk/clerk-react";
import { useRouter } from "next/navigation"
import { useIsMobile } from "@/hooks/use-mobile"
const data = {
  navMain: [
   {
      title: "Chats",
      url: "",
      icon: Send,
      isActive: true,
    },
    {
      title: "Drafts",
      url: "",
      icon: File,
      isActive: false,
    },
    ,
    
    {
      title: "Trash",
      url: "",
      icon: Trash2,
      isActive: false,
    },
  ],
  
}
export default function DashBoard() {
  let user=useUser()
  const router = useRouter();
  let mobile=useIsMobile();
  let addUser=useMutation(api.user.createUser)
 let setSelectedUser=useChatStore((state)=>state.setSelectedUser)
  let selecteduser=useChatStore((state)=>state.selectedUser)
  let chats=useQuery(api.chat.getChats,{username:String(user.user?.username??"")})
  useEffect(()=>{
    addUser()
  },[])

  useEffect(()=>{
    if(selecteduser.username.length>0 && mobile)
    {
      router.push("/chat")
    }

  },[selecteduser])
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "350px",
        } as React.CSSProperties
      }
    >
      <AppSidebar />
      <SidebarInset>
        
      <div className="hidden md:block ">
<div className={"flex justify-between items-center mr-4"}>
          <header className="bg-background sticky top-0 flex shrink-0 items-center gap-2  p-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
               
              </BreadcrumbItem>
          
              <BreadcrumbItem>
                <BreadcrumbPage>Messages</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
        </header>
        <div className={""}>
            <AnimatedThemeToggler />
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-4 p-4">
{
  selecteduser.username.length>0 &&
 <div>
   <button className={"btn"}>asdf</button>
  <Chat/>
  </div>
}
          {Array.from({ length: 24 }).map((_, index) => (
            <div
              key={index}
              className="bg-muted/50 aspect-video h-12 w-full rounded-lg"
            />
          ))}
        </div>
      </div>
      <div className="block md:hidden">
        <div className={"flex justify-between items-center mr-4"}>
          <header className="bg-background sticky top-0 flex shrink-0 items-center gap-2  p-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
             
          
              <BreadcrumbItem>
                <BreadcrumbPage>Messages</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
        </header>
        <div className={""}>
            <AnimatedThemeToggler />
          </div>
        </div>
        
        <SidebarInput  className={"mt-4 ml-4 flex justify-center w-[80%]"} placeholder="Type to search..." />
 <SidebarContent>
          <SidebarGroup className="px-0">
            <SidebarGroupContent>
                        {chats?.map((el) => {
           
                                     let time=new Date(parseInt(el.msg?.timestamp)).toLocaleString("en-IN",{dateStyle:"short",timeStyle:"short"})
                                     if(time=="Invalid Date")
                                     {
                                       time=""
                                     }
           
           
           return (
             <div tabIndex={0} className={"flex items-center m-1 cursor-pointer rounded-sm bg-red900 h-[70px] mt-4 focus:bg-neutral-200 dark:focus:bg-neutral-800  hover:bg-neutral-200 dark:hover:bg-neutral-800"}
                                            onClick={()=>{
                                              setSelectedUser({username:el.name,img:el.img??"",chatid:el.chatid??""
                                              })
                                            }}>
                                  
                                              <AvatarCircles className={"mr-4 ml-2 "}
                                    numPeople={0}
                                    avatarUrls={[
                                      {
                                        imageUrl: el.img??"",
                                        profileUrl: "",
                                      },
                                    ]}
                                  />
                                  
                                            <div className={"bg-red900 w-[100%]"}>
                     
                                                 <div className={"flex bg-red900 justify-between w-[100%]"}>
                                           <p>{el.name}</p>
                                           <p className={"mr-4"}>{time}</p>
                                          </div>
                                          
                                          <p>{el.msg?.msg}</p>
                     
                                            </div>
                                      
                                          </div>
           )
           
           
           
           
           
                                   }
                                  
                                   )}
                       </SidebarGroupContent>
          </SidebarGroup>
     
        </SidebarContent>
      </div>
        
      </SidebarInset>
    </SidebarProvider>
  )
}


