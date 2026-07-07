export type BuildingType =
  | 'kneipe'
  | 'hotel'
  | 'weapons'
  | 'cars'
  | 'counterfeit'
  | 'bank'
  | 'casino'
  | 'police'
  | 'hospital'
  | 'hideout'
  | 'harbor'
  | 'station'
  | 'villa'
  | 'pawnshop'
  | 'subway'
  | 'loanshark'
  | 'shop';

export type District =
  | 'Altstadt'
  | 'Hafenviertel'
  | 'Industriegebiet'
  | 'Villenviertel'
  | 'Rotlichtgasse'
  | 'Bahnhofsviertel'
  | 'Polizeibezirk';

export type TileKind = 'road' | 'street' | 'alley' | 'park' | 'warehouse' | 'lamp' | 'wall' | 'yard' | 'block';
export type MemberStatus = 'aktiv' | 'verletzt' | 'verhaftet' | 'tot';
export type Role = 'Schlaeger' | 'Fahrerin' | 'Planer' | 'Safeknacker' | 'Schuetzin' | 'Informant' | 'Verhandler';
export type WeaponId = 'none' | 'colt1911' | 'savage1907' | 'remington11' | 'winchester97' | 'sw10' | 'thompson' | 'browningBar' | 'grenades';
export type CarId = 'foot' | 'talbot90' | 'chevyRoadster' | 'buickCentury' | 'auburn120' | 'citroenTa';
export type Screen = 'menu' | 'game' | 'gang' | 'combat' | 'won' | 'lost';
export type RankName = 'Anfänger' | 'Schläger' | 'Kleiner Fisch' | 'Langfinger' | 'Ganove' | 'Mafiosi' | 'Bullenschreck' | 'Meuchelmörder' | 'Gangsterboss' | 'Rechte Hand' | 'Der Pate';
export type ActionId =
  | 'beg'
  | 'shop-robbery'
  | 'small-theft'
  | 'pawn-sale'
  | 'blackmail'
  | 'found-gang'
  | 'rent-room'
  | 'bank-robbery'
  | 'safe-crack'
  | 'casino-gamble'
  | 'casino-extort'
  | 'lay-low'
  | 'heal-player'
  | 'harbor-heist'
  | 'station-job'
  | 'villa-burglary'
  | 'police-bribe'
  | 'gang-war'
  | 'cheap-counterfeit'
  | 'clean-counterfeit'
  | 'master-counterfeit'
  | 'fake-passport'
  | 'counterfeit-contacts'
  | 'subway-pickpocket'
  | 'train-robbery'
  | 'loan-take'
  | 'loan-repay'
  | 'steal-car';

export interface Requirement {
  stat?: keyof Pick<PlayerStats, 'strength' | 'intelligence' | 'reputation' | 'brutality' | 'wanted'>;
  min?: number;
  max?: number;
  activeGang?: number;
  role?: Role;
  car?: CarId;
  rank?: RankName;
  hotelRoom?: boolean;
  gangFounded?: boolean;
}

export interface PlayerStats {
  money: number;
  health: number;
  strength: number;
  intelligence: number;
  reputation: number;
  brutality: number;
  wanted: number;
  danger: number;
  counterfeit: number;
  passport: boolean;
}

export interface WeaponConfig {
  id: WeaponId;
  name: string;
  price: number;
  combatBonus: number;
  brutalityBonus: number;
  intimidationBonus: number;
  reputationBonus: number;
  range: number;
  accuracy: number;
  damage: number;
  requiredStats: Requirement[];
  description: string;
  rarity: 'gewöhnlich' | 'selten' | 'illegal' | 'legendär';
}

export interface CarConfig {
  id: CarId;
  name: string;
  price: number;
  movementPoints: number;
  reputationRequirement: number;
  requiredStats: Requirement[];
  specialEffect: string;
  description: string;
  policeRiskModifier: number;
  heistBonus?: number;
}

export interface GangMemberTemplate {
  templateId: string;
  name: string;
  nickname: string;
  sex: 'männlich' | 'weiblich';
  role: Role;
  story: string;
  strength: number;
  intelligence: number;
  brutality: number;
  shooting: number;
  driving: number;
  loyalty: number;
  cost: number;
  upkeep: number;
  weapon: WeaponId;
  special: string;
  weakness: string;
  requirements: Requirement[];
}

export interface GangMember extends GangMemberTemplate {
  id: string;
  status: MemberStatus;
  x?: number;
  y?: number;
}

export interface BuildingConfig {
  id: BuildingType;
  name: string;
  icon: string;
  short: string;
  description: string;
  district: District;
  actions: ActionId[];
}

export interface ActionConfig {
  id: ActionId;
  name: string;
  building: BuildingType;
  cost: number;
  reward?: [number, number];
  risk: 'niedrig' | 'mittel' | 'hoch' | 'sehr hoch';
  policeRisk: number;
  reputationEffect: number;
  requirements: Requirement[];
  recommendedRoles?: Role[];
  gangSlots?: number;
  danger?: number;
  rank?: RankName;
  stepCost?: number;
  pointEffect?: number;
  cooldownKey?: string;
  effect: string;
  failure: string;
}

export interface Tile {
  id: string;
  x: number;
  y: number;
  district: District;
  kind: TileKind;
  building?: BuildingType;
}

export interface LogEntry {
  month: number;
  text: string;
}

export interface CombatEnemy {
  id: string;
  name: string;
  health: number;
  strength: number;
  weapon: WeaponId;
  x: number;
  y: number;
}

export interface CombatState {
  kind: 'police' | 'rival';
  title: string;
  phase: 'player' | 'enemy' | 'finished';
  selectedId?: string;
  allies: GangMember[];
  enemies: CombatEnemy[];
  obstacles: Array<{ x: number; y: number }>;
  message: string;
}

export interface ResultMessage {
  title: string;
  lines: string[];
}

export interface PoliceCheck {
  risk: number;
  reason: string;
}

export interface GameState {
  screen: Screen;
  month: number;
  points: number;
  position: { x: number; y: number };
  stepsLeft: number;
  stats: PlayerStats;
  gang: GangMember[];
  car: CarId;
  hotelRoom: boolean;
  gangFounded: boolean;
  arsenal: WeaponId[];
  monthly: Record<string, boolean>;
  log: LogEntry[];
  map: Tile[];
  result?: ResultMessage;
  policeCheck?: PoliceCheck;
  gameOverReason?: string;
  combat?: CombatState;
}

export const SAVE_KEY = 'unterwelt-1929-save';
export const MAP_WIDTH = 32;
export const MAP_HEIGHT = 24;
export const MAP_SIZE = MAP_WIDTH;

export const ranks: Array<{ name: RankName; points: number }> = [
  { name: 'Anfänger', points: 0 },
  { name: 'Schläger', points: 5 },
  { name: 'Kleiner Fisch', points: 12 },
  { name: 'Langfinger', points: 22 },
  { name: 'Ganove', points: 35 },
  { name: 'Mafiosi', points: 50 },
  { name: 'Bullenschreck', points: 65 },
  { name: 'Meuchelmörder', points: 78 },
  { name: 'Gangsterboss', points: 90 },
  { name: 'Rechte Hand', points: 105 },
  { name: 'Der Pate', points: 120 },
];

export const weapons: WeaponConfig[] = [
  {
    id: 'none',
    name: 'Hände',
    price: 0,
    combatBonus: 0,
    brutalityBonus: 0,
    intimidationBonus: 0,
    reputationBonus: 0,
    range: 1,
    accuracy: 65,
    damage: 6,
    requiredStats: [],
    description: 'Wenn alles andere weg ist, bleiben zwei schlechte Argumente.',
    rarity: 'gewöhnlich',
  },
  {
    id: 'colt1911',
    name: 'Colt M1911',
    price: 650,
    combatBonus: 4,
    brutalityBonus: 0,
    intimidationBonus: 1,
    reputationBonus: 0,
    range: 4,
    accuracy: 58,
    damage: 24,
    requiredStats: [{ stat: 'brutality', min: 20 }],
    description: 'Robust, laut, amerikanisch. Der erste ernsthafte Schritt weg von bloßen Händen.',
    rarity: 'gewöhnlich',
  },
  {
    id: 'savage1907',
    name: 'Savage 1907',
    price: 900,
    combatBonus: 5,
    brutalityBonus: 0,
    intimidationBonus: 1,
    reputationBonus: 0,
    range: 3,
    accuracy: 66,
    damage: 22,
    requiredStats: [{ rank: 'Schläger' }, { stat: 'intelligence', min: 25 }],
    description: 'Kompakter als der Colt, besser für enge Gassen.',
    rarity: 'selten',
  },
  {
    id: 'remington11',
    name: 'Remington 11',
    price: 2100,
    combatBonus: 8,
    brutalityBonus: 1,
    intimidationBonus: 2,
    reputationBonus: 0,
    range: 3,
    accuracy: 52,
    damage: 38,
    requiredStats: [{ rank: 'Kleiner Fisch' }, { stat: 'brutality', min: 35 }],
    description: 'Halbautomatische Schrotflinte für Gespräche, die niemand fortsetzen soll.',
    rarity: 'illegal',
  },
  {
    id: 'winchester97',
    name: 'Winchester 97',
    price: 2600,
    combatBonus: 9,
    brutalityBonus: 1,
    intimidationBonus: 2,
    reputationBonus: 0,
    range: 3,
    accuracy: 55,
    damage: 42,
    requiredStats: [{ rank: 'Langfinger' }, { stat: 'strength', min: 40 }],
    description: 'Pumpgun mit deutlicher Meinung.',
    rarity: 'illegal',
  },
  {
    id: 'sw10',
    name: 'Smith & Wesson 10',
    price: 1800,
    combatBonus: 6,
    brutalityBonus: 0,
    intimidationBonus: 1,
    reputationBonus: 0,
    range: 4,
    accuracy: 70,
    damage: 28,
    requiredStats: [{ rank: 'Kleiner Fisch' }, { stat: 'intelligence', min: 30 }],
    description: 'Solide, präzise, beliebt bei Männern mit Hut und Problemen.',
    rarity: 'selten',
  },
  {
    id: 'thompson',
    name: 'Thompson SMG',
    price: 7200,
    combatBonus: 15,
    brutalityBonus: 0,
    intimidationBonus: 4,
    reputationBonus: 0,
    range: 5,
    accuracy: 48,
    damage: 55,
    requiredStats: [{ rank: 'Mafiosi' }, { stat: 'brutality', min: 55 }],
    description: 'Die Schreibmaschine der Straße.',
    rarity: 'illegal',
  },
  {
    id: 'browningBar',
    name: 'Browning BAR',
    price: 12000,
    combatBonus: 20,
    brutalityBonus: 0,
    intimidationBonus: 5,
    reputationBonus: 0,
    range: 6,
    accuracy: 44,
    damage: 70,
    requiredStats: [{ rank: 'Bullenschreck' }, { stat: 'strength', min: 60 }],
    description: 'Schwer wie ein schlechtes Gewissen und doppelt so laut.',
    rarity: 'legendär',
  },
  {
    id: 'grenades',
    name: 'Handgranaten',
    price: 9500,
    combatBonus: 18,
    brutalityBonus: 2,
    intimidationBonus: 6,
    reputationBonus: 0,
    range: 4,
    accuracy: 38,
    damage: 85,
    requiredStats: [{ rank: 'Meuchelmörder' }, { stat: 'brutality', min: 70 }, { stat: 'intelligence', min: 45 }],
    description: 'Kein Werkzeug für Diskussionen. Eher für deren Ende.',
    rarity: 'legendär',
  },
];

