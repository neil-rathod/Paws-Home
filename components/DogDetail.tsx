
import React, { useState, useEffect } from 'react';
import { Dog } from '../types';
import ApplicationForm from './ApplicationForm';

interface DogDetailProps {
  dog: Dog;
  onClose: () => void;
  onAdopt: (dog: Dog) => void;
}

const DogDetail: React.FC<DogDetailProps> = ({ dog, onClose, onAdopt }) => {
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [showContactToast, setShowContactToast] = useState(false);
  const [showShareToast, setShowShareToast] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Keyboard escape to close
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const handleStartApplication = () => {
    setShowApplicationForm(true);
  };

  const handleContact = () => {
    setShowContactToast(true);
    setTimeout(() => setShowContactToast(false), 3000);
  };

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}?dog=${dog.id}`;
    const shareData = {
      title: `Meet ${dog.name} - Paws & Home`,
      text: `Check out ${dog.name}, a ${dog.age.toLowerCase()} ${dog.breed} looking for a forever home!`,
      url: shareUrl,
    };

    try {
      // Try native share first (mobile)
      if (navigator.share && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else {
        // Fallback to clipboard
        await navigator.clipboard.writeText(shareUrl);
        setShowShareToast(true);
        setTimeout(() => setShowShareToast(false), 3000);
      }
    } catch (err) {
      // Fallback to clipboard if share cancelled or failed
      await navigator.clipboard.writeText(shareUrl);
      setShowShareToast(true);
      setTimeout(() => setShowShareToast(false), 3000);
    }
  };

  const handleApplicationSubmit = (data: any) => {
    console.log('Application submitted:', data);
    // Here you could send to an API, save to state, etc.
  };

  if (showApplicationForm) {
    return (
      <ApplicationForm 
        dog={dog} 
        onClose={() => {
          setShowApplicationForm(false);
          onClose();
        }}
        onSubmit={handleApplicationSubmit}
      />
    );
  }
  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm animate-scale-in"></div>
      
      {/* Modal */}
      <div 
        className="bg-white w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl shadow-2xl flex flex-col lg:flex-row relative animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Image Section */}
        <div className="lg:w-1/2 relative h-64 lg:h-auto flex-shrink-0 bg-neutral-100">
          {/* Skeleton Loader */}
          {!imageLoaded && (
            <div className="absolute inset-0 animate-pulse">
              <div className="w-full h-full bg-gradient-to-br from-neutral-100 via-neutral-50 to-neutral-100 bg-[length:200%_200%] animate-shimmer" />
            </div>
          )}
          
          <img 
            src={dog.imageUrl} 
            alt={dog.name} 
            onLoad={() => setImageLoaded(true)}
            className={`w-full h-full object-cover transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          />
          
          {/* Mobile Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-4 left-4 p-2 rounded-full bg-white/90 text-neutral-600 hover:bg-white hover:text-neutral-900 backdrop-blur-md transition-all lg:hidden"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          {/* Share Button */}
          <button 
            onClick={handleShare}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/90 text-neutral-600 hover:bg-white hover:text-neutral-900 backdrop-blur-md transition-all"
            title="Share this dog's profile"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </button>
        </div>
        
        {/* Content Section */}
        <div className="lg:w-1/2 p-6 lg:p-10 overflow-y-auto custom-scrollbar flex flex-col">
          {/* Close button - desktop */}
          <div className="hidden lg:flex justify-end mb-6">
            <button 
              onClick={onClose} 
              className="p-2 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-neutral-900 transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">Available</span>
              <span className="text-xs text-neutral-400">{dog.location}</span>
            </div>
            <h2 className="text-3xl font-normal tracking-tight mb-1 serif">{dog.name}</h2>
            <p className="text-neutral-500">{dog.breed}</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-4 gap-3 mb-8">
            {[
              { label: 'Gender', value: dog.gender },
              { label: 'Age', value: dog.age },
              { label: 'Size', value: dog.size },
              { label: 'Weight', value: dog.weight }
            ].map(stat => (
              <div key={stat.label} className="text-center p-3 bg-neutral-50 rounded-xl">
                <p className="text-[10px] font-medium uppercase tracking-wide text-neutral-400 mb-1">{stat.label}</p>
                <p className="text-sm font-semibold text-neutral-900">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Description */}
          <div className="mb-8">
            <h4 className="text-xs font-medium uppercase tracking-wide text-neutral-400 mb-3">About</h4>
            <p className="text-neutral-600 leading-relaxed">
              {dog.description}
            </p>
          </div>

          {/* Tags & Compatibility */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div>
              <h4 className="text-xs font-medium uppercase tracking-wide text-neutral-400 mb-3">Personality</h4>
              <div className="flex flex-wrap gap-1.5">
                {dog.tags.map(tag => (
                  <span key={tag} className="px-2.5 py-1 bg-neutral-100 rounded-lg text-xs font-medium text-neutral-600">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xs font-medium uppercase tracking-wide text-neutral-400 mb-3">Good with</h4>
              <div className="space-y-2">
                {[
                  { label: 'Children', value: dog.compatibility.kids },
                  { label: 'Dogs', value: dog.compatibility.dogs },
                  { label: 'Cats', value: dog.compatibility.cats }
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full ${item.value ? 'bg-emerald-500' : 'bg-neutral-300'}`}></span>
                    <span className={`text-xs ${item.value ? 'text-neutral-700' : 'text-neutral-400'}`}>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-auto pt-6 border-t border-neutral-100 flex gap-3">
            <button 
              onClick={handleStartApplication}
              className="flex-1 bg-neutral-900 text-white py-3.5 px-6 rounded-xl font-medium text-sm hover:bg-neutral-800 transition-colors"
            >
              Start Application
            </button>
            <button 
              onClick={handleContact}
              className="px-6 py-3.5 border border-neutral-200 text-neutral-700 rounded-xl font-medium text-sm hover:bg-neutral-50 transition-colors"
            >
              Contact
            </button>
          </div>
          
          {/* Contact Toast */}
          {showContactToast && (
            <div className="absolute bottom-20 left-6 right-6 lg:left-auto lg:right-10 lg:w-80 bg-neutral-900 text-white px-4 py-3 rounded-xl shadow-lg animate-fade-up flex items-center gap-3">
              <svg className="w-5 h-5 text-emerald-400 flex-shrink-0\" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <p className="text-sm">Contact info sent to your email!</p>
            </div>
          )}          
          {/* Share Toast */}
          {showShareToast && (
            <div className="absolute bottom-20 left-6 right-6 lg:left-auto lg:right-10 lg:w-80 bg-neutral-900 text-white px-4 py-3 rounded-xl shadow-lg animate-fade-up flex items-center gap-3">
              <svg className="w-5 h-5 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <p className="text-sm">Link copied to clipboard!</p>
            </div>
          )}        </div>
      </div>
    </div>
  );
};

export default DogDetail;
