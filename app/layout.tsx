import '@/App/globals.css';
import { Metadata } from "next";
import { ThemeProvider } from 'next-themes';
import Footer from '@/App/_components/Footer';
import Navigator from '@/App/_components/Navigator';

export const metadata: Metadata = {
  title: "MelonMochi's Blog",
  description: '',
};

type TRootLayoutProps = {
  children: React.ReactNode,
  modal: React.ReactNode,
};

export default function RootLayout({
  children,
  modal,
}: TRootLayoutProps) {

  return (
    <html suppressHydrationWarning>
      <head>
        <meta name="google-site-verification" content={process.env.GOOGLE_SITE_VERIFICATION_CONTENT} />
      </head>
      <body>
        <div className='main'>
          <ThemeProvider
            enableSystem={false}>
            <Navigator />
            {children}
            {modal}
          </ThemeProvider>
          <Footer />
        </div>
      </body>
    </html>
  );
};