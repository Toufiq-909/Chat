"use client";
import {
  Authenticated,
  Unauthenticated,
} from "convex/react";
import NavBar from "@/components/resizable-navbar"
import World from "@/components/world-map-demo";
import DashBoard from "./dashboard/page";
import {create} from "zustand"
export default function Home() {


  return (
    <>
        <Authenticated>
          <DashBoard/>      
        </Authenticated>
        <Unauthenticated>  
          <NavBar/>
          <World/>
        </Unauthenticated>
      
    </>
  );
}










