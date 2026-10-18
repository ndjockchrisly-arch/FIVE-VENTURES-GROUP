import React from 'react';
import { useI18n } from '../../context/I18nContext';
import { useData } from '../../context/DataContext';
import { BTPProject, ProductItem } from '../../types';
import {
  Building2,
  TrendingUp,
  Ship,
  Briefcase,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Award,
  Clock,
  PhoneCall,
  ExternalLink,
} from 'lucide-react';

interface HomePageProps {
  setActiveTab: (tab: string) => void;
  onSelectProject: (project: BTPProject) => void;
  onSelectProductForQuote: (product: ProductItem) => void;
  onOpenQuoteWithSector: (sector: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  setActiveTab,
  onSelectProject,
  onSelectProductForQuote,
  onOpenQuoteWithSector,
}) => {
  const { t, language } = useI18n();
  const { projects, products } = useData();

  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);
  const featuredProducts = products.filter((p) => p.featured).slice(0, 3);

  const heroImage = '/src/assets/images/hero_five_ventures_btp_logistics_1792314203064.jpg';

  const polesData = [
    {
      id: 'services',
      icon: Briefcase,
      title: t.poles.p1_name,
      description: t.poles.p1_desc,
      color: 'bg-emerald-900',
      tag: 'Conseil & Ingénierie',
    },
    {
      id: 'commerce',
      icon: TrendingUp,
      title: t.poles.p2_name,
      description: t.poles.p2_desc,
      color: 'bg-amber-800',
      tag: 'Gros & Matériaux',
    },
    {
      id: 'import_export',
      icon: Ship,
      title: t.poles.p3_name,
      description: t.poles.p3_desc,
      color: 'bg-blue-900',
      tag: 'Fret Maritime & Transit CEMAC',
    },
    {
      id: 'btp',
      icon: Building2,
      title: t.poles.p4_name,
      description: t.poles.p4_desc,
      color: 'bg-[#0F3D2E]',
      tag: 'Génie Civil & VRD',
    },
  ];

  return (
    <div className="flex flex-col w-full">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-slate-900 text-white min-h-[560px] lg:min-h-[640px] flex items-center">
        {/* Background Image with Optical Scrim */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Five Ventures Group Chantiers BTP et Logistique Cameroun"
            className="w-full h-full object-cover object-center opacity-40 brightness-90 filter"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-transparent" />
          <div className="absolute inset-0 bg-radial at-center from-transparent via-slate-950/40 to-slate-950" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 w-full">
          <div className="max-w-3xl">
            {/* Context kicker: clean unboxed text */}
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-semibold text-orange-400 mb-4 tracking-wide">
              <span>{t.hero.badge}</span>
              <span className="text-slate-500 hidden sm:inline">·</span>
              <span className="italic text-emerald-300 font-normal">"{t.hero.motto}"</span>
            </div>

            {/* Headline with balanced wrap */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15] mb-6 text-balance">
              {t.hero.title_part1}{' '}
              <span className="text-[#E8751A]">{t.hero.title_accent}</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg lg:text-xl text-slate-300 mb-8 leading-relaxed max-w-2xl">
              {t.hero.subtitle}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => onOpenQuoteWithSector('btp')}
                className="px-6 py-3.5 bg-[#E8751A] hover:bg-[#d26514] active:scale-98 text-white font-bold text-sm sm:text-base rounded-xl shadow-lg transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer"
              >
                <span>{t.hero.cta_primary}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setActiveTab('projects')}
                className="px-6 py-3.5 bg-white/10 hover:bg-white/20 active:scale-98 backdrop-blur-xs text-white font-semibold text-sm sm:text-base rounded-xl border border-white/20 transition-all whitespace-nowrap cursor-pointer"
              >
                {t.hero.cta_secondary}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Full-Width Metrics Strip (Adjacency & Tabular Rigor) */}
      <section className="bg-[#0F3D2E] text-white border-y border-emerald-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-emerald-800/40">
            <div className="pt-4 md:pt-0">
              <div className="text-3xl sm:text-4xl font-extrabold font-mono tabular-nums text-orange-400">
                15+
              </div>
              <div className="text-xs sm:text-sm text-emerald-200 mt-1 font-medium">
                {t.hero.stat_years}
              </div>
            </div>

            <div className="pt-4 md:pt-0">
              <div className="text-3xl sm:text-4xl font-extrabold font-mono tabular-nums text-white">
                45+
              </div>
              <div className="text-xs sm:text-sm text-emerald-200 mt-1 font-medium">
                {t.hero.stat_projects}
              </div>
            </div>

            <div className="pt-4 md:pt-0">
              <div className="text-3xl sm:text-4xl font-extrabold font-mono tabular-nums text-orange-400">
                4
              </div>
              <div className="text-xs sm:text-sm text-emerald-200 mt-1 font-medium">
                {t.hero.stat_poles}
              </div>
            </div>

            <div className="pt-4 md:pt-0">
              <div className="text-3xl sm:text-4xl font-extrabold font-mono tabular-nums text-white">
                100%
              </div>
              <div className="text-xs sm:text-sm text-emerald-200 mt-1 font-medium">
                {t.hero.stat_satisfaction}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. The 4 Strategic Poles Section */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <div className="text-xs font-bold uppercase tracking-wider text-[#E8751A] mb-2">
              Expertises Intégrées
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
              {t.poles.title}
            </h2>
            <p className="text-base text-slate-600 dark:text-slate-400">
              {t.poles.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {polesData.map((pole, idx) => {
              const Icon = pole.icon;
              return (
                <div
                  key={pole.id}
                  className="bg-white dark:bg-slate-800 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-[#0F3D2E] dark:text-emerald-400 flex items-center justify-center">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                        0{idx + 1}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                      {pole.title}
                    </h3>

                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                      {pole.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700/60">
                    <button
                      onClick={() => setActiveTab('services')}
                      className="text-xs font-bold text-[#0F3D2E] dark:text-emerald-400 hover:text-[#E8751A] flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <span>{t.poles.action_learn_more}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => onOpenQuoteWithSector(pole.id)}
                      className="text-xs font-bold text-[#E8751A] hover:underline cursor-pointer"
                    >
                      {t.poles.action_request_quote}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Featured BTP Projects Showcase */}
      <section className="py-20 bg-white dark:bg-slate-950 transition-colors border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#E8751A] mb-2">
                Savoir-faire Technique
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {t.projects.title}
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2 max-w-xl">
                Ouvrages d'art, complexes d'affaires et résidences de standing construits avec exigence et sécurité à Yaoundé.
              </p>
            </div>

            <button
              onClick={() => setActiveTab('projects')}
              className="inline-flex items-center gap-2 text-sm font-bold text-[#0F3D2E] dark:text-emerald-400 hover:text-[#E8751A] transition-colors whitespace-nowrap"
            >
              <span>Voir tous les chantiers</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => onSelectProject(project)}
                className="group bg-slate-50 dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:border-emerald-700/50 transition-all cursor-pointer flex flex-col"
              >
                {/* Project Image */}
                <div className="relative aspect-4/3 overflow-hidden bg-slate-200">
                  <img
                    src={project.image_url}
                    alt={language === 'fr' ? project.title_fr : project.title_en}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <span className="text-xs text-white font-medium flex items-center gap-1.5">
                      <ExternalLink className="w-3.5 h-3.5" />
                      {t.projects.details_cta}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1 justify-between">
                  <div>
                    {/* Zero-Pill Metadata */}
                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-2 font-mono">
                      <span>{project.location}</span>
                      <span aria-hidden="true">·</span>
                      <span>{project.year}</span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-[#0F3D2E] dark:group-hover:text-emerald-400 transition-colors line-clamp-2 mb-2">
                      {language === 'fr' ? project.title_fr : project.title_en}
                    </h3>

                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 mb-4">
                      {language === 'fr' ? project.description_fr : project.description_en}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-medium">
                      {project.status === 'completed' ? t.projects.status_completed : t.projects.status_ongoing}
                    </span>
                    <span className="font-bold text-[#E8751A] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Fiche chantier →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Featured Products & Materials Showcase */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#E8751A] mb-2">
                Commerce & Approvisionnement
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {t.products.title}
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2 max-w-xl">
                Matériaux certifiés pour les constructeurs et denrées négociées à l'exportation.
              </p>
            </div>

            <button
              onClick={() => setActiveTab('products')}
              className="inline-flex items-center gap-2 text-sm font-bold text-[#0F3D2E] dark:text-emerald-400 hover:text-[#E8751A] transition-colors whitespace-nowrap"
            >
              <span>Voir tout le catalogue</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700/80 p-6 flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-3 font-mono">
                    <span>{product.reference}</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                      {product.in_stock ? t.products.in_stock : t.products.on_order}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                    {language === 'fr' ? product.name_fr : product.name_en}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-300 mb-4 line-clamp-3">
                    {language === 'fr' ? product.description_fr : product.description_en}
                  </p>

                  <div className="space-y-1 mb-6 text-xs text-slate-500 dark:text-slate-400">
                    <div>
                      <strong className="text-slate-700 dark:text-slate-300">Origine :</strong> {product.origin}
                    </div>
                    <div>
                      <strong className="text-slate-700 dark:text-slate-300">MOQ :</strong> {product.min_order}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onSelectProductForQuote(product)}
                  className="w-full py-2.5 px-4 bg-emerald-50 dark:bg-emerald-950/60 hover:bg-[#0F3D2E] hover:text-white text-[#0F3D2E] dark:text-emerald-300 text-xs font-bold rounded-xl transition-all border border-emerald-200 dark:border-emerald-800 text-center cursor-pointer"
                >
                  {t.products.cta_quote_product}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Commitments & Rigor Section (Anti-slop, concrete points) */}
      <section className="py-20 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-14">
            <div className="text-xs font-bold uppercase tracking-wider text-[#E8751A] mb-2">
              Garanties & Engagements
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
              Pourquoi choisir Five Ventures Group à Yaoundé ?
            </h2>
            <p className="text-base text-slate-600 dark:text-slate-400">
              Une gouvernance stricte, un ancrage local et le respect absolu des délais contractuels.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <ShieldCheck className="w-8 h-8 text-[#0F3D2E] dark:text-emerald-400 mb-4" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                Garantie Décennale & Sécurité
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Tous nos ouvrages de construction sont couverts par des assurances et répondent aux Eurocodes et normes camerounaises.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <Clock className="w-8 h-8 text-[#E8751A] mb-4" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                Maîtrise Rigoureuse des Délais
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Planning d'exécution phasé avec points d'étape hebdomadaires et suivi transparent de l'avancement.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <Award className="w-8 h-8 text-[#0F3D2E] dark:text-emerald-400 mb-4" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                Sourcing & Traçabilité Directs
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Filières courtes d'approvisionnement sans intermédiaires inutiles pour garantir les prix les plus compétitifs du marché.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <CheckCircle2 className="w-8 h-8 text-[#E8751A] mb-4" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                Interlocuteur Unique Dédié
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Un chef de projet ou chargé d'affaires dédié vous accompagne de l'étude préliminaire jusqu'à la livraison complète.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Conversion CTA Section */}
      <section className="bg-gradient-to-br from-[#0F3D2E] via-[#09261c] to-slate-950 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-4 text-balance">
              Un projet de construction, d'achat ou d'import-export à Yaoundé ?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mb-8 max-w-2xl mx-auto">
              Obtenez une étude de faisabilité et une proposition tarifaire détaillée sous 24 à 48 heures.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => onOpenQuoteWithSector('btp')}
                className="px-8 py-3.5 bg-[#E8751A] hover:bg-[#d26514] active:scale-98 text-white font-bold text-sm sm:text-base rounded-xl shadow-lg transition-all cursor-pointer"
              >
                {t.contact.submit_btn}
              </button>
              <a
                href="https://wa.me/237699649535"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 bg-white/10 hover:bg-white/20 active:scale-98 text-white font-semibold text-sm sm:text-base rounded-xl border border-white/20 transition-all flex items-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-orange-400" />
                <span>WhatsApp : +237 699 64 95 35</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
