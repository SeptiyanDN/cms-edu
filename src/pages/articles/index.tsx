import React from "react";
import FormCollapse from "@/components/articles/form";
import Layouts from "../layouts";
import Tables from "@/components/articles/tables";

export default function Articles() {
  return (
    <Layouts>
      <FormCollapse />
      <Tables/>
    </Layouts>
  );
}
