import React, { useState } from 'react';
import {
  Bell,
  Calendar,
  Download,
  ArrowRight,
  Clock,
  MapPin,
  X,
  FileText,
  Check,
} from 'lucide-react';
import { CIRCULAR_NOTICES, SCHOOL_EVENTS } from '../data/schoolData';
import { CircularNotice, Language, SchoolEvent } from '../types';

interface NoticesAndEventsProps {
  language: Language;
  onViewNotice: (notice: CircularNotice) => void;
}

export const NoticesAndEvents: React.FC<NoticesAndEventsProps> = ({
  language,
  onViewNotice,
}) => {
  const [filter, setFilter] = useState<'all' | 'school' | 'college'>('all');
  const [selectedEvent, setSelectedEvent] = useState<SchoolEvent | null>(null);
  const [rsvpSuccess, setRsvpSuccess] = useState(false);

  const filteredNotices = CIRCULAR_NOTICES.filter(
    (n) => filter === 'all' || n.section === filter || n.section === 'all'
  );

  const handleRsvp = () => {
    setRsvpSuccess(true);
    setTimeout(() => {
      setRsvpSuccess(false);
      setSelectedEvent(null);
    }, 2000);
  };

  return (
    <section id="notices" className="py-24 sm:py-32 lg:py-36 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Title and Filter Segmented Control */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16 lg:mb-20">
          <div>
            <span className="text-xs font-bold tracking-wider text-[#00a896] uppercase bg-teal-50 px-3 py-1 rounded-full border border-teal-200/60">
              {language === 'en' ? 'Stay Updated' : 'সর্বশেষ তথ্য'}
            </span>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#0b2545] tracking-tight mt-4">
              {language === 'en' ? 'School Notices & Upcoming Events' : 'বিদ্যালয়ের নোটিশ ও আসন্ন ইভেন্টস'}
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="inline-flex p-1.5 bg-slate-100 rounded-xl border border-slate-200 self-start sm:self-auto gap-1">
            <button
              onClick={() => setFilter('all')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                filter === 'all'
                  ? 'bg-white text-[#0b2545] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {language === 'en' ? 'All Notices' : 'সকল নোটিশ'}
            </button>
            <button
              onClick={() => setFilter('school')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                filter === 'school'
                  ? 'bg-white text-[#0b2545] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {language === 'en' ? 'School Section' : 'স্কুল শাখা'}
            </button>
            <button
              onClick={() => setFilter('college')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                filter === 'college'
                  ? 'bg-white text-[#0b2545] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {language === 'en' ? 'College Section' : 'কলেজ শাখা'}
            </button>
          </div>
        </div>

        {/* 2 Big Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {/* Left Card: Important Circulars */}
          <div className="bg-[#faf8ff] rounded-3xl border border-slate-200/90 p-8 sm:p-10 shadow-sm flex flex-col justify-between">
            <div>
              {/* Card Title */}
              <div className="flex items-center justify-between pb-6 border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-teal-50 text-[#00a896] border border-teal-200/60">
                    <Bell className="w-5 h-5" />
                  </div>
                  <h3 className="font-display font-bold text-xl text-[#0b2545]">
                    {language === 'en' ? 'Important Circulars' : 'জরুরী পরিপত্র ও নোটিশ'}
                  </h3>
                </div>

                <button
                  onClick={() => onViewNotice(CIRCULAR_NOTICES[0])}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#00a896] hover:text-[#008c7d] cursor-pointer"
                >
                  <span>{language === 'en' ? 'See All Notices' : 'সব নোটিশ দেখুন'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Notice Items List */}
              <div className="divide-y divide-slate-200/80">
                {filteredNotices.map((notice) => (
                  <div
                    key={notice.id}
                    onClick={() => onViewNotice(notice)}
                    className="py-5 flex items-start gap-4 sm:gap-5 group cursor-pointer hover:bg-white/80 -mx-3 px-3 rounded-xl transition-all"
                  >
                    {/* Date Block */}
                    <div className="w-14 h-14 rounded-xl bg-[#0b2545] text-white flex flex-col items-center justify-center shrink-0 shadow-2xs group-hover:bg-[#134074] transition-colors">
                      <span className="font-display font-extrabold text-base leading-none">
                        {notice.date}
                      </span>
                      <span className="text-[10px] font-semibold text-cyan-300 tracking-wider uppercase mt-0.5">
                        {notice.month}
                      </span>
                    </div>

                    {/* Notice details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider border ${notice.badgeColor}`}
                        >
                          {notice.badge}
                        </span>
                      </div>
                      <h4 className="font-display font-bold text-sm text-[#0b2545] leading-snug group-hover:text-[#00a896] transition-colors">
                        {notice.title}
                      </h4>
                      <p className="text-xs text-slate-600 line-clamp-2 mt-1 font-normal">
                        {notice.description}
                      </p>
                    </div>

                    {/* Action Icon */}
                    <div className="p-2 rounded-md text-slate-400 group-hover:text-[#00a896] group-hover:bg-teal-50 transition-colors shrink-0">
                      <Download className="w-4 h-4" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-slate-200/80 text-xs text-slate-500 text-center">
              Official BISE Dhaka Board verified circulars and institutional publications.
            </div>
          </div>

          {/* Right Card: Fun Upcoming Events */}
          <div className="bg-[#faf8ff] rounded-3xl border border-slate-200/90 p-8 sm:p-10 shadow-sm flex flex-col justify-between">
            <div>
              {/* Card Title */}
              <div className="flex items-center justify-between pb-6 border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-blue-50 text-blue-700 border border-blue-200/60">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <h3 className="font-display font-bold text-xl text-[#0b2545]">
                    {language === 'en' ? 'Fun Upcoming Events' : 'আসন্ন অনুষ্ঠান ও কার্যক্রম'}
                  </h3>
                </div>

                <span className="text-xs font-semibold text-slate-600 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-2xs">
                  Nov – Dec 2025
                </span>
              </div>

              {/* Event Items List */}
              <div className="space-y-5 pt-6">
                {SCHOOL_EVENTS.map((event) => (
                  <div
                    key={event.id}
                    onClick={() => setSelectedEvent(event)}
                    className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 hover:border-[#00a896]/50 hover:shadow-md transition-all cursor-pointer group"
                  >
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {event.tag}
                      </span>
                      <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                        <Clock className="w-4 h-4 text-slate-400" />
                        <span>{event.time}</span>
                      </div>
                    </div>

                    <h4 className="font-display font-bold text-base sm:text-lg text-[#0b2545] group-hover:text-[#00a896] transition-colors leading-snug">
                      {event.title}
                    </h4>

                    <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed line-clamp-2">
                      {event.description}
                    </p>

                    <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-[#00a896]" />
                        <span>{event.location}</span>
                      </div>
                      <span className="font-semibold text-[#0b2545] bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200/60">
                        {event.dateStr}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-slate-200/80 text-xs text-slate-500 text-center">
              Parents, alumni, and guardians are warmly welcomed to all school gatherings.
            </div>
          </div>
        </div>
      </div>

      {/* Event Details & RSVP Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 bg-[#0b2545] text-white flex items-center justify-between">
              <div>
                <span className="text-xs text-cyan-300 font-semibold uppercase tracking-wider">
                  {selectedEvent.tag}
                </span>
                <h3 className="font-display font-bold text-lg text-white">
                  {selectedEvent.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedEvent(null)}
                className="p-1 rounded-md text-slate-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <p className="text-sm text-slate-700 leading-relaxed">
                {selectedEvent.description}
              </p>

              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-2 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#00a896]" />
                  <span>Time: <strong>{selectedEvent.time}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#00a896]" />
                  <span>Date: <strong>{selectedEvent.dateStr}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#00a896]" />
                  <span>Venue: <strong>{selectedEvent.location}</strong></span>
                </div>
              </div>

              {rsvpSuccess ? (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-xs font-semibold flex items-center gap-2 justify-center">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Your RSVP has been confirmed! An invitation SMS is sent.</span>
                </div>
              ) : (
                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    onClick={() => setSelectedEvent(null)}
                    className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-800"
                  >
                    Close
                  </button>
                  <button
                    onClick={handleRsvp}
                    className="px-5 py-2.5 text-xs font-semibold text-white bg-[#00a896] hover:bg-[#008c7d] rounded-lg shadow-xs"
                  >
                    Confirm Parent Attendance
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
