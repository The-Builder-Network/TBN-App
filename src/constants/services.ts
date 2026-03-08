export interface Service {
  slug: string;
  name: string;
  imageUrl: string;
  description: string;
}

export const services: Service[] = [
  { slug: 'architectural-services', name: 'Architectural Services', imageUrl: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&h=300&fit=crop', description: 'Find architects and architectural designers for your project.' },
  { slug: 'bathroom-fitting', name: 'Bathroom Fitting', imageUrl: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400&h=300&fit=crop', description: 'Transform your bathroom with expert fitters.' },
  { slug: 'bricklaying-repointing', name: 'Bricklaying & Repointing', imageUrl: 'https://images.unsplash.com/photo-1590237294019-ca0dea0e1265?w=400&h=300&fit=crop', description: 'Expert brickwork, walls, and repointing services.' },
  { slug: 'carpentry-joinery', name: 'Carpentry & Joinery', imageUrl: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=400&h=300&fit=crop', description: 'Bespoke carpentry and joinery for your home.' },
  { slug: 'carpets-lino-flooring', name: 'Carpets & Flooring', imageUrl: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=400&h=300&fit=crop', description: 'All types of flooring installation and fitting.' },
  { slug: 'central-heating', name: 'Central Heating', imageUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=300&fit=crop', description: 'Boiler installation, repairs, and heating systems.' },
  { slug: 'chimney-fireplace', name: 'Chimney & Fireplace', imageUrl: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=400&h=300&fit=crop', description: 'Chimney sweeps, stove fitters, and fireplace installation.' },
  { slug: 'cleaning-services', name: 'Cleaning Services', imageUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop', description: 'Professional domestic and commercial cleaning.' },
  { slug: 'conservatories', name: 'Conservatories', imageUrl: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop', description: 'Conservatory design, installation, and renovation.' },
  { slug: 'conversions', name: 'Conversions', imageUrl: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=400&h=300&fit=crop', description: 'Loft, garage, and basement conversions.' },
  { slug: 'damp-proofing', name: 'Damp Proofing', imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop', description: 'Damp proofing, waterproofing, and condensation control.' },
  { slug: 'driveways-paving', name: 'Driveways & Paving', imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop', description: 'Driveway installation, block paving, and patios.' },
  { slug: 'electrical-work', name: 'Electrical Work', imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop', description: 'Qualified electricians for all electrical installations.' },
  { slug: 'fencing-gates', name: 'Fencing & Gates', imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop', description: 'Fence installation, gate fitting, and repairs.' },
  { slug: 'gas-work', name: 'Gas Work', imageUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=300&fit=crop', description: 'Gas Safe registered engineers for all gas work.' },
  { slug: 'guttering-fascias', name: 'Guttering & Fascias', imageUrl: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=400&h=300&fit=crop', description: 'Gutter installation, cleaning, and fascia replacement.' },
  { slug: 'handyman', name: 'Handyman', imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop', description: 'General handyman services for small and large jobs.' },
  { slug: 'kitchen-fitting', name: 'Kitchen Fitting', imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop', description: 'Kitchen installation, fitting, and renovation.' },
  { slug: 'landscaping-gardening', name: 'Landscaping & Gardening', imageUrl: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop', description: 'Garden design, landscaping, and maintenance.' },
  { slug: 'painting-decorating', name: 'Painting & Decorating', imageUrl: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400&h=300&fit=crop', description: 'Interior and exterior painting and decorating.' },
  { slug: 'plastering', name: 'Plastering', imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop', description: 'Plastering, rendering, and dry lining specialists.' },
  { slug: 'plumbing', name: 'Plumbing', imageUrl: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=400&h=300&fit=crop', description: 'Plumbers for repairs, installations, and emergencies.' },
  { slug: 'roofing', name: 'Roofing', imageUrl: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=400&h=300&fit=crop', description: 'Roof repairs, replacement, and new installations.' },
  { slug: 'security-systems', name: 'Security Systems', imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop', description: 'CCTV, alarms, and home security installation.' },
  { slug: 'skip-hire', name: 'Skip Hire', imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop', description: 'Skip hire and waste removal for home projects.' },
  { slug: 'solar-panels', name: 'Solar Panels', imageUrl: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=300&fit=crop', description: 'Solar panel installation and maintenance.' },
  { slug: 'tiling', name: 'Tiling', imageUrl: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop', description: 'Wall and floor tiling for kitchens, bathrooms, and more.' },
  { slug: 'windows-doors', name: 'Windows & Doors', imageUrl: 'https://images.unsplash.com/photo-1560448204-444f50483dfd?w=400&h=300&fit=crop', description: 'Window and door installation, repair, and replacement.' },
];
