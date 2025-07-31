import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar.jsx';
import Footer from '@/components/Footer.jsx';
import Providers from '@/components/Providers.jsx';
import { getServerSession } from 'next-auth';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'LearnHub - Online Learning Platform',
  description: 'Learn new skills online with expert instructors. Browse courses in programming, design, marketing, and more.',
};

export default async function RootLayout({ children }) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers session={session}>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
} 