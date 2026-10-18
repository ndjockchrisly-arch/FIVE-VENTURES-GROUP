import React, { useState } from 'react';
import { useI18n } from '../../context/I18nContext';
import {
  Briefcase,
  TrendingUp,
  Ship,
  Building2,
  Check,
  ArrowRight,
  ShieldAlert,
  Truck,
  Wrench,
  Boxes,
  Compass,
} from 'lucide-react';

interface ServicesPageProps {
  onOpenQuoteWithSector: (sector: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onOpenQuoteWithSector }) => {
  const { t } = useI18n();
  const [activePole, setActivePole] = useState<'btp' | 'commerce' | 'import_export' | 'services'>('btp');

  const polesDetail = {
    btp: {
      id: 'btp',
      name: 'BTP & Travaux Publics',
      subtitle: 'Études structurales, gros œuvre, voiries et construction clé en main à Yaoundé et sur tout le territoire camerounais.',
      icon: Building2,
      offerings: [
        {
          title: 'Construction de Bâtiments Tertiaires & Commerciaux',
          desc: 'Immeubles de bureaux R+X, centres d\'affaires, banques et sièges sociaux conformes aux normes parasismiques et de sécurité incendie.',
        },
        {
          title: 'Villas & Résidences de Grand Standing',
          desc: 'Architecture bioclimatique contemporaine, structures en béton armé haute performance, finitions nobles et domotique intégrée.',
        },
        {
          title: 'Voiries et Réseaux Divers (VRD) & Assainissement',
          desc: 'Voies de circulation, dallages industriels, réseaux d\'évacuation des eaux pluviales et usées, adduction d\'eau potable.',
        },
        {
          title: 'Rénovation Lourde & Réhabilitation Énergétique',
          desc: 'Reprise sous œuvre, renforcement structural de poteaux/poutres, modernisation d\'installations techniques et revêtements.',
        },
      ],
      methodology: [
        'Étude géotechnique de sol et calculs de ferraillage validés par bureau de contrôle',
        'Approvisionnement direct en matériaux certifiés (aciers FeE500, ciment CPJ 42.5)',
        'Suivi continu par conducteur de travaux dédié et réunions de chantier hebdomadaires',
        'Garantie décennale et procès-verbal de réception sans réserves',
      ],
    },
    commerce: {
      id: 'commerce',
      name: 'Commerce Général & Gros',
      subtitle: 'Distribution en gros et demi-gros de matériaux de construction certifiés, outillage industriel et équipements de sécurité.',
      icon: TrendingUp,
      offerings: [
        {
          title: 'Matériaux de Construction Lourds',
          desc: 'Ciments certifiés, fers à béton haute adhérence (Ø6 à Ø25 mm), graviers concassés de carrière, sable lavé et agglos vibrés.',
        },
        {
          title: 'Équipements de Protection Individuelle (EPI)',
          desc: 'Casques de sécurité avec jugulaire, gilets haute visibilité, chaussures de sécurité S3 SRC, gants de manutention et harnais de sécurité.',
        },
        {
          title: 'Outillage Professionnel & Quincaillerie Industrielle',
          desc: 'Groupes électrogènes, compresseurs, bétonnières, disques diamant, visserie inox, câblerie cuivre et outillage électroportatif.',
        },
        {
          title: 'Approvisionnement & Fournitures Institutionnelles',
          desc: 'Mobilier de bureau ergonomique, consommables techniques, équipements pour hôpitaux, écoles et collectivités locales.',
        },
      ],
      methodology: [
        'Contrôle qualité rigoureux et fiches techniques fournies avec chaque lot',
        'Entrepôts de stockage sécurisés à Yaoundé et Douala pour livraison rapide',
        'Conditions tarifaires dégressives pour les grands comptes et les entrepreneurs BTP',
        'Traçabilité d\'usine et facturation normalisée conforme aux règles fiscales camerounaises',
      ],
    },
    import_export: {
      id: 'import_export',
      name: 'Import-Export & Transit CEMAC',
      subtitle: 'Passerelle logistique internationale reliant le Cameroun, la sous-région CEMAC (Tchad, RCA, Congo) aux marchés mondiaux.',
      icon: Ship,
      offerings: [
        {
          title: 'Fret Maritime & Aérien Multimodal',
          desc: 'Expéditions par conteneurs complets (FCL) ou groupage (LCL) au départ d\'Asie (Chine, Inde), d\'Europe et d\'Amérique.',
        },
        {
          title: 'Transit Portuaire Douala & Kribi',
          desc: 'Prise en charge douanière complète, formalités GUCE, dépotage rapide et acheminement routier sécurisé vers Yaoundé.',
        },
        {
          title: 'Sourcing International Spécialisé',
          desc: 'Identification de fabricants fiables, inspection qualité en usine avant embarquement et sécurisation des paiements documentaires.',
        },
        {
          title: 'Exportation de Matières Premières Camerounaises',
          desc: 'Négoce et exportation de fèves de cacao Grade 1, café arabica/robusta, bois légal certifié et denrées agricoles.',
        },
      ],
      methodology: [
        'Maîtrise des procédures douanières CEMAC et dédouanement rapide sans surestaries',
        'Assurance maritime tout risque avec suivi en temps réel de votre cargaison',
        'Réseau d\'agents maritimes et transitaires partenaires agréés à l\'international',
        'Escortes et sécurisation des convois vers les corridors intérieurs et frontaliers',
      ],
    },
    services: {
      id: 'services',
      name: 'Prestations de Services & Conseil',
      subtitle: 'Accompagnement opérationnel, maintenance multitechnique et assistance aux entreprises locales et internationales.',
      icon: Briefcase,
      offerings: [
        {
          title: 'Conseil en Ingénierie & Études de Faisabilité',
          desc: 'Audits techniques, avant-projets sommaires (APS/APD), chiffrage de métrés et optimisation des budgets de travaux.',
        },
        {
          title: 'Maintenance Multitechnique des Bâtiments',
          desc: 'Contrats de maintenance préventive et curative : groupes électrogènes, climatisation centrale, réseaux électriques et plomberie.',
        },
        {
          title: 'Facilitation d\'Affaires & Implantation au Cameroun',
          desc: 'Assistance aux investisseurs étrangers pour l\'obtention des agréments, permis de construire et formalités administratives.',
        },
        {
          title: 'Assistance Logistique & Gestion de Flotte',
          desc: 'Location d\'engins de chantier (pelles mécaniques, camions-bennes, compacteurs) avec chauffeurs qualifiés.',
        },
      ],
      methodology: [
        'Contrats de niveau de service (SLA) clairs avec engagement de délai d\'intervention',
        'Techniciens qualifiés et astreinte disponible 6 jours sur 7',
        'Rapports d\'intervention détaillés et préconisations d\'amélioration',
        'Secret professionnel et conformité juridique totale',
      ],
    },
  };

  const current = polesDetail[activePole];
  const PoleIcon = current.icon;

  return (
    <div className="w-full bg-slate-50 dark:bg-slate-900 transition-colors">
      {/* Header */}
      <section className="bg-[#0F3D2E] text-white py-16 sm:py-20 border-b border-emerald-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-orange-400 mb-2 block">
              Nos Solutions Métiers
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
              {t.nav.services} : 4 Pôles Stratégiques
            </h1>
            <p className="text-base sm:text-lg text-emerald-100/90 leading-relaxed">
              Une réponse complète aux exigences des professionnels, institutions et investisseurs à Yaoundé et dans la région CEMAC.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Tabs */}
      <section className="py-12 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 p-1.5 bg-slate-100 dark:bg-slate-900 rounded-2xl max-w-4xl mx-auto border border-slate-200 dark:border-slate-800">
            {(['btp', 'commerce', 'import_export', 'services'] as const).map((key) => {
              const info = polesDetail[key];
              const Icon = info.icon;
              const isActive = activePole === key;
              return (
                <button
                  key={key}
                  onClick={() => setActivePole(key)}
                  className={`flex-1 min-w-[160px] py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#0F3D2E] text-white shadow-md'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#E8751A]' : 'text-slate-400'}`} />
                  <span className="whitespace-nowrap">{info.name.split('&')[0].trim()}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Detail of Active Pole */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 sm:p-12 border border-slate-200 dark:border-slate-700 shadow-sm">
            
            {/* Header of Pole */}
            <div className="flex flex-col md:flex-row md:items-center justify-between pb-8 mb-8 border-b border-slate-200 dark:border-slate-700 gap-6">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 text-[#0F3D2E] dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <PoleIcon className="w-7 h-7" />
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                    {current.name}
                  </h2>
                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-1 max-w-2xl">
                    {current.subtitle}
                  </p>
                </div>
              </div>

              <button
                onClick={() => onOpenQuoteWithSector(activePole)}
                className="px-6 py-3 bg-[#E8751A] hover:bg-[#d26514] active:scale-98 text-white text-xs sm:text-sm font-bold rounded-xl shadow-sm whitespace-nowrap self-start md:self-auto cursor-pointer"
              >
                Demander un devis pour ce pôle
              </button>
            </div>

            {/* Offerings Grid */}
            <div className="mb-12">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#0F3D2E] dark:text-emerald-400 mb-6">
                Champs d'intervention & Services Inclus
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {current.offerings.map((offering, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700/60 flex flex-col justify-between"
                  >
                    <div>
                      <div className="text-xs font-mono text-[#E8751A] font-bold mb-1">
                        Option 0{idx + 1}
                      </div>
                      <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                        {offering.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        {offering.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Methodology & Quality Control */}
            <div className="bg-slate-50 dark:bg-slate-900/40 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-700/60">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#E8751A]" />
                <span>Normes d'Exécution & Contrôle Qualité</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {current.methodology.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-[#0F3D2E] dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                    <span className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
