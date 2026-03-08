import React from 'react';
import StaticScreen from '../../components/shared/StaticScreen';

export default function QualityRequirementsScreen() {
  return (
    <StaticScreen
      title="Quality Requirements"
      sections={[
        { heading: 'Standards for tradespeople', body: 'All tradespeople on The Builder Network must meet our quality requirements to join and remain on the platform. These standards protect homeowners and uphold the reputation of our community.' },
        { heading: 'Mandatory requirements', body: '• Valid government-issued photo ID\n• Public liability insurance (minimum £1,000,000 cover)\n• Clear criminal record check\n• Relevant qualifications for regulated trades (e.g. Gas Safe, NICEIC, Part P)\n• Professional profile with accurate business information' },
        { heading: 'Trade-specific requirements', body: 'Gas engineers must be Gas Safe registered. Electricians must hold NICEIC, NAPIT or equivalent accreditation. Structural work must comply with Building Regulations. Asbestos work requires a valid asbestos licence.' },
        { heading: 'Ongoing standards', body: 'Tradespeople must maintain a minimum star rating over time. Consistent low ratings or unresolved complaints may result in suspension or removal from the platform.' },
        { heading: 'Commitment to homeowners', body: 'Any tradesperson found to have provided false information, behaved unprofessionally or failed to deliver agreed work will be investigated and may be permanently removed from The Builder Network.' },
        { heading: 'Reporting a concern', body: 'If you believe a tradesperson does not meet our standards, please report your concern to quality@thebuildernetwork.co.uk with supporting information.' },
      ]}
    />
  );
}