export const cars: CarConfig[] = [
  {
    id: 'foot',
    name: 'Füße',
    price: 0,
    movementPoints: 35,
    reputationRequirement: 0,
    requiredStats: [],
    specialEffect: 'Keine Vorteile, aber immer verfügbar.',
    description: 'Die billigste Art, Ärger zu finden.',
    policeRiskModifier: 0,
  },
  {
    id: 'talbot90',
    name: 'Talbot 90',
    price: 1200,
    movementPoints: 45,
    reputationRequirement: 0,
    requiredStats: [],
    specialEffect: 'Solider früher Wagen.',
    description: 'Nicht schön, aber schneller als Laufen.',
    policeRiskModifier: 0,
  },
  {
    id: 'chevyRoadster',
    name: 'Chevy Roadster',
    price: 4500,
    movementPoints: 55,
    reputationRequirement: 12,
    requiredStats: [],
    specialEffect: 'Gute Fluchtchancen nach kleinen Jobs.',
    description: 'Offen, schnell, viel zu auffällig.',
    policeRiskModifier: -1,
  },
  {
    id: 'buickCentury',
    name: 'Buick Century',
    price: 6500,
    movementPoints: 60,
    reputationRequirement: 22,
    requiredStats: [],
    specialEffect: 'Schnell genug für riskante Fluchten.',
    description: 'Für Männer, die nicht warten möchten.',
    policeRiskModifier: -1,
  },
  {
    id: 'auburn120',
    name: 'Auburn 120',
    price: 11000,
    movementPoints: 65,
    reputationRequirement: 35,
    requiredStats: [],
    specialEffect: 'Prestige und maximale Reichweite.',
    description: 'Ein Wagen, der vor Dir den Raum betritt.',
    policeRiskModifier: -1,
  },
  {
    id: 'citroenTa',
    name: 'Citroen t.a.',
    price: 8000,
    movementPoints: 50,
    reputationRequirement: 18,
    requiredStats: [{ stat: 'intelligence', min: 35 }],
    specialEffect: 'Unauffällig, senkt Polizeiaufmerksamkeit.',
    description: 'Europäisch, tief, überraschend diskret.',
    policeRiskModifier: -2,
  },
];

export const recruitTemplates: GangMemberTemplate[] = [
  {
    templateId: 'bruno',
    name: 'Bruno Kowalski',
    nickname: 'Der Bär',
    sex: 'männlich',
    role: 'Schlaeger',
    story: 'Bruno hat früher am Hafen Kisten geschleppt und später Männer. Er redet wenig, aber wenn er einen Raum betritt, werden Rechnungen plötzlich pünktlich bezahlt.',
    strength: 78,
    intelligence: 32,
    brutality: 72,
    shooting: 28,
    driving: 24,
    loyalty: 60,
    cost: 1200,
    upkeep: 300,
    weapon: 'none',
    special: '+15% bei Einschüchterung und Schutzgeld.',
    weakness: 'Schlecht in Planung, erhöht Polizeirisiko bei komplexen Coups leicht.',
    requirements: [],
  },
  {
    templateId: 'lotte',
    name: 'Lotte Maroni',
    nickname: 'Lucky',
    sex: 'weiblich',
    role: 'Fahrerin',
    story: 'Lotte kennt jede Seitengasse der Stadt. Man sagt, sie habe einmal drei Polizeiwagen abgehängt, während sie nebenbei eine Zigarette gedreht hat.',
    strength: 34,
    intelligence: 62,
    brutality: 35,
    shooting: 45,
    driving: 88,
    loyalty: 70,
    cost: 2500,
    upkeep: 500,
    weapon: 'none',
    special: 'Verbessert Fluchtchancen nach Raubzügen.',
    weakness: 'Verlangt bessere Wagen für Hochrisiko-Jobs.',
    requirements: [{ rank: 'Kleiner Fisch' }, { hotelRoom: true }],
  },
  {
    templateId: 'viktor',
    name: 'Viktor Adler',
    nickname: 'Der Professor',
    sex: 'männlich',
    role: 'Planer',
    story: 'Viktor trägt Handschuhe, liest Polizeiberichte und spricht von Banküberfällen wie andere vom Schach. Niemand weiß, warum er nicht längst selbst reich ist.',
    strength: 28,
    intelligence: 90,
    brutality: 25,
    shooting: 38,
    driving: 42,
    loyalty: 52,
    cost: 4000,
    upkeep: 800,
    weapon: 'savage1907',
    special: 'Reduziert Fehlschlagrisiko bei komplexen Coups.',
    weakness: 'Geringe Loyalität, wenn Dein Ruf schwach ist.',
    requirements: [{ rank: 'Ganove' }, { hotelRoom: true }],
  },
  {
    templateId: 'carlo',
    name: 'Carlo Ricci',
    nickname: 'Knacki',
    sex: 'männlich',
    role: 'Safeknacker',
    story: 'Carlo hört an einem Tresor, ob er lügt. Leider hört er bei Whiskeyflaschen nicht rechtzeitig auf.',
    strength: 42,
    intelligence: 72,
    brutality: 45,
    shooting: 35,
    driving: 30,
    loyalty: 45,
    cost: 3000,
    upkeep: 650,
    weapon: 'none',
    special: 'Stark empfohlen für Banken, Tresore und Villen.',
    weakness: 'Kann Ärger machen, wenn die Moral niedrig ist.',
    requirements: [{ rank: 'Langfinger' }, { hotelRoom: true }],
  },
  {
    templateId: 'maja',
    name: 'Maja Weiss',
    nickname: 'Kalte Hand',
    sex: 'weiblich',
    role: 'Schuetzin',
    story: 'Maja lächelt freundlich, bis jemand ihr Ziel wird. Danach redet niemand mehr über ihr Lächeln.',
    strength: 52,
    intelligence: 63,
    brutality: 84,
    shooting: 92,
    driving: 44,
    loyalty: 62,
    cost: 7500,
    upkeep: 1200,
    weapon: 'colt1911',
    special: 'Massiver Kampfbonus in Bandenkriegen.',
    weakness: 'Erhöht Brutalität und Polizeiaufmerksamkeit.',
    requirements: [{ rank: 'Mafiosi' }, { stat: 'brutality', min: 50 }, { hotelRoom: true }],
  },
  {
    templateId: 'eddi',
    name: 'Eddi Novak',
    nickname: 'Zwei Finger',
    sex: 'männlich',
    role: 'Informant',
    story: 'Eddi klaut keine Brieftaschen. Er findet sie nur, bevor andere merken, dass sie weg sind.',
    strength: 24,
    intelligence: 64,
    brutality: 22,
    shooting: 18,
    driving: 50,
    loyalty: 82,
    cost: 900,
    upkeep: 250,
    weapon: 'none',
    special: 'Kleines passives Einkommen und bessere Gerüchte.',
    weakness: 'Schwach im Kampf.',
    requirements: [],
  },
  {
    templateId: 'toni',
    name: 'Toni Russo',
    nickname: 'Der Pfarrer',
    sex: 'männlich',
    role: 'Verhandler',
    story: 'Toni trägt immer Anzug und nennt Gewalt eine schlechte Verhandlungsposition. Trotzdem stehen nach seinen Besuchen selten noch Fragen im Raum.',
    strength: 45,
    intelligence: 82,
    brutality: 55,
    shooting: 44,
    driving: 42,
    loyalty: 74,
    cost: 5000,
    upkeep: 1000,
    weapon: 'sw10',
    special: 'Verbessert Erpressung, Bestechung und Verhandlungen.',
    weakness: 'Teuer und anspruchsvoll.',
    requirements: [{ rank: 'Ganove' }, { hotelRoom: true }],
  },
];

