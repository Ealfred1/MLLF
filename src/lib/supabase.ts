import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const isRealSupabase = Boolean(supabaseUrl && supabaseAnonKey);

// Define TS types matching our DB schemas
export interface Outreach {
  id: string;
  created_at: string;
  title: string;
  description: string;
  location: string;
  date: string;
  people_supported: number;
  image_url: string;
}

export interface Volunteer {
  id: string;
  created_at: string;
  full_name: string;
  email: string;
  phone: string;
  skills: string[];
  experience: string;
  status: string;
}

export interface Donation {
  id: string;
  created_at: string;
  donor_name?: string;
  email?: string;
  amount: number;
  payment_method: 'bank_transfer' | 'cheque';
  receipt_url?: string;
  status: 'processing' | 'verified';
}

// Initial mock outreaches database
const DEFAULT_OUTREACHES: Outreach[] = [
  {
    id: '1',
    created_at: new Date('2025-10-12').toISOString(),
    title: 'Lagos State Orphanage Outreach',
    description: 'Delivered food boxes, toiletries, and educational books to over 60 children at the Hope Center in Yaba.',
    location: 'Yaba, Lagos State',
    date: '2025-10-12',
    people_supported: 65,
    image_url: '/outreach-1.svg',
  },
  {
    id: '2',
    created_at: new Date('2025-11-05').toISOString(),
    title: 'Food Distribution Initiative',
    description: 'Fed underprivileged families on the streets of Ibadan, ensuring over 120 people received warm, nutritious meals.',
    location: 'Ibadan, Oyo State',
    date: '2025-11-05',
    people_supported: 120,
    image_url: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: '3',
    created_at: new Date('2025-12-20').toISOString(),
    title: 'Education Sponsorship & Book Supplies',
    description: 'Paid school fees for 15 children who had dropped out due to financial constraints, and provided backpacks and textbooks.',
    location: 'Abuja (FCT)',
    date: '2025-12-20',
    people_supported: 15,
    image_url: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: '4',
    created_at: new Date('2026-01-15').toISOString(),
    title: 'Street Feeding and Basic Care Outreach',
    description: 'Shared sanitation packs, blankets, and hot meals to street-dwelling populations in Lagos.',
    location: 'Lekki/Ajah, Lagos State',
    date: '2026-01-15',
    people_supported: 80,
    image_url: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: '5',
    created_at: new Date('2026-02-18').toISOString(),
    title: 'Port Harcourt Orphanage Book Donation',
    description: 'Setup a reading corner and donated over 200 primary and secondary educational books to the local orphanage.',
    location: 'Port Harcourt, Rivers State',
    date: '2026-02-18',
    people_supported: 45,
    image_url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80',
  },
];

// Helper to get local data synced with localStorage if client-side
const getLocalStorage = <T>(key: string, defaultValue: T): T => {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const stored = window.localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch {
    return defaultValue;
  }
};

const setLocalStorage = <T>(key: string, value: T): void => {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error('Error writing to localStorage', err);
  }
};

// Mock Supabase Database Instance
class MockSupabaseClient {
  private getOutreaches(): Outreach[] {
    return getLocalStorage<Outreach[]>('mllf_outreaches', DEFAULT_OUTREACHES);
  }

  private saveOutreaches(data: Outreach[]): void {
    setLocalStorage('mllf_outreaches', data);
  }

  private getVolunteers(): Volunteer[] {
    return getLocalStorage<Volunteer[]>('mllf_volunteers', []);
  }

  private saveVolunteers(data: Volunteer[]): void {
    setLocalStorage('mllf_volunteers', data);
  }

  private getDonations(): Donation[] {
    return getLocalStorage<Donation[]>('mllf_donations', []);
  }

  private saveDonations(data: Donation[]): void {
    setLocalStorage('mllf_donations', data);
  }

