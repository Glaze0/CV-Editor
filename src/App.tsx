import Upload from "./components/Frontend/Upload";
import Editor from "./components/Frontend/Editor";
import {
  Card,
  
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useState } from "react";
import { Button } from "./components/ui/button";


// import { Component } from './components/ui/sign-in-card-2'

function App() {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div className="w-screen flex justify-center align-middle mt-10">
      <Card className="w-3/5  h-auto ">
      <CardHeader>
        <CardTitle className="text-6xl flex justify-center pd-5">CV Editor</CardTitle>
        <CardDescription className="text-center text-lg">
          Edit your CV in real-time. Use the tools below to customize your CV.
        </CardDescription>
        </CardHeader>
        
          {isVisible === true ? (
        <CardContent className="uploader w-full flex-col items-center m-4 ">
          <Upload />
          <Button variant="ghost" className="z-10 relative bottom-18 left-4.5 " onClick={() => setIsVisible(false)}>Upload</Button>
        </CardContent>
      ) : (
        <CardContent className="">
          <Editor />
        </CardContent>
      )}
          
        

     </Card>
</div>
  )
}

export default App
