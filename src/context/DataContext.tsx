import React, { createContext, useContext, useState, useEffect } from 'react';
import { BTPProject, ProductItem, QuoteRequest, QuoteStatus, ActivitySector } from '../types';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

// Generated image paths from our tool
const HERO_IMAGE = '/src/assets/images/hero_five_ventures_btp_logistics_1792314203064.jpg';
const COMMERCIAL_PROJECT_IMAGE = '/src/assets/images/project_commercial_building_yaounde_1792314203183.jpg';
const RESIDENTIAL_PROJECT_IMAGE = '/src/assets/images/project_residential_villa_yaounde_1792314204513.jpg';
const IMPORT_EXPORT_IMAGE = '/src/assets/images/product_logistics_import_export_1792314204349.jpg';

export const INITIAL_PROJECTS: BTPProject[] = [
  {
    id: 'proj-1',
    title_fr: 'Complexe Tertiaire & Siège d\'Affaires Bastos',
    title_en: 'Bastos Corporate Complex & Business HQ',
    category: 'commercial',
    location: 'Yaoundé - Quartier Bastos',
    year: '2025',
    type_work_fr: 'Construction R+6, mur-rideau vitré & finitions haut de gamme',
    type_work_en: 'G+6 Construction, structural glazed curtain wall & premium fit-out',
    client: 'Groupe Financier Panafricain',
    duration: '18 mois',
    image_url: COMMERCIAL_PROJECT_IMAGE,
    gallery: [COMMERCIAL_PROJECT_IMAGE, HERO_IMAGE],
    description_fr: 'Conception et réalisation intégrale d\'un immeuble de bureaux de 6 étages à Bastos. Structure en béton armé antisismique, isolation thermique renforcée adaptée au climat équatorial et système de gestion technique centralisé (GTB).',
    description_en: 'Turnkey architectural delivery of a 6-storey commercial headquarters in Bastos. Reinforced seismic-resistant concrete frame, climate-adapted solar protection, and integrated building automation systems.',
    status: 'completed',
    featured: true,
  },
  {
    id: 'proj-2',
    title_fr: 'Résidence Privée de Grand Standing avec Piscine',
    title_en: 'Luxury Private Villa Residence with Swimming Pool',
    category: 'residential',
    location: 'Yaoundé - Mont Fébé',
    year: '2024',
    type_work_fr: 'Gros œuvre, architecture bioclimatique, domotique et aménagement paysager',
    type_work_en: 'Structural shell, bioclimatic architecture, home automation & landscaping',
    client: 'Investisseur Privé',
    duration: '12 mois',
    image_url: RESIDENTIAL_PROJECT_IMAGE,
    gallery: [RESIDENTIAL_PROJECT_IMAGE, COMMERCIAL_PROJECT_IMAGE],
    description_fr: 'Construction d\'une villa contemporaine de 650 m² habitables. Baies vitrées coulissantes à rupture de pont thermique, parement en pierre naturelle de carrière camerounaise, piscine à débordement et autonomie solaire partielle.',
    description_en: 'Construction of a 650 sqm contemporary luxury residence. Thermal-break glass panels, local natural stone cladding, infinity pool, and hybrid solar energy system.',
    status: 'completed',
    featured: true,
  },
  {
    id: 'proj-3',
    title_fr: 'Plateforme Logistique Multimodale & Entrepôt Froid',
    title_en: 'Multimodal Logistics Hub & Cold Storage Warehouse',
    category: 'civil_work',
    location: 'Zone Industrielle Yaoundé-Sud',
    year: '2025',
    type_work_fr: 'Charpente métallique lourde, dallage industriel haute résistance et VRD',
    type_work_en: 'Heavy steel structure, high-load industrial slab & road networking',
    client: 'Consortium Agro-alimentaire CEMAC',
    duration: '14 mois',
    image_url: HERO_IMAGE,
    gallery: [HERO_IMAGE, IMPORT_EXPORT_IMAGE],
    description_fr: 'Aménagement d\'un entrepôt sécurisé de 3 200 m² dédié au stockage sous douane et à la logistique de distribution rapide. Voies d\'accès pour poids lourds et raccordement aux réseaux eau et électricité moyenne tension.',
    description_en: 'Development of a 3,200 sqm bonded warehouse for rapid distribution logistics and cold storage. Heavy vehicle access roads and full industrial utility connectivity.',
    status: 'completed',
    featured: true,
  },
  {
    id: 'proj-4',
    title_fr: 'Réhabilitation & Modernisation Hôtelière',
    title_en: 'Hotel Rehabilitation & Interior Modernization',
    category: 'renovation',
    location: 'Yaoundé - Centre Ville',
    year: '2026',
    type_work_fr: 'Rénovation intérieure complète, mise aux normes électriques et sécurité incendie',
    type_work_en: 'Full interior overhaul, electrical compliance & fire safety upgrading',
    client: 'Chaîne Hôtelière Régionale',
    duration: '8 mois',
    image_url: COMMERCIAL_PROJECT_IMAGE,
    gallery: [COMMERCIAL_PROJECT_IMAGE, RESIDENTIAL_PROJECT_IMAGE],
    description_fr: 'Travaux de rénovation en site occupé : réfection de 48 chambres, hall d\'accueil en marbre, isolation acoustique et modernisation des colonnes de plomberie et climatisation.',
    description_en: 'Renovation carried out in an occupied building: refurbishment of 48 guest rooms, marble reception lobby, acoustic insulation, and modern plumbing/HVAC systems.',
    status: 'ongoing',
    featured: false,
  }
];