export const buildings: BuildingConfig[] = [
  { id: 'hideout', name: 'Versteck', icon: 'V', short: 'V', description: 'Kalter Ofen, falsche Papiere, ein Bett pro Freund.', district: 'Altstadt', actions: ['lay-low', 'found-gang'] },
  { id: 'kneipe', name: 'Kneipe', icon: 'K', short: 'K', description: 'Rauch, Korn und Menschen, die neue Chefs suchen.', district: 'Rotlichtgasse', actions: ['blackmail'] },
  { id: 'hotel', name: 'Hotel', icon: 'H', short: 'H', description: 'Teure Zimmer, diskrete Türen, bessere Kontakte.', district: 'Villenviertel', actions: ['rent-room', 'found-gang'] },
  { id: 'weapons', name: 'Waffenhändler', icon: '†', short: 'WA', description: 'Der Keller riecht nach Öl und schlechten Entscheidungen.', district: 'Industriegebiet', actions: [] },
  { id: 'cars', name: 'Autohändler', icon: 'A', short: 'A', description: 'Frisierte Motoren und Rechnungen ohne Namen.', district: 'Bahnhofsviertel', actions: ['steal-car'] },
  { id: 'counterfeit', name: 'Blüten-Ede', icon: 'E', short: 'E', description: 'Blüten-Ede sitzt im Hinterzimmer einer verrauchten Druckerei. Seine Scheine riechen fast echt.', district: 'Altstadt', actions: ['cheap-counterfeit', 'clean-counterfeit', 'master-counterfeit', 'fake-passport', 'counterfeit-contacts'] },
  { id: 'bank', name: 'Bank', icon: 'B', short: 'B', description: 'Marmor, Stahl und Wachmänner mit nervösen Händen.', district: 'Altstadt', actions: ['bank-robbery', 'safe-crack'] },
  { id: 'casino', name: 'Casino', icon: 'C', short: 'C', description: 'Glücksspiel, Schuldscheine und Samtvorhänge.', district: 'Rotlichtgasse', actions: ['casino-gamble', 'casino-extort'] },
  { id: 'police', name: 'Polizeirevier', icon: 'P', short: 'PR', description: 'Aktenordner, Zellen, Namen an Tafeln.', district: 'Polizeibezirk', actions: ['police-bribe', 'gang-war'] },
  { id: 'hospital', name: 'Krankenhaus', icon: '+', short: '+', description: 'Saubere Laken für dreckiges Geld.', district: 'Polizeibezirk', actions: ['heal-player'] },
  { id: 'harbor', name: 'Hafenlager', icon: '▓', short: 'HL', description: 'Kisten, Nebel, Wachhunde und verschwundene Fracht.', district: 'Hafenviertel', actions: ['harbor-heist'] },
  { id: 'station', name: 'Bahnhof', icon: 'Z', short: 'Z', description: 'Koffer, Fahrpläne und niemand schaut zweimal hin.', district: 'Bahnhofsviertel', actions: ['station-job', 'train-robbery'] },
  { id: 'villa', name: 'Villa', icon: '♛', short: 'VI', description: 'Reiche Leute schlafen schlecht, wenn Du davon weißt.', district: 'Villenviertel', actions: ['villa-burglary'] },
  { id: 'pawnshop', name: 'Pfandleihe', icon: '¤', short: 'PF', description: 'Hier bekommt jedes Problem einen Preis.', district: 'Industriegebiet', actions: ['small-theft', 'pawn-sale'] },
  { id: 'subway', name: 'U-Bahn', icon: 'U', short: 'U', description: 'Gedränge am Bahnsteig. Kleine Hände, kleine Scheine.', district: 'Bahnhofsviertel', actions: ['subway-pickpocket'] },
  { id: 'loanshark', name: 'Kredit-Hai', icon: 'L', short: 'L', description: 'Geld heute, Schmerzen morgen.', district: 'Rotlichtgasse', actions: ['loan-take', 'loan-repay'] },
  { id: 'shop', name: 'Laden', icon: 'S', short: 'S', description: 'Kasse, Besitzer, Schaufenster. Ein Anfang.', district: 'Altstadt', actions: ['beg', 'shop-robbery', 'blackmail'] },
];

export const actions: ActionConfig[] = [
  { id: 'beg', name: 'Betteln', building: 'shop', cost: 0, reward: [10, 80], risk: 'niedrig', policeRisk: 0, reputationEffect: 0, requirements: [], rank: 'Anfänger', stepCost: 1, pointEffect: 1, cooldownKey: 'beg', effect: 'Ein würdeloser, aber sicherer Anfang.', failure: 'Niemand gibt Dir etwas.' },
  { id: 'shop-robbery', name: 'Laden ausrauben', building: 'shop', cost: 0, reward: [120, 420], risk: 'hoch', policeRisk: 2, reputationEffect: 1, requirements: [], rank: 'Anfänger', stepCost: 2, pointEffect: 2, cooldownKey: 'shop-robbery', effect: 'Riskanter Kassenraub. Einmal pro Laden und Monat.', failure: 'Der Ladenbesitzer ruft die Polizei.' },
  { id: 'small-theft', name: 'Kleinen Bruch drehen', building: 'pawnshop', cost: 0, reward: [120, 420], risk: 'niedrig', policeRisk: 1, reputationEffect: 1, requirements: [], rank: 'Anfänger', stepCost: 1, pointEffect: 2, cooldownKey: 'small-theft', effect: 'Schnelles Geld für den Anfang.', failure: 'Du verlierst Gesundheit oder bekommst Fahndungsdruck.' },
  { id: 'pawn-sale', name: 'Beute versetzen', building: 'pawnshop', cost: 0, reward: [80, 260], risk: 'niedrig', policeRisk: 0, reputationEffect: 0, requirements: [], rank: 'Anfänger', stepCost: 1, pointEffect: 1, cooldownKey: 'pawn-sale', effect: 'Kleiner sicherer Erlös.', failure: 'Der Pfandleiher drückt den Preis.' },
  { id: 'subway-pickpocket', name: 'Taschendiebstahl am Bahnsteig', building: 'subway', cost: 0, reward: [90, 350], risk: 'niedrig', policeRisk: 1, reputationEffect: 1, requirements: [], rank: 'Kleiner Fisch', stepCost: 1, pointEffect: 2, cooldownKey: 'subway', effect: 'Viele Taschen, wenig Licht.', failure: 'Ein Schaffner schaut zu genau hin.' },
  { id: 'blackmail', name: 'Schutzgeld eintreiben', building: 'kneipe', cost: 0, reward: [320, 900], risk: 'mittel', policeRisk: 1, reputationEffect: 2, requirements: [], rank: 'Langfinger', stepCost: 2, pointEffect: 3, cooldownKey: 'blackmail', recommendedRoles: ['Schlaeger', 'Verhandler'], gangSlots: 1, effect: 'Brutalität und Verhandlungsgeschick zählen.', failure: 'Das Opfer rennt zur Polizei.' },
  { id: 'rent-room', name: 'Hotelzimmer mieten', building: 'hotel', cost: 900, risk: 'niedrig', policeRisk: 0, reputationEffect: 0, requirements: [], rank: 'Langfinger', stepCost: 1, pointEffect: 0, cooldownKey: 'rent-room', effect: 'Ein Zimmer als Basis. Voraussetzung für die Bande.', failure: 'Der Portier will echtes Geld.' },
  { id: 'found-gang', name: 'Bande gründen', building: 'hideout', cost: 1500, risk: 'mittel', policeRisk: 0, reputationEffect: 2, requirements: [{ rank: 'Ganove' }, { hotelRoom: true }], rank: 'Ganove', stepCost: 1, pointEffect: 3, cooldownKey: 'found-gang', effect: 'Ab jetzt kannst Du echte Gangmitglieder rekrutieren.', failure: 'Niemand folgt einem Namenlosen ohne Zimmer.' },
  { id: 'bank-robbery', name: 'Bank überfallen', building: 'bank', cost: 250, reward: [5000, 25000], risk: 'sehr hoch', policeRisk: 3, reputationEffect: 5, requirements: [{ rank: 'Mafiosi' }, { gangFounded: true }, { activeGang: 1 }], rank: 'Mafiosi', stepCost: 3, pointEffect: 8, cooldownKey: 'bank-robbery', recommendedRoles: ['Safeknacker', 'Planer', 'Fahrerin'], gangSlots: 3, danger: 2, effect: 'Große Beute, großer Ruhm, große Akte.', failure: 'Verletzung, Verhaftung oder Geldverlust möglich.' },
  { id: 'safe-crack', name: 'Tresor knacken', building: 'bank', cost: 400, reward: [3000, 13000], risk: 'hoch', policeRisk: 2, reputationEffect: 3, requirements: [{ rank: 'Mafiosi' }, { stat: 'intelligence', min: 45 }, { activeGang: 1 }], rank: 'Mafiosi', stepCost: 3, pointEffect: 6, cooldownKey: 'safe-crack', recommendedRoles: ['Safeknacker', 'Planer'], effect: 'Leiser als ein Banküberfall, aber nicht weniger schwer.', failure: 'Der Tresor schweigt, die Sirene nicht.' },
  { id: 'casino-gamble', name: 'Im Casino spielen', building: 'casino', cost: 300, reward: [0, 1200], risk: 'mittel', policeRisk: 0, reputationEffect: 0, requirements: [], rank: 'Kleiner Fisch', stepCost: 1, pointEffect: 1, cooldownKey: 'casino-gamble', effect: 'Intelligenz verbessert die Chance.', failure: 'Das Haus gewinnt.' },
  { id: 'casino-extort', name: 'Casino erpressen', building: 'casino', cost: 0, reward: [800, 2400], risk: 'hoch', policeRisk: 2, reputationEffect: 3, requirements: [{ rank: 'Ganove' }, { gangFounded: true }, { activeGang: 1 }], rank: 'Ganove', stepCost: 2, pointEffect: 5, cooldownKey: 'casino-extort', recommendedRoles: ['Verhandler', 'Schlaeger'], gangSlots: 2, danger: 1, effect: 'Viel Bargeld, viele Zeugen.', failure: 'Die Türsteher kennen auch Gewalt.' },
  { id: 'lay-low', name: 'Untertauchen', building: 'hideout', cost: 200, risk: 'niedrig', policeRisk: -2, reputationEffect: -1, requirements: [], rank: 'Anfänger', stepCost: 2, pointEffect: 0, cooldownKey: 'lay-low', effect: 'Fahndung sinkt um 2, Gefahr sinkt leicht.', failure: 'Die Stadt vergisst Dich nicht völlig.' },
  { id: 'heal-player', name: 'Behandeln lassen', building: 'hospital', cost: 500, risk: 'niedrig', policeRisk: 0, reputationEffect: 0, requirements: [], rank: 'Anfänger', stepCost: 1, pointEffect: 0, cooldownKey: 'heal-player', effect: 'Gesundheit wird vollständig wiederhergestellt.', failure: 'Ohne Geld keine Medizin.' },
  { id: 'harbor-heist', name: 'Hafenlager ausräumen', building: 'harbor', cost: 150, reward: [1800, 6200], risk: 'hoch', policeRisk: 2, reputationEffect: 3, requirements: [{ rank: 'Ganove' }, { activeGang: 2 }], rank: 'Ganove', stepCost: 2, pointEffect: 5, cooldownKey: 'harbor-heist', recommendedRoles: ['Fahrerin', 'Schlaeger'], gangSlots: 3, danger: 1, effect: 'Lieferwagen geben Bonus.', failure: 'Wachleute und Hafenpolizei machen Ärger.' },
  { id: 'station-job', name: 'Koffer am Bahnhof abfangen', building: 'station', cost: 80, reward: [700, 2100], risk: 'mittel', policeRisk: 1, reputationEffect: 1, requirements: [{ rank: 'Kleiner Fisch' }], rank: 'Kleiner Fisch', stepCost: 1, pointEffect: 3, cooldownKey: 'station-job', recommendedRoles: ['Informant', 'Fahrerin'], gangSlots: 1, effect: 'Schneller Coup mit guter Fluchtchance.', failure: 'Der falsche Koffer, der richtige Polizist.' },
  { id: 'train-robbery', name: 'Postzug ausnehmen', building: 'station', cost: 500, reward: [4500, 17000], risk: 'sehr hoch', policeRisk: 3, reputationEffect: 5, requirements: [{ rank: 'Bullenschreck' }, { activeGang: 2 }], rank: 'Bullenschreck', stepCost: 3, pointEffect: 8, cooldownKey: 'train-robbery', recommendedRoles: ['Fahrerin', 'Planer'], effect: 'Später Coup mit großem Echo.', failure: 'Der Zug fährt, Du bleibst.' },
  { id: 'villa-burglary', name: 'Villa ausräumen', building: 'villa', cost: 200, reward: [2200, 9000], risk: 'hoch', policeRisk: 2, reputationEffect: 3, requirements: [{ rank: 'Langfinger' }, { stat: 'intelligence', min: 45 }, { activeGang: 1 }], rank: 'Langfinger', stepCost: 2, pointEffect: 5, cooldownKey: 'villa-burglary', recommendedRoles: ['Safeknacker', 'Planer'], gangSlots: 2, danger: 1, effect: 'Intelligenz und Safeknacker glänzen.', failure: 'Alarmanlagen sind die Sprache der Reichen.' },
  { id: 'police-bribe', name: 'Akten schmieren', building: 'police', cost: 1800, risk: 'mittel', policeRisk: -2, reputationEffect: 0, requirements: [{ rank: 'Bullenschreck' }, { stat: 'intelligence', min: 35 }], rank: 'Bullenschreck', stepCost: 1, pointEffect: 0, cooldownKey: 'police-bribe', recommendedRoles: ['Verhandler'], effect: 'Fahndung sinkt, wenn die Umschläge dick genug sind.', failure: 'Ein ehrlicher Beamter ist teuer.' },
  { id: 'gang-war', name: 'Bandenkrieg anzetteln', building: 'police', cost: 0, risk: 'sehr hoch', policeRisk: 2, reputationEffect: 5, requirements: [{ rank: 'Bullenschreck' }, { activeGang: 2 }], rank: 'Bullenschreck', stepCost: 2, pointEffect: 6, cooldownKey: 'gang-war', recommendedRoles: ['Schuetzin', 'Schlaeger'], danger: 2, effect: 'Startet einen taktischen Kampf.', failure: 'Die Straße frisst Schwäche.' },
  { id: 'cheap-counterfeit', name: 'Kleine Blüte kaufen', building: 'counterfeit', cost: 500, reward: [1000, 1000], risk: 'hoch', policeRisk: 2, reputationEffect: 0, requirements: [], rank: 'Anfänger', stepCost: 1, pointEffect: 1, cooldownKey: 'cheap-counterfeit', effect: 'Gibt $1.000 Falschgeld, hohe Entdeckungsgefahr.', failure: 'Der Schein riecht zu frisch.' },
  { id: 'clean-counterfeit', name: 'Saubere Blüte kaufen', building: 'counterfeit', cost: 2000, reward: [3500, 3500], risk: 'mittel', policeRisk: 1, reputationEffect: 0, requirements: [], rank: 'Anfänger', stepCost: 1, pointEffect: 2, cooldownKey: 'clean-counterfeit', effect: 'Gibt $3.500 Falschgeld, mittlere Entdeckungsgefahr.', failure: 'Ein Händler merkt sich Dein Gesicht.' },
  { id: 'master-counterfeit', name: 'Meisterdruck kaufen', building: 'counterfeit', cost: 7500, reward: [12000, 12000], risk: 'niedrig', policeRisk: 1, reputationEffect: 0, requirements: [{ rank: 'Mafiosi' }], rank: 'Mafiosi', stepCost: 1, pointEffect: 3, cooldownKey: 'master-counterfeit', effect: 'Gibt $12.000 Falschgeld, niedrige Entdeckungsgefahr.', failure: 'Perfekt ist nie kostenlos.' },
  { id: 'fake-passport', name: 'Neuen Pass besorgen', building: 'counterfeit', cost: 5000, risk: 'mittel', policeRisk: -2, reputationEffect: 0, requirements: [{ stat: 'intelligence', min: 35 }], rank: 'Anfänger', stepCost: 1, pointEffect: 1, cooldownKey: 'fake-passport', effect: 'Fahndung sinkt um 2, Polizeikontrollen werden harmloser.', failure: 'Ein falscher Name hilft nicht bei echten Fehlern.' },
  { id: 'counterfeit-contacts', name: 'Kontakte kaufen', building: 'counterfeit', cost: 2500, risk: 'mittel', policeRisk: 0, reputationEffect: 2, requirements: [{ rank: 'Langfinger' }], rank: 'Langfinger', stepCost: 1, pointEffect: 2, cooldownKey: 'counterfeit-contacts', effect: 'Ruf +2, bessere Geschäfte mit Ede.', failure: 'Kontakte reden erst, wenn Geld redet.' },
  { id: 'loan-take', name: 'Kredit aufnehmen', building: 'loanshark', cost: 0, reward: [1500, 1500], risk: 'mittel', policeRisk: 0, reputationEffect: 0, requirements: [], rank: 'Anfänger', stepCost: 1, pointEffect: 1, cooldownKey: 'loan-take', effect: 'Schnelles Geld, später Schmerzen.', failure: 'Der Hai hält Dich für zu klein.' },
  { id: 'loan-repay', name: 'Kredit zurückzahlen', building: 'loanshark', cost: 2000, risk: 'niedrig', policeRisk: 0, reputationEffect: 1, requirements: [], rank: 'Anfänger', stepCost: 1, pointEffect: 1, cooldownKey: 'loan-repay', effect: 'Ruf steigt, Schulden verschwinden im Rauch.', failure: 'Ohne Geld bleibt der Hai hungrig.' },
  { id: 'steal-car', name: 'Auto stehlen', building: 'cars', cost: 0, risk: 'hoch', policeRisk: 2, reputationEffect: 1, requirements: [{ rank: 'Langfinger' }], rank: 'Langfinger', stepCost: 2, pointEffect: 4, cooldownKey: 'steal-car', effect: 'Chance auf einen besseren Wagen ohne Kaufpreis.', failure: 'Ein Wachmann merkt sich Deine Schuhe.' },
];

