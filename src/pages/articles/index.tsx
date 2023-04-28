import React from "react";
import FormCollapse from "@/components/articles/form";
import Layouts from "../layouts";
import Tables from "@/components/articles/tables";
import Head from "next/head";

export default function Articles() {
  return (
    <>
    <Head>
        <title>Login | My App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    <Layouts>
      <FormCollapse />
      <Tables/>
    </Layouts>
</>

  );
}
