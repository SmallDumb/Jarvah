/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Facebook, Instagram, Heart } from 'lucide-react';

const IMAGES = [
  {
    url: 'input_file_18.png',
    title: 'Floral Bloom',
    description: 'A sweet smell of new beginnings amidst the roses.'
  },
  {
    url: 'input_file_19.png',
    title: 'Garden Grace',
    description: 'Breathing in the serenity of nature.'
  },
  {
    url: 'input_file_20.png',
    title: 'Sunflower Soul',
    description: 'Radiating warmth and joy like a summer day.'
  },
  {
    url: 'input_file_3.png',
    title: 'Vibrant Spirit',
    description: 'The essence of Jarvah captured in a smile.'
  },
  {
    url: 'input_file_0.png',
    title: 'Playful Heart',
    description: 'Finding joy in the little, sweet moments.'
  },
  {
    url: 'input_file_9.png',
    title: 'Warm Welcome',
    description: 'A friendly wave to a new covenant of life.'
  },
  {
    url: 'input_file_5.png',
    title: 'Quiet Reflection',
    description: 'Moments of peace and sweet stillness.'
  },
  {
    url: 'input_file_23.png',
    title: 'Daily Joy',
    description: 'Spreading a sweet aroma wherever I go.'
  }
];

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % IMAGES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + IMAGES.length) % IMAGES.length);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAutoPlaying) {
      interval = setInterval(nextSlide, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-purple-500/30">
      {/* Header */}
      <header className="pt-12 pb-8 text-center px-4">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-500 to-pink-500 drop-shadow-[0_0_15px_rgba(168,85,247,0.4)]"
        >
          Welcome to Jarvah
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-zinc-400 max-w-2xl mx-auto text-lg italic"
        >
          "Jarvah means new covenant — breathing; or making; a sweet smell"
        </motion.p>
      </header>

      {/* Carousel Section */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="relative group aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-3xl bg-zinc-900 shadow-2xl shadow-purple-500/10 border border-zinc-800">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <img
                src={IMAGES[currentIndex].url}
                alt={IMAGES[currentIndex].title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
              
              <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h2 className="text-3xl md:text-5xl font-bold mb-2">{IMAGES[currentIndex].title}</h2>
                  <p className="text-zinc-300 text-lg md:text-xl max-w-xl">{IMAGES[currentIndex].description}</p>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => { prevSlide(); setIsAutoPlaying(false); }}
              className="p-3 rounded-full bg-black/40 backdrop-blur-md border border-white/10 hover:bg-white/20 transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => { nextSlide(); setIsAutoPlaying(false); }}
              className="p-3 rounded-full bg-black/40 backdrop-blur-md border border-white/10 hover:bg-white/20 transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Progress Indicators */}
          <div className="absolute bottom-6 right-8 flex gap-2">
            {IMAGES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => { setCurrentIndex(idx); setIsAutoPlaying(false); }}
                className={`h-1.5 transition-all duration-300 rounded-full ${
                  idx === currentIndex ? 'w-8 bg-purple-500' : 'w-2 bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <section className="mt-24">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold tracking-tight">Gallery Collection</h2>
            <div className="h-px flex-1 bg-zinc-800 mx-8 hidden md:block" />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {IMAGES.map((img, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -8 }}
                className="group relative aspect-square overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800"
              >
                <img
                  src={img.url}
                  alt={img.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                  <h3 className="text-xl font-bold">{img.title}</h3>
                  <button className="mt-2 flex items-center gap-2 text-sm font-medium text-purple-400 hover:text-purple-300 transition-colors">
                    <Heart className="w-4 h-4" /> Like Image
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-24 py-16 border-t border-zinc-900 bg-zinc-950/50 backdrop-blur-sm text-center px-4">
        <div className="flex justify-center gap-6 mb-8">
          <motion.a
            whileHover={{ scale: 1.1, color: '#1877F2' }}
            href="https://www.facebook.com/reenalyn.habla#"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 transition-colors"
          >
            <Facebook className="w-6 h-6" />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.1, color: '#E4405F' }}
            href="https://www.instagram.com/jhrlyn11?fbclid=IwY2xjawQ69QFleHRuA2FlbQIxMABicmlkETFsTWgySzFkQTJlTElaOGlLc3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHnh4IpbvlXMS8pV4XP3wZ2-8yO4D-lA2muOL_FytfIAAzFnT1m-R-S4eezdI_aem_T5GRG6uI3rNqA1VE7ToADA"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 transition-colors"
          >
            <Instagram className="w-6 h-6" />
          </motion.a>
        </div>
        
        <p className="text-zinc-500 text-sm uppercase tracking-widest mb-2">Follow us on social media</p>
        <p className="text-zinc-400 max-w-md mx-auto mb-8">
          Jarvah: A new covenant. Breathing life and making a sweet smell in everything we do.
        </p>
        
        <div className="text-zinc-600 text-xs">
          &copy; {new Date().getFullYear()} Jarvah. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
