import React from 'react';
import { useI18n } from '../../context/I18nContext';
import { FiveVenturesLogo } from '../common/Logo';
import {
  Compass,
  Target,
  Shield,
  Layers,
  CheckCircle,
  Users,
  MapPin,
  FileCheck2,
} from 'lucide-react';

interface AboutPageProps {
  onOpenQuoteWithSector: (sector: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenQuoteWithSector }) => {
  const { t } = useI18n();

  const values = [
    {
      title: t.about.v1_title,
      description: t.about.v1_desc,
      icon: Shield,
    },
    {
      title: t.about.v2_title,
      description: t.about.v2_desc,
      icon: FileCheck2,
    },
    {
      title: t.about.v3_title,
      description: t.about.v3_desc,
      icon: Layers,
    },
    {
      title: t.about.v4_title,
      description: t.about.v4_desc,
      icon: Users,
    },
    {
      title: t.about.v5_title,
      description: t.about.v5_desc,
      icon: CheckCircle,
    },
  ];

  const team = [
    {
      name: 'Direction Générale',
      role: 'Stratégie, Partenariats & Gouvernance',
      bio: 'Pilotage global du groupe, développement des filiales et relations institutionnelles.',
    },
    {
      name: 'Direction Technique BTP',
      role: 'Ingénierie des Structures & Travaux Publics',
      bio: 'Supervision des calculs béton armé, conformité chantiers et respect des normes sécuritaires.',
    },
    {
      name: 'Pôle Commerce & Approvisionnement',
      role: 'Sourcing International & Négoce Gros',
      bio: 'Négociation usines en Asie et Europe, chaîne d\'approvisionnement et stocks au Cameroun.',
    },
    {
      name: 'Pôle Transit & Opérations CEMAC',
      role: 'Fret Multimodal & Douanes Portuaires',
      bio: 'Gestion des formalités portuaires Douala/Kribi et corridors de transit sous-régionaux.',
    },
  ];

  return (
    <div className="w-full bg-slate-50 dark:bg-slate-900 transition-colors">
      {/* Page Header */}
      <section className="bg-[#0F3D2E] text-white py-16 sm:py-20 border-b border-emerald-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-orange-400 mb-2 block">
              {t.about.tagline}
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4 text-balance">
              {t.about.title}
            </h1>
            <p className="text-base sm:text-lg text-emerald-100/90 leading-relaxed">
              Une vision résolument moderne du développement économique camerounais, alliant solidité technique et fiabilité contractuelle.
            </p>
          </div>
        </div>
      </section>

      {/* History and Mission */}
      <section className="py-20 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#E8751A] mb-3">
                <MapPin className="w-4 h-4" />
                <span>Yaoundé · République du Cameroun</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-6">
                {t.about.history_title}
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                {t.about.history_text}
              </p>
              <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
                <div className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-1">
                  Enregistrement Officiel & Fiscalité
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700 dark:text-slate-300 font-mono mt-2">
                  <div>
                    <span className="text-slate-500 block">Registre de Commerce :</span>
                    <strong className="text-slate-900 dark:text-white">RC/YAO/2023/B/1429</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Numéro d'Identifiant Unique (NIU) :</span>
                    <strong className="text-slate-900 dark:text-white">M092317849021Z</strong>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-[#0F3D2E] dark:text-emerald-400 flex items-center justify-center mb-4">
                  <Target className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  {t.about.mission_title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {t.about.mission_text}
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-950/80 text-[#E8751A] flex items-center justify-center mb-4">
                  <Compass className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  {t.about.vision_title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {t.about.vision_text}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5 Core Pillars */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <div className="text-xs font-bold uppercase tracking-wider text-[#E8751A] mb-2">
              L'ADN de notre organisation
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              {t.about.values_title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v, idx) => {
              const Icon = v.icon;
              return (
                <div
                  key={idx}
                  className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700/80 shadow-xs"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-[#0F3D2E] dark:text-emerald-400 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono text-slate-400">Piliers 0{idx + 1}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                    {v.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {v.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Key Leadership / Departments */}
      <section className="py-20 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <div className="text-xs font-bold uppercase tracking-wider text-[#E8751A] mb-2">
              Organisation & Gouvernance
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Nos Pôles Stratégiques & Équipes
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
              Une équipe d'ingénieurs et de cadres d'exploitation dédiés à l'efficience de vos projets.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, idx) => (
              <div
                key={idx}
                className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
                    {member.name}
                  </h3>
                  <div className="text-xs font-semibold text-[#E8751A] mb-3">
                    {member.role}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {member.bio}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-500">
                  Basé à Yaoundé · Intervention CEMAC
                </div>
              </div>
            ))}
          </div>

          <div className="mt-14 p-8 rounded-2xl bg-gradient-to-r from-emerald-950 to-[#0F3D2E] text-white flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <FiveVenturesLogo variant="light" size="sm" showText={false} />
              <div>
                <h4 className="text-base font-bold text-white">
                  Vous souhaitez collaborer avec Five Ventures Group ?
                </h4>
                <p className="text-xs text-emerald-200 mt-0.5">
                  Prenez contact avec nos équipes techniques pour vos marchés publics ou privés.
                </p>
              </div>
            </div>

            <button
              onClick={() => onOpenQuoteWithSector('services')}
              className="px-6 py-3 bg-[#E8751A] hover:bg-[#d26514] active:scale-98 text-white text-xs font-bold rounded-xl whitespace-nowrap shadow-sm cursor-pointer"
            >
              Initier une prise de contact
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
