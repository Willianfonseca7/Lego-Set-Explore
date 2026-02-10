import { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Container } from '@mui/material';
import HeroSection from '../components/HomePageComponents/sections/HeroSection';
import CategoryCards from '../components/HomePageComponents/sections/CategoryCardsSection';
import AgeCardsSection from '../components/HomePageComponents/sections/AgeCardsSection';
import TestimonialsSection from '../components/HomePageComponents/TestimonialsSection';
import { ThemeContext } from '../context/ThemeContext';

const Homepage = () => {
  const { darkMode } = useContext(ThemeContext);
  const location = useLocation();

  useEffect(() => {
    // Scroll to age-cards section if navigated with hash
    if (location && location.hash === '#age-cards') {
      const el = document.getElementById('age-cards');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [location]);
  
  return (
    <div style={{ backgroundColor: darkMode ? '#111827' : '#ffffff', minHeight: '100vh' }}>
      <HeroSection />
      <CategoryCards useNavigation={true} />
      <AgeCardsSection />
      <TestimonialsSection />
    </div>
  );
};

export default Homepage;
