import { Inter } from "next/font/google";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { SessionProvider } from "@/utils/session";
import { HeaderProvider } from "@/utils/header";
import { ToastProvider } from "@/utils/toast";

import RootLayout from "./components/RootLayout";

const inter = Inter({ subsets: ["latin"] });

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} style={{margin: 0}}>
        <HeaderProvider>
          <SessionProvider>
            <ToastProvider>
              <RootLayout>{children}</RootLayout>
            </ToastProvider>
          </SessionProvider>
        </HeaderProvider>
      </body>
    </html>
  );
}
