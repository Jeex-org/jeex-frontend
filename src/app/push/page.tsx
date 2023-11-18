import { Metadata } from "next";
import { PushLoader } from "@/features/push/PushLoader/PushLoader";

export const metadata: Metadata = {
  title: "Jeex rooms list",
  description: "...Description",
};

export default function PushPage() {
  return <PushLoader />;
}
