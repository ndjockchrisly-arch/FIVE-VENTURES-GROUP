import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl && supabaseUrl !== '' && supabaseAnonKey && supabaseAnonKey !== ''
);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export const SUPABASE_SQL_SCHEMA = `-- Five Ventures Group - Schéma PostgreSQL / Supabase
-- Exécuter ce script dans le SQL Editor de votre projet Supabase

-- 1. Table des projets BTP
CREATE TABLE IF NOT EXISTS public.btp_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title_fr TEXT NOT NULL,
  title_en TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('residential', 'commercial', 'civil_work', 'renovation')),
  location TEXT NOT NULL,
  year TEXT NOT NULL,
  type_work_fr TEXT NOT NULL,
  type_work_en TEXT NOT NULL,
  client TEXT NOT NULL,
  duration TEXT NOT NULL,
  image_url TEXT NOT NULL,
  gallery TEXT[] DEFAULT '{}',
  description_fr TEXT NOT NULL,
  description_en TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'completed' CHECK (status IN ('completed', 'ongoing')),
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Table du catalogue produits (Commerce général & Import-Export)
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name_fr TEXT NOT NULL,
  name_en TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('materials', 'industrial', 'agricultural', 'food_beverage', 'equipment')),
  reference TEXT NOT NULL UNIQUE,
  origin TEXT NOT NULL,
  min_order TEXT NOT NULL,
  description_fr TEXT NOT NULL,
  description_en TEXT NOT NULL,
  specs TEXT[] DEFAULT '{}',
  image_url TEXT NOT NULL,
  in_stock BOOLEAN DEFAULT true,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Table des demandes de devis
CREATE TABLE IF NOT EXISTS public.quotes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  activity TEXT NOT NULL CHECK (activity IN ('btp', 'commerce', 'import_export', 'services', 'multi')),
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'treated')),
  budget TEXT,
  project_date TEXT,
  notes_admin TEXT,
  sent_via_whatsapp BOOLEAN DEFAULT false
);

-- 4. Activer le Row Level Security (RLS)
ALTER TABLE public.btp_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quotes ENABLE ROW LEVEL SECURITY;

-- 5. Politiques de sécurité (RLS Policies)
-- Projets BTP : Lecture publique, modification réservée aux admins connectés
CREATE POLICY "Public read btp_projects" ON public.btp_projects
  FOR SELECT USING (true);

CREATE POLICY "Admin write btp_projects" ON public.btp_projects
  FOR ALL USING (auth.role() = 'authenticated');

-- Produits : Lecture publique, modification réservée aux admins
CREATE POLICY "Public read products" ON public.products
  FOR SELECT USING (true);

CREATE POLICY "Admin write products" ON public.products
  FOR ALL USING (auth.role() = 'authenticated');

-- Devis : Tout visiteur peut insérer une demande de devis
CREATE POLICY "Public insert quotes" ON public.quotes
  FOR INSERT WITH CHECK (true);

-- Devis : Seuls les administrateurs connectés peuvent lire et modifier les devis
CREATE POLICY "Admin read and update quotes" ON public.quotes
  FOR ALL USING (auth.role() = 'authenticated');

-- 6. Configuration du Storage pour les images de chantiers et produits
INSERT INTO storage.buckets (id, name, public) 
VALUES ('fiveventures_media', 'fiveventures_media', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Media public view" ON storage.objects
  FOR SELECT USING (bucket_id = 'fiveventures_media');

CREATE POLICY "Media admin upload" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'fiveventures_media' AND auth.role() = 'authenticated');
`;
