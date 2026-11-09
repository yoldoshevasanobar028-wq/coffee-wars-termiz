/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  PlayerProfile,
  BusinessModel,
  StaffMember,
  StaffRole,
  BonusItem,
  PromotionId,
  GameEvent,
  GameEventChoice,
  MonthlyRecord,
  ScoreBreakdown,
  CompetitorState
} from './types/game';
import {
  BUSINESS_MODELS,
  INITIAL_STAFF,
  GAME_EVENTS,
  PROMOTIONS,
  INITIAL_COMPETITOR
} from './data/gameContent';
import { calculateMonthSimulation, evaluateFinalScore } from './utils/gameEngine';
import { savePlayerToLeaderboard, getLeaderboard } from './utils/leaderboard';
import { soundManager } from './utils/audio';

import { Header, TabType } from './components/Header';
import { RegistrationModal } from './components/RegistrationModal';
import { DashboardView } from './components/DashboardView';
import { StaffManagementView } from './components/StaffModal';
import { DecisionsPanel } from './components/DecisionsPanel';
import { AdvisorsModal } from './components/AdvisorsModal';
import { LeaderboardView } from './components/LeaderboardView';
import { EventModal } from './components/EventModal';
import { MonthSummaryModal } from './components/MonthSummaryModal';
import { FinalReportView } from './components/FinalReportView';

const MAX_MONTHS = 12;

type GameState = 'REGISTRATION' | 'PLAYING' | 'EVENT' | 'MONTH_SUMMARY' | 'FINAL_REPORT';

