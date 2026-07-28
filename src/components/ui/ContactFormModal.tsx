import React, { useState } from 'react';
import { X, Send, Mail, Github, Linkedin, Sparkles, CheckCircle } from 'lucide-react';
import { STUDENT_INFO } from '../../data/portfolioData';
import { soundFx } from '../../utils/audio';

interface ContactFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactFormModal: React.FC<ContactFormModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundFx.playWarpWhoosh();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#050505]/90 backdrop-blur-2xl animate-fadeIn">
      <div className="relative w-full max-w-xl bg-slate-950/95 border border-[#38BDF8]/40 rounded-3xl shadow-[0_0_50px_rgba(56,189,248,0.2)] overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 sm:p-8 border-b border-slate-800 bg-slate-900/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#38BDF8]/20 border border-[#38BDF8] flex items-center justify-center text-[#38BDF8]">
              <Sparkles className="w-5 h-5 animate-spin-slow" />
            </div>
            <div>
              <span className="text-xs font-mono tracking-widest text-[#38BDF8] uppercase">
                PORTAL DESTINATION
              </span>
              <h3 className="text-xl sm:text-2xl font-heading font-bold text-white">
                Let's Build Something Together
              </h3>
            </div>
          </div>
          <button
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6">
          {submitted ? (
            <div className="py-12 text-center space-y-4 animate-scaleUp">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 border border-emerald-500 flex items-center justify-center text-emerald-400">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-heading font-bold text-white">Transmission Received</h4>
              <p className="text-sm text-slate-300 max-w-sm mx-auto">
                Thank you for reaching out! Aarav Sharma will review your message and get back to you shortly.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="mt-4 px-6 py-2.5 rounded-xl bg-[#38BDF8] text-[#050505] font-mono font-bold text-xs"
              >
                RETURN TO UNIVERSE
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 font-body">
              <div>
                <label className="block text-xs font-mono text-slate-400 uppercase mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Sarah Connor"
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-[#38BDF8] focus:ring-1 focus:ring-[#38BDF8] text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 uppercase mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. sarah@cyberdyne.io"
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-[#38BDF8] focus:ring-1 focus:ring-[#38BDF8] text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 uppercase mb-2">
                  Message / Idea
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell me about your project, internship opportunity, or collaboration..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-[#38BDF8] focus:ring-1 focus:ring-[#38BDF8] text-sm resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-[#38BDF8] text-[#050505] font-mono font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 hover:bg-[#7dd3fc] hover:shadow-[0_0_25px_rgba(56,189,248,0.6)] transition-all disabled:opacity-50"
              >
                {loading ? (
                  <span>TRANSMITTING...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>TRANSMIT MESSAGE</span>
                  </>
                )}
              </button>
            </form>
          )}

          {/* Direct Social Links */}
          <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-400">
            <a
              href={`mailto:${STUDENT_INFO.email}`}
              className="flex items-center gap-2 hover:text-[#38BDF8] transition-colors"
            >
              <Mail className="w-4 h-4 text-[#38BDF8]" />
              <span>{STUDENT_INFO.email}</span>
            </a>

            <div className="flex items-center gap-3">
              <a
                href={STUDENT_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:text-[#38BDF8] transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={STUDENT_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:text-[#38BDF8] transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