export const tileVisuals: Record<TileKind, { icon: string; name: string }> = {
  road: { icon: ' ', name: 'Straße' },
  street: { icon: '·', name: 'Straße' },
  alley: { icon: '░', name: 'Gasse' },
  park: { icon: '♠', name: 'Park' },
  warehouse: { icon: '▒', name: 'Lager' },
  lamp: { icon: 'i', name: 'Laterne' },
  wall: { icon: '█', name: 'Mauer' },
  yard: { icon: '▪', name: 'Hof' },
  block: { icon: '▒', name: 'Block' },
};

const buildingPositions: Array<[number, number, BuildingType]> = [
  [1, 1, 'hideout'], [4, 1, 'shop'], [10, 1, 'bank'], [16, 1, 'shop'], [24, 1, 'police'], [30, 1, 'hospital'],
  [1, 5, 'shop'], [4, 5, 'kneipe'], [10, 5, 'counterfeit'], [16, 5, 'casino'], [24, 5, 'bank'], [30, 5, 'loanshark'],
  [1, 10, 'harbor'], [4, 10, 'shop'], [10, 10, 'weapons'], [16, 10, 'pawnshop'], [24, 10, 'cars'], [30, 10, 'shop'],
  [1, 15, 'subway'], [4, 15, 'kneipe'], [10, 15, 'station'], [16, 15, 'bank'], [24, 15, 'casino'], [30, 15, 'cars'],
  [1, 21, 'shop'], [4, 21, 'hotel'], [10, 21, 'subway'], [16, 21, 'bank'], [24, 21, 'hotel'], [30, 21, 'villa'],
  [1, 7, 'hotel'], [10, 7, 'shop'], [16, 7, 'kneipe'], [24, 7, 'weapons'], [30, 7, 'bank'],
  [1, 18, 'cars'], [4, 18, 'loanshark'], [10, 18, 'shop'], [16, 18, 'subway'], [24, 18, 'station'], [30, 18, 'casino'],
  [4, 12, 'hotel'], [16, 12, 'kneipe'], [30, 12, 'shop'],
];

export function getWeapon(id: WeaponId): WeaponConfig {
  return weapons.find((weapon) => weapon.id === id) ?? weapons[0];
}

export function getCar(id: CarId): CarConfig {
  return cars.find((car) => car.id === id) ?? cars[0];
}

export function getBuilding(id: BuildingType): BuildingConfig {
  return buildings.find((building) => building.id === id)!;
}

export function getAction(id: ActionId): ActionConfig {
  return actions.find((action) => action.id === id)!;
}

function districtFor(x: number, y: number): District {
  if (x >= 22 && y <= 8) return 'Polizeibezirk';
  if (x <= 8 && y >= 9) return 'Hafenviertel';
  if (x >= 20 && y >= 16) return 'Villenviertel';
  if (y >= 14) return 'Bahnhofsviertel';
  if (x >= 8 && x <= 17 && y >= 8) return 'Industriegebiet';
  if (x >= 16 && y >= 4 && y <= 14) return 'Rotlichtgasse';
  return 'Altstadt';
}

function kindFor(x: number, y: number, district: District): TileKind {
  if (isRoad(x, y)) return 'road';
  const pattern = (x * 7 + y * 11) % 9;
  if ((x === 0 || y === 0 || x === MAP_WIDTH - 1 || y === MAP_HEIGHT - 1) && pattern < 4) return 'wall';
  if (district === 'Hafenviertel' && pattern < 5) return 'warehouse';
  if (district === 'Villenviertel' && pattern < 3) return 'park';
  if (district === 'Industriegebiet' && pattern < 4) return 'yard';
  if (district === 'Rotlichtgasse' && pattern < 4) return 'lamp';
  if (pattern < 3) return 'alley';
  return pattern > 6 ? 'block' : 'street';
}

