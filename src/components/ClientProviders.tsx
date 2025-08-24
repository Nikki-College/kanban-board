"use client";

import ProviderWrapper from "@/redux/ProviderWrapper";
import { AuthProvider } from "@/context/AuthContext";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProviderWrapper>
      <AuthProvider>{children}</AuthProvider>
    </ProviderWrapper>
  );
}
