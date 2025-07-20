import { useState } from "react";
import ContentCreationForm from "../components/postInput"; 
import Navbar from "../components/navbar"

export default function Feed (){
    return(
        <>
        <Navbar />
        <ContentCreationForm />
        </>
    )
}