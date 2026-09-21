import React, { useState } from 'react';
import { ISL_CATEGORIES, ISL_CURRICULUM } from '../data/islCurriculum';
import { BookOpen, CheckCircle2, Play, Search, Sparkles, Hash, Smile, Type, MessageSquare, Image as ImageIcon, X, ZoomIn } from 'lucide-react';
import azChartImg from '../../A-Z.jpeg';

export default function LessonModule({ 
  currentSign, 
  onSelectSign, 
  masteredSigns = [] 
}) {
  const [activeCategory, setActiveCategory] = useState('alphabet');
  const [searchQuery, setSearchQuery] = useState('');
  const [isChartModalOpen, setIsChartModalOpen] = useState(false);

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
    <div className="glass-card p-6 sm:p-8 w-full space-y-6">
      {/* Header, A-Z Chart Trigger & Search Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <h2 className="text-xl font-black text-slate-100 flex items-center gap-2 font-heading">
            <BookOpen className="w-5 h-5 text-purple-400" />
            ISL Learning Hub & Sign Finder
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Explore 3D sign demonstrations, anatomical tips, and real-time camera practice
          </p>
        </div>

        {/* Action Controls: View A-Z Chart + Video Gallery + Search Input */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
          <button
            onClick={() => setIsChartModalOpen(true)}
            className="btn btn-gold text-xs py-2.5 px-4 shadow-md flex items-center gap-2 shrink-0"
            title="Open Interactive ISL A-Z Reference Chart"
          >
            <ImageIcon className="w-4 h-4" />
            View ISL A-Z Chart
          </button>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search signs (e.g. A, Hello)..."
              className="w-full bg-slate-950/80 border border-white/15 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:border-purple-500 transition-colors shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-200"
              >
                Clear
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
                className={`p-4 rounded-2xl border text-left transition-all flex items-center justify-between ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-600/35 to-pink-600/35 border-purple-400 text-white shadow-lg shadow-purple-950/40'
                    : 'bg-slate-900/60 border-white/10 text-slate-300 hover:bg-slate-800/80 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl ${isActive ? 'bg-purple-500/30 text-purple-200' : 'bg-slate-800 text-slate-400'}`}>
                    {getCategoryIcon(cat.icon)}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold font-heading">{cat.title}</h4>
                    <span className="text-[10px] text-slate-400">{cat.count} Signs</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Filter Stats Notice */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-1">
        <span>
          Showing <strong className="text-purple-300 font-mono">{filteredSigns.length}</strong> {searchQuery ? `signs matching "${searchQuery}"` : 'signs in category'}
        </span>
        <span className="text-emerald-400 font-semibold font-mono">
          {masteredSigns.length} / {ISL_CURRICULUM.length} Mastered
        </span>
      </div>

      {/* Signs Grid */}
      {filteredSigns.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5">
          {filteredSigns.map((item) => {
            const isSelected = currentSign?.id === item.id;
            const isMastered = masteredSigns.includes(item.id);

            return (
              <button
                key={item.id}
                onClick={() => onSelectSign(item)}
                className={`relative p-4 rounded-2xl border text-center transition-all flex flex-col items-center justify-between min-h-[125px] ${
                  isSelected
                    ? 'bg-purple-600/30 border-purple-400 ring-2 ring-purple-500/60 scale-[1.02] shadow-xl shadow-purple-950/50 text-white'
                    : 'bg-slate-900/60 border-white/10 hover:bg-slate-800/90 hover:border-white/25 text-slate-200'
                }`}
              >
                {isMastered && (
                  <div className="absolute top-2.5 right-2.5 text-emerald-400 z-10" title="Sign Mastered!">
                    <CheckCircle2 className="w-4.5 h-4.5" />
                  </div>
                )}

                <div className="flex flex-col items-center gap-1.5 my-auto w-full pt-1">
                  {item.image && (
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden bg-slate-950 border border-purple-500/30 p-1 shadow-md flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
                      <img src={item.image} alt={`ISL gesture for ${item.sign}`} className="w-full h-full object-contain rounded-lg" />
                    </div>
                  )}
                  <span className="text-base sm:text-lg font-black gradient-title font-heading truncate max-w-full">
                    {item.sign}
                  </span>
                </div>

                <div className="w-full mt-2 pt-2 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
                  <span className="truncate max-w-[90px] font-medium text-slate-300 text-left">{item.title}</span>
                  <Play className={`w-3.5 h-3.5 ${isSelected ? 'text-purple-400 fill-purple-400 animate-pulse' : 'text-slate-500'}`} />
                </div>
              </button>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12 bg-slate-950/40 rounded-2xl border border-white/5">
          <p className="text-sm text-slate-400">No ISL signs found matching "{searchQuery}".</p>
          <button onClick={() => setSearchQuery('')} className="btn btn-secondary text-xs mt-3">
            Clear Search Filter
          </button>
        </div>
      )}

      {/* Interactive ASL A-Z Reference Chart Modal (`A-Z.jpeg`) */}
      {isChartModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
          <div className="glass-card w-full max-w-4xl p-6 relative border border-amber-500/40 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsChartModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-100 hover:bg-white/10 rounded-full transition-colors z-10"
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
