import React from 'react';
import StaticScreen from '../../components/shared/StaticScreen';

export default function ReviewsPolicyScreen() {
  return (
    <StaticScreen
      title="Reviews Policy"
      sections={[
        { heading: 'Our commitment to genuine reviews', body: 'Reviews on The Builder Network are a critical part of helping homeowners make informed decisions. We take the integrity of our review system seriously.' },
        { heading: 'How reviews work', body: 'Reviews can only be left by verified homeowners who have completed a job through The Builder Network. This ensures all reviews reflect genuine experiences.' },
        { heading: 'Review guidelines', body: 'Reviews must be honest and based on your genuine experience. They must not contain personal attacks, discriminatory language, or false information. Reviews should be relevant to the quality of work and professionalism of the tradesperson.' },
        { heading: 'Reporting inappropriate reviews', body: 'If you believe a review is false, misleading or violates our guidelines, you can report it to our team. We will investigate all reports and remove reviews that breach our policy.' },
        { heading: 'Tradesperson responses', body: 'Tradespeople have the right to respond to reviews publicly. Responses must be professional and respectful. Abusive or threatening responses will be removed.' },
        { heading: 'Removal of reviews', body: 'We reserve the right to remove reviews that breach our guidelines, contain defamatory content, or were submitted fraudulently. Decisions made by our moderation team are final.' },
        { heading: 'Contact', body: 'For questions about our reviews policy, contact us at reviews@thebuildernetwork.co.uk.' },
      ]}
    />
  );
}
