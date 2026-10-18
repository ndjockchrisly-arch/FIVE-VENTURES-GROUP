import React from 'react';
import { FiveVenturesLogo } from '../common/Logo';
import { useI18n } from '../../context/I18nContext';
import { Phone, Mail, MapPin, MessageCircle, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  const { t } = useI18n();

  const handleNav = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-12">
          
          {/* Col 1: Brand & Presentation */}
          <div className="flex flex-col gap-4">
            <FiveVenturesLogo variant="light" size="md" />
            <p className="text-xs text-orange-400 font-semibold italic">
              « Plus qu'une entreprise, un partenaire ! »
            </p>
            <p className="text-sm text-slate-400 leading-relaxed">
              {t.footer.tagline}
            </p>
            <div className="mt-2 pt-2 border-t border-slate-800/80 text-xs text-slate-400 space-y-0.5">
              <p>RCCM : CM-Yaoundé-2025-B-1429</p>
              <p>B.P. 1234 Yaoundé, Cameroun</p>
              <p>www.fiveventuresgroup.cm</p>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="flex flex-col gap-3">
            <h4 className="text-white text-sm font-bold tracking-wider uppercase">
              {t.footer.navigation}
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  {t.nav.home}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  {t.nav.about}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('services')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  {t.nav.services}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('projects')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  {t.nav.projects}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('products')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  {t.nav.products}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('contact')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  {t.nav.contact}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: 4 Strategic Poles */}
          <div className="flex flex-col gap-3">
            <h4 className="text-white text-sm font-bold tracking-wider uppercase">
              {t.footer.poles}
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E8751A]" />
                <span>Prestations de Services</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E8751A]" />
                <span>Commerce Général & Gros</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E8751A]" />
                <span>Import-Export & Fret CEMAC</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E8751A]" />
                <span>BTP & Génie Civil</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Cliquable Contact Details */}
          <div className="flex flex-col gap-3">
            <h4 className="text-white text-sm font-bold tracking-wider uppercase">
              {t.footer.contacts}
            </h4>
            <div className="space-y-3 text-sm text-slate-300">
              <a
                href="tel:+237675811131"
                className="flex items-start gap-2.5 hover:text-[#E8751A] transition-colors"
              >
                <Phone className="w-4 h-4 text-[#E8751A] shrink-0 mt-0.5" />
                <span className="font-mono tabular-nums">+237 675 81 11 31</span>
              </a>

              <a
                href="tel:+237655733541"
                className="flex items-start gap-2.5 hover:text-[#E8751A] transition-colors"
              >
                <Phone className="w-4 h-4 text-[#E8751A] shrink-0 mt-0.5" />
                <span className="font-mono tabular-nums">+237 655 73 35 41</span>
              </a>

              <a
                href="https://wa.me/237699649535"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2.5 hover:text-emerald-400 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-mono tabular-nums">+237 699 64 95 35</span>
                  <span className="block text-xs text-slate-400">(WhatsApp Direct)</span>
                </div>
              </a>

              <a
                href="mailto:fiveventuresgroup@gmail.com"
                className="flex items-start gap-2.5 hover:text-[#E8751A] transition-colors break-all"
              >
                <Mail className="w-4 h-4 text-[#E8751A] shrink-0 mt-0.5" />
                <span>fiveventuresgroup@gmail.com</span>
              </a>

              <div className="flex items-start gap-2.5 text-slate-400">
                <MapPin className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <span>Quartier Bastos, Yaoundé, Cameroun</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-8 mt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Five Ventures Group. {t.footer.rights}</p>
          <div className="flex items-center gap-6">
            <button
              onClick={() => handleNav('legal')}
              className="hover:text-slate-200 transition-colors"
            >
              {t.footer.legal_link}
            </button>
            <span>·</span>
            <button
              onClick={() => handleNav('admin')}
              className="hover:text-emerald-400 transition-colors flex items-center gap-1"
            >
              <span>{t.nav.admin}</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
