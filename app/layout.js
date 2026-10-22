
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "NexaBank | Digital Banking Demo",
  description:
    "A responsive digital banking dashboard built with Next.js and React.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
