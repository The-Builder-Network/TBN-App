import React from 'react';
import StaticScreen from '../../components/shared/StaticScreen';

export default function PrivacyScreen() {
  return (
    <StaticScreen
      title="Privacy Policy"
      sections={[
        { heading: 'Last updated: January 2025', body: 'Your privacy is important to us. This policy explains how The Builder Network collects, uses and protects your personal data.' },
        { heading: '1. Information we collect', body: 'We collect information you provide when creating an account (name, email, phone, postcode), information about how you use the platform, and technical data such as IP address and device type.' },
        { heading: '2. How we use your data', body: 'We use your data to provide and improve our services, match you with relevant tradespeople or homeowners, send service-related communications, and comply with legal obligations.' },
        { heading: '3. Data sharing', body: 'We do not sell your personal data. We share your data with tradespeople only when you express interest in a job or post one. We may share anonymised aggregate data with third parties for analytics purposes.' },
        { heading: '4. Data security', body: 'We use industry-standard encryption and security practices to protect your personal data. However, no method of transmission over the internet is 100% secure.' },
        { heading: '5. Cookies', body: 'We use cookies to improve your experience on our platform. You can control cookies through your browser settings, though some features may not function correctly if cookies are disabled.' },
        { heading: '6. Your rights', body: 'You have the right to access, correct or delete your personal data at any time. To exercise these rights, contact us at privacy@thebuildernetwork.co.uk.' },
        { heading: '7. Data retention', body: 'We retain your data for as long as your account is active or as required by law. You may request deletion of your account and associated data at any time.' },
        { heading: '8. Contact', body: 'For privacy enquiries, contact our Data Protection Officer at privacy@thebuildernetwork.co.uk.' },
      ]}
    />
  );
}
