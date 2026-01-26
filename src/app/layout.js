import Footer from "@/components/Footer";
import "./globals.css";
import Navbar from "@/components/Navbar";
import PageWrapper from "@/components/PageWrapper";
import { Poppins } from "next/font/google";
import MarqueeRibbon from "@/components/MarqueeRibbon";
import { AuthProvider } from "@/contexts/AuthContext";
import { Analytics } from "@vercel/analytics/next";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Learning Souls",
  description:
    "Empowering people with correct knowledge through enlightening education and charitable works",
  icons: {
    icon: [
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon/favicon.ico" },
    ],
    apple: [
      {
        url: "/favicon/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <AuthProvider>
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
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  );
}
