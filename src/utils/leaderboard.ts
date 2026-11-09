import { TournamentParticipant } from '../types/game';

const STORAGE_KEY = 'coffee_wars_termiz_leaderboard';

// Initial roster of realistic Termiz participants in a 30-student competition
const DEFAULT_PARTICIPANTS: Omit<TournamentParticipant, 'rank'>[] = [
  {
    id: 'comp_1',
    playerName: 'Sardor Qodirov',
    businessName: 'Silk Road Espresso',
    groupOrClass: 'TerDU Iqtisodiyot 3-kurs',
    modelName: 'Klassik Kofexona',
    finalCapital: 278000000,
    totalProfit: 128000000,
    totalCustomers: 52400,
    reputation: 91,
    totalScore: 94,
    categoryAward: 'strategy',
    archetypeTitle: '🧠 Strategik Tadbirkor'
  },
  {
    id: 'comp_2',
    playerName: 'Kamola Alimova',
    businessName: 'Amudaryo Coffee House',
    groupOrClass: 'Termiz Prezident Maktabi 11-A',
    modelName: 'Premium Kofexona',
    finalCapital: 254000000,
    totalProfit: 104000000,
    totalCustomers: 41200,
    reputation: 94,
    totalScore: 91,
    categoryAward: 'sustainability',
    archetypeTitle: '💎 Premium Strateg'
  },
  {
    id: 'comp_3',
    playerName: 'Javohir Toshmatov',
    businessName: 'Surxon Fast Bean',
    groupOrClass: '1-sonli Akademik Litsey',
    modelName: 'Tez va Arzon',
    finalCapital: 242000000,
    totalProfit: 92000000,
    totalCustomers: 68900,
    reputation: 82,
    totalScore: 88,
    categoryAward: 'overall',
    archetypeTitle: '📈 O‘sishga Yo‘naltirilgan Lider'
  },
  {
    id: 'comp_4',
    playerName: 'Nilufar Yusupova',
    businessName: 'At-Termiziy Roasters',
    groupOrClass: 'TerDU Moliya 2-kurs',
    modelName: 'Obuna Modeli',
    finalCapital: 228000000,
    totalProfit: 78000000,
    totalCustomers: 46100,
    reputation: 88,
    totalScore: 86,
    archetypeTitle: '🛡️ Ehtiyotkor Biznesmen'
  },
  {
    id: 'comp_5',
    playerName: 'Bekzod Ergashev',
    businessName: 'Termiz Brew Lab',
    groupOrClass: 'Termiz PM 10-B',
    modelName: 'Klassik Kofexona',
    finalCapital: 215000000,
    totalProfit: 65000000,
    totalCustomers: 49800,
    reputation: 84,
    totalScore: 84,
    archetypeTitle: '🧠 Strategik Tadbirkor'
  },
  {
    id: 'comp_6',
    playerName: 'Shahnoza Bozorova',
    businessName: 'Zamon Cafe',
    groupOrClass: '11-maktab 11-sinf',
    modelName: 'Tez va Arzon',
    finalCapital: 204000000,
    totalProfit: 54000000,
    totalCustomers: 59300,
    reputation: 79,
    totalScore: 81,
    archetypeTitle: '⚡ Tezkor Tadbirkor'
  },
  {
    id: 'comp_7',
    playerName: 'Otabek Xolmirzayev',
    businessName: 'Oltin Finjon',
    groupOrClass: 'TerDU Menejment 3-kurs',
    modelName: 'Klassik Kofexona',
    finalCapital: 196000000,
    totalProfit: 46000000,
    totalCustomers: 44200,
    reputation: 81,
    totalScore: 79,
    archetypeTitle: '🛡️ Ehtiyotkor Biznesmen'
  },
  {
    id: 'comp_8',
    playerName: 'Gulnoza Mamatova',
    businessName: 'Baxshi Lounge',
    groupOrClass: 'Surxondaryo IT Park',
    modelName: 'Premium Kofexona',
    finalCapital: 191000000,
    totalProfit: 41000000,
    totalCustomers: 38400,
    reputation: 86,
    totalScore: 78,
    archetypeTitle: '💎 Premium Strateg'
  },
  {
    id: 'comp_9',
    playerName: 'Farrux Zokirov',
    businessName: 'Termiz Coffee Drive',
    groupOrClass: '1-sonli Akademik Litsey',
    modelName: 'Tez va Arzon',
    finalCapital: 184000000,
    totalProfit: 34000000,
    totalCustomers: 53100,
    reputation: 76,
    totalScore: 76,
    archetypeTitle: '⚡ Tezkor Tadbirkor'
  },
  {
    id: 'comp_10',
    playerName: 'Madina Boboyeva',
    businessName: 'Aroma Termiz',
    groupOrClass: 'TerDU Xorijiy Tillar 4-kurs',
    modelName: 'Obuna Modeli',
    finalCapital: 179000000,
    totalProfit: 29000000,
    totalCustomers: 41900,
    reputation: 83,
    totalScore: 74,
    archetypeTitle: '🧠 Strategik Tadbirkor'
  },
  {
    id: 'comp_11',
    playerName: 'Sherzod Norov',
    businessName: 'Shahriston Cafe',
    groupOrClass: 'Termiz Shahar 2-sonli maktab',
    modelName: 'Klassik Kofexona',
    finalCapital: 172000000,
    totalProfit: 22000000,
    totalCustomers: 43200,
    reputation: 77,
    totalScore: 72,
    archetypeTitle: '🛡️ Ehtiyotkor Biznesmen'
  },
  {
    id: 'comp_12',
    playerName: 'Rayhona Karimova',
    businessName: 'Kofe & Kitob',
    groupOrClass: 'Termiz Prezident Maktabi 10-A',
    modelName: 'Klassik Kofexona',
    finalCapital: 168000000,
    totalProfit: 18000000,
    totalCustomers: 39500,
    reputation: 82,
    totalScore: 71,
    archetypeTitle: '🧠 Strategik Tadbirkor'
  },
  {
    id: 'comp_13',
    playerName: 'Doston Samadov',
    businessName: 'Vokzal Express Coffee',
    groupOrClass: 'TerDU Muhandislik',
    modelName: 'Tez va Arzon',
    finalCapital: 163000000,
    totalProfit: 13000000,
    totalCustomers: 56200,
    reputation: 71,
    totalScore: 69,
    archetypeTitle: '⚡ Tezkor Tadbirkor'
  },
  {
    id: 'comp_14',
    playerName: 'Dildora Jo‘rayeva',
    businessName: 'Grand Surxon Cafe',
    groupOrClass: '11-maktab 10-B',
    modelName: 'Premium Kofexona',
    finalCapital: 159000000,
    totalProfit: 9000000,
    totalCustomers: 34100,
    reputation: 78,
    totalScore: 67,
    archetypeTitle: '💎 Premium Strateg'
  },
  {
    id: 'comp_15',
    playerName: 'Ulug‘bek Qosimov',
    businessName: 'Kofe Club 724',
    groupOrClass: 'Surxondaryo Yoshlar Markazi',
    modelName: 'Obuna Modeli',
    finalCapital: 154000000,
    totalProfit: 4000000,
    totalCustomers: 38600,
    reputation: 74,
    totalScore: 65,
    archetypeTitle: '🧠 Strategik Tadbirkor'
  },
  {
    id: 'comp_16',
    playerName: 'Shahzod Ochilov',
    businessName: 'Start Coffee',
    groupOrClass: 'TerDU Axborot Texnologiyalari',
    modelName: 'Klassik Kofexona',
    finalCapital: 147000000,
    totalProfit: -3000000,
    totalCustomers: 41000,
    reputation: 72,
    totalScore: 63,
    archetypeTitle: '⚡ Tezkor Tadbirkor'
  },
  {
    id: 'comp_17',
    playerName: 'Nargiza Hamroyeva',
    businessName: 'Chorbog‘ Qahvaxonasi',
    groupOrClass: '1-sonli litsey 2-guruh',
    modelName: 'Klassik Kofexona',
    finalCapital: 141000000,
    totalProfit: -9000000,
    totalCustomers: 36700,
    reputation: 75,
    totalScore: 61,
    archetypeTitle: '🛡️ Ehtiyotkor Biznesmen'
  },
  {
    id: 'comp_18',
    playerName: 'Bobomurod Tursunov',
    businessName: 'Barista Bar Termiz',
    groupOrClass: 'TerDU Tarix fakulteti',
    modelName: 'Tez va Arzon',
    finalCapital: 135000000,
    totalProfit: -15000000,
    totalCustomers: 47800,
    reputation: 68,
    totalScore: 59,
    archetypeTitle: '⚡ Tezkor Tadbirkor'
  },
  {
    id: 'comp_19',
    playerName: 'Zilola Safarova',
    businessName: 'Latte Love',
    groupOrClass: 'Termiz PM 11-B',
    modelName: 'Premium Kofexona',
    finalCapital: 129000000,
    totalProfit: -21000000,
    totalCustomers: 31200,
    reputation: 74,
    totalScore: 57,
    archetypeTitle: '💎 Premium Strateg'
  },
  {
    id: 'comp_20',
    playerName: 'Muzaffar Yoqubov',
    businessName: 'Surxon Espresso',
    groupOrClass: '11-maktab 11-A',
    modelName: 'Klassik Kofexona',
    finalCapital: 122000000,
    totalProfit: -28000000,
    totalCustomers: 37900,
    reputation: 69,
    totalScore: 55,
    archetypeTitle: '🛡️ Ehtiyotkor Biznesmen'
  }
];

