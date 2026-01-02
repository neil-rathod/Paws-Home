import React from 'react';

interface ProcessPageProps {
  onNavigate: (page: string) => void;
}

const ProcessPage: React.FC<ProcessPageProps> = ({ onNavigate }) => {
  const steps = [
    {
      number: '01',
      title: 'Browse & Discover',
      description: 'Explore our curated selection of dogs. Use filters to find companions that match your lifestyle, living situation, and preferences.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
    },
    {
      number: '02',
      title: 'Learn About Your Match',
      description: 'Each dog has a detailed profile including personality traits, health information, compatibility notes, and their unique story.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342" />
        </svg>
      ),
    },
    {
      number: '03',
      title: 'Submit Application',
      description: 'Fill out our simple adoption application. We ask about your home environment, experience with pets, and why you\'re interested in adopting.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25Z" />
        </svg>
      ),
    },
    {
      number: '04',
      title: 'Meet & Greet',
      description: 'Schedule a visit to meet your potential new family member. Spend time together to ensure it\'s a great fit for both of you.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
        </svg>
      ),
    },
    {
      number: '05',
      title: 'Welcome Home',
      description: 'Complete the adoption process and bring your new companion home. We provide resources and support for the transition period.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
      ),
    },
  ];

  const faqs = [
    {
      question: 'How long does the adoption process take?',
      answer: 'Typically 1-2 weeks from application to bringing your dog home. This includes application review, meet and greet, and home preparation.',
    },
    {
      question: 'What are the adoption fees?',
      answer: 'Fees vary by shelter partner but typically range from $150-$400. This covers vaccinations, spay/neuter, microchipping, and initial vet check.',
    },
    {
      question: 'Can I adopt if I rent my home?',
      answer: 'Yes! We just ask that you provide landlord approval and confirm any pet policies. Many of our dogs are well-suited for apartment living.',
    },
    {
      question: 'What if it doesn\'t work out?',
      answer: 'We have a 30-day trial period. If the match isn\'t right, our team will work with you to find a better fit or process a return to the shelter.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#fcfcfc]">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20 opacity-0 animate-fade-up">
            <span className="text-sm font-medium text-neutral-400 uppercase tracking-wider mb-4 block">How It Works</span>
            <h1 className="text-5xl md:text-6xl font-normal mb-8 tracking-tight leading-[1.1] serif">
              Your journey to <br /><em className="text-neutral-400">finding a friend</em>
            </h1>
            <p className="text-xl text-neutral-500 leading-relaxed max-w-2xl mx-auto">
              We've simplified the adoption process to make it easy, transparent, and rewarding for both you and your future companion.
            </p>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            {steps.map((step, index) => (
              <div 
                key={step.number}
                className="bg-white rounded-2xl border border-neutral-100 p-8 opacity-0 animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex gap-6">
                  <div className="shrink-0">
                    <div className="w-16 h-16 bg-neutral-50 rounded-2xl flex items-center justify-center text-neutral-400">
                      {step.icon}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-medium text-neutral-400 uppercase tracking-wider">{step.number}</span>
                      <span className="w-8 h-px bg-neutral-200"></span>
                    </div>
                    <h3 className="text-xl font-semibold text-neutral-900 mb-2">{step.title}</h3>
                    <p className="text-neutral-500 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white border-y border-neutral-100">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-normal mb-12 tracking-tight serif text-center">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {faqs.map((faq) => (
              <div key={faq.question}>
                <h3 className="font-medium text-neutral-900 mb-2">{faq.question}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-neutral-50 rounded-3xl p-12 text-center">
            <h2 className="text-2xl font-normal mb-4 tracking-tight serif">Need help with the process?</h2>
            <p className="text-neutral-500 mb-8 max-w-lg mx-auto">
              Our team is here to guide you every step of the way. Reach out with any questions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-6 py-3 bg-neutral-900 text-white text-sm font-medium rounded-xl hover:bg-neutral-800 transition-colors">
                Contact Support
              </button>
              <button 
                onClick={() => onNavigate('browse')}
                className="px-6 py-3 bg-white border border-neutral-200 text-neutral-900 text-sm font-medium rounded-xl hover:bg-neutral-50 transition-colors"
              >
                Start Browsing
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProcessPage;
