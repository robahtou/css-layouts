import type { Metadata } from 'next';
import './resets.css';
import './global.css';


const metadata: Metadata = {
  title: "Layouts with CSS Grids"
};

function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
          {children}
      </body>
    </html>
  );
}


export { metadata };
export default RootLayout;
