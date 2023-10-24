"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const NewIssuePage = () => {
  return (
    <div className="max-w-xl p-5 space-y-3">
      <Input type="text" placeholder="Title"></Input>
      <Textarea placeholder="Description"></Textarea>
      <Button>Submit New Issue</Button>
    </div>
  );
};

export default NewIssuePage;
