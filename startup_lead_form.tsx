import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Check } from 'lucide-react';

const StartupLeadForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Founder Info
    fullName: '',
    workEmail: '',
    phoneNumber: '',
    
    // Step 2: Startup Info
    startupName: '',
    websiteUrl: '',
    startupStage: '',
    industry: '',
    location: '',
    teamSize: '',
    
    // Step 3: Your Needs
    needs: [],
    description: '',
    
    // Step 4: Fundraising + Consent
    hasRaisedFunding: '',
    fundingDetails: '',
    currentlyRaising: '',
    raisingAmount: '',
    hearAboutUs: '',
    privacyConsent: false,
    updatesConsent: false
  });

  const [errors, setErrors] = useState({});

  const steps = [
    { number: 1, title: 'Founder Info' },
    { number: 2, title: 'Startup Info' },
    { number: 3, title: 'Your Needs' },
    { number: 4, title: 'Fundraising & Consent' }
  ];

  const startupStages = [
    'Idea',
    'MVP',
    'Beta Users',
    'Revenue-Generating',
    'Scaling'
  ];

  const industries = [
    'Fintech',
    'Edtech',
    'SaaS',
    'AI',
    'Healthtech',
    'D2C',
    'Other'
  ];

  const teamSizes = [
    '1-5',
    '6-15',
    '16-50',
    '51+'
  ];

  const needsOptions = [
    'Funding',
    'Mentorship',
    'Partnerships',
    'PR',
    'Hiring Help',
    'Product Feedback'
  ];

  const hearAboutUsOptions = [
    'LinkedIn',
    'Google',
    'Referral',
    'Newsletter',
    'Instagram',
    'Other'
  ];

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 1:
        if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
        if (!formData.workEmail.trim()) {
          newErrors.workEmail = 'Work email is required';
        } else if (!validateEmail(formData.workEmail)) {
          newErrors.workEmail = 'Please enter a valid email address';
        }
        break;

      case 2:
        if (!formData.startupName.trim()) newErrors.startupName = 'Startup name is required';
        if (!formData.startupStage) newErrors.startupStage = 'Startup stage is required';
        if (!formData.industry) newErrors.industry = 'Industry is required';
        if (!formData.location.trim()) newErrors.location = 'Location is required';
        break;

      case 3:
        if (formData.needs.length === 0) newErrors.needs = 'Please select at least one need';
        break;

      case 4:
        if (!formData.hasRaisedFunding) newErrors.hasRaisedFunding = 'Please select an option';
        if (!formData.currentlyRaising) newErrors.currentlyRaising = 'Please select an option';
        if (!formData.privacyConsent) newErrors.privacyConsent = 'Privacy policy consent is required';
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  const handleNeedsChange = (need) => {
    setFormData(prev => ({
      ...prev,
      needs: prev.needs.includes(need) 
        ? prev.needs.filter(n => n !== need)
        : [...prev.needs, need]
    }));
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = () => {
    if (validateStep(4)) {
      console.log('Form submitted:', formData);
      alert('Thank you! Your startup information has been submitted successfully.');
    }
  };

  const renderProgressBar = () => (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step.number < currentStep 
                ? 'bg-[#0DA6A6] text-white' 
                : step.number === currentStep 
                  ? 'bg-[#0DA6A6] text-white' 
                  : 'bg-gray-300 text-gray-600'
            }`}>
              {step.number < currentStep ? <Check size={16} /> : step.number}
            </div>
            <span className={`ml-2 text-sm font-medium ${
              step.number <= currentStep ? 'text-[#0DA6A6]' : 'text-gray-500'
            }`}>
              {step.title}
            </span>
            {index < steps.length - 1 && (
              <div className={`w-8 h-0.5 mx-4 ${
                step.number < currentStep ? 'bg-[#0DA6A6]' : 'bg-gray-300'
              }`} />
            )}
          </div>
        ))}
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-[#0DA6A6] h-2 rounded-full transition-all duration-300"
          style={{ width: `${(currentStep / 4) * 100}%` }}
        />
      </div>
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={formData.fullName}
          onChange={(e) => handleInputChange('fullName', e.target.value)}
          className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#0DA6A6] focus:border-transparent ${
            errors.fullName ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Enter your full name"
        />
        {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Work Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          value={formData.workEmail}
          onChange={(e) => handleInputChange('workEmail', e.target.value)}
          className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#0DA6A6] focus:border-transparent ${
            errors.workEmail ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Enter your business email"
        />
        {errors.workEmail && <p className="text-red-500 text-sm mt-1">{errors.workEmail}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Phone Number <span className="text-gray-500">(Optional)</span>
        </label>
        <input
          type="tel"
          value={formData.phoneNumber}
          onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0DA6A6] focus:border-transparent"
          placeholder="Enter your phone number"
        />
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Startup Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={formData.startupName}
          onChange={(e) => handleInputChange('startupName', e.target.value)}
          className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#0DA6A6] focus:border-transparent ${
            errors.startupName ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Enter your startup name"
        />
        {errors.startupName && <p className="text-red-500 text-sm mt-1">{errors.startupName}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Website URL <span className="text-gray-500">(Optional but preferred)</span>
        </label>
        <input
          type="url"
          value={formData.websiteUrl}
          onChange={(e) => handleInputChange('websiteUrl', e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0DA6A6] focus:border-transparent"
          placeholder="https://your-startup.com"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Startup Stage <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.startupStage}
            onChange={(e) => handleInputChange('startupStage', e.target.value)}
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#0DA6A6] focus:border-transparent ${
              errors.startupStage ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select stage</option>
            {startupStages.map(stage => (
              <option key={stage} value={stage}>{stage}</option>
            ))}
          </select>
          {errors.startupStage && <p className="text-red-500 text-sm mt-1">{errors.startupStage}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Industry <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.industry}
            onChange={(e) => handleInputChange('industry', e.target.value)}
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#0DA6A6] focus:border-transparent ${
              errors.industry ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select industry</option>
            {industries.map(industry => (
              <option key={industry} value={industry}>{industry}</option>
            ))}
          </select>
          {errors.industry && <p className="text-red-500 text-sm mt-1">{errors.industry}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Location <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={formData.location}
          onChange={(e) => handleInputChange('location', e.target.value)}
          className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#0DA6A6] focus:border-transparent ${
            errors.location ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="City, Country"
        />
        {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Team Size <span className="text-gray-500">(Optional)</span>
        </label>
        <select
          value={formData.teamSize}
          onChange={(e) => handleInputChange('teamSize', e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0DA6A6] focus:border-transparent"
        >
          <option value="">Select team size</option>
          {teamSizes.map(size => (
            <option key={size} value={size}>{size}</option>
          ))}
        </select>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          What are you looking for? <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {needsOptions.map(need => (
            <label key={need} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.needs.includes(need)}
                onChange={() => handleNeedsChange(need)}
                className="w-4 h-4 text-[#0DA6A6] border-gray-300 rounded focus:ring-[#0DA6A6]"
              />
              <span className="text-sm text-gray-700">{need}</span>
            </label>
          ))}
        </div>
        {errors.needs && <p className="text-red-500 text-sm mt-1">{errors.needs}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Briefly describe your startup or current challenge <span className="text-gray-500">(Optional)</span>
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          rows={4}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0DA6A6] focus:border-transparent"
          placeholder="Tell us about your startup, what you're building, or any specific challenges you're facing..."
        />
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Have you raised any funding? <span className="text-red-500">*</span>
        </label>
        <div className="space-y-2">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="hasRaisedFunding"
              value="yes"
              checked={formData.hasRaisedFunding === 'yes'}
              onChange={(e) => handleInputChange('hasRaisedFunding', e.target.value)}
              className="w-4 h-4 text-[#0DA6A6] border-gray-300 focus:ring-[#0DA6A6]"
            />
            <span className="text-sm text-gray-700">Yes</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="hasRaisedFunding"
              value="no"
              checked={formData.hasRaisedFunding === 'no'}
              onChange={(e) => handleInputChange('hasRaisedFunding', e.target.value)}
              className="w-4 h-4 text-[#0DA6A6] border-gray-300 focus:ring-[#0DA6A6]"
            />
            <span className="text-sm text-gray-700">No</span>
          </label>
        </div>
        {errors.hasRaisedFunding && <p className="text-red-500 text-sm mt-1">{errors.hasRaisedFunding}</p>}
      </div>

      {formData.hasRaisedFunding === 'yes' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            How much and from whom? <span className="text-gray-500">(Optional)</span>
          </label>
          <input
            type="text"
            value={formData.fundingDetails}
            onChange={(e) => handleInputChange('fundingDetails', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0DA6A6] focus:border-transparent"
            placeholder="e.g., $500K from angel investors, $2M Series A from XYZ Ventures"
          />
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Are you currently raising funds? <span className="text-red-500">*</span>
        </label>
        <div className="space-y-2">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="currentlyRaising"
              value="yes"
              checked={formData.currentlyRaising === 'yes'}
              onChange={(e) => handleInputChange('currentlyRaising', e.target.value)}
              className="w-4 h-4 text-[#0DA6A6] border-gray-300 focus:ring-[#0DA6A6]"
            />
            <span className="text-sm text-gray-700">Yes</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="currentlyRaising"
              value="no"
              checked={formData.currentlyRaising === 'no'}
              onChange={(e) => handleInputChange('currentlyRaising', e.target.value)}
              className="w-4 h-4 text-[#0DA6A6] border-gray-300 focus:ring-[#0DA6A6]"
            />
            <span className="text-sm text-gray-700">No</span>
          </label>
        </div>
        {errors.currentlyRaising && <p className="text-red-500 text-sm mt-1">{errors.currentlyRaising}</p>}
      </div>

      {formData.currentlyRaising === 'yes' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            How much are you looking to raise? <span className="text-gray-500">(Optional)</span>
          </label>
          <input
            type="text"
            value={formData.raisingAmount}
            onChange={(e) => handleInputChange('raisingAmount', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0DA6A6] focus:border-transparent"
            placeholder="e.g., $1M, $5M Series A"
          />
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          How did you hear about us? <span className="text-gray-500">(Optional)</span>
        </label>
        <select
          value={formData.hearAboutUs}
          onChange={(e) => handleInputChange('hearAboutUs', e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0DA6A6] focus:border-transparent"
        >
          <option value="">Select source</option>
          {hearAboutUsOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>

      <div className="border-t pt-6">
        <div className="space-y-4">
          <label className="flex items-start space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.privacyConsent}
              onChange={(e) => handleInputChange('privacyConsent', e.target.checked)}
              className="w-4 h-4 text-[#0DA6A6] border-gray-300 rounded focus:ring-[#0DA6A6] mt-1"
            />
            <div>
              <span className="text-sm text-gray-700">
                I agree to the <a href="#" className="text-[#0DA6A6] hover:underline">privacy policy</a>. <span className="text-red-500">*</span>
              </span>
            </div>
          </label>
          {errors.privacyConsent && <p className="text-red-500 text-sm">{errors.privacyConsent}</p>}

          <label className="flex items-start space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.updatesConsent}
              onChange={(e) => handleInputChange('updatesConsent', e.target.checked)}
              className="w-4 h-4 text-[#0DA6A6] border-gray-300 rounded focus:ring-[#0DA6A6] mt-1"
            />
            <span className="text-sm text-gray-700">
              Send me updates, resources, and event invites. <span className="text-gray-500">(Optional)</span>
            </span>
          </label>
        </div>
      </div>
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      case 4:
        return renderStep4();
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#F5FFFF] py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Logo placeholder */}
          <div className="text-center mb-8">
            <div className="w-32 h-12 bg-gray-200 rounded-lg mx-auto mb-4 flex items-center justify-center text-gray-500 text-sm">
              Your Logo Here
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Join Our Startup Community</h1>
            <p className="text-gray-600">Connect with funding, mentorship, and partnership opportunities</p>
          </div>

          {/* Progress Bar */}
          {renderProgressBar()}

          {/* Step Content */}
          <div className="mb-8">
            {renderStepContent()}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                currentStep === 1
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-[#0DA6A6] text-white hover:bg-[#0DA6A6]/90'
              }`}
            >
              <ChevronLeft size={16} />
              <span>Previous</span>
            </button>

            <div className="flex space-x-4">
              {currentStep < 4 && (
                <button
                  onClick={nextStep}
                  className="flex items-center space-x-2 bg-[#0DA6A6] text-white px-6 py-2 rounded-lg hover:bg-[#0DA6A6]/90 transition-colors"
                >
                  <span>Next</span>
                  <ChevronRight size={16} />
                </button>
              )}
              
              {currentStep === 4 && (
                <button
                  onClick={handleSubmit}
                  className="bg-[#0DA6A6] text-white px-6 py-2 rounded-lg hover:bg-[#0DA6A6]/90 transition-colors font-medium"
                >
                  Submit Your Startup
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartupLeadForm;