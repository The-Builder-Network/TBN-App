import React from 'react';
import StaticScreen from '../components/shared/StaticScreen';

export default function AboutScreen() {
  return (
    <StaticScreen
      title="About Us"
      sections={[
        {
          heading: 'The Builder Network',
          body: 'The Builder Network is the UK\'s trusted marketplace connecting homeowners with verified local tradespeople. Founded with the mission to make finding quality tradespeople simple, transparent and safe, we have helped thousands of homeowners across the country get their projects completed.',
        },
        {
          heading: 'Our mission',
          body: 'We believe everyone deserves access to honest, affordable home improvement services. Our platform cuts through the noise and connects you directly with vetted professionals who care about quality.',
        },
        {
          heading: 'How we help homeowners',
          body: 'Post a job for free and receive up to 3 tailored quotes from local tradespeople. Read genuine reviews, compare prices, and choose with confidence. No cold calls, no middlemen.',
        },
        {
          heading: 'How we help tradespeople',
          body: 'We connect skilled tradespeople with homeowners in their area who are ready to hire. Our platform is designed to help great professionals grow their business with quality leads and a professional profile.',
        },
        {
          heading: 'Our standards',
          body: 'Every tradesperson on The Builder Network is vetted. We verify their identity, check their insurance, and run background checks. Only those who meet our standards are approved to connect with homeowners.',
        },
        {
          heading: 'Contact us',
          body: 'Have a question or need help? Reach out to our support team at support@thebuildernetwork.co.uk or through the in-app help centre.',
        },
      ]}
    />
  );
}
