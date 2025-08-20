import Header from "@/components/Organisms/Header/Header";
import "./globals.scss";
import "@/styles/index.scss";
import { ThemeProvider } from 'next-themes';
import AppProvider from "@/providers/providers";
import {ReactNode} from "react";
import Chatbot from "@/components/Organisms/Chatbot/Chatbot";
import Footer from "@/components/Organisms/Footer/Footer";
import {Theme} from "@radix-ui/themes";

export const metadata = {
  title: "App Advisor",
  description:
    "Site web pour trouver des avis et informations sur des applications informatiques",
};

export interface RootLayoutProps {
    children: ReactNode;
}

const RootLayout = (props: RootLayoutProps) => {

  return (
    <html lang="fr" suppressHydrationWarning={true}>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <Theme hasBackground={false}>
            <AppProvider>
                <Header />
                {props.children}
                {/* <Chatbot /> */}
                <Footer />
            </AppProvider>
            </Theme>
        </ThemeProvider>
      </body>
    </html>
  );
}

export default RootLayout;

