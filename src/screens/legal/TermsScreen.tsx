import React from 'react';
import StaticScreen from '../../components/shared/StaticScreen';

export default function TermsScreen() {
  return (
    <StaticScreen
      title="Terms of Service"
      sections={[
        { heading: 'Last updated: January 2025', body: 'Please read these Terms of Service carefully before using The Builder Network.' },
        { heading: '1. Acceptance of terms', body: 'By accessing or using The Builder Network platform, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you may not access the platform.' },
        { heading: '2. Use of the platform', body: 'The Builder Network is a marketplace connecting homeowners with tradespeople. We do not employ tradespeople directly and are not responsible for the quality of work performed. Any contract for services is between the homeowner and the tradesperson directly.' },
        { heading: '3. User accounts', body: 'You are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer or device. You agree to accept responsibility for all activities that occur under your account.' },
        { heading: '4. Prohibited conduct', body: 'You may not use the platform for any unlawful purpose. You may not post false or misleading information. You may not impersonate any person or entity. You may not interfere with the proper working of the platform.' },
        { heading: '5. Reviews and content', body: 'By posting reviews or other content on the platform, you grant The Builder Network a non-exclusive, perpetual licence to use, modify and distribute that content. You are responsible for ensuring your content is accurate and does not infringe any third-party rights.' },
        { heading: '6. Limitation of liability', body: 'The Builder Network is not liable for any direct, indirect, incidental or consequential damages arising from your use of the platform or services obtained through the platform.' },
        { heading: '7. Changes to terms', body: 'We reserve the right to update these terms at any time. Continued use of the platform after changes constitutes your acceptance of the new terms.' },
        { heading: '8. Contact', body: 'If you have any questions about these Terms, contact us at legal@thebuildernetwork.co.uk.' },
      ]}
    />
  );
}
