import type { Metadata } from 'next';

import '../assets/styles/resets.css';
// import '../assets/styles/global.css';
import '../assets/styles/base.css';
import '../assets/styles/utilities.css';
import '../assets/styles/layouts.css';
import '../assets/styles/dashboard.css';


const metadata: Metadata = {
  title: 'Layouts with CSS Grids'
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
