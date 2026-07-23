import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Panel del Cliente",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return children;
}
