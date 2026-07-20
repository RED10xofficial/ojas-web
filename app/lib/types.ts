/* ─── Theme Config ─── */
export interface ThemeConfig {
  brandDark?: string;
  brandBlue?: string;
  brandHover?: string;
  brandPressed?: string;
  brandSubtle?: string;
  brandElectric?: string;
  bgPage?: string;
  bgSurface?: string;
  textPrimary?: string;
  textSecondary?: string;
  textAccent?: string;
  iconPrimary?: string;
  iconSecondary?: string;
  iconTertiary?: string;
  iconDisabled?: string;
  buttonPrimary?: string;
  buttonPrimaryHover?: string;
  buttonPrimaryPressed?: string;
  colorSuccess?: string;
  colorError?: string;
  slate50?: string;
  slate100?: string;
  slate200?: string;
  slate300?: string;
  slate400?: string;
  slate500?: string;
  slate550?: string;
  slate600?: string;
  slate700?: string;
  slate800?: string;
  slate900?: string;
  slate950?: string;
  border?: string;
}

/* ─── Section Style ─── */
export interface SectionStyle {
  bgColor?: string;
  bgImage?: StrapiMedia;
  textColor?: string;
}

/* ─── Strapi Media ─── */
export interface StrapiMedia {
  id: number;
  url: string;
  alternativeText?: string | null;
  width?: number;
  height?: number;
  formats?: Record<string, { url: string; width: number; height: number }>;
}

/* ─── Shared ─── */
export interface CtaButton {
  id: number;
  title: string;
  url: string;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "link";
  size?: "sm" | "md" | "lg";
  newTab?: boolean;
}


/* ─── SEO ─── */
export interface SeoData {
  id: number;
  metaTitle?: string;
  metaDescription?: string;
  canonicalURL?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: StrapiMedia;
  structuredData?: Record<string, unknown>;
  robots?: string;
}

/* ─── Custom Code Section ─── */
export interface CustomCodeSection {
  __component: "widgets.custom-code-section";
  id: number;
  wrapperClass?: string;
  html?: string;
  css?: string;
  js?: string;
  sectionStyle?: SectionStyle;
}

/* ─── Hero ─── */
export interface HeroSection {
  __component: "home-page.home-hero-section";
  id: number;
  wrapperClass?: string;
  subtitleIcon?: StrapiMedia;
  subtitleTitle?: string;
  title?: string;
  phrases?: { id: number; title: string }[];
  shortcuts?: { id: number; title: string }[];
}

/* ─── Scroller ─── */
export interface ScrollerSection {
  __component: "home-page.home-scroller-section";
  id: number;
  wrapperClass?: string;
  trustBadges?: { id: number; title: string; icon?: StrapiMedia }[];
  partners?: { id: number; title: string; logo?: StrapiMedia }[];
}

/* ─── Video Upload ─── */
export interface VideoUploadSection {
  __component: "home-page.home-video-upload-section";
  id: number;
  wrapperClass?: string;
  title?: string;
  description?: string;
  video?: StrapiMedia;
  poster?: StrapiMedia;
  primaryCta?: CtaButton;
  secondaryCta?: CtaButton;
}

/* ─── Testimonial ─── */
export interface TestimonialSection {
  __component: "home-page.home-testimonial-section";
  id: number;
  wrapperClass?: string;
  title?: string;
  quote: string;
  doctorName?: string;
  doctorTitle?: string;
  videoLabel?: string;
  video?: StrapiMedia;
  poster?: StrapiMedia;
  videoTitle?: string;
  videoSubtitle?: string;
}

/* ─── Benchmarks ─── */
export interface TableHeader {
  id: number;
  label: string;
  highlighted?: boolean;
}

export interface TableCell {
  id: number;
  value: string;
  highlighted?: boolean;
  bgColor?: string;
  textColor?: string;
}

export interface TableRow {
  id: number;
  cells?: TableCell[];
}

