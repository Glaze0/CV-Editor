
import {
  Card,
  CardContent,
  CardDescription,
  
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Input } from "../ui/input"

const Upload = () => {
  return (
    <Card className="w-4/5 flex justify-center height-2/3 pb-20">
      <CardHeader>
        <CardTitle>Upload your CV</CardTitle>
        <CardDescription>
          Upload your CV in PDF or Document format to get started.
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col items-center">
        <Input type="file" accept=".pdf,.docx" className="w-full"  />
      </CardContent>
      
    </Card>
  )
}

export default Upload
