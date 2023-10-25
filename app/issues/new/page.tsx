"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { useRouter } from "next/navigation";

import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const { register, control, handleSubmit } = useForm<IssueForm>();
  const router = useRouter();
  const [error, setError] = React.useState("");
  return (
    <div className="max-w-xl ">
      {error && (
        <Alert variant="destructive">
          <ExclamationTriangleIcon className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <form
        className="p-5 space-y-3"
        onSubmit={handleSubmit(async (data) => {
          await fetch("/api/issues", {
            method: "POST",
            body: JSON.stringify(data),
          }).then((res) => {
            if (res.ok) {
              router.push("/issues");
            } else {
              setError("An unexpected error occurred.");
            }
          });
        })}
      >
        <Input type="text" placeholder="Title" {...register("title")}></Input>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field}></SimpleMDE>
          )}
        ></Controller>

        <Button>Submit New Issue</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
