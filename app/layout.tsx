import type { Metadata } from "next";
import { Inter, Lato } from "next/font/google";
import "./ui/globals.css";

const inter = Inter({ subsets: ["latin"] });

const lato = Lato({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Student Portal",
  description: "Omnisift Assestment",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={lato.className}>{children}</body>
    </html>
  );
}