function isRoad(x: number, y: number): boolean {
  return x === 1 || x === 4 || x === 10 || x === 16 || x === 24 || x === 30 || y === 1 || y === 5 || y === 10 || y === 15 || y === 21;
}

export function createMap(): Tile[] {
  const tiles: Tile[] = [];
  for (let y = 0; y < MAP_HEIGHT; y += 1) {
    for (let x = 0; x < MAP_WIDTH; x += 1) {
      const district = districtFor(x, y);
      const match = buildingPositions.find(([bx, by]) => bx === x && by === y);
      tiles.push({ id: `${x}-${y}`, x, y, district, kind: kindFor(x, y, district), building: match?.[2] });
    }
  }
  return tiles;
}

export function validateMapConnectivity(map: Tile[] = createMap(), start = { x: 1, y: 1 }): { valid: boolean; unreachable: Tile[] } {
  const queue = [start];
  const seen = new Set<string>([`${start.x}-${start.y}`]);
  while (queue.length) {
    const current = queue.shift()!;
    for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const x = current.x + dx;
      const y = current.y + dy;
      const tile = map.find((item) => item.x === x && item.y === y);
      if (!tile || seen.has(tile.id) || !isWalkable(tile)) continue;
      seen.add(tile.id);
      queue.push({ x, y });
    }
  }
  const unreachable = map.filter((tile) => tile.building && !seen.has(tile.id));
  return { valid: unreachable.length === 0, unreachable };
}

export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

export function activeGang(gang: GangMember[]): GangMember[] {
  return gang.filter((member) => member.status === 'aktiv');
}

export function formatMoney(value: number): string {
  return `$${Math.max(0, Math.round(value)).toLocaleString('de-DE')}`;
}

export function getRank(points: number): { name: RankName; points: number; next?: { name: RankName; points: number } } {
  const currentIndex = ranks.reduce((best, rank, index) => points >= rank.points ? index : best, 0);
  return { ...ranks[currentIndex], next: ranks[currentIndex + 1] };
}

export function rankMeets(current: RankName, required: RankName): boolean {
  return ranks.findIndex((rank) => rank.name === current) >= ranks.findIndex((rank) => rank.name === required);
}

export function formatGameDate(month: number): string {
  const date = new Date(1925, month, 1);
  return date.toLocaleDateString('de-DE', { month: '2-digit', year: 'numeric' });
}

export function checkRequirements(state: GameState, requirements: Requirement[]): string[] {
  return requirements.flatMap((requirement) => {
    const rank = getRank(state.points).name;
    if (requirement.rank && !rankMeets(rank, requirement.rank)) return [`Benötigt Rang: ${requirement.rank}`];
    if (requirement.hotelRoom && !requirementHotelRoom(state)) return ['Benötigt Hotelzimmer'];
    if (requirement.gangFounded && !state.gangFounded) return ['Benötigt gegründete Bande'];
    if (requirement.activeGang != null && activeGang(state.gang).length < requirement.activeGang) return [`Benötigt ${requirement.activeGang} aktive Gangmitglieder`];
    if (requirement.role && !activeGang(state.gang).some((member) => member.role === requirement.role)) return [`Empfohlen/benötigt: ${requirement.role}`];
    if (requirement.car && state.car !== requirement.car) return [`Benötigt ${getCar(requirement.car).name}`];
    if (requirement.stat) {
      const value = state.stats[requirement.stat];
      if (requirement.min != null && Number(value) < requirement.min) return [`Benötigt ${statLabel(requirement.stat)} ${requirement.min}`];
      if (requirement.max != null && Number(value) > requirement.max) return [`Benötigt ${statLabel(requirement.stat)} höchstens ${requirement.max}`];
    }
    return [];
  });
}

function requirementHotelRoom(state: GameState): boolean {
  return state.hotelRoom || state.position.x === 3 && state.position.y === 2;
}

export function actionAvailability(state: GameState, action: ActionConfig): string[] {
  const messages = checkRequirements(state, action.requirements);
  if (action.rank && !rankMeets(getRank(state.points).name, action.rank)) messages.push(`Benötigt Rang: ${action.rank}`);
  if ((action.stepCost ?? 1) > state.stepsLeft) messages.push(`Benötigt ${action.stepCost ?? 1} Schritte`);
  const key = monthlyKey(state, action);
  if (action.cooldownKey && state.monthly?.[key]) {
    if (action.id === 'blackmail') messages.push('Der Ladenbesitzer hat diesen Monat schon bezahlt.');
    else if (action.id === 'shop-robbery') messages.push('Dieser Laden wurde diesen Monat schon ausgeraubt.');
    else messages.push('Diese Gelegenheit ist diesen Monat erschöpft.');
  }
  return [...new Set(messages)];
}

function monthlyKey(state: GameState, action: ActionConfig): string {
  return `${action.cooldownKey ?? action.id}:${state.position.x}:${state.position.y}`;
}

export function statLabel(stat: Requirement['stat']): string {
  const labels = {
    money: 'Geld',
    health: 'Gesundheit',
    strength: 'Stärke',
    intelligence: 'Intelligenz',
    reputation: 'Ruf',
    brutality: 'Brutalität',
    wanted: 'Fahndung',
    danger: 'Gefahr',
    counterfeit: 'Blüten',
    passport: 'Pass',
  };
  return stat ? labels[stat] : '';
}

export function rollStartingStats(): Pick<PlayerStats, 'strength' | 'intelligence' | 'brutality'> {
  const roll = () => 15 + Math.floor(Math.random() * 71);
  return { strength: roll(), intelligence: roll(), brutality: roll() };
}

export function newGame(startingStats: Pick<PlayerStats, 'strength' | 'intelligence' | 'brutality'> = rollStartingStats()): GameState {
  const car = 'foot';
  return {
    screen: 'game',
    month: 0,
    points: 0,
    position: { x: 3, y: 2 },
    stepsLeft: getCar(car).movementPoints,
    stats: {
      money: 700,
      health: 100,
      strength: startingStats.strength,
      intelligence: startingStats.intelligence,
      reputation: 0,
      brutality: startingStats.brutality,
      wanted: 0,
      danger: 0,
      counterfeit: 0,
      passport: false,
    },
    gang: [],
    car,
    hotelRoom: false,
    gangFounded: false,
    arsenal: ['none'],
    monthly: {},
    map: createMap(),
    log: [{ month: 0, text: 'Chicago, 01/1925. Du hast $700, einen schlechten Mantel und keinen Namen auf der Straße.' }],
  };
}

export function loadGame(): GameState | null {
  const raw = localStorage.getItem(SAVE_KEY);
  if (!raw) return null;
  try {
    const state = JSON.parse(raw) as Partial<GameState> & { currentWeapon?: WeaponId; hideoutLevel?: number; car?: string };
    const base = newGame();
    return {
      ...base,
      ...state,
      screen: 'game',
      points: state.points ?? 0,
      car: cars.some((car) => car.id === state.car) ? state.car as CarId : 'foot',
      hotelRoom: Boolean(state.hotelRoom),
      gangFounded: Boolean(state.gangFounded),
      arsenal: state.arsenal?.length ? state.arsenal : ['none', state.currentWeapon ?? 'none'],
      monthly: state.monthly ?? {},
      map: createMap(),
      result: undefined,
      policeCheck: undefined,
      combat: undefined,
    };
  } catch {
    return null;
  }
}

export function saveGame(state: GameState): void {
  localStorage.setItem(SAVE_KEY, JSON.stringify({ ...state, combat: undefined, result: undefined, policeCheck: undefined, screen: 'game' }));
}

export function addLog(state: GameState, text: string): GameState {
  return { ...state, log: [{ month: state.month, text }, ...state.log].slice(0, 24) };
}

export function clearResult(state: GameState): GameState {
  return { ...state, result: undefined };
}

function withResult(state: GameState, title: string, lines: string[]): GameState {
  return { ...state, result: { title, lines } };
}

function spend(state: GameState, cost: number): GameState | null {
  if (state.stats.money >= cost) return { ...state, stats: { ...state.stats, money: state.stats.money - cost } };
  const missing = cost - state.stats.money;
  if (state.stats.counterfeit < missing) return null;
  const risk = 0.18 + state.stats.wanted * 0.035 - (state.stats.passport ? 0.06 : 0);
  return {
    ...state,
    stats: {
      ...state.stats,
      money: 0,
      counterfeit: state.stats.counterfeit - missing,
      wanted: clamp(state.stats.wanted + (Math.random() < risk ? 2 : 0), 0, 10),
    },
  };
}

export function getEffectiveStats(state: GameState): PlayerStats & { combat: number; intimidation: number; driving: number; planning: number } {
  const ownedWeapons = state.arsenal.map(getWeapon);
  const weaponBonuses = ownedWeapons.reduce((sum, weapon) => ({
    combat: sum.combat + weapon.combatBonus,
    brutality: sum.brutality + weapon.brutalityBonus,
    intimidation: sum.intimidation + weapon.intimidationBonus,
    reputation: sum.reputation + weapon.reputationBonus,
  }), { combat: 0, brutality: 0, intimidation: 0, reputation: 0 });
  const gang = activeGang(state.gang);
  const gangCombat = gang.reduce((sum, member) => sum + member.strength + member.brutality + member.shooting + getWeapon(member.weapon).combatBonus, 0);
  const driving = gang.reduce((sum, member) => sum + member.driving, 0);
  const planning = gang.reduce((sum, member) => sum + member.intelligence, 0);
  return {
    ...state.stats,
    brutality: state.stats.brutality + weaponBonuses.brutality,
    reputation: state.stats.reputation + weaponBonuses.reputation,
    combat: state.stats.strength + state.stats.brutality + weaponBonuses.combat + gangCombat * 0.45,
    intimidation: state.stats.brutality + state.stats.reputation + weaponBonuses.intimidation + gang.filter((member) => member.role === 'Schlaeger' || member.role === 'Verhandler').length * 3,
    driving,
    planning,
  };
}

