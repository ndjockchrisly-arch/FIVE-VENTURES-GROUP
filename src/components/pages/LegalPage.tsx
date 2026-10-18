import React from 'react';
import { useI18n } from '../../context/I18nContext';
import { Shield, FileText, Scale, Lock, Globe } from 'lucide-react';

export const LegalPage: React.FC = () => {
  const { t } = useI18n();

  return (
    <div className="w-full bg-slate-50 dark:bg-slate-900 transition-colors">
      {/* Header */}
      <section className="bg-[#0F3D2E] text-white py-16 border-b border-emerald-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-orange-400 mb-2 block">
              Cadre Réglementaire
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
              {t.legal.title}
            </h1>
            <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed">
              {t.legal.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          {/* 1. Identification de la Société */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-200 dark:border-slate-700 shadow-xs">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-[#0F3D2E] dark:text-emerald-400 flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                1. Identification Juridique de l'Entreprise
              </h2>
            </div>
            <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed space-y-2">
              <p><strong>Dénomination sociale :</strong> Five Ventures Group SARL</p>
              <p><strong>Siège social :</strong> Quartier Bastos, Avenue Rosa Parks, Yaoundé, République du Cameroun</p>
              <p><strong>Registre du Commerce et du Crédit Mobilier (RCCM) :</strong> RC/YAO/2023/B/1429</p>
              <p><strong>Numéro d'Identifiant Unique (NIU) :</strong> M092317849021Z</p>
              <p><strong>Courriel officiel :</strong> fiveventuresgroup@gmail.com</p>
              <p><strong>Lignes téléphoniques :</strong> +237 675 81 11 31 / +237 655 73 35 41 / WhatsApp : +237 699 64 95 35</p>
              <p><strong>Directeur de la publication :</strong> La Direction Générale de Five Ventures Group</p>
            </div>
          </div>

          {/* 2. Hébergement & Infrastructure Cloud */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-200 dark:border-slate-700 shadow-xs">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-950/80 text-[#E8751A] flex items-center justify-center">
                <Globe className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                2. Hébergement & Sécurité des Données
              </h2>
            </div>
            <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed space-y-2">
              <p>
                Le site est déployé sur l'infrastructure de haute disponibilité <strong>Vercel Inc.</strong> (440 N Barranca Ave #4133, Covina, CA 91723, USA).
              </p>
              <p>
                Les bases de données et le stockage d'images sécurisé sont hébergés par <strong>Supabase Inc.</strong>, conformes aux certifications ISO 27001 et SOC 2 Type II, avec chiffrement des données au repos et en transit (TLS 1.3).
              </p>
            </div>
          </div>

          {/* 3. Données Personnelles & Confidentialité */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-200 dark:border-slate-700 shadow-xs">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-[#0F3D2E] dark:text-emerald-400 flex items-center justify-center">
                <Lock className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                3. Protection des Données Personnelles
              </h2>
            </div>
            <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed space-y-3">
              <p>
                Les informations recueillies via le formulaire de demande de devis (nom, numéro de téléphone, adresse e-mail, descriptif de projet) font l’objet d’un traitement informatique sécurisé strictement réservé à la gestion de la relation client et à l'établissement des cotations commerciales de Five Ventures Group.
              </p>
              <p>
                Conformément à la Loi camerounaise n° 2010/012 du 21 décembre 2010 relative à la cybersécurité et à la cybercriminalité, et aux standards internationaux de protection de la vie privée, vous disposez d'un droit d'accès, de rectification et de suppression des données vous concernant en écrivant directement à <strong>fiveventuresgroup@gmail.com</strong>.
              </p>
              <p>
                Five Ventures Group s'engage à ne jamais céder, louer ni commercialiser vos coordonnées à des tiers sans votre accord explicite préalable.
              </p>
            </div>
          </div>

          {/* 4. Droit Applicable & Juridiction */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-200 dark:border-slate-700 shadow-xs">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center">
                <Scale className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                4. Droit Applicable & Juridiction Compétente
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Le présent site internet et ses conditions d'utilisation sont régis par le droit camerounais et les Actes Uniformes de l'OHADA (Organisation pour l'Harmonisation en Afrique du Droit des Affaires). En cas de litige relatif à l'interprétation ou à l'exécution des présentes, et à défaut d'accord amiable, compétence expresse est attribuée aux Tribunaux compétents de la ville de Yaoundé (Cameroun).
            </p>
          </div>

        </div>
      </section>
    </div>
  );
};
