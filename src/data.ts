export type PlanId = 'bronze' | 'silver' | 'gold';

export interface Plan {
  id: PlanId;
  name: string;
  tagline: string;
  price: number;
  accent: string;
  accentDeep: string;
  featured?: boolean;
  features: string[];
}

export const COMPANY = {
  name: 'Copperline Preventative Plumbing',
  phone: '021 447 8120',
  email: 'service@copperlineplumbing.co.za',
  address: 'Unit 7, Ferrule Park, 214 Voortrekker Rd, Salt River, Cape Town 7925',
  years: 21,
  founded: 2004,
};

export const PLANS: Plan[] = [
  {
    id: 'bronze',
    name: 'Bronze',
    tagline: 'Basic monthly maintenance',
    price: 349,
    accent: '#D9A86C',
    accentDeep: '#8A5A26',
    features: [
      'Monthly inspection of all accessible pipework',
      'Toilet cistern, seal and flush-valve check',
      'Tap, mixer and small-leak tightening',
      'Blocked drain flush and trap clean',
      'Digital service report after every visit',
      'Email and phone support, 48-hour response',
    ],
  },
  {
    id: 'silver',
    name: 'Silver',
    tagline: 'Standard maintenance + priority scheduling',
    price: 599,
    accent: '#C6CED8',
    accentDeep: '#5E6875',
    featured: true,
    features: [
      'Everything in Bronze, every month',
      'Priority scheduling — booked within 24 hours',
      'Acoustic leak detection on the full supply line',
      'Geyser temperature and pressure-valve calibration',
      'Pipe corrosion and joint inspection with photo log',
      'Dedicated plumber assigned to your property',
      '10% discount on all parts and repairs',
    ],
  },
  {
    id: 'gold',
    name: 'Gold',
    tagline: 'Full service with geyser care and emergency cover',
    price: 949,
    accent: '#E8C766',
    accentDeep: '#9A7112',
    features: [
      'Everything in Silver, every month',
      '24-month geyser service cycle, tracked and managed',
      'Geyser rust prevention and anode replacement',
      'Emergency call-out cover — 4-hour response, 24/7',
      'Annual thermal imaging of hidden pipework',
      'Water-pressure regulator and geyser drip-tray service',
      'Free replacement of all standard washers and seals',
      '15% discount on parts and installations',
    ],
  },
];

export interface ServiceRecord {
  date: string;
  job: string;
  plumber: string;
  status: 'Completed' | 'Pending';
}

export interface PlumberNote {
  date: string;
  plumber: string;
  text: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  plan: PlanId;
  plumber: string;
  joined: string;
  lastService: string;
  nextService: string;
  geyserService: string;
  status: 'ready' | 'upcoming' | 'overdue';
  history: ServiceRecord[];
  notes: PlumberNote[];
  rating: number | null;
  review: string;
}