function successChance(state: GameState, action: ActionConfig): number {
  const effective = getEffectiveStats(state);
  const roleBonus = (action.recommendedRoles ?? []).reduce((sum, role) => sum + (activeGang(state.gang).some((member) => member.role === role) ? 8 : 0), 0);
  const car = getCar(state.car);
  const complexityBonus = effective.planning * 0.8 + effective.driving * 0.5 + (car.heistBonus ?? 0);
  const base = action.risk === 'niedrig' ? 78 : action.risk === 'mittel' ? 62 : action.risk === 'hoch' ? 47 : 32;
  const pressure = state.stats.wanted * 4 + state.stats.danger * 3 + Math.max(0, action.policeRisk + car.policeRiskModifier) * 3;
  return clamp(base + effective.combat * 1.2 + roleBonus + complexityBonus - pressure, 8, 92);
}

export function describeAction(state: GameState, action: ActionConfig): string[] {
  const req = actionAvailability(state, action);
  return [
    action.cost ? `Kosten: ${formatMoney(action.cost)}` : 'Kosten: keine',
    `Schrittkosten: ${action.stepCost ?? 1}`,
    action.reward ? `Mögliche Beute: ${formatMoney(action.reward[0])}-${formatMoney(action.reward[1])}` : action.effect,
    `Risiko: ${action.risk}`,
    `Polizeirisiko: ${action.policeRisk >= 0 ? '+' : ''}${action.policeRisk}`,
    `Ruf bei Erfolg: ${action.reputationEffect >= 0 ? '+' : ''}${action.reputationEffect}`,
    `Punkte bei Erfolg: +${action.pointEffect ?? 0}`,
    `Benötigter Rang: ${action.rank ?? 'Anfänger'}`,
    action.gangSlots ? `Gang beteiligt: bis zu ${action.gangSlots}` : 'Gang beteiligt: optional',
    action.recommendedRoles?.length ? `Empfohlen: ${action.recommendedRoles.join(', ')}` : 'Empfohlen: keine Spezialrolle',
    `Erfolgschance grob: ${Math.round(successChance(state, action))}%`,
    req.length ? req.join(', ') : 'Anforderungen erfüllt',
  ];
}

export function buyWeapon(state: GameState, weaponId: WeaponId): GameState {
  const weapon = getWeapon(weaponId);
  if (state.arsenal.includes(weaponId)) return withResult(addLog(state, `${weapon.name} liegt bereits im Arsenal.`), 'Nicht möglich', [`${weapon.name} liegt bereits im Arsenal.`]);
  const blocked = checkRequirements(state, weapon.requiredStats);
  if (blocked.length) return withResult(addLog(state, blocked[0]), 'Nicht möglich', blocked);
  const paid = spend(state, weapon.price);
  if (!paid) return withResult(addLog(state, `${weapon.name} kostet ${formatMoney(weapon.price)}.`), 'Nicht möglich', [`${weapon.name} kostet ${formatMoney(weapon.price)}.`]);
  return withResult(addLog({ ...paid, arsenal: [...paid.arsenal, weaponId] }, `${weapon.name} gekauft. Deine Werte wirken sofort gefährlicher.`), 'Waffe gekauft', [`${weapon.name} liegt nun im Arsenal.`, `Kampf +${weapon.combatBonus}, Brutalität +${weapon.brutalityBonus}, Einschüchterung +${weapon.intimidationBonus}.`]);
}

export function buyCar(state: GameState, carId: CarId): GameState {
  const car = getCar(carId);
  const blocked = checkRequirements(state, [{ stat: 'reputation', min: car.reputationRequirement }, ...car.requiredStats]);
  if (blocked.length) return withResult(addLog(state, blocked[0]), 'Nicht möglich', blocked);
  const paid = spend(state, car.price);
  if (!paid) return withResult(addLog(state, `${car.name} kostet ${formatMoney(car.price)}.`), 'Nicht möglich', [`${car.name} kostet ${formatMoney(car.price)}.`]);
  return withResult(addLog({ ...paid, car: carId, stepsLeft: car.movementPoints }, `${car.name} gekauft. Bewegung pro Monat: ${car.movementPoints}.`), 'Auto gekauft', [`${car.name} ist jetzt aktiv.`, `Bewegung pro Monat: ${car.movementPoints}.`, car.specialEffect]);
}

export function hireRecruit(state: GameState, templateId: string): GameState {
  const template = recruitTemplates.find((item) => item.templateId === templateId);
  if (!template) return state;
  if (!state.gangFounded) return withResult(addLog(state, 'Du musst zuerst eine Bande gründen.'), 'Nicht möglich', ['Benötigt gegründete Bande', 'Miete ein Hotelzimmer und erreiche Rang Ganove.']);
  if (state.gang.length >= 10) return withResult(addLog(state, 'Mehr als zehn Leute werden zu laut.'), 'Nicht möglich', ['Maximal 10 Gangmitglieder.']);
  if (state.gang.some((member) => member.templateId === templateId && member.status !== 'tot')) return withResult(addLog(state, `${template.nickname} arbeitet bereits für Dich.`), 'Nicht möglich', [`${template.nickname} arbeitet bereits für Dich.`]);
  const blocked = checkRequirements(state, template.requirements);
  if (blocked.length) return withResult(addLog(state, blocked[0]), 'Nicht möglich', blocked);
  const paid = spend(state, template.cost);
  if (!paid) return withResult(addLog(state, `${template.nickname} verlangt ${formatMoney(template.cost)} Handgeld.`), 'Nicht möglich', [`${template.nickname} verlangt ${formatMoney(template.cost)} Handgeld.`]);
  const recruit: GangMember = { ...template, id: crypto.randomUUID(), status: 'aktiv' };
  return withResult(addLog({ ...paid, gang: [...paid.gang, recruit] }, `${template.name} "${template.nickname}" tritt Deiner Bande bei.`), 'Rekrutiert', [`${template.name} "${template.nickname}" ist dabei.`, `Unterhalt: ${formatMoney(template.upkeep)} pro Monat.`, template.special]);
}

export function equipMember(state: GameState, memberId: string, weapon: WeaponId): GameState {
  if (!state.arsenal.includes(weapon)) return withResult(addLog(state, 'Diese Waffe liegt nicht im Arsenal.'), 'Nicht möglich', ['Diese Waffe liegt nicht im Arsenal.']);
  return withResult(addLog({ ...state, gang: state.gang.map((member) => member.id === memberId ? { ...member, weapon } : member) }, 'Waffe zugeteilt.'), 'Waffe zugeteilt', [`Neue Waffe: ${getWeapon(weapon).name}`]);
}

export function trainMember(state: GameState, memberId: string, stat: 'strength' | 'intelligence' | 'brutality' | 'shooting' | 'driving'): GameState {
  const paid = spend(state, 750);
  if (!paid) return withResult(addLog(state, 'Training kostet $750.'), 'Nicht möglich', ['Training kostet $750.']);
  const target = paid.gang.find((member) => member.id === memberId);
  return withResult(addLog({
    ...paid,
    stepsLeft: clamp(paid.stepsLeft - 2, 0, 99),
    gang: paid.gang.map((member) => member.id === memberId ? { ...member, [stat]: clamp(member[stat] + 5, 1, 99) } : member),
  }, `${target?.nickname ?? 'Ein Gangmitglied'} trainiert ${statLabel(stat as Requirement['stat']) || stat}.`), 'Training abgeschlossen', [`${target?.nickname ?? 'Ein Gangmitglied'} verbessert ${stat}.`]);
}

export function trainPlayer(state: GameState, stat: 'strength' | 'intelligence' | 'brutality'): GameState {
  const paid = spend(state, 600);
  if (!paid) return withResult(addLog(state, 'Training kostet $600.'), 'Nicht möglich', ['Training kostet $600.']);
  if (paid.stepsLeft < 2) return withResult(state, 'Nicht möglich', ['Training benötigt 2 Schritte.']);
  return withResult(addLog({
    ...paid,
    stepsLeft: paid.stepsLeft - 2,
    stats: { ...paid.stats, [stat]: clamp(paid.stats[stat] + 4, 1, 99) },
  }, `Du trainierst ${statLabel(stat)}.`), 'Training abgeschlossen', [`${statLabel(stat)} +4.`, 'Bessere Waffen werden erreichbar.']);
}

export function fireMember(state: GameState, memberId: string): GameState {
  const target = state.gang.find((member) => member.id === memberId);
  return withResult(addLog({ ...state, gang: state.gang.filter((member) => member.id !== memberId) }, `${target?.nickname ?? 'Ein Gangmitglied'} verlässt die Bande.`), 'Entlassen', [`${target?.nickname ?? 'Ein Gangmitglied'} verlässt die Bande.`]);
}

export function healMember(state: GameState, memberId: string): GameState {
  const paid = spend(state, 900);
  if (!paid) return withResult(addLog(state, 'Behandlung kostet $900.'), 'Nicht möglich', ['Behandlung kostet $900.']);
  const target = paid.gang.find((member) => member.id === memberId);
  return withResult(addLog({ ...paid, gang: paid.gang.map((member) => member.id === memberId ? { ...member, status: 'aktiv' } : member) }, `${target?.nickname ?? 'Ein Gangmitglied'} ist wieder einsatzfähig.`), 'Behandlung abgeschlossen', [`${target?.nickname ?? 'Ein Gangmitglied'} ist wieder aktiv.`]);
}

export interface ActionResult {
  state: GameState;
  combat?: CombatState;
}

