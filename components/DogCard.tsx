
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

  return (
    <div 
      onClick={() => onClick(dog)}
      className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-neutral-100 hover:border-neutral-200 transition-all duration-300 hover:shadow-lg hover:shadow-neutral-100"
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
        
        {/* Like Button */}
        <button 
          onClick={(e) => onLike(e, dog.id)}
          className={`absolute top-3 right-3 z-10 p-2.5 rounded-full transition-all duration-300 ${
            isLiked 
              ? 'bg-rose-500 text-white' 
              : 'bg-white/90 backdrop-blur-sm text-neutral-400 hover:text-rose-500'
          }`}
        >
          <svg className="w-4 h-4" fill={isLiked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-1">
          <h3 className="text-base font-semibold text-neutral-900">{dog.name}</h3>
          <span className="text-xs text-neutral-400 mt-0.5">{dog.age}</span>
        </div>
        <p className="text-sm text-neutral-500 mb-2">{dog.breed}</p>
        <div className="flex items-center gap-1 text-neutral-400">
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
