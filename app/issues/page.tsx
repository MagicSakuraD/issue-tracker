import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const IssuesPage = () => {
  return (
    <div>
      <Button>
        <Link href={"/issues/new"}> New Issue</Link>
      </Button>
    </div>
  );
};

export default IssuesPage;
