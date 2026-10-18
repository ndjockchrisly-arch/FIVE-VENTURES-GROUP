import React, { useState } from 'react';
import { useI18n } from '../../context/I18nContext';
import { useData } from '../../context/DataContext';
import { ProductItem, ProductCategory } from '../../types';
import {
  Search,
  CheckCircle2,
  Package,
  Layers,
  ArrowRight,
  Filter,
  FileText,
} from 'lucide-react';

interface ProductsPageProps {
  onSelectProductForQuote: (product: ProductItem) => void;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({ onSelectProductForQuote }) => {
  const { t, language } = useI18n();
  const { products } = useData();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');

  const categories: { id: ProductCategory; label: string }[] = [
    { id: 'all', label: t.products.filter_all },
    { id: 'materials', label: t.products.filter_materials },
    { id: 'industrial', label: t.products.filter_industrial },
    { id: 'agricultural', label: t.products.filter_agricultural },
    { id: 'equipment', label: t.products.filter_equipment },
  ];

  const filteredProducts = products.filter((prod) => {
    const matchesCategory = selectedCategory === 'all' || prod.category === selectedCategory;
    const name = language === 'fr' ? prod.name_fr : prod.name_en;
    const desc = language === 'fr' ? prod.description_fr : prod.description_en;
    const matchesSearch =
      name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
      desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full bg-slate-50 dark:bg-slate-900 transition-colors">
      {/* Header */}
      <section className="bg-[#0F3D2E] text-white py-16 sm:py-20 border-b border-emerald-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-orange-400 mb-2 block">
              Approvisionnement & Sourcing
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
              {t.products.title}
            </h1>
            <p className="text-base sm:text-lg text-emerald-100/90 leading-relaxed">
              {t.products.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="sticky top-20 z-30 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 py-4 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
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

          {/* Search Input */}
          <div className="relative min-w-[280px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.products.search_placeholder}
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0F3D2E] dark:focus:ring-emerald-400"
            />
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-8">
              <Package className="w-12 h-12 text-slate-400 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
                {t.products.empty_state}
              </h3>
              <p className="text-xs text-slate-500">
                Essayez d'ajuster vos termes de recherche ou sélectionnez une autre catégorie.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  {/* Photo with Overlay Reference */}
                  <div className="relative aspect-16/9 bg-slate-200 overflow-hidden">
                    <img
                      src={product.image_url}
                      alt={language === 'fr' ? product.name_fr : product.name_en}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3 bg-slate-950/80 text-white text-[10px] font-mono px-2.5 py-1 rounded-md">
                      {product.reference}
                    </div>
                    <div className="absolute top-3 right-3 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                      {product.in_stock ? t.products.in_stock : t.products.on_order}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex flex-col flex-1 justify-between">
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2 leading-snug">
                        {language === 'fr' ? product.name_fr : product.name_en}
                      </h3>

                      <p className="text-xs text-slate-600 dark:text-slate-300 mb-4 line-clamp-3 leading-relaxed">
                        {language === 'fr' ? product.description_fr : product.description_en}
                      </p>

                      {/* Technical Specs List */}
                      {product.specs && product.specs.length > 0 && (
                        <div className="mb-4 pt-3 border-t border-slate-100 dark:border-slate-700 space-y-1.5">
                          {product.specs.map((spec, sIdx) => (
                            <div key={sIdx} className="flex items-start gap-2 text-[11px] text-slate-600 dark:text-slate-400">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                              <span>{spec}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Logistics Info */}
                      <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded-xl border border-slate-100 dark:border-slate-800 text-[11px] space-y-1 mb-6">
                        <div className="flex justify-between">
                          <span className="text-slate-500">{t.products.origin} :</span>
                          <span className="font-semibold text-slate-800 dark:text-slate-200">{product.origin}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">{t.products.min_order} :</span>
                          <span className="font-mono font-semibold text-[#E8751A]">{product.min_order}</span>
                        </div>
                      </div>
                    </div>

                    {/* Quotation CTA */}
                    <button
                      onClick={() => onSelectProductForQuote(product)}
                      className="w-full py-2.5 px-4 bg-[#0F3D2E] hover:bg-[#175440] active:scale-98 text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                    >
                      <FileText className="w-3.5 h-3.5 text-orange-400" />
                      <span>{t.products.cta_quote_product}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Info notice about B2B ordering (no online payment required) */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-emerald-50 dark:bg-emerald-950/40 p-6 rounded-2xl border border-emerald-200 dark:border-emerald-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-bold text-emerald-900 dark:text-emerald-200">
                Commande au gros & Sourcing sur mesure
              </h4>
              <p className="text-xs text-emerald-800/80 dark:text-emerald-300 mt-1">
                Vous recherchez une référence spécifique non listée (engins de TP, aciers spéciaux, fret maritime vers Douala/Kribi) ?
              </p>
            </div>
            <a
              href="https://wa.me/237699649535?text=Bonjour%20Five%20Ventures%20Group,%20je%20recherche%20une%20r%C3%A9f%C3%A9rence%20sp%C3%A9cifique%20en%20gros."
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-[#25D366] text-white text-xs font-bold rounded-xl whitespace-nowrap shadow-sm hover:bg-[#20ba59] transition-all"
            >
              Échanger avec notre acheteur WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
