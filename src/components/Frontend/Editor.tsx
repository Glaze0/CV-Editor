import axios from "axios";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useFieldArray } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { Plus, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
  experience: z.array(z.string().min(2, {
    message: "Experience must be at least 2 characters.",
  })),
  education: z.array(z.string().min(2, {
    message: "Education must be at least 2 characters.",
  })),
  skills: z.array(z.string().min(2, {
    message: "Skills must be at least 2 characters.",
  })),
  summary: z.string().min(2, {
    message: "Summary must be at least 2 characters.",
  }),
})

function InputForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "John Doe",
      experience: ["Software Engineer at XYZ Corp."],
      education: ["B.Tech Computer Science"],
      skills: ["React", "Node.js", "TypeScript"],
      summary: "Experienced developer...",
    },
  })

  const {
    fields: experienceFields,
    append: appendExperience,
    remove: removeExperience,
  } = useFieldArray({
    control: form.control,
    name: "experience",
  })

  const {
    fields: educationFields,
    append: appendEducation,
    remove: removeEducation,
  } = useFieldArray({
    control: form.control,
    name: "education",
  })

  const {
    fields: skillsFields,
    append: appendSkill,
    remove: removeSkill,
  } = useFieldArray({
    control: form.control,
    name: "skills",
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast("You submitted the following values", {
      description: (
        <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  
  
    const saveResume = async () => {
      await axios.post("http://127.0.0.1:8000/save-resume", { form });
      alert("Resume saved!");
    };
  
    const downloadResume = () => {
      const blob = new Blob([JSON.stringify(form, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "resume.json";
      a.click();
    };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl className="w-3/5">
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Experience Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <FormLabel>Experience</FormLabel>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => appendExperience("")}
            >
              <Plus className="h-4 w-4 mr-1" />
              Add
            </Button>
          </div>
          {experienceFields.map((field, index) => (
            <FormField
              key={field.id}
              control={form.control}
              name={`experience.${index}`}
              render={({ field }) => (
                <FormItem>
                  <div className="flex w-full items-center gap-2">
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <Button variant="outline">Enhance With Ai</Button>
                    {experienceFields.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeExperience(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <FormDescription>
                    This include Your work Experience.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>

        {/* Education Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <FormLabel>Education</FormLabel>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => appendEducation("")}
            >
              <Plus className="h-4 w-4 mr-1" />
              Add
            </Button>
          </div>
          {educationFields.map((field, index) => (
            <FormField
              key={field.id}
              control={form.control}
              name={`education.${index}`}
              render={({ field }) => (
                <FormItem>
                  <div className="flex w-full items-center gap-2">
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <Button variant="outline">Enhance With Ai</Button>
                    {educationFields.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeEducation(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <FormDescription>
                    This include Your education History.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>

        {/* Skills Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <FormLabel>Skills</FormLabel>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => appendSkill("")}
            >
              <Plus className="h-4 w-4 mr-1" />
              Add
            </Button>
          </div>
          {skillsFields.map((field, index) => (
            <FormField
              key={field.id}
              control={form.control}
              name={`skills.${index}`}
              render={({ field }) => (
                <FormItem>
                  <div className="flex w-full items-center gap-2">
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <Button variant="outline">Enhance With Ai</Button>
                    {skillsFields.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeSkill(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <FormDescription>
                    These are your Skills.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>

        <FormField
          control={form.control}
          name="summary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Summary</FormLabel>
              <div className="flex w-full items-center gap-2">
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <Button variant="outline">Enhance With Ai</Button>
              </div>
              <FormDescription>
                This is the Summary.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-center">
          <Button onClick={saveResume} variant="outline" type="submit">Save</Button>
          <Button onClick={downloadResume} variant="outline">Download</Button>
        </div>
      </form>
    </Form>
  )
}

const Editor = () => {
  return (
    <Card className="w-4/5 flex justify-center">
      <CardHeader>
        <CardTitle>Edit Your Resume</CardTitle>
        <CardDescription>
          Edit your CV in real-time. Use the tools below to customize your CV
        </CardDescription>
      </CardHeader>
      <CardContent>
        <InputForm />
      </CardContent>
    </Card>
  )
}

export default Editor