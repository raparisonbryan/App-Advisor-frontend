import Header from "@/components/Organisms/Header/Header";
import "./globals.scss";
import "@/styles/index.scss";
import { ThemeProvider } from 'next-themes';
import AppProvider from "@/providers/providers";
import {ReactNode} from "react";
import Chatbot from "@/components/Organisms/Chatbot/Chatbot";

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
            <AppProvider>
                <Header />
                {props.children}
                <Chatbot />
            </AppProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

export default RootLayout;