export function resolveAction(state: GameState, actionId: ActionId): ActionResult {
  const action = getAction(actionId);
  const blocked = actionAvailability(state, action);
  if (blocked.length) return { state: withResult(addLog(state, blocked[0]), 'Nicht möglich', blocked) };
  if (action.id === 'gang-war') return { state, combat: makeCombat(state, 'rival') };

  const paid = spend(state, action.cost);
  if (!paid) return { state: withResult(addLog(state, `${action.name} kostet ${formatMoney(action.cost)}.`), 'Nicht möglich', [`${action.name} kostet ${formatMoney(action.cost)}.`]) };

  let next: GameState = {
    ...paid,
    stepsLeft: clamp(paid.stepsLeft - (action.stepCost ?? 1), 0, 99),
    monthly: action.cooldownKey ? { ...(paid.monthly ?? {}), [monthlyKey(paid, action)]: true } : (paid.monthly ?? {}),
  };
  const chance = successChance(next, action) / 100;
  const success = Math.random() < chance;
  const car = getCar(next.car);
  const policeShift = clamp(action.policeRisk + car.policeRiskModifier, -3, 4);

  if (action.id === 'rent-room') {
    next = { ...next, hotelRoom: true };
    return { state: withResult(addLog(next, 'Du mietest ein Hotelzimmer. Jetzt hast Du eine Adresse für Leute, die nicht fragen.'), 'Hotelzimmer gemietet', ['Hotelzimmer aktiv.', 'Voraussetzung für Bande erfüllt.']) };
  }

  if (action.id === 'found-gang') {
    next = { ...next, gangFounded: true, points: next.points + (action.pointEffect ?? 0), stats: { ...next.stats, reputation: clamp(next.stats.reputation + 2, 0, 99) } };
    return { state: withResult(addLog(next, 'Die Bande ist gegründet. Ab jetzt kostet Loyalität jeden Monat Geld.'), 'Bande gegründet', ['Rekrutierung ist freigeschaltet.', `Punkte +${action.pointEffect ?? 0}.`]) };
  }

  if (action.id === 'lay-low') {
    next = {
      ...next,
      stats: { ...next.stats, wanted: clamp(next.stats.wanted - 2, 0, 10), danger: clamp(next.stats.danger - 1, 0, 10), reputation: clamp(next.stats.reputation - 1, 0, 99) },
    };
    return { state: withResult(addLog(next, 'Du bleibst im Schatten. Die Fahndung kühlt ab.'), 'Untergetaucht', ['Fahndung -2.', 'Gefahr sinkt leicht.']) };
  }

  if (action.id === 'heal-player') {
    return { state: withResult(addLog({ ...next, stats: { ...next.stats, health: 100 } }, 'Das Krankenhaus flickt Dich zusammen.'), 'Behandelt', ['Gesundheit vollständig wiederhergestellt.']) };
  }

  if (action.id.includes('counterfeit')) {
    const value = action.reward?.[0] ?? 0;
    const detected = Math.random() < (action.risk === 'hoch' ? 0.35 : action.risk === 'mittel' ? 0.2 : 0.09) + next.stats.wanted * 0.02;
    next = {
      ...next,
      stats: {
        ...next.stats,
        counterfeit: next.stats.counterfeit + value,
        wanted: clamp(next.stats.wanted + (detected ? action.policeRisk : 0), 0, 10),
      },
    };
    return { state: withResult(addLog(next, detected ? `${action.name}: Die Scheine sind gut, aber ein Händler wird misstrauisch.` : `${action.name}: Ede liefert. ${formatMoney(value)} Blüten wandern in Deine Tasche.`), detected ? 'Blüten riskant' : 'Blüten gekauft', [detected ? 'Ein Händler wird misstrauisch.' : `${formatMoney(value)} Falschgeld erhalten.`, detected ? `Fahndung +${action.policeRisk}` : 'Noch fliegt nichts auf.']) };
  }

  if (action.id === 'fake-passport') {
    return { state: withResult(addLog({ ...next, stats: { ...next.stats, passport: true, wanted: clamp(next.stats.wanted - 2, 0, 10) } }, 'Ein neuer Name, ein neuer Stempel, weniger Fragen.'), 'Neuer Pass', ['Falscher Pass aktiv.', 'Fahndung -2.']) };
  }

  if (action.id === 'police-bribe') {
    const ok = success || next.stats.money > 5000;
    return { state: withResult(addLog({ ...next, stats: { ...next.stats, wanted: clamp(next.stats.wanted - (ok ? 2 : 0), 0, 10) } }, ok ? 'Die Akte wird dünner.' : 'Der Umschlag landet bei der falschen Person.'), ok ? 'Bestechung gelungen' : 'Bestechung gescheitert', [ok ? 'Fahndung -2.' : 'Keine Wirkung.']) };
  }

  if (action.id === 'steal-car') {
    const wonCar = success ? (Math.random() < 0.55 ? 'talbot90' : 'chevyRoadster') as CarId : undefined;
    next = {
      ...next,
      car: wonCar ?? next.car,
      points: next.points + (success ? action.pointEffect ?? 0 : 0),
      stats: { ...next.stats, wanted: clamp(next.stats.wanted + (success ? 1 : 2), 0, 10), reputation: clamp(next.stats.reputation + (success ? 1 : 0), 0, 99) },
    };
    return { state: withResult(addLog(next, success && wonCar ? `${getCar(wonCar).name} gestohlen.` : 'Autodiebstahl scheitert.'), success ? 'Auto gestohlen' : 'Fehlschlag', success && wonCar ? [`${getCar(wonCar).name} ist jetzt aktiv.`, `Punkte +${action.pointEffect ?? 0}.`] : ['Ein Wachmann schlägt Alarm.', 'Fahndung steigt.']) };
  }

  if (success) {
    const reward = action.reward ? action.reward[0] + Math.floor(Math.random() * (action.reward[1] - action.reward[0] + 1)) : 0;
    next = {
      ...next,
      points: clamp(next.points + (action.pointEffect ?? 0), 0, 120),
      stats: {
        ...next.stats,
        money: next.stats.money + reward,
        reputation: clamp(next.stats.reputation + action.reputationEffect, 0, 99),
        wanted: clamp(next.stats.wanted + Math.max(0, policeShift), 0, 10),
        danger: clamp(next.stats.danger + (action.danger ?? 0), 0, 10),
      },
    };
    next = withResult(addLog(next, `${action.name} gelingt. Beute: ${formatMoney(reward)}.`), 'Erfolg', [`${action.name} gelingt.`, `Beute: ${formatMoney(reward)}.`, `Punkte +${action.pointEffect ?? 0}.`, `Ruf ${action.reputationEffect >= 0 ? '+' : ''}${action.reputationEffect}.`]);
  } else {
    const damage = action.risk === 'sehr hoch' ? 30 : action.risk === 'hoch' ? 20 : 10;
    const active = activeGang(next.gang);
    const unlucky = active.length && Math.random() < 0.45 ? active[Math.floor(Math.random() * active.length)] : undefined;
    next = {
      ...next,
      stats: {
        ...next.stats,
        health: clamp(next.stats.health - damage, 0, 100),
        wanted: clamp(next.stats.wanted + Math.max(1, action.policeRisk), 0, 10),
        reputation: clamp(next.stats.reputation - 1, 0, 99),
      },
      gang: next.gang.map((member) => member.id === unlucky?.id ? { ...member, status: Math.random() < 0.25 ? 'verhaftet' : 'verletzt' } : member),
    };
    next = withResult(addLog(next, `${action.name} scheitert. ${action.failure}`), 'Fehlschlag', [action.failure, `Gesundheit -${damage}.`, `Fahndung +${Math.max(1, action.policeRisk)}.`]);
  }

  if (next.stats.health <= 0) next = { ...next, screen: 'lost', gameOverReason: 'Du bist Deinen Verletzungen erlegen.' };
  if (next.points >= 120 && next.stats.money >= 50000 && activeGang(next.gang).length >= 5) next = { ...next, screen: 'won', gameOverReason: 'Du bist Der Pate geworden.' };
  return { state: next };
}

export function processMonth(state: GameState): GameState {
  const upkeep = state.gang.filter((member) => member.status !== 'tot').reduce((sum, member) => sum + member.upkeep, 0);
  const informantIncome = activeGang(state.gang).filter((member) => member.role === 'Informant').length * 180;
  const protectionIncome = Object.keys(state.monthly ?? {}).filter((key) => key.startsWith('blackmail')).length * 90;
  let next: GameState = {
    ...state,
    month: state.month + 1,
    stepsLeft: getCar(state.car).movementPoints,
    monthly: {},
    stats: {
      ...state.stats,
      money: state.stats.money - upkeep + informantIncome + protectionIncome,
      health: clamp(state.stats.health + 5, 0, 100),
      wanted: clamp(state.stats.wanted - (state.stats.passport ? 1 : 0), 0, 10),
    },
    gang: state.gang.map((member) => member.status === 'verletzt' && Math.random() < 0.35 ? { ...member, status: 'aktiv' } : member),
  };
  const events: string[] = [`Unterhalt: ${formatMoney(upkeep)}.`, `Informanten: ${formatMoney(informantIncome)}.`, `Schutzgeld-Nachhall: ${formatMoney(protectionIncome)}.`];
  next = addLog(next, `Monat endet. Unterhalt: ${formatMoney(upkeep)}. Informanten: ${formatMoney(informantIncome)}.`);
  if (next.stats.money < 0) {
    next = {
      ...next,
      stats: { ...next.stats, money: 0, reputation: clamp(next.stats.reputation - 2, 0, 99) },
      gang: next.gang.filter((member) => member.loyalty + Math.random() * 10 > 5),
    };
    next = addLog(next, 'Leere Kasse. Niedrige Loyalität wird plötzlich ehrlich.');
    events.push('Leere Kasse: untreue Leute verschwinden.');
  }
  const eventRoll = Math.random();
  if (eventRoll < 0.12) {
    next = addLog({ ...next, stats: { ...next.stats, wanted: clamp(next.stats.wanted + 1, 0, 10) } }, 'Polizeikontrolle im Revier. Namen werden notiert.');
    events.push('Polizeikontrolle: Fahndung +1.');
  } else if (eventRoll < 0.22) {
    next = addLog({ ...next, stats: { ...next.stats, counterfeit: Math.max(0, next.stats.counterfeit - 700), wanted: clamp(next.stats.wanted + 1, 0, 10) } }, 'Ein Blütenschein fliegt auf.');
    events.push('Blüten entdeckt: Blüten -700, Fahndung +1.');
  } else if (eventRoll < 0.32) {
    next = addLog({ ...next, stats: { ...next.stats, danger: clamp(next.stats.danger + 1, 0, 10) } }, 'Eine rivalisierende Bande markiert Dein Viertel.');
    events.push('Rivalen markieren Dein Viertel: Gefahr +1.');
  } else if (eventRoll < 0.42) {
    next = addLog({ ...next, stats: { ...next.stats, reputation: clamp(next.stats.reputation + 1, 0, 99) } }, 'Dein Name fällt in mehr Hinterzimmern.');
    events.push('Gerüchte: Ruf +1.');
  }

  if (next.month >= 36) next = { ...next, screen: 'lost', gameOverReason: '01/1928 ist erreicht. Die Stadt hat einen anderen Boss gefunden.' };
  if (next.stats.health <= 0) next = { ...next, screen: 'lost', gameOverReason: 'Du bist Deinen Verletzungen erlegen.' };
  if (next.points >= 120 && next.stats.money >= 50000 && activeGang(next.gang).length >= 5) next = { ...next, screen: 'won', gameOverReason: 'Du bist Der Pate geworden.' };
  return withResult(next, `Monatsbericht ${formatGameDate(next.month)}`, [
    `Geld: ${formatMoney(next.stats.money)}`,
    `Rang: ${getRank(next.points).name}`,
    `Punkte: ${next.points}`,
    `Fahndung: ${next.stats.wanted}`,
    ...events,
  ]);
}

