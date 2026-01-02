import React, { useState } from 'react';
import { Dog } from '../types';

interface ApplicationFormProps {
  dog: Dog;
  onClose: () => void;
  onSubmit: (data: ApplicationData) => void;
}

export interface ApplicationData {
  // Personal Info
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  
  // Address
  address: string;
  city: string;
  state: string;
  zipCode: string;
  
  // Living Situation
  homeType: string;
  ownRent: string;
  landlordApproval: string;
  hasYard: string;
  fenceType: string;
  
  // Household
  adultsInHome: string;
  childrenInHome: string;
  childrenAges: string;
  
  // Pet Experience
  currentPets: string;
  currentPetsDetails: string;
  previousPets: string;
  vetName: string;
  vetPhone: string;
  
  // Lifestyle
  workSchedule: string;
  hoursAlone: string;
  exercisePlan: string;
  
  // Additional
  whyAdopt: string;
  experience: string;
  agreement: boolean;
}

const initialFormData: ApplicationData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  zipCode: '',
  homeType: '',
  ownRent: '',
  landlordApproval: '',
  hasYard: '',
  fenceType: '',
  adultsInHome: '',
  childrenInHome: '',
  childrenAges: '',
  currentPets: '',
  currentPetsDetails: '',
  previousPets: '',
  vetName: '',
  vetPhone: '',
  workSchedule: '',
  hoursAlone: '',
  exercisePlan: '',
  whyAdopt: '',
  experience: '',
  agreement: false,
};

