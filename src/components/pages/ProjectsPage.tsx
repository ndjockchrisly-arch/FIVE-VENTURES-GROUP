import React, { useState } from 'react';
import { useI18n } from '../../context/I18nContext';
import { useData } from '../../context/DataContext';
import { BTPProject, BTPCategory } from '../../types';
import {
  MapPin,
  Calendar,
  Clock,
  User,
  HardHat,
  X,
  ExternalLink,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

interface ProjectsPageProps {
  onOpenQuoteWithProject: (project: BTPProject) => void;
  selectedProjectFromProps?: BTPProject | null;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({
  onOpenQuoteWithProject,
  selectedProjectFromProps = null,
}) => {
  const { t, language } = useI18n();
  const { projects } = useData();

  const [activeCategory, setActiveCategory] = useState<BTPCategory>('all');
  const [selectedProject, setSelectedProject] = useState<BTPProject | null>(selectedProjectFromProps);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);

  const categories: { id: BTPCategory; label: string }[] = [
    { id: 'all', label: t.projects.filter_all },
    { id: 'residential', label: t.projects.filter_residential },
    { id: 'commercial', label: t.projects.filter_commercial },
    { id: 'civil_work', label: t.projects.filter_civil_work },
    { id: 'renovation', label: t.projects.filter_renovation },
  ];

  const filteredProjects = projects.filter((project) => {
    if (activeCategory === 'all') return true;
    return project.category === activeCategory;
  });

  const handleOpenModal = (project: BTPProject) => {
    setSelectedProject(project);
    setActiveGalleryIndex(0);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  return (
    <div className="w-full bg-slate-50 dark:bg-slate-900 transition-colors">
      {/* Header */}
      <section className="bg-[#0F3D2E] text-white py-16 sm:py-20 border-b border-emerald-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-orange-400 mb-2 block">
              Portfolio & Réalisations
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
              {t.projects.title}
            </h1>
            <p className="text-base sm:text-lg text-emerald-100/90 leading-relaxed">
              {t.projects.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter Bar (Buttons / Segmented Control per Anti-Slop Rule) */}
      <section className="sticky top-20 z-30 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 py-4 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#0F3D2E] text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => handleOpenModal(project)}
                className="group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 hover:border-emerald-700/60 transition-all shadow-xs hover:shadow-md cursor-pointer flex flex-col"
              >
                {/* Photo container */}
                <div className="relative aspect-4/3 overflow-hidden bg-slate-200">
                  <img
                    src={project.image_url}
                    alt={language === 'fr' ? project.title_fr : project.title_en}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-xs text-white text-[11px] font-mono px-2.5 py-1 rounded-md">
                    {project.status === 'completed' ? t.projects.status_completed : t.projects.status_ongoing}
                  </div>
                </div>

                {/* Card Content */}
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

                    <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 mb-4">
                      {language === 'fr' ? project.type_work_fr : project.type_work_en}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between text-xs font-semibold text-[#E8751A]">
                    <span>{t.projects.details_cta}</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
          <div
            className="bg-white dark:bg-slate-900 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 dark:border-slate-800"
            role="dialog"
            aria-modal="true"
          >
            {/* Modal Header */}
            <div className="sticky top-0 z-20 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-mono text-[#E8751A] uppercase tracking-wider font-bold">
                  Fiche Technique Chantier
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                  {language === 'fr' ? selectedProject.title_fr : selectedProject.title_en}
                </h3>
              </div>
              <button
                onClick={handleCloseModal}
                className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Fermer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-8">
              {/* Main Photo & Gallery Thumbnails */}
              <div>
                <div className="aspect-16/9 rounded-2xl overflow-hidden bg-slate-200 relative mb-3">
                  <img
                    src={selectedProject.gallery[activeGalleryIndex] || selectedProject.image_url}
                    alt={language === 'fr' ? selectedProject.title_fr : selectedProject.title_en}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-3 left-3 bg-black/60 text-white text-xs px-3 py-1 rounded-lg backdrop-blur-xs">
                    {selectedProject.location}
                  </div>
                </div>

                {selectedProject.gallery.length > 1 && (
                  <div className="flex items-center gap-3">
                    {selectedProject.gallery.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveGalleryIndex(idx)}
                        className={`w-20 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                          activeGalleryIndex === idx
                            ? 'border-[#E8751A] scale-102'
                            : 'border-transparent opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img
                          src={img}
                          alt="thumbnail"
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Technical Specifications Table */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-slate-50 dark:bg-slate-800/60 p-6 rounded-2xl border border-slate-200 dark:border-slate-700/60 text-xs">
                <div>
                  <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 mb-1">
                    <MapPin className="w-3.5 h-3.5 text-[#E8751A]" />
                    <span>{t.projects.modal_location}</span>
                  </div>
                  <div className="font-bold text-slate-900 dark:text-white">
                    {selectedProject.location}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 mb-1">
                    <Calendar className="w-3.5 h-3.5 text-[#E8751A]" />
                    <span>{t.projects.modal_year}</span>
                  </div>
                  <div className="font-bold text-slate-900 dark:text-white font-mono">
                    {selectedProject.year}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 mb-1">
                    <User className="w-3.5 h-3.5 text-[#E8751A]" />
                    <span>{t.projects.modal_client}</span>
                  </div>
                  <div className="font-bold text-slate-900 dark:text-white">
                    {selectedProject.client}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 mb-1">
                    <Clock className="w-3.5 h-3.5 text-[#E8751A]" />
                    <span>{t.projects.modal_duration}</span>
                  </div>
                  <div className="font-bold text-slate-900 dark:text-white">
                    {selectedProject.duration}
                  </div>
                </div>
              </div>

              {/* Detailed Description */}
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-2">
                  Détail des Travaux & Spécificités Techniques
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  {language === 'fr' ? selectedProject.description_fr : selectedProject.description_en}
                </p>
                <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-900 dark:text-emerald-200">
                  <strong>Type d'intervention :</strong> {language === 'fr' ? selectedProject.type_work_fr : selectedProject.type_work_en}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  onClick={handleCloseModal}
                  className="w-full sm:w-auto px-6 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 text-xs font-bold rounded-xl transition-colors cursor-pointer"
                >
                  {t.projects.modal_close}
                </button>

                <button
                  onClick={() => {
                    handleCloseModal();
                    onOpenQuoteWithProject(selectedProject);
                  }}
                  className="w-full sm:w-auto px-6 py-2.5 bg-[#E8751A] hover:bg-[#d26514] active:scale-98 text-white text-xs font-bold rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <HardHat className="w-4 h-4" />
                  <span>{t.projects.modal_quote_cta}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
