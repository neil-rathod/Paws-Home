
import React, { useState } from 'react';
import { Dog } from '../types';

interface DogCardProps {
  dog: Dog;
  onClick: (dog: Dog) => void;
  isLiked: boolean;
  onLike: (e: React.MouseEvent, id: string) => void;
}

const DogCard: React.FC<DogCardProps> = ({ dog, onClick, isLiked, onLike }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      onClick={() => onClick(dog)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group cursor-pointer bg-white rounded-3xl overflow-hidden border border-neutral-100/80 hover:border-neutral-200/60 transition-all duration-500 ease-out hover:shadow-xl hover:shadow-neutral-200/40 hover:-translate-y-1"
    >
      {/* Image */}
      <div className="relative aspect-[4/5] overflow-hidden bg-neutral-100">
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
          className={`w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
        
        {/* Gradient Overlay on Hover */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
        
        {/* Like Button */}
        <button 
          onClick={(e) => onLike(e, dog.id)}
          className={`absolute top-3 right-3 z-10 p-2.5 rounded-full transition-all duration-300 transform ${
            isLiked 
              ? 'bg-rose-500 text-white scale-110 shadow-lg shadow-rose-500/30' 
              : 'bg-white/95 backdrop-blur-md text-neutral-400 hover:text-rose-500 hover:scale-110'
          }`}
        >
          <svg className={`w-4 h-4 transition-transform duration-300 ${isLiked ? 'scale-110' : ''}`} fill={isLiked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
        
        {/* Quick Info Badge */}
        <div className={`absolute bottom-3 left-3 right-3 flex items-center justify-between transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
          <span className="px-2.5 py-1 bg-white/95 backdrop-blur-md rounded-full text-xs font-medium text-neutral-700">
            {dog.size} • {dog.energyLevel}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-neutral-900 tracking-tight">{dog.name}</h3>
          <span className="text-[11px] font-medium text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded-full">{dog.age}</span>
        </div>
        <p className="text-sm text-neutral-500 mb-3">{dog.breed}</p>
        <div className="flex items-center gap-1.5 text-neutral-400">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
            <span className="text-xs">{dog.location}</span>
          </div>
        </div>
      </div>
  );
};

export default DogCard;
