import React, { useState, useEffect } from 'react';
import { I18nProvider } from './context/I18nContext';
import { ThemeProvider } from './context/ThemeContext';
import { DataProvider } from './context/DataContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { WhatsAppFloat } from './components/layout/WhatsAppFloat';
import { HomePage } from './components/pages/HomePage';
import { AboutPage } from './components/pages/AboutPage';
import { ServicesPage } from './components/pages/ServicesPage';
import { ProjectsPage } from './components/pages/ProjectsPage';
import { ProductsPage } from './components/pages/ProductsPage';
import { ContactPage } from './components/pages/ContactPage';
import { LegalPage } from './components/pages/LegalPage';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { BTPProject, ProductItem, ActivitySector } from './types';

const VALID_TABS = ['home', 'about', 'services', 'projects', 'products', 'contact', 'legal', 'admin'];

const getTabFromPath = (path: string): string => {
  const cleanPath = path.replace(/^\/|\/$/g, '').toLowerCase();
  if (VALID_TABS.includes(cleanPath)) return cleanPath;
  if (cleanPath === 'a-propos') return 'about';
  if (cleanPath === 'devis' || cleanPath === 'cotation') return 'contact';
  if (cleanPath === 'btp' || cleanPath === 'chantiers') return 'projects';
  return 'home';
};

export default function App() {
  const [activeTab, setActiveTabState] = useState<string>(() => {
    return typeof window !== 'undefined' ? getTabFromPath(window.location.pathname) : 'home';
  });

  const [quoteSector, setQuoteSector] = useState<ActivitySector>('btp');
  const [quotePreFillMessage, setQuotePreFillMessage] = useState<string>('');
  const [selectedProjectForDetail, setSelectedProjectForDetail] = useState<BTPProject | null>(null);

  // Sync activeTab with browser URL history
  const setActiveTab = (tab: string) => {
    setActiveTabState(tab);
    if (typeof window !== 'undefined' && window.history) {
      const newPath = tab === 'home' ? '/' : `/${tab}`;
      if (window.location.pathname !== newPath) {
        window.history.pushState({ tab }, '', newPath);
      }
    }
  };

  // Handle browser back and forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const currentTab = getTabFromPath(window.location.pathname);
      setActiveTabState(currentTab);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Navigate to contact with pre-filled sector
  const handleOpenQuoteWithSector = (sector: string) => {
    const validSector: ActivitySector = ['btp', 'commerce', 'import_export', 'services', 'multi'].includes(sector)
      ? (sector as ActivitySector)
      : 'btp';
    setQuoteSector(validSector);
    setQuotePreFillMessage('');
    setActiveTab('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Navigate to contact with pre-filled project inquiry
  const handleOpenQuoteWithProject = (project: BTPProject) => {
    setQuoteSector('btp');
    setQuotePreFillMessage(
      `Bonjour, je souhaiterais obtenir une étude de faisabilité et un devis pour un projet similaire à : "${project.title_fr}" (${project.type_work_fr} - ${project.location}).`
    );
    setActiveTab('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Navigate to contact with pre-filled product quotation
  const handleSelectProductForQuote = (product: ProductItem) => {
    const sector: ActivitySector = product.category === 'materials' ? 'btp' : 'commerce';
    setQuoteSector(sector);
    setQuotePreFillMessage(
      `Bonjour, je souhaite recevoir une cotation tarifaire pro-forma pour l'article suivant :\n- Produit : ${product.name_fr}\n- Référence : ${product.reference}\n- Quantité estimée : ${product.min_order}\n- Destination : Yaoundé.`
    );
    setActiveTab('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Direct project detail modal trigger
  const handleSelectProject = (project: BTPProject) => {
    setSelectedProjectForDetail(project);
    setActiveTab('projects');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <ThemeProvider>
      <I18nProvider>
        <DataProvider>
          <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors selection:bg-[#E8751A] selection:text-white">
            {/* Header */}
            <Header
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              onOpenQuoteModal={() => handleOpenQuoteWithSector('btp')}
            />

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col">
              {activeTab === 'home' && (
                <HomePage
                  setActiveTab={setActiveTab}
                  onSelectProject={handleSelectProject}
                  onSelectProductForQuote={handleSelectProductForQuote}
                  onOpenQuoteWithSector={handleOpenQuoteWithSector}
                />
              )}

              {activeTab === 'about' && (
                <AboutPage onOpenQuoteWithSector={handleOpenQuoteWithSector} />
              )}

              {activeTab === 'services' && (
                <ServicesPage onOpenQuoteWithSector={handleOpenQuoteWithSector} />
              )}

              {activeTab === 'projects' && (
                <ProjectsPage
                  onOpenQuoteWithProject={handleOpenQuoteWithProject}
                  selectedProjectFromProps={selectedProjectForDetail}
                />
              )}

              {activeTab === 'products' && (
                <ProductsPage onSelectProductForQuote={handleSelectProductForQuote} />
              )}

              {activeTab === 'contact' && (
                <ContactPage
                  initialActivity={quoteSector}
                  initialMessage={quotePreFillMessage}
                />
              )}

              {activeTab === 'legal' && <LegalPage />}

              {activeTab === 'admin' && <AdminDashboard />}
            </main>

            {/* Corporate Footer */}
            <Footer setActiveTab={setActiveTab} />

            {/* Floating WhatsApp Button */}
            <WhatsAppFloat />
          </div>
        </DataProvider>
      </I18nProvider>
    </ThemeProvider>
  );
}