export function movePlayer(state: GameState, dx: number, dy: number): GameState {
  if (state.policeCheck) return state;
  const x = clamp(state.position.x + dx, 0, MAP_WIDTH - 1);
  const y = clamp(state.position.y + dy, 0, MAP_HEIGHT - 1);
  if ((x === state.position.x && y === state.position.y) || state.stepsLeft <= 0) return state;
  const target = state.map.find((tile) => tile.x === x && tile.y === y);
  if (!target || !isWalkable(target)) return state;
  let next: GameState = { ...state, position: { x, y }, stepsLeft: state.stepsLeft - 1 };
  const risk = policeCheckRisk(next);
  if (Math.random() < risk) {
    next = {
      ...next,
      policeCheck: {
        risk,
        reason: 'Eine Streife mustert Dich an der Straßenecke.',
      },
    };
  }
  return next;
}

function isWalkable(tile: Tile): boolean {
  return tile.kind === 'road' || Boolean(tile.building);
}

function policeCheckRisk(state: GameState): number {
  if (rankMeets(getRank(state.points).name, 'Bullenschreck')) return 0;
  const rankPressure = ranks.findIndex((rank) => rank.name === getRank(state.points).name) * 0.006;
  const goodsPressure = state.stats.counterfeit > 0 ? 0.025 : 0;
  const passportRelief = state.stats.passport ? -0.025 : 0;
  const carRelief = getCar(state.car).policeRiskModifier * 0.012;
  return clamp(0.015 + state.stats.wanted * 0.018 + state.stats.danger * 0.008 + rankPressure + goodsPressure + passportRelief + carRelief, 0.005, 0.22);
}

export function resolvePoliceCheck(state: GameState, option: 'flee' | 'bribe' | 'calm' | 'passport'): GameState {
  if (!state.policeCheck) return state;
  const baseRisk = state.policeCheck.risk;
  const optionModifier = option === 'flee' ? 0.12 : option === 'bribe' ? -0.08 : option === 'passport' && state.stats.passport ? -0.14 : 0;
  const cost = option === 'bribe' ? 300 + state.stats.wanted * 120 : 0;
  const paid = cost ? spend(state, cost) : state;
  if (!paid) {
    return withResult({ ...state, policeCheck: undefined }, 'Polizeikontrolle', ['Bestechung scheitert: nicht genug Geld.', 'Die Beamten notieren Deinen Namen.', 'Fahndung +1.']);
  }
  const failed = Math.random() < clamp(baseRisk + optionModifier, 0.02, 0.75);
  let next: GameState = { ...paid, policeCheck: undefined };
  if (!failed) {
    return withResult(addLog(next, 'Polizeikontrolle überstanden.'), 'Polizeikontrolle', [option === 'passport' ? 'Der falsche Pass hält.' : 'Du kommst davon.', cost ? `Bestechung: ${formatMoney(cost)}.` : 'Keine Kosten.']);
  }
  const jailMonths = option === 'flee' ? 2 : 1 + Math.floor(Math.random() * 2);
  const moneyLoss = Math.min(next.stats.money, 250 + next.stats.wanted * 180);
  next = {
    ...next,
    month: clamp(next.month + jailMonths, 0, 36),
    stepsLeft: getCar(next.car).movementPoints,
    monthly: {},
    points: clamp(next.points - (option === 'flee' ? 5 : 3), 0, 120),
    stats: {
      ...next.stats,
      money: next.stats.money - moneyLoss,
      counterfeit: Math.max(0, next.stats.counterfeit - 1000),
      wanted: clamp(next.stats.wanted + (option === 'flee' ? 2 : 1), 0, 10),
    },
    gang: next.gang.map((member, index) => index === 0 && Math.random() < 0.25 ? { ...member, status: 'verhaftet' } : member),
  };
  if (next.month >= 36) next = { ...next, screen: 'lost', gameOverReason: 'Du hast zu viel Zeit im Gefängnis verloren. 01/1928 ist erreicht.' };
  return withResult(addLog(next, `Verhaftet: ${jailMonths} Monat(e) verloren.`), 'Verhaftet', [`Du verlierst ${jailMonths} Monat(e).`, `Geldverlust: ${formatMoney(moneyLoss)}.`, 'Punkte sinken.', 'Fahndung steigt.']);
}

export function makeCombat(state: GameState, kind: 'police' | 'rival'): CombatState {
  const allies = activeGang(state.gang).slice(0, 4).map((member, index) => ({ ...member, x: 0, y: index + 1 }));
  const enemies = Array.from({ length: kind === 'police' ? 3 : 4 }, (_, index) => ({
    id: crypto.randomUUID(),
    name: kind === 'police' ? `Schupo ${index + 1}` : `Rivale ${index + 1}`,
    health: 42 + state.stats.danger * 7,
    strength: 4 + state.stats.danger,
    weapon: (index % 2 ? 'colt1911' : 'none') as WeaponId,
    x: 5,
    y: index + 1,
  }));
  return {
    kind,
    title: kind === 'police' ? 'Schusswechsel mit der Polizei' : 'Bandenkrieg',
    phase: 'player',
    selectedId: allies[0]?.id,
    allies,
    enemies,
    obstacles: [{ x: 2, y: 1 }, { x: 3, y: 2 }, { x: 2, y: 3 }, { x: 4, y: 0 }],
    message: allies.length ? 'Wähle Leute, bewege sie oder greife an.' : 'Ohne aktive Gang ist das Selbstmord.',
  };
}

export function combatMove(combat: CombatState, id: string, dx: number, dy: number): CombatState {
  return {
    ...combat,
    allies: combat.allies.map((ally) => ally.id === id ? { ...ally, x: clamp((ally.x ?? 0) + dx, 0, 5), y: clamp((ally.y ?? 0) + dy, 0, 4) } : ally),
    message: 'Bewegt. Angriffe bleiben möglich.',
  };
}

export function combatAttack(combat: CombatState, attackerId: string, enemyId: string): CombatState {
  const attacker = combat.allies.find((ally) => ally.id === attackerId);
  const enemy = combat.enemies.find((target) => target.id === enemyId);
  if (!attacker || !enemy) return combat;
  const weapon = getWeapon(attacker.weapon);
  const distance = Math.abs((attacker.x ?? 0) - enemy.x) + Math.abs((attacker.y ?? 0) - enemy.y);
  if (distance > weapon.range) return { ...combat, message: 'Ziel außer Reichweite.' };
  const hit = Math.random() * 100 < clamp(weapon.accuracy + attacker.shooting * 0.35 + attacker.brutality * 0.12 - distance * 8, 5, 95);
  const damage = hit ? weapon.damage + attacker.strength * 2 : 0;
  const enemies = combat.enemies.map((target) => target.id === enemyId ? { ...target, health: target.health - damage } : target).filter((target) => target.health > 0);
  return { ...combat, enemies, phase: enemies.length ? 'enemy' : 'finished', message: hit ? `${attacker.nickname} trifft für ${damage}.` : `${attacker.nickname} verfehlt.` };
}

export function combatEnemyTurn(combat: CombatState): CombatState {
  let allies = [...combat.allies];
  for (const enemy of combat.enemies) {
    const target = allies[Math.floor(Math.random() * allies.length)];
    if (!target) break;
    const damage = getWeapon(enemy.weapon).damage * 0.35 + enemy.strength;
    if (Math.random() < 0.58) allies = allies.map((ally) => ally.id === target.id ? { ...ally, loyalty: ally.loyalty - damage / 10 } : ally);
  }
  allies = allies.filter((ally) => ally.loyalty > 0);
  return { ...combat, allies, phase: allies.length ? 'player' : 'finished', selectedId: allies[0]?.id, message: allies.length ? 'Der Gegner hat geschossen. Du bist dran.' : 'Deine Leute liegen am Boden.' };
}

export function finishCombat(state: GameState, combat: CombatState): GameState {
  const won = combat.enemies.length === 0 && combat.allies.length > 0;
  const aliveIds = new Set(combat.allies.map((ally) => ally.id));
  let next: GameState = {
    ...state,
    screen: 'game',
    combat: undefined,
    gang: state.gang.map((member) => {
      if (member.status !== 'aktiv') return member;
      if (aliveIds.has(member.id)) return member;
      return { ...member, status: combat.kind === 'police' ? 'verhaftet' : 'verletzt' };
    }),
    stats: {
      ...state.stats,
      money: clamp(state.stats.money + (won ? 2200 : -1200), 0, 999999),
      reputation: clamp(state.stats.reputation + (won ? 6 : -4), 0, 99),
      wanted: clamp(state.stats.wanted + (combat.kind === 'police' ? 2 : 1), 0, 10),
      danger: clamp(state.stats.danger + (won ? 2 : 0), 0, 10),
    },
    points: clamp(state.points + (won ? 6 : -4), 0, 120),
  };
  next = addLog(next, won ? 'Du gewinnst den Kampf. Die Straße merkt sich die Lektion.' : 'Niederlage. Geld, Ruf und Leute gehen verloren.');
  return withResult(next, won ? 'Kampf gewonnen' : 'Kampf verloren', won
    ? ['Die Bande gewinnt.', 'Punkte +6.', 'Ruf steigt, Gefahr steigt.']
    : ['Niederlage ist nicht das Ende.', 'Geld und Punkte verloren.', combat.kind === 'police' ? 'Einige Leute können verhaftet werden.' : 'Einige Leute sind verletzt.']);
}
