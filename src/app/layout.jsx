import './globals.css';
import { Josefin_Sans } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const josefin = Josefin_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
});

export const metadata = {
  title: 'Wonderlast',
  description: 'A dream travel agency',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en' suppressHydrationWarning className={josefin.className}>
      <body className='flex min-h-screen flex-col antialiased bg-gray-50'>
        <header className='fixed top-0 left-0 right-0 z-50'>
          <Navbar />
        </header>

        <main className='grow pt-20'>
          <div className='max-w-7xl mx-auto px-6 md:px-8'>{children}</div>
        </main>

        <Footer />
        <ToastContainer position='top-right' autoClose={2000} />
      </body>
    </html>
  );
}
