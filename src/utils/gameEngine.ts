import {
  BusinessModel,
  StaffMember,
  BonusItem,
  Promotion,
  GameEventChoice,
  MonthlyRecord,
  ScoreBreakdown,
  CompetitorState
} from '../types/game';
import { BONUS_ITEMS } from '../data/gameContent';

export interface MonthInputState {
  month: number;
  currentCapital: number;
  model: BusinessModel;
  staff: StaffMember[];
  unlockedBonusIds: string[];
  activePromotion: Promotion;
  priceStrategy: 'budget' | 'balanced' | 'premium';
  qualityTier: 'standard' | 'specialty' | 'premium_blend';
  marketingBudget: number; // e.g. 0, 3000000, 7000000, 15000000
  eventChoice?: GameEventChoice;
  currentReputation: number;
  hasBankLoan: boolean;
  hasEquityInvestor: boolean;
  staffTrainedCount: number;
  memoryTags: string[];
  competitor: CompetitorState;
}

export interface MonthResult {
  record: MonthlyRecord;
  newCapital: number;
  newReputation: number;
  newSatisfaction: number;
  newCompetitor: CompetitorState;
  overloadWarning?: string;
  profitTriggerQuestion?: 'hire' | 'fire' | null;
}

export function calculateMonthSimulation(input: MonthInputState): MonthResult {
  const {
    month,
    currentCapital,
    model,
    staff,
    unlockedBonusIds,
    activePromotion,
    priceStrategy,
    qualityTier,
    marketingBudget,
    eventChoice,
    currentReputation,
    hasBankLoan,
    hasEquityInvestor
  } = input;

  // 1. Staff capacity breakdown
  const baristas = staff.find((s) => s.role === 'barista')?.count || 0;
  const cashiers = staff.find((s) => s.role === 'cashier')?.count || 0;
  const cleaners = staff.find((s) => s.role === 'cleaner')?.count || 0;
  const managers = staff.find((s) => s.role === 'manager')?.count || 0;

  const baristaCapacity = baristas * 1800;
  const cashierCapacity = cashiers * 3600;
  const effectiveCapacity = Math.min(baristaCapacity, cashierCapacity > 0 ? cashierCapacity : 1000);

  // 2. Pricing & Quality modifiers
  let priceMultiplier = 1.0;
  let demandPriceMultiplier = 1.0;
  if (priceStrategy === 'budget') {
    priceMultiplier = 0.85; // 15% discount
    demandPriceMultiplier = 1.25; // +25% customers
  } else if (priceStrategy === 'premium') {
    priceMultiplier = 1.25; // +25% price
    demandPriceMultiplier = 0.82; // -18% customers
  }

  let costPerCupMultiplier = 1.0;
  let qualityRepBonus = 0;
  let qualitySatisfactionBonus = 0;
  if (qualityTier === 'specialty') {
    costPerCupMultiplier = 1.22;
    qualityRepBonus = 1.5;
    qualitySatisfactionBonus = 4;
  } else if (qualityTier === 'premium_blend') {
    costPerCupMultiplier = 1.45;
    qualityRepBonus = 3;
    qualitySatisfactionBonus = 8;
  }

  // 3. Customer demand calculation
  const repFactor = (currentReputation / 65);
  let baseDemand = model.baseMonthlyDemand * repFactor;

  // Marketing boost
  const marketingBoostPercent = marketingBudget === 0 ? 0 : marketingBudget === 3000000 ? 15 : marketingBudget === 7000000 ? 32 : 55;

  // Promotion boost
  const promoBoost = activePromotion.customerBoostPercent;

  // Event choice customer delta
  const eventCustomerDelta = eventChoice ? eventChoice.customerDeltaPercent : 0;

  // Seasonality factor (Termiz climate: M4-5 Spring peak, M6-7 extreme heat, M12 holiday rush)
  let seasonModifier = 1.0;
  if (month === 4) seasonModifier = 1.2; // Festival
  if (month === 5) seasonModifier = 1.15; // TerDU students
  if (month === 6 || month === 7) {
    // Extreme heat: if cold drinks unlocked, big boost; else slump
    seasonModifier = unlockedBonusIds.includes('cold_drinks') ? 1.35 : 0.8;
  }
  if (month === 11) seasonModifier = 0.95;
  if (month === 12) seasonModifier = 1.3; // New Year rush

  const totalDemand = Math.round(
    baseDemand *
      demandPriceMultiplier *
      (1 + (marketingBoostPercent + promoBoost + eventCustomerDelta) / 100) *
      seasonModifier
  );

  // 4. Overload and Served customers
  const isOverloaded = totalDemand > effectiveCapacity && effectiveCapacity > 0;
  let customersServed = totalDemand;
  let satisfaction = 82; // baseline

  if (isOverloaded) {
    const overloadRatio = totalDemand / effectiveCapacity;
    // can only serve up to 15% stretch beyond capacity with high stress
    customersServed = Math.min(totalDemand, Math.round(effectiveCapacity * 1.15));
    satisfaction -= Math.min(35, Math.round((overloadRatio - 1) * 50));
  } else {
    // healthy capacity
    satisfaction += 5;
  }

  // Cleaner effect on satisfaction
  if (cleaners === 0) {
    satisfaction -= 15;
  } else if (cleaners >= 2) {
    satisfaction += 4;
  }

  // Quality satisfaction effect
  satisfaction += qualitySatisfactionBonus;

  // Event choice satisfaction effect
  if (eventChoice) {
    satisfaction += eventChoice.satisfactionDelta;
  }

  satisfaction = Math.max(20, Math.min(99, satisfaction));

  // 5. Unlocked bonuses effects
  const activeBonuses = BONUS_ITEMS.filter((b) => unlockedBonusIds.includes(b.id));
  const bonusAddedRevenue = activeBonuses.reduce((acc, b) => acc + b.addedRevenuePerMonth, 0);
  const bonusMaintenance = activeBonuses.reduce((acc, b) => acc + b.monthlyExpense, 0);

  // 6. Financials: Revenue & Expenses
  const effectivePricePerCup = Math.round(model.basePrice * priceMultiplier * (1 + activePromotion.marginImpactPercent / 100));
  const rawBeverageRevenue = customersServed * effectivePricePerCup;
  const totalRevenue = rawBeverageRevenue + bonusAddedRevenue;

  // Rent: Base 8 mln + second branch rent if unlocked
  let rentExpense = 8000000;
  if (unlockedBonusIds.includes('second_branch')) {
    rentExpense += 14000000;
  }

  // Staff salaries
  const salariesExpense = staff.reduce((acc, s) => acc + s.count * s.salary, 0);

  // Raw materials (beans, milk, syrups)
  const unitCost = Math.round(model.baseCostPerCup * costPerCupMultiplier);
  const inventoryExpense = customersServed * unitCost;

  // Marketing expense
  const totalMarketingExpense = marketingBudget + activePromotion.cost;

  // Loan interest
  const loanInterestExpense = hasBankLoan ? 1500000 : 0;

  // Manager efficiency saving
  let operationExpenseSubtotal = rentExpense + inventoryExpense + bonusMaintenance;
  if (managers > 0) {
    operationExpenseSubtotal = Math.round(operationExpenseSubtotal * 0.9); // -10% savings
  }

  const miscExpenses = 1500000; // Utilities, water, cleaning products

  // Event one-time cost
  const eventCost = eventChoice ? eventChoice.costSoM : 0;

  const totalMonthlyExpenses =
    salariesExpense +
    operationExpenseSubtotal +
    totalMarketingExpense +
    loanInterestExpense +
    miscExpenses;

  let netOperatingProfit = totalRevenue - totalMonthlyExpenses;

  // If equity investor exists, they take 20% of positive profits
  if (hasEquityInvestor && netOperatingProfit > 0) {
    netOperatingProfit = Math.round(netOperatingProfit * 0.8);
  }

  // Ending capital: previous capital + operating profit - event one-time cost (if positive cost) or + (if negative cost/cash injection)
  const endingCapital = currentCapital + netOperatingProfit - eventCost;

  // 7. Reputation evolution
  let repDelta = 0;
  if (satisfaction >= 85) repDelta += 2;
  else if (satisfaction < 65) repDelta -= 4;

  if (isOverloaded) repDelta -= 3;
  repDelta += qualityRepBonus;
  repDelta += activePromotion.reputationBoost;
  if (eventChoice) repDelta += eventChoice.reputationDelta;

  const newReputation = Math.max(15, Math.min(100, Math.round(currentReputation + repDelta)));

  // 8. Risk Level
  let riskLevel: 'Past' | 'O‘rtacha' | 'Yuqori' | 'Kritik' = 'Past';
  if (endingCapital < 0) {
    riskLevel = 'Kritik';
  } else if (endingCapital < 15000000 || netOperatingProfit < -3000000) {
    riskLevel = 'Yuqori';
  } else if (endingCapital < 40000000 || isOverloaded) {
    riskLevel = 'O‘rtacha';
  }

  // 9. Competitor Reaction
  const newCompetitor = { ...input.competitor };
  if (priceStrategy === 'budget' || activePromotion.id === 'one_plus_one') {
    newCompetitor.recentAction = 'Sizning aksiyangizga javoban Surxon Coffee o‘z menyusiga bepul pishiriqlar qo‘shdi.';
    newCompetitor.marketShare = Math.max(25, newCompetitor.marketShare - 2);
  } else if (qualityTier === 'premium_blend') {
    newCompetitor.recentAction = 'Surxon Coffee o‘z xomashyosini ham Italiya standartiga moslashtirishga urinmoqda.';
  } else if (isOverloaded) {
    newCompetitor.recentAction = 'Sizdagi uzun navbat tufayli norozi mijozlarning bir qismi Surxon Coffee tomon o‘tdi.';
    newCompetitor.marketShare = Math.min(50, newCompetitor.marketShare + 3);
  } else {
    newCompetitor.recentAction = 'Raqobatchi barqaror rejimda o‘z doimiy mijozlariga xizmat ko‘rsatmoqda.';
  }

  // 10. Profit triggers
  let profitTriggerQuestion: 'hire' | 'fire' | null = null;
  if (isOverloaded || (netOperatingProfit > 12000000 && totalDemand > effectiveCapacity * 0.9)) {
    profitTriggerQuestion = 'hire';
  } else if (netOperatingProfit < -2000000 && endingCapital < 35000000) {
    profitTriggerQuestion = 'fire';
  }

  const record: MonthlyRecord = {
    month,
    revenue: totalRevenue,
    expenses: {
      rent: rentExpense,
      salaries: salariesExpense,
      inventory: inventoryExpense,
      marketing: totalMarketingExpense,
      loanInterest: loanInterestExpense,
      bonusMaintenance,
      misc: miscExpenses,
      total: totalMonthlyExpenses
    },
    netProfit: netOperatingProfit,
    endingCapital,
    customers: customersServed,
    customerCapacity: effectiveCapacity,
    isOverloaded,
    satisfaction,
    reputation: newReputation,
    riskLevel,
    eventTitle: eventChoice ? input.eventChoice?.description : undefined,
    chosenEventChoice: eventChoice ? eventChoice.text : undefined,
    activePromotion: activePromotion.name,
    coffeeQualityTier: qualityTier
  };

  return {
    record,
    newCapital: endingCapital,
    newReputation,
    newSatisfaction: satisfaction,
    newCompetitor,
    overloadWarning: isOverloaded
      ? `Diqqat: ${totalDemand} nafar mijoz keldi, ammo xodimlaringiz quvvati ${effectiveCapacity} ga yetdi. Uzun navbat tufayli mijozlar qoniqishi pasaydi!`
      : undefined,
    profitTriggerQuestion
  };
}

