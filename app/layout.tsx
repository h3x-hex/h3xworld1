import "styles/globals.css";

import { Inter } from "next/font/google";
import { AuthContextProvider } from "context/AuthContext";


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});



export const metadata = {
  title: "h3x|World",
  description: "Social Media for h3xav3rse",
  icons: [{ rel: "icon", url: "/public/images/logo.png" }],
  
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    
    <html lang="en">
      <body className={`font-sans ${inter.variable} bg-zinc-950`}>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,1,-50..200" />
        <AuthContextProvider>
          <div className="bg-zinc-950">
          {children}
          </div>
        </AuthContextProvider>
      </body>
    </html>
  );
}
