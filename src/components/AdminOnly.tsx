"use client";

import { useRole } from "@/context/RoleContext";

export default function AdminOnly({
  children,
}: {
  children: React.ReactNode;
}) {
  const { role } = useRole();

  if (role !== "admin") return null;

  return <>{children}</>;
}