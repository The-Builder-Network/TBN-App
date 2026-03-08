import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  MainTabs: NavigatorScreenParams<MainTabParamList>;
  // Detail screens pushed from tabs
  TradeDetail: { slug: string; serviceSlug: string };
  ServiceDetail: { slug: string };
  TradespersonPublicProfile: { username: string };
  JobDetail: { jobId: string };
  LeadDetail: { leadId: string };
  // Info screens
  HowItWorks: undefined;
  About: undefined;
  Cities: undefined;
  BecomeAPartner: undefined;
  QualityChecks: undefined;
  Questions: undefined;
  // Legal screens
  Terms: undefined;
  Privacy: undefined;
  ReviewsPolicy: undefined;
  QualityRequirements: undefined;
  // Auth modal
  Login: { redirectTo?: string };
  // Homeowner protected
  HomeownerMyJobs: undefined;
  HomeownerJobDetail: { jobId: string };
  HomeownerMyQuestions: undefined;
  // Tradesperson protected
  TradespersonMyLeads: undefined;
  TradespersonLeadDetail: { leadId: string };
};

export type MainTabParamList = {
  HomeTab: undefined;
  PostJobTab: undefined;
  ServicesTab: undefined;
  DashboardTab: undefined;
  ProfileTab: undefined;
};

export type HomeStackParamList = {
  Home: undefined;
  TradesNetwork: undefined;
  TradesAll: undefined;
  ServicesAll: undefined;
};

export type PostJobStackParamList = {
  PostJob: { serviceSlug?: string };
};

export type ServicesStackParamList = {
  ServicesHome: undefined;
  TradesAll: undefined;
};

export type DashboardStackParamList = {
  DashboardHome: undefined;
};

export type ProfileStackParamList = {
  ProfileHome: undefined;
  Settings: undefined;
};
