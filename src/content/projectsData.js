import barangayTalambanPreview from '../assets/project-previews/barangay-talamban-case-management-system.png'
import farmDeskPreview from '../assets/project-previews/farm-desk.png'
import farmJournalPreview from '../assets/project-previews/farmjournal-web-app.png'
import jettLauDoneDealPreview from '../assets/project-previews/jett-lau-done-deal.png'
import katinginBikesPreview from '../assets/project-previews/katingin-bikes.png'

// Heavy preview images — only imported by the lazy ProjectsSection chunk.
export const projectItems = [
  {
    slug: 'katingin-bikes',
    title: 'Katingin Bikes',
    description:
      'Inventory site and admin panel for a pre-owned motorcycle shop. Dark showroom-style storefront, with tools to manage listings, photos, and sold/available status.',
    role: 'Full Stack Developer',
    organization: 'Unsponsored Client Project',
    liveUrl: 'https://katingin-bikes.vercel.app',
    repoUrl: 'https://github.com/Cyv0712/katingin-bikes',
    tech: ['React 19', 'Vite', 'Express', 'MongoDB Atlas', 'Cloudinary'],
    icon: 'device',
    proof: 'Admin panel, Cloudinary uploads, live stock badges.',
    preview: {
      accent: '#f97316',
      glow: 'rgba(249, 115, 22, 0.35)',
      surface:
        'linear-gradient(140deg, rgba(11, 18, 32, 0.98) 0%, rgba(36, 18, 6, 0.95) 52%, rgba(8, 11, 21, 0.98) 100%)',
      image: katinginBikesPreview,
      domain: 'katingin-bikes.vercel.app',
      badge: 'Live showroom',
      eyebrow: 'Dark showroom inventory',
      headline: 'Pre-owned bikes, listed clearly.',
      copy:
        'Public showroom plus a backend to add bikes, manage photos, and keep stock status accurate.',
      pills: ['Available / Sold Out', 'Admin Dashboard', 'Cloudinary Media'],
      stats: [
        { label: 'Experience', value: 'Showroom-first' },
        { label: 'Inventory', value: 'Live synced' },
        { label: 'Analytics', value: 'Enabled' },
      ],
    },
    impact: [
      'Built an admin dashboard to add, edit, and remove listings.',
      'Wired up Cloudinary for uploads, thumbnails, and cleanup when bikes are deleted.',
      'Synced stock state so Available and Sold Out badges stay correct.',
      'Added basic analytics and brand settings so the stack can be reused for other dealers.',
    ],
  },
  {
    slug: 'jett-lau-done-deal',
    title: 'Jett Lau Done Deal',
    description:
      'Big-bike inventory site for a seller in the Philippines. Strong brand story on the front, easy ways to reach them on WhatsApp, Viber, or Messenger.',
    role: 'Full Stack Developer',
    organization: 'Unsponsored Client Project',
    liveUrl: 'https://jettt-lau-done-deal-ykcq.vercel.app',
    repoUrl: 'https://github.com/Cyv0712/jett-lau-done-deal',
    tech: ['React 19', 'Vite', 'Express', 'MongoDB Atlas', 'Cloudinary'],
    icon: 'dashboard',
    proof: 'Testimonials, chat links, and a layout built to rebrand.',
    preview: {
      accent: '#fb923c',
      glow: 'rgba(251, 146, 60, 0.32)',
      surface:
        'linear-gradient(145deg, rgba(16, 13, 18, 0.98) 0%, rgba(49, 20, 4, 0.94) 48%, rgba(11, 13, 20, 0.98) 100%)',
      image: jettLauDoneDealPreview,
      imagePosition: '22% top',
      domain: 'jettt-lau-done-deal-ykcq.vercel.app',
      badge: 'Brand platform',
      eyebrow: 'Premium big-bike experience',
      headline: 'Inventory with honest notes and quick contact.',
      copy:
        'Built for a seller who cares about trust — clear bike details and one-tap reach on the channels buyers already use.',
      pills: ['Honest Notes', 'Buyer Stories', 'WhatsApp / Viber / Messenger'],
      stats: [
        { label: 'Architecture', value: 'White-label ready' },
        { label: 'Media', value: 'Cloud powered' },
        { label: 'Focus', value: 'Lead conversion' },
      ],
    },
    impact: [
      'Split brand styling from core app logic so the same codebase can be rebranded faster.',
      'Listed bikes with large photos and plain-language condition notes.',
      'Added WhatsApp, Viber, and Messenger links for inquiries.',
      'Built an About page and testimonial section around how the seller actually works.',
    ],
  },
  {
    slug: 'barangay-talamban-case-management-system',
    title: 'Barangay Talamban Case Management System',
    description:
      'Thesis project: a case management app for barangay staff — reports, resident profiles, generated documents, and case history in one place.',
    role: 'Full Stack Developer',
    organization: 'Thesis Project',
    liveUrl: 'https://barangaytalambancms.cloud',
    tech: ['MongoDB', 'Express', 'Vue.js', 'Node.js', 'PostgreSQL'],
    icon: 'dashboard',
    proof: 'Role-based access, auto-generated docs, case history in PostgreSQL.',
    preview: {
      accent: '#0ac8b9',
      glow: 'rgba(10, 200, 185, 0.28)',
      surface:
        'linear-gradient(145deg, rgba(6, 21, 32, 0.98) 0%, rgba(8, 42, 57, 0.94) 54%, rgba(7, 18, 29, 0.98) 100%)',
      image: barangayTalambanPreview,
      domain: 'barangaytalambancms.cloud',
      badge: 'Operations system',
      eyebrow: 'Civic case workflow',
      headline: 'Reports, records, and case history in one app.',
      copy:
        'Less paperwork for secretaries — structured data, access by role, and documents generated from what is already in the system.',
      pills: ['Role-based access', 'PostgreSQL integrity', 'Generated documents'],
      stats: [
        { label: 'Users', value: 'Admin layers' },
        { label: 'Data', value: 'Relational tracking' },
        { label: 'Outcome', value: 'Less manual work' },
      ],
    },
    impact: [
      'Set up role-based access so admins only see what they should.',
      'Used PostgreSQL for resident profiles and linked case history.',
      'Generated reports and documents from existing records instead of retyping everything.',
    ],
  },
  {
    slug: 'farm-desk',
    title: 'Farm-Desk',
    description:
      'Internal desk tool at Farmtri for tickets and org workflows. Shares a Supabase database with their other apps, with strict row-level security.',
    role: 'Software Engineer Intern',
    organization: 'Farmtri AI',
    liveUrl: 'https://desk.farmtri.ai',
    tech: ['Next.js 16', 'Supabase', 'TypeScript', 'Tailwind CSS', 'Docker'],
    icon: 'dashboard',
    proof: 'Shared Supabase setup, RLS on every table, Next.js App Router.',
    preview: {
      accent: '#22c55e',
      glow: 'rgba(34, 197, 94, 0.3)',
      surface:
        'linear-gradient(145deg, rgba(10, 24, 14, 0.98) 0%, rgba(15, 45, 25, 0.94) 50%, rgba(10, 20, 14, 0.98) 100%)',
      image: farmDeskPreview,
      imagePosition: 'left top',
      domain: 'desk.farmtri.ai',
      badge: 'Internal Platform',
      eyebrow: 'Operations Management',
      headline: 'Internal tickets and desk work in one place.',
      copy:
        'Helps the team track work without mixing data between products — RLS keeps each app\'s rows separate.',
      pills: ['Next.js 16 App Router', 'Shared Auth', 'Migration-driven DB'],
      stats: [
        { label: 'Security', value: 'Mandatory RLS' },
        { label: 'Scale', value: 'Shared Schema' },
        { label: 'Stack', value: 'Next.js 16' },
      ],
    },
    impact: [
      'Shared a Supabase project with FarmJournal, using table prefixes to keep data separated.',
      'Turned on RLS for every operational table.',
      'Built desk features on Next.js 16 App Router with server-rendered pages where it helped.',
      'Ran migrations across local, staging, and production without breaking sync.',
    ],
  },
  {
    slug: 'farmjournal-web-app',
    title: 'FarmJournal Web App',
    description:
      'Farm management app from my Farmtri internship — same stack as Farm-Desk (Next.js, Supabase, TypeScript). Signup, forms, and day-to-day screens on the product farmers actually use.',
    role: 'Software Engineer Intern',
    organization: 'Farmtri AI',
    liveUrl: 'https://journal.farmtri.ai/signup/',
    tech: ['Next.js 16', 'Supabase', 'TypeScript', 'Tailwind CSS', 'Docker'],
    icon: 'device',
    proof: 'Next.js + Supabase, shared DB with Farm-Desk, RLS on operational data.',
    preview: {
      accent: '#84cc16',
      glow: 'rgba(132, 204, 22, 0.28)',
      surface:
        'linear-gradient(145deg, rgba(10, 24, 14, 0.98) 0%, rgba(20, 43, 16, 0.94) 55%, rgba(12, 24, 14, 0.98) 100%)',
      image: farmJournalPreview,
      domain: 'journal.farmtri.ai',
      badge: 'Product workflow',
      eyebrow: 'Farm management platform',
      headline: 'Day-to-day farm tools, not demo screens.',
      copy:
        'Customer-facing side of the Farmtri suite — same Supabase backend as Farm-Desk, kept separate with prefixes and RLS.',
      pills: ['Next.js 16 App Router', 'Shared Supabase', 'Signup & forms'],
      stats: [
        { label: 'Context', value: 'Internship build' },
        { label: 'Stack', value: 'Next.js 16' },
        { label: 'Data', value: 'Shared w/ Desk' },
      ],
    },
    impact: [
      'Helped build and fix user-facing flows on the farm management product.',
      'Worked in Next.js 16 and Supabase — same setup as Farm-Desk, with table prefixes and RLS between apps.',
      'Shipped onboarding, forms, and screens wired to live Supabase data.',
      'Learned how shipping works when someone else reviews your PR and prod has real users.',
    ],
  },
]