export interface BenchmarksSection {
  __component: "home-page.home-benchmarks-section";
  id: number;
  wrapperClass?: string;
  title?: string;
  description?: string;
  tableHeaders?: TableHeader[];
  tableRows?: TableRow[];
}

/* ─── Doctor Reviews ─── */
export interface ReviewCard {
  id: number;
  rating: number;
  quote: string;
  doctorName: string;
  doctorTitle?: string;
  hospital?: string;
  avatar?: StrapiMedia;
}

export interface DoctorReviewsSection {
  __component: "home-page.home-doctor-reviews-section";
  id: number;
  wrapperClass?: string;
  title: string;
  subtitle?: string;
  reviews?: ReviewCard[];
}

/* ─── Models ─── */
export interface ModelCard {
  id: number;
  title: string;
  science?: string;
  target?: string;
  icon?: StrapiMedia;
  href?: string;
  comingSoon?: boolean;
}

export interface ModelsSection {
  __component: "home-page.home-models-section";
  id: number;
  wrapperClass?: string;
  title: string;
  description?: string;
  models?: ModelCard[];
  cta?: CtaButton;
}

/* ─── Why Ojas ─── */
export interface WhyOjasSection {
  __component: "home-page.home-why-ojas-section";
  id: number;
  wrapperClass?: string;
  title: string;
  subtitle?: string;
  tableHeaders?: TableHeader[];
  tableRows?: TableRow[];
}

/* ─── Ambient Scribing ─── */
export interface DialogueLine {
  id: number;
  speaker: string;
  text: string;
}

export interface AmbientScribingSection {
  __component: "home-page.home-ambient-scribing-section";
  id: number;
  wrapperClass?: string;
  /** Richtext (markdown) */
  title: string;
  description?: string;
  demoDialogue?: DialogueLine[];
  draftingStatus?: string;
}

/* ─── Stats ─── */
export interface StatCard {
  id: number;
  value: number;
  label: string;
  suffix?: string;
}

export interface RoiSliderInput {
  id: number;
  label: string;
  icon?: StrapiMedia;
  unit?: string;
  min: number;
  max: number;
  defaultValue: number;
  step?: number;
  helperText?: string;
}

export interface RoiOutputCard {
  id: number;
  label: string;
  icon?: StrapiMedia;
  unit?: string;
  sublabel?: string;
}

export interface RoiCalculator {
  id: number;
  tabLabel: string;
  badgeText?: string;
  title: string;
  description?: string;
  inputsSectionTitle?: string;
  inputs?: RoiSliderInput[];
  primaryOutputBadge?: string;
  primaryOutputLabel?: string;
  primaryOutputFormula?: string;
  outputCards?: RoiOutputCard[];
  footerLeft?: string;
  footerRight?: string;
  annualRevenue?: string;
}

export interface StatsSection {
  __component: "home-page.home-stats-section";
  id: number;
  wrapperClass?: string;
  title: string;
  description?: string;
  stats?: StatCard[];
  trustBadgeText?: string;
}

/* ─── Home Calculator Widget ─── */
export interface HomeCalculatorWidget {
  __component: "home-page.home-calculator";
  id: number;
  wrapperClass?: string;
  calculators?: RoiCalculator[];
}

/* ─── Access Points ─── */
export interface AccessPointCard {
  id: number;
  title: string;
  science?: string;
  target?: string;
  icon?: StrapiMedia;
}

export interface AccessPointsSection {
  __component: "home-page.home-access-points-section";
  id: number;
  wrapperClass?: string;
  title: string;
  accessPoints?: AccessPointCard[];
}

/* ─── Certified Authority Board ─── */
export interface BoardDoctor {
  id: number;
  doctorId?: string;
  name: string;
  specialty?: string;
  hospital?: string;
  description?: string;
  image?: StrapiMedia;
}

export interface CertifiedAuthorityBoardSection {
  __component: "home-page.home-certified-authority-board-section";
  id: number;
  wrapperClass?: string;
  title: string;
  subtitle?: string;
  doctors?: BoardDoctor[];
}

