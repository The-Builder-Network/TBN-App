import React from 'react';
import StaticScreen from '../components/shared/StaticScreen';

export default function QualityChecksScreen() {
  return (
    <StaticScreen
      title="Quality Checks"
      sections={[
        {
          heading: 'Our vetting process',
          body: 'At The Builder Network we take quality and safety seriously. Every tradesperson on our platform goes through a rigorous vetting process before they are approved to connect with homeowners.',
        },
        {
          heading: '1. Identity verification',
          body: 'We verify the identity of every tradesperson using government-issued ID. This ensures that the person you are hiring is who they say they are.',
        },
        {
          heading: '2. Insurance check',
          body: 'We check that every tradesperson holds valid public liability insurance before they can receive leads. This protects you in the event of accidental damage during the job.',
        },
        {
          heading: '3. Background check',
          body: 'We run criminal background checks on all tradespeople to ensure the safety of homeowners. Only those who pass are approved.',
        },
        {
          heading: '4. Qualification review',
          body: 'For trades that require specific certifications (such as Gas Safe for gas engineers or NICEIC for electricians), we verify that the relevant credentials are current and valid.',
        },
        {
          heading: '5. Ongoing monitoring',
          body: 'We monitor reviews and complaints continuously. Tradespeople who receive consistently poor reviews or complaints may be removed from the platform.',
        },
        {
          heading: 'Our quality guarantee',
          body: 'If you have a problem with work completed by a tradesperson found through The Builder Network, our team will work with you to resolve the issue and ensure you are satisfied.',
        },
      ]}
    />
  );
}
