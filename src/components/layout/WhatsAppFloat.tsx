import React, { useState } from 'react';
import { useI18n } from '../../context/I18nContext';
import { MessageCircle, X, Send, ChevronRight } from 'lucide-react';

export const WhatsAppFloat: React.FC = () => {
  const { t, language } = useI18n();
  const [isOpen, setIsOpen] = useState(false);

  const whatsappNumber = '237699649535';

  const defaultGreeting = language === 'fr'
    ? 'Bonjour Five Ventures Group, je souhaite échanger avec vous concernant vos services.'
    : 'Hello Five Ventures Group, I would like to inquire about your services.';

  const handleStartChat = (customText?: string) => {
    const message = customText || defaultGreeting;
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  const topicOptions = [
    {
      label: t.whatsapp_widget.choice_btp,
      message: language === 'fr'
        ? 'Bonjour Five Ventures Group, je souhaite solliciter un devis pour des travaux BTP ou rénovation.'
        : 'Hello Five Ventures Group, I would like to request a quotation for civil works or renovation.',
    },
    {
      label: t.whatsapp_widget.choice_commerce,
      message: language === 'fr'
        ? 'Bonjour Five Ventures Group, je souhaite me renseigner sur la disponibilité et les prix de matériaux/fournitures de gros.'
        : 'Hello Five Ventures Group, I would like to inquire about wholesale materials and supplies pricing.',
    },
    {
      label: t.whatsapp_widget.choice_import,
      message: language === 'fr'
        ? 'Bonjour Five Ventures Group, j\'ai une demande relative au transit, fret ou import-export en zone CEMAC.'
        : 'Hello Five Ventures Group, I have an inquiry regarding freight forwarding, transit, or import-export in the CEMAC region.',
    },
    {
      label: t.whatsapp_widget.choice_service,
      message: language === 'fr'
        ? 'Bonjour Five Ventures Group, je souhaite échanger sur une prestation de services ou une assistance technique.'
        : 'Hello Five Ventures Group, I would like to discuss technical services and corporate assistance.',
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Interactive Quick Popup Card */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          {/* Card Header */}
          <div className="bg-[#0F3D2E] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-800 flex items-center justify-center border border-emerald-600">
                <MessageCircle className="w-5 h-5 text-[#E8751A]" />
              </div>
              <div>
                <h4 className="text-sm font-bold leading-tight">
                  {t.whatsapp_widget.title}
                </h4>
                <p className="text-[11px] text-emerald-200">
                  {t.whatsapp_widget.subtitle}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-md text-emerald-200 hover:text-white hover:bg-emerald-800 transition-colors"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Card Body */}
          <div className="p-4 bg-slate-50 dark:bg-slate-950/60 flex flex-col gap-3">
            <div className="bg-white dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 shadow-xs">
              <p className="font-medium">{t.whatsapp_widget.prompt}</p>
              <p className="text-[11px] text-slate-500 mt-1">
                Ligne officielle : <span className="font-mono tabular-nums font-bold text-slate-800 dark:text-slate-200">+237 699 64 95 35</span>
              </p>
            </div>

            <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 mt-1">
              Sélectionnez votre sujet :
            </p>

            <div className="flex flex-col gap-1.5">
              {topicOptions.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleStartChat(opt.message)}
                  className="w-full text-left px-3 py-2 text-xs font-medium bg-white dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-lg flex items-center justify-between group transition-all"
                >
                  <span className="truncate pr-2">{opt.label}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#E8751A] shrink-0 transition-transform group-hover:translate-x-0.5" />
                </button>
              ))}
            </div>

            <button
              onClick={() => handleStartChat()}
              className="mt-2 w-full py-2.5 px-4 bg-[#25D366] hover:bg-[#20ba59] active:scale-98 text-white text-xs font-bold rounded-lg shadow-sm flex items-center justify-center gap-2 transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{t.whatsapp_widget.btn_chat}</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Circular Floating Bubble */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-[#25D366] hover:bg-[#20ba59] active:scale-95 text-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-300 cursor-pointer relative"
        aria-label="Contacter sur WhatsApp"
        title="WhatsApp Direct : +237 699 64 95 35"
      >
        {isOpen ? (
          <X className="w-7 h-7" />
        ) : (
          <>
            <MessageCircle className="w-7 h-7" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#E8751A] rounded-full border-2 border-white flex items-center justify-center text-[9px] font-bold text-white">
              1
            </span>
          </>
        )}
      </button>
    </div>
  );
};
