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
  anchorId?: string;
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
  anchorId?: string;
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
  anchorId?: string;
  wrapperClass?: string;
  trustBadges?: { id: number; title: string; icon?: StrapiMedia }[];
  partners?: { id: number; title: string; logo?: StrapiMedia }[];
}

/* ─── Video Upload ─── */
export interface VideoUploadSection {
  __component: "home-page.home-video-upload-section";
  id: number;
  anchorId?: string;
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
  anchorId?: string;
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
  anchorId?: string;
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
  anchorId?: string;
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
  anchorId?: string;
  wrapperClass?: string;
  title: string;
  description?: string;
  models?: ModelCard[];
  cta?: CtaButton;
}

/* ─── Why Ojas ─── */
/* ─── Symptom Management Trap ─── */
export interface ComparisonPoint {
  id: number;
  text: string;
}

export interface SymptomTrapSection {
  __component: "home-page.home-symptom-trap-section";
  id: number;
  anchorId?: string;
  wrapperClass?: string;
  title: string;
  description?: string;
  legacyTitle?: string;
  legacyPoints?: ComparisonPoint[];
  ojasTitle?: string;
  ojasPoints?: ComparisonPoint[];
  sectionStyle?: SectionStyle;
}

export interface WhyOjasSection {
  __component: "home-page.home-why-ojas-section";
  id: number;
  anchorId?: string;
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
  anchorId?: string;
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
  anchorId?: string;
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
  anchorId?: string;
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
  bgColor?: string;
  textColor?: string;
  /** Optional redirect target; the whole card becomes clickable when set. */
  href?: string;
  newTab?: boolean;
}

export interface AccessPointsSection {
  __component: "home-page.home-access-points-section";
  id: number;
  anchorId?: string;
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
  anchorId?: string;
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
  anchorId?: string;
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
  anchorId?: string;
  wrapperClass?: string;
  title: string;
  blogs?: BlogCard[];
}

/* ─── Featured In ─── */
export interface FeaturedInSection {
  __component: "home-page.home-featured-in-section";
  id: number;
  anchorId?: string;
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
  anchorId?: string;
  wrapperClass?: string;
  title: string;
  subtitle?: string;
  plans?: PricingPlan[];
}