const ApplicationForm: React.FC<ApplicationFormProps> = ({ dog, onClose, onSubmit }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<ApplicationData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showErrors, setShowErrors] = useState(false);

  const totalSteps = 5;

  const updateField = (field: keyof ApplicationData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Validation functions for each step
  const validateStep1 = (): string[] => {
    const errors: string[] = [];
    if (!formData.firstName.trim()) errors.push('firstName');
    if (!formData.lastName.trim()) errors.push('lastName');
    if (!formData.email.trim()) errors.push('email');
    if (!formData.phone.trim()) errors.push('phone');
    if (!formData.address.trim()) errors.push('address');
    if (!formData.city.trim()) errors.push('city');
    if (!formData.state.trim()) errors.push('state');
    if (!formData.zipCode.trim()) errors.push('zipCode');
    return errors;
  };

  const validateStep2 = (): string[] => {
    const errors: string[] = [];
    if (!formData.homeType) errors.push('homeType');
    if (!formData.ownRent) errors.push('ownRent');
    if (formData.ownRent === 'rent' && !formData.landlordApproval) errors.push('landlordApproval');
    if (!formData.hasYard) errors.push('hasYard');
    return errors;
  };

  const validateStep3 = (): string[] => {
    const errors: string[] = [];
    if (!formData.adultsInHome) errors.push('adultsInHome');
    if (!formData.childrenInHome) errors.push('childrenInHome');
    if (!formData.currentPets) errors.push('currentPets');
    if (!formData.previousPets) errors.push('previousPets');
    return errors;
  };

  const validateStep4 = (): string[] => {
    const errors: string[] = [];
    if (!formData.workSchedule) errors.push('workSchedule');
    if (!formData.hoursAlone) errors.push('hoursAlone');
    if (!formData.exercisePlan.trim()) errors.push('exercisePlan');
    return errors;
  };

  const validateStep5 = (): string[] => {
    const errors: string[] = [];
    if (!formData.whyAdopt.trim()) errors.push('whyAdopt');
    if (!formData.agreement) errors.push('agreement');
    return errors;
  };

  const getStepErrors = (): string[] => {
    switch (step) {
      case 1: return validateStep1();
      case 2: return validateStep2();
      case 3: return validateStep3();
      case 4: return validateStep4();
      case 5: return validateStep5();
      default: return [];
    }
  };

  const isStepValid = (): boolean => {
    return getStepErrors().length === 0;
  };

  const hasError = (field: string): boolean => {
    return showErrors && getStepErrors().includes(field);
  };

  const nextStep = () => {
    if (!isStepValid()) {
      setShowErrors(true);
      return;
    }
    setShowErrors(false);
    if (step < totalSteps) setStep(step + 1);
  };

  const prevStep = () => {
    setShowErrors(false);
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async () => {
    if (!isStepValid()) {
      setShowErrors(true);
      return;
    }
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
    onSubmit(formData);
  };

  const inputClass = "w-full px-4 py-3 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all";
  const inputErrorClass = "w-full px-4 py-3 border border-red-300 bg-red-50/50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all";
  const labelClass = "block text-xs font-medium text-neutral-500 mb-1.5";
  const selectClass = "w-full px-4 py-3 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all bg-white appearance-none cursor-pointer";
  const selectErrorClass = "w-full px-4 py-3 border border-red-300 bg-red-50/50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all bg-white appearance-none cursor-pointer";

  // Success Screen
  if (isSubmitted) {
    return (
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-4" onClick={onClose}>
        <div className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm"></div>
        <div 
          className="bg-white w-full max-w-lg rounded-2xl shadow-2xl p-8 md:p-12 relative animate-scale-in text-center"
          onClick={e => e.stopPropagation()}
        >
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h2 className="text-2xl font-normal tracking-tight mb-2 serif">Application Submitted!</h2>
          <p className="text-neutral-500 mb-8">
            Thank you for your interest in adopting <span className="font-medium text-neutral-900">{dog.name}</span>. 
            We've received your application and will review it within 2-3 business days.
          </p>
          
          <div className="bg-neutral-50 rounded-xl p-4 mb-8 text-left">
            <p className="text-xs font-medium text-neutral-400 uppercase tracking-wide mb-2">What happens next?</p>
            <ul className="space-y-2 text-sm text-neutral-600">
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 bg-neutral-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-medium">1</span>
                <span>Our team will review your application</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 bg-neutral-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-medium">2</span>
                <span>We'll contact you to schedule a meet & greet</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 bg-neutral-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-medium">3</span>
                <span>Home visit and final approval</span>
              </li>
            </ul>
          </div>
          
          <button 
            onClick={onClose}
            className="w-full bg-neutral-900 text-white py-3.5 px-6 rounded-xl font-medium text-sm hover:bg-neutral-800 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm"></div>
      
      <div 
        className="bg-white w-full max-w-2xl max-h-[90vh] rounded-2xl shadow-2xl flex flex-col relative animate-scale-in"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-neutral-100 flex-shrink-0">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <img src={dog.imageUrl} alt={dog.name} className="w-12 h-12 rounded-xl object-cover" />
              <div>
                <p className="text-xs text-neutral-400">Adopting</p>
                <h3 className="font-medium text-neutral-900">{dog.name}</h3>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-2 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-neutral-900 transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Enhanced Step Progress */}
          <div className="relative">
            {/* Step Icons Row */}
            <div className="flex items-center justify-between relative z-10">
              {[
                { num: 1, label: 'Personal', icon: (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                )},
                { num: 2, label: 'Home', icon: (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                )},
                { num: 3, label: 'Family', icon: (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                )},
                { num: 4, label: 'Lifestyle', icon: (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )},
                { num: 5, label: 'Submit', icon: (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )},
              ].map((s, idx) => (
                <div key={s.num} className="flex flex-col items-center">
                  <div 
                    className={`
                      w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 relative
                      ${s.num < step 
                        ? 'bg-emerald-500 text-white' 
                        : s.num === step 
                          ? 'bg-neutral-900 text-white ring-4 ring-neutral-900/20' 
                          : 'bg-neutral-100 text-neutral-400'
                      }
                    `}
                  >
                    {s.num < step ? (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      s.icon
                    )}
                    {s.num === step && (
                      <span className="absolute inset-0 rounded-full animate-ping bg-neutral-900/30"></span>
                    )}
                  </div>
                  <span className={`text-[10px] mt-1.5 font-medium transition-colors duration-300 ${
                    s.num <= step ? 'text-neutral-900' : 'text-neutral-400'
                  }`}>
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
            
            {/* Connecting Line */}
            <div className="absolute top-5 left-5 right-5 h-0.5 bg-neutral-100 -z-0">
              <div 
                className="h-full bg-emerald-500 transition-all duration-500 ease-out"
                style={{ width: `${((step - 1) / (totalSteps - 1)) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
          
          {/* Step 1: Personal Info */}
          {step === 1 && (
            <div className="animate-fade-up">
              <h4 className="text-lg font-normal mb-1 serif">Personal Information</h4>
              <p className="text-sm text-neutral-500 mb-4">Tell us about yourself</p>
              
              {showErrors && !isStepValid() && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-sm text-red-600">
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  Please fill in all required fields
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className={labelClass}>First Name *</label>
                  <input 
                    type="text" 
                    className={hasError('firstName') ? inputErrorClass : inputClass}
                    value={formData.firstName}
                    onChange={e => updateField('firstName', e.target.value)}
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className={labelClass}>Last Name *</label>
                  <input 
                    type="text" 
                    className={hasError('lastName') ? inputErrorClass : inputClass}
                    value={formData.lastName}
                    onChange={e => updateField('lastName', e.target.value)}
                    placeholder="Doe"
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label className={labelClass}>Email Address *</label>
                <input 
                  type="email" 
                  className={hasError('email') ? inputErrorClass : inputClass}
                  value={formData.email}
                  onChange={e => updateField('email', e.target.value)}
                  placeholder="john@example.com"
                />
              </div>
              
              <div className="mb-4">
                <label className={labelClass}>Phone Number *</label>
                <input 
                  type="tel" 
                  className={hasError('phone') ? inputErrorClass : inputClass}
                  value={formData.phone}
                  onChange={e => updateField('phone', e.target.value)}
                  placeholder="(555) 123-4567"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="col-span-2">
                  <label className={labelClass}>Street Address *</label>
                  <input 
                    type="text" 
                    className={hasError('address') ? inputErrorClass : inputClass}
                    value={formData.address}
                    onChange={e => updateField('address', e.target.value)}
                    placeholder="123 Main Street"
                  />
                </div>
                <div>
                  <label className={labelClass}>City *</label>
                  <input 
                    type="text" 
                    className={hasError('city') ? inputErrorClass : inputClass}
                    value={formData.city}
                    onChange={e => updateField('city', e.target.value)}
                    placeholder="New York"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>State *</label>
                    <input 
                      type="text" 
                      className={hasError('state') ? inputErrorClass : inputClass}
                      value={formData.state}
                      onChange={e => updateField('state', e.target.value)}
                      placeholder="NY"
                    />
                  </div>
                  <div>
                    <label className={labelClass}>ZIP *</label>
                    <input 
                      type="text" 
                      className={hasError('zipCode') ? inputErrorClass : inputClass}
                      value={formData.zipCode}
                      onChange={e => updateField('zipCode', e.target.value)}
                      placeholder="10001"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Living Situation */}
          {step === 2 && (
            <div className="animate-fade-up">
              <h4 className="text-lg font-normal mb-1 serif">Living Situation</h4>
              <p className="text-sm text-neutral-500 mb-4">Help us understand your home environment</p>
              
              {showErrors && !isStepValid() && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-sm text-red-600">
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  Please fill in all required fields
                </div>
              )}
              
              <div className="mb-4">
                <label className={labelClass}>Type of Home *</label>
                <div className="relative">
                  <select 
                    className={hasError('homeType') ? selectErrorClass : selectClass}
                    value={formData.homeType}
                    onChange={e => updateField('homeType', e.target.value)}
                  >
                    <option value="">Select...</option>
                    <option value="house">House</option>
                    <option value="apartment">Apartment</option>
                    <option value="condo">Condo</option>
                    <option value="townhouse">Townhouse</option>
                    <option value="mobile">Mobile Home</option>
                    <option value="other">Other</option>
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <label className={labelClass}>Do you own or rent? *</label>
                <div className={`flex gap-3 ${hasError('ownRent') ? 'p-2 -m-2 bg-red-50/50 rounded-xl border border-red-200' : ''}`}>
                  {['Own', 'Rent'].map(option => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => updateField('ownRent', option.toLowerCase())}
                      className={`flex-1 py-3 px-4 rounded-xl border text-sm font-medium transition-all ${
                        formData.ownRent === option.toLowerCase()
                          ? 'border-neutral-900 bg-neutral-900 text-white'
                          : 'border-neutral-200 hover:border-neutral-300 text-neutral-600'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
              
              {formData.ownRent === 'rent' && (
                <div className="mb-4 animate-fade-up">
                  <label className={labelClass}>Do you have landlord approval for pets? *</label>
                  <div className={`flex gap-3 ${hasError('landlordApproval') ? 'p-2 -m-2 bg-red-50/50 rounded-xl border border-red-200' : ''}`}>
                    {['Yes', 'No', 'Pending'].map(option => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => updateField('landlordApproval', option.toLowerCase())}
                        className={`flex-1 py-3 px-4 rounded-xl border text-sm font-medium transition-all ${
                          formData.landlordApproval === option.toLowerCase()
                            ? 'border-neutral-900 bg-neutral-900 text-white'
                            : 'border-neutral-200 hover:border-neutral-300 text-neutral-600'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="mb-4">
                <label className={labelClass}>Do you have a yard? *</label>
                <div className={`flex gap-3 ${hasError('hasYard') ? 'p-2 -m-2 bg-red-50/50 rounded-xl border border-red-200' : ''}`}>
                  {['Yes', 'No'].map(option => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => updateField('hasYard', option.toLowerCase())}
                      className={`flex-1 py-3 px-4 rounded-xl border text-sm font-medium transition-all ${
                        formData.hasYard === option.toLowerCase()
                          ? 'border-neutral-900 bg-neutral-900 text-white'
                          : 'border-neutral-200 hover:border-neutral-300 text-neutral-600'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
              
              {formData.hasYard === 'yes' && (
                <div className="mb-4 animate-fade-up">
                  <label className={labelClass}>Type of Fence</label>
                  <div className="relative">
                    <select 
                      className={selectClass}
                      value={formData.fenceType}
                      onChange={e => updateField('fenceType', e.target.value)}
                    >
                      <option value="">Select...</option>
                      <option value="fully-fenced">Fully Fenced (6ft+)</option>
                      <option value="partially-fenced">Partially Fenced</option>
                      <option value="low-fence">Low Fence (under 4ft)</option>
                      <option value="no-fence">No Fence</option>
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Household */}
          {step === 3 && (
            <div className="animate-fade-up">
              <h4 className="text-lg font-normal mb-1 serif">Household Information</h4>
              <p className="text-sm text-neutral-500 mb-4">Tell us about who lives with you</p>
              
              {showErrors && !isStepValid() && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-sm text-red-600">
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  Please fill in all required fields
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className={labelClass}>Adults in Home *</label>
                  <div className="relative">
                    <select 
                      className={hasError('adultsInHome') ? selectErrorClass : selectClass}
                      value={formData.adultsInHome}
                      onChange={e => updateField('adultsInHome', e.target.value)}
                    >
                      <option value="">Select...</option>
                      {[1, 2, 3, 4, '5+'].map(n => (
                        <option key={n} value={n}>{n}</option>
                      ))}
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Children in Home *</label>
                  <div className="relative">
                    <select 
                      className={hasError('childrenInHome') ? selectErrorClass : selectClass}
                      value={formData.childrenInHome}
                      onChange={e => updateField('childrenInHome', e.target.value)}
                    >
                      <option value="">Select...</option>
                      {[0, 1, 2, 3, '4+'].map(n => (
                        <option key={n} value={n}>{n}</option>
                      ))}
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              
              {formData.childrenInHome && formData.childrenInHome !== '0' && (
                <div className="mb-4 animate-fade-up">
                  <label className={labelClass}>Ages of Children</label>
                  <input 
                    type="text" 
                    className={inputClass}
                    value={formData.childrenAges}
                    onChange={e => updateField('childrenAges', e.target.value)}
                    placeholder="e.g., 5, 8, 12"
                  />
                </div>
              )}
              
              <div className="mb-4">
                <label className={labelClass}>Do you currently have pets? *</label>
                <div className={`flex gap-3 ${hasError('currentPets') ? 'p-2 -m-2 bg-red-50/50 rounded-xl border border-red-200' : ''}`}>
                  {['Yes', 'No'].map(option => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => updateField('currentPets', option.toLowerCase())}
                      className={`flex-1 py-3 px-4 rounded-xl border text-sm font-medium transition-all ${
                        formData.currentPets === option.toLowerCase()
                          ? 'border-neutral-900 bg-neutral-900 text-white'
                          : 'border-neutral-200 hover:border-neutral-300 text-neutral-600'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
              
              {formData.currentPets === 'yes' && (
                <div className="mb-4 animate-fade-up">
                  <label className={labelClass}>Please describe your current pets</label>
                  <textarea 
                    className={`${inputClass} resize-none`}
                    rows={3}
                    value={formData.currentPetsDetails}
                    onChange={e => updateField('currentPetsDetails', e.target.value)}
                    placeholder="Type, breed, age, spayed/neutered status..."
                  />
                </div>
              )}
              
              <div className="mb-4">
                <label className={labelClass}>Have you had pets before? *</label>
                <div className={`flex gap-3 ${hasError('previousPets') ? 'p-2 -m-2 bg-red-50/50 rounded-xl border border-red-200' : ''}`}>
                  {['Yes', 'No'].map(option => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => updateField('previousPets', option.toLowerCase())}
                      className={`flex-1 py-3 px-4 rounded-xl border text-sm font-medium transition-all ${
                        formData.previousPets === option.toLowerCase()
                          ? 'border-neutral-900 bg-neutral-900 text-white'
                          : 'border-neutral-200 hover:border-neutral-300 text-neutral-600'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Veterinarian Name</label>
                  <input 
                    type="text" 
                    className={inputClass}
                    value={formData.vetName}
                    onChange={e => updateField('vetName', e.target.value)}
                    placeholder="Dr. Smith"
                  />
                </div>
                <div>
                  <label className={labelClass}>Vet Phone</label>
                  <input 
                    type="tel" 
                    className={inputClass}
                    value={formData.vetPhone}
                    onChange={e => updateField('vetPhone', e.target.value)}
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Lifestyle */}
          {step === 4 && (
            <div className="animate-fade-up">
              <h4 className="text-lg font-normal mb-1 serif">Lifestyle & Schedule</h4>
              <p className="text-sm text-neutral-500 mb-4">Help us match you with the right dog</p>
              
              {showErrors && !isStepValid() && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-sm text-red-600">
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  Please fill in all required fields
                </div>
              )}
              
              <div className="mb-4">
                <label className={labelClass}>Work Schedule *</label>
                <div className="relative">
                  <select 
                    className={hasError('workSchedule') ? selectErrorClass : selectClass}
                    value={formData.workSchedule}
                    onChange={e => updateField('workSchedule', e.target.value)}
                  >
                    <option value="">Select...</option>
                    <option value="full-time-office">Full-time (office)</option>
                    <option value="full-time-remote">Full-time (remote/WFH)</option>
                    <option value="part-time">Part-time</option>
                    <option value="flexible">Flexible/Hybrid</option>
                    <option value="retired">Retired</option>
                    <option value="student">Student</option>
                    <option value="stay-home">Stay-at-home</option>
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <label className={labelClass}>Hours dog would be alone daily *</label>
                <div className="relative">
                  <select 
                    className={hasError('hoursAlone') ? selectErrorClass : selectClass}
                    value={formData.hoursAlone}
                    onChange={e => updateField('hoursAlone', e.target.value)}
                  >
                    <option value="">Select...</option>
                    <option value="0-2">0-2 hours</option>
                    <option value="2-4">2-4 hours</option>
                    <option value="4-6">4-6 hours</option>
                    <option value="6-8">6-8 hours</option>
                    <option value="8+">8+ hours</option>
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <label className={labelClass}>How will you exercise the dog? *</label>
                <textarea 
                  className={`${hasError('exercisePlan') ? inputErrorClass : inputClass} resize-none`}
                  rows={3}
                  value={formData.exercisePlan}
                  onChange={e => updateField('exercisePlan', e.target.value)}
                  placeholder="Walks, hikes, dog parks, backyard play..."
                />
              </div>
            </div>
          )}

          {/* Step 5: Additional Info & Submit */}
          {step === 5 && (
            <div className="animate-fade-up">
              <h4 className="text-lg font-normal mb-1 serif">Final Questions</h4>
              <p className="text-sm text-neutral-500 mb-4">Almost there!</p>
              
              {showErrors && !isStepValid() && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-sm text-red-600">
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  Please fill in all required fields and accept the agreement
                </div>
              )}
              
              <div className="mb-4">
                <label className={labelClass}>Why do you want to adopt {dog.name}? *</label>
                <textarea 
                  className={`${hasError('whyAdopt') ? inputErrorClass : inputClass} resize-none`}
                  rows={4}
                  value={formData.whyAdopt}
                  onChange={e => updateField('whyAdopt', e.target.value)}
                  placeholder="Tell us what drew you to this dog..."
                />
              </div>
              
              <div className="mb-6">
                <label className={labelClass}>Any additional experience or information</label>
                <textarea 
                  className={`${inputClass} resize-none`}
                  rows={3}
                  value={formData.experience}
                  onChange={e => updateField('experience', e.target.value)}
                  placeholder="Training experience, breed knowledge, special skills..."
                />
              </div>
              
              <div className={`rounded-xl p-4 mb-6 transition-all ${hasError('agreement') ? 'bg-red-50 border border-red-200' : 'bg-neutral-50'}`}>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input 
                    type="checkbox"
                    checked={formData.agreement}
                    onChange={e => updateField('agreement', e.target.checked)}
                    className={`w-5 h-5 rounded mt-0.5 focus:ring-neutral-900 ${hasError('agreement') ? 'border-red-300' : 'border-neutral-300 text-neutral-900'}`}
                  />
                  <span className={`text-sm ${hasError('agreement') ? 'text-red-600' : 'text-neutral-600'}`}>
                    I understand that submitting this application does not guarantee adoption. I certify that all information provided is accurate and truthful. I agree to allow a home visit and reference checks as part of the adoption process.
                  </span>
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-neutral-100 flex-shrink-0">
          <div className="flex gap-3">
            {step > 1 && (
              <button 
                onClick={prevStep}
                className="px-6 py-3.5 border border-neutral-200 text-neutral-700 rounded-xl font-medium text-sm hover:bg-neutral-50 transition-colors"
              >
                Back
              </button>
            )}
            
            {step < totalSteps ? (
              <button 
                onClick={nextStep}
                className="flex-1 bg-neutral-900 text-white py-3.5 px-6 rounded-xl font-medium text-sm hover:bg-neutral-800 transition-colors"
              >
                Continue
              </button>
            ) : (
              <button 
                onClick={handleSubmit}
                disabled={!formData.agreement || isSubmitting}
                className="flex-1 bg-neutral-900 text-white py-3.5 px-6 rounded-xl font-medium text-sm hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Submitting...
                  </>
                ) : (
                  'Submit Application'
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationForm;
