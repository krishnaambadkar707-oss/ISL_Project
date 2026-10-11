import React, { useState, useEffect } from 'react';
import { ISL_CATEGORIES, ISL_CURRICULUM } from '../data/islCurriculum';
import { getSignImage } from '../data/signImages';
import { 
  BookOpen, 
  CheckCircle2, 
  Play, 
  Search, 
  Sparkles, 
  Hash, 
  Smile, 
  Type, 
  MessageSquare, 
  Image as ImageIcon, 
  X, 
  ZoomIn,
  Hand,
  Layers,
  ChevronRight,
  Filter
} from 'lucide-react';
import azChartImg from '../../A-Z.jpeg';

export default function LessonModule({ 
  currentSign, 
  onSelectSign, 
  masteredSigns = [] 
}) {
  const [activeCategory, setActiveCategory] = useState('alphabet');
  const [searchQuery, setSearchQuery] = useState('');
  const [isChartModalOpen, setIsChartModalOpen] = useState(false);
  const [, setCropTick] = useState(0);

  useEffect(() => {
    const handleCrops = () => setCropTick(t => t + 1);
    window.addEventListener('isl-crops-updated', handleCrops);
    return () => window.removeEventListener('isl-crops-updated', handleCrops);
  }, []);

  // Filter signs by active category AND search query
  const filteredSigns = ISL_CURRICULUM.filter(s => {
    const matchesCategory = searchQuery.trim() ? true : s.category === activeCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q || 
      s.sign.toLowerCase().includes(q) || 
      s.title.toLowerCase().includes(q) || 
      s.meaning.toLowerCase().includes(q) ||
      s.category.toLowerCase().includes(q);

    return matchesCategory && matchesSearch;
  });

  const getCategoryIcon = (iconName) => {
    switch (iconName) {
      case 'Type': return <Type className="w-4 h-4" />;
      case 'Smile': return <Smile className="w-4 h-4" />;
      case 'Hash': return <Hash className="w-4 h-4" />;
      case 'MessageSquare': return <MessageSquare className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  return (
    <div className="glass-card p-5 sm:p-7 w-full space-y-6 border border-white/10 shadow-2xl backdrop-blur-2xl">
      
      {/* Top Header & Search / Chart Controls */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="badge badge-purple text-[10px] py-0.5 px-2">ISL Curriculum</span>
            <span className="text-xs text-amber-400 font-semibold font-mono">
              {ISL_CURRICULUM.length} Total Gestures
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-100 flex items-center gap-2.5 font-heading tracking-tight">
            <BookOpen className="w-5 h-5 text-purple-400" />
            Learning Hub & Gesture Library
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-0.5 font-medium">
            Browse high-definition demonstration photos, fingerspelling anatomy, and 3D pose guides
          </p>
        </div>

        {/* Action Controls: View A-Z Chart + Instant Search Filter */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
          <button
            onClick={() => setIsChartModalOpen(true)}
            className="btn btn-gold text-xs py-2 px-3.5 shadow-md flex items-center justify-center gap-2 shrink-0"
            title="Open Interactive ISL A-Z Reference Chart"
          >
            <ImageIcon className="w-4 h-4" />
            <span>Master A–Z Chart</span>
          </button>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search sign (e.g. A, Namaste)..."
              className="w-full bg-slate-950/80 border border-white/15 rounded-2xl pl-10 pr-9 py-2 text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:border-purple-500 transition-colors shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-200"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Category Pills (Hidden when actively searching) */}
      {!searchQuery && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {ISL_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`p-3.5 sm:p-4 rounded-2xl border text-left transition-all duration-300 flex items-center justify-between group ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-600/40 via-purple-600/30 to-pink-600/35 border-purple-400 text-white shadow-xl shadow-purple-950/50 scale-[1.01]'
                    : 'bg-slate-900/60 border-white/10 text-slate-300 hover:bg-slate-800/80 hover:border-white/20 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl transition-colors ${
                    isActive 
                      ? 'bg-gradient-to-tr from-amber-400 to-purple-500 text-slate-950 shadow-md font-bold' 
                      : 'bg-slate-800 text-slate-400 group-hover:text-amber-400'
                  }`}>
                    {getCategoryIcon(cat.icon)}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold font-heading">{cat.title}</h4>
                    <span className="text-[10px] text-slate-400 font-mono">{cat.count} Signs</span>
                  </div>
                </div>
                <ChevronRight className={`w-4 h-4 transition-transform ${isActive ? 'text-amber-400 translate-x-0.5' : 'text-slate-600 group-hover:text-slate-400'}`} />
              </button>
            );
          })}
        </div>
      )}

      {/* Filter Statistics Notice */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-1 border-t border-white/5 pt-3">
        <span className="flex items-center gap-1.5">
          <Filter className="w-3.5 h-3.5 text-purple-400" />
          Showing <strong className="text-purple-300 font-mono font-bold">{filteredSigns.length}</strong> {searchQuery ? `gestures matching "${searchQuery}"` : 'gestures in category'}
        </span>
        <span className="text-emerald-400 font-bold font-mono flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5" />
          {masteredSigns.length} / {ISL_CURRICULUM.length} Mastered
        </span>
      </div>

      {/* Grid of Sign Cards */}
      {filteredSigns.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5 sm:gap-4">
          {filteredSigns.map((item) => {
            const isSelected = currentSign?.id === item.id;
            const isMastered = masteredSigns.includes(item.id);
            const thumbImg = getSignImage(item);

            return (
              <button
                key={item.id}
                onClick={() => onSelectSign(item)}
                className={`relative p-3.5 sm:p-4 rounded-2xl border text-center transition-all duration-300 flex flex-col items-center justify-between min-h-[140px] group ${
                  isSelected
                    ? 'bg-gradient-to-b from-purple-900/50 via-slate-900/90 to-purple-950/60 border-purple-400 ring-2 ring-purple-500/60 scale-[1.03] shadow-2xl shadow-purple-950/70 text-white'
                    : 'bg-slate-900/60 border-white/10 hover:bg-slate-800/90 hover:border-purple-400/40 hover:scale-[1.02] text-slate-200 shadow-md'
                }`}
              >
                {/* Top Badges: Mastered Checkmark & Two-Handed Indicator */}
                <div className="w-full flex items-center justify-between text-[10px] mb-1">
                  {item.isTwoHanded ? (
                    <span className="px-1.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-bold border border-purple-500/30 flex items-center gap-0.5" title="Two-handed ISL gesture">
                      <Layers className="w-2.5 h-2.5" />
                      2-Hand
                    </span>
                  ) : <span />}

                  {isMastered && (
                    <div className="text-emerald-400" title="Sign Mastered!">
                      <CheckCircle2 className="w-4 h-4 fill-emerald-500/20" />
                    </div>
                  )}
                </div>

                {/* Gesture Image Thumbnail */}
                <div className="flex flex-col items-center gap-1.5 my-auto w-full">
                  {thumbImg && (
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-slate-950/90 border border-purple-500/30 p-1 shadow-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shrink-0">
                      <img 
                        src={thumbImg} 
                        alt={`ISL gesture demonstration for ${item.sign}`} 
                        className="w-full h-full object-contain rounded-xl"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <span className="text-base sm:text-lg font-black gradient-title font-heading truncate max-w-full tracking-tight">
                    {item.sign}
                  </span>
                </div>

                {/* Bottom Footer Info */}
                <div className="w-full mt-2 pt-2 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
                  <span className="truncate max-w-[85px] font-medium text-slate-300 text-left text-[11px]">
                    {item.title}
                  </span>
                  <Play className={`w-3.5 h-3.5 ${isSelected ? 'text-amber-400 fill-amber-400 animate-pulse' : 'text-slate-500 group-hover:text-purple-400'}`} />
                </div>
              </button>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12 bg-slate-950/40 rounded-2xl border border-white/10">
          <p className="text-sm text-slate-400">No ISL signs found matching "{searchQuery}".</p>
          <button onClick={() => setSearchQuery('')} className="btn btn-secondary text-xs mt-3">
            Clear Search Filter
          </button>
        </div>
      )}

      {/* Interactive ASL A-Z Reference Chart Modal */}
      {isChartModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
          <div className="glass-card w-full max-w-4xl p-6 relative border border-amber-500/40 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsChartModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-100 hover:bg-white/10 rounded-full transition-colors z-10"
              aria-label="Close Reference Chart"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-amber-400" />
              <h2 className="text-lg font-extrabold text-slate-100 font-heading">
                Complete ISL Alphabet (A–Z) Reference Chart
              </h2>
            </div>

            <div className="relative w-full rounded-2xl overflow-hidden border border-white/10 bg-slate-950 flex items-center justify-center p-2 group">
              <img
                src={azChartImg}
                alt="ISL Alphabet A-Z Reference Chart"
                className="w-full h-auto max-h-[70vh] object-contain rounded-xl transform transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-white/10">
              <span>Use this full A-Z chart as a visual guide while practicing fingerspelling with Hana.</span>
              <button
                onClick={() => setIsChartModalOpen(false)}
                className="btn btn-secondary py-1.5 px-4 text-xs"
              >
                Close Chart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