export const CLIENTS: Client[] = [
  {
    id: 'C-1042',
    name: 'Thandi Mokoena',
    email: 'thandi.mokoena@example.co.za',
    phone: '082 551 0194',
    address: '18 Roodebloem Rd, Woodstock, Cape Town 7925',
    plan: 'gold',
    plumber: 'Sipho Ndlovu',
    joined: '2023-02-14',
    lastService: '2025-05-08',
    nextService: '2025-06-08',
    geyserService: '2026-11-08',
    status: 'ready',
    history: [
      { date: '2025-05-08', job: 'Monthly maintenance — geyser anode inspected, pressure valve recalibrated', plumber: 'Sipho Ndlovu', status: 'Completed' },
      { date: '2025-04-09', job: 'Leak detection on main supply line — joint resealed at kitchen wall', plumber: 'Sipho Ndlovu', status: 'Completed' },
      { date: '2025-03-11', job: 'Toilet cistern rebuild and drip-tray flush', plumber: 'Sipho Ndlovu', status: 'Completed' },
    ],
    notes: [
      { date: '2025-05-08', plumber: 'Sipho Ndlovu', text: 'Geyser anode at 60% wear. Will need replacement at the next cycle visit — flagged for parts order.' },
      { date: '2025-04-09', plumber: 'Sipho Ndlovu', text: 'Wall behind the kitchen sink shows old damp staining. Monitoring; no active leak found.' },
    ],
    rating: 5,
    review: 'Sipho is always on time and explains everything before he starts. The leak detection saved us a fortune.',
  },
  {
    id: 'C-1088',
    name: 'Riaan van der Merwe',
    email: 'riaan.vdm@example.co.za',
    phone: '083 220 7741',
    address: '42 Protea Ave, Durbanville, Cape Town 7550',
    plan: 'silver',
    plumber: 'Lerato Dube',
    joined: '2024-06-02',
    lastService: '2025-05-02',
    nextService: '2025-06-02',
    geyserService: '2026-06-02',
    status: 'ready',
    history: [
      { date: '2025-05-02', job: 'Monthly maintenance — corrosion inspection, joints photographed', plumber: 'Lerato Dube', status: 'Completed' },
      { date: '2025-04-03', job: 'Acoustic leak detection on full supply line — clear', plumber: 'Lerato Dube', status: 'Completed' },
    ],
    notes: [
      { date: '2025-05-02', plumber: 'Lerato Dube', text: 'Copper pipe under the scullery is showing early verdigris. Recommend a sleeve at the next visit.' },
    ],
    rating: 4,
    review: 'Thorough work and a clean report. Would like a slightly earlier arrival window.',
  },
  {
    id: 'C-1103',
    name: 'Aisha Patel',
    email: 'aisha.patel@example.co.za',
    phone: '076 884 3312',
    address: '9 Loop St, Cape Town CBD, 8001',
    plan: 'bronze',
    plumber: 'Sipho Ndlovu',
    joined: '2025-01-20',
    lastService: '2025-04-18',
    nextService: '2025-05-18',
    geyserService: '2027-01-20',
    status: 'overdue',
    history: [
      { date: '2025-04-18', job: 'Monthly maintenance — cistern and tap check', plumber: 'Sipho Ndlovu', status: 'Completed' },
      { date: '2025-03-18', job: 'Blocked drain flush and trap clean', plumber: 'Sipho Ndlovu', status: 'Completed' },
    ],
    notes: [
      { date: '2025-04-18', plumber: 'Sipho Ndlovu', text: 'Bathroom basin trap is slow again — building has old cast-iron waste. Suggested a chemical-free rodding.' },
    ],
    rating: null,
    review: '',
  },
  {
    id: 'C-1121',
    name: 'Johan Botha',
    email: 'johan.botha@example.co.za',
    phone: '072 118 6620',
    address: '77 Main Rd, Plumstead, Cape Town 7800',
    plan: 'gold',
    plumber: 'Lerato Dube',
    joined: '2022-09-11',
    lastService: '2025-05-14',
    nextService: '2025-06-14',
    geyserService: '2026-09-11',
    status: 'ready',
    history: [
      { date: '2025-05-14', job: 'Monthly maintenance — geyser rust prevention treatment applied', plumber: 'Lerato Dube', status: 'Completed' },
      { date: '2025-04-14', job: 'Emergency call-out — burst joint on outdoor line, repaired same day', plumber: 'Lerato Dube', status: 'Completed' },
      { date: '2025-03-15', job: 'Thermal imaging of hidden pipework — no anomalies', plumber: 'Lerato Dube', status: 'Completed' },
    ],
    notes: [
      { date: '2025-05-14', plumber: 'Lerato Dube', text: 'Rust-prevention coat applied to the geyser shell. Drip tray clear. Next anode check due in 6 months.' },
      { date: '2025-04-14', plumber: 'Lerato Dube', text: 'Emergency repair completed within the 4-hour Gold window. Fitted a brass compression joint.' },
    ],
    rating: 5,
    review: 'The emergency cover paid for itself in one call-out. Outstanding service.',
  },
  {
    id: 'C-1156',
    name: 'Nomvula Sithole',
    email: 'nomvula.sithole@example.co.za',
    phone: '081 447 2209',
    address: '3 Kirstenhof Cl, Kirstenhof, Cape Town 7945',
    plan: 'silver',
    plumber: 'Sipho Ndlovu',
    joined: '2024-11-05',
    lastService: '2025-04-28',
    nextService: '2025-05-28',
    geyserService: '2026-11-05',
    status: 'upcoming',
    history: [
      { date: '2025-04-28', job: 'Monthly maintenance — pressure-valve calibration', plumber: 'Sipho Ndlovu', status: 'Completed' },
      { date: '2025-03-28', job: 'Small leak repair on garden tap line', plumber: 'Sipho Ndlovu', status: 'Completed' },
    ],
    notes: [
      { date: '2025-04-28', plumber: 'Sipho Ndlovu', text: 'Geyser pressure holding steady at 400 kPa. No action needed this cycle.' },
    ],
    rating: 4,
    review: 'Reliable and tidy. The photo log in the report is a nice touch.',
  },
  {
    id: 'C-1177',
    name: 'Deon Kruger',
    email: 'deon.kruger@example.co.za',
    phone: '079 663 1180',
    address: '121 Sarel Cilliers St, Bellville, Cape Town 7530',
    plan: 'bronze',
    plumber: 'Lerato Dube',
    joined: '2025-03-30',
    lastService: '2025-04-30',
    nextService: '2025-05-30',
    geyserService: '2027-03-30',
    status: 'upcoming',
    history: [
      { date: '2025-04-30', job: 'First monthly maintenance — full accessible pipework inspection', plumber: 'Lerato Dube', status: 'Completed' },
    ],
    notes: [
      { date: '2025-04-30', plumber: 'Lerato Dube', text: 'New client. Property in good order. Toilet in the guest bathroom runs slightly long — noted for next visit.' },
    ],
    rating: null,
    review: '',
  },
];

