export type BusinessModelId = 'classic' | 'premium' | 'fast' | 'subscription';

export interface BusinessModel {
  id: BusinessModelId;
  name: string;
  tagline: string;
  description: string;
  pros: string[];
  cons: string[];
  image: string;
  basePrice: number; // so'm
  baseCostPerCup: number;
  initialReputation: number;
  baseMonthlyDemand: number;
  marginMultiplier: number;
  capacitySensitivity: number; // how sensitive to queues
}

export type StaffRole = 'barista' | 'cashier' | 'cleaner' | 'manager';

export interface StaffMember {
  role: StaffRole;
  title: string;
  count: number;
  salary: number; // monthly so'm per person
  capacityPerPerson: number; // customers or operations handled
  description: string;
  effect: string;
}

export interface BonusItem {
  id: string;
  name: string;
  category: 'menu' | 'service' | 'expansion';
  icon: string;
  cost: number; // capital needed to purchase
  monthlyExpense: number; // recurring cost
  addedRevenuePerMonth: number; // expected baseline boost
  minCapitalRequired: number;
  minMonthlyProfitRequired: number;
  minReputationRequired: number;
  minCustomersRequired: number;
  description: string;
  effectDescription: string;
  staffRequirement?: {
    role: StaffRole;
    count: number;
  };
}

export type PromotionId =
  | 'none'
  | 'discount'
  | 'gift'
  | 'combo'
  | 'one_plus_one'
  | 'holiday'
  | 'friend'
  | 'loyalty_cashback';

export interface Promotion {
  id: PromotionId;
  name: string;
  cost: number; // upfront marketing cost
  customerBoostPercent: number; // % increase in customers
  marginImpactPercent: number; // impact on per-cup profit
  staffLoadMultiplier: number; // strain on staff
  reputationBoost: number;
  description: string;
  riskNote: string;
}

export interface GameEventChoice {
  text: string;
  description: string;
  costSoM: number;
  reputationDelta: number;
  customerDeltaPercent: number;
  satisfactionDelta: number;
  riskDelta: number; // -2 to +2
  memoryTag?: string;
  advisorFeedback: string;
}

export interface GameEvent {
  id: string;
  month: number;
  title: string;
  subtitle: string;
  situation: string;
  termizContext: string;
  choices: GameEventChoice[];
}

export interface MonthNews {
  month: number;
  headline: string;
  snippet: string;
  category: 'ob-havo' | 'iqtisod' | 'raqobat' | 'shahar' | 'trend';
  strategicTip: string;
}

export interface CompetitorState {
  name: string;
  marketShare: number; // percentage
  strategy: string;
  recentAction: string;
  pricePerCup: number;
  reputation: number;
}

export interface PlayerProfile {
  firstName: string;
  lastName: string;
  groupOrClass: string;
  businessName: string;
  modelId: BusinessModelId;
  startedAt: string;
}

export interface MonthlyRecord {
  month: number;
  revenue: number;
  expenses: {
    rent: number;
    salaries: number;
    inventory: number;
    marketing: number;
    loanInterest: number;
    bonusMaintenance: number;
    misc: number;
    total: number;
  };
  netProfit: number;
  endingCapital: number;
  customers: number;
  customerCapacity: number;
  isOverloaded: boolean;
  satisfaction: number;
  reputation: number;
  riskLevel: 'Past' | 'O‘rtacha' | 'Yuqori' | 'Kritik';
  eventTitle?: string;
  chosenEventChoice?: string;
  activePromotion: string;
  coffeeQualityTier: string;
}

export interface ScoreBreakdown {
  profitScore: number; // max 30
  decisionScore: number; // max 25
  growthScore: number; // max 20
  reputationScore: number; // max 15
  riskScore: number; // max 10
  totalScore: number; // max 100
  archetype: {
    title: string;
    description: string;
    icon: string;
    strengths: string[];
    improvements: string[];
  };
}

export interface TournamentParticipant {
  id: string;
  rank: number;
  playerName: string;
  businessName: string;
  groupOrClass: string;
  modelName: string;
  finalCapital: number;
  totalProfit: number;
  totalCustomers: number;
  reputation: number;
  totalScore: number;
  categoryAward?: 'strategy' | 'sustainability' | 'overall';
  archetypeTitle: string;
  isCurrentPlayer?: boolean;
}
