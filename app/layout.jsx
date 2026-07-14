import { Urbanist } from "next/font/google";
import "./globals.css";

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Avenore Architecture — Beyond Architecture. Creating Experiences.",
  description:
    "Avenore Architecture is an award-winning studio crafting iconic spaces that blend artistry with precision. Explore our portfolio of featured projects.",
  keywords: ["architecture", "design", "firm", "portfolio", "modern architecture"],
  openGraph: {
    title: "Avenore Architecture",
    description: "Beyond Architecture. Creating Experiences.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${urbanist.variable} antialiased`}
      cz-shortcut-listen="true"
    >
      <body className="min-h-screen bg-black text-white overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
