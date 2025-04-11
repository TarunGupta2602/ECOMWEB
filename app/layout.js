import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';

export const metadata = {
  title: 'E-commerce Store',
  description: 'Your one-stop shop for all your needs',
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <CartProvider>
            <Header />
            <main>{children}</main>
          </CartProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
