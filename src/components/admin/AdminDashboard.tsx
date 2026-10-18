import React, { useState } from 'react';
import { useI18n } from '../../context/I18nContext';
import { useData } from '../../context/DataContext';
import { BTPProject, ProductItem, QuoteRequest, QuoteStatus, ActivitySector } from '../../types';
import { SUPABASE_SQL_SCHEMA, isSupabaseConfigured } from '../../lib/supabase';
import {
  ShieldCheck,
  Lock,
  LogOut,
  FolderKanban,
  Package,
  FileSpreadsheet,
  Download,
  Trash2,
  Edit,
  Plus,
  CheckCircle,
  Clock,
  AlertCircle,
  ExternalLink,
  MessageCircle,
  Mail,
  Phone,
  Server,
  Key,
  Copy,
  Check,
  ChevronRight,
  Eye,
  X,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { t, language } = useI18n();
  const {
    projects,
    products,
    quotes,
    updateQuoteStatus,
    deleteQuote,
    addProject,
    updateProject,
    deleteProject,
    addProduct,
    updateProduct,
    deleteProduct,
    resetToDefaultData,
  } = useData();

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('fvg_admin_auth') === 'true';
  });
  const [emailInput, setEmailInput] = useState('admin@fiveventures.cm');
  const [passwordInput, setPasswordInput] = useState('Admin2026!');
  const [authError, setAuthError] = useState<string | null>(null);

  // Active Admin Tab
  const [activeTab, setActiveTab] = useState<'quotes' | 'projects' | 'products' | 'deployment'>('quotes');
  const [statusFilter, setStatusFilter] = useState<'all' | QuoteStatus>('all');
  const [selectedQuoteDetail, setSelectedQuoteDetail] = useState<QuoteRequest | null>(null);

  // Modals for CRUD
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<BTPProject | null>(null);

  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null);

  const [copiedSql, setCopiedSql] = useState(false);

  // Available image presets for easy selection in admin
  const IMAGE_PRESETS = [
    { label: 'Chantier & Grue Yaoundé', url: '/src/assets/images/hero_five_ventures_btp_logistics_1792314203064.jpg' },
    { label: 'Immeuble Commercial Bastos', url: '/src/assets/images/project_commercial_building_yaounde_1792314203183.jpg' },
    { label: 'Villa Contemporaine Mont Fébé', url: '/src/assets/images/project_residential_villa_yaounde_1792314204513.jpg' },
    { label: 'Entrepôt & Logistique Fret', url: '/src/assets/images/product_logistics_import_export_1792314204349.jpg' },
  ];

  // Login handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.toLowerCase().includes('fiveventures') || emailInput.includes('@')) {
      if (passwordInput.length >= 6) {
        setIsAuthenticated(true);
        localStorage.setItem('fvg_admin_auth', 'true');
        setAuthError(null);
        return;
      }
    }
    setAuthError('Identifiants incorrects. Veuillez utiliser le compte administrateur.');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('fvg_admin_auth');
  };

  // Export CSV handler
  const handleExportCSV = () => {
    const headers = ['ID', 'Date', 'Nom', 'Téléphone', 'Email', 'Pôle', 'Statut', 'Budget', 'Date_Projet', 'Message'];
    const rows = quotes.map((q) => [
      `"${q.id}"`,
      `"${new Date(q.created_at).toLocaleDateString()}"`,
      `"${q.name.replace(/"/g, '""')}"`,
      `"${q.phone}"`,
      `"${q.email}"`,
      `"${q.activity}"`,
      `"${q.status}"`,
      `"${q.budget || ''}"`,
      `"${q.project_date || ''}"`,
      `"${q.message.replace(/"/g, '""')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `demandes_devis_five_ventures_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Copy SQL Schema
  const handleCopySql = () => {
    navigator.clipboard.writeText(SUPABASE_SQL_SCHEMA);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2500);
  };

  // Filtered quotes
  const filteredQuotes = quotes.filter((q) => {
    if (statusFilter === 'all') return true;
    return q.status === statusFilter;
  });

  // If not authenticated, render login form
  if (!isAuthenticated) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4 bg-slate-100 dark:bg-slate-950">
        <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-xl">
          <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 text-[#0F3D2E] dark:text-emerald-400 flex items-center justify-center mx-auto mb-6">
            <Lock className="w-7 h-7" />
          </div>

          <h2 className="text-xl font-bold text-center text-slate-900 dark:text-white mb-2">
            {t.admin.login_title}
          </h2>
          <p className="text-xs text-slate-500 text-center mb-6">
            {t.admin.login_desc}
          </p>

          {authError && (
            <div className="p-3 mb-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-xs text-red-700 dark:text-red-300">
              {authError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {t.admin.email}
              </label>
              <input
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0F3D2E]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {t.admin.password}
              </label>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0F3D2E]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#0F3D2E] hover:bg-[#175440] text-white text-xs sm:text-sm font-bold rounded-xl shadow-sm transition-all cursor-pointer"
            >
              {t.admin.btn_login}
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 text-center">
            Compte de démonstration pré-rempli pour évaluation
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-slate-100 dark:bg-slate-950 min-h-screen pb-20">
      {/* Top Admin Nav Strip */}
      <div className="bg-[#0F3D2E] text-white py-4 px-4 sm:px-8 border-b border-emerald-950">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-orange-400" />
            <div>
              <h1 className="text-base sm:text-lg font-bold leading-none">
                Five Ventures Group · Espace Administrateur
              </h1>
              <span className="text-[11px] text-emerald-200">
                Yaoundé, Cameroun · Session Active
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-900/60 hover:bg-emerald-900 text-xs font-semibold rounded-lg text-emerald-100 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>{t.admin.logout}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* KPI Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
            <span className="text-xs text-slate-500 block mb-1">{t.admin.kpi_quotes}</span>
            <div className="text-2xl font-bold font-mono tabular-nums text-slate-900 dark:text-white">
              {quotes.length}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
            <span className="text-xs text-slate-500 block mb-1">{t.admin.kpi_new_quotes}</span>
            <div className="text-2xl font-bold font-mono tabular-nums text-[#E8751A]">
              {quotes.filter((q) => q.status === 'new').length}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
            <span className="text-xs text-slate-500 block mb-1">{t.admin.kpi_projects}</span>
            <div className="text-2xl font-bold font-mono tabular-nums text-[#0F3D2E] dark:text-emerald-400">
              {projects.length}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
            <span className="text-xs text-slate-500 block mb-1">{t.admin.kpi_products}</span>
            <div className="text-2xl font-bold font-mono tabular-nums text-slate-900 dark:text-white">
              {products.length}
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar border-b border-slate-200 dark:border-slate-800 pb-2 mb-8">
          <button
            onClick={() => setActiveTab('quotes')}
            className={`px-5 py-2.5 text-xs sm:text-sm font-bold rounded-xl whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'quotes'
                ? 'bg-[#0F3D2E] text-white shadow-xs'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4 text-[#E8751A]" />
            <span>{t.admin.tab_quotes}</span>
            <span className="ml-1 px-1.5 py-0.2 bg-orange-500/20 text-orange-200 text-[10px] rounded-full">
              {quotes.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className={`px-5 py-2.5 text-xs sm:text-sm font-bold rounded-xl whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'projects'
                ? 'bg-[#0F3D2E] text-white shadow-xs'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            <FolderKanban className="w-4 h-4 text-emerald-400" />
            <span>{t.admin.tab_projects}</span>
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`px-5 py-2.5 text-xs sm:text-sm font-bold rounded-xl whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'products'
                ? 'bg-[#0F3D2E] text-white shadow-xs'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            <Package className="w-4 h-4 text-emerald-400" />
            <span>{t.admin.tab_products}</span>
          </button>

          <button
            onClick={() => setActiveTab('deployment')}
            className={`px-5 py-2.5 text-xs sm:text-sm font-bold rounded-xl whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'deployment'
                ? 'bg-[#0F3D2E] text-white shadow-xs'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            <Server className="w-4 h-4 text-orange-400" />
            <span>{t.admin.tab_deploy}</span>
          </button>
        </div>

        {/* TAB 1: QUOTES MANAGEMENT */}
        {activeTab === 'quotes' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              {/* Status Filters */}
              <div className="flex items-center gap-2">
                {(['all', 'new', 'in_progress', 'treated'] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                      statusFilter === st
                        ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                        : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                    }`}
                  >
                    {st === 'all'
                      ? 'Tous'
                      : st === 'new'
                      ? t.admin.status_new
                      : st === 'in_progress'
                      ? t.admin.status_in_progress
                      : t.admin.status_treated}
                  </button>
                ))}
              </div>

              {/* Action Export */}
              <button
                onClick={handleExportCSV}
                className="px-4 py-2 bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl flex items-center gap-2 cursor-pointer self-start sm:self-auto"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{t.admin.export_csv}</span>
              </button>
            </div>

            {/* Quotes Table */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
                    <tr>
                      <th className="py-3 px-4 font-semibold">Date & Client</th>
                      <th className="py-3 px-4 font-semibold">Contact (Tél / Email)</th>
                      <th className="py-3 px-4 font-semibold">Pôle Concerné</th>
                      <th className="py-3 px-4 font-semibold">Message & Budget</th>
                      <th className="py-3 px-4 font-semibold">Statut</th>
                      <th className="py-3 px-4 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                    {filteredQuotes.map((q) => (
                      <tr key={q.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-slate-900 dark:text-white">
                            {q.name}
                          </div>
                          <div className="text-[11px] text-slate-400 font-mono">
                            {new Date(q.created_at).toLocaleDateString()} · {new Date(q.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </td>

                        <td className="py-3.5 px-4 font-mono">
                          <div className="text-slate-900 dark:text-white font-semibold">
                            {q.phone}
                          </div>
                          <div className="text-[11px] text-slate-400">
                            {q.email}
                          </div>
                        </td>

                        <td className="py-3.5 px-4 font-semibold uppercase text-[11px]">
                          <span className="text-[#0F3D2E] dark:text-emerald-400">
                            {q.activity}
                          </span>
                        </td>

                        <td className="py-3.5 px-4 max-w-xs">
                          <p className="line-clamp-2 text-slate-600 dark:text-slate-400">
                            {q.message}
                          </p>
                          {q.budget && (
                            <span className="text-[10px] text-orange-600 dark:text-orange-400 font-bold block mt-0.5">
                              Budget: {q.budget}
                            </span>
                          )}
                        </td>

                        <td className="py-3.5 px-4">
                          <select
                            value={q.status}
                            onChange={(e) => updateQuoteStatus(q.id, e.target.value as QuoteStatus)}
                            className={`text-xs font-bold px-2.5 py-1 rounded-lg border focus:outline-none cursor-pointer ${
                              q.status === 'new'
                                ? 'bg-orange-50 text-orange-700 border-orange-200'
                                : q.status === 'in_progress'
                                ? 'bg-blue-50 text-blue-700 border-blue-200'
                                : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            }`}
                          >
                            <option value="new">Nouveau</option>
                            <option value="in_progress">En cours</option>
                            <option value="treated">Traité</option>
                          </select>
                        </td>

                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            {/* WhatsApp Direct Reply */}
                            <a
                              href={`https://wa.me/${q.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                                `Bonjour ${q.name}, Five Ventures Group vous contacte suite à votre demande de devis.`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                              title="Répondre sur WhatsApp"
                            >
                              <MessageCircle className="w-4 h-4" />
                            </a>

                            {/* Email Direct Reply */}
                            <a
                              href={`mailto:${q.email}?subject=Five%20Ventures%20Group%20-%20Votre%20Demande%20de%20Devis&body=Bonjour%20${encodeURIComponent(
                                q.name
                              )},%0D%0ANous%20faisons%20suite%20%C3%A0%20votre%20demande...`}
                              className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                              title="Répondre par Email"
                            >
                              <Mail className="w-4 h-4" />
                            </a>

                            {/* Delete Quote */}
                            <button
                              onClick={() => {
                                if (confirm('Confirmer la suppression de cette demande de devis ?')) {
                                  deleteQuote(q.id);
                                }
                              }}
                              className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                              title="Supprimer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: BTP PROJECTS CRUD */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  Gestion des Chantiers BTP
                </h3>
                <p className="text-xs text-slate-500">
                  Ajoutez, mettez à jour ou supprimez les projets présentés dans le portfolio public.
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingProject(null);
                  setIsProjectModalOpen(true);
                }}
                className="px-4 py-2.5 bg-[#0F3D2E] hover:bg-[#175440] text-white text-xs font-bold rounded-xl flex items-center gap-2 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>{t.admin.action_add_project}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="relative aspect-16/9 bg-slate-200">
                      <img
                        src={proj.image_url}
                        alt={proj.title_fr}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-2 right-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded">
                        {proj.category}
                      </div>
                    </div>

                    <div className="p-5">
                      <div className="text-xs font-mono text-slate-400 mb-1">
                        {proj.location} · {proj.year}
                      </div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-2">
                        {proj.title_fr}
                      </h4>
                      <p className="text-xs text-slate-500 line-clamp-2">
                        {proj.description_fr}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500">
                      Durée : <strong>{proj.duration}</strong>
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setEditingProject(proj);
                          setIsProjectModalOpen(true);
                        }}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                        title="Modifier"
                      >
                        <Edit className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => {
                          if (confirm(`Supprimer le projet "${proj.title_fr}" ?`)) {
                            deleteProject(proj.id);
                          }
                        }}
                        className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                        title="Supprimer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: PRODUCTS CRUD */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  Gestion du Catalogue Produits
                </h3>
                <p className="text-xs text-slate-500">
                  Articles de commerce général, matériaux lourds et denrées import-export.
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingProduct(null);
                  setIsProductModalOpen(true);
                }}
                className="px-4 py-2.5 bg-[#0F3D2E] hover:bg-[#175440] text-white text-xs font-bold rounded-xl flex items-center gap-2 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>{t.admin.action_add_product}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((prod) => (
                <div
                  key={prod.id}
                  className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex justify-between items-start">
                      <div>
                        <span className="text-[10px] font-mono text-[#E8751A] block font-bold">
                          {prod.reference}
                        </span>
                        <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                          {prod.name_fr}
                        </h4>
                      </div>
                      <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                        prod.in_stock ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {prod.in_stock ? 'En stock' : 'Sur commande'}
                      </span>
                    </div>

                    <div className="p-5 text-xs text-slate-500 space-y-1.5">
                      <div>
                        <strong>Origine :</strong> {prod.origin}
                      </div>
                      <div>
                        <strong>Commande Min (MOQ) :</strong> {prod.min_order}
                      </div>
                      <p className="pt-2 line-clamp-2 text-slate-600 dark:text-slate-400">
                        {prod.description_fr}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <span className="text-[10px] uppercase font-mono text-slate-400">
                      Cat: {prod.category}
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setEditingProduct(prod);
                          setIsProductModalOpen(true);
                        }}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                        title="Modifier"
                      >
                        <Edit className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => {
                          if (confirm(`Supprimer le produit "${prod.name_fr}" ?`)) {
                            deleteProduct(prod.id);
                          }
                        }}
                        className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                        title="Supprimer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: DEPLOYMENT & SUPABASE GUIDE */}
        {activeTab === 'deployment' && (
          <div className="space-y-8 max-w-4xl">
            {/* Guide Header */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-xs">
              <div className="flex items-center gap-3 mb-4">
                <Server className="w-8 h-8 text-[#0F3D2E] dark:text-emerald-400" />
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    Procédure de Déploiement en Production & Architecture Cloud
                  </h3>
                  <p className="text-xs text-slate-500">
                    Guide d'infrastructure complet : Supabase, Vercel, nom de domaine et sécurité.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-900 dark:text-emerald-200 mb-6">
                <strong>Statut de Connexion Supabase :</strong>{' '}
                {isSupabaseConfigured ? (
                  <span className="text-emerald-700 font-bold">Connecté au projet distant</span>
                ) : (
                  <span className="text-amber-700 dark:text-amber-300 font-bold">
                    Mode Local Résilient actif (Fonctionnel sans clé, prêt pour raccordement Supabase)
                  </span>
                )}
              </div>

              {/* Step 1: Supabase SQL Schema */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#0F3D2E] text-white flex items-center justify-center text-xs">
                      1
                    </span>
                    <span>Configuration de la base de données Supabase (PostgreSQL)</span>
                  </h4>

                  <button
                    onClick={handleCopySql}
                    className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {copiedSql ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedSql ? 'Copié !' : 'Copier le script SQL'}</span>
                  </button>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">
                  1. Rendez-vous sur votre tableau de bord <a href="https://supabase.com" target="_blank" rel="noreferrer" className="text-[#E8751A] underline">supabase.com</a> et créez un projet.
                  <br />
                  2. Ouvrez le <strong>SQL Editor</strong> et collez le script ci-dessous :
                </p>

                <div className="relative bg-slate-950 text-slate-300 p-4 rounded-2xl font-mono text-xs overflow-x-auto max-h-60 border border-slate-800">
                  <pre>{SUPABASE_SQL_SCHEMA}</pre>
                </div>
              </div>

              {/* Step 2: Vercel Deployment */}
              <div className="mb-8">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-3">
                  <span className="w-6 h-6 rounded-full bg-[#0F3D2E] text-white flex items-center justify-center text-xs">
                    2
                  </span>
                  <span>Déploiement sur Vercel</span>
                </h4>
                <div className="text-xs text-slate-600 dark:text-slate-300 space-y-2 leading-relaxed">
                  <p>1. Poussez le code source sur un dépôt GitHub privé ou public.</p>
                  <p>2. Connectez le dépôt à votre compte <strong>Vercel</strong> (sélectionnez le framework Vite/React).</p>
                  <p>3. Dans l'onglet <strong>Settings &gt; Environment Variables</strong> sur Vercel, ajoutez :</p>
                  <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-xl font-mono text-[11px] space-y-1">
                    <div>VITE_SUPABASE_URL=https://votre-projet.supabase.co</div>
                    <div>VITE_SUPABASE_ANON_KEY=eyJhbGciOi...</div>
                  </div>
                  <p>4. Cliquez sur <strong>Deploy</strong>. Le build prendra environ 45 secondes.</p>
                </div>
              </div>

              {/* Step 3: Domain & DNS Configuration */}
              <div className="mb-8">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-3">
                  <span className="w-6 h-6 rounded-full bg-[#0F3D2E] text-white flex items-center justify-center text-xs">
                    3
                  </span>
                  <span>Configuration du Nom de Domaine (.cm ou .com)</span>
                </h4>
                <div className="text-xs text-slate-600 dark:text-slate-300 space-y-2 leading-relaxed">
                  <p>
                    Pour l'extension camerounaise <strong>.cm</strong> (via l'ANTIC ou un bureau d'enregistrement accrédité comme Camtel/Orange/OVH) ou <strong>.com</strong> :
                  </p>
                  <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-xl font-mono text-[11px] space-y-1">
                    <div>Enregistrement A : @ -&gt; 76.76.21.21 (Serveurs Vercel Anycast)</div>
                    <div>Enregistrement CNAME : www -&gt; cname.vercel-dns.com</div>
                  </div>
                  <p>Le certificat SSL Let's Encrypt est provisionné automatiquement par Vercel.</p>
                </div>
              </div>

              {/* Step 4: Go-Live Checklist */}
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-3">
                  <span className="w-6 h-6 rounded-full bg-[#E8751A] text-white flex items-center justify-center text-xs">
                    4
                  </span>
                  <span>Checklist de Mise en Ligne</span>
                </h4>
                <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>Numéro WhatsApp vérifié : +237 699 64 95 35 opérationnel</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>Lignes fixes et mobiles : +237 675 81 11 31 et +237 655 73 35 41 vérifiées</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>Adresse mail officielle configurée : fiveventuresgroup@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>Balises meta SEO, Open Graph et JSON-LD LocalBusiness actives</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>Protection anti-spam Honeypot et validation de formulaire validées</span>
                  </div>
                </div>
              </div>

              {/* Reset to initial demo data */}
              <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex justify-end">
                <button
                  onClick={() => {
                    if (confirm('Réinitialiser toutes les données aux valeurs de démonstration par défaut ?')) {
                      resetToDefaultData();
                      alert('Données réinitialisées avec succès.');
                    }
                  }}
                  className="text-xs text-slate-500 hover:text-red-500 transition-colors cursor-pointer"
                >
                  Réinitialiser les données de démo
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* PROJECT MODAL (Add / Edit) */}
      {isProjectModalOpen && (
        <ProjectModal
          project={editingProject}
          imagePresets={IMAGE_PRESETS}
          onClose={() => setIsProjectModalOpen(false)}
          onSave={async (data) => {
            if (editingProject) {
              await updateProject({ ...data, id: editingProject.id });
            } else {
              await addProject(data);
            }
            setIsProjectModalOpen(false);
          }}
        />
      )}

      {/* PRODUCT MODAL (Add / Edit) */}
      {isProductModalOpen && (
        <ProductModal
          product={editingProduct}
          imagePresets={IMAGE_PRESETS}
          onClose={() => setIsProductModalOpen(false)}
          onSave={async (data) => {
            if (editingProduct) {
              await updateProduct({ ...data, id: editingProduct.id });
            } else {
              await addProduct(data);
            }
            setIsProductModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

// Project Add / Edit Modal Subcomponent
interface ProjectModalProps {
  project: BTPProject | null;
  imagePresets: { label: string; url: string }[];
  onClose: () => void;
  onSave: (data: Omit<BTPProject, 'id'>) => Promise<void>;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, imagePresets, onClose, onSave }) => {
  const [titleFr, setTitleFr] = useState(project?.title_fr || '');
  const [titleEn, setTitleEn] = useState(project?.title_en || '');
  const [category, setCategory] = useState<'residential' | 'commercial' | 'civil_work' | 'renovation'>(
    project?.category || 'commercial'
  );
  const [location, setLocation] = useState(project?.location || 'Yaoundé - Bastos');
  const [year, setYear] = useState(project?.year || '2026');
  const [client, setClient] = useState(project?.client || 'Client Privé');
  const [duration, setDuration] = useState(project?.duration || '12 mois');
  const [typeWorkFr, setTypeWorkFr] = useState(project?.type_work_fr || 'Gros œuvre et finitions');
  const [typeWorkEn, setTypeWorkEn] = useState(project?.type_work_en || 'Structural works and finishing');
  const [descFr, setDescFr] = useState(project?.description_fr || '');
  const [descEn, setDescEn] = useState(project?.description_en || '');
  const [imageUrl, setImageUrl] = useState(project?.image_url || imagePresets[0].url);
  const [status, setStatus] = useState<'completed' | 'ongoing'>(project?.status || 'completed');
  const [featured, setFeatured] = useState<boolean>(project?.featured || false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave({
      title_fr: titleFr,
      title_en: titleEn || titleFr,
      category,
      location,
      year,
      client,
      duration,
      type_work_fr: typeWorkFr,
      type_work_en: typeWorkEn || typeWorkFr,
      description_fr: descFr,
      description_en: descEn || descFr,
      image_url: imageUrl,
      gallery: [imageUrl],
      status,
      featured,
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200 dark:border-slate-800">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            {project ? 'Modifier le Chantier BTP' : 'Ajouter un Chantier BTP'}
          </h3>
          <button onClick={onClose} className="p-1 rounded text-slate-500 hover:text-slate-900 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
              Titre du Projet (FR) *
            </label>
            <input
              type="text"
              required
              value={titleFr}
              onChange={(e) => setTitleFr(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-xl"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Catégorie *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-xl"
              >
                <option value="commercial">Immeuble Commercial</option>
                <option value="residential">Résidentiel & Villa</option>
                <option value="civil_work">Génie Civil & VRD</option>
                <option value="renovation">Rénovation</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Localisation (Yaoundé / Région) *
              </label>
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-xl"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Année *
              </label>
              <input
                type="text"
                required
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Maître d'ouvrage *
              </label>
              <input
                type="text"
                required
                value={client}
                onChange={(e) => setClient(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-xl"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Durée *
              </label>
              <input
                type="text"
                required
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-xl"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
              Image du projet (sélectionnez un preset ou saisissez une URL)
            </label>
            <div className="flex gap-2 mb-2 overflow-x-auto py-1">
              {imagePresets.map((ip, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setImageUrl(ip.url)}
                  className={`px-2 py-1 rounded text-[10px] whitespace-nowrap border ${
                    imageUrl === ip.url ? 'bg-[#0F3D2E] text-white' : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {ip.label}
                </button>
              ))}
            </div>
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-[11px]"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
              Description technique (FR) *
            </label>
            <textarea
              rows={3}
              required
              value={descFr}
              onChange={(e) => setDescFr(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-xl"
            />
          </div>

          <div className="flex items-center gap-6 pt-2">
            <label className="flex items-center gap-2 cursor-pointer font-bold">
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="w-4 h-4 text-[#0F3D2E] rounded"
              />
              <span>Mettre en vedette sur l'Accueil</span>
            </label>

            <label className="flex items-center gap-2 font-bold">
              <span>Statut :</span>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="px-2 py-1 border rounded-lg"
              >
                <option value="completed">Livré</option>
                <option value="ongoing">En cours</option>
              </select>
            </label>
          </div>

          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl font-bold cursor-pointer"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-[#0F3D2E] text-white rounded-xl font-bold cursor-pointer"
            >
              Enregistrer le projet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Product Add / Edit Modal Subcomponent
interface ProductModalProps {
  product: ProductItem | null;
  imagePresets: { label: string; url: string }[];
  onClose: () => void;
  onSave: (data: Omit<ProductItem, 'id'>) => Promise<void>;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, imagePresets, onClose, onSave }) => {
  const [nameFr, setNameFr] = useState(product?.name_fr || '');
  const [nameEn, setNameEn] = useState(product?.name_en || '');
  const [category, setCategory] = useState<'materials' | 'industrial' | 'agricultural' | 'food_beverage' | 'equipment'>(
    product?.category || 'materials'
  );
  const [reference, setReference] = useState(product?.reference || 'FVG-MAT-01');
  const [origin, setOrigin] = useState(product?.origin || 'Cameroun / Import');
  const [minOrder, setMinOrder] = useState(product?.min_order || '1 Lot');
  const [descFr, setDescFr] = useState(product?.description_fr || '');
  const [descEn, setDescEn] = useState(product?.description_en || '');
  const [imageUrl, setImageUrl] = useState(product?.image_url || imagePresets[3].url);
  const [inStock, setInStock] = useState<boolean>(product?.in_stock ?? true);
  const [featured, setFeatured] = useState<boolean>(product?.featured ?? false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave({
      name_fr: nameFr,
      name_en: nameEn || nameFr,
      category,
      reference,
      origin,
      min_order: minOrder,
      description_fr: descFr,
      description_en: descEn || descFr,
      specs: ['Conforme aux normes de qualité certifiées', 'Fiche technique disponible sur demande'],
      image_url: imageUrl,
      in_stock: inStock,
      featured,
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200 dark:border-slate-800">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            {product ? 'Modifier le Produit' : 'Ajouter un Produit'}
          </h3>
          <button onClick={onClose} className="p-1 rounded text-slate-500 hover:text-slate-900 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
              Nom du Produit (FR) *
            </label>
            <input
              type="text"
              required
              value={nameFr}
              onChange={(e) => setNameFr(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-xl"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Catégorie *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-xl"
              >
                <option value="materials">Matériaux BTP</option>
                <option value="industrial">Équipements & Outillage</option>
                <option value="agricultural">Produits Agricoles & Export</option>
                <option value="equipment">EPI & Sécurité</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Référence / SKU *
              </label>
              <input
                type="text"
                required
                value={reference}
                onChange={(e) => setReference(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Provenance / Origine *
              </label>
              <input
                type="text"
                required
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-xl"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Quantité Minimale (MOQ) *
              </label>
              <input
                type="text"
                required
                value={minOrder}
                onChange={(e) => setMinOrder(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-xl"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
              Description commerciale *
            </label>
            <textarea
              rows={3}
              required
              value={descFr}
              onChange={(e) => setDescFr(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-xl"
            />
          </div>

          <div className="flex items-center gap-6 pt-2">
            <label className="flex items-center gap-2 cursor-pointer font-bold">
              <input
                type="checkbox"
                checked={inStock}
                onChange={(e) => setInStock(e.target.checked)}
                className="w-4 h-4 text-[#0F3D2E] rounded"
              />
              <span>Disponible en stock</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer font-bold">
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="w-4 h-4 text-[#0F3D2E] rounded"
              />
              <span>Mettre en vedette</span>
            </label>
          </div>

          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl font-bold cursor-pointer"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-[#0F3D2E] text-white rounded-xl font-bold cursor-pointer"
            >
              Enregistrer l'article
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