/* ─── Publications ─── */
export interface PublicationCard {
  id: number;
  tag?: string;
  publicationId?: string;
  title: string;
  subtitle?: string;
  description?: string;
  leadAuthor?: string;
  date?: string;
}

export interface PublicationsSection {
  __component: "home-page.home-publications-section";
  id: number;
  wrapperClass?: string;
  title: string;
  subtitle?: string;
  description?: string;
  publications?: PublicationCard[];
}

/* ─── Blogs ─── */
export interface BlogCard {
  id: number;
  title: string;
  excerpt?: string;
  date?: string;
  image?: StrapiMedia;
}

export interface BlogsSection {
  __component: "home-page.home-blogs-section";
  id: number;
  wrapperClass?: string;
  title: string;
  blogs?: BlogCard[];
}

/* ─── Featured In ─── */
export interface FeaturedInSection {
  __component: "home-page.home-featured-in-section";
  id: number;
  wrapperClass?: string;
  title: string;
  subtitle?: string;
  mediaOutlets?: { id: number; name: string }[];
}

/* ─── Pricing ─── */
export interface PricingPlan {
  id: number;
  name: string;
  tag?: string;
  price: string;
  priceSubtitle?: string;
  features?: { id: number; label: string }[];
  buttonText?: string;
  buttonDisabled?: boolean;
  footer?: string;
  badge?: string;
  dark?: boolean;
}

export interface PricingSection {
  __component: "home-page.home-pricing-section";
  id: number;
  wrapperClass?: string;
  title: string;
  subtitle?: string;
  plans?: PricingPlan[];
}

/* ─── Compliance ─── */
export interface ComplianceSection {
  __component: "home-page.home-compliance-section";
  id: number;
  wrapperClass?: string;
  title: string;
  complianceItems?: { id: number; name: string }[];
}

/* ─── FAQ ─── */
export interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

export interface FaqSection {
  __component: "home-page.home-faq-section";
  id: number;
  wrapperClass?: string;
  title: string;
  description?: string;
  supportTitle?: string;
  supportDescription?: string;
  supportButtonText?: string;
  supportButtonUrl?: string;
  faqs?: FaqItem[];
}

/* ─── Dynamic Zone Union ─── */
export type HomePageSection =
  | HeroSection
  | ScrollerSection
  | VideoUploadSection
  | TestimonialSection
  | BenchmarksSection
  | DoctorReviewsSection
  | ModelsSection
  | WhyOjasSection
  | AmbientScribingSection
  | StatsSection
  | AccessPointsSection
  | CertifiedAuthorityBoardSection
  | PublicationsSection
  | BlogsSection
  | FeaturedInSection
  | PricingSection
  | ComplianceSection
  | FaqSection
  | CustomCodeSection
  | HomeCalculatorWidget;

/* ─── Home Page Response ─── */
export interface HomePageData {
  id: number;
  seo?: SeoData;
  customCss?: string;
  sections: HomePageSection[];
}

/* ═══════════════════════════════════════════════════════════════
   MODELS PAGE TYPES
   ═══════════════════════════════════════════════════════════════ */

/* ─── Derma Hero ─── */
export interface DiagnosticPrompt {
  id: number;
  text: string;
}

export interface DermaHeroSection {
  __component: "models-page.derma-hero-section";
  id: number;
  wrapperClass?: string;
  title: string;
  alternateTitle?: string;
  inputPlaceholder?: string;
  analyzeButtonText?: string;
  trialText?: string;
  backLinkText?: string;
  backLinkUrl?: string;
  prompts?: DiagnosticPrompt[];
  trustBadges?: { id: number; title: string; icon?: StrapiMedia }[];
  partners?: { id: number; title: string; logo?: StrapiMedia }[];
}

/* ─── Derma Video ─── */
export interface DermaVideoSection {
  __component: "models-page.derma-video-section";
  id: number;
  wrapperClass?: string;
  title: string;
  videoTitle?: string;
  videoDescription?: string;
  video?: StrapiMedia;
  poster?: StrapiMedia;
}