export function evaluateFinalScore(records: MonthlyRecord[], finalCapital: number): ScoreBreakdown {
  const totalNetProfit = records.reduce((acc, r) => acc + r.netProfit, 0);
  const avgReputation = records.reduce((acc, r) => acc + r.reputation, 0) / (records.length || 1);
  const finalReputation = records[records.length - 1]?.reputation || 60;
  const avgSatisfaction = records.reduce((acc, r) => acc + r.satisfaction, 0) / (records.length || 1);

  // 1. Profit Score (max 30)
  // Starting capital was 150 mln. If final capital >= 250 mln => 30 points.
  let profitScore = 0;
  if (finalCapital >= 300000000) profitScore = 30;
  else if (finalCapital >= 250000000) profitScore = 28;
  else if (finalCapital >= 200000000) profitScore = 25;
  else if (finalCapital >= 160000000) profitScore = 21;
  else if (finalCapital >= 130000000) profitScore = 17;
  else if (finalCapital >= 100000000) profitScore = 12;
  else if (finalCapital >= 50000000) profitScore = 8;
  else profitScore = 3;

  // 2. Decision Score (max 25)
  // Evaluates event decisions and avoiding chronic overload
  const overloadedMonthsCount = records.filter((r) => r.isOverloaded).length;
  let decisionScore = 22;
  if (overloadedMonthsCount === 0) decisionScore += 3;
  else if (overloadedMonthsCount <= 2) decisionScore -= 2;
  else decisionScore -= 6;

  if (avgSatisfaction >= 88) decisionScore += 2;
  else if (avgSatisfaction < 70) decisionScore -= 4;
  decisionScore = Math.max(5, Math.min(25, decisionScore));

  // 3. Sustainable Growth Score (max 20)
  // Evaluates revenue trajectory from M1 to M12
  const m1Rev = records[0]?.revenue || 1;
  const m12Rev = records[records.length - 1]?.revenue || 1;
  const growthRatio = m12Rev / m1Rev;
  let growthScore = 14;
  if (growthRatio >= 2.0) growthScore = 20;
  else if (growthRatio >= 1.5) growthScore = 18;
  else if (growthRatio >= 1.2) growthScore = 15;
  else if (growthRatio >= 1.0) growthScore = 12;
  else growthScore = 7;

  // 4. Reputation & Brand (max 15)
  let reputationScore = Math.round((finalReputation / 100) * 15);
  reputationScore = Math.max(3, Math.min(15, reputationScore));

  // 5. Risk Management (max 10)
  let riskScore = 10;
  const hasCriticalRisk = records.some((r) => r.riskLevel === 'Kritik');
  const highRiskCount = records.filter((r) => r.riskLevel === 'Yuqori').length;
  if (hasCriticalRisk) riskScore -= 6;
  if (highRiskCount > 2) riskScore -= 3;
  if (finalCapital < 30000000) riskScore -= 2;
  riskScore = Math.max(2, Math.min(10, riskScore));

  const totalScore = Math.min(100, Math.round(profitScore + decisionScore + growthScore + reputationScore + riskScore));

  // Determine Archetype
  let archetype = {
    title: '🧠 Strategik Tadbirkor',
    description: 'Siz qarorlarni muvozanatli, uzoq muddatli reja va tahlil asosida qabul qilasiz. Jamoa va daromad uyg‘unligi sizning asosiy kuchingiz.',
    icon: 'brain',
    strengths: ['Risklarni chuqur baholash', 'Xodimlar quvvatini to‘g‘ri taqsimlash', 'Barqaror o‘sish'],
    improvements: ['Ba\'zan agressivroq marketing bilan yanada ko‘proq kassa qilish mumkin']
  };

  if (finalReputation >= 85 && avgSatisfaction >= 88) {
    archetype = {
      title: '💎 Premium Strateg',
      description: 'Siz uchun sifat va brend obro‘si har narsadan ustun. Termizning eng nufuzli mehmonlari aynan sizning qahvaxonangizni tanlaydi.',
      icon: 'gem',
      strengths: ['Oliy sifat standarti', 'Yuqori mijozlar sadoqati', 'Kuchli brend qimmati'],
      improvements: ['Massiv mijozlar oqimi uchun qo‘shimcha mahsulot liniyalarini qo‘shish']
    };
  } else if (growthRatio >= 1.8 && totalNetProfit >= 80000000) {
    archetype = {
      title: '📈 O‘sishga Yo‘naltirilgan Lider',
      description: 'Har oy yangi cho‘qqilarni zabt etish sizning shioringiz. Katta savdo aylanmasi, yangi filial va yangi xizmatlar orqali bozorni egalladingiz.',
      icon: 'trending-up',
      strengths: ['Tez kengayish', 'Katta aylanma kassa', 'Imkoniyatlarni zudlik bilan qo‘lga kiritish'],
      improvements: ['Katta o‘sish paytida operatsion xarajatlarni qat\'iyroq jilovlash']
    };
  } else if (overloadedMonthsCount <= 1 && riskScore >= 9 && finalCapital >= 180000000) {
    archetype = {
      title: '🛡️ Ehtiyotkor Biznesmen',
      description: 'Xavfsizlik, ishonchli zaxira va xavfsiz qadamlar ustasi. Hech qanday bo‘ron yoki krizis sizning biznesingizni larzaga keltira olmadi.',
      icon: 'shield-check',
      strengths: ['Mukammal pul zaxirasi', 'Qarzlardan xoli mustaqil kassa', 'Minimal moliyaviy xavf'],
      improvements: ['Katta daromadli aksiyalar va sarmoyalarga jasurroq kirishish']
    };
  } else if (records.some((r) => r.activePromotion !== 'Maxsus aksiya yo‘q')) {
    archetype = {
      title: '⚡ Tezkor Tadbirkor',
      description: 'Bozor chaqiruvlariga chaqqon javob qaytarasiz, aksiyalar va ommaviy takliflar orqali mijozlar qalbini zabt etasiz.',
      icon: 'zap',
      strengths: ['Tezkor marketing harakatlari', 'Katta mijozlar qamrovi', 'Bozor dinamikasini his qilish'],
      improvements: ['Katta aksiyalarda xodimlar yuklamasini oldindan hisobga olish']
    };
  }

  return {
    profitScore,
    decisionScore,
    growthScore,
    reputationScore,
    riskScore,
    totalScore,
    archetype
  };
}

export function formatSoM(amount: number): string {
  return new Intl.NumberFormat('uz-UZ').format(Math.round(amount)) + " so'm";
}
