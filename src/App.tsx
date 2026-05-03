/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Navbar, Hero } from './components/LandingSections';
import { TemplateGallery, StepsSection, FeaturesSection } from './components/MainContent';
import { Testimonials, CTABanner, Footer, PricingSection } from './components/FooterAndCTA';
import { BiodataBuilder } from './components/BiodataBuilder';
import { AnimatePresence, motion } from 'motion/react';

export default function App() {
  const [view, setView] = useState<'home' | 'builder'>('home');
  const [template, setTemplate] = useState('Classic Minimalist');

  const startBuilding = (templateName: string = 'Classic Minimalist') => {
    setTemplate(templateName);
    setView('builder');
  };

  return (
    <div className="min-h-screen bg-surface selection:bg-primary selection:text-white">
      <AnimatePresence mode="wait">
        {view === 'home' ? (
          <motion.div 
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Navbar onCreate={() => startBuilding()} />
            <main>
              <Hero onCreate={() => startBuilding()} />
              <TemplateGallery onSelect={startBuilding} />
              <StepsSection />
              <FeaturesSection />
              <PricingSection />
              <Testimonials />
              <CTABanner onCreate={() => startBuilding()} />
            </main>
            <Footer />
          </motion.div>
        ) : (
          <motion.div 
            key="builder"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
          >
            <BiodataBuilder template={template} onBack={() => setView('home')} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

