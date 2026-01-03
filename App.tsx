
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { DOGS } from './constants';
import { Dog, FilterState, Age, Size } from './types';
import DogCard from './components/DogCard';
import DogDetail from './components/DogDetail';
import AboutPage from './components/AboutPage';
import ProcessPage from './components/ProcessPage';

type Page = 'browse' | 'about' | 'process';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('browse');
  const [filters, setFilters] = useState<FilterState>({
    age: [],
    size: [],
    gender: [],
    search: ''
  });
  const [selectedDog, setSelectedDog] = useState<Dog | null>(null);
  const [likedDogs, setLikedDogs] = useState<Set<string>>(() => {
    const saved = localStorage.getItem('paws_favs_v2');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    localStorage.setItem('paws_favs_v2', JSON.stringify(Array.from(likedDogs)));
  }, [likedDogs]);

  const filteredDogs = useMemo(() => {
    return DOGS.filter(dog => {
      const matchesFavorites = !showFavoritesOnly || likedDogs.has(dog.id);
      const matchesSearch = dog.name.toLowerCase().includes(filters.search.toLowerCase()) || 
                            dog.breed.toLowerCase().includes(filters.search.toLowerCase()) ||
                            dog.tags.some(t => t.toLowerCase().includes(filters.search.toLowerCase()));
      const matchesAge = filters.age.length === 0 || filters.age.includes(dog.age);
      const matchesSize = filters.size.length === 0 || filters.size.includes(dog.size);
      const matchesGender = filters.gender.length === 0 || filters.gender.includes(dog.gender);
      
      return matchesFavorites && matchesSearch && matchesAge && matchesSize && matchesGender;
    });
  }, [filters, showFavoritesOnly, likedDogs]);

  const toggleLike = useCallback((e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setLikedDogs(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const handleAdopt = (dog: Dog) => {
    alert(`Application successfully logged for ${dog.name}. Check your dashboard for status updates.`);
    setSelectedDog(null);
  };

  const resetFilters = () => {
    setFilters({ age: [], size: [], gender: [], search: '' });
    setShowFavoritesOnly(false);
  };
  const hasActiveFilters = filters.age.length > 0 || filters.gender.length > 0 || filters.search || showFavoritesOnly;

  const handleNavigate = (page: string) => {
    setCurrentPage(page as Page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Shared Navigation Component
  const Navigation = () => (
    <nav className={`fixed top-0 left-0 right-0 z-[70] transition-all duration-300 ease-out ${
      isScrolled || mobileMenuOpen
        ? 'py-3 bg-white/90 backdrop-blur-2xl shadow-[0_2px_20px_rgba(0,0,0,0.06)] border-b border-neutral-100' 
        : 'py-5 bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
        <button onClick={() => handleNavigate('browse')} className="group">
          <span className="text-lg font-semibold tracking-tight text-neutral-900 transition-colors group-hover:text-neutral-600">Paws & Home</span>
        </button>
        
        <div className="hidden md:flex items-center">
          <div className="relative flex items-center bg-neutral-100/80 rounded-full p-1">
            {/* Sliding indicator */}
            <div 
              className="absolute top-1 bottom-1 bg-neutral-900 rounded-full transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
              style={{
                left: currentPage === 'browse' ? '4px' : currentPage === 'about' ? 'calc(33.33% + 2px)' : 'calc(66.66% + 0px)',
                width: 'calc(33.33% - 4px)',
              }}
            />
            <button 
              onClick={() => handleNavigate('browse')}
              className={`relative z-10 px-4 py-1.5 text-[13px] font-medium rounded-full transition-colors duration-200 ${currentPage === 'browse' ? 'text-white' : 'text-neutral-500 hover:text-neutral-900'}`}
            >
              Browse
            </button>
            <button 
              onClick={() => handleNavigate('about')}
              className={`relative z-10 px-4 py-1.5 text-[13px] font-medium rounded-full transition-colors duration-200 ${currentPage === 'about' ? 'text-white' : 'text-neutral-500 hover:text-neutral-900'}`}
            >
              About
            </button>
            <button 
              onClick={() => handleNavigate('process')}
              className={`relative z-10 px-4 py-1.5 text-[13px] font-medium rounded-full transition-colors duration-200 ${currentPage === 'process' ? 'text-white' : 'text-neutral-500 hover:text-neutral-900'}`}
            >
              Process
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => {
              if (currentPage !== 'browse') {
                handleNavigate('browse');
              }
              if (likedDogs.size > 0) {
                setShowFavoritesOnly(prev => !prev);
              }
            }}
            className={`relative p-2.5 rounded-xl transition-all duration-200 ${showFavoritesOnly ? 'bg-rose-500 hover:bg-rose-600' : likedDogs.size > 0 ? 'bg-rose-50 hover:bg-rose-100' : 'hover:bg-neutral-100'}`}
            title={showFavoritesOnly ? 'Show all dogs' : 'Show favorites only'}
          >
            <svg className={`w-5 h-5 transition-all duration-300 ${showFavoritesOnly ? 'text-white scale-110' : likedDogs.size > 0 ? 'text-rose-500 scale-110' : 'text-neutral-500'}`} fill={likedDogs.size > 0 ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            {likedDogs.size > 0 && (
              <span className={`absolute -top-1 -right-1 text-[10px] min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center font-semibold shadow-sm ${showFavoritesOnly ? 'bg-white text-rose-500' : 'bg-rose-500 text-white'}`}>
                {likedDogs.size}
              </span>
            )}
          </button>
          
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 rounded-xl hover:bg-neutral-100 transition-colors"
          >
            <svg className="w-5 h-5 text-neutral-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              )}
            </svg>
          </button>
        </div>
      </div>
      
      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-neutral-100 shadow-lg animate-fade-up">
          <div className="px-4 py-3 space-y-1">
            <button 
              onClick={() => handleNavigate('browse')}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all ${currentPage === 'browse' ? 'bg-neutral-900 text-white' : 'text-neutral-600 hover:bg-neutral-50'}`}
            >
              Browse Dogs
            </button>
            <button 
              onClick={() => handleNavigate('about')}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all ${currentPage === 'about' ? 'bg-neutral-900 text-white' : 'text-neutral-600 hover:bg-neutral-50'}`}
            >
              About Us
            </button>
            <button 
              onClick={() => handleNavigate('process')}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all ${currentPage === 'process' ? 'bg-neutral-900 text-white' : 'text-neutral-600 hover:bg-neutral-50'}`}
            >
              Adoption Process
            </button>
          </div>
        </div>
      )}
    </nav>
  );

  // Shared Footer Component
  const Footer = () => (
    <footer className="border-t border-neutral-100 py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
          <div className="max-w-sm">
            <span className="text-base font-semibold tracking-tight text-neutral-900 block mb-3">Paws & Home</span>
            <p className="text-sm text-neutral-500 leading-relaxed">
              Connecting loving families with dogs in need of homes since 2020.
            </p>
          </div>
          
          <div className="flex gap-16">
            <div>
              <h5 className="text-xs font-medium text-neutral-400 uppercase tracking-wider mb-4">Platform</h5>
              <ul className="space-y-3">
                <li><button onClick={() => handleNavigate('browse')} className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors">Browse Dogs</button></li>
                <li><button onClick={() => handleNavigate('process')} className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors">How It Works</button></li>
                <li><button onClick={() => handleNavigate('process')} className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors">FAQs</button></li>
              </ul>
            </div>
            <div>
              <h5 className="text-xs font-medium text-neutral-400 uppercase tracking-wider mb-4">Company</h5>
              <ul className="space-y-3">
                <li><button onClick={() => handleNavigate('about')} className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors">About Us</button></li>
                <li><a href="#" className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors">Contact</a></li>
                <li><a href="#" className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-neutral-100 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-neutral-400">
            © 2026 Paws & Home. All rights reserved.
          </p>
          <div className="flex gap-6">
            {['Twitter', 'Instagram'].map(social => (
              <a key={social} href="#" className="text-xs text-neutral-400 hover:text-neutral-900 transition-colors">{social}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );

  // Render About or Process page
  if (currentPage === 'about') {
    return (
      <div className="min-h-screen bg-[#fcfcfc]">
        <Navigation />
        <AboutPage onNavigate={handleNavigate} />
        <Footer />
      </div>
    );
  }

  if (currentPage === 'process') {
    return (
      <div className="min-h-screen bg-[#fcfcfc]">
        <Navigation />
        <ProcessPage onNavigate={handleNavigate} />
        <Footer />
      </div>
    );
  }

  // Browse Page (default)
  return (
    <div className="min-h-screen bg-[#fcfcfc]">
      <Navigation />

      <main className="max-w-6xl mx-auto px-6 pt-32 pb-24">
        {/* Hero */}
        <section className="mb-20 pt-8">
          <div className="max-w-2xl opacity-0 animate-fade-up">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-50 border border-amber-100 rounded-full mb-6">
              <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></span>
              <span className="text-xs font-medium text-amber-700">{DOGS.length} dogs looking for homes</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-normal mb-6 tracking-tight leading-[1.05] serif">
              Find your perfect <br /><em className="text-neutral-400 hover:text-amber-500 transition-colors duration-500 cursor-default">companion</em>
            </h2>
            <p className="text-lg text-neutral-500 leading-relaxed max-w-lg">
              Every dog deserves a loving home. Browse our carefully curated selection of dogs waiting for their forever families.
            </p>
          </div>
        </section>

        {/* Search & Filters */}
        <section className="mb-12 opacity-0 animate-fade-up delay-100">
          <div className="flex flex-col gap-6">
            {/* Search */}
            <div className="relative max-w-md group">
              <input 
                type="text" 
                placeholder="Search by name, breed, or trait..."
                className="w-full bg-white border border-neutral-200 pl-12 pr-4 py-3.5 rounded-2xl text-sm placeholder:text-neutral-400 focus:outline-none focus:border-neutral-400 focus:ring-4 focus:ring-neutral-100 transition-all duration-300 shadow-sm hover:shadow-md"
                value={filters.search}
                onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
              />
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 group-focus-within:text-neutral-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {filters.search && (
                <button 
                  onClick={() => setFilters(prev => ({ ...prev, search: '' }))}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-neutral-600 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-medium text-neutral-500 mr-2 flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
                </svg>
                Filter
              </span>
              
              {['Puppy', 'Young', 'Adult', 'Senior'].map((age) => (
                <button
                  key={age}
                  onClick={() => setFilters(prev => ({
                    ...prev,
                    age: prev.age.includes(age as Age) 
                      ? prev.age.filter(a => a !== age) 
                      : [...prev.age, age as Age]
                  }))}
                  className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 border ${
                    filters.age.includes(age as Age) 
                    ? 'bg-neutral-900 text-white border-neutral-900 shadow-md shadow-neutral-900/20' 
                    : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-300 hover:shadow-sm'
                  }`}
                >
                  {age}
                </button>
              ))}

              <span className="w-px h-5 bg-neutral-200 mx-2"></span>

              {['Male', 'Female'].map((gender) => (
                <button
                  key={gender}
                  onClick={() => setFilters(prev => ({
                    ...prev,
                    gender: prev.gender.includes(gender as any) 
                      ? prev.gender.filter(g => g !== gender) 
                      : [...prev.gender, gender as any]
                  }))}
                  className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 border flex items-center gap-1.5 ${
                    filters.gender.includes(gender as any) 
                    ? 'bg-neutral-900 text-white border-neutral-900 shadow-md shadow-neutral-900/20' 
                    : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-300 hover:shadow-sm'
                  }`}
                >
                  <span>{gender === 'Male' ? '♂' : '♀'}</span>
                  {gender}
                </button>
              ))}

              {hasActiveFilters && (
                <button 
                  onClick={resetFilters}
                  className="ml-3 px-3 py-2 text-xs font-medium text-rose-500 hover:text-rose-600 hover:bg-rose-50 rounded-full transition-all duration-200 flex items-center gap-1"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Clear all
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Results Count */}
        <div className="mb-10 opacity-0 animate-fade-up delay-200">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
              <p className="text-sm font-medium text-neutral-600">
                {filteredDogs.length} {filteredDogs.length === 1 ? 'dog' : 'dogs'} {showFavoritesOnly ? 'in favorites' : 'available'}
              </p>
            </div>
            {showFavoritesOnly && (
              <button 
                onClick={() => setShowFavoritesOnly(false)}
                className="text-xs text-rose-500 hover:text-rose-600 font-medium flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 rounded-full transition-all hover:bg-rose-100"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                Exit favorites
              </button>
            )}
          </div>
        </div>

        {/* Results */}
        {filteredDogs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 opacity-0 animate-fade-up delay-300">
            {filteredDogs.map((dog, index) => (
              <div key={dog.id} style={{ animationDelay: `${300 + index * 50}ms` }} className="opacity-0 animate-fade-up">
                <DogCard 
                  dog={dog} 
                  onClick={setSelectedDog} 
                  isLiked={likedDogs.has(dog.id)}
                  onLike={toggleLike}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="py-32 flex flex-col items-center text-center opacity-0 animate-fade-up">
            <div className={`w-20 h-20 rounded-3xl flex items-center justify-center mb-8 ${showFavoritesOnly ? 'bg-gradient-to-br from-rose-50 to-rose-100' : 'bg-gradient-to-br from-neutral-50 to-neutral-100'}`}>
              {showFavoritesOnly ? (
                <svg className="w-10 h-10 text-rose-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              ) : (
                <svg className="w-10 h-10 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              )}
            </div>
            
            <h3 className="text-3xl font-normal mb-4 text-neutral-900 serif">
              {showFavoritesOnly ? 'No favorites yet' : 'No matches found'}
            </h3>
            <p className="text-neutral-500 max-w-md mb-10 leading-relaxed">
              {showFavoritesOnly 
                ? 'Start exploring and tap the heart icon on dogs you love to save them here for later.'
                : 'We couldn\'t find any dogs matching your criteria. Try adjusting your filters or search term.'
              }
            </p>
            
            <button 
              onClick={resetFilters}
              className="px-8 py-4 bg-neutral-900 text-white text-sm font-medium rounded-2xl hover:bg-neutral-800 transition-all duration-300 shadow-lg shadow-neutral-900/20 hover:shadow-xl hover:shadow-neutral-900/25 hover:-translate-y-0.5"
            >
              {showFavoritesOnly ? 'Browse all dogs' : 'Clear all filters'}
            </button>
          </div>
        )}
      </main>

      <Footer />

      {/* Details Overlay */}
      {selectedDog && (
        <DogDetail 
          dog={selectedDog} 
          onClose={() => setSelectedDog(null)} 
          onAdopt={handleAdopt}
        />
      )}
    </div>
  );
};

export default App;
