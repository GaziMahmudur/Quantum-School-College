import React, { useState } from 'react';
import { X, Play, MapPin, Eye, Compass, Shield, Award } from 'lucide-react';
import { Language } from '../types';

interface CampusTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const CampusTourModal: React.FC<CampusTourModalProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  const [activeSpot, setActiveSpot] = useState(0);

  if (!isOpen) return null;

  const tourSpots = [
    {
      title: 'Main Academic Building & Central Atrium',
      category: 'Architecture',
      image: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1200&q=80',
      description: 'A 6-story modern earthquake-resistant facility with natural light ventilation, elevators, and wide corridors.',
    },
    {
      title: 'Physics, Chemistry & Biology Labs',
      category: 'Laboratories',
      image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80',
      description: 'Individual work stations for 60 students per batch, fully certified for Cambridge & National Board standards.',
    },
    {
      title: 'Centennial Central Library & Reading Sanctuary',
      category: 'Research',
      image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1200&q=80',
      description: 'Over 25,000 academic titles, JSTOR subscriptions, quiet study pods, and high-speed research PCs.',
    },
    {
      title: 'Auditorium & Performing Arts Stage',
      category: 'Cultural Center',
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
      description: '750-seat acoustic auditorium hosting debate tournaments, annual drama, graduation convocations.',
    },
    {
      title: 'Sports Arena, Basketball Court & Turf',
      category: 'Athletics',
      image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80',
      description: 'International-standard synthetic surface for cricket nets, basketball, football, and track athletics.',
    },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-slate-900/75 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[92vh] flex flex-col border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-[#0b2545] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-cyan-300" />
            <h2 className="font-display font-bold text-base sm:text-lg text-white">
              {language === 'en' ? 'Campus Virtual Tour' : 'ক্যাম্পাস ভার্চুয়াল ট্যুর'}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Media Player Showcase */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="relative rounded-2xl overflow-hidden aspect-video bg-slate-900 shadow-md">
            <img
              src={tourSpots[activeSpot].image}
              alt={tourSpots[activeSpot].title}
              className="w-full h-full object-cover transition-all duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"></div>

            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#007A6E] text-white uppercase tracking-wider shadow-sm">
                {tourSpots[activeSpot].category}
              </span>
            </div>

            <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
              <h3 className="font-display font-extrabold text-xl sm:text-2xl text-white drop-shadow-md">
                {tourSpots[activeSpot].title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-200 drop-shadow max-w-2xl">
                {tourSpots[activeSpot].description}
              </p>
            </div>
          </div>

          {/* Location Spot Thumbnails */}
          <div>
            <h4 className="font-display font-bold text-sm text-[#0b2545] mb-3">
              {language === 'en' ? 'Explore by Zone' : 'জোন অনুযায়ী দেখুন'}
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {tourSpots.map((spot, index) => (
                <button
                  key={index}
                  onClick={() => setActiveSpot(index)}
                  className={`p-2 rounded-xl border text-left transition-all cursor-pointer ${
                    activeSpot === index
                      ? 'border-[#007A6E] bg-teal-50/50 ring-2 ring-[#007A6E]/30'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="h-16 rounded-lg overflow-hidden mb-1.5 bg-slate-100">
                    <img
                      src={spot.image}
                      alt={spot.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="text-[11px] font-bold text-[#0b2545] truncate">
                    {spot.title}
                  </div>
                  <div className="text-[10px] text-slate-500">
                    {spot.category}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <MapPin className="w-4 h-4 text-[#007A6E]" />
            <span>Plot 18, Road 7, Sector 4, Uttara, Dhaka-1230</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#0b2545] hover:bg-[#134074] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Close Tour
          </button>
        </div>
      </div>
    </div>
  );
};