/* ─── Compliance ─── */
export interface ComplianceSection {
  __component: "home-page.home-compliance-section";
  id: number;
  anchorId?: string;
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
  anchorId?: string;
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
  anchorId?: string;
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
  anchorId?: string;
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
  anchorId?: string;
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
  anchorId?: string;
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
  anchorId?: string;
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
  anchorId?: string;
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
  anchorId?: string;
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
  anchorId?: string;
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
  anchorId?: string;
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
  anchorId?: string;
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
  anchorId?: string;
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
  anchorId?: string;
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
  | HomeCalculatorWidget
  /* Specialist widgets shared with use case pages (gynecology, …) */
  | HormoneUniverseSectionData
  | ClinicianValidationSectionData
  | UseCaseHeroSectionData
  | AmbientScribingSection
  | AmbientScribingV2SectionData
  | FoodReactionSectionData
  | SymptomTrapNarrativeSectionData
  | SymptomTrapSection;

/* ═══════════════════════════════════════════════════════════════
   MODELS INDEX PAGE TYPES
   ═══════════════════════════════════════════════════════════════ */

export type ModelAccent =
  | "blue"
  | "indigo"
  | "emerald"
  | "amber"
  | "rose"
  | "purple"
  | "teal"
  | "slate";

export interface ModelListingCard {
  id: number;
  name: string;
  anchorId?: string;
  icon?: StrapiMedia | null;
  iconName?: string | null;
  accent?: ModelAccent;
  tag?: string;
  science?: string;
  target?: string;
  actionLabel?: string;
  actionUrl?: string;
}

export interface ModelsIndexHeroSection {
  __component: "models-index-page.models-index-hero-section";
  id: number;
  anchorId?: string;
  wrapperClass?: string;
  badgeText?: string;
  badgeUrl?: string;
  title: string;
  description?: string;
  sectionStyle?: SectionStyle;
}

export interface ModelsGridSection {
  __component: "models-index-page.models-grid-section";
  id: number;
  anchorId?: string;
  wrapperClass?: string;
  scienceLabel?: string;
  targetLabel?: string;
  models?: ModelListingCard[];
  sectionStyle?: SectionStyle;
}

export interface SafetyBadge {
  id: number;
  text: string;
  icon?: StrapiMedia | null;
  iconName?: string | null;
  accent?: "blue" | "emerald" | "purple" | "amber";
}

export interface ModelsSafetySection {
  __component: "models-index-page.models-safety-section";
  id: number;
  anchorId?: string;
  wrapperClass?: string;
  badgeText?: string;
  title: string;
  description?: string;
  badges?: SafetyBadge[];
  sectionStyle?: SectionStyle;
}

export type ModelsIndexPageSection =
  | ModelsIndexHeroSection
  | ModelsGridSection
  | ModelsSafetySection
  | FaqSection
  | StatsSection
  | ScrollerSection
  | ComplianceSection
  | CustomCodeSection;

export interface ModelsIndexPageData {
  id: number;
  seo?: SeoData;
  customCss?: string;
  sections: ModelsIndexPageSection[];
}

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

/* ═══════════════════════════════════════════════════════════════
   CAREERS PAGE TYPES
   ═══════════════════════════════════════════════════════════════ */

/* ─── Perks ─── */
export interface CareersPerk {
  id: number;
  title: string;
  description?: string;
  icon?: StrapiMedia;
}

export interface CareersPerksSection {
  __component: "careers-page.careers-perks-section";
  id: number;
  anchorId?: string;
  wrapperClass?: string;
  badgeText?: string;
  title: string;
  description?: string;
  perks?: CareersPerk[];
  sectionStyle?: SectionStyle;
}

/* ─── Positions ─── */
export interface CareersJobRole {
  roleId?: string | null;
  title: string;
  type?: string | null;
  location?: string | null;
  description?: string | null;
  requirements?: string[];
  slug?: string | null;
  applyUrl?: string | null;
}

export interface CareersJobDepartment {
  department?: string | null;
  roles: CareersJobRole[];
}

export interface CareersPositionsSection {
  __component: "careers-page.careers-positions-section";
  id: number;
  anchorId?: string;
  wrapperClass?: string;
  badgeText?: string;
  title: string;
  description?: string;
  /* Grouped + normalized server-side by the careers-page controller */
  departments?: CareersJobDepartment[];
  sectionStyle?: SectionStyle;
}

/* ─── Application Form ─── */
export interface CareersApplicationFormSection {
  __component: "careers-page.careers-application-form-section";
  id: number;
  wrapperClass?: string;
  anchorId?: string;
  badgeText?: string;
  title: string;
  description?: string;
  sectionStyle?: SectionStyle;
}

export type CareersPageSection =
  | CareersPerksSection
  | CareersPositionsSection
  | CareersApplicationFormSection
  | FaqSection
  | StatsSection
  | ScrollerSection
  | TestimonialSection
  | BlogsSection
  | ComplianceSection
  | CustomCodeSection;

/* ─── Careers Page Response ─── */
export interface CareersPageData {
  id: number;
  seo?: SeoData;
  customCss?: string;
  sections: CareersPageSection[];
}

/* ═══════════════════════════════════════════════════════════════
   CONTACT PAGE TYPES
   ═══════════════════════════════════════════════════════════════ */

/* ─── Direct Channels ─── */
export interface ContactChannel {
  id: number;
  department: string;
  email?: string;
  description?: string;
}

export interface ContactFormSection {
  __component: "contact-page.contact-form-section";
  id: number;
  anchorId?: string;
  wrapperClass?: string;
  badgeText?: string;
  title: string;
  description?: string;
  channelsTitle?: string;
  channelsDescription?: string;
  channels?: ContactChannel[];
  noticeTitle?: string;
  noticeDescription?: string;
  formBadgeText?: string;
  formDescription?: string;
  sectionStyle?: SectionStyle;
}

/* ─── Offices ─── */
export interface ContactOffice {
  id: number;
  city: string;
  role?: string;
  address?: string;
  phone?: string;
  mapUrl?: string;
}

export interface ContactOfficesSection {
  __component: "contact-page.contact-offices-section";
  id: number;
  anchorId?: string;
  wrapperClass?: string;
  badgeText?: string;
  title: string;
  description?: string;
  offices?: ContactOffice[];
  sectionStyle?: SectionStyle;
}

export type ContactPageSection =
  | ContactFormSection
  | ContactOfficesSection
  | FaqSection
  | StatsSection
  | ScrollerSection
  | ComplianceSection
  | CustomCodeSection;

/* ─── Contact Page Response ─── */
export interface ContactPageData {
  id: number;
  seo?: SeoData;
  customCss?: string;
  sections: ContactPageSection[];
}

/* ═══════════════════════════════════════════════════════════════
   ABOUT PAGE TYPES
   ═══════════════════════════════════════════════════════════════ */

/* ─── Mission & Vision ─── */
export interface AboutPurposeCard {
  id: number;
  title: string;
  description?: string;
  icon?: StrapiMedia;
  accentColor?: "brand" | "indigo" | "emerald" | "purple" | "rose" | "amber";
}

export interface AboutMissionVisionSection {
  __component: "about-page.about-mission-vision-section";
  id: number;
  anchorId?: string;
  wrapperClass?: string;
  badgeText?: string;
  title: string;
  description?: string;
  cards?: AboutPurposeCard[];
  sectionStyle?: SectionStyle;
}

/* ─── Core Values ─── */
export interface AboutValueCard {
  id: number;
  title: string;
  description?: string;
  icon?: StrapiMedia;
}

export interface AboutCoreValuesSection {
  __component: "about-page.about-core-values-section";
  id: number;
  anchorId?: string;
  wrapperClass?: string;
  badgeText?: string;
  title: string;
  description?: string;
  values?: AboutValueCard[];
  sectionStyle?: SectionStyle;
}

/* ─── Milestones ─── */
export interface AboutMilestone {
  id: number;
  year: string;
  title: string;
  description?: string;
}

export interface AboutMilestonesSection {
  __component: "about-page.about-milestones-section";
  id: number;
  anchorId?: string;
  wrapperClass?: string;
  badgeText?: string;
  title: string;
  description?: string;
  milestones?: AboutMilestone[];
  sectionStyle?: SectionStyle;
}

/* ─── Team ─── */
export interface AboutTeamMember {
  id: number;
  name: string;
  role?: string;
  credentials?: string;
  initials?: string;
  photo?: StrapiMedia;
  linkedinUrl?: string;
}

export interface AboutTeamSection {
  __component: "about-page.about-team-section";
  id: number;
  anchorId?: string;
  wrapperClass?: string;
  badgeText?: string;
  title: string;
  description?: string;
  members?: AboutTeamMember[];
  sectionStyle?: SectionStyle;
}

export type AboutPageSection =
  | AboutMissionVisionSection
  | AboutCoreValuesSection
  | AboutMilestonesSection
  | AboutTeamSection
  | FaqSection
  | StatsSection
  | ScrollerSection
  | ComplianceSection
  | CertifiedAuthorityBoardSection
  | PublicationsSection
  | CustomCodeSection;

/* ─── About Page Response ─── */
export interface AboutPageData {
  id: number;
  seo?: SeoData;
  customCss?: string;
  sections: AboutPageSection[];
}

/* ═══════════════════════════════════════════════════════════════
   PRICING PAGE TYPES
   ═══════════════════════════════════════════════════════════════ */

/* ─── Hero / Plans ─── */
export interface PricingTierFeature {
  id: number;
  label: string;
}

export interface PricingTier {
  id: number;
  name: string;
  tag?: string;
  monthlyPrice: string;
  annualPrice?: string;
  monthlyPriceSubtitle?: string;
  annualPriceSubtitle?: string;
  features?: PricingTierFeature[];
  buttonText?: string;
  buttonUrl?: string;
  buttonDisabled?: boolean;
  footer?: string;
  badge?: string;
  dark?: boolean;
}

export interface PricingHeroSection {
  __component: "pricing-page.pricing-hero-section";
  id: number;
  anchorId?: string;
  wrapperClass?: string;
  badgeText?: string;
  title: string;
  description?: string;
  showBillingToggle?: boolean;
  monthlyLabel?: string;
  annualLabel?: string;
  annualSavingsBadge?: string;
  plans?: PricingTier[];
  sectionStyle?: SectionStyle;
}

/* ─── ROI Calculator ─── */
/* Labels only — the figure itself is computed in the widget. */
export interface PricingRoiOutput {
  id: number;
  label: string;
  description?: string;
  prefix?: string;
  suffix?: string;
  icon?: StrapiMedia;
}

export interface PricingRoiSection {
  __component: "pricing-page.pricing-roi-section";
  id: number;
  anchorId?: string;
  wrapperClass?: string;
  badgeText?: string;
  title: string;
  description?: string;
  sliderLabel?: string;
  sliderUnit?: string;
  sliderMin?: number;
  sliderMax?: number;
  sliderStep?: number;
  sliderDefault?: number;
  hoursSavedCard?: PricingRoiOutput;
  revenueGainCard?: PricingRoiOutput;
  sectionStyle?: SectionStyle;
}

/* ─── Compliance ─── */
export interface PricingCertification {
  id: number;
  name: string;
  icon?: StrapiMedia;
}

export interface PricingComplianceSection {
  __component: "pricing-page.pricing-compliance-section";
  id: number;
  anchorId?: string;
  wrapperClass?: string;
  title: string;
  description?: string;
  certifications?: PricingCertification[];
  sectionStyle?: SectionStyle;
}

/* ─── FAQ ─── */
export interface PricingFaqSection {
  __component: "pricing-page.pricing-faq-section";
  id: number;
  anchorId?: string;
  wrapperClass?: string;
  badgeText?: string;
  title: string;
  description?: string;
  supportTitle?: string;
  supportDescription?: string;
  supportButtonText?: string;
  supportButtonUrl?: string;
  faqs?: FaqItem[];
  sectionStyle?: SectionStyle;
}

export type PricingPageSection =
  | PricingHeroSection
  | PricingRoiSection
  | PricingComplianceSection
  | PricingFaqSection
  | FaqSection
  | StatsSection
  | ScrollerSection
  | ComplianceSection
  | PricingSection
  | TestimonialSection
  | PublicationsSection
  | CustomCodeSection;

/* ─── Pricing Page Response ─── */
export interface PricingPageData {
  id: number;
  seo?: SeoData;
  customCss?: string;
  sections: PricingPageSection[];
}

/* ═══════════════════════════════════════════════════════════════
   DEVELOPER API PAGE TYPES
   ═══════════════════════════════════════════════════════════════ */

/* ─── Hero ─── */
export interface DeveloperHeroSection {
  __component: "developer-api-page.developer-hero-section";
  id: number;
  anchorId?: string;
  wrapperClass?: string;
  badgeText?: string;
  title: string;
  description?: string;
  primaryButton?: CtaButton;
  separatorText?: string;
  secondaryButton?: CtaButton;
  sectionStyle?: SectionStyle;
}

/* ─── Integrate ─── */
export interface DeveloperIntegrateSection {
  __component: "developer-api-page.developer-integrate-section";
  id: number;
  anchorId?: string;
  wrapperClass?: string;
  title: string;
  description?: string;
  button?: CtaButton;
  sectionStyle?: SectionStyle;
}

/* ─── Marquee ─── */
export interface DeveloperMarqueeBadge {
  id: number;
  title: string;
  icon?: StrapiMedia;
}

export interface DeveloperMarqueePartner {
  id: number;
  title: string;
}

export interface DeveloperMarqueeSection {
  __component: "developer-api-page.developer-marquee-section";
  id: number;
  anchorId?: string;
  wrapperClass?: string;
  badges?: DeveloperMarqueeBadge[];
  partners?: DeveloperMarqueePartner[];
  sectionStyle?: SectionStyle;
}

/* ─── Capabilities ─── */
export interface DeveloperCapabilityCard {
  id: number;
  title: string;
  description?: string;
  icon?: StrapiMedia;
}

export interface DeveloperCapabilitiesSection {
  __component: "developer-api-page.developer-capabilities-section";
  id: number;
  anchorId?: string;
  wrapperClass?: string;
  badgeText?: string;
  title: string;
  description?: string;
  capabilities?: DeveloperCapabilityCard[];
  sectionStyle?: SectionStyle;
}

export type DeveloperApiPageSection =
  | DeveloperHeroSection
  | DeveloperIntegrateSection
  | DeveloperMarqueeSection
  | DeveloperCapabilitiesSection
  | BenchmarksSection
  | FaqSection
  | StatsSection
  | ScrollerSection
  | ComplianceSection
  | PricingSection
  | PublicationsSection
  | CustomCodeSection;

/* ─── Developer API Page Response ─── */
export interface DeveloperApiPageData {
  id: number;
  seo?: SeoData;
  customCss?: string;
  sections: DeveloperApiPageSection[];
}

/* ═══════════════════════════════════════════════════════════════
   BLOGS PAGE TYPES
   ═══════════════════════════════════════════════════════════════ */

/* ─── Blog Category ─── */
export interface BlogCategory {
  name: string;
  slug: string;
  count?: number;
}

/* ─── Blog Card (listing payload) ─── */
export interface BlogPostCard {
  documentId: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  coverImage?: StrapiMedia | null;
  author?: string | null;
  authorRole?: string | null;
  readTime?: string | null;
  publishDate?: string | null;
  gradient?: string | null;
  isFeatured?: boolean;
  category?: BlogCategory | null;
}

/* ─── Blog Detail ─── */
export interface BlogDetailData extends BlogPostCard {
  content?: string | null;
  seo?: SeoData;
  related?: BlogPostCard[];
}

/* ─── Listing Pagination ─── */
export interface BlogPagination {
  page: number;
  pageSize: number;
  total: number;
  hasMore: boolean;
}

export interface BlogListing {
  blogs: BlogPostCard[];
  pagination: BlogPagination;
  categories?: BlogCategory[];
}

/* ─── Blogs Page Sections ─── */
export interface BlogsHeroSection {
  __component: "blogs-page.blogs-hero-section";
  id: number;
  anchorId?: string;
  wrapperClass?: string;
  badgeText?: string;
  title: string;
  description?: string;
  sectionStyle?: SectionStyle;
}

export interface BlogsListingSection extends BlogListing {
  __component: "blogs-page.blogs-listing-section";
  id: number;
  anchorId?: string;
  wrapperClass?: string;
  searchPlaceholder?: string;
  pageSize?: number;
  loadMoreLabel?: string;
  showFeatured?: boolean;
  featuredBadgeText?: string;
  emptyStateTitle?: string;
  emptyStateDescription?: string;
  sectionStyle?: SectionStyle;
}

export interface BlogsNewsletterSection {
  __component: "blogs-page.blogs-newsletter-section";
  id: number;
  anchorId?: string;
  wrapperClass?: string;
  badgeText?: string;
  title: string;
  description?: string;
  inputPlaceholder?: string;
  buttonText?: string;
  successMessage?: string;
  sectionStyle?: SectionStyle;
}

export type BlogsPageSection =
  | BlogsHeroSection
  | BlogsListingSection
  | BlogsNewsletterSection
  | FaqSection
  | StatsSection
  | ScrollerSection
  | ComplianceSection
  | CustomCodeSection;

/* ─── Blogs Page Response ─── */
export interface BlogsPageData {
  id: number;
  seo?: SeoData;
  customCss?: string;
  sections: BlogsPageSection[];
}

/* ═══════════════════════════════════════════════════════════════
   RESEARCH PAPERS PAGE TYPES
   ═══════════════════════════════════════════════════════════════ */

/* ─── Research Paper Category ─── */
export interface ResearchPaperCategory {
  name: string;
  slug: string;
  count?: number;
}

/* ─── Concordance Row ─── */
export interface ConcordanceRow {
  condition: string;
  expert?: string | null;
  /** Percentage string, e.g. "98.9%" — also drives the bar width. */
  ojas: string;
  velocity?: string | null;
}

/* ─── Research Paper (listing payload) ─── */
export interface ResearchPaper {
  documentId: string;
  title: string;
  slug: string;
  paperId?: string | null;
  journal?: string | null;
  volume?: string | null;
  date?: string | null;
  authors?: string | null;
  affiliations?: string | null;
  doi?: string | null;
  abstract?: string | null;
  concordanceChart?: ConcordanceRow[];
  citationAPA?: string | null;
  citationAMA?: string | null;
  citationBibTeX?: string | null;
  reprintPdf?: StrapiMedia | null;
  category?: ResearchPaperCategory | null;
}

/* ─── Listing Pagination ─── */
export interface ResearchPaperPagination {
  page: number;
  pageSize: number;
  total: number;
  hasMore: boolean;
}

export interface ResearchPaperListing {
  papers: ResearchPaper[];
  pagination: ResearchPaperPagination;
  categories?: ResearchPaperCategory[];
}

/* ─── Research Papers Page Sections ─── */
export interface ResearchStat {
  id: number;
  value: string;
  label: string;
}

export interface ResearchHeroSection {
  __component: "research-papers-page.research-hero-section";
  id: number;
  anchorId?: string;
  wrapperClass?: string;
  badgeText?: string;
  title: string;
  highlightedTitle?: string;
  description?: string;
  showAccentBar?: boolean;
  sectionStyle?: SectionStyle;
}

export interface ResearchStatsSection {
  __component: "research-papers-page.research-stats-section";
  id: number;
  anchorId?: string;
  wrapperClass?: string;
  stats?: ResearchStat[];
  sectionStyle?: SectionStyle;
}

export interface ResearchExplorerSection extends ResearchPaperListing {
  __component: "research-papers-page.research-explorer-section";
  id: number;
  anchorId?: string;
  wrapperClass?: string;
  searchPlaceholder?: string;
  pageSize?: number;
  domainsTitle?: string;
  indexTitle?: string;
  emptyStateText?: string;
  reprintLabel?: string;
  downloadButtonText?: string;
  abstractHeading?: string;
  chartHeading?: string;
  chartDescription?: string;
  citationHeading?: string;
  consensusNote?: string;
  sectionStyle?: SectionStyle;
}

export type ResearchPapersPageSection =
  | ResearchHeroSection
  | ResearchStatsSection
  | ResearchExplorerSection
  | FaqSection
  | StatsSection
  | ScrollerSection
  | ComplianceSection
  | PublicationsSection
  | CustomCodeSection;

/* ─── Research Papers Page Response ─── */
export interface ResearchPapersPageData {
  id: number;
  seo?: SeoData;
  customCss?: string;
  sections: ResearchPapersPageSection[];
}

/* ═══════════════════════════════════════════════════════════════
   CASE STUDIES PAGE TYPES
   ═══════════════════════════════════════════════════════════════ */

/* ─── Case Study Category ─── */
export interface CaseStudyCategory {
  name: string;
  slug: string;
  count?: number;
}

/* ─── Case Study Card (listing payload) ─── */
export interface CaseStudyCard {
  documentId: string;
  title: string;
  slug: string;
  subject?: string | null;
  summary?: string | null;
  image?: StrapiMedia | null;
  duration?: string | null;
  impact?: string | null;
  clinician?: string | null;
  publishDate?: string | null;
  isFeatured?: boolean;
  category?: CaseStudyCategory | null;
}

/* ─── Journey Step ─── */
export interface JourneyStep {
  id: number;
  day: string;
  title: string;
  description?: string;
}

/* ─── Case Study Detail ─── */
export interface CaseStudyDetailData extends CaseStudyCard {
  content?: string | null;
  beforeLabel?: string | null;
  afterLabel?: string | null;
  beforeImage?: StrapiMedia | null;
  afterImage?: StrapiMedia | null;
  journeySteps?: JourneyStep[];
  seo?: SeoData;
}

/* ─── Listing Pagination ─── */
export interface CaseStudyPagination {
  page: number;
  pageSize: number;
  total: number;
  hasMore: boolean;
}

export interface CaseStudyListing {
  caseStudies: CaseStudyCard[];
  pagination: CaseStudyPagination;
  categories?: CaseStudyCategory[];
}

/* ─── Impact Metric ─── */
export interface ImpactMetric {
  id: number;
  value: string;
  label: string;
  description?: string;
}

/* ─── Case Studies Page Sections ─── */
export interface CaseStudiesMetricsSection {
  __component: "case-studies-page.case-studies-metrics-section";
  id: number;
  anchorId?: string;
  wrapperClass?: string;
  badgeText?: string;
  title: string;
  highlightedTitle?: string;
  description?: string;
  metrics?: ImpactMetric[];
  showToolbar?: boolean;
  sectionStyle?: SectionStyle;
}

export interface CaseStudiesSpotlightSection {
  __component: "case-studies-page.case-studies-spotlight-section";
  id: number;
  anchorId?: string;
  wrapperClass?: string;
  badgeText?: string;
  title: string;
  description?: string;
  beforeLabel?: string;
  afterLabel?: string;
  beforeImage?: StrapiMedia;
  afterImage?: StrapiMedia;
  beforeBadge?: string;
  afterBadge?: string;
  scaleTitle?: string;
  lowStateText?: string;
  midStateText?: string;
  highStateText?: string;
  footnote?: string;
  sectionStyle?: SectionStyle;
}

export interface CaseStudiesPortfolioSection extends CaseStudyListing {
  __component: "case-studies-page.case-studies-portfolio-section";
  id: number;
  anchorId?: string;
  wrapperClass?: string;
  title: string;
  description?: string;
  pageSize?: number;
  loadMoreLabel?: string;
  durationLabel?: string;
  impactLabel?: string;
  clinicianLabel?: string;
  emptyStateTitle?: string;
  emptyStateDescription?: string;
  sectionStyle?: SectionStyle;
}

export interface CaseStudiesJourneySection {
  __component: "case-studies-page.case-studies-journey-section";
  id: number;
  anchorId?: string;
  wrapperClass?: string;
  badgeText?: string;
  title: string;
  description?: string;
  steps?: JourneyStep[];
  sectionStyle?: SectionStyle;
}

export interface CaseStudiesTestimonialSection {
  __component: "case-studies-page.case-studies-testimonial-section";
  id: number;
  anchorId?: string;
  wrapperClass?: string;
  quote: string;
  authorInitials?: string;
  authorName?: string;
  authorTitle?: string;
  sectionStyle?: SectionStyle;
}

export type CaseStudiesPageSection =
  | CaseStudiesMetricsSection
  | CaseStudiesSpotlightSection
  | CaseStudiesPortfolioSection
  | CaseStudiesJourneySection
  | CaseStudiesTestimonialSection
  | FaqSection
  | StatsSection
  | ScrollerSection
  | ComplianceSection
  | CustomCodeSection;

/* ─── Case Studies Page Response ─── */
export interface CaseStudiesPageData {
  id: number;
  seo?: SeoData;
  customCss?: string;
  sections: CaseStudiesPageSection[];
}

/* ═══════════════════════════════════════════════════════════════
   WHITE PAPER PAGE TYPES
   ═══════════════════════════════════════════════════════════════ */

/* ─── Market Trend ─── */
export interface MarketTrend {
  id: number;
  year: string;
  stats?: string;
  text?: string;
}

/* ─── White Paper Tab ─── */
export interface WhitePaperTab {
  id: number;
  label: string;
  title: string;
  /** Richtext (markdown) */
  content?: string;
}

/* ─── White Paper Page Sections ─── */
export interface WhitePaperHeroSection {
  __component: "white-paper-page.white-paper-hero-section";
  id: number;
  anchorId?: string;
  wrapperClass?: string;
  documentLabel?: string;
  classification?: string;
  badgeText?: string;
  title: string;
  highlightedTitle?: string;
  pullQuote?: string;
  publishedLabel?: string;
  vettedLabel?: string;
  readTimeLabel?: string;
  showProgressBar?: boolean;
  sectionStyle?: SectionStyle;
}

export interface WhitePaperContentSection {
  __component: "white-paper-page.white-paper-content-section";
  id: number;
  anchorId?: string;
  wrapperClass?: string;
  trendsTitle?: string;
  trendsDescription?: string;
  trendsMetricLabel?: string;
  marketTrends?: MarketTrend[];
  quoteBadgeText?: string;
  quote?: string;
  quoteAuthorInitials?: string;
  quoteAuthorName?: string;
  quoteAuthorTitle?: string;
  tabs?: WhitePaperTab[];
  gateTitle?: string;
  gateDescription?: string;
  gateInputPlaceholder?: string;
  gateButtonText?: string;
  gateSuccessMessage?: string;
  gateDownloadButtonText?: string;
  gateFootnote?: string;
  reportPdf?: StrapiMedia;
  sectionStyle?: SectionStyle;
}

export type WhitePaperPageSection =
  | WhitePaperHeroSection
  | WhitePaperContentSection
  | FaqSection
  | StatsSection
  | ScrollerSection
  | ComplianceSection
  | CustomCodeSection;

/* ─── White Paper Page Response ─── */
export interface WhitePaperPageData {
  id: number;
  seo?: SeoData;
  customCss?: string;
  sections: WhitePaperPageSection[];
}

/* ═══════════════════════════════════════════════════════════════
   USE CASES PAGE TYPES
   ═══════════════════════════════════════════════════════════════ */

/* ─── Use Case FAQ ─── */
export interface UseCaseFaqItem {
  id: number;
  question: string;
  answer: string;
}

/* ─── Use Case Phrase ─── */
export interface UseCasePhrase {
  id: number;
  text: string;
}

/* ─── Use Case Card (directory payload) ─── */
export interface UseCaseCard {
  documentId: string;
  label: string;
  slug: string;
  description?: string | null;
  icon?: StrapiMedia | null;
  iconName?: string | null;
  category?: { title: string; slug: string } | null;
}

/* ─── Use Case Category (grouped directory) ─── */
export interface UseCaseCategoryGroup {
  title: string;
  slug: string;
  subtitle?: string | null;
  badge?: string | null;
  badgeColor?: string | null;
  items: UseCaseCard[];
}

/* ─── Use Case Detail Sections ─── */
export interface UseCaseHeroSectionData {
  __component: "use-cases-page.use-case-hero-section";
  id: number;
  anchorId?: string;
  wrapperClass?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  phrases?: UseCasePhrase[];
  analyzeButtonText?: string;
  sectionStyle?: SectionStyle;
}

export interface UseCaseVideoSectionData {
  __component: "use-cases-page.use-case-video-section";
  id: number;
  anchorId?: string;
  wrapperClass?: string;
  title: string;
  description?: string;
  primaryCta?: CtaButton;
  secondaryCta?: CtaButton;
  video?: StrapiMedia;
  poster?: StrapiMedia;
  quote?: string;
  quoteAuthor?: string;
  quoteAuthorTitle?: string;
  sectionStyle?: SectionStyle;
}

/* ─── Scribe Capability (collection) ─── */
export interface ScribeBullet {
  id: number;
  text: string;
}

export interface ScribeExtractedField {
  id: number;
  label: string;
  value: string;
}

export interface ScribeSpecialtyTab {
  id: number;
  label: string;
  extractedFields?: ScribeExtractedField[];
}

export interface ScribeCapability {
  documentId: string;
  title: string;
  capabilityId: string;
  badge?: string;
  description?: string;
  icon?: StrapiMedia | null;
  iconName?: string | null;
  highlightsLabel?: string;
  highlightsTitle?: string;
  bullets?: ScribeBullet[];
  roiLabel?: string;
  roiText?: string;
  transcript?: string;
  extractedFields?: ScribeExtractedField[];
  specialtyTabs?: ScribeSpecialtyTab[];
}

export interface ScribeWorkspaceSectionData {
  __component: "use-cases-page.scribe-workspace-section";
  id: number;
  anchorId?: string;
  wrapperClass?: string;
  capability?: ScribeCapability | null;
  backLinkText?: string;
  backLinkUrl?: string;
  transcriptLabel?: string;
  simulateButtonText?: string;
  simulateAgainButtonText?: string;
  ctaBadgeText?: string;
  ctaTitle?: string;
  ctaDescription?: string;
  ctaButton?: CtaButton;
  sectionStyle?: SectionStyle;
}

export interface ClinicianValidationSectionData {
  __component: "use-cases-page.clinician-validation-section";
  id: number;
  anchorId?: string;
  wrapperClass?: string;
  badgeText?: string;
  videoLabel?: string;
  title: string;
  description?: string;
  video?: StrapiMedia;
  poster?: StrapiMedia;
  sectionStyle?: SectionStyle;
}

/* ─── Symptom Trap (narrative variant) ─── */
export interface SymptomTrapNarrativeSectionData {
  __component: "use-cases-page.symptom-trap-narrative-section";
  id: number;
  anchorId?: string;
  wrapperClass?: string;
  badgeText?: string;
  title: string;
  description?: string;
  quote?: string;
  closingText?: string;
  sectionStyle?: SectionStyle;
}

/* ─── Food Reaction Simulator ─── */
export interface FoodMetric {
  id: number;
  label: string;
  value: number;
  valueLabel?: string;
  tone?: "positive" | "caution" | "negative" | "neutral";
}

export interface FoodItem {
  id: number;
  name: string;
  emoji?: string;
  metrics?: FoodMetric[];
  profile?: string;
  consequence?: string;
}

export interface FoodReactionSectionData {
  __component: "use-cases-page.food-reaction-section";
  id: number;
  anchorId?: string;
  wrapperClass?: string;
  title: string;
  description?: string;
  selectorLabel?: string;
  selectorDescription?: string;
  simulateLabel?: string;
  simulatingLabel?: string;
  outcomeLabel?: string;
  chartTitle?: string;
  chartDescription?: string;
  profileLabel?: string;
  foods?: FoodItem[];
  sectionStyle?: SectionStyle;
}

/* ─── Ambient Scribing V2 ─── */
export interface ScribeStat {
  id: number;
  value: string;
  label: string;
}

export interface ScribeTranscriptLine {
  id: number;
  speaker: string;
  timestamp?: string;
  text: string;
}

export interface AmbientScribingV2SectionData {
  __component: "use-cases-page.ambient-scribing-v2-section";
  id: number;
  anchorId?: string;
  wrapperClass?: string;
  badgeText?: string;
  title: string;
  description?: string;
  stats?: ScribeStat[];
  statusLabel?: string;
  durationLabel?: string;
  transcript?: ScribeTranscriptLine[];
  draftHeading?: string;
  draftText?: string;
  cta?: CtaButton;
  sectionStyle?: SectionStyle;
}

/* ─── Hormone Universe ─── */
export interface HormoneNode {
  id: number;
  nodeId: string;
  kind: "system" | "hormone";
  label: string;
  fullLabel?: string;
  description?: string;
  x: number;
  y: number;
}

export interface HormoneConnection {
  id: number;
  from: string;
  to: string;
}

export interface HormoneUniverseSectionData {
  __component: "use-cases-page.hormone-universe-section";
  id: number;
  anchorId?: string;
  wrapperClass?: string;
  badgeText?: string;
  title: string;
  description?: string;
  telemetryLabel?: string;
  pathwaysLabel?: string;
  hintText?: string;
  defaultNodeId?: string;
  emptyStateTitle?: string;
  emptyStateType?: string;
  emptyStateDescription?: string;
  systemNodeType?: string;
  hormoneNodeType?: string;
  nodes?: HormoneNode[];
  connections?: HormoneConnection[];
  sectionStyle?: SectionStyle;
}

/* ─── Use Cases Index Sections ─── */
export interface UseCasesHeroSectionData {
  __component: "use-cases-page.use-cases-hero-section";
  id: number;
  anchorId?: string;
  wrapperClass?: string;
  badgeText?: string;
  title: string;
  description?: string;
  sectionStyle?: SectionStyle;
}

export interface UseCasesDirectorySectionData {
  __component: "use-cases-page.use-cases-directory-section";
  id: number;
  anchorId?: string;
  wrapperClass?: string;
  emptyStateTitle?: string;
  emptyStateDescription?: string;
  categories?: UseCaseCategoryGroup[];
  sectionStyle?: SectionStyle;
}

/* Sections a single use case detail page may render */
export type UseCaseSection =
  | UseCaseHeroSectionData
  | UseCaseVideoSectionData
  | ScribeWorkspaceSectionData
  | ClinicianValidationSectionData
  | HormoneUniverseSectionData
  | AmbientScribingV2SectionData
  | FoodReactionSectionData
  | SymptomTrapNarrativeSectionData
  | WhyOjasSection
  | SymptomTrapSection
  | AmbientScribingSection
  | BenchmarksSection
  | DoctorReviewsSection
  | AccessPointsSection
  | CertifiedAuthorityBoardSection
  | BlogsSection
  | FeaturedInSection
  | PricingSection
  | ComplianceSection
  | FaqSection
  | StatsSection
  | ScrollerSection
  | TestimonialSection
  | VideoUploadSection
  | ModelsSection
  | PublicationsSection
  | HomeCalculatorWidget
  | CustomCodeSection;

/* Sections the use cases index may render */
export type UseCasesPageSection =
  | UseCasesHeroSectionData
  | UseCasesDirectorySectionData
  | FaqSection
  | StatsSection
  | ScrollerSection
  | ComplianceSection
  | CustomCodeSection;

/* ─── Use Case Detail Response ─── */
export interface UseCaseData {
  id: number;
  documentId: string;
  label: string;
  slug: string;
  description?: string;
  icon?: string;
  content?: string;
  faqs?: UseCaseFaqItem[];
  category?: { title: string; slug: string } | null;
  related?: UseCaseCard[];
  seo?: SeoData;
  customCss?: string;
  sections: UseCaseSection[];
}

/* ─── Use Cases Index Response ─── */
export interface UseCasesPageData {
  id: number;
  seo?: SeoData;
  customCss?: string;
  sections: UseCasesPageSection[];
}

/* ═══════════════════════════════════════════════════════════════
   HOSPITALS PAGE TYPES
   ═══════════════════════════════════════════════════════════════ */

/* Credential pill shown in the hero and CTA tickers. */
export interface HospitalsTrustBadge {
  id: number;
  title: string;
  icon?: StrapiMedia;
}

/* ─── Hero ─── */
export interface HospitalsHeroSection {
  __component: "hospitals-page.hospitals-hero-section";
  id: number;
  anchorId?: string;
  wrapperClass?: string;
  title: string;
  /* Second heading line, rendered in the accent colour. */
  titleAccent?: string;
  description?: string;
  calloutText?: string;
  trustBadges?: HospitalsTrustBadge[];
  buttonText?: string;
  sectionStyle?: SectionStyle;
}

/* ─── Problem ─── */
export interface HospitalsProblemStep {
  id: number;
  number: string;
  title: string;
  description: string;
  icon?: StrapiMedia;
}

export interface HospitalsProblemSection {
  __component: "hospitals-page.hospitals-problem-section";
  id: number;
  anchorId?: string;
  wrapperClass?: string;
  /* Markdown: `**bold**` renders in the accent colour. */
  title: string;
  frameImage?: StrapiMedia;
  /* The choreography is built for four steps; more are scrolled through. */
  steps?: HospitalsProblemStep[];
  sectionStyle?: SectionStyle;
}

/* ─── Build ─── */
export interface HospitalsBuildRoom {
  id: number;
  number: string;
  title: string;
  description: string;
  icon?: StrapiMedia;
}

export interface HospitalsBuildSection {
  __component: "hospitals-page.hospitals-build-section";
  id: number;
  anchorId?: string;
  wrapperClass?: string;
  title: string;
  /* Second heading line, same colour as the first. */
  titleSecondLine?: string;
  rooms?: HospitalsBuildRoom[];
  buttonText?: string;
  sectionStyle?: SectionStyle;
}

/* ─── Proof ─── */
export interface HospitalsProofPage {
  id: number;
  category: string;
  title: string;
  description: string;
  icon?: StrapiMedia;
}

export interface HospitalsProofSection {
  __component: "hospitals-page.hospitals-proof-section";
  id: number;
  anchorId?: string;
  wrapperClass?: string;
  title: string;
  frameImage?: StrapiMedia;
  /* Polaroid beside the notepad; the frame is hidden when unset. */
  attachmentImage?: StrapiMedia;
  attachmentLabel?: string;
  pages?: HospitalsProofPage[];
  buttonText?: string;
  sectionStyle?: SectionStyle;
}

/* ─── Trust bar ─── */
export interface HospitalsTrustBarSection {
  __component: "hospitals-page.hospitals-trust-bar-section";
  id: number;
  anchorId?: string;
  wrapperClass?: string;
  title: string;
  partners?: { id: number; title: string }[];
  /* Markdown: `**bold**` renders in the accent colour. */
  calloutText?: string;
  sectionStyle?: SectionStyle;
}

/* ─── CTA / assessment form ─── */
export interface HospitalsCtaSection {
  __component: "hospitals-page.hospitals-cta-section";
  id: number;
  anchorId?: string;
  wrapperClass?: string;
  title: string;
  /* Second heading line, rendered in the accent colour on mobile. */
  titleSecondLine?: string;
  description?: string;
  buttonText?: string;
  /* Markdown: `**bold**` renders in the accent colour. */
  noticeText?: string;
  trustBadges?: HospitalsTrustBadge[];
  sectionStyle?: SectionStyle;
}

export type HospitalsPageSection =
  | HospitalsHeroSection
  | HospitalsProblemSection
  | HospitalsBuildSection
  | HospitalsProofSection
  | HospitalsTrustBarSection
  | HospitalsCtaSection
  | FaqSection
  | StatsSection
  | ScrollerSection
  | ComplianceSection
  | PricingSection
  | TestimonialSection
  | PublicationsSection
  | CustomCodeSection;

/* ─── Hospitals Page Response ─── */
export interface HospitalsPageData {
  id: number;
  seo?: SeoData;
  customCss?: string;
  sections: HospitalsPageSection[];
}

/* ═══════════════════════════════════════════════════════════════
   IVF PAGE TYPES
   ═══════════════════════════════════════════════════════════════ */

/* Credential pill shown in the hero and pre-apply tickers. */
export interface IvfCredential {
  id: number;
  title: string;
}

/* ─── Hero ─── */
export interface IvfHeroSection {
  __component: "ivf-page.ivf-hero-section";
  id: number;
  anchorId?: string;
  wrapperClass?: string;
  title: string;
  /* Second heading line, same colour as the first. */
  titleSecondLine?: string;
  /* Third heading line, rendered in the accent colour. */
  titleAccent?: string;
  description?: string;
  /* Rendered under the description in the accent colour. */
  calloutText?: string;
  /* Washed-out backdrop inside the photo frame; omitted when unset. */
  frameImage?: StrapiMedia;
  credentials?: IvfCredential[];
  buttonText?: string;
  sectionStyle?: SectionStyle;
}

/* ─── Problem ─── */
export interface IvfProblemStep {
  id: number;
  number: string;
  description: string;
}

export interface IvfProblemSection {
  __component: "ivf-page.ivf-problem-section";
  id: number;
  anchorId?: string;
  wrapperClass?: string;
  title: string;
  /* Badge pinned at the centre of the loop. */
  badgeText?: string;
  /* The arrow choreography is built for four steps laid out 2x2. */
  steps?: IvfProblemStep[];
  sectionStyle?: SectionStyle;
}

/* ─── Capabilities (scroll-pinned diagnostic lens) ─── */
export interface IvfCapabilityModule {
  id: number;
  title: string;
  description: string;
  /* Reads out beneath the lens while the module is active. */
  statusLabel?: string;
}

export interface IvfCapabilitiesSection {
  __component: "ivf-page.ivf-capabilities-section";
  id: number;
  anchorId?: string;
  wrapperClass?: string;
  title: string;
  /* Middle heading phrase, rendered in the accent colour. */
  titleAccent?: string;
  titleSuffix?: string;
  /* Each module reuses the lens visual and icon in the same slot. */
  modules?: IvfCapabilityModule[];
  sectionStyle?: SectionStyle;
}

/* ─── Impact ─── */
export interface IvfImpactItem {
  id: number;
  title: string;
  description: string;
}

export interface IvfImpactSection {
  __component: "ivf-page.ivf-impact-section";
  id: number;
  anchorId?: string;
  wrapperClass?: string;
  title: string;
  items?: IvfImpactItem[];
  sectionStyle?: SectionStyle;
}

/* ─── Proof (page-tear notepad) ─── */
export interface IvfProofPage {
  id: number;
  title: string;
}

export interface IvfProofSection {
  __component: "ivf-page.ivf-proof-section";
  id: number;
  anchorId?: string;
  wrapperClass?: string;
  title: string;
  description?: string;
  /* One torn page per entry; the pinned scroll length follows the count. */
  pages?: IvfProofPage[];
  buttonText?: string;
  sectionStyle?: SectionStyle;
}

/* ─── Founding team ─── */
export interface IvfTeamMember {
  id: number;
  name: string;
  role: string;
  description: string;
  /* Falls back to an initials placeholder when unset. */
  photo?: StrapiMedia;
}

export interface IvfTeamSection {
  __component: "ivf-page.ivf-team-section";
  id: number;
  anchorId?: string;
  wrapperClass?: string;
  title: string;
  members?: IvfTeamMember[];
  /* Highlighted word by word as it scrolls into view. */
  closingText?: string;
  sectionStyle?: SectionStyle;
}

/* ─── Marquee ─── */
export interface IvfMarqueeSection {
  __component: "ivf-page.ivf-marquee-section";
  id: number;
  anchorId?: string;
  wrapperClass?: string;
  credentials?: IvfCredential[];
  sectionStyle?: SectionStyle;
}

/* ─── Apply / partnership form ─── */
export interface IvfApplyNote {
  id: number;
  title: string;
}

export interface IvfApplySection {
  __component: "ivf-page.ivf-apply-section";
  id: number;
  anchorId?: string;
  wrapperClass?: string;
  title: string;
  description?: string;
  /* Supporting lines under the description, one per row. */
  notes?: IvfApplyNote[];
  buttonText?: string;
  quoteText?: string;
  quoteAuthor?: string;
  sectionStyle?: SectionStyle;
}

export type IvfPageSection =
  | IvfHeroSection
  | IvfProblemSection
  | IvfCapabilitiesSection
  | IvfImpactSection
  | IvfProofSection
  | IvfTeamSection
  | IvfMarqueeSection
  | IvfApplySection
  | FaqSection
  | StatsSection
  | ScrollerSection
  | ComplianceSection
  | PricingSection
  | TestimonialSection
  | PublicationsSection
  | CustomCodeSection;

/* ─── IVF Page Response ─── */
export interface IvfPageData {
  id: number;
  seo?: SeoData;
  customCss?: string;
  sections: IvfPageSection[];
}

/* ─── Job Application Submission ─── */
export interface JobApplicationPayload {
  firstName: string;
  lastName?: string;
  email: string;
  role?: string;
  jobSlug?: string;
  portfolio?: string;
  statement?: string;
}

/* ─── Contact Form Submission ─── */
/** Which page's form the submission came from; defaults to contact-us. */
export type ContactSubmissionSource = "contact-us" | "hospitals" | "ivf";

export interface ContactSubmissionPayload {
  name: string;
  institution?: string;
  department?: string;
  email: string;
  phone?: string;
  message: string;
  source?: ContactSubmissionSource;
}

/* ─── Newsletter Subscription ─── */
export interface NewsletterSubscriptionPayload {
  email: string;
}
