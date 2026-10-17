import React, { useState } from 'react';
import { PhotoProvider } from './context/PhotoContext';
import { FloatingParticles } from './components/FloatingParticles';
import { SurpriseEntrance } from './components/SurpriseEntrance';
import { TopBar } from './components/TopBar';
import { HeroSection } from './components/HeroSection';
import { GallerySection } from './components/GallerySection';
import { SpecialReasonsSection } from './components/SpecialReasonsSection';
import { StoryTimelineSection } from './components/StoryTimelineSection';
import { BirthdayCakeInteractive } from './components/BirthdayCakeInteractive';
import { BirthdayLetterSection } from './components/BirthdayLetterSection';
import { Footer } from './components/Footer';
import { PhotoManagerModal } from './components/PhotoManagerModal';
import { PhotoSetupBanner } from './components/PhotoSetupBanner';

export default function App() {
  const [hasOpenedSurprise, setHasOpenedSurprise] = useState(false);

  const scrollToGallery = () => {
    const el = document.getElementById('gallery');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToLetter = () => {
    const el = document.getElementById('letter');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <PhotoProvider>
      <div className="min-h-screen bg-[#110615] text-[#fbf6f3] relative selection:bg-rose-500/30 selection:text-white overflow-x-hidden">
        {/* Floating golden particles & hearts */}
        <FloatingParticles />

        {/* Section 1: Surprise Entrance Overlay */}
        {!hasOpenedSurprise && (
          <SurpriseEntrance onOpen={() => setHasOpenedSurprise(true)} />
        )}

        {/* Main Experience */}
        <div
          className={`transition-opacity duration-1000 ${
            hasOpenedSurprise ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <TopBar onReadLetter={scrollToLetter} />

          <main>
            {/* Section 2: The Birthday Hero */}
            <HeroSection
              onExploreGallery={scrollToGallery}
              onReadLetter={scrollToLetter}
            />

            {/* Section 3: A Gallery of Her Beautiful Moments */}
            <GallerySection />

            {/* Section 4: Reasons Why You Are Special */}
            <SpecialReasonsSection />

            {/* Section 5: Our Little Love Story */}
            <StoryTimelineSection />

            {/* Interactive Birthday Cake & Wish */}
            <BirthdayCakeInteractive />

            {/* Section 6: My Birthday Letter to You */}
            <BirthdayLetterSection />
          </main>

          <Footer />

          {/* Photo Management & Setup Modal */}
          <PhotoManagerModal />
        </div>

        {/* 1-Click Photo Upload Banner for Amol */}
        <PhotoSetupBanner />
      </div>
    </PhotoProvider>
  );
}
