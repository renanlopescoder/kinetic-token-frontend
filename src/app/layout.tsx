import './globals.css';
import Providers from '../components/Providers';
import { Navbar } from '@/components/Nav';


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers><Navbar />{children}</Providers>
      </body>
    </html>
  );
}
