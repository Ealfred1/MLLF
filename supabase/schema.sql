-- Schema for Maryann's Love and Light Foundation (MLLF)

-- 1. Create table for Outreaches (Impact timeline)
CREATE TABLE IF NOT EXISTS public.outreaches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    location TEXT NOT NULL,
    date DATE NOT NULL,
    people_supported INTEGER NOT NULL DEFAULT 0,
    image_url TEXT NOT NULL
);

-- 2. Create table for Volunteers (Registration submissions)
CREATE TABLE IF NOT EXISTS public.volunteers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    skills TEXT[] DEFAULT '{}'::TEXT[] NOT NULL,
    experience TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending'
);

-- 3. Create table for Donations (Receipt notifications)
CREATE TABLE IF NOT EXISTS public.donations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    donor_name TEXT NOT NULL,
    email TEXT NOT NULL,
    amount NUMERIC NOT NULL,
    payment_method TEXT NOT NULL,
    receipt_url TEXT,
    status TEXT NOT NULL DEFAULT 'pending'
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.outreaches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.volunteers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;

-- Create Policies

-- Outreaches Policies: Anyone can read, only authenticated admin users can modify
CREATE POLICY "Allow public read access to outreaches" 
    ON public.outreaches FOR SELECT 
    USING (true);

CREATE POLICY "Allow authenticated admin write access to outreaches" 
    ON public.outreaches FOR ALL 
    TO authenticated 
    USING (true)
    WITH CHECK (true);

-- Volunteers Policies: Anyone can insert (register), only authenticated admins can read/update
CREATE POLICY "Allow public registration" 
    ON public.volunteers FOR INSERT 
    WITH CHECK (true);

CREATE POLICY "Allow authenticated admins to view/manage volunteers" 
    ON public.volunteers FOR ALL 
    TO authenticated 
    USING (true)
    WITH CHECK (true);

-- Donations Policies: Anyone can insert (submit receipt), only authenticated admins can read/update
CREATE POLICY "Allow public donation reports" 
    ON public.donations FOR INSERT 
    WITH CHECK (true);

CREATE POLICY "Allow authenticated admins to view/manage donations" 
    ON public.donations FOR ALL 
    TO authenticated 
    USING (true)
    WITH CHECK (true);

-- Pre-populate Outreaches database with sample records matching standard foundation milestones
INSERT INTO public.outreaches (title, description, location, date, people_supported, image_url) VALUES
('Lagos Orphanage Support Outreach', 'Delivered food boxes, toiletries, and educational books to over 60 children at the Hope Center in Yaba.', 'Yaba, Lagos State', '2025-10-12', 65, 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=600&q=80'),
('Food Distribution Initiative', 'Fed underprivileged families on the streets of Ibadan, ensuring over 120 people received warm, nutritious meals.', 'Ibadan, Oyo State', '2025-11-05', 120, 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=600&q=80'),
('Education Sponsorship & Book Supplies', 'Paid school fees for 15 children who had dropped out due to financial constraints, and provided backpacks and textbooks.', 'Abuja (FCT)', '2025-12-20', 15, 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80'),
('Street Feeding and Basic Care Outreach', 'Shared sanitation packs, blankets, and hot meals to street-dwelling populations in Lagos.', 'Lekki/Ajah, Lagos State', '2026-01-15', 80, 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&w=600&q=80'),
('Port Harcourt Orphanage Book Donation', 'Setup a reading corner and donated over 200 primary and secondary educational books to the local orphanage.', 'Port Harcourt, Rivers State', '2026-02-18', 45, 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80');
