import React, { useState } from 'react';
import { MessageSquare, Send, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const FeedbackDialog: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFeedback('');
      setTimeout(() => {
        setIsSuccess(false);
        setIsOpen(false);
      }, 2000);
    }, 1000);
  };

  return (
    <>
      <button 
        id="feedback-trigger-btn"
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 text-xs text-slate-400 hover:text-emerald-400 transition-colors py-2 px-3 rounded-full border border-slate-800 hover:border-emerald-900/30 bg-slate-900/50 shadow-sm"
      >
        <MessageSquare className="w-3.5 h-3.5" />
        Feedback
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-2xl overflow-hidden shadow-2xl"
              id="feedback-modal-container"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-emerald-400" />
                    Share your feedback
                  </h3>
                  <button 
                    onClick={() => setIsOpen(false)} 
                    className="text-slate-500 hover:text-white p-1"
                    aria-label="Close"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {isSuccess ? (
                  <div className="py-12 text-center">
                    <motion.div 
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4"
                    >
                      <Send className="w-8 h-8 text-emerald-400" />
                    </motion.div>
                    <h4 className="text-white font-medium mb-1">Thank you!</h4>
                    <p className="text-slate-400 text-sm">Your feedback helps us build a better experience.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Found a bug? Have a feature request? We'd love to hear from you.
                    </p>
                    <textarea
                      required
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      placeholder="Type your message here..."
                      className="w-full h-32 bg-slate-950 border border-slate-800 rounded-xl p-4 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/50 transition-all resize-none"
                    />
                    <button
                      id="feedback-submit-btn"
                      disabled={isSubmitting || !feedback.trim()}
                      className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                    >
                      {isSubmitting ? 'Sending...' : (
                        <>
                          <Send className="w-4 h-4" />
                          Submit Feedback
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
