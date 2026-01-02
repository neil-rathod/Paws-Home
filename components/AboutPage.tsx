import React from 'react';

interface AboutPageProps {
  onNavigate: (page: string) => void;
}

const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-[#fcfcfc]">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-16 opacity-0 animate-fade-up">
            <span className="text-sm font-medium text-neutral-400 uppercase tracking-wider mb-4 block">About Us</span>
            <h1 className="text-5xl md:text-6xl font-normal mb-8 tracking-tight leading-[1.1] serif">
              Every dog deserves <br /><em className="text-neutral-400">a loving home</em>
            </h1>
            <p className="text-xl text-neutral-500 leading-relaxed max-w-2xl">
              We're on a mission to connect rescue dogs with families who will love them forever. Since 2020, we've helped over 5,000 dogs find their perfect match.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20 opacity-0 animate-fade-up delay-100">
            {[
              { number: '5,000+', label: 'Dogs Adopted' },
              { number: '150+', label: 'Partner Shelters' },
              { number: '98%', label: 'Success Rate' },
              { number: '50', label: 'States Covered' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white rounded-2xl p-6 border border-neutral-100">
                <p className="text-3xl font-semibold text-neutral-900 mb-1">{stat.number}</p>
                <p className="text-sm text-neutral-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white border-y border-neutral-100">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-normal mb-6 tracking-tight serif">Our Mission</h2>
              <p className="text-neutral-600 leading-relaxed mb-4">
                At Paws & Home, we believe that adoption should be simple, transparent, and joyful. We partner with shelters and rescue organizations across the country to give every dog a second chance at happiness.
              </p>
              <p className="text-neutral-600 leading-relaxed">
                Our platform carefully vets each dog and provides comprehensive profiles so you can find the perfect companion for your lifestyle and family.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-normal mb-6 tracking-tight serif">Our Values</h2>
              <ul className="space-y-4">
                {[
                  { title: 'Transparency', desc: 'Honest, detailed information about every dog' },
                  { title: 'Compassion', desc: 'Every animal deserves love and respect' },
                  { title: 'Community', desc: 'Building connections between dogs and families' },
                  { title: 'Support', desc: 'Guidance before, during, and after adoption' },
                ].map((value) => (
                  <li key={value.title} className="flex gap-4">
                    <div className="w-2 h-2 bg-neutral-900 rounded-full mt-2 shrink-0"></div>
                    <div>
                      <p className="font-medium text-neutral-900">{value.title}</p>
                      <p className="text-sm text-neutral-500">{value.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-normal mb-12 tracking-tight serif text-center">Meet Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Sarah Chen', role: 'Founder & CEO', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop' },
              { name: 'Marcus Johnson', role: 'Head of Operations', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop' },
              { name: 'Emily Rodriguez', role: 'Shelter Relations', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop' },
            ].map((member) => (
              <div key={member.name} className="text-center">
                <div className="w-32 h-32 mx-auto mb-4 rounded-2xl overflow-hidden bg-neutral-100">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <p className="font-medium text-neutral-900">{member.name}</p>
                <p className="text-sm text-neutral-500">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-20 px-6 bg-neutral-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-sm font-medium text-neutral-400 uppercase tracking-wider mb-3 block">Success Stories</span>
            <h2 className="text-3xl font-normal tracking-tight serif">Happy tails, happy families</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                dogName: 'Luna',
                family: 'The Martinez Family',
                image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop',
                quote: 'Luna has brought so much joy into our home. She loves playing with our kids and has become the heart of our family.',
                location: 'Austin, TX',
                adoptedDate: 'March 2025'
              },
              {
                dogName: 'Cooper',
                family: 'Jake & Emma',
                image: 'https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?w=400&h=300&fit=crop',
                quote: 'We were nervous first-time dog owners, but the team at Paws & Home made everything so easy. Cooper is our best friend now!',
                location: 'Portland, OR',
                adoptedDate: 'January 2025'
              },
              {
                dogName: 'Daisy',
                family: 'Margaret Thompson',
                image: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?w=400&h=300&fit=crop',
                quote: 'After losing my husband, Daisy gave me a reason to smile again. She\'s the perfect companion for my daily walks.',
                location: 'Seattle, WA',
                adoptedDate: 'November 2024'
              },
            ].map((story) => (
              <div key={story.dogName} className="bg-white rounded-2xl overflow-hidden border border-neutral-100 hover:shadow-lg transition-shadow duration-300">
                <div className="aspect-[4/3] overflow-hidden">
                  <img 
                    src={story.image} 
                    alt={`${story.dogName} with ${story.family}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg font-medium text-neutral-900">{story.dogName}</span>
                    <span className="text-neutral-300">•</span>
                    <span className="text-sm text-neutral-500">{story.family}</span>
                  </div>
                  <p className="text-neutral-600 text-sm leading-relaxed mb-4 italic">
                    "{story.quote}"
                  </p>
                  <div className="flex items-center justify-between text-xs text-neutral-400">
                    <span>{story.location}</span>
                    <span>Adopted {story.adoptedDate}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <p className="text-neutral-500 text-sm">
              Join over 5,000 happy families who found their perfect companion through Paws & Home
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-neutral-900 text-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-normal mb-4 tracking-tight serif">Ready to find your companion?</h2>
          <p className="text-neutral-400 mb-8">
            Browse our curated selection of dogs waiting for their forever homes.
          </p>
          <button 
            onClick={() => onNavigate('browse')}
            className="px-8 py-4 bg-white text-neutral-900 text-sm font-medium rounded-xl hover:bg-neutral-100 transition-colors"
          >
            Browse Dogs
          </button>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
