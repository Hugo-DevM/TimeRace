// import { Geist, Geist_Mono, Space Grotesk } from "next/font/google";
import "./globals.css";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });
// className={`${geistSans.variable} ${geistMono.variable}`}
export const metadata = {
  title: "TimeRace",
  description: "Sistema de gestion de carreras para LICIBA",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        {children}
      </body>
    </html>
  );
}
