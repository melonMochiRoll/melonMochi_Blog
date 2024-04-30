import '@/App/globals.css';
import { Metadata } from "next";
import Footer from '@/App/_components/Footer';

export const metadata: Metadata = {
  title: 'Dev Blog',
  description: '',
};

type TRootLayoutProps = {
  children: React.ReactNode,
};

export default function RootLayout({
  children,
}: TRootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <div className='main'>
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
};