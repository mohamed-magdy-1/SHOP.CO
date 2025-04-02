
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// import Alert from "./components/alert/Alert";
import Header from "./components/header/Header";
import Footer from "./footer/footer";
import { UserDataProvider } from "./context/userContext.jsx";
import { ToastContainer} from 'react-toastify';
import GTMProvider from "./components/GTMProvider";
import CartNumProvider from "./context/cartNun";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};






export default function RootLayout({ children }) {




  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CartNumProvider>
        <UserDataProvider>
          <Header />
          <GTMProvider /> 
          {children}
          <Footer/>
        </UserDataProvider>
        </CartNumProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