  from(table: string) {
    return {
      select: (columns = '*') => {
        let data: any[] = [];
        if (table === 'outreaches') {
          data = this.getOutreaches();
        } else if (table === 'volunteers') {
          data = this.getVolunteers();
        } else if (table === 'donations') {
          data = this.getDonations();
        }

        // Return a builder-like structure matching Supabase response
        return Promise.resolve({
          data,
          error: null,
          // Support chaining methods if needed
          order: (column: string, { ascending = true } = {}) => {
            const sorted = [...data].sort((a, b) => {
              const valA = a[column];
              const valB = b[column];
              if (valA < valB) return ascending ? -1 : 1;
              if (valA > valB) return ascending ? 1 : -1;
              return 0;
            });
            return Promise.resolve({ data: sorted, error: null });
          }
        });
      },

      insert: (values: any) => {
        const rows = Array.isArray(values) ? values : [values];
        const newRows = rows.map(row => ({
          id: Math.random().toString(36).substring(2, 11),
          created_at: new Date().toISOString(),
          status: row.status || 'pending',
          ...row,
        }));

        if (table === 'outreaches') {
          const current = this.getOutreaches();
          this.saveOutreaches([...current, ...newRows]);
        } else if (table === 'volunteers') {
          const current = this.getVolunteers();
          this.saveVolunteers([...current, ...newRows]);
        } else if (table === 'donations') {
          const current = this.getDonations();
          this.saveDonations([...current, ...newRows]);
        }

        return Promise.resolve({
          data: newRows,
          error: null,
        });
      },

      update: (values: any) => ({
        eq: (column: string, value: any) => {
          const apply = (rows: any[]) =>
            rows.map((row) => (row[column] === value ? { ...row, ...values } : row));

          let updated: any[] = [];
          if (table === 'outreaches') {
            updated = apply(this.getOutreaches());
            this.saveOutreaches(updated);
          } else if (table === 'volunteers') {
            updated = apply(this.getVolunteers());
            this.saveVolunteers(updated);
          } else if (table === 'donations') {
            updated = apply(this.getDonations());
            this.saveDonations(updated);
          }

          return Promise.resolve({
            data: updated.filter((row) => row[column] === value),
            error: null,
          });
        },
      }),
    };
  }
}

// Export singleton instance of real or mock client
export const supabase = isRealSupabase
  ? createClient(supabaseUrl, supabaseAnonKey)
  : (new MockSupabaseClient() as any);
export default supabase;

// Campaign totals for the two-stage tracker. Real mode reads the aggregated
// donation_totals view (raw rows stay admin-only); mock mode sums local rows.
export async function fetchDonationTotals(): Promise<{ processing: number; verified: number }> {
  if (isRealSupabase) {
    const { data, error } = await supabase
      .from('donation_totals')
      .select('*')
      .single();
    if (error || !data) return { processing: 0, verified: 0 };
    return {
      processing: Number(data.total_pledged_processing || 0),
      verified: Number(data.total_cleared_verified || 0),
    };
  }

  const { data } = await supabase.from('donations').select('*');
  const rows: Donation[] = data || [];
  const sum = (status: Donation['status']) =>
    rows.filter((d) => d.status === status).reduce((acc, d) => acc + Number(d.amount || 0), 0);
  return { processing: sum('processing'), verified: sum('verified') };
}

// Downscale a receipt screenshot so uploads stay small (and localStorage
// fallback stays under quota in mock mode).
const downscaleImage = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      reject(new Error('Please upload an image (screenshot or photo) of your receipt.'));
      return;
    }
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      const max = 1280;
      const scale = Math.min(1, max / Math.max(img.width, img.height));
      const canvas = document.createElement('canvas');
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);
      canvas.getContext('2d')!.drawImage(img, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL('image/jpeg', 0.82));
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Could not read that image. Please try another file.'));
    };
    img.src = url;
  });

// Store a receipt image and return a URL for it: Supabase Storage when
// configured, otherwise an inline data URL for the localStorage mock.
export async function uploadReceipt(file: File): Promise<string> {
  const dataUrl = await downscaleImage(file);
  if (!isRealSupabase) return dataUrl;

  const path = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}.jpg`;
  const blob = await (await fetch(dataUrl)).blob();
  const { error } = await supabase.storage
    .from('receipts')
    .upload(path, blob, { contentType: 'image/jpeg' });
  if (error) throw new Error(error.message);

  const { data } = supabase.storage.from('receipts').getPublicUrl(path);
  return data.publicUrl;
}
