import React, { useEffect, useState, useMemo, useContext } from "react";
import { Container } from '@mui/material';
import testimonialsDataBilingual from "../../data/testimonialsData.json";
import { LanguageContext } from '../../context/LanguageContext';
import { ThemeContext } from '../../context/ThemeContext';
import { translations } from '../../translations/translations';

const gradientBg =
  "linear-gradient(to bottom, #00d2ff 0%, #3a7bd5 100%)";

const itemsPerSlide = 3;

export default function TestimonialsSection() {
  // currentIndex = index of the FIRST visible card
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredCardIndex, setHoveredCardIndex] = useState(null);
  const { language } = useContext(LanguageContext);
  const { darkMode } = useContext(ThemeContext);

  const testimonials = testimonialsDataBilingual[language];
  const t = translations[language].homepage;

  const total = testimonials.length;

  // Builds the 3 visible cards from the current index
  const visibleTestimonials = useMemo(() => {
    if (total === 0) return [];

    const result = [];
    for (let i = 0; i < itemsPerSlide; i++) {
      const idx = (currentIndex + i) % total;
      result.push({ ...testimonials[idx], _originalIndex: idx });
    }
    return result;
  }, [currentIndex, total, testimonials]);

  // Auto-play: every 3s moves 1 position to the right (infinite loop)
  useEffect(() => {
    if (isHovered || total <= itemsPerSlide) return;

    const id = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
    }, 3000);

    return () => clearInterval(id);
  }, [isHovered, total]);

  const handleArrowPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  const handleArrowNext = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const handleCardEnter = (index) => {
    setIsHovered(true);
    setHoveredCardIndex(index); // 0, 1 or 2 (position within the slide)
  };

  const handleCardLeave = () => {
    setIsHovered(false);
    setHoveredCardIndex(null);
  };

  return (
    <section
      className="w-full py-20"
      style={{ 
        backgroundImage: gradientBg
      }}
    >
      <Container maxWidth="lg">
        <div className="text-center px-4">
          <h2 className="mt-2 section-title" style={{ color: darkMode ? '#f9fafb' : '#111827' }}>
            {t.testimonials}
          </h2>
          <p className="mt-3 subtitle max-w-2xl mx-auto" style={{ color: darkMode ? '#d1d5db' : '#4b5563' }}>
            {language === 'de' 
              ? 'Höre von glücklichen Eltern, Pädagogen und Schenkenden, die ToyTopia für Qualitätsspielzeug vertrauen'
              : 'Hear from happy parents, educators, and gift-givers who trust ToyTopia for quality toys'}
          </p>
        </div>

        {/* Main area with external arrows and cards */}
        <div className="relative mt-10 flex items-center justify-center gap-8 px-4">
        {/* Left Arrow (outside carousel) */}
        <button
          type="button"
          onClick={handleArrowPrev}
          className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md hover:shadow-lg hover:bg-gray-50 transition-all absolute left-0 -translate-x-6 top-1/2 -translate-y-1/2"
        >
          <span className="text-xl">&#8592;</span>
        </button>

        {/* Cards */}
        <div className="grid gap-6 md:grid-cols-3 w-full">
          {visibleTestimonials.map((t, index) => (
            <div
              key={t.name + t._originalIndex}
              onMouseEnter={() => handleCardEnter(index)}
              onMouseLeave={handleCardLeave}
              className="h-full transition-transform"
              style={{
                transform:
                  hoveredCardIndex === index ? "translateY(-4px)" : "none",
              }}
            >
              {/* Wrapper that becomes gradient border on hover */}
              <div
                className="rounded-2xl p-0.5 h-full transition-all"
                style={
                  hoveredCardIndex === index
                    ? { backgroundImage: gradientBg }
                    : { backgroundColor: "transparent" }
                }
              >
                {/* White card */}
                <div className="h-full rounded-2xl bg-white shadow-lg px-6 py-6 flex flex-col">
                  <div className="flex items-center gap-4">
                    <img
                      src={t.image}
                      alt={t.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="text-left">
                      <p className="font-semibold text-gray-900 text-sm md:text-base">
                        {t.name}
                      </p>
                      <p className="text-xs text-gray-500">{t.role}</p>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center gap-1 text-amber-400 text-sm">
                    {"★".repeat(t.rating)}
                    {"☆".repeat(5 - t.rating)}
                  </div>

                  <p className="mt-3 text-sm text-gray-700 text-left leading-relaxed">
                    {t.feedback}
                  </p>

                  <div className="mt-4 text-3xl text-emerald-400 text-left">
                    &ldquo;
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Arrow (outside carousel) */}
        <button
          type="button"
          onClick={handleArrowNext}
          className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white shadow-md hover:shadow-lg hover:bg-blue-700 transition-all absolute right-0 translate-x-6 top-1/2 -translate-y-1/2"
        >
          <span className="text-xl">&#8594;</span>
        </button>
      </div>

        {/* Dots – one per testimonial, marking the first visible */}
        <div className="mt-6 flex justify-center gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setCurrentIndex(index)}
              className={`h-2.5 rounded-full transition-all ${
                index === currentIndex
                  ? "w-7 bg-blue-500"
                  : "w-2 bg-gray-300"
              }`}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
