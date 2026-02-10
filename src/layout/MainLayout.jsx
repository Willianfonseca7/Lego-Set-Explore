import Header from '../components/MainLayoutComponents/Header.jsx'
import Footer from '../components/MainLayoutComponents/Footer.jsx'

export default function MainLayout({ children }) {
    
    return (
      <>
      <main>
        <Header />
        {children}
        <Footer />
      </main>
    </>
    );
  }