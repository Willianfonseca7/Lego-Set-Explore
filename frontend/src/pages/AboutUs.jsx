import { useContext } from 'react';
import { Container } from '@mui/material';
import { ThemeContext } from '../context/ThemeContext';
import { LanguageContext } from '../context/LanguageContext';
import aboutDataBilingual from '../data/aboutData.json';

const AboutUs = () => {
  const { darkMode } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);
  
  const data = aboutDataBilingual[language];
  const gradientBg = "linear-gradient(to bottom, #00d2ff 0%, #3a7bd5 100%)";
  const heroTextShadow = "0 2px 12px rgba(0,0,0,0.25)";
  
  return (
    <div style={{ backgroundColor: darkMode ? '#111827' : '#ffffff', minHeight: '100vh' }}>
      {/* Hero Section */}
      <section 
        style={{
          padding: '5rem 1rem',
          background: gradientBg
        }}
      >
        <Container maxWidth="lg">
          <div className="text-center">
          <h1 className="hero-title" style={{ color: '#ffffff', textShadow: heroTextShadow }}>
            <span style={{ color: '#2563eb' }}>Toy</span><span style={{ color: '#0d7f44' }}>Topia</span>
          </h1>
          <p className="subtitle-large" style={{ color: '#0f172a', maxWidth: '48rem', margin: '0 auto', textShadow: '0 1px 8px rgba(0,0,0,0.12)' }}>
            {data.hero.subtitle}
          </p>
          </div>
        </Container>
      </section>

      {/* Our Story Section */}
      <section style={{ padding: '4rem 1rem', backgroundColor: darkMode ? '#111827' : '#ffffff' }}>
        <Container maxWidth="lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 style={{ color: darkMode ? '#ffffff' : '#111827' }}>
                {data.ourStory.title}
              </h2>
              {data.ourStory.paragraphs.map((paragraph, index) => (
                <p key={index} className="subtitle" style={{ color: darkMode ? '#d1d5db' : '#4b5563', marginBottom: '1rem' }}>
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img 
                src={data.ourStory.imageUrl}
                alt={data.ourStory.imageAlt}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Our Values Section */}
      <section style={{ padding: '4rem 1rem', backgroundColor: darkMode ? '#1f2937' : '#f9fafb' }}>
        <Container maxWidth="lg">
          <h2 className="text-center" style={{ color: darkMode ? '#ffffff' : '#111827', marginBottom: '4rem' }}>
            {data.coreValues.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {data.coreValues.values.map((value, index) => {
              const iconColors = [
                { bg: darkMode ? '#1e3a8a' : '#dbeafe', text: darkMode ? '#60a5fa' : '#2563eb' },
                { bg: darkMode ? '#14532d' : '#d1fae5', text: darkMode ? '#4ade80' : '#16a34a' },
                { bg: darkMode ? '#581c87' : '#f3e8ff', text: darkMode ? '#c084fc' : '#9333ea' }
              ];
              const iconPaths = {
                star: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z",
                lock: "M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z",
                lightbulb: "M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM15.657 14.243a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM11 17v-1a1 1 0 10-2 0v1a1 1 0 102 0zM5.757 15.657a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM2 10a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.757 5.757a1 1 0 000-1.414L5.05 3.636a1 1 0 10-1.414 1.414l.707.707zM10 7a3 3 0 100 6 3 3 0 000-6z"
              };
              
              return (
                <div key={index} style={{ backgroundColor: darkMode ? '#111827' : '#ffffff', borderRadius: '1rem', padding: '2rem', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', transition: 'box-shadow 0.3s' }}>
                  <div style={{ width: '3.5rem', height: '3.5rem', backgroundColor: iconColors[index].bg, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                    <svg style={{ width: '1.75rem', height: '1.75rem', color: iconColors[index].text }} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d={iconPaths[value.icon]} clipRule="evenodd"/>
                    </svg>
                  </div>
                  <h3 style={{ color: darkMode ? '#ffffff' : '#111827' }}>{value.title}</h3>
                  <p style={{ color: darkMode ? '#d1d5db' : '#4b5563' }}>
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Team Section */}
      <section style={{ padding: '4rem 1rem', backgroundColor: darkMode ? '#111827' : '#ffffff' }}>
        <Container maxWidth="lg">
          <h2 className="text-center" style={{ color: darkMode ? '#ffffff' : '#111827', marginBottom: '1rem' }}>
            {data.team.title}
          </h2>
          <p className="subtitle text-center" style={{ color: darkMode ? '#d1d5db' : '#4b5563', maxWidth: '48rem', margin: '0 auto 4rem' }}>
            {data.team.subtitle}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {data.team.members.map((member, index) => (
              <div key={index} className="text-center">
                <div className="rounded-2xl overflow-hidden mb-6 shadow-lg">
                  <img 
                    src={member.imageUrl}
                    alt={member.name}
                    className="w-full h-80 object-cover"
                  />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{member.name}</h3>
                <p className="text-blue-600 dark:text-blue-400 font-semibold mb-3">{member.role}</p>
                <p className="text-gray-600 dark:text-gray-300">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Stats Section */}
      <section style={{ padding: '4rem 1rem', background: 'linear-gradient(135deg, #00d2ff 0%, #3a7bd5 100%)' }}>
        <Container maxWidth="lg">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {data.stats.map((stat, index) => (
              <div key={index}>
                <div className="text-5xl font-bold text-white mb-2">{stat.value}</div>
                <p className="text-blue-100">{stat.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Mission Statement */}
      <section style={{ padding: '4rem 1rem', backgroundColor: darkMode ? '#1f2937' : '#f9fafb' }}>
        <Container maxWidth="lg">
          <div className="max-w-4xl mx-auto text-center">
          <h2 style={{ color: darkMode ? '#ffffff' : '#111827' }}>
            {data.mission.title}
          </h2>
          <p className="subtitle-large" style={{ color: darkMode ? '#d1d5db' : '#4b5563', marginBottom: '2rem' }}>
            {data.mission.description}
          </p>
          <div style={{ display: 'inline-block', backgroundColor: darkMode ? '#1e3a8a' : '#dbeafe', borderLeft: darkMode ? '4px solid #60a5fa' : '4px solid #2563eb', padding: '1.5rem', borderRadius: '0.25rem' }}>
            <p className="subtitle" style={{ fontWeight: '600', color: darkMode ? '#93c5fd' : '#1e3a8a' }}>
              "{data.mission.quote}"
            </p>
          </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default AboutUs;
