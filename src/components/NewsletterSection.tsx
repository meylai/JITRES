import React, { useState } from 'react';
import { Check, AlertCircle, ArrowRight, Loader2 } from 'lucide-react';
import { newsletterService } from '../services/api';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setStatus('error');
      setMessage('Please enter your email address.');
      return;
    }

    setStatus('loading');
    try {
      const res = await newsletterService.subscribe(email);
      if (res.success) {
        setStatus('success');
        setMessage(res.message);
        setEmail('');
      } else {
        setStatus('error');
        setMessage(res.message);
      }
    } catch {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <section id="newsletter" className="py-20 lg:py-24 bg-[#F7F5F0] border-t border-[#E5E1DA]">
      <div className="max-w-[720px] mx-auto px-4 sm:px-6 text-center">
        <span className="text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.12em] text-[#8A7658] block mb-3">
          The Community
        </span>
        <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#171717] mb-4">
          Stay Rooted.
        </h2>
        <p className="text-sm sm:text-base text-[#73716C] max-w-md mx-auto mb-8 leading-relaxed">
          Be the first to discover new drops, collections, and stories from the brand. No spam, just faith and purpose.
        </p>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto" noValidate>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status !== 'idle') setStatus('idle');
              }}
              placeholder="Enter your email address"
              disabled={status === 'loading'}
              className="flex-1 bg-white border border-[#E5E1DA] px-4 py-3 text-sm text-[#171717] placeholder-[#73716C] rounded-xs focus:outline-none focus:border-[#171717] focus:ring-1 focus:ring-[#171717] disabled:opacity-50"
              aria-label="Email address for community newsletter"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="bg-[#171717] hover:bg-[#333333] text-white px-6 py-3 text-xs uppercase tracking-[0.08em] font-medium rounded-xs transition-colors flex items-center justify-center space-x-2 disabled:opacity-70 flex-shrink-0"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Subscribing...</span>
                </>
              ) : (
                <>
                  <span>Join The Community</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>

          {/* Feedback Messages */}
          {status === 'success' && (
            <div className="mt-3 flex items-center justify-center text-xs text-emerald-700 space-x-1.5" role="status">
              <Check className="w-4 h-4" />
              <span>{message}</span>
            </div>
          )}

          {status === 'error' && (
            <div className="mt-3 flex items-center justify-center text-xs text-rose-700 space-x-1.5" role="alert">
              <AlertCircle className="w-4 h-4" />
              <span>{message}</span>
            </div>
          )}
        </form>
      </div>
    </section>
  );
};
