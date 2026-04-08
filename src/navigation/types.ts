export type RootStackParamList = {
  // Public
  Landing: undefined;
  Login: undefined;
  TradesNetwork: undefined;
  PostJob: { service?: string };
  Services: undefined;
  ServiceDetail: { serviceSlug: string };
  Trades: undefined;
  TradeDetail: { serviceSlug: string; tradeSlug: string };
  // Homeowner (protected)
  HomeownerProfile: undefined;
  HomeownerMyJobs: undefined;
  HomeownerJobDetail: { jobId: string };
  // Tradesperson (protected)
  TradespersonMyLeads: undefined;
  TradespersonLeadDetail: { leadId: string };
  // Public tradesperson profile
  TradespersonPublicProfile: { username: string };
};
