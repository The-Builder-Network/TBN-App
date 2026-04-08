import type { QuestionTree } from '../types/post-job';

/**
 * Static map of service slug → question tree JSON.
 * React Native cannot use import.meta.glob, so we enumerate explicit requires.
 */
const treeBySlug: Record<string, QuestionTree> = {
  'architectural-services': require('../data/post-job/architectural-services.json'),
  'bathroom-fitting': require('../data/post-job/bathroom-fitting.json'),
  'bricklaying-repointing': require('../data/post-job/bricklaying-repointing.json'),
  'carpentry-joinery': require('../data/post-job/carpentry-joinery.json'),
  'carpets-lino-flooring': require('../data/post-job/carpets-lino-flooring.json'),
  'central-heating': require('../data/post-job/central-heating.json'),
  'chimney-fireplace': require('../data/post-job/chimney-fireplace.json'),
  'cleaning-services': require('../data/post-job/cleaning-services.json'),
  conservatories: require('../data/post-job/conservatories.json'),
  conversions: require('../data/post-job/conversions.json'),
  'damp-proofing': require('../data/post-job/damp-proofing.json'),
  'demolition-clearance': require('../data/post-job/demolition-clearance.json'),
  'driveways-paving': require('../data/post-job/driveways-paving.json'),
  electrical: require('../data/post-job/electrical.json'),
  extensions: require('../data/post-job/extensions.json'),
  'fascias-soffits-guttering': require('../data/post-job/fascias-soffits-guttering.json'),
  fencing: require('../data/post-job/fencing.json'),
  'gardening-landscaping': require('../data/post-job/gardening-landscaping.json'),
  'gas-works': require('../data/post-job/gas-works.json'),
  'groundwork-foundations': require('../data/post-job/groundwork-foundations.json'),
  handyman: require('../data/post-job/handyman.json'),
  insulation: require('../data/post-job/insulation.json'),
  'kitchen-fitting': require('../data/post-job/kitchen-fitting.json'),
  locksmith: require('../data/post-job/locksmith.json'),
  'loft-conversion': require('../data/post-job/loft-conversion.json'),
  'moving-services': require('../data/post-job/moving-services.json'),
  'new-build': require('../data/post-job/new-build.json'),
  'painting-decorating': require('../data/post-job/painting-decorating.json'),
  'plastering-rendering': require('../data/post-job/plastering-rendering.json'),
  plumbing: require('../data/post-job/plumbing.json'),
  'restoration-refurbishment': require('../data/post-job/restoration-refurbishment.json'),
  roofing: require('../data/post-job/roofing.json'),
  'security-systems': require('../data/post-job/security-systems.json'),
  stonemasonry: require('../data/post-job/stonemasonry.json'),
  tiling: require('../data/post-job/tiling.json'),
  'tree-surgery': require('../data/post-job/tree-surgery.json'),
  'windows-door-fitting': require('../data/post-job/windows-door-fitting.json'),
};

export function loadQuestionTree(slug: string): QuestionTree | undefined {
  return treeBySlug[slug];
}

export const availableSlugs = Object.keys(treeBySlug);