export const PLUMBER_PINS: Record<string, string> = {
  'Sipho Ndlovu': '4821',
  'Lerato Dube': '7390',
};

export const CLIENT_PIN = '2048';
export const ADMIN_EMAIL = 'Admin@Dappit';
export const ADMIN_PIN = '123qwe';

// Shared test credentials — all three portals sign in with email + password.
export const TEST_EMAIL = 'Admin@Dappit';
export const TEST_PASSWORD = '123qwe';

export const WELCOME_EMAIL_SUBJECT = 'Welcome to Copperline Preventative Plumbing Services';

export function welcomeEmailBody(name: string, nextService: string): string {
  return `Welcome to ${COMPANY.name} Preventative Plumbing Services. Your subscription is now active. Your next service is scheduled for ${nextService}. We look forward to keeping your home running smoothly.

Warm regards,
The Copperline Service Team
${COMPANY.phone} · ${COMPANY.email}`;
}

export function planById(id: PlanId): Plan {
  return PLANS.find((p) => p.id === id) ?? PLANS[0];
}

export function formatDate(iso: string): string {
  const d = new Date(iso + 'T00:00:00');
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-ZA', { day: 'numeric', month: 'short', year: 'numeric' });
}

export function daysUntil(iso: string): number {
  const target = new Date(iso + 'T00:00:00').getTime();
  const today = new Date('2025-05-20T00:00:00').getTime();
  return Math.round((target - today) / 86400000);
}

export function statusLabel(status: Client['status']): string {
  if (status === 'ready') return 'Ready to service';
  if (status === 'upcoming') return 'Upcoming';
  return 'Overdue';
}

export function statusColor(status: Client['status']): string {
  if (status === 'ready') return '#2F8F5B';
  if (status === 'upcoming') return '#D08A1E';
  return '#C0453A';
}