/* ─── Derma Clinical Scanner ─── */
export interface ScannerCondition {
  id: number;
  label: string;
  sub?: string;
}

export interface AbcdCriterion {
  id: number;
  crit: string;
  val: string;
  level: string;
}

export interface DiagnosisFinding {
  id: number;
  text: string;
}

export interface DiagnosisData {
  id: number;
  name: string;
  riskLevel: string;
  riskColor?: string;
  confidence: string;
  fitzpatrick?: string;
  diagnosis: string;
  recommendation?: string;
  abcd?: AbcdCriterion[];
  findings?: DiagnosisFinding[];
  beforeImage?: StrapiMedia;
  afterImage?: StrapiMedia;
}

export interface DermaClinicalScannerSection {
  __component: "models-page.derma-clinical-scanner-section";
  id: number;
  wrapperClass?: string;
  preheading?: string;
  title: string;
  description?: string;
  conditions?: ScannerCondition[];
  diagnosisData?: DiagnosisData[];
  leftScanImage?: StrapiMedia;
  rightScanImage?: StrapiMedia;
}

/* ─── Derma Practitioner Insights ─── */
export interface DermaPractitionerInsightsSection {
  __component: "models-page.derma-practitioner-insights-section";
  id: number;
  wrapperClass?: string;
  title: string;
  quote: string;
  doctorName: string;
  doctorTitle?: string;
  videoLabel?: string;
  videoSubtitle?: string;
  video?: StrapiMedia;
  poster?: StrapiMedia;
}

/* ─── Derma Benchmarks ─── */
export interface DermaBenchmarksSection {
  __component: "models-page.derma-benchmarks-section";
  id: number;
  wrapperClass?: string;
  preheading?: string;
  title: string;
  tableTitle?: string;
  tableHeaders?: TableHeader[];
  tableRows?: TableRow[];
}

/* ─── Derma Built For Clinicians ─── */
export interface UseCaseBullet {
  id: number;
  text: string;
}

export interface UseCaseCard {
  id: number;
  image?: StrapiMedia;
  video?: StrapiMedia;
}

export interface DermaBuiltForCliniciansSection {
  __component: "models-page.derma-built-for-clinicians-section";
  id: number;
  wrapperClass?: string;
  preheading?: string;
  title: string;
  description?: string;
  useCases?: UseCaseCard[];
}

/* ─── Derma ROI Calculator ─── */
export interface DermaRoiCalculatorSection {
  __component: "models-page.derma-roi-calculator-section";
  id: number;
  wrapperClass?: string;
  preheading?: string;
  title: string;
  sliderLabel?: string;
  sliderMin?: number;
  sliderMax?: number;
  sliderStep?: number;
  sliderDefault?: number;
  metric1Label?: string;
  metric1Multiplier?: number;
  metric2Label?: string;
  metric2Multiplier?: number;
}

/* ─── Derma Footer Action ─── */
export interface DermaFooterActionSection {
  __component: "models-page.derma-footer-action-section";
  id: number;
  wrapperClass?: string;
  cta?: CtaButton;
}

/* ─── Derma Footer ─── */
export interface FooterLink {
  id: number;
  label: string;
  href: string;
}

export interface FooterColumn {
  id: number;
  heading: string;
  links?: FooterLink[];
}

export interface DermaFooterSection {
  __component: "models-page.derma-footer-section";
  id: number;
  wrapperClass?: string;
  logoText: string;
  logoImage?: StrapiMedia;
  companyDescription?: string;
  columns?: FooterColumn[];
  bottomText?: string;
  bottomLinks?: FooterLink[];
  copyrightText?: string;
}

/* ─── Scribe Hero ─── */
export interface CapabilityPhrase {
  id: number;
  text: string;
}

export interface HeroCapability {
  id: number;
  capabilityId: string;
  title: string;
  phrases?: CapabilityPhrase[];
}