export default function App() {
  // Game session states
  const [gameState, setGameState] = useState<GameState>('REGISTRATION');
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');

  const [profile, setProfile] = useState<PlayerProfile | null>(null);
  const [currentMonth, setCurrentMonth] = useState<number>(1);
  const [capital, setCapital] = useState<number>(150000000); // 150 mln so'm
  const [reputation, setReputation] = useState<number>(60);
  const [staff, setStaff] = useState<StaffMember[]>(INITIAL_STAFF);
  const [staffTrainedCount, setStaffTrainedCount] = useState<number>(0);

  // Operational Settings
  const [qualityTier, setQualityTier] = useState<'standard' | 'specialty' | 'premium_blend'>('standard');
  const [priceStrategy, setPriceStrategy] = useState<'budget' | 'balanced' | 'premium'>('balanced');
  const [marketingBudget, setMarketingBudget] = useState<number>(0);
  const [activePromotionId, setActivePromotionId] = useState<PromotionId>('none');
  const [unlockedBonusIds, setUnlockedBonusIds] = useState<string[]>([]);

  // Simulation Memory & Flags
  const [hasBankLoan, setHasBankLoan] = useState<boolean>(false);
  const [hasEquityInvestor, setHasEquityInvestor] = useState<boolean>(false);
  const [memoryTags, setMemoryTags] = useState<string[]>([]);
  const [competitor, setCompetitor] = useState<CompetitorState>(INITIAL_COMPETITOR);

  // Monthly Records & Simulation Interim
  const [records, setRecords] = useState<MonthlyRecord[]>([]);
  const [currentEvent, setCurrentEvent] = useState<GameEvent | null>(null);
  const [lastMonthResultRecord, setLastMonthResultRecord] = useState<MonthlyRecord | null>(null);
  const [overloadWarning, setOverloadWarning] = useState<string | undefined>(undefined);
  const [profitTriggerQuestion, setProfitTriggerQuestion] = useState<'hire' | 'fire' | null>(null);

  // Final Evaluation
  const [finalScores, setFinalScores] = useState<ScoreBreakdown | null>(null);
  const [finalRank, setFinalRank] = useState<number | undefined>(undefined);

  // Load saved session if exists
  useEffect(() => {
    try {
      const saved = localStorage.getItem('coffee_wars_session');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.profile) {
          setProfile(parsed.profile);
          setGameState(parsed.gameState || 'PLAYING');
          setCurrentMonth(parsed.currentMonth || 1);
          setCapital(parsed.capital ?? 150000000);
          setReputation(parsed.reputation ?? 60);
          setStaff(parsed.staff || INITIAL_STAFF);
          setStaffTrainedCount(parsed.staffTrainedCount || 0);
          setQualityTier(parsed.qualityTier || 'standard');
          setPriceStrategy(parsed.priceStrategy || 'balanced');
          setMarketingBudget(parsed.marketingBudget || 0);
          setActivePromotionId(parsed.activePromotionId || 'none');
          setUnlockedBonusIds(parsed.unlockedBonusIds || []);
          setHasBankLoan(parsed.hasBankLoan || false);
          setHasEquityInvestor(parsed.hasEquityInvestor || false);
          setMemoryTags(parsed.memoryTags || []);
          setCompetitor(parsed.competitor || INITIAL_COMPETITOR);
          setRecords(parsed.records || []);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  // Save progress on state change
  useEffect(() => {
    if (profile && gameState !== 'REGISTRATION') {
      try {
        const payload = {
          profile,
          gameState,
          currentMonth,
          capital,
          reputation,
          staff,
          staffTrainedCount,
          qualityTier,
          priceStrategy,
          marketingBudget,
          activePromotionId,
          unlockedBonusIds,
          hasBankLoan,
          hasEquityInvestor,
          memoryTags,
          competitor,
          records
        };
        localStorage.setItem('coffee_wars_session', JSON.stringify(payload));
      } catch {
        // storage quota
      }
    }
  }, [
    profile,
    gameState,
    currentMonth,
    capital,
    reputation,
    staff,
    staffTrainedCount,
    qualityTier,
    priceStrategy,
    marketingBudget,
    activePromotionId,
    unlockedBonusIds,
    hasBankLoan,
    hasEquityInvestor,
    memoryTags,
    competitor,
    records
  ]);

  const currentModel = BUSINESS_MODELS.find((m) => m.id === profile?.modelId) || BUSINESS_MODELS[0];
  const activePromo = PROMOTIONS.find((p) => p.id === activePromotionId) || PROMOTIONS[0];

  // 1. Start Game from Registration
  const handleStartGame = (newProfile: PlayerProfile) => {
    const selectedModel = BUSINESS_MODELS.find((m) => m.id === newProfile.modelId) || BUSINESS_MODELS[0];
    setProfile(newProfile);
    setCapital(150000000); // 150 mln so'm initial capital
    setReputation(selectedModel.initialReputation);
    setStaff(INITIAL_STAFF);
    setStaffTrainedCount(0);
    setCurrentMonth(1);
    setRecords([]);
    setUnlockedBonusIds([]);
    setActivePromotionId('none');
    setQualityTier('standard');
    setPriceStrategy('balanced');
    setMarketingBudget(0);
    setHasBankLoan(false);
    setHasEquityInvestor(false);
    setMemoryTags([]);
    setCompetitor(INITIAL_COMPETITOR);
    setGameState('PLAYING');
    setActiveTab('dashboard');
  };

  // 2. Restart Game
  const handleRestart = () => {
    localStorage.removeItem('coffee_wars_session');
    setProfile(null);
    setGameState('REGISTRATION');
    setCurrentMonth(1);
    setCapital(150000000);
    setStaff(INITIAL_STAFF);
    setRecords([]);
    setUnlockedBonusIds([]);
    setFinalScores(null);
  };

  // 3. Staff count change
  const handleUpdateStaffCount = (role: StaffRole, delta: number) => {
    setStaff((prev) =>
      prev.map((s) => {
        if (s.role === role) {
          const newCount = Math.max(0, s.count + delta);
          return { ...s, count: newCount };
        }
        return s;
      })
    );
  };

  // 4. Staff training
  const handleTrainStaff = () => {
    if (capital < 3000000) return;
    setCapital((prev) => prev - 3000000);
    setStaffTrainedCount((prev) => prev + 1);
    setReputation((prev) => Math.min(100, prev + 2));
  };

  // 5. Unlock Bonus Item
  const handleUnlockBonus = (bonus: BonusItem) => {
    if (capital < bonus.cost || unlockedBonusIds.includes(bonus.id)) return;
    setCapital((prev) => prev - bonus.cost);
    setUnlockedBonusIds((prev) => [...prev, bonus.id]);
    setReputation((prev) => Math.min(100, prev + 3));
  };

  // 6. User initiates Month End Calculation
  const handleTriggerMonthEnd = () => {
    // Check if there is an unexpected event for current month
    const monthEvent = GAME_EVENTS.find((e) => e.month === currentMonth);
    if (monthEvent) {
      setCurrentEvent(monthEvent);
      setGameState('EVENT');
    } else {
      // Simulate without event choice
      executeMonthSimulation();
    }
  };

  // 7. When player picks a choice in the Event Modal
  const handleSelectEventChoice = (choice: GameEventChoice) => {
    // If choice has memory tags or financial flags
    if (choice.memoryTag) {
      setMemoryTags((prev) => [...prev, choice.memoryTag!]);
      if (choice.memoryTag === 'took_bank_loan' || choice.memoryTag === 'took_partial_loan') {
        setHasBankLoan(true);
      }
      if (choice.memoryTag === 'accepted_equity_investor') {
        setHasEquityInvestor(true);
      }
    }

    executeMonthSimulation(choice);
  };

  // 8. Core simulation execution
  const executeMonthSimulation = (eventChoice?: GameEventChoice) => {
    const result = calculateMonthSimulation({
      month: currentMonth,
      currentCapital: capital,
      model: currentModel,
      staff,
      unlockedBonusIds,
      activePromotion: activePromo,
      priceStrategy,
      qualityTier,
      marketingBudget,
      eventChoice,
      currentReputation: reputation,
      hasBankLoan,
      hasEquityInvestor,
      staffTrainedCount,
      memoryTags,
      competitor
    });

    setCapital(result.newCapital);
    setReputation(result.newReputation);
    setCompetitor(result.newCompetitor);
    setLastMonthResultRecord(result.record);
    setOverloadWarning(result.overloadWarning);
    setProfitTriggerQuestion(result.profitTriggerQuestion || null);

    const updatedRecords = [...records, result.record];
    setRecords(updatedRecords);

    // Show summary modal
    setGameState('MONTH_SUMMARY');
  };

  // 9. Advance to Next Month or Final Report
  const handleAdvanceNextMonth = () => {
    if (currentMonth < MAX_MONTHS) {
      setCurrentMonth((prev) => prev + 1);
      setGameState('PLAYING');
      setActiveTab('dashboard');
    } else {
      // 12 Months completed! Compute final evaluation and save to tournament leaderboard
      const evaluation = evaluateFinalScore(records, capital);
      setFinalScores(evaluation);

      if (profile) {
        const participantRecord = {
          id: `player_${Date.now()}`,
          playerName: `${profile.firstName} ${profile.lastName}`,
          businessName: profile.businessName,
          groupOrClass: profile.groupOrClass,
          modelName: currentModel.name,
          finalCapital: capital,
          totalProfit: records.reduce((acc, r) => acc + r.netProfit, 0),
          totalCustomers: records.reduce((acc, r) => acc + r.customers, 0),
          reputation,
          totalScore: evaluation.totalScore,
          archetypeTitle: evaluation.archetype.title,
          isCurrentPlayer: true
        };

        const updatedLeaderboard = savePlayerToLeaderboard(participantRecord);
        const myRank = updatedLeaderboard.find((p) => p.isCurrentPlayer)?.rank;
        setFinalRank(myRank);
      }

      soundManager.playSuccess();
      setGameState('FINAL_REPORT');
    }
  };

  // If still on registration screen
  if (gameState === 'REGISTRATION' || !profile) {
    return <RegistrationModal onStartGame={handleStartGame} />;
  }

  const latestRecord = records[records.length - 1];

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans selection:bg-amber-600 selection:text-white">
      {/* Top Header Contract */}
      <Header
        currentMonth={currentMonth}
        maxMonths={MAX_MONTHS}
        businessName={profile.businessName}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onRestart={handleRestart}
        isGameFinished={gameState === 'FINAL_REPORT'}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        {(gameState === 'FINAL_REPORT' || activeTab === 'report') && finalScores ? (
          <FinalReportView
            profile={profile}
            finalCapital={capital}
            records={records}
            scores={finalScores}
            staff={staff}
            unlockedBonusIds={unlockedBonusIds}
            rankPosition={finalRank}
            onViewLeaderboard={() => {
              setActiveTab('leaderboard');
              setGameState('PLAYING');
            }}
            onRestart={handleRestart}
          />
        ) : (
          <>
            {activeTab === 'dashboard' && (
              <DashboardView
                currentMonth={currentMonth}
                maxMonths={MAX_MONTHS}
                currentCapital={capital}
                reputation={reputation}
                model={currentModel}
                staff={staff}
                unlockedBonusIds={unlockedBonusIds}
                competitor={competitor}
                lastRecord={latestRecord}
                onSimulateMonth={handleTriggerMonthEnd}
                onNavigateTab={(tab) => {
                  soundManager.playClick();
                  setActiveTab(tab);
                }}
                priceStrategy={priceStrategy}
                qualityTier={qualityTier}
                activePromotionName={activePromo.name}
              />
            )}

            {activeTab === 'staff' && (
              <StaffManagementView
                staff={staff}
                onUpdateStaffCount={handleUpdateStaffCount}
                onTrainStaff={handleTrainStaff}
                currentCapital={capital}
                expectedCustomers={currentModel.baseMonthlyDemand}
                staffTrainedCount={staffTrainedCount}
              />
            )}

            {activeTab === 'decisions' && (
              <DecisionsPanel
                currentCapital={capital}
                currentReputation={reputation}
                lastMonthlyProfit={latestRecord?.netProfit || 0}
                lastCustomers={latestRecord?.customers || currentModel.baseMonthlyDemand}
                qualityTier={qualityTier}
                setQualityTier={setQualityTier}
                priceStrategy={priceStrategy}
                setPriceStrategy={setPriceStrategy}
                marketingBudget={marketingBudget}
                setMarketingBudget={setMarketingBudget}
                activePromotionId={activePromotionId}
                setActivePromotionId={setActivePromotionId}
                unlockedBonusIds={unlockedBonusIds}
                onUnlockBonus={handleUnlockBonus}
              />
            )}

            {activeTab === 'advisors' && (
              <AdvisorsModal
                currentMonth={currentMonth}
                currentCapital={capital}
                reputation={reputation}
                model={currentModel}
                lastRecord={latestRecord}
                hasOverload={Boolean(latestRecord?.isOverloaded)}
              />
            )}

            {activeTab === 'leaderboard' && (
              <LeaderboardView
                currentPlayerId="player_current"
                onViewReport={
                  finalScores
                    ? () => {
                        setActiveTab('report');
                        setGameState('FINAL_REPORT');
                      }
                    : undefined
                }
              />
            )}
          </>
        )}
      </main>

      {/* Monthly Unexpected Event Modal */}
      {gameState === 'EVENT' && currentEvent && (
        <EventModal
          event={currentEvent}
          currentCapital={capital}
          onSelectChoice={handleSelectEventChoice}
        />
      )}

      {/* Monthly Financial & Strategy Summary Modal */}
      {gameState === 'MONTH_SUMMARY' && lastMonthResultRecord && (
        <MonthSummaryModal
          record={lastMonthResultRecord}
          month={currentMonth}
          onNextMonth={handleAdvanceNextMonth}
          onOpenStaffModal={() => {
            setGameState('PLAYING');
            setActiveTab('staff');
          }}
          profitTriggerQuestion={profitTriggerQuestion}
          overloadWarning={overloadWarning}
          isLastMonth={currentMonth === MAX_MONTHS}
        />
      )}
    </div>
  );
}
