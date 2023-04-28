import Sidebar from "@/components/layouts/sidebar";
import Main from "@/components/layouts/main";
import Navbar from "@/components/layouts/navbar";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function Layouts({ children }: Props) {
  return (
    <div className="bg-primary pt-1 pb-10 md:pl-2 ">
      {/* <Navbar/> */}
      <Sidebar></Sidebar>
      <Main>{children}</Main>
    </div>
  );
}