export function getLeaderboard(): TournamentParticipant[] {
  let list: TournamentParticipant[] = [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      list = JSON.parse(raw);
    }
  } catch {
    list = [];
  }

  if (list.length === 0) {
    // Generate ranks
    list = DEFAULT_PARTICIPANTS.map((p, idx) => ({
      ...p,
      rank: idx + 1
    }));
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch {
      // storage unavailable
    }
  }

  // Re-sort and re-rank to ensure strictly ordered
  return sortAndRankParticipants(list);
}

function sortAndRankParticipants(list: TournamentParticipant[]): TournamentParticipant[] {
  // Sort primarily by totalScore descending, then by finalCapital descending
  const sorted = [...list].sort((a, b) => {
    if (b.totalScore !== a.totalScore) {
      return b.totalScore - a.totalScore;
    }
    return b.finalCapital - a.finalCapital;
  });

  // Assign distinct top-3 awards
  return sorted.slice(0, 30).map((item, index) => {
    const rank = index + 1;
    let categoryAward: 'strategy' | 'sustainability' | 'overall' | undefined;
    if (rank === 1) categoryAward = 'strategy';
    else if (rank === 2) categoryAward = 'sustainability';
    else if (rank === 3) categoryAward = 'overall';

    return {
      ...item,
      rank,
      categoryAward
    };
  });
}

export function savePlayerToLeaderboard(newParticipant: Omit<TournamentParticipant, 'rank'>): TournamentParticipant[] {
  const current = getLeaderboard();

  // Remove existing current player record if any
  const filtered = current.filter((p) => p.id !== newParticipant.id && !p.isCurrentPlayer);

  // Add new participant
  filtered.push({
    ...newParticipant,
    rank: 0,
    isCurrentPlayer: true
  });

  const ranked = sortAndRankParticipants(filtered);

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ranked));
  } catch {
    // storage failed
  }

  return ranked;
}

export function resetLeaderboardToDefault(): TournamentParticipant[] {
  const list = DEFAULT_PARTICIPANTS.map((p, idx) => ({
    ...p,
    rank: idx + 1
  }));
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch {
    // storage failed
  }
  return list;
}

export function exportLeaderboardJSON(): string {
  const list = getLeaderboard();
  return JSON.stringify(list, null, 2);
}

export function importLeaderboardJSON(jsonStr: string): boolean {
  try {
    const parsed = JSON.parse(jsonStr);
    if (Array.isArray(parsed) && parsed.length > 0) {
      const ranked = sortAndRankParticipants(parsed);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ranked));
      return true;
    }
  } catch {
    return false;
  }
  return false;
}
