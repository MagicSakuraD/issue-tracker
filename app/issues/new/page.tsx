"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller, set } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { createIssueSchema } from "../../validationSchema";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { z } from "zod";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { Spinner } from "@/components/ui/Spinner";

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });
  const router = useRouter();
  const [error, setError] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const onSubmit = handleSubmit(async (data) => {
    await fetch("/api/issues", {
      method: "POST",
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.ok) {
        router.push("/issues");
        setIsSubmitting(true);
      } else {
        setError("An error occurred");
        setIsSubmitting(false);
      }
    });
  });
  return (
    <div className="max-w-xl ">
      {error && (
        <Alert variant="destructive" className="">
          <ExclamationTriangleIcon className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <form className="p-5 space-y-3" onSubmit={onSubmit}>
        <Input type="text" placeholder="Title" {...register("title")}></Input>
        {<ErrorMessage>{errors.title?.message}</ErrorMessage>}
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field}></SimpleMDE>
          )}
        ></Controller>
        {<ErrorMessage>{errors.description?.message}</ErrorMessage>}
        <Button disabled={isSubmitting}>
          Submit New Issue
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