export const INITIAL_PRODUCTS: ProductItem[] = [
  {
    id: 'prod-1',
    name_fr: 'Ciment Portland CPJ 42.5 Haute Performance',
    name_en: 'High Performance Portland Cement CPJ 42.5',
    category: 'materials',
    reference: 'MAT-CIM-425',
    origin: 'Cameroun / Cimenteries Certifiées',
    min_order: '500 Sacs (25 Tonnes)',
    description_fr: 'Ciment haute résistance pour bétons armés, fondations, ouvrages d\'art et dallages à forte sollicitation mécanique. Conforme aux normes NC 234 / EN 197-1.',
    description_en: 'High early-strength cement for reinforced concrete structures, foundations, and heavy-duty slabs. Complies with NC 234 / EN 197-1 standards.',
    specs: ['Résistance à 28 jours ≥ 42.5 MPa', 'Conditionnement : Sacs de 50 kg ou Vrac citerne', 'Prise rapide et faible retrait'],
    image_url: HERO_IMAGE,
    in_stock: true,
    featured: true,
  },
  {
    id: 'prod-2',
    name_fr: 'Fers à Béton FeE500 Haute Adhérence (Norme NF/AFNOR)',
    name_en: 'High-Bond Rebar FeE500 (NF/AFNOR Standard)',
    category: 'materials',
    reference: 'MAT-FER-500',
    origin: 'Importation CEE & Sourcing Afrique Centrale',
    min_order: '10 Tonnes',
    description_fr: 'Aciers crénelés soudables pour armatures de génie civil et bâtiments. Diamètres disponibles : Ø6, Ø8, Ø10, Ø12, Ø14, Ø16, Ø20, Ø25 mm. Longueurs de 12 mètres.',
    description_en: 'Weldable ribbed rebar for civil engineering and structural framing. Diameters from Ø6mm to Ø25mm in 12m standard bundles.',
    specs: ['Limite élastique Re ≥ 500 N/mm²', 'Certificat de conformité usine fourni', 'Conditionnement en fardeaux cerclés de 2 tonnes'],
    image_url: COMMERCIAL_PROJECT_IMAGE,
    in_stock: true,
    featured: true,
  },
  {
    id: 'prod-3',
    name_fr: 'Lot Conteneurisé d\'Équipements de Protection Individuelle (EPI)',
    name_en: 'Containerized Personal Protective Equipment (PPE) Pack',
    category: 'equipment',
    reference: 'EPI-PRO-BTP',
    origin: 'Europe / Asie (Certification CE EN ISO)',
    min_order: '1 Lot Entreprise (100 kits)',
    description_fr: 'Pack complet sécurité chantier : casques ventilés avec jugulaire, gilets haute visibilité fluorescent classe 2, chaussures de sécurité S3 coquées et gants anti-coupure.',
    description_en: 'Complete on-site safety pack: ventilated helmets with chinstraps, class 2 hi-vis vests, S3 steel-toe footwear, and cut-resistant protective gloves.',
    specs: ['Casques EN 397', 'Chaussures de sécurité cuir S3 SRC hydrofuge', 'Normes CE & ISO 20345'],
    image_url: HERO_IMAGE,
    in_stock: true,
    featured: false,
  },
  {
    id: 'prod-4',
    name_fr: 'Fèves de Cacao Grade 1 Cameroun (Origine Baré-Bakem / Mbam)',
    name_en: 'Cameroon Grade 1 Cocoa Beans (Origin Baré-Bakem / Mbam)',
    category: 'agricultural',
    reference: 'EXP-CAC-G1',
    origin: 'Cameroun (Coopératives Partenaires Agréées)',
    min_order: '1 Conteneur 20 pieds (12.5 Tonnes)',
    description_fr: 'Fèves de cacao fermentées et séchées au soleil selon les méthodes traditionnelles garantissant un arôme riche. Humidité < 7.5%, taux de défectueux < 5%. Traçabilité complète.',
    description_en: 'Sun-dried fermented cocoa beans ensuring rich aromatic profile. Moisture < 7.5%, defective count < 5%. Full origin traceability ready for export.',
    specs: ['Qualité Grade 1 conforme ONCC', 'Conditionnement : Sacs de jute neufs 65 kg', 'Fret FOB Douala ou Kribi disponible'],
    image_url: IMPORT_EXPORT_IMAGE,
    in_stock: true,
    featured: true,
  },
  {
    id: 'prod-5',
    name_fr: 'Groupe Électrogène Industriel Insonorisé 150 kVA',
    name_en: '150 kVA Soundproof Industrial Generator',
    category: 'industrial',
    reference: 'IND-GEN-150',
    origin: 'Union Européenne',
    min_order: '1 Unité',
    description_fr: 'Groupe électrogène diesel avec alternateur synchrone et capotage insonorisé 68 dB à 7 mètres. Démarrage automatique sur coupure réseau (ATS inclus). Idéal pour chantiers et résidences.',
    description_en: 'Diesel generator set with brushless alternator and 68 dB sound attenuated canopy. Integrated automatic transfer switch (ATS) for uninterrupted power.',
    specs: ['Puissance continue : 150 kVA / 120 kW', 'Moteur turbo diesel 4 cylindres injection directe', 'Réservoir grande autonomie 350 Litres'],
    image_url: IMPORT_EXPORT_IMAGE,
    in_stock: true,
    featured: false,
  }
];

export const INITIAL_QUOTES: QuoteRequest[] = [
  {
    id: 'quote-101',
    created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
    name: 'Jean-Paul Mengue',
    phone: '+237 677 45 88 12',
    email: 'jp.mengue@societe-cameroun.cm',
    activity: 'btp',
    message: 'Demande de devis pour la construction d\'un duplex R+1 à Yaoundé quartier Odza, terrain de 500m² déjà titré. Besoin du gros œuvre et du second œuvre.',
    status: 'new',
    budget: '45 000 000 - 60 000 000 FCFA',
    project_date: 'Novembre 2026',
    notes_admin: 'Prospect sérieux, a joint un plan de masse. Rappeler en début de matinée.',
    sent_via_whatsapp: true,
  },
  {
    id: 'quote-102',
    created_at: new Date(Date.now() - 3600000 * 26).toISOString(),
    name: 'Cabinet Médical Bastos',
    phone: '+237 699 12 34 56',
    email: 'direction@clinique-bastos.cm',
    activity: 'services',
    message: 'Contrat de maintenance technique annuelle des installations électriques et climatisation centrale de notre clinique à Bastos.',
    status: 'in_progress',
    budget: '5 000 000 FCFA / an',
    project_date: 'Immédiat',
    notes_admin: 'Visite des locaux effectuée par l\'ingénieur le 17 octobre. Proposition chiffrée en cours de finalisation.',
    sent_via_whatsapp: false,
  },
  {
    id: 'quote-103',
    created_at: new Date(Date.now() - 3600000 * 72).toISOString(),
    name: 'ETS Global Trade Douala',
    phone: '+237 655 89 22 10',
    email: 'contact@globaltrade-cm.com',
    activity: 'import_export',
    message: 'Besoin d\'assistance pour transit maritime et dédouanement de 3 conteneurs 40 pieds au Port Autonome de Kribi vers Yaoundé.',
    status: 'treated',
    budget: 'Cotation au forfait',
    project_date: 'Octobre 2026',
    notes_admin: 'Dédouanement validé et bon de livraison acheminé à Yaoundé.',
    sent_via_whatsapp: true,
  }
];

interface DataContextType {
  projects: BTPProject[];
  products: ProductItem[];
  quotes: QuoteRequest[];
  isLoading: boolean;
  addQuote: (quote: Omit<QuoteRequest, 'id' | 'created_at' | 'status'>) => Promise<{ success: boolean; id: string }>;
  updateQuoteStatus: (id: string, status: QuoteStatus, notes?: string) => Promise<boolean>;
  deleteQuote: (id: string) => Promise<boolean>;
  addProject: (project: Omit<BTPProject, 'id'>) => Promise<boolean>;
  updateProject: (project: BTPProject) => Promise<boolean>;
  deleteProject: (id: string) => Promise<boolean>;
  addProduct: (product: Omit<ProductItem, 'id'>) => Promise<boolean>;
  updateProduct: (product: ProductItem) => Promise<boolean>;
  deleteProduct: (id: string) => Promise<boolean>;
  resetToDefaultData: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<BTPProject[]>(() => {
    const saved = localStorage.getItem('fvg_projects');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_PROJECTS;
  });

