import React, { useState, useEffect } from 'react';
import { useI18n } from '../../context/I18nContext';
import { useData } from '../../context/DataContext';
import { ActivitySector } from '../../types';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Send,
  CheckCircle2,
  AlertCircle,
  Building,
  ShieldCheck,
} from 'lucide-react';

interface ContactPageProps {
  initialActivity?: ActivitySector;
  initialMessage?: string;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  initialActivity = 'btp',
  initialMessage = '',
}) => {
  const { t } = useI18n();
  const { addQuote } = useData();

  // Form State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [activity, setActivity] = useState<ActivitySector>(initialActivity);
  const [message, setMessage] = useState(initialMessage);
  const [budget, setBudget] = useState('');
  const [projectDate, setProjectDate] = useState('');
  const [sendViaWhatsapp, setSendViaWhatsapp] = useState(true);

  // Anti-Spam Honeypot
  const [honeypot, setHoneypot] = useState('');

  // UI State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [lastSubmittedQuote, setLastSubmittedQuote] = useState<{
    name: string;
    activity: string;
    message: string;
  } | null>(null);

  useEffect(() => {
    if (initialActivity) {
      setActivity(initialActivity);
    }
    if (initialMessage) {
      setMessage(initialMessage);
    }
  }, [initialActivity, initialMessage]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // 1. Anti-spam honeypot detection
    if (honeypot) {
      console.warn('Bot submission caught via honeypot.');
      setSubmitSuccess(true);
      return;
    }

    // 2. Client-side validation
    if (!name.trim()) {
      setErrorMessage('Veuillez renseigner votre nom complet ou le nom de votre entreprise.');
      return;
    }
    if (!phone.trim()) {
      setErrorMessage('Veuillez saisir un numéro de téléphone joignable (ex: 675 81 11 31).');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Veuillez saisir une adresse e-mail valide pour recevoir l\'accusé de réception.');
      return;
    }
    if (!message.trim() || message.trim().length < 10) {
      setErrorMessage('Veuillez décrire votre projet ou besoin avec un minimum de détails (au moins 10 caractères).');
      return;
    }

    setIsSubmitting(true);

    try {
      await addQuote({
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim(),
        activity,
        message: message.trim(),
        budget: budget.trim() || undefined,
        project_date: projectDate.trim() || undefined,
        sent_via_whatsapp: sendViaWhatsapp,
      });

      setLastSubmittedQuote({
        name: name.trim(),
        activity,
        message: message.trim(),
      });

      setSubmitSuccess(true);
    } catch (err) {
      setErrorMessage('Une erreur est survenue lors de l\'enregistrement. Vous pouvez nous joindre directement par téléphone ou WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenWhatsApp = () => {
    const activityLabels = {
      btp: 'BTP & Travaux Publics',
      commerce: 'Commerce Général & Matériaux',
      import_export: 'Import-Export & Fret CEMAC',
      services: 'Prestations de Services & Conseil',
      multi: 'Projet Multisectoriel',
    };

    const quoteMsg = lastSubmittedQuote
      ? `Bonjour Five Ventures Group, je viens de soumettre une demande de devis sur votre site web.\n\nNom: ${lastSubmittedQuote.name}\nPôle: ${activityLabels[lastSubmittedQuote.activity as ActivitySector] || lastSubmittedQuote.activity}\nProjet: ${lastSubmittedQuote.message}`
      : `Bonjour Five Ventures Group, je souhaite solliciter une cotation pour mes travaux ou approvisionnements.`;

    const url = `https://wa.me/237699649535?text=${encodeURIComponent(quoteMsg)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleResetForm = () => {
    setName('');
    setPhone('');
    setEmail('');
    setMessage('');
    setBudget('');
    setProjectDate('');
    setSubmitSuccess(false);
  };

  return (
    <div className="w-full bg-slate-50 dark:bg-slate-900 transition-colors">
      {/* Header */}
      <section className="bg-[#0F3D2E] text-white py-16 sm:py-20 border-b border-emerald-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-orange-400 mb-2 block">
              Orientation & Chiffrage
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
              {t.contact.title}
            </h1>
            <p className="text-base sm:text-lg text-emerald-100/90 leading-relaxed">
              {t.contact.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Main Grid: Info + Form */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Column: Coordinates & Map (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-8">
              <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-xs">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                  {t.contact.info_title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                  {t.contact.info_desc}
                </p>

                <div className="space-y-4 text-xs sm:text-sm">
                  {/* Phone 1 */}
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                    <Phone className="w-4 h-4 text-[#E8751A] mt-0.5 shrink-0" />
                    <div>
                      <span className="text-slate-500 text-[11px] block">Ligne Téléphonique 1</span>
                      <a
                        href="tel:+237675811131"
                        className="font-bold text-slate-900 dark:text-white hover:text-[#E8751A] font-mono tabular-nums transition-colors"
                      >
                        +237 675 81 11 31
                      </a>
                    </div>
                  </div>

                  {/* Phone 2 */}
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                    <Phone className="w-4 h-4 text-[#E8751A] mt-0.5 shrink-0" />
                    <div>
                      <span className="text-slate-500 text-[11px] block">Ligne Téléphonique 2</span>
                      <a
                        href="tel:+237655733541"
                        className="font-bold text-slate-900 dark:text-white hover:text-[#E8751A] font-mono tabular-nums transition-colors"
                      >
                        +237 655 73 35 41
                      </a>
                    </div>
                  </div>

                  {/* WhatsApp */}
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-800">
                    <MessageCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
                    <div>
                      <span className="text-emerald-800 dark:text-emerald-300 text-[11px] block font-semibold">
                        {t.contact.whatsapp_title}
                      </span>
                      <a
                        href="https://wa.me/237699649535"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold text-emerald-900 dark:text-emerald-200 hover:underline font-mono tabular-nums"
                      >
                        +237 699 64 95 35
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                    <Mail className="w-4 h-4 text-[#E8751A] mt-0.5 shrink-0" />
                    <div>
                      <span className="text-slate-500 text-[11px] block">{t.contact.email}</span>
                      <a
                        href="mailto:fiveventuresgroup@gmail.com"
                        className="font-bold text-slate-900 dark:text-white hover:text-[#E8751A] transition-colors break-all"
                      >
                        fiveventuresgroup@gmail.com
                      </a>
                    </div>
                  </div>

                  {/* Physical Address */}
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                    <MapPin className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" />
                    <div>
                      <span className="text-slate-500 text-[11px] block">{t.contact.address}</span>
                      <p className="font-semibold text-slate-900 dark:text-white">
                        Quartier Bastos, Yaoundé, Cameroun
                      </p>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                    <Clock className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" />
                    <div>
                      <span className="text-slate-500 text-[11px] block">{t.contact.hours}</span>
                      <p className="font-semibold text-slate-900 dark:text-white">
                        {t.contact.hours_detail}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Google Maps Embed - Yaoundé Bastos */}
              <div className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-xs">
                <div className="p-4 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#E8751A]" />
                    <span>Plan d'Accès : Yaoundé (Bastos)</span>
                  </span>
                  <a
                    href="https://maps.google.com/?q=Bastos,Yaounde,Cameroon"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-[#E8751A] hover:underline"
                  >
                    Ouvrir dans Maps →
                  </a>
                </div>
                <div className="h-64 w-full bg-slate-100">
                  <iframe
                    title="Five Ventures Group Yaounde Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15923.011681944883!2d11.5033877!3d3.8837367!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x108bcf4b63ff878d%3A0xc3cf33ecba3648eb!2sBastos%2C%20Yaound%C3%A9!5e0!3m2!1sfr!2scm!4v1710000000000!5m2!1sfr!2scm"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>

            {/* Right Column: Quote Form (7 cols) */}
            <div className="lg:col-span-7">
              <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-700 shadow-xs">
                
                {submitSuccess ? (
                  /* Success State */
                  <div className="py-8 text-center animate-in fade-in duration-300">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center mb-6">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>

                    <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mb-3">
                      {t.contact.success_title}
                    </h3>

                    <p className="text-sm text-slate-600 dark:text-slate-300 max-w-lg mx-auto mb-8 leading-relaxed">
                      {t.contact.success_message}
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                      <button
                        onClick={handleOpenWhatsApp}
                        className="w-full sm:w-auto px-6 py-3.5 bg-[#25D366] hover:bg-[#20ba59] active:scale-98 text-white font-bold text-xs sm:text-sm rounded-xl shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>{t.contact.whatsapp_redirect_cta}</span>
                      </button>

                      <button
                        onClick={handleResetForm}
                        className="w-full sm:w-auto px-6 py-3.5 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs sm:text-sm font-bold rounded-xl hover:bg-slate-200 transition-colors cursor-pointer"
                      >
                        {t.contact.new_request_btn}
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Form Input */
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mb-2">
                        {t.contact.form_title}
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                        Remplissez les informations ci-dessous. Devis gratuit sous 24h ouvrées.
                      </p>
                    </div>

                    {errorMessage && (
                      <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-xs text-red-700 dark:text-red-300 flex items-start gap-2.5">
                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                        <span>{errorMessage}</span>
                      </div>
                    )}

                    {/* Anti-spam hidden honeypot field */}
                    <div className="hidden" aria-hidden="true">
                      <label htmlFor="website_bot_trap">{t.contact.honeypot_label}</label>
                      <input
                        type="text"
                        id="website_bot_trap"
                        name="website_bot_trap"
                        tabIndex={-1}
                        autoComplete="off"
                        value={honeypot}
                        onChange={(e) => setHoneypot(e.target.value)}
                      />
                    </div>

                    {/* Full Name / Company */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                        {t.contact.field_name} <span className="text-[#E8751A]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ex: Entreprise SGC ou M. Emmanuel Ndjock"
                        className="w-full px-4 py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0F3D2E] dark:focus:ring-emerald-400"
                      />
                    </div>

                    {/* 2 Cols: Phone & Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                          {t.contact.field_phone} <span className="text-[#E8751A]">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+237 6XX XX XX XX"
                          className="w-full px-4 py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0F3D2E] dark:focus:ring-emerald-400"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                          {t.contact.field_email} <span className="text-[#E8751A]">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="votre.email@domaine.cm"
                          className="w-full px-4 py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0F3D2E] dark:focus:ring-emerald-400"
                        />
                      </div>
                    </div>

                    {/* Activity Selector */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                        {t.contact.field_activity} <span className="text-[#E8751A]">*</span>
                      </label>
                      <select
                        value={activity}
                        onChange={(e) => setActivity(e.target.value as ActivitySector)}
                        className="w-full px-4 py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0F3D2E] dark:focus:ring-emerald-400"
                      >
                        <option value="btp">BTP & Travaux Publics (Gros œuvre, VRD, Résidentiel, Tertiaire)</option>
                        <option value="commerce">Commerce Général (Achat de matériaux au gros, EPI, Équipements)</option>
                        <option value="import_export">Import-Export (Fret maritime, transit CEMAC, sourcing international)</option>
                        <option value="services">Prestations de Services (Ingénierie, maintenance, facilitation)</option>
                        <option value="multi">Projet Combiné / Multisectoriel</option>
                      </select>
                    </div>

                    {/* 2 Cols: Optional Budget & Timeline */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                          {t.contact.field_budget}
                        </label>
                        <input
                          type="text"
                          value={budget}
                          onChange={(e) => setBudget(e.target.value)}
                          placeholder="Ex: 25 000 000 FCFA"
                          className="w-full px-4 py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0F3D2E] dark:focus:ring-emerald-400"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                          {t.contact.field_date}
                        </label>
                        <input
                          type="text"
                          value={projectDate}
                          onChange={(e) => setProjectDate(e.target.value)}
                          placeholder="Ex: Début des travaux Q1 2027"
                          className="w-full px-4 py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0F3D2E] dark:focus:ring-emerald-400"
                        />
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                        {t.contact.field_message} <span className="text-[#E8751A]">*</span>
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Précisez la nature de votre besoin, la localisation, les quantités souhaitées ou les contraintes techniques..."
                        className="w-full px-4 py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0F3D2E] dark:focus:ring-emerald-400 resize-y"
                      />
                    </div>

                    {/* WhatsApp Checkbox */}
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                      <input
                        type="checkbox"
                        id="whatsapp_opt"
                        checked={sendViaWhatsapp}
                        onChange={(e) => setSendViaWhatsapp(e.target.checked)}
                        className="w-4 h-4 text-[#E8751A] rounded focus:ring-[#E8751A] cursor-pointer"
                      />
                      <label htmlFor="whatsapp_opt" className="text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                        {t.contact.field_whatsapp_opt}
                      </label>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 px-6 bg-[#0F3D2E] hover:bg-[#175440] active:scale-98 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span>{t.contact.submitting}</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4 text-orange-400" />
                          <span>{t.contact.submit_btn}</span>
                        </>
                      )}
                    </button>

                    <div className="text-[11px] text-slate-500 text-center flex items-center justify-center gap-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Notification directe à fiveventuresgroup@gmail.com · Données strictement confidentielles</span>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
