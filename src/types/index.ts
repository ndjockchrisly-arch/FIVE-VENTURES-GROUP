export type Language = 'fr' | 'en';

export type ActivitySector = 'btp' | 'commerce' | 'import_export' | 'services' | 'multi';

export type QuoteStatus = 'new' | 'in_progress' | 'treated';

export type BTPCategory = 'all' | 'residential' | 'commercial' | 'civil_work' | 'renovation';

export type ProductCategory = 'all' | 'materials' | 'industrial' | 'agricultural' | 'food_beverage' | 'equipment';

export interface BTPProject {
  id: string;
  title_fr: string;
  title_en: string;
  category: 'residential' | 'commercial' | 'civil_work' | 'renovation';
  location: string;
  year: string;
  type_work_fr: string;
  type_work_en: string;
  client: string;
  duration: string;
  image_url: string;
  gallery: string[];
  description_fr: string;
  description_en: string;
  status: 'completed' | 'ongoing';
  featured: boolean;
}

export interface ProductItem {
  id: string;
  name_fr: string;
  name_en: string;
  category: 'materials' | 'industrial' | 'agricultural' | 'food_beverage' | 'equipment';
  reference: string;
  origin: string;
  min_order: string;
  description_fr: string;
  description_en: string;
  specs: string[];
  image_url: string;
  in_stock: boolean;
  featured: boolean;
}

export interface QuoteRequest {
  id: string;
  created_at: string;
  name: string;
  phone: string;
  email: string;
  activity: ActivitySector;
  message: string;
  status: QuoteStatus;
  budget?: string;
  project_date?: string;
  notes_admin?: string;
  sent_via_whatsapp?: boolean;
}

export interface CompanyContact {
  phone1: string;
  phone1_display: string;
  phone2: string;
  phone2_display: string;
  whatsapp: string;
  whatsapp_display: string;
  email: string;
  address_fr: string;
  address_en: string;
  city: string;
  country: string;
}
