import '@/App/globals.css';
import { Metadata } from "next";
import { ThemeProvider } from 'next-themes';
import Footer from '@/App/_components/Footer';
import Navigator from '@/App/_components/Navigator';
import { blogBaseURL, blogDescription, blogName } from '@/Lib/const';

export const metadata: Metadata = {
  metadataBase: new URL(blogBaseURL),
  title: blogName,
  description: blogDescription,
  openGraph: {
    title: blogName,
    description: blogDescription,
    images: [ `${blogBaseURL}/images/main_bg.jpg`],
    type: 'website',
  },
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
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GA_ID}`} />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag() {
                dataLayer.push(arguments)
              }
              gtag('js', new Date());

              gtag('config', ${process.env.GA_ID});
            `
          }}>
        </script>
      </head>
      <body
        suppressHydrationWarning={true}>
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