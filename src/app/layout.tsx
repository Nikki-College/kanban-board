import "./globals.css";
import type { Metadata } from "next";
import ProviderWrapper from "@/redux/ProviderWrapper";

export const metadata: Metadata = {
  title: "Kanban App",
  description: "Your Kanban board",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ProviderWrapper>{children}</ProviderWrapper>
      </body>
    </html>
  );
}