export interface ScribeHeroSection {
  __component: "models-page.scribe-hero-section";
  id: number;
  wrapperClass?: string;
  statusBadge?: string;
  title: string;
  subtitle?: string;
}

/* ─── Scribe Ambient Demo ─── */
export interface DemoStep {
  id: number;
  stepLabel: string;
  title: string;
  description?: string;
}

export interface ScribeAmbientDemoSection {
  __component: "models-page.scribe-ambient-demo-section";
  id: number;
  wrapperClass?: string;
  preheading?: string;
  title: string;
  description?: string;
  statusBadge?: string;
  patientDialogue?: string;
  doctorDialogue?: string;
  soapSubjective?: string;
  soapObjective?: string;
  soapAssessment?: string;
  soapPlan?: string;
  icdCode?: string;
  icdDescription?: string;
  ehrIntegrationText?: string;
  ehrEncryptionText?: string;
  steps?: DemoStep[];
}

/* ─── Scribe Capabilities ─── */
export interface CapabilityCard {
  id: number;
  name: string;
  capabilityId?: string;
  description?: string;
  icon?: StrapiMedia;
  bullets?: UseCaseBullet[];
}

export interface ScribeCapabilitiesSection {
  __component: "models-page.scribe-capabilities-section";
  id: number;
  wrapperClass?: string;
  preheading?: string;
  title: string;
  description?: string;
  capabilities?: CapabilityCard[];
}

/* ─── Models Page Dynamic Zone Union ─── */
export type ModelsPageSection =
  | DermaHeroSection
  | DermaVideoSection
  | DermaClinicalScannerSection
  | DermaPractitionerInsightsSection
  | DermaBenchmarksSection
  | DermaBuiltForCliniciansSection
  | DermaRoiCalculatorSection
  | DermaFooterActionSection
  | DermaFooterSection
  | ScribeHeroSection
  | ScribeAmbientDemoSection
  | ScribeCapabilitiesSection
  | ScrollerSection
  | VideoUploadSection
  | TestimonialSection
  | BenchmarksSection
  | DoctorReviewsSection
  | WhyOjasSection
  | StatsSection
  | AccessPointsSection
  | CertifiedAuthorityBoardSection
  | BlogsSection
  | FeaturedInSection
  | PricingSection
  | ComplianceSection
  | FaqSection
  | CustomCodeSection
  | HomeCalculatorWidget;

/* ─── Global Footer ─── */
export interface GlobalFooterSocialLink {
  id: number;
  icon?: string;
  href: string;
  label?: string;
}

export interface GlobalFooterComplianceBadge {
  id: number;
  text: string;
}

export interface GlobalFooterColumn {
  id: number;
  title: string;
  links?: FooterLink[];
}

export interface FooterData {
  description?: string;
  columns?: GlobalFooterColumn[];
  socialLinks?: GlobalFooterSocialLink[];
  complianceTitle?: string;
  complianceBadges?: GlobalFooterComplianceBadge[];
  copyrightText?: string;
  statusText?: string;
}

/* ─── Header ─── */
export interface HeaderMenuLink {
  id: number;
  title: string;
  href: string;
  icon?: string;
  description?: string;
}

export interface HeaderMenuBlock {
  id: number;
  heading?: string;
  headingIcon?: string;
  links?: HeaderMenuLink[];
}

export interface HeaderNavLink {
  id: number;
  label: string;
  href?: string;
  hasDropdown?: boolean;
  menuBlocks?: HeaderMenuBlock[];
  viewAllLabel?: string;
  viewAllHref?: string;
}

export interface HeaderCtaButton {
  title: string;
  url: string;
}

export interface HeaderData {
  logo: { text: string; linkUrl: string };
  navLinks: HeaderNavLink[];
  loginCta?: HeaderCtaButton;
  signupCta?: HeaderCtaButton;
}

/* ─── Models Page Response ─── */
export interface ModelsPageData {
  id: number;
  slug: string;
  title: string;
  seo?: SeoData;
  customCss?: string;
  sections: ModelsPageSection[];
}
