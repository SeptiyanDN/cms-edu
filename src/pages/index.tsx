import React, { useEffect } from "react";
import Layouts from "./layouts";
import Dashboard from "@/components/dashboard";
import { useRouter } from "next/router";

export default function index() {

  return (
    <Layouts>
      <Dashboard></Dashboard>
    </Layouts>
  );
}