  const [products, setProducts] = useState<ProductItem[]>(() => {
    const saved = localStorage.getItem('fvg_products');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_PRODUCTS;
  });

  const [quotes, setQuotes] = useState<QuoteRequest[]>(() => {
    const saved = localStorage.getItem('fvg_quotes');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_QUOTES;
  });

  const [isLoading, setIsLoading] = useState(false);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('fvg_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('fvg_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('fvg_quotes', JSON.stringify(quotes));
  }, [quotes]);

  // Attempt initial fetch from Supabase if configured
  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) return;
    const client = supabase;

    const fetchSupabaseData = async () => {
      try {
        setIsLoading(true);
        const { data: dbProjects } = await client.from('btp_projects').select('*');
        if (dbProjects && dbProjects.length > 0) {
          setProjects(dbProjects);
        }

        const { data: dbProducts } = await client.from('products').select('*');
        if (dbProducts && dbProducts.length > 0) {
          setProducts(dbProducts);
        }

        const { data: dbQuotes } = await client.from('quotes').select('*');
        if (dbQuotes && dbQuotes.length > 0) {
          setQuotes(dbQuotes);
        }
      } catch (err) {
        console.warn('Supabase fetch failed, operating in resilient local mode:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSupabaseData();
  }, []);

  const addQuote = async (quoteData: Omit<QuoteRequest, 'id' | 'created_at' | 'status'>) => {
    const newQuote: QuoteRequest = {
      ...quoteData,
      id: 'quote-' + Date.now(),
      created_at: new Date().toISOString(),
      status: 'new',
    };

    setQuotes(prev => [newQuote, ...prev]);

    // If Supabase configured, attempt remote insertion
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('quotes').insert([{
          name: newQuote.name,
          phone: newQuote.phone,
          email: newQuote.email,
          activity: newQuote.activity,
          message: newQuote.message,
          status: newQuote.status,
          budget: newQuote.budget,
          project_date: newQuote.project_date,
          sent_via_whatsapp: newQuote.sent_via_whatsapp || false,
        }]);
      } catch (e) {
        console.error('Supabase quote insert error:', e);
      }
    }

    return { success: true, id: newQuote.id };
  };

  const updateQuoteStatus = async (id: string, status: QuoteStatus, notes?: string) => {
    setQuotes(prev =>
      prev.map(q => (q.id === id ? { ...q, status, ...(notes !== undefined ? { notes_admin: notes } : {}) } : q))
    );

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('quotes').update({ status, ...(notes !== undefined ? { notes_admin: notes } : {}) }).eq('id', id);
      } catch (e) {
        console.error('Supabase quote status update error:', e);
      }
    }
    return true;
  };

  const deleteQuote = async (id: string) => {
    setQuotes(prev => prev.filter(q => q.id !== id));
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('quotes').delete().eq('id', id);
      } catch (e) {
        console.error('Supabase quote delete error:', e);
      }
    }
    return true;
  };

  const addProject = async (projectData: Omit<BTPProject, 'id'>) => {
    const newProj: BTPProject = {
      ...projectData,
      id: 'proj-' + Date.now(),
    };
    setProjects(prev => [newProj, ...prev]);
    return true;
  };

  const updateProject = async (project: BTPProject) => {
    setProjects(prev => prev.map(p => (p.id === project.id ? project : p)));
    return true;
  };

  const deleteProject = async (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
    return true;
  };

  const addProduct = async (productData: Omit<ProductItem, 'id'>) => {
    const newProd: ProductItem = {
      ...productData,
      id: 'prod-' + Date.now(),
    };
    setProducts(prev => [newProd, ...prev]);
    return true;
  };

  const updateProduct = async (product: ProductItem) => {
    setProducts(prev => prev.map(p => (p.id === product.id ? product : p)));
    return true;
  };

  const deleteProduct = async (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    return true;
  };

  const resetToDefaultData = () => {
    setProjects(INITIAL_PROJECTS);
    setProducts(INITIAL_PRODUCTS);
    setQuotes(INITIAL_QUOTES);
    localStorage.removeItem('fvg_projects');
    localStorage.removeItem('fvg_products');
    localStorage.removeItem('fvg_quotes');
  };

  const value = {
    projects,
    products,
    quotes,
    isLoading,
    addQuote,
    updateQuoteStatus,
    deleteQuote,
    addProject,
    updateProject,
    deleteProject,
    addProduct,
    updateProduct,
    deleteProduct,
    resetToDefaultData,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
