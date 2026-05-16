"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MarqueeRibbon from "@/components/MarqueeRibbon";
import PageWrapper from "@/components/PageWrapper";
import AdminQuickAccess from "@/components/admin/AdminQuickAccess";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <MarqueeRibbon
        text="Surely We have made this Quran easy to learn, so is there anyone who would understand! (Al-Quran 54:17,22,32,40)"
        fontSize="0.875rem"
        fontWeight="normal"
        textColor="var(--color-primary)"
        bgColor="var(--color-tertiary)"
        gap="16rem"
        padding="0.5rem"
        speed={30}
        separator=""
      />
      <Navbar />
      <PageWrapper>{children}</PageWrapper>
      <Footer />
      <AdminQuickAccess />
    </>
  );
}