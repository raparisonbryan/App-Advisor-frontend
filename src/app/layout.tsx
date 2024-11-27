import Header from "@/components/Organisms/Header/Header";
import "./globals.scss";
import "@/styles/index.scss";
import { ThemeProvider } from 'next-themes';
import { AuthProvider } from "@/context/AuthContext";
import {ReactNode} from "react";

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
    <html lang="fr">
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem >
          <AuthProvider>
            <Header />
            {props.children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

export default RootLayout;

