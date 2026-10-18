import React, { useState } from 'react';
import { FiveVenturesLogo } from '../common/Logo';
import { useI18n } from '../../context/I18nContext';
import { useTheme } from '../../context/ThemeContext';
import { Phone, MessageCircle, Moon, Sun, Menu, X, ShieldAlert } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenQuoteModal?: (sector?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenQuoteModal,
}) => {
  const { language, setLanguage, t } = useI18n();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: t.nav.home },
    { id: 'about', label: t.nav.about },
    { id: 'services', label: t.nav.services },
    { id: 'projects', label: t.nav.projects },
    { id: 'products', label: t.nav.products },
    { id: 'contact', label: t.nav.contact },
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Top Emergency & Info Bar for Mobile/Desktop */}
      <div className="bg-[#0F3D2E] text-slate-100 text-xs py-1.5 px-4 sm:px-8 border-b border-emerald-950/40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            <span className="hidden sm:inline text-emerald-200">
              Yaoundé, Cameroun · Quartier Bastos
            </span>
            <span className="hidden sm:inline text-emerald-600">|</span>
            <a
              href="tel:+237675811131"
              className="flex items-center gap-1.5 hover:text-orange-300 transition-colors"
            >
              <Phone className="w-3 h-3 text-[#E8751A]" />
              <span className="font-mono tabular-nums">+237 675 81 11 31</span>
            </a>
            <span className="text-emerald-700">·</span>
            <a
              href="tel:+237655733541"
              className="hidden md:flex items-center gap-1.5 hover:text-orange-300 transition-colors"
            >
              <span className="font-mono tabular-nums">+237 655 73 35 41</span>
            </a>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <a
              href="https://wa.me/237699649535"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-orange-300 hover:text-orange-200 font-medium transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">WhatsApp Direct :</span>
              <span className="font-mono tabular-nums">+237 699 64 95 35</span>
            </a>
            <button
              onClick={() => handleNavClick('admin')}
              className="flex items-center gap-1 text-emerald-200 hover:text-white transition-colors"
              title="Accès Espace Administrateur"
            >
              <ShieldAlert className="w-3 h-3 text-orange-400" />
              <span className="hidden lg:inline">{t.nav.admin}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Top Bar (Standard Top Bar Contract: 3 zones separated by gap-8) */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
          
          {/* Zone 1: Single Brand element */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center text-left shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E8751A] rounded"
          >
            <FiveVenturesLogo variant="auto" size="md" />
          </button>

          {/* Zone 2: 4-5 single-line nav links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-700 dark:text-slate-200">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`relative py-1 transition-colors whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'text-[#0F3D2E] dark:text-emerald-400 font-bold'
                      : 'hover:text-[#0F3D2E] dark:hover:text-emerald-400'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#E8751A] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 Primary Action + Utility Toggles */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Language Selector (FR / EN) */}
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg p-0.5 border border-slate-200 dark:border-slate-700">
              <button
                onClick={() => setLanguage('fr')}
                className={`px-2 py-1 text-xs font-bold rounded-md transition-all ${
                  language === 'fr'
                    ? 'bg-[#0F3D2E] text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
                title="Passer en Français"
              >
                FR
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-2 py-1 text-xs font-bold rounded-md transition-all ${
                  language === 'en'
                    ? 'bg-[#0F3D2E] text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
                title="Switch to English"
              >
                EN
              </button>
            </div>

            {/* Dark/Light mode toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors border border-slate-200 dark:border-slate-700"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-orange-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700" />
              )}
            </button>

            {/* Primary Action Button */}
            <button
              onClick={() => {
                if (onOpenQuoteModal) {
                  onOpenQuoteModal();
                } else {
                  handleNavClick('contact');
                }
              }}
              className="hidden sm:inline-flex items-center justify-center px-4 py-2.5 text-xs font-bold text-white bg-[#0F3D2E] hover:bg-[#175440] active:scale-98 rounded-lg shadow-sm border border-emerald-900 transition-all whitespace-nowrap shrink-0"
            >
              {t.nav.cta_quote}
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`w-full text-left py-3 px-3 rounded-lg text-base font-semibold transition-colors ${
                    activeTab === link.id
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 text-[#0F3D2E] dark:text-emerald-400'
                      : 'text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  {link.label}
                </button>
              ))}

              <div className="pt-3 mt-2 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
                <button
                  onClick={() => handleNavClick('admin')}
                  className="w-full py-2.5 px-3 text-left rounded-lg text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2"
                >
                  <ShieldAlert className="w-4 h-4 text-orange-500" />
                  <span>{t.nav.admin}</span>
                </button>

                <button
                  onClick={() => {
                    handleNavClick('contact');
                  }}
                  className="w-full mt-2 py-3 px-4 text-center text-sm font-bold text-white bg-[#0F3D2E] rounded-lg shadow-sm"
                >
                  {t.nav.cta_quote}
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
