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

export type TileKind = 'road' | 'sidewalk' | 'building' | 'decor' | 'street' | 'alley' | 'park' | 'warehouse' | 'lamp' | 'wall' | 'yard' | 'block' | 'water' | 'rails' | 'dock';
export type MemberStatus = 'aktiv' | 'verletzt' | 'verhaftet' | 'tot';
export type Role = 'Schlaeger' | 'Fahrerin' | 'Planer' | 'Safeknacker' | 'Schuetzin' | 'Informant' | 'Verhandler';
export type WeaponId = 'none' | 'colt1911' | 'savage1907' | 'remington11' | 'winchester97' | 'sw10' | 'thompson' | 'browningBar' | 'grenades';
export type CarId = 'foot' | 'talbot90' | 'chevyRoadster' | 'buickCentury' | 'auburn120' | 'citroenTa';
export type Screen = 'menu' | 'game' | 'gang' | 'combat' | 'won' | 'lost';
export type RankName = 'Anfänger' | 'Schläger' | 'Kleiner Fisch' | 'Langfinger' | 'Ganove' | 'Mafiosi' | 'Bullenschreck' | 'Meuchelmörder' | 'Gangsterboss' | 'Rechte Hand' | 'Der Pate';
export type CombatScenarioId = 'police' | 'bank' | 'station' | 'harbor' | 'villa' | 'rival' | 'alley';
export type CombatTerrain = 'floor' | 'street' | 'desk' | 'counter' | 'crate' | 'wall' | 'platform';
export type ProtectionStatus = 'protectedByPlayer' | 'protectedByRival';
export type MapIconId =
  | 'bank'
  | 'shop'
  | 'pub'
  | 'loanShark'
  | 'weapons'
  | 'carDealer'
  | 'counterfeit'
  | 'police'
  | 'hospital'
  | 'station'
  | 'subway'
  | 'harbor'
  | 'villa'
  | 'hideout'
  | 'hotel'
  | 'casino'
  | 'pawnshop';
export type LocationTag =
  | 'starter'
  | 'cheap'
  | 'premium'
  | 'illegal'
  | 'heavyWeapons'
  | 'luxuryCars'
  | 'smuggling'
  | 'recruitSchlaeger'
  | 'recruitDriver'
  | 'recruitShooter'
  | 'recruitPlanner'
  | 'recruitInformant'
  | 'recruitNegotiator'
  | 'highSociety'
  | 'police'
  | 'waterfront'
  | 'railway';
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
  | 'casino-roulette'
  | 'casino-crooked-cards'
  | 'casino-roulette-brake'
  | 'casino-high-table'
  | 'casino-extort'
  | 'lay-low'
  | 'heal-player'
  | 'harbor-heist'
  | 'station-job'
  | 'villa-burglary'
  | 'police-bribe'
  | 'police-chief-bribe'
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
  | 'credit-start'
  | 'credit-invest'
  | 'debt-collection'
  | 'steal-car'
  | 'ask-tip'
  | 'alcohol-buy'
  | 'alcohol-sell'
  | 'money-transport'
  | 'mayor-hit';

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
  /** Legacy save field. Used as visible Blütenrisiko, not as a second wallet. */
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
  health: number;
  x?: number;
  y?: number;
}

export interface OwnedWeapon {
  id: string;
  weaponId: WeaponId;
  assignedTo?: string;
}

export interface BuildingConfig {
  id: BuildingType;
  name: string;
  mapIcon: MapIconId;
  category: 'Unterkunft' | 'Geschäfte' | 'Risiko' | 'Stadt';
  description: string;
  district: District;
  actions: ActionId[];
}

export interface LocationInstance {
  id: string;
  type: BuildingType;
  name: string;
  shortName?: string;
  district: District;
  x: number;
  y: number;
  width?: number;
  height?: number;
  quality: 1 | 2 | 3 | 4;
  risk: 1 | 2 | 3 | 4;
  tags: LocationTag[];
  description: string;
  weaponInventory?: WeaponId[];
  carInventory?: CarId[];
  recruitRoles?: Role[];
  tipTiers?: Array<TipConfig['tier']>;
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
  tipOnly?: boolean;
  effect: string;
  failure: string;
}

export interface TipConfig {
  id: string;
  title: string;
  text: string;
  cost: number;
  tier: 'early' | 'mid' | 'late';
  requiredRank?: RankName;
  requiredStats?: Requirement[];
  unlocksAction?: ActionId;
  expiresInMonths: number;
  guaranteedCombat?: boolean;
  scenario?: CombatScenarioId;
  rewardModifier?: number;
  locationDistrict?: District;
  distanceHint?: string;
}

export interface ActiveTip extends TipConfig {
  expiresMonth: number;
}

export interface CreditBusiness {
  owned: boolean;
  invested: number;
  heat: number;
}

export interface Tile {
  id: string;
  x: number;
  y: number;
  district: District;
  kind: TileKind;
  building?: BuildingType;
  buildingVisualFor?: BuildingType;
  locationId?: string;
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

export interface CombatAlly {
  id: string;
  name: string;
  nickname: string;
  role: Role | 'Spieler';
  status: MemberStatus;
  health: number;
  strength: number;
  intelligence: number;
  brutality: number;
  shooting: number;
  driving: number;
  loyalty: number;
  weapon: WeaponId;
  isPlayer?: boolean;
  x?: number;
  y?: number;
}

export interface CombatState {
  kind: 'police' | 'rival';
  scenario: CombatScenarioId;
  title: string;
  phase: 'player' | 'enemy' | 'finished';
  selectedId?: string;
  sourceActionId?: ActionId;
  sourceShopKey?: string;
  fx?: { attackerId: string; targetId: string; hit: boolean };
  allies: CombatAlly[];
  enemies: CombatEnemy[];
  terrain: Array<{ x: number; y: number; type: CombatTerrain; icon: string; blocks: boolean }>;
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

export interface ProtectionChallenge {
  shopKey: string;
  label: string;
}

export interface GameState {
  screen: Screen;
  playerName: string;
  gangName: string;
  month: number;
  points: number;
  position: { x: number; y: number };
  stepsLeft: number;
  stats: PlayerStats;
  gang: GangMember[];
  car: CarId;
  hotelRoom: boolean;
  gangFounded: boolean;
  arsenal: OwnedWeapon[];
  monthly: Record<string, boolean | number>;
  monthlyCrimeCount: number;
  monthlyMajorCrimeCount: number;
  monthlyQuietActions: number;
  monthlyInjured: boolean;
  monthlyPointGain: number;
  actionCooldowns: Record<string, number>;
  shopProtections: Record<string, ProtectionStatus>;
  availableTips: TipConfig[];
  activeTips: ActiveTip[];
  alcoholBarrels: number;
  alcoholIncomeThisMonth: number;
  creditBusiness: CreditBusiness;
  protectionChallenge?: ProtectionChallenge;
  policeCheckCooldownUntilMonth?: number;
  policeProtectionUntilMonth?: number;
  log: LogEntry[];
  map: Tile[];
  result?: ResultMessage;
  policeCheck?: PoliceCheck;
  gameOverReason?: string;
  combat?: CombatState;
}

export const SAVE_KEY = 'unterwelt-1929-save';
export const DEFAULT_PLAYER_NAME = 'Unbekannter aus Chicago';
export const DEFAULT_GANG_NAMES = ['Die Nordstadt-Jungs', 'Die Schwarzen Hüte', 'Die 12. Straße', 'Edes Schatten', 'Die Hafenratten'];
export const MAP_WIDTH = 32;
export const MAP_HEIGHT = 24;
export const MAP_SIZE = MAP_WIDTH;
export const COMBAT_WIDTH = 12;
export const COMBAT_HEIGHT = 8;
export const MONTHLY_POINT_CAP = 10;

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
    range: 5,
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
    range: 5,
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
    range: 4,
    accuracy: 54,
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
    range: 4,
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
    range: 6,
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
    range: 7,
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
    range: 9,
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
    range: 5,
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
    upkeep: 120,
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
    upkeep: 250,
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
    upkeep: 450,
    weapon: 'savage1907',
    special: 'Reduziert Fehlschlagrisiko bei komplexen Coups.',
    weakness: 'Geringe Loyalität, wenn Dein Straßenruf schwach ist.',
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
    upkeep: 320,
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
    upkeep: 750,
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
    upkeep: 90,
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
    upkeep: 500,
    weapon: 'sw10',
    special: 'Verbessert Erpressung, Bestechung und Verhandlungen.',
    weakness: 'Teuer und anspruchsvoll.',
    requirements: [{ rank: 'Ganove' }, { hotelRoom: true }],
  },
];

export const buildings: BuildingConfig[] = [
  { id: 'hideout', name: 'Versteck', mapIcon: 'hideout', category: 'Unterkunft', description: 'Kalter Ofen, falsche Papiere, ein Bett pro Freund.', district: 'Altstadt', actions: ['lay-low', 'found-gang', 'gang-war'] },
  { id: 'kneipe', name: 'Kneipe', mapIcon: 'pub', category: 'Unterkunft', description: 'Rauch, Korn und Menschen, die neue Chefs suchen.', district: 'Rotlichtgasse', actions: ['ask-tip', 'alcohol-buy', 'alcohol-sell', 'blackmail', 'gang-war'] },
  { id: 'hotel', name: 'Hotel', mapIcon: 'hotel', category: 'Unterkunft', description: 'Teure Zimmer, diskrete Türen, bessere Kontakte.', district: 'Villenviertel', actions: ['rent-room', 'found-gang'] },
  { id: 'weapons', name: 'Waffenhändler', mapIcon: 'weapons', category: 'Geschäfte', description: 'Der Keller riecht nach Öl und schlechten Entscheidungen.', district: 'Industriegebiet', actions: [] },
  { id: 'cars', name: 'Autohändler', mapIcon: 'carDealer', category: 'Geschäfte', description: 'Frisierte Motoren und Rechnungen ohne Namen.', district: 'Bahnhofsviertel', actions: ['steal-car'] },
  { id: 'counterfeit', name: 'Blüten-Ede', mapIcon: 'counterfeit', category: 'Geschäfte', description: 'Blüten-Ede sitzt im Hinterzimmer einer verrauchten Druckerei. Seine Scheine riechen fast echt.', district: 'Altstadt', actions: ['cheap-counterfeit', 'clean-counterfeit', 'master-counterfeit', 'fake-passport', 'counterfeit-contacts'] },
  { id: 'bank', name: 'Bank', mapIcon: 'bank', category: 'Risiko', description: 'Marmor, Stahl und Wachmänner mit nervösen Händen.', district: 'Altstadt', actions: ['bank-robbery', 'safe-crack'] },
  { id: 'casino', name: 'Casino', mapIcon: 'casino', category: 'Risiko', description: 'Glücksspiel, Schuldscheine und Samtvorhänge.', district: 'Rotlichtgasse', actions: ['casino-roulette', 'casino-crooked-cards', 'casino-roulette-brake', 'casino-high-table', 'casino-extort'] },
  { id: 'police', name: 'Polizeirevier', mapIcon: 'police', category: 'Stadt', description: 'Aktenordner, Zellen, Namen an Tafeln.', district: 'Polizeibezirk', actions: ['police-chief-bribe', 'police-bribe'] },
  { id: 'hospital', name: 'Krankenhaus', mapIcon: 'hospital', category: 'Stadt', description: 'Saubere Laken für dreckiges Geld.', district: 'Polizeibezirk', actions: ['heal-player'] },
  { id: 'harbor', name: 'Hafenlager', mapIcon: 'harbor', category: 'Risiko', description: 'Kisten, Nebel, Wachhunde und verschwundene Fracht.', district: 'Hafenviertel', actions: ['harbor-heist'] },
  { id: 'station', name: 'Bahnhof', mapIcon: 'station', category: 'Stadt', description: 'Koffer, Fahrpläne und niemand schaut zweimal hin.', district: 'Bahnhofsviertel', actions: ['station-job', 'train-robbery', 'money-transport'] },
  { id: 'villa', name: 'Villa', mapIcon: 'villa', category: 'Risiko', description: 'Reiche Leute schlafen schlecht, wenn Du davon weißt.', district: 'Villenviertel', actions: ['villa-burglary', 'mayor-hit'] },
  { id: 'pawnshop', name: 'Pfandleihe', mapIcon: 'pawnshop', category: 'Geschäfte', description: 'Hier bekommt jedes Problem einen Preis.', district: 'Industriegebiet', actions: ['small-theft', 'pawn-sale'] },
  { id: 'subway', name: 'U-Bahn', mapIcon: 'subway', category: 'Stadt', description: 'Gedränge am Bahnsteig. Kleine Hände, kleine Scheine.', district: 'Bahnhofsviertel', actions: ['subway-pickpocket'] },
  { id: 'loanshark', name: 'Kredit-Hai', mapIcon: 'loanShark', category: 'Geschäfte', description: 'Geld heute, Schmerzen morgen.', district: 'Rotlichtgasse', actions: ['loan-take', 'loan-repay', 'credit-start', 'credit-invest', 'debt-collection'] },
  { id: 'shop', name: 'Laden', mapIcon: 'shop', category: 'Geschäfte', description: 'Kasse, Besitzer, Schaufenster. Ein Anfang.', district: 'Altstadt', actions: ['beg', 'shop-robbery', 'blackmail'] },
];

export const actions: ActionConfig[] = [
  { id: 'beg', name: 'Betteln', building: 'shop', cost: 0, reward: [10, 80], risk: 'niedrig', policeRisk: 0, reputationEffect: 0, requirements: [], rank: 'Anfänger', stepCost: 1, pointEffect: 0, cooldownKey: 'beg', effect: 'Ein würdeloser, aber sicherer Anfang.', failure: 'Niemand gibt Dir etwas.' },
  { id: 'shop-robbery', name: 'Laden ausrauben', building: 'shop', cost: 0, reward: [120, 420], risk: 'hoch', policeRisk: 2, reputationEffect: 1, requirements: [], rank: 'Anfänger', stepCost: 2, pointEffect: 1, cooldownKey: 'shop-robbery', effect: 'Riskanter Kassenraub. Einmal pro Laden und Monat.', failure: 'Der Ladenbesitzer ruft die Polizei.' },
  { id: 'small-theft', name: 'Kleinen Bruch drehen', building: 'pawnshop', cost: 0, reward: [120, 420], risk: 'niedrig', policeRisk: 1, reputationEffect: 1, requirements: [], rank: 'Anfänger', stepCost: 1, pointEffect: 1, cooldownKey: 'small-theft', effect: 'Schnelles Geld für den Anfang.', failure: 'Du verlierst Gesundheit oder bekommst Fahndungsdruck.' },
  { id: 'pawn-sale', name: 'Beute versetzen', building: 'pawnshop', cost: 0, reward: [80, 260], risk: 'niedrig', policeRisk: 0, reputationEffect: 0, requirements: [], rank: 'Anfänger', stepCost: 1, pointEffect: 0, cooldownKey: 'pawn-sale', effect: 'Kleiner sicherer Erlös.', failure: 'Der Pfandleiher drückt den Preis.' },
  { id: 'subway-pickpocket', name: 'Taschendiebstahl am Bahnsteig', building: 'subway', cost: 0, reward: [90, 350], risk: 'niedrig', policeRisk: 1, reputationEffect: 1, requirements: [], rank: 'Kleiner Fisch', stepCost: 1, pointEffect: 1, cooldownKey: 'subway', effect: 'Viele Taschen, wenig Licht.', failure: 'Ein Schaffner schaut zu genau hin.' },
  { id: 'blackmail', name: 'Schutzgeld eintreiben', building: 'kneipe', cost: 0, reward: [320, 900], risk: 'mittel', policeRisk: 1, reputationEffect: 2, requirements: [], rank: 'Langfinger', stepCost: 2, pointEffect: 1, cooldownKey: 'blackmail', recommendedRoles: ['Schlaeger', 'Verhandler'], gangSlots: 1, effect: 'Brutalität und Verhandlungsgeschick zählen.', failure: 'Das Opfer rennt zur Polizei.' },
  { id: 'ask-tip', name: 'Nach Tipp fragen', building: 'kneipe', cost: 80, risk: 'niedrig', policeRisk: 0, reputationEffect: 0, requirements: [], rank: 'Anfänger', stepCost: 1, pointEffect: 0, cooldownKey: 'ask-tip', effect: 'Der Wirt kennt Namen, Wagen und falsche Uhrzeiten.', failure: 'Heute hört niemand etwas.' },
  { id: 'alcohol-buy', name: 'Alkoholfässer kaufen', building: 'kneipe', cost: 100, risk: 'mittel', policeRisk: 1, reputationEffect: 0, requirements: [], rank: 'Anfänger', stepCost: 1, pointEffect: 0, cooldownKey: 'alcohol-buy', effect: 'Schwarz gebrannter Stoff für die Route. Der Wagen bestimmt die Ladung.', failure: 'Der Lieferant sieht plötzlich Streifenwagen.' },
  { id: 'alcohol-sell', name: 'Alkohol verkaufen', building: 'kneipe', cost: 0, reward: [150, 260], risk: 'mittel', policeRisk: 1, reputationEffect: 1, requirements: [], rank: 'Anfänger', stepCost: 1, pointEffect: 1, cooldownKey: 'alcohol-sell', effect: 'Fässer gegen Bargeld. Der erste gelungene Verkauf im Monat bringt Ruhm.', failure: 'Eine Flasche geht an den falschen Gast.' },
  { id: 'rent-room', name: 'Hotelzimmer mieten', building: 'hotel', cost: 900, risk: 'niedrig', policeRisk: 0, reputationEffect: 0, requirements: [], rank: 'Anfänger', stepCost: 1, pointEffect: 0, cooldownKey: 'rent-room', effect: 'Ein Zimmer als erste Adresse Deiner Bande. Rekrutierung und Bandenverwaltung werden freigeschaltet.', failure: 'Der Portier will echtes Geld.' },
  { id: 'found-gang', name: 'Bande organisieren', building: 'hideout', cost: 0, risk: 'niedrig', policeRisk: 0, reputationEffect: 0, requirements: [], rank: 'Anfänger', stepCost: 1, pointEffect: 0, cooldownKey: 'found-gang', effect: 'Bandenname, Treffpunkt und Regeln festlegen. Schaltet die Bandenverwaltung frei. Keine Punkte, keine Kosten.', failure: 'Niemand hört richtig zu.' },
  { id: 'bank-robbery', name: 'Bank überfallen', building: 'bank', cost: 250, reward: [5000, 25000], risk: 'sehr hoch', policeRisk: 3, reputationEffect: 5, requirements: [{ rank: 'Mafiosi' }, { activeGang: 1 }], rank: 'Mafiosi', stepCost: 3, pointEffect: 4, cooldownKey: 'bank-robbery', recommendedRoles: ['Safeknacker', 'Planer', 'Fahrerin'], gangSlots: 3, danger: 2, effect: 'Große Beute, großer Ruhm, große Akte.', failure: 'Verletzung, Verhaftung oder Geldverlust möglich.' },
  { id: 'safe-crack', name: 'Tresor knacken', building: 'bank', cost: 400, reward: [3000, 13000], risk: 'hoch', policeRisk: 2, reputationEffect: 3, requirements: [{ rank: 'Mafiosi' }, { stat: 'intelligence', min: 45 }, { activeGang: 1 }], rank: 'Mafiosi', stepCost: 3, pointEffect: 3, cooldownKey: 'safe-crack', recommendedRoles: ['Safeknacker', 'Planer'], effect: 'Leiser als ein Banküberfall, aber nicht weniger schwer.', failure: 'Der Tresor schweigt, die Sirene nicht.' },
  { id: 'casino-gamble', name: 'Im Casino spielen', building: 'casino', cost: 300, reward: [0, 1200], risk: 'mittel', policeRisk: 0, reputationEffect: 0, requirements: [], rank: 'Anfänger', stepCost: 1, pointEffect: 0, cooldownKey: 'casino-gamble', effect: 'Alte Option: wird durch die Tische ersetzt.', failure: 'Das Haus gewinnt.' },
  { id: 'casino-roulette', name: 'Roulette spielen', building: 'casino', cost: 120, reward: [0, 420], risk: 'niedrig', policeRisk: 0, reputationEffect: 0, requirements: [], rank: 'Anfänger', stepCost: 1, pointEffect: 0, cooldownKey: 'casino-roulette', effect: 'Kleine Einsätze. Kein Ruhm, keine Akte.', failure: 'Die Kugel fällt gegen Dich.' },
  { id: 'casino-crooked-cards', name: 'Gezinkte Karten', building: 'casino', cost: 250, reward: [300, 1500], risk: 'mittel', policeRisk: 0, reputationEffect: 1, requirements: [{ stat: 'intelligence', min: 35 }], rank: 'Anfänger', stepCost: 1, pointEffect: 0, cooldownKey: 'casino-crooked-cards', recommendedRoles: ['Informant', 'Planer'], effect: 'Intelligenz, Informanten und Planer helfen beim Betrug.', failure: 'Der Croupier erkennt die falsche Bewegung.' },
  { id: 'casino-roulette-brake', name: 'Roulette-Bremse', building: 'casino', cost: 450, reward: [900, 2800], risk: 'hoch', policeRisk: 1, reputationEffect: 2, requirements: [{ stat: 'intelligence', min: 55 }], rank: 'Langfinger', stepCost: 2, pointEffect: 1, cooldownKey: 'casino-roulette-brake', recommendedRoles: ['Planer', 'Informant'], effect: 'Manipuliertes Spiel. Clever, aber sehr auffällig.', failure: 'Ein Saaldiener sieht zu genau hin.' },
  { id: 'casino-high-table', name: 'Hoher Tisch', building: 'casino', cost: 1200, reward: [0, 5200], risk: 'hoch', policeRisk: 0, reputationEffect: 1, requirements: [{ rank: 'Ganove' }], rank: 'Ganove', stepCost: 2, pointEffect: 0, cooldownKey: 'casino-high-table', recommendedRoles: ['Verhandler'], effect: 'Große Einsätze, große Schwankungen, kein Verbrechen.', failure: 'Das Haus lächelt und nimmt alles.' },
  { id: 'casino-extort', name: 'Casino erpressen', building: 'casino', cost: 0, reward: [800, 2400], risk: 'hoch', policeRisk: 2, reputationEffect: 3, requirements: [{ rank: 'Ganove' }, { activeGang: 1 }], rank: 'Ganove', stepCost: 2, pointEffect: 3, cooldownKey: 'casino-extort', recommendedRoles: ['Verhandler', 'Schlaeger'], gangSlots: 2, danger: 1, effect: 'Viel Bargeld, viele Zeugen.', failure: 'Die Türsteher kennen auch Gewalt.' },
  { id: 'lay-low', name: 'Untertauchen', building: 'hideout', cost: 200, risk: 'niedrig', policeRisk: -2, reputationEffect: -1, requirements: [], rank: 'Anfänger', stepCost: 2, pointEffect: 0, cooldownKey: 'lay-low', effect: 'Fahndung sinkt um 2, Gefahr sinkt leicht.', failure: 'Die Stadt vergisst Dich nicht völlig.' },
  { id: 'heal-player', name: 'Behandeln lassen', building: 'hospital', cost: 500, risk: 'niedrig', policeRisk: 0, reputationEffect: 0, requirements: [], rank: 'Anfänger', stepCost: 1, pointEffect: 0, cooldownKey: 'heal-player', effect: 'Gesundheit wird vollständig wiederhergestellt.', failure: 'Ohne Geld keine Medizin.' },
  { id: 'harbor-heist', name: 'Hafenlager ausräumen', building: 'harbor', cost: 150, reward: [1800, 6200], risk: 'hoch', policeRisk: 2, reputationEffect: 3, requirements: [{ rank: 'Ganove' }, { activeGang: 2 }], rank: 'Ganove', stepCost: 2, pointEffect: 3, cooldownKey: 'harbor-heist', recommendedRoles: ['Fahrerin', 'Schlaeger'], gangSlots: 3, danger: 1, effect: 'Lieferwagen geben Bonus.', failure: 'Wachleute und Hafenpolizei machen Ärger.' },
  { id: 'station-job', name: 'Koffer am Bahnhof abfangen', building: 'station', cost: 80, reward: [700, 2100], risk: 'mittel', policeRisk: 1, reputationEffect: 1, requirements: [{ rank: 'Kleiner Fisch' }], rank: 'Kleiner Fisch', stepCost: 1, pointEffect: 1, cooldownKey: 'station-job', recommendedRoles: ['Informant', 'Fahrerin'], gangSlots: 1, effect: 'Schneller Coup mit guter Fluchtchance.', failure: 'Der falsche Koffer, der richtige Polizist.' },
  { id: 'train-robbery', name: 'Postzug ausnehmen', building: 'station', cost: 500, reward: [4500, 17000], risk: 'sehr hoch', policeRisk: 3, reputationEffect: 5, requirements: [{ rank: 'Bullenschreck' }, { activeGang: 2 }], rank: 'Bullenschreck', stepCost: 3, pointEffect: 5, cooldownKey: 'train-robbery', recommendedRoles: ['Fahrerin', 'Planer'], effect: 'Später Coup mit großem Echo.', failure: 'Der Zug fährt, Du bleibst.' },
  { id: 'money-transport', name: 'Geldtransport abfangen', building: 'station', cost: 350, reward: [3200, 11000], risk: 'sehr hoch', policeRisk: 3, reputationEffect: 4, requirements: [{ rank: 'Ganove' }, { activeGang: 2 }], rank: 'Ganove', stepCost: 3, pointEffect: 4, cooldownKey: 'money-transport', recommendedRoles: ['Fahrerin', 'Schuetzin', 'Planer'], danger: 2, tipOnly: true, effect: 'Ein Tipp nennt Uhrzeit und Route. Ohne Kampf läuft hier nichts.', failure: 'Die Eskorte ist besser vorbereitet als Du.' },
  { id: 'villa-burglary', name: 'Villa ausräumen', building: 'villa', cost: 200, reward: [2200, 9000], risk: 'hoch', policeRisk: 2, reputationEffect: 3, requirements: [{ rank: 'Langfinger' }, { stat: 'intelligence', min: 45 }, { activeGang: 1 }], rank: 'Langfinger', stepCost: 2, pointEffect: 3, cooldownKey: 'villa-burglary', recommendedRoles: ['Safeknacker', 'Planer'], gangSlots: 2, danger: 1, effect: 'Intelligenz und Safeknacker glänzen.', failure: 'Alarmanlagen sind die Sprache der Reichen.' },
  { id: 'mayor-hit', name: 'Bürgermeister-Auftrag', building: 'villa', cost: 800, reward: [2500, 7500], risk: 'sehr hoch', policeRisk: 4, reputationEffect: 8, requirements: [{ rank: 'Meuchelmörder' }, { activeGang: 2 }, { stat: 'brutality', min: 55 }], rank: 'Meuchelmörder', stepCost: 3, pointEffect: 5, cooldownKey: 'mayor-hit', recommendedRoles: ['Schuetzin', 'Fahrerin', 'Planer'], danger: 3, tipOnly: true, effect: 'Politischer Mord. Viel Ruf, viel Hitze, wenig Schlaf.', failure: 'Die Leibwächter reißen die Stadt aus dem Bett.' },
  { id: 'police-chief-bribe', name: 'Polizeichef bestechen', building: 'police', cost: 0, risk: 'mittel', policeRisk: -2, reputationEffect: 0, requirements: [{ rank: 'Kleiner Fisch' }], rank: 'Kleiner Fisch', stepCost: 1, pointEffect: 0, cooldownKey: 'police-chief-bribe', recommendedRoles: ['Verhandler'], effect: 'Kauft zeitweise Ruhe auf der Straße. Der Preis richtet sich nach Rang und Fahndung.', failure: 'Der Umschlag kommt beim falschen Schreibtisch an.' },
  { id: 'police-bribe', name: 'Akten schmieren', building: 'police', cost: 1800, risk: 'mittel', policeRisk: -2, reputationEffect: 0, requirements: [{ rank: 'Langfinger' }, { stat: 'intelligence', min: 35 }], rank: 'Langfinger', stepCost: 1, pointEffect: 0, cooldownKey: 'police-bribe', recommendedRoles: ['Verhandler'], effect: 'Fahndung sinkt, wenn die Umschläge dick genug sind.', failure: 'Ein ehrlicher Beamter ist teuer.' },
  { id: 'gang-war', name: 'Bandenkrieg anzetteln', building: 'kneipe', cost: 0, risk: 'sehr hoch', policeRisk: 2, reputationEffect: 5, requirements: [{ rank: 'Bullenschreck' }, { activeGang: 2 }], rank: 'Bullenschreck', stepCost: 2, pointEffect: 4, cooldownKey: 'gang-war', recommendedRoles: ['Schuetzin', 'Schlaeger'], danger: 2, effect: 'Startet einen taktischen Kampf gegen Rivalen.', failure: 'Die Straße frisst Schwäche.' },
  { id: 'cheap-counterfeit', name: 'Kleine Blüte kaufen', building: 'counterfeit', cost: 500, reward: [1000, 1000], risk: 'hoch', policeRisk: 2, reputationEffect: 0, requirements: [], rank: 'Anfänger', stepCost: 1, pointEffect: 0, cooldownKey: 'cheap-counterfeit', effect: 'Gibt $1.000 Bargeld, erhöht aber das Blütenrisiko.', failure: 'Der Schein riecht zu frisch.' },
  { id: 'clean-counterfeit', name: 'Saubere Blüte kaufen', building: 'counterfeit', cost: 2000, reward: [3500, 3500], risk: 'mittel', policeRisk: 1, reputationEffect: 0, requirements: [], rank: 'Anfänger', stepCost: 1, pointEffect: 0, cooldownKey: 'clean-counterfeit', effect: 'Gibt $3.500 Bargeld, mittlere Entdeckungsgefahr.', failure: 'Ein Händler merkt sich Dein Gesicht.' },
  { id: 'master-counterfeit', name: 'Meisterdruck kaufen', building: 'counterfeit', cost: 7500, reward: [12000, 12000], risk: 'niedrig', policeRisk: 1, reputationEffect: 0, requirements: [{ rank: 'Mafiosi' }], rank: 'Mafiosi', stepCost: 1, pointEffect: 0, cooldownKey: 'master-counterfeit', effect: 'Gibt $12.000 Bargeld, niedrige Entdeckungsgefahr.', failure: 'Perfekt ist nie kostenlos.' },
  { id: 'fake-passport', name: 'Neuen Pass besorgen', building: 'counterfeit', cost: 5000, risk: 'mittel', policeRisk: -2, reputationEffect: 0, requirements: [{ stat: 'intelligence', min: 35 }], rank: 'Anfänger', stepCost: 1, pointEffect: 0, cooldownKey: 'fake-passport', effect: 'Fahndung sinkt um 2, Polizeikontrollen werden harmloser.', failure: 'Ein falscher Name hilft nicht bei echten Fehlern.' },
  { id: 'counterfeit-contacts', name: 'Kontakte kaufen', building: 'counterfeit', cost: 2500, risk: 'mittel', policeRisk: 0, reputationEffect: 2, requirements: [{ rank: 'Langfinger' }], rank: 'Langfinger', stepCost: 1, pointEffect: 0, cooldownKey: 'counterfeit-contacts', effect: 'Straßenruf +2, bessere Geschäfte mit Ede.', failure: 'Kontakte reden erst, wenn Geld redet.' },
  { id: 'loan-take', name: 'Kredit aufnehmen', building: 'loanshark', cost: 0, reward: [1500, 1500], risk: 'mittel', policeRisk: 0, reputationEffect: 0, requirements: [], rank: 'Anfänger', stepCost: 1, pointEffect: 0, cooldownKey: 'loan-take', effect: 'Schnelles Geld, später Schmerzen.', failure: 'Der Hai hält Dich für zu klein.' },
  { id: 'loan-repay', name: 'Kredit zurückzahlen', building: 'loanshark', cost: 2000, risk: 'niedrig', policeRisk: 0, reputationEffect: 1, requirements: [], rank: 'Anfänger', stepCost: 1, pointEffect: 0, cooldownKey: 'loan-repay', effect: 'Straßenruf steigt, Schulden verschwinden im Rauch.', failure: 'Ohne Geld bleibt der Hai hungrig.' },
  { id: 'credit-start', name: 'Ins Kreditgeschäft einsteigen', building: 'loanshark', cost: 2500, risk: 'mittel', policeRisk: 1, reputationEffect: 1, requirements: [{ rank: 'Langfinger' }], rank: 'Langfinger', stepCost: 1, pointEffect: 0, cooldownKey: 'credit-start', effect: 'Du kaufst Dich in Zinsen, Schuldscheine und schlechte Ausreden ein.', failure: 'Die alten Haie lassen Dich nicht an den Tisch.' },
  { id: 'credit-invest', name: 'Kapital ins Kreditgeschäft legen', building: 'loanshark', cost: 1000, risk: 'niedrig', policeRisk: 0, reputationEffect: 0, requirements: [{ rank: 'Langfinger' }], rank: 'Langfinger', stepCost: 1, pointEffect: 0, cooldownKey: 'credit-invest', effect: 'Mehr Kapital bringt monatliche Einnahmen, aber auch Hitze.', failure: 'Ohne Buch ist Geld nur Papier.' },
  { id: 'debt-collection', name: 'Schulden eintreiben', building: 'loanshark', cost: 0, reward: [450, 1800], risk: 'hoch', policeRisk: 1, reputationEffect: 2, requirements: [{ rank: 'Langfinger' }, { activeGang: 1 }], rank: 'Langfinger', stepCost: 2, pointEffect: 2, cooldownKey: 'debt-collection', recommendedRoles: ['Schlaeger', 'Verhandler', 'Fahrerin'], danger: 1, effect: 'Manche Schuldner zahlen. Andere haben Freunde in der Gasse.', failure: 'Der Schuldner schreit lauter als geplant.' },
  { id: 'steal-car', name: 'Auto stehlen', building: 'cars', cost: 0, risk: 'hoch', policeRisk: 2, reputationEffect: 1, requirements: [{ rank: 'Langfinger' }], rank: 'Langfinger', stepCost: 2, pointEffect: 2, cooldownKey: 'steal-car', effect: 'Chance auf einen besseren Wagen ohne Kaufpreis.', failure: 'Ein Wachmann merkt sich Deine Schuhe.' },
];

export const tips: TipConfig[] = [
  { id: 'tip-money-transport', title: 'Geldtransport am Bahnhof', text: 'Ein Fahrer trinkt zu viel und nennt Dir die Route eines Geldwagens.', cost: 350, tier: 'mid', requiredRank: 'Ganove', unlocksAction: 'money-transport', expiresInMonths: 2, guaranteedCombat: true, scenario: 'station', rewardModifier: 1.15, locationDistrict: 'Bahnhofsviertel', distanceHint: 'Spezialauftrag - bleibt länger heiß.' },
  { id: 'tip-mayor-hit', title: 'Der Bürgermeister fährt privat', text: 'Ein Stadtrat sucht saubere Hände für eine dreckige Sache.', cost: 900, tier: 'late', requiredRank: 'Meuchelmörder', unlocksAction: 'mayor-hit', expiresInMonths: 2, guaranteedCombat: true, scenario: 'villa', rewardModifier: 1.05, locationDistrict: 'Villenviertel', distanceHint: 'Weiter Weg - bleibt länger heiß.' },
  { id: 'tip-bank-shift', title: 'Wachwechsel in der Bank', text: 'Der Nachtwächter wechselt um zehn vor zwölf die Zigarrenmarke.', cost: 420, tier: 'mid', requiredRank: 'Mafiosi', unlocksAction: 'bank-robbery', expiresInMonths: 1, scenario: 'bank', rewardModifier: 1.2, locationDistrict: 'Altstadt' },
  { id: 'tip-harbor-ledger', title: 'Frachtbuch am Hafen', text: 'Ein Kranführer weiß, welche Kisten nicht im Manifest stehen.', cost: 260, tier: 'early', requiredRank: 'Langfinger', unlocksAction: 'harbor-heist', expiresInMonths: 1, scenario: 'harbor', rewardModifier: 1.15, locationDistrict: 'Hafenviertel' },
  { id: 'tip-villa-servants', title: 'Dienerausgang der Villa', text: 'Ein Hausdiener verkauft Dir den Grundriss und eine Uhrzeit.', cost: 300, tier: 'early', requiredRank: 'Langfinger', unlocksAction: 'villa-burglary', expiresInMonths: 1, scenario: 'villa', rewardModifier: 1.15, locationDistrict: 'Villenviertel', distanceHint: 'Weiter Weg - bleibt länger heiß.' },
  { id: 'tip-train-mail', title: 'Postsack mit Wertpapieren', text: 'Am Freitag liegt im Postzug mehr Papier als Kohle.', cost: 700, tier: 'late', requiredRank: 'Bullenschreck', unlocksAction: 'train-robbery', expiresInMonths: 2, guaranteedCombat: true, scenario: 'station', rewardModifier: 1.25, locationDistrict: 'Bahnhofsviertel', distanceHint: 'Spezialauftrag - bleibt länger heiß.' },
  { id: 'tip-alcohol-route', title: 'Durstige Hinterzimmer', text: 'Zwei Kneipen zahlen heute mehr fuer jeden Tropfen, der nicht versteuert wurde.', cost: 120, tier: 'early', unlocksAction: 'alcohol-sell', expiresInMonths: 1, rewardModifier: 1.35, locationDistrict: 'Rotlichtgasse' },
];

export const tileVisuals: Record<TileKind, { icon: string; name: string }> = {
  road: { icon: ' ', name: 'Straße' },
  sidewalk: { icon: '·', name: 'Gehweg' },
  building: { icon: '█', name: 'Gebäude' },
  decor: { icon: '░', name: 'Block' },
  street: { icon: '·', name: 'Straße' },
  alley: { icon: '░', name: 'Gasse' },
  park: { icon: '♠', name: 'Park' },
  warehouse: { icon: '▒', name: 'Lager' },
  lamp: { icon: 'i', name: 'Laterne' },
  wall: { icon: '█', name: 'Mauer' },
  yard: { icon: '▪', name: 'Hof' },
  block: { icon: '▒', name: 'Block' },
  water: { icon: '~', name: 'Hafenwasser' },
  rails: { icon: '=', name: 'Gleise' },
  dock: { icon: ':', name: 'Kai' },
};

const cityLayout = [
  '################################',
  '#==============================#',
  '#..ZZZZZZZZ....UU..HH..XX......#',
  '#RRRRRRRRRRRRRRRRRRRRRRRRRRRRRR#',
  '#VVR.SS..RR..BB..EE..RR..SS....#',
  '#VV..KK..RR..BB......RR..LL....#',
  '#....KK..RR..SS..RRRRRRRRLL....#',
  '#RRRRRRRRRRRRRR..RR.RCCCRRRKK..#',
  '~~~~~~:MMM..RR..XX..RCCCRR.....#',
  '~~~~~~:MMM..RRRWW...RR.SSRR.RRR#',
  '~~~~~~:KK...RRRWW...RR..LLR.RR.#',
  '~~~~~~:KK...RR......RR......RR.#',
  '######RRRRRRRRRRRRRRRRRRRRRRR..#',
  '#..AARRRR..SS..RR..CC..RR..PPPP#',
  '#..AARRRR..WW..RR..CC..RR..PPPP#',
  '#..XXRRRR..WW..RR......RRRRNN..#',
  '#..HHRRRRRRRRRRRRRRRRRRRR..NN..#',
  '#..HHRR....RR..UU..RR..AA......#',
  '####..RRRRRRRRRRRRRRRRRRR.###..#',
  '#..SSRRRR..BB..RR..YYYYRRTTT...#',
  '#..HHRRRR..BB..RR..YYYYRRTTT...#',
  '#..KKRRRRRRCC..RR..YYYYRRAA....#',
  '#....RRRRRR....RR..TTT.RRTT....#',
  '################################',
] as const;

const buildingChars: Partial<Record<string, BuildingType>> = {
  V: 'hideout',
  S: 'shop',
  P: 'police',
  N: 'hospital',
  K: 'kneipe',
  E: 'counterfeit',
  B: 'bank',
  L: 'loanshark',
  M: 'harbor',
  W: 'weapons',
  X: 'pawnshop',
  C: 'casino',
  A: 'cars',
  U: 'subway',
  Z: 'station',
  H: 'hotel',
  Y: 'villa',
};

export const locationInstances: LocationInstance[] = [
  { id: 'bahnhof-hauptbahnhof', type: 'station', name: 'Hauptbahnhof Nord', district: 'Bahnhofsviertel', x: 3, y: 2, width: 8, height: 1, quality: 3, risk: 3, tags: ['railway'], description: 'Eine lange Bahnhofsfassade direkt unter den Gleisen. Davor beginnt die Stadt.' },
  { id: 'bahnhof-ubahn', type: 'subway', name: 'U Nordbahnhof', district: 'Bahnhofsviertel', x: 15, y: 2, width: 2, height: 1, quality: 2, risk: 2, tags: ['railway'], description: 'Ein klares U unter der Bahnlinie. Später vielleicht die schnelle Abkürzung.' },
  { id: 'bahnhof-hotel', type: 'hotel', name: 'Bahnhofshotel Continental', district: 'Bahnhofsviertel', x: 19, y: 2, width: 2, height: 1, quality: 2, risk: 2, tags: ['recruitDriver'], recruitRoles: ['Fahrerin', 'Safeknacker'], description: 'Diskrete Zimmer für Leute, die mit leichtem Gepäck reisen.' },
  { id: 'bahnhof-pfand', type: 'pawnshop', name: 'Pfandleihe Gleis 4', district: 'Bahnhofsviertel', x: 23, y: 2, width: 2, height: 1, quality: 2, risk: 2, tags: ['railway', 'cheap'], description: 'Koffer, Uhren, Schuldscheine. Alles findet hier einen Preis.' },
  { id: 'altstadt-versteck', type: 'hideout', name: 'Keller in der Altstadt', shortName: 'Versteck', district: 'Altstadt', x: 1, y: 4, width: 2, height: 2, quality: 1, risk: 1, tags: ['starter', 'cheap'], description: 'Ein feuchter Keller hinter einer Bäckerei. Nicht schön, aber niemand fragt nach Namen.' },
  { id: 'altstadt-kolonialwaren', type: 'shop', name: 'Kolonialwaren Kruse', district: 'Altstadt', x: 5, y: 4, width: 2, height: 1, quality: 1, risk: 1, tags: ['starter', 'cheap'], description: 'Kleine Kasse, kleiner Besitzer, kleine Mutprobe.' },
  { id: 'altstadt-kneipe', type: 'kneipe', name: 'Zum Krummen Groschen', district: 'Altstadt', x: 5, y: 5, width: 2, height: 2, quality: 1, risk: 1, tags: ['starter', 'cheap', 'recruitSchlaeger'], recruitRoles: ['Schlaeger', 'Informant'], tipTiers: ['early'], description: 'Die erste Adresse für billige Hilfe, dünnes Bier und kleine Gerüchte.' },
  { id: 'altstadt-sparkasse', type: 'bank', name: 'Altstadt-Sparkasse', district: 'Altstadt', x: 13, y: 4, width: 2, height: 2, quality: 1, risk: 2, tags: ['starter'], description: 'Eine enge Filiale mit nervösem Kassierer und dünner Beute.' },
  { id: 'blueten-ede', type: 'counterfeit', name: 'Blüten-Ede', district: 'Altstadt', x: 17, y: 4, width: 2, height: 1, quality: 2, risk: 3, tags: ['illegal'], description: 'Blüten-Ede sitzt im Hinterzimmer einer verrauchten Druckerei. Seine Scheine riechen fast echt.' },
  { id: 'altstadt-schneider', type: 'shop', name: 'Schneider & Co.', district: 'Altstadt', x: 25, y: 4, width: 2, height: 1, quality: 2, risk: 2, tags: ['starter'], description: 'Ein ordentliches Schaufenster mit weniger ordentlicher Buchhaltung.' },
  { id: 'altstadt-buchladen', type: 'shop', name: 'Buchladen Adler', district: 'Altstadt', x: 13, y: 6, width: 2, height: 1, quality: 2, risk: 2, tags: ['starter'], description: 'Hinten werden nicht nur Bücher sortiert.' },
  { id: 'rotlicht-kredithai', type: 'loanshark', name: 'Kredit-Hai Rocco', district: 'Rotlichtgasse', x: 25, y: 5, width: 2, height: 2, quality: 2, risk: 3, tags: ['illegal'], description: 'Geld heute, Schmerzen morgen. Rocco zählt beides genau.' },
  { id: 'rotlicht-casino', type: 'casino', name: 'Casino Gloria', district: 'Rotlichtgasse', x: 21, y: 7, width: 3, height: 2, quality: 3, risk: 3, tags: ['illegal', 'recruitInformant'], recruitRoles: ['Informant', 'Verhandler'], tipTiers: ['mid'], description: 'Samt, Karten, Würfel und Schulden, die nie schlafen.' },
  { id: 'rotlicht-kneipe', type: 'kneipe', name: 'Blaue Laterne', district: 'Rotlichtgasse', x: 27, y: 7, width: 2, height: 1, quality: 2, risk: 3, tags: ['illegal', 'recruitInformant'], recruitRoles: ['Informant', 'Verhandler'], tipTiers: ['early', 'mid'], description: 'Ein Tresen im roten Licht. Manche Gäste verkaufen Gerüchte, andere kaufen Ärger.' },
  { id: 'rotlicht-laden', type: 'shop', name: 'Nachtkiosk Silva', district: 'Rotlichtgasse', x: 23, y: 9, width: 2, height: 1, quality: 3, risk: 3, tags: ['illegal'], description: 'Der Laden öffnet spät und zahlt ungern.' },
  { id: 'rotlicht-buchmacher', type: 'loanshark', name: 'Buchmacher Neri', district: 'Rotlichtgasse', x: 24, y: 10, width: 2, height: 1, quality: 3, risk: 3, tags: ['illegal'], description: 'Ein Lächeln, ein Notizbuch und ein sehr langer Arm.' },
  { id: 'hafen-lager', type: 'harbor', name: 'Hafenlager 3', district: 'Hafenviertel', x: 7, y: 8, width: 3, height: 2, quality: 3, risk: 3, tags: ['waterfront', 'smuggling'], description: 'Kisten, Nebel und Männer, die lieber ins Wasser schauen als in Deine Augen.' },
  { id: 'hafen-pfand', type: 'pawnshop', name: 'Pfandleihe am Kai', district: 'Hafenviertel', x: 16, y: 8, width: 2, height: 1, quality: 2, risk: 2, tags: ['waterfront'], description: 'Salzflecken auf dem Tresen und keine Fragen zur Herkunft.' },
  { id: 'hafen-schmuggler', type: 'weapons', name: 'Schmugglerlager', shortName: 'Schwere Ware', district: 'Hafenviertel', x: 15, y: 9, width: 2, height: 2, quality: 4, risk: 4, tags: ['illegal', 'heavyWeapons', 'waterfront'], weaponInventory: ['winchester97', 'thompson', 'browningBar', 'grenades'], description: 'Unter Planen liegen Waffen, die nicht für kleine Streitigkeiten gebaut wurden.' },
  { id: 'hafen-kneipe', type: 'kneipe', name: 'Zur Rostigen Schraube', district: 'Hafenviertel', x: 7, y: 10, width: 2, height: 2, quality: 2, risk: 3, tags: ['smuggling', 'recruitDriver', 'recruitSchlaeger'], recruitRoles: ['Fahrerin', 'Schlaeger', 'Safeknacker'], tipTiers: ['early', 'mid'], description: 'Fahrer, Schmuggler und raue Hände sammeln sich dort, wo die Docks knarren.' },
  { id: 'industrie-auto', type: 'cars', name: 'Hinterhofhändler Kralle', district: 'Industriegebiet', x: 3, y: 13, width: 2, height: 2, quality: 1, risk: 2, tags: ['cheap'], carInventory: ['talbot90', 'citroenTa'], description: 'Zwei Wagen, drei Papiere, vier Lügen. Für den Anfang reicht es.' },
  { id: 'industrie-shop', type: 'shop', name: 'Werkzeug Mohr', district: 'Industriegebiet', x: 11, y: 13, width: 2, height: 1, quality: 2, risk: 2, tags: ['cheap'], description: 'Kasse und Lager sind getrennt. Der Besitzer leider nicht.' },
  { id: 'industrie-waffen', type: 'weapons', name: 'Hinterhofhändler', shortName: 'Einfache Pistolen', district: 'Industriegebiet', x: 11, y: 14, width: 2, height: 2, quality: 1, risk: 2, tags: ['cheap', 'illegal'], weaponInventory: ['colt1911', 'savage1907', 'sw10', 'remington11'], description: 'Einfache Pistolen, Ölgeruch und ein Händler, der niemandem vertraut.' },
  { id: 'industrie-pfand', type: 'pawnshop', name: 'Pfandleihe Bender', district: 'Industriegebiet', x: 3, y: 15, width: 2, height: 1, quality: 2, risk: 2, tags: ['cheap'], description: 'Hier bekommt jedes Problem einen Preis und kaum jemand eine Quittung.' },
  { id: 'industrie-hotel', type: 'hotel', name: 'Hotel Nordstern', district: 'Industriegebiet', x: 3, y: 16, width: 2, height: 2, quality: 2, risk: 2, tags: ['recruitDriver'], recruitRoles: ['Fahrerin', 'Safeknacker'], description: 'Diskrete Zimmer für Leute, die selten Gepäck tragen.' },
  { id: 'industrie-ubahn', type: 'subway', name: 'U Fabrikstraße', district: 'Industriegebiet', x: 15, y: 17, width: 2, height: 1, quality: 2, risk: 2, tags: [], description: 'Beton, Ruß und ein klarer Weg unter der Stadt.' },
  { id: 'rotlicht-spielclub', type: 'casino', name: 'Spielclub Rote Lampe', district: 'Rotlichtgasse', x: 19, y: 13, width: 2, height: 2, quality: 2, risk: 3, tags: ['illegal'], description: 'Kleine Tische, große Schulden.' },
  { id: 'polizei-praesidium', type: 'police', name: 'Polizeipräsidium Südost', district: 'Polizeibezirk', x: 27, y: 13, width: 4, height: 2, quality: 4, risk: 4, tags: ['police'], description: 'Ein eigener Block aus Akten, Zellen und schweren Türen. Weit weg von der Altstadt.' },
  { id: 'polizei-klinik', type: 'hospital', name: 'Städtisches Krankenhaus', district: 'Polizeibezirk', x: 27, y: 15, width: 2, height: 2, quality: 2, risk: 1, tags: ['police'], description: 'Saubere Laken direkt am Polizeibezirk. Niemand fragt zweimal, aber jeder sieht hin.' },
  { id: 'bahnhof-autohaus', type: 'cars', name: 'Autohaus Adler', district: 'Bahnhofsviertel', x: 23, y: 17, width: 2, height: 1, quality: 2, risk: 2, tags: [], carInventory: ['chevyRoadster', 'buickCentury'], description: 'Ordentliche Wagen mit unordentlichen Papieren.' },
  { id: 'villen-juwelier', type: 'shop', name: 'Juwelier Goldbach', district: 'Villenviertel', x: 3, y: 19, width: 2, height: 1, quality: 4, risk: 4, tags: ['premium', 'highSociety'], description: 'Der Schutz dieses Ladens wäre mehr wert als manche Bank.' },
  { id: 'villen-grandhotel', type: 'hotel', name: 'Grand Hotel Kaiserhof', district: 'Villenviertel', x: 3, y: 20, width: 2, height: 1, quality: 4, risk: 3, tags: ['premium', 'highSociety', 'recruitPlanner', 'recruitShooter'], recruitRoles: ['Planer', 'Schuetzin', 'Verhandler'], description: 'Teppiche schlucken Schritte. Preise schlucken Zweifel.' },
  { id: 'villen-kneipe', type: 'kneipe', name: 'Salon Hinterzimmer', district: 'Villenviertel', x: 3, y: 21, width: 2, height: 1, quality: 3, risk: 3, tags: ['premium', 'highSociety', 'recruitPlanner'], recruitRoles: ['Planer', 'Verhandler'], tipTiers: ['mid'], description: 'Keine Kneipe, eher ein diskreter Raum mit teuren Flaschen.' },
  { id: 'villen-privatbank', type: 'bank', name: 'Privatbank Falkenstein', district: 'Villenviertel', x: 11, y: 19, width: 2, height: 2, quality: 4, risk: 4, tags: ['premium', 'highSociety'], description: 'Dicke Türen, dicke Konten, dicke Akten.' },
  { id: 'villen-casino', type: 'casino', name: 'Salon Bellevue', district: 'Villenviertel', x: 11, y: 21, width: 2, height: 1, quality: 4, risk: 4, tags: ['premium', 'highSociety'], description: 'Kein Schild, keine laute Musik, nur sehr teure Fehler.' },
  { id: 'villen-magnatenhaus', type: 'villa', name: 'Villa Rosenhain', district: 'Villenviertel', x: 19, y: 19, width: 4, height: 3, quality: 4, risk: 4, tags: ['premium', 'highSociety'], description: 'Ein Tor, ein Garten, viele Fenster und noch mehr Silber.' },
  { id: 'villen-luxusgarage', type: 'cars', name: 'Luxusgarage Marquardt', district: 'Villenviertel', x: 25, y: 21, width: 2, height: 1, quality: 4, risk: 3, tags: ['premium', 'luxuryCars'], carInventory: ['auburn120'], description: 'Chrom, Leder und Preise, bei denen selbst Gangster leiser werden.' },
];

export function getWeapon(id: WeaponId): WeaponConfig {
  return weapons.find((weapon) => weapon.id === id) ?? weapons[0];
}

function createOwnedWeapon(weaponId: WeaponId, assignedTo?: string): OwnedWeapon {
  return { id: crypto.randomUUID(), weaponId, assignedTo };
}

export function getPlayerWeapon(state: GameState): WeaponConfig {
  return getWeapon(state.arsenal.find((owned) => owned.assignedTo === 'player')?.weaponId ?? 'none');
}

export function getAssignedWeaponId(state: GameState, targetId: string): string {
  return state.arsenal.find((owned) => owned.assignedTo === targetId)?.id ?? 'none';
}

export function assignmentLabel(state: GameState, owned: OwnedWeapon): string {
  if (!owned.assignedTo) return 'frei';
  if (owned.assignedTo === 'player') return 'beim Spieler';
  const member = state.gang.find((item) => item.id === owned.assignedTo);
  return member ? `bei ${member.nickname}` : 'zugeteilt';
}

export function sellValue(weaponId: WeaponId): number {
  return Math.floor(getWeapon(weaponId).price * 0.6);
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

export function availableWeaponsForLocation(state: GameState): WeaponConfig[] {
  const location = getCurrentLocation(state);
  const inventory = location?.weaponInventory;
  if (inventory) return weapons.filter((weapon) => inventory.includes(weapon.id));
  return weapons.filter((weapon) => weapon.id !== 'none');
}

export function availableCarsForLocation(state: GameState): CarConfig[] {
  const location = getCurrentLocation(state);
  const inventory = location?.carInventory;
  if (inventory) return cars.filter((car) => inventory.includes(car.id));
  return cars.filter((car) => car.id !== 'foot');
}

export function availableRecruitsForLocation(state: GameState): GangMemberTemplate[] {
  const location = getCurrentLocation(state);
  if (!location?.recruitRoles?.length) {
    return recruitTemplates.filter((recruit) => location?.quality === 4 || recruit.cost <= 3500);
  }
  return recruitTemplates.filter((recruit) => (
    location.recruitRoles?.includes(recruit.role) &&
    (location.quality >= 3 || recruit.cost <= 3500)
  ));
}

function locationRewardMultiplier(state: GameState, action: ActionConfig): number {
  const location = getCurrentLocation(state);
  if (!location) return 1;
  if (action.building !== location.type && !(action.id === 'blackmail' && location.type === 'shop')) return 1;
  if (['bank-robbery', 'safe-crack', 'shop-robbery', 'blackmail', 'villa-burglary', 'harbor-heist', 'casino-extort'].includes(action.id)) {
    return 1 + (location.quality - 1) * 0.32;
  }
  return 1;
}

export function actionRewardRange(state: GameState, action: ActionConfig): [number, number] | undefined {
  if (!action.reward) return undefined;
  const multiplier = locationRewardMultiplier(state, action);
  return [Math.round(action.reward[0] * multiplier), Math.round(action.reward[1] * multiplier)];
}

export function locationSummary(location?: LocationInstance): string {
  if (!location) return '';
  return `${location.name} — Qualität ${location.quality}, Risiko ${location.risk}`;
}

function districtFor(x: number, y: number): District {
  if (y <= 3) return 'Bahnhofsviertel';
  if (x <= 10 && y >= 8 && y <= 12) return 'Hafenviertel';
  if (x >= 26 && y >= 13 && y <= 18) return 'Polizeibezirk';
  if (x >= 18 && y >= 19) return 'Villenviertel';
  if (y >= 19) return 'Villenviertel';
  if (x <= 17 && y >= 13 && y <= 18) return 'Industriegebiet';
  if (x >= 18 && y >= 7 && y <= 15) return 'Rotlichtgasse';
  return 'Altstadt';
}

function kindForLayoutChar(char: string): TileKind {
  if (char === 'R') return 'road';
  if (char === '.') return 'sidewalk';
  if (char === '~') return 'water';
  if (char === '=') return 'rails';
  if (char === ':') return 'dock';
  if (char === 'T') return 'park';
  if (char === '#') return 'block';
  return buildingChars[char] ? 'building' : 'decor';
}

export function createMap(): Tile[] {
  const tiles: Tile[] = [];
  if (cityLayout.length !== MAP_HEIGHT || cityLayout.some((row) => row.length !== MAP_WIDTH)) {
    console.warn('City layout dimensions do not match map size.');
  }
  for (let y = 0; y < MAP_HEIGHT; y += 1) {
    for (let x = 0; x < MAP_WIDTH; x += 1) {
      const char = cityLayout[y]?.[x] ?? '#';
      const building = buildingChars[char];
      const location = building ? locationAt(x, y, building) : undefined;
      const district = location?.district ?? districtFor(x, y);
      tiles.push({
        id: `${x}-${y}`,
        x,
        y,
        district,
        kind: kindForLayoutChar(char),
        building,
        buildingVisualFor: location && location.x === x && location.y === y ? location.type : undefined,
        locationId: location?.id,
      });
    }
  }
  return tiles;
}

function locationAt(x: number, y: number, building?: BuildingType): LocationInstance | undefined {
  return locationInstances.find((location) => {
    const width = location.width ?? 1;
    const height = location.height ?? 1;
    return (!building || location.type === building) &&
      x >= location.x &&
      x < location.x + width &&
      y >= location.y &&
      y < location.y + height;
  });
}

export function getLocation(id: string): LocationInstance | undefined {
  return locationInstances.find((location) => location.id === id);
}

export function getAdjacentBuildingTile(position: { x: number; y: number }, map: Tile[]): Tile | undefined {
  return map.find((tile) => (
    tile.building &&
    Math.abs(tile.x - position.x) + Math.abs(tile.y - position.y) === 1
  ));
}

export function getCurrentLocation(state: GameState): LocationInstance | undefined {
  const tile = getAdjacentBuildingTile(state.position, state.map);
  return tile?.locationId ? getLocation(tile.locationId) : undefined;
}

export function getCurrentBuilding(state: GameState): BuildingConfig | undefined {
  const location = getCurrentLocation(state);
  if (location) return getBuilding(location.type);
  const tile = getAdjacentBuildingTile(state.position, state.map);
  return tile?.building ? getBuilding(tile.building) : undefined;
}

export function validateMapConnectivity(map: Tile[] = createMap(), start = { x: 3, y: 4 }): { valid: boolean; unreachable: Tile[] } {
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
  const unreachable = map.filter((tile) => tile.buildingVisualFor && !adjacentWalkableSeen(tile, map, seen));
  const buildingsWithoutReachableAdjacency = buildings.filter((building) => !map.some((tile) => tile.building === building.id && adjacentWalkableSeen(tile, map, seen)));
  const counts = locationInstances.reduce<Record<string, number>>((sum, location) => {
    sum[location.type] = (sum[location.type] ?? 0) + 1;
    return sum;
  }, {});
  const missingActionBuildings = buildings.filter((building) => building.actions.length > 0 && !counts[building.id]);
  const harborTiles = map.filter((tile) => tile.building === 'harbor');
  const stationTiles = map.filter((tile) => tile.building === 'station');
  const harborTouchesWater = harborTiles.some((tile) => neighborKinds(tile, map).some((kind) => kind === 'water' || kind === 'dock'));
  const stationTouchesRails = stationTiles.some((tile) => neighborKinds(tile, map).some((kind) => kind === 'rails'));
  const belowTargets = {
    shop: 5,
    hotel: 3,
    bank: 2,
    kneipe: 4,
    cars: 3,
    casino: 3,
    subway: 2,
    loanshark: 2,
    weapons: 2,
  };
  const lowCounts = Object.entries(belowTargets).filter(([building, target]) => (counts[building] ?? 0) < target);
  if (unreachable.length || buildingsWithoutReachableAdjacency.length || missingActionBuildings.length || !harborTouchesWater || !stationTouchesRails || lowCounts.length) {
    console.warn('Map validation warning', {
      unreachable,
      buildingsWithoutReachableAdjacency,
      missingActionBuildings,
      counts,
      lowCounts,
      harborTouchesWater,
      stationTouchesRails,
    });
  }
  return { valid: unreachable.length === 0, unreachable };
}

function adjacentWalkableSeen(tile: Tile, map: Tile[], seen: Set<string>): boolean {
  return [[1, 0], [-1, 0], [0, 1], [0, -1]].some(([dx, dy]) => {
    const neighbor = map.find((item) => item.x === tile.x + dx && item.y === tile.y + dy);
    return Boolean(neighbor && isWalkable(neighbor) && seen.has(neighbor.id));
  });
}

function neighborKinds(tile: Tile, map: Tile[]): TileKind[] {
  return [[1, 0], [-1, 0], [0, 1], [0, -1]].flatMap(([dx, dy]) => {
    const neighbor = map.find((item) => item.x === tile.x + dx && item.y === tile.y + dy);
    return neighbor ? [neighbor.kind] : [];
  });
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
  return state.hotelRoom || getCurrentBuilding(state)?.id === 'hotel';
}

export function actionAvailability(state: GameState, action: ActionConfig): string[] {
  const messages = checkRequirements(state, action.requirements);
  if (action.tipOnly && !hasActiveTipForAction(state, action.id)) messages.push('Benötigt einen aktuellen Kneipen-Tipp.');
  if (action.rank && !rankMeets(getRank(state.points).name, action.rank)) messages.push(`Benötigt Rang: ${action.rank}`);
  if ((action.stepCost ?? 1) > state.stepsLeft) messages.push(`Benötigt ${action.stepCost ?? 1} Schritte`);
  const cost = actionCost(state, action);
  if (cost > state.stats.money) messages.push(`Benötigt ${formatMoney(cost)}`);
  if (action.id === 'alcohol-buy' && state.alcoholBarrels >= alcoholCapacity(state)) messages.push('Deine Ladekapazität ist voll.');
  if (action.id === 'alcohol-sell' && state.alcoholBarrels <= 0) messages.push('Du hast keine Fässer dabei.');
  if (action.id === 'credit-start' && state.creditBusiness.owned) messages.push('Du bist bereits im Kreditgeschäft.');
  if (action.id === 'credit-invest' && !state.creditBusiness.owned) messages.push('Du musst zuerst ins Kreditgeschäft einsteigen.');
  if (action.id === 'credit-invest' && state.creditBusiness.invested >= 5000) messages.push('Dein aktuelles Kreditbuch ist voll.');
  if (action.id === 'debt-collection' && !state.creditBusiness.owned) messages.push('Ohne Kreditbuch gibt es keine Schuldner.');
  const key = monthlyKey(state, action);
  if (action.cooldownKey && state.monthly?.[key]) {
    if (action.id === 'blackmail') messages.push('Der Ladenbesitzer hat diesen Monat schon bezahlt.');
    else if (action.id === 'shop-robbery') messages.push('Dieser Laden wurde diesen Monat schon ausgeraubt.');
    else messages.push('Diese Gelegenheit ist diesen Monat erschöpft.');
  }
  const cooldownUntil = state.actionCooldowns?.[key];
  if (cooldownUntil != null && cooldownUntil > state.month) {
    messages.push(`Ziel ist bis ${formatGameDate(cooldownUntil)} zu heiß.`);
  }
  if (action.id === 'blackmail' && state.shopProtections?.[shopKeyAt(state)] === 'protectedByPlayer') {
    messages.push('Dieser Laden steht bereits unter Deinem Schutz.');
  }
  return [...new Set(messages)];
}

export function isActionVisible(state: GameState, action: ActionConfig): boolean {
  if (!action.tipOnly) return true;
  return hasActiveTipForAction(state, action.id);
}

export function actionCost(state: GameState, action: ActionConfig): number {
  if (action.id === 'police-chief-bribe') {
    const rankIndex = ranks.findIndex((rank) => rank.name === getRank(state.points).name);
    return 900 + rankIndex * 260 + state.stats.wanted * 420;
  }
  if (action.id === 'alcohol-buy') return 100;
  if (action.id === 'credit-invest') return Math.min(1000, Math.max(0, 5000 - state.creditBusiness.invested));
  return action.cost;
}

function hasActiveTipForAction(state: GameState, actionId: ActionId): boolean {
  return state.activeTips.some((tip) => tip.unlocksAction === actionId && tip.expiresMonth >= state.month);
}

function tipForAction(state: GameState, actionId: ActionId): ActiveTip | undefined {
  return state.activeTips.find((tip) => tip.unlocksAction === actionId && tip.expiresMonth >= state.month);
}

export function alcoholCapacity(state: GameState): number {
  const capacities: Record<CarId, number> = {
    foot: 1,
    talbot90: 4,
    chevyRoadster: 6,
    buickCentury: 8,
    auburn120: 10,
    citroenTa: 5,
  };
  return capacities[state.car] ?? 1;
}

function monthlyKey(state: GameState, action: ActionConfig): string {
  return `${action.cooldownKey ?? action.id}:${getCurrentLocation(state)?.id ?? `${state.position.x}:${state.position.y}`}`;
}

function shopKeyAt(state: GameState): string {
  return getCurrentLocation(state)?.id ?? `${state.position.x}:${state.position.y}`;
}

function shopLabel(key: string): string {
  return getLocation(key)?.name ?? `Laden ${key}`;
}

export function statLabel(stat: Requirement['stat']): string {
  const labels = {
    money: 'Geld',
    health: 'Gesundheit',
    strength: 'Stärke',
    intelligence: 'Intelligenz',
    reputation: 'Straßenruf',
    brutality: 'Brutalität',
    wanted: 'Fahndung',
    danger: 'Gefahr',
    counterfeit: 'Blütenrisiko',
    passport: 'Pass',
  };
  return stat ? labels[stat] : '';
}

export function rollStartingStats(): Pick<PlayerStats, 'strength' | 'intelligence' | 'brutality'> {
  const roll = () => 15 + Math.floor(Math.random() * 71);
  return { strength: roll(), intelligence: roll(), brutality: roll() };
}

export function newGame(
  startingStats: Pick<PlayerStats, 'strength' | 'intelligence' | 'brutality'> = rollStartingStats(),
  playerName = DEFAULT_PLAYER_NAME,
  gangName = DEFAULT_GANG_NAMES[Math.floor(Math.random() * DEFAULT_GANG_NAMES.length)],
): GameState {
  const car = 'foot';
  return {
    screen: 'game',
    playerName: playerName.trim() || DEFAULT_PLAYER_NAME,
    gangName: gangName.trim() || DEFAULT_GANG_NAMES[0],
    month: 0,
    points: 0,
    position: { x: 3, y: 4 },
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
    arsenal: [],
    monthly: {},
    monthlyCrimeCount: 0,
    monthlyMajorCrimeCount: 0,
    monthlyQuietActions: 0,
    monthlyInjured: false,
    monthlyPointGain: 0,
    actionCooldowns: {},
    shopProtections: {},
    availableTips: [],
    activeTips: [],
    alcoholBarrels: 0,
    alcoholIncomeThisMonth: 0,
    creditBusiness: { owned: false, invested: 0, heat: 0 },
    policeCheckCooldownUntilMonth: 0,
    policeProtectionUntilMonth: 0,
    map: createMap(),
    log: [{ month: 0, text: `Chicago, 01/1925. ${playerName.trim() || DEFAULT_PLAYER_NAME} hat $700, einen schlechten Mantel und keinen Namen auf der Straße.` }],
  };
}

function normalizeGang(rawGang: unknown): GangMember[] {
  if (!Array.isArray(rawGang)) return [];
  return rawGang.map((member) => ({
    ...member,
    status: member.status ?? 'aktiv',
    health: member.health ?? (member.status === 'verletzt' ? 45 : 100),
    weapon: member.weapon ?? 'none',
  })) as GangMember[];
}

function normalizeArsenal(rawArsenal: unknown, gang: GangMember[], legacyPlayerWeapon?: WeaponId): OwnedWeapon[] {
  if (Array.isArray(rawArsenal) && rawArsenal.some((item) => typeof item === 'object' && item && 'weaponId' in item)) {
    return (rawArsenal as OwnedWeapon[]).filter((owned) => owned.weaponId !== 'none');
  }
  const result: OwnedWeapon[] = [];
  const legacyIds = Array.isArray(rawArsenal) ? rawArsenal.filter((id): id is WeaponId => typeof id === 'string' && id !== 'none') : [];
  const playerWeapon = legacyPlayerWeapon && legacyPlayerWeapon !== 'none' ? legacyPlayerWeapon : legacyIds[legacyIds.length - 1];
  if (playerWeapon) result.push(createOwnedWeapon(playerWeapon, 'player'));
  for (const member of gang) {
    if (member.weapon !== 'none') result.push(createOwnedWeapon(member.weapon, member.id));
  }
  for (const weaponId of legacyIds) {
    if (weaponId !== playerWeapon) result.push(createOwnedWeapon(weaponId));
  }
  return result;
}

export function loadGame(): GameState | null {
  const raw = localStorage.getItem(SAVE_KEY);
  if (!raw) return null;
  try {
    const state = JSON.parse(raw) as Partial<GameState> & { currentWeapon?: WeaponId; hideoutLevel?: number; car?: string };
    const base = newGame();
    const gang = normalizeGang(state.gang);
    const arsenal = normalizeArsenal(state.arsenal, gang, state.currentWeapon);
    const map = createMap();
    const loadedPosition = state.position ?? base.position;
    const position = isWalkable(map.find((tile) => tile.x === loadedPosition.x && tile.y === loadedPosition.y) ?? map[0])
      ? loadedPosition
      : base.position;
    return {
      ...base,
      ...state,
      screen: 'game',
      playerName: state.playerName?.trim() || DEFAULT_PLAYER_NAME,
      gangName: state.gangName?.trim() || DEFAULT_GANG_NAMES[0],
      points: state.points ?? 0,
      car: cars.some((car) => car.id === state.car) ? state.car as CarId : 'foot',
      hotelRoom: Boolean(state.hotelRoom),
      gangFounded: Boolean(state.gangFounded),
      gang,
      arsenal,
      monthly: state.monthly ?? {},
      monthlyCrimeCount: state.monthlyCrimeCount ?? 0,
      monthlyMajorCrimeCount: state.monthlyMajorCrimeCount ?? 0,
      monthlyQuietActions: state.monthlyQuietActions ?? 0,
      monthlyInjured: state.monthlyInjured ?? false,
      monthlyPointGain: state.monthlyPointGain ?? 0,
      actionCooldowns: state.actionCooldowns ?? {},
      shopProtections: state.shopProtections ?? {},
      availableTips: state.availableTips ?? [],
      activeTips: (state.activeTips ?? []).filter((tip) => tip.expiresMonth >= (state.month ?? 0)),
      alcoholBarrels: state.alcoholBarrels ?? 0,
      alcoholIncomeThisMonth: state.alcoholIncomeThisMonth ?? 0,
      creditBusiness: state.creditBusiness ?? { owned: false, invested: 0, heat: 0 },
      protectionChallenge: undefined,
      policeCheckCooldownUntilMonth: state.policeCheckCooldownUntilMonth ?? 0,
      policeProtectionUntilMonth: state.policeProtectionUntilMonth ?? 0,
      position,
      map,
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
  if (state.stats.money < cost) return null;
  return { ...state, stats: { ...state.stats, money: state.stats.money - cost } };
}

export function getEffectiveStats(state: GameState): PlayerStats & { combat: number; intimidation: number; driving: number; planning: number } {
  const playerWeapon = getPlayerWeapon(state);
  const weaponBonuses = {
    combat: playerWeapon.combatBonus,
    brutality: playerWeapon.brutalityBonus,
    intimidation: playerWeapon.intimidationBonus,
    reputation: playerWeapon.reputationBonus,
  };
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
  const location = getCurrentLocation(state);
  const complexityBonus = effective.planning * 0.8 + effective.driving * 0.5 + (car.heistBonus ?? 0);
  const base = action.risk === 'niedrig' ? 78 : action.risk === 'mittel' ? 62 : action.risk === 'hoch' ? 47 : 32;
  const locationPressure = location && action.building === location.type ? (location.risk - 1) * 4 : 0;
  const pressure = state.stats.wanted * 4 + state.stats.danger * 3 + Math.max(0, action.policeRisk + car.policeRiskModifier) * 3 + locationPressure;
  return clamp(base + effective.combat * 1.2 + roleBonus + complexityBonus - pressure, 8, 92);
}

function isHarmlessAction(action: ActionConfig): boolean {
  return [
    'beg',
    'pawn-sale',
    'rent-room',
    'found-gang',
    'casino-gamble',
    'casino-roulette',
    'casino-high-table',
    'lay-low',
    'heal-player',
    'fake-passport',
    'counterfeit-contacts',
    'loan-take',
    'loan-repay',
    'ask-tip',
    'credit-start',
    'credit-invest',
    'police-chief-bribe',
    'police-bribe',
  ].includes(action.id);
}

function isRealCrime(action: ActionConfig): boolean {
  return !isHarmlessAction(action);
}

function isMajorCrime(action: ActionConfig): boolean {
  return [
    'bank-robbery',
    'safe-crack',
    'harbor-heist',
    'villa-burglary',
    'train-robbery',
    'gang-war',
    'casino-extort',
    'steal-car',
    'money-transport',
    'mayor-hit',
    'debt-collection',
  ].includes(action.id);
}

function markMonthlyActivity(state: GameState, action: ActionConfig, injured = false): GameState {
  return {
    ...state,
    monthlyCrimeCount: state.monthlyCrimeCount + (isRealCrime(action) ? 1 : 0),
    monthlyMajorCrimeCount: state.monthlyMajorCrimeCount + (isMajorCrime(action) ? 1 : 0),
    monthlyQuietActions: state.monthlyQuietActions + (isHarmlessAction(action) ? 1 : 0),
    monthlyInjured: state.monthlyInjured || injured,
  };
}

function rankPointGroupForAction(actionId: ActionId): string {
  if (['bank-robbery', 'safe-crack'].includes(actionId)) return 'bank';
  if (['train-robbery', 'money-transport', 'station-job'].includes(actionId)) return 'station';
  if (['blackmail', 'shop-robbery'].includes(actionId)) return actionId;
  if (['harbor-heist', 'villa-burglary', 'gang-war', 'mayor-hit', 'debt-collection', 'alcohol-sell'].includes(actionId)) return actionId;
  return 'street';
}

function awardRankPoints(state: GameState, requested: number, group = 'street', bypassCap = false): { state: GameState; gained: number; capped: boolean } {
  const repeatKey = `rankGroup:${group}`;
  const repeats = Number(state.monthly?.[repeatKey] ?? 0);
  const diminished = repeats === 0 ? requested : repeats === 1 ? Math.ceil(requested / 2) : 0;
  const cap = bypassCap ? MONTHLY_POINT_CAP + 3 : MONTHLY_POINT_CAP;
  const available = Math.max(0, cap - state.monthlyPointGain);
  const gained = clamp(diminished, 0, bypassCap ? Math.max(0, cap - state.monthlyPointGain) : available);
  return {
    state: {
      ...state,
      points: clamp(state.points + gained, 0, 120),
      monthlyPointGain: state.monthlyPointGain + gained,
      monthly: { ...state.monthly, [repeatKey]: repeats + 1 },
    },
    gained,
    capped: diminished > gained || requested > diminished,
  };
}

function actionCooldownMonths(action: ActionConfig): number {
  if (action.id === 'bank-robbery' || action.id === 'safe-crack') return 3;
  if (action.id === 'train-robbery') return 6;
  if (action.id === 'money-transport') return 4;
  if (action.id === 'mayor-hit') return 8;
  if (action.id === 'villa-burglary') return 3;
  return 0;
}

function withActionCooldown(state: GameState, action: ActionConfig): GameState {
  const months = actionCooldownMonths(action);
  if (!months) return state;
  return {
    ...state,
    actionCooldowns: {
      ...state.actionCooldowns,
      [monthlyKey(state, action)]: state.month + months,
    },
  };
}

function successfulWantedIncrease(action: ActionConfig, policeShift: number): number {
  if (['beg', 'pawn-sale', 'casino-gamble', 'casino-roulette', 'casino-high-table', 'loan-take', 'loan-repay', 'rent-room', 'found-gang', 'heal-player', 'counterfeit-contacts', 'police-chief-bribe', 'ask-tip', 'credit-start', 'credit-invest'].includes(action.id)) return 0;
  if (['small-theft', 'subway-pickpocket', 'station-job'].includes(action.id)) return 0;
  if (action.id === 'shop-robbery') return Math.random() < 0.35 ? 1 : 0;
  if (['bank-robbery', 'safe-crack', 'harbor-heist', 'villa-burglary', 'train-robbery', 'casino-extort', 'steal-car', 'money-transport', 'mayor-hit', 'debt-collection'].includes(action.id)) return Math.max(1, policeShift);
  return Math.max(0, policeShift);
}

function failedWantedIncrease(action: ActionConfig): number {
  if (['beg', 'pawn-sale', 'loan-take', 'loan-repay', 'casino-gamble', 'casino-roulette', 'casino-high-table', 'rent-room', 'found-gang', 'ask-tip', 'credit-start', 'credit-invest'].includes(action.id)) return 0;
  if (action.policeRisk <= 0) return 0;
  return Math.max(1, action.policeRisk);
}

function failedDamage(action: ActionConfig): number {
  if (['beg', 'pawn-sale', 'loan-take', 'loan-repay', 'casino-gamble', 'casino-roulette', 'casino-high-table', 'rent-room', 'found-gang', 'ask-tip', 'credit-start', 'credit-invest'].includes(action.id)) return 0;
  return action.risk === 'sehr hoch' ? 30 : action.risk === 'hoch' ? 20 : 10;
}

function stolenCarCandidate(state: GameState): CarId {
  const district = state.map.find((tile) => tile.x === state.position.x && tile.y === state.position.y)?.district;
  const rankIndex = ranks.findIndex((rank) => rank.name === getRank(state.points).name);
  const quality = state.stats.reputation + rankIndex * 8 + (district === 'Villenviertel' ? 20 : district === 'Bahnhofsviertel' ? 10 : district === 'Industriegebiet' ? 6 : 0) + Math.random() * 35;
  if (quality > 85) return 'auburn120';
  if (quality > 68) return 'buickCentury';
  if (quality > 52) return 'chevyRoadster';
  if (quality > 35) return 'citroenTa';
  return 'talbot90';
}

export function describeAction(state: GameState, action: ActionConfig): string[] {
  const req = actionAvailability(state, action);
  const cost = actionCost(state, action);
  const capLeft = Math.max(0, MONTHLY_POINT_CAP - state.monthlyPointGain);
  const activeTip = tipForAction(state, action.id);
  const location = getCurrentLocation(state);
  const reward = actionRewardRange(state, action);
  return [
    location ? `Ort: ${locationSummary(location)}` : '',
    cost ? `Kosten: ${formatMoney(cost)}` : 'Kosten: keine',
    `Schrittkosten: ${action.stepCost ?? 1}`,
    reward ? `Mögliche Beute: ${formatMoney(reward[0])}-${formatMoney(reward[1])}` : action.effect,
    activeTip?.rewardModifier ? `Aktiver Tipp: ${activeTip.title}, Beute x${activeTip.rewardModifier.toFixed(2)}` : '',
    action.tipOnly ? 'Nur mit aktuellem Kneipen-Tipp sichtbar.' : '',
    `Risiko: ${action.risk}`,
    `Polizeirisiko: ${action.policeRisk >= 0 ? '+' : ''}${action.policeRisk}`,
    `Straßenruf bei Erfolg: ${action.reputationEffect >= 0 ? '+' : ''}${action.reputationEffect}`,
    `Rangpunkte bei Erfolg: +${Math.min(action.pointEffect ?? 0, capLeft)}${(action.pointEffect ?? 0) > capLeft ? ' (Monatslimit)' : ''}`,
    capLeft === 0 && (action.pointEffect ?? 0) > 0 ? 'Mehr Ruhm holst Du diesen Monat nicht aus der Straße.' : `Rangpunkte diesen Monat: ${state.monthlyPointGain}/${MONTHLY_POINT_CAP}`,
    `Benötigter Rang: ${action.rank ?? 'Anfänger'}`,
    action.gangSlots ? `Gang beteiligt: bis zu ${action.gangSlots}` : 'Gang beteiligt: optional',
    action.recommendedRoles?.length ? `Empfohlen: ${action.recommendedRoles.join(', ')}` : 'Empfohlen: keine Spezialrolle',
    action.id === 'blackmail' ? `Schutzstatus: ${state.shopProtections[shopKeyAt(state)] === 'protectedByPlayer' ? 'Dein Laden' : state.shopProtections[shopKeyAt(state)] === 'protectedByRival' ? 'Rivalenschutz' : 'offen'}` : '',
    `Erfolgschance grob: ${Math.round(successChance(state, action))}%`,
    req.length ? req.join(', ') : 'Anforderungen erfüllt',
  ].filter(Boolean);
}

function availableTipPool(state: GameState): TipConfig[] {
  const rank = getRank(state.points).name;
  const location = getCurrentLocation(state);
  const tierAllowed = (tip: TipConfig) => {
    if (tip.tier === 'early') return true;
    if (tip.tier === 'mid') return rankMeets(rank, 'Ganove');
    return rankMeets(rank, 'Bullenschreck');
  };
  return tips.filter((tip) => {
    if (!tierAllowed(tip)) return false;
    if (location?.tipTiers?.length && !location.tipTiers.includes(tip.tier)) return false;
    if (location?.tags.includes('waterfront') && tip.locationDistrict && !['Hafenviertel', 'Bahnhofsviertel'].includes(tip.locationDistrict)) return false;
    if (location?.tags.includes('railway') && tip.locationDistrict && tip.locationDistrict !== 'Bahnhofsviertel') return false;
    if (location?.tags.includes('highSociety') && tip.locationDistrict && tip.locationDistrict !== 'Villenviertel') return false;
    if (tip.requiredRank && !rankMeets(rank, tip.requiredRank)) return false;
    if (tip.requiredStats && checkRequirements(state, tip.requiredStats).length) return false;
    if (state.activeTips.some((active) => active.id === tip.id && active.expiresMonth >= state.month)) return false;
    return true;
  });
}

function drawTips(state: GameState): TipConfig[] {
  const pool = [...availableTipPool(state)].sort(() => Math.random() - 0.5);
  return pool.slice(0, clamp(1 + Math.floor(Math.random() * 3), 1, Math.max(1, pool.length)));
}

export function buyTip(state: GameState, tipId: string): GameState {
  const tip = state.availableTips.find((item) => item.id === tipId);
  if (!tip) return withResult(state, 'Tipp verschwunden', ['Der Wirt kennt diesen Hinweis nicht mehr.']);
  const paid = spend(state, tip.cost);
  if (!paid) return withResult(addLog(state, `${tip.title} kostet ${formatMoney(tip.cost)}.`), 'Nicht möglich', [`${tip.title} kostet ${formatMoney(tip.cost)}.`]);
  const currentDistrict = state.map.find((tile) => tile.x === state.position.x && tile.y === state.position.y)?.district;
  const distant = Boolean(tip.locationDistrict && currentDistrict && tip.locationDistrict !== currentDistrict);
  const validMonths = Math.max(tip.expiresInMonths, tip.guaranteedCombat || distant ? 2 : 1);
  const active: ActiveTip = { ...tip, expiresInMonths: validMonths, expiresMonth: state.month + validMonths };
  return withResult(addLog({
    ...paid,
    activeTips: [...paid.activeTips.filter((item) => item.id !== tip.id), active],
    availableTips: paid.availableTips.filter((item) => item.id !== tip.id),
    monthlyQuietActions: paid.monthlyQuietActions + 1,
  }, `Tipp gekauft: ${tip.title}.`), 'Tipp gekauft', [
    tip.title,
    tip.text,
    tip.unlocksAction ? `Schaltet frei: ${getAction(tip.unlocksAction).name}.` : 'Verbessert Deine Optionen.',
    distant || tip.distanceHint ? `${tip.distanceHint ?? 'Weiter Weg - bleibt länger heiß.'}` : 'Normaler Tipp: heute und den ganzen Folgemonat nutzbar.',
    `Gültig bis einschließlich ${formatGameDate(active.expiresMonth)}.`,
  ]);
}

export function buyWeapon(state: GameState, weaponId: WeaponId): GameState {
  const weapon = getWeapon(weaponId);
  if (weaponId === 'none') return state;
  if (getCurrentBuilding(state)?.id === 'weapons' && !availableWeaponsForLocation(state).some((item) => item.id === weaponId)) {
    return withResult(addLog(state, `${weapon.name} wird hier nicht verkauft.`), 'Nicht möglich', [`${weapon.name} gibt es an diesem Ort nicht.`]);
  }
  const blocked = checkRequirements(state, weapon.requiredStats);
  if (blocked.length) return withResult(addLog(state, blocked[0]), 'Nicht möglich', blocked);
  const paid = spend(state, weapon.price);
  if (!paid) return withResult(addLog(state, `${weapon.name} kostet ${formatMoney(weapon.price)}.`), 'Nicht möglich', [`${weapon.name} kostet ${formatMoney(weapon.price)}.`]);
  return withResult(addLog({ ...paid, arsenal: [...paid.arsenal, createOwnedWeapon(weaponId)], monthlyQuietActions: paid.monthlyQuietActions + 1 }, `${weapon.name} gekauft. Sie liegt frei im Arsenal.`), 'Waffe gekauft', [
    `${weapon.name} liegt nun frei im Arsenal.`,
    `Reichweite ${weapon.range}, Genauigkeit ${weapon.accuracy}%, Schaden ${weapon.damage}.`,
    'Rüste sie dem Spieler oder einem Gangmitglied zu, damit sie wirkt.',
  ]);
}

export function sellWeapon(state: GameState, ownedWeaponId: string): GameState {
  const owned = state.arsenal.find((item) => item.id === ownedWeaponId);
  if (!owned) return withResult(state, 'Nicht möglich', ['Diese Waffe existiert nicht im Arsenal.']);
  if (owned.assignedTo) return withResult(state, 'Nicht möglich', ['Ausgerüstete Waffen müssen zuerst abgelegt werden.']);
  const weapon = getWeapon(owned.weaponId);
  const value = sellValue(owned.weaponId);
  return withResult(addLog({
    ...state,
    arsenal: state.arsenal.filter((item) => item.id !== ownedWeaponId),
    stats: { ...state.stats, money: state.stats.money + value },
    monthlyQuietActions: state.monthlyQuietActions + 1,
  }, `${weapon.name} verkauft.`), 'Waffe verkauft', [`${weapon.name} verkauft.`, `Erlös: ${formatMoney(value)}.`]);
}

export function buyCar(state: GameState, carId: CarId): GameState {
  const car = getCar(carId);
  if (getCurrentBuilding(state)?.id === 'cars' && !availableCarsForLocation(state).some((item) => item.id === carId)) {
    return withResult(addLog(state, `${car.name} steht hier nicht auf dem Hof.`), 'Nicht möglich', [`${car.name} wird an diesem Ort nicht verkauft.`]);
  }
  const blocked = checkRequirements(state, [{ stat: 'reputation', min: car.reputationRequirement }, ...car.requiredStats]);
  if (blocked.length) return withResult(addLog(state, blocked[0]), 'Nicht möglich', blocked);
  const paid = spend(state, car.price);
  if (!paid) return withResult(addLog(state, `${car.name} kostet ${formatMoney(car.price)}.`), 'Nicht möglich', [`${car.name} kostet ${formatMoney(car.price)}.`]);
  const previousMovement = getCar(state.car).movementPoints;
  const usedSteps = Math.max(0, previousMovement - state.stepsLeft);
  const stepsLeft = clamp(car.movementPoints - usedSteps, 0, car.movementPoints);
  return withResult(addLog({ ...paid, car: carId, stepsLeft, monthlyQuietActions: paid.monthlyQuietActions + 1 }, `${car.name} gekauft. Bewegung pro Monat: ${car.movementPoints}.`), 'Auto gekauft', [`${car.name} ist jetzt aktiv.`, `Bewegung pro Monat: ${car.movementPoints}.`, `Übrige Schritte: ${stepsLeft}.`, car.specialEffect]);
}

export function hireRecruit(state: GameState, templateId: string): GameState {
  const template = recruitTemplates.find((item) => item.templateId === templateId);
  if (!template) return state;
  if (!availableRecruitsForLocation(state).some((recruit) => recruit.templateId === templateId)) {
    return withResult(addLog(state, `${template.nickname} ist an diesem Ort nicht zu finden.`), 'Nicht möglich', [`${template.nickname} verkehrt nicht an diesem Ort.`]);
  }
  if (!state.hotelRoom && !state.gangFounded) return withResult(addLog(state, 'Du brauchst erst ein Zimmer oder ein Versteck.'), 'Nicht möglich', ['Benötigt Hotelzimmer oder organisiertes Versteck.']);
  if (state.gang.length >= 10) return withResult(addLog(state, 'Mehr als zehn Leute werden zu laut.'), 'Nicht möglich', ['Maximal 10 Gangmitglieder.']);
  if (state.gang.some((member) => member.templateId === templateId && member.status !== 'tot')) return withResult(addLog(state, `${template.nickname} arbeitet bereits für Dich.`), 'Nicht möglich', [`${template.nickname} arbeitet bereits für Dich.`]);
  const blocked = checkRequirements(state, template.requirements);
  if (blocked.length) return withResult(addLog(state, blocked[0]), 'Nicht möglich', blocked);
  const paid = spend(state, template.cost);
  if (!paid) return withResult(addLog(state, `${template.nickname} verlangt ${formatMoney(template.cost)} Handgeld.`), 'Nicht möglich', [`${template.nickname} verlangt ${formatMoney(template.cost)} Handgeld.`]);
  const recruit: GangMember = { ...template, id: crypto.randomUUID(), status: 'aktiv', health: 100 };
  const arsenal = template.weapon === 'none' ? paid.arsenal : [...paid.arsenal, createOwnedWeapon(template.weapon, recruit.id)];
  return withResult(addLog({ ...paid, gangFounded: true, monthlyQuietActions: paid.monthlyQuietActions + 1, gang: [...paid.gang, recruit], arsenal }, `${template.name} "${template.nickname}" tritt Deiner Bande bei.`), 'Rekrutiert', [`${template.name} "${template.nickname}" ist dabei.`, `Unterhalt: ${formatMoney(template.upkeep)} pro Monat.`, template.weapon === 'none' ? 'Startwaffe: Hände.' : `Startwaffe: ${getWeapon(template.weapon).name}.`, template.special]);
}

function gangWeaponRequirementMessages(member: GangMember, weapon: WeaponConfig): string[] {
  return weapon.requiredStats.flatMap((requirement) => {
    if (!requirement.stat || requirement.min == null) return [];
    if (!['strength', 'intelligence', 'brutality'].includes(requirement.stat)) return [];
    const value = member[requirement.stat as 'strength' | 'intelligence' | 'brutality'];
    return value >= requirement.min ? [] : [`${member.nickname} benötigt ${statLabel(requirement.stat)} ${requirement.min}.`];
  });
}

function syncMemberWeapon(member: GangMember, arsenal: OwnedWeapon[]): GangMember {
  return { ...member, weapon: arsenal.find((owned) => owned.assignedTo === member.id)?.weaponId ?? 'none' };
}

function gangTrainingLabel(stat: 'strength' | 'intelligence' | 'brutality' | 'shooting' | 'driving'): string {
  if (stat === 'shooting') return 'Schießen';
  if (stat === 'driving') return 'Fahren';
  if (stat === 'intelligence') return 'Planung';
  return statLabel(stat);
}

export function equipMember(state: GameState, memberId: string, ownedWeaponId: string): GameState {
  const member = state.gang.find((item) => item.id === memberId);
  if (!member) return state;
  if (ownedWeaponId === 'none') {
    const arsenal = state.arsenal.map((owned) => owned.assignedTo === memberId ? { ...owned, assignedTo: undefined } : owned);
    return withResult(addLog({ ...state, arsenal, gang: state.gang.map((item) => item.id === memberId ? syncMemberWeapon(item, arsenal) : item), monthlyQuietActions: state.monthlyQuietActions + 1 }, `${member.nickname} legt die Waffe ab.`), 'Waffe abgelegt', [`${member.nickname} kämpft nun mit Händen.`]);
  }
  const owned = state.arsenal.find((item) => item.id === ownedWeaponId);
  if (!owned) return withResult(addLog(state, 'Diese Waffe liegt nicht im Arsenal.'), 'Nicht möglich', ['Diese Waffe liegt nicht im Arsenal.']);
  if (owned.assignedTo && owned.assignedTo !== memberId) return withResult(state, 'Nicht möglich', [`${getWeapon(owned.weaponId).name} ist ${assignmentLabel(state, owned)}.`]);
  const weapon = getWeapon(owned.weaponId);
  const blocked = gangWeaponRequirementMessages(member, weapon);
  if (blocked.length) return withResult(state, 'Nicht möglich', blocked);
  const arsenal = state.arsenal.map((item) => {
    if (item.assignedTo === memberId) return { ...item, assignedTo: undefined };
    if (item.id === ownedWeaponId) return { ...item, assignedTo: memberId };
    return item;
  });
  return withResult(addLog({ ...state, arsenal, monthlyQuietActions: state.monthlyQuietActions + 1, gang: state.gang.map((item) => item.id === memberId ? syncMemberWeapon(item, arsenal) : item) }, 'Waffe zugeteilt.'), 'Waffe zugeteilt', [`${member.nickname}: ${weapon.name}.`]);
}

export function equipPlayer(state: GameState, ownedWeaponId: string): GameState {
  if (ownedWeaponId === 'none') {
    return withResult(addLog({ ...state, arsenal: state.arsenal.map((owned) => owned.assignedTo === 'player' ? { ...owned, assignedTo: undefined } : owned), monthlyQuietActions: state.monthlyQuietActions + 1 }, 'Du legst die Waffe ab.'), 'Waffe abgelegt', ['Du kämpfst nun mit Händen.']);
  }
  const owned = state.arsenal.find((item) => item.id === ownedWeaponId);
  if (!owned) return withResult(state, 'Nicht möglich', ['Diese Waffe existiert nicht im Arsenal.']);
  if (owned.assignedTo && owned.assignedTo !== 'player') return withResult(state, 'Nicht möglich', [`${getWeapon(owned.weaponId).name} ist ${assignmentLabel(state, owned)}.`]);
  const blocked = checkRequirements(state, getWeapon(owned.weaponId).requiredStats);
  if (blocked.length) return withResult(state, 'Nicht möglich', blocked);
  const arsenal = state.arsenal.map((item) => {
    if (item.assignedTo === 'player') return { ...item, assignedTo: undefined };
    if (item.id === ownedWeaponId) return { ...item, assignedTo: 'player' };
    return item;
  });
  return withResult(addLog({ ...state, arsenal, monthlyQuietActions: state.monthlyQuietActions + 1 }, `${getWeapon(owned.weaponId).name} beim Spieler ausgerüstet.`), 'Waffe ausgerüstet', [`Spieler: ${getWeapon(owned.weaponId).name}.`]);
}

export function trainMember(state: GameState, memberId: string, stat: 'strength' | 'intelligence' | 'brutality' | 'shooting' | 'driving'): GameState {
  if (state.stepsLeft < 2) return withResult(state, 'Nicht möglich', ['Training benötigt 2 Schritte.']);
  const paid = spend(state, 750);
  if (!paid) return withResult(addLog(state, 'Training kostet $750.'), 'Nicht möglich', ['Training kostet $750.']);
  const target = paid.gang.find((member) => member.id === memberId);
  return withResult(addLog({
    ...paid,
    stepsLeft: clamp(paid.stepsLeft - 2, 0, 99),
    monthlyQuietActions: paid.monthlyQuietActions + 1,
    gang: paid.gang.map((member) => member.id === memberId ? { ...member, [stat]: clamp(member[stat] + 5, 1, 99) } : member),
  }, `${target?.nickname ?? 'Ein Gangmitglied'} trainiert ${gangTrainingLabel(stat)}.`), 'Training abgeschlossen', [`${target?.nickname ?? 'Ein Gangmitglied'} verbessert ${gangTrainingLabel(stat)}.`]);
}

export function trainPlayer(state: GameState, stat: 'strength' | 'intelligence' | 'brutality'): GameState {
  const paid = spend(state, 600);
  if (!paid) return withResult(addLog(state, 'Training kostet $600.'), 'Nicht möglich', ['Training kostet $600.']);
  if (paid.stepsLeft < 2) return withResult(state, 'Nicht möglich', ['Training benötigt 2 Schritte.']);
  const previous = paid.stats;
  const nextStats = {
    ...paid.stats,
    strength: clamp(paid.stats.strength + (stat === 'strength' ? 4 : 1), 1, 99),
    intelligence: clamp(paid.stats.intelligence + (stat === 'intelligence' ? 4 : 1), 1, 99),
    brutality: clamp(paid.stats.brutality + (stat === 'brutality' ? 4 : 1), 1, 99),
  };
  return withResult(addLog({
    ...paid,
    stepsLeft: paid.stepsLeft - 2,
    monthlyQuietActions: paid.monthlyQuietActions + 1,
    stats: nextStats,
  }, `Du trainierst ${statLabel(stat)}.`), 'Training abgeschlossen', [
    `${statLabel(stat)} +4, andere Grundwerte +1.`,
    `Stärke ${previous.strength} -> ${nextStats.strength}`,
    `Intelligenz ${previous.intelligence} -> ${nextStats.intelligence}`,
    `Brutalität ${previous.brutality} -> ${nextStats.brutality}`,
    'Bessere Waffen werden erreichbar.',
  ]);
}

export function fireMember(state: GameState, memberId: string): GameState {
  const target = state.gang.find((member) => member.id === memberId);
  return withResult(addLog({
    ...state,
    monthlyQuietActions: state.monthlyQuietActions + 1,
    gang: state.gang.filter((member) => member.id !== memberId),
    arsenal: state.arsenal.map((owned) => owned.assignedTo === memberId ? { ...owned, assignedTo: undefined } : owned),
  }, `${target?.nickname ?? 'Ein Gangmitglied'} verlässt die Bande.`), 'Entlassen', [`${target?.nickname ?? 'Ein Gangmitglied'} verlässt die Bande.`, 'Zugewiesene Waffen liegen wieder frei im Arsenal.']);
}

export function healMember(state: GameState, memberId: string): GameState {
  const paid = spend(state, 900);
  if (!paid) return withResult(addLog(state, 'Behandlung kostet $900.'), 'Nicht möglich', ['Behandlung kostet $900.']);
  const target = paid.gang.find((member) => member.id === memberId);
  return withResult(addLog({ ...paid, monthlyQuietActions: paid.monthlyQuietActions + 1, gang: paid.gang.map((member) => member.id === memberId ? { ...member, status: 'aktiv', health: 100, loyalty: clamp(member.loyalty + 2, 0, 99) } : member) }, `${target?.nickname ?? 'Ein Gangmitglied'} ist wieder einsatzfähig.`), 'Behandlung abgeschlossen', [`${target?.nickname ?? 'Ein Gangmitglied'} ist wieder aktiv.`, 'Loyalität +2.']);
}

export interface ActionResult {
  state: GameState;
  combat?: CombatState;
}

export function resolveAction(state: GameState, actionId: ActionId): ActionResult {
  const action = getAction(actionId);
  const blocked = actionAvailability(state, action);
  if (blocked.length) return { state: withResult(addLog(state, blocked[0]), 'Nicht möglich', blocked) };

  const cost = actionCost(state, action);
  const paid = spend(state, cost);
  if (!paid) return { state: withResult(addLog(state, `${action.name} kostet ${formatMoney(cost)}.`), 'Nicht möglich', [`${action.name} kostet ${formatMoney(cost)}.`]) };

  let next: GameState = {
    ...paid,
    stepsLeft: clamp(paid.stepsLeft - (action.stepCost ?? 1), 0, 99),
    monthly: action.cooldownKey ? { ...(paid.monthly ?? {}), [monthlyKey(paid, action)]: true } : (paid.monthly ?? {}),
  };
  const chance = successChance(next, action) / 100;
  const success = Math.random() < chance;
  const car = getCar(next.car);
  const policeShift = clamp(action.policeRisk + car.policeRiskModifier, -3, 4);
  next = withActionCooldown(next, action);

  if (action.id === 'ask-tip') {
    const offers = drawTips(next);
    next = markMonthlyActivity({ ...next, availableTips: offers }, action);
    return { state: withResult(addLog(next, 'Der Wirt wischt ein Glas sauber und nennt ein paar Möglichkeiten.'), 'Kneipengerüchte', offers.length ? [
      'Der Wirt nickt kaum merklich.',
      ...offers.map((tip) => `${tip.title}: ${formatMoney(tip.cost)}.`),
      'Kaufe einen Tipp, solange er noch warm ist.',
    ] : ['Heute weiß niemand etwas, das Dir nützt.']) };
  }

  if (action.id === 'alcohol-buy') {
    const capacity = alcoholCapacity(next);
    const room = Math.max(0, capacity - next.alcoholBarrels);
    const bought = Math.min(room, 1);
    next = markMonthlyActivity({
      ...next,
      alcoholBarrels: next.alcoholBarrels + bought,
      stats: { ...next.stats, wanted: clamp(next.stats.wanted + (Math.random() < 0.12 ? 1 : 0), 0, 10) },
    }, action);
    return { state: withResult(addLog(next, bought ? 'Ein Fass verschwindet unter einer Decke.' : 'Der Wagen ist schon voll.'), bought ? 'Alkohol geladen' : 'Keine Kapazität', [
      bought ? '1 Fass gekauft.' : 'Keine freie Ladekapazität.',
      `Ladung: ${next.alcoholBarrels}/${capacity} Fässer.`,
      getCar(next.car).name === 'Citroen t.a.' ? 'Der Citroen wirkt unauffälliger als er aussieht.' : 'Jede Flasche kann Fragen auslösen.',
    ]) };
  }

  if (action.id === 'alcohol-sell') {
    const tip = tipForAction(next, action.id);
    const baseReward = 150 + Math.floor(Math.random() * 111);
    const reward = Math.round(baseReward * (tip?.rewardModifier ?? 1));
    const caught = Math.random() < clamp(0.1 + next.stats.wanted * 0.025 + (next.car === 'citroenTa' ? -0.05 : 0), 0.04, 0.45);
    const pointRequest = next.monthly.alcoholSalePoints ? 0 : 1;
    const points = !caught ? awardRankPoints(next, pointRequest, rankPointGroupForAction(action.id)) : undefined;
    next = points?.state ?? next;
    next = markMonthlyActivity({
      ...next,
      alcoholBarrels: caught ? 0 : Math.max(0, next.alcoholBarrels - 1),
      alcoholIncomeThisMonth: caught ? next.alcoholIncomeThisMonth : next.alcoholIncomeThisMonth + reward,
      monthly: { ...next.monthly, alcoholSalePoints: true },
      stats: {
        ...next.stats,
        money: caught ? next.stats.money : next.stats.money + reward,
        reputation: clamp(next.stats.reputation + (caught ? -1 : 1), 0, 99),
        wanted: clamp(next.stats.wanted + (caught ? 2 : 0), 0, 10),
      },
    }, action, caught);
    return { state: withResult(addLog(next, caught ? 'Die Alkoholroute fliegt auf. Die Fässer sind weg.' : `Ein Fass bringt ${formatMoney(reward)}.`), caught ? 'Route aufgeflogen' : 'Alkohol verkauft', caught ? [
      'Die Polizei riecht den Stoff.',
      'Alle Fässer verloren.',
      'Fahndung +2.',
    ] : [
      `Erlös: ${formatMoney(reward)}.`,
      `Fässer übrig: ${next.alcoholBarrels}/${alcoholCapacity(next)}.`,
      `Rangpunkte +${points?.gained ?? 0}.`,
      tip ? `Tippbonus aktiv: ${tip.title}.` : 'Kein Tippbonus.',
    ]) };
  }

  if (action.id === 'credit-start') {
    next = markMonthlyActivity({
      ...next,
      creditBusiness: { owned: true, invested: 2500, heat: 1 },
      stats: { ...next.stats, reputation: clamp(next.stats.reputation + 1, 0, 99) },
    }, action);
    return { state: withResult(addLog(next, 'Du kaufst ein kleines Kreditbuch.'), 'Kreditgeschäft eröffnet', ['Investiert: $2.500.', 'Monatliche Zinsen beginnen am Monatsende.', 'Hitze +1.']) };
  }

  if (action.id === 'credit-invest') {
    const investment = actionCost(state, action);
    next = markMonthlyActivity({
      ...next,
      creditBusiness: {
        owned: true,
        invested: clamp(next.creditBusiness.invested + investment, 0, 5000),
        heat: clamp(next.creditBusiness.heat + 1, 0, 10),
      },
    }, action);
    return { state: withResult(addLog(next, `${formatMoney(investment)} gehen ins Kreditbuch.`), 'Kapital angelegt', [`Kapital: ${formatMoney(next.creditBusiness.invested)} / $5.000.`, 'Monatliche Zinsen steigen.', 'Hitze +1.']) };
  }

  if (action.id === 'debt-collection') {
    const fight = Math.random() < 0.45;
    if (fight) {
      next = markMonthlyActivity(addLog(next, 'Der Schuldner hat Freunde in der Gasse.'), action);
      return { state: next, combat: makeCombat(next, 'rival', 'alley', 'debt-collection') };
    }
  }

  if (action.id === 'bank-robbery' || action.id === 'train-robbery' || action.id === 'money-transport' || action.id === 'mayor-hit') {
    next = markMonthlyActivity(addLog(next, `${action.name}: Erst sprechen die Waffen.`), action);
    const scenario = action.id === 'bank-robbery' ? 'bank' : action.id === 'mayor-hit' ? 'villa' : 'station';
    return { state: next, combat: makeCombat(next, 'rival', scenario, action.id) };
  }

  if (action.id === 'gang-war') {
    next = markMonthlyActivity(addLog(next, 'Du lässt Rivalen wissen, dass die Straße neu sortiert wird.'), action);
    return { state: next, combat: makeCombat(next, 'rival', 'rival', 'gang-war') };
  }

  if (action.id === 'blackmail') {
    const shopKey = shopKeyAt(next);
    const protection = next.shopProtections[shopKey];
    const rivalProtected = protection === 'protectedByRival' || (!protection && Math.random() < 0.25);
    if (rivalProtected) {
      next = markMonthlyActivity(addLog({
        ...next,
        shopProtections: { ...next.shopProtections, [shopKey]: 'protectedByRival' },
      }, 'Der Laden zahlt schon an Rivalen. Draußen warten Männer.'), action);
      return { state: next, combat: makeCombat(next, 'rival', 'rival', 'blackmail', shopKey) };
    }
  }

  if (action.id === 'rent-room') {
    next = markMonthlyActivity({ ...next, hotelRoom: true, gangFounded: true }, action);
    return { state: withResult(addLog(next, `${next.gangName} hat jetzt eine diskrete Adresse.`), 'Hotelzimmer gemietet', [`${next.gangName} hat eine erste Adresse.`, 'Bandenverwaltung freigeschaltet.', 'Rekrutierung möglich.']) };
  }

  if (action.id === 'found-gang') {
    next = markMonthlyActivity({ ...next, gangFounded: true }, action);
    return { state: withResult(addLog(next, `${next.gangName}: Treffpunkt, Regeln und Zuständigkeiten stehen.`), 'Bande organisiert', [`Name: ${next.gangName}.`, 'Bandenverwaltung freigeschaltet.', 'Kein Handgeld, kein Rangsprung.']) };
  }

  if (action.id === 'lay-low') {
    next = markMonthlyActivity({
      ...next,
      stats: { ...next.stats, wanted: clamp(next.stats.wanted - 3, 0, 10), danger: clamp(next.stats.danger - 1, 0, 10), reputation: clamp(next.stats.reputation - 1, 0, 99) },
    }, action);
    return { state: withResult(addLog(next, 'Du bleibst im Schatten. Die Fahndung kühlt ab.'), 'Untergetaucht', ['Fahndung -3.', 'Gefahr sinkt leicht.']) };
  }

  if (action.id === 'heal-player') {
    return { state: withResult(addLog(markMonthlyActivity({ ...next, stats: { ...next.stats, health: 100 } }, action), 'Das Krankenhaus flickt Dich zusammen.'), 'Behandelt', ['Gesundheit vollständig wiederhergestellt.']) };
  }

  if (action.id.includes('counterfeit')) {
    const value = action.reward?.[0] ?? 0;
    const detected = Math.random() < (action.risk === 'hoch' ? 0.35 : action.risk === 'mittel' ? 0.2 : 0.09) + next.stats.wanted * 0.02;
    next = markMonthlyActivity({
      ...next,
      stats: {
        ...next.stats,
        money: next.stats.money + value,
        counterfeit: clamp(next.stats.counterfeit + (detected ? action.policeRisk + 1 : 1), 0, 10),
        wanted: clamp(next.stats.wanted + (detected ? action.policeRisk : 0), 0, 10),
      },
    }, action);
    return { state: withResult(addLog(next, detected ? `${action.name}: Ede liefert, aber ein Händler wird misstrauisch.` : `${action.name}: Ede liefert. ${formatMoney(value)} wandern in Deine Tasche.`), detected ? 'Blüten riskant' : 'Blüten gekauft', [detected ? 'Ein Händler wird misstrauisch.' : `${formatMoney(value)} Bargeld erhalten.`, detected ? `Fahndung +${action.policeRisk}` : 'Noch fliegt nichts auf.', `Blütenrisiko: ${next.stats.counterfeit}`]) };
  }

  if (action.id === 'fake-passport') {
    return { state: withResult(addLog(markMonthlyActivity({ ...next, stats: { ...next.stats, passport: true, wanted: clamp(next.stats.wanted - 2, 0, 10) } }, action), 'Ein neuer Name, ein neuer Stempel, weniger Fragen.'), 'Neuer Pass', ['Falscher Pass aktiv.', 'Fahndung -2.']) };
  }

  if (action.id === 'police-chief-bribe') {
    const protectionMonths = clamp(2 + Math.floor(getRank(next.points).points / 35), 2, 4);
    const ok = success || activeGang(next.gang).some((member) => member.role === 'Verhandler');
    next = markMonthlyActivity({
      ...next,
      policeProtectionUntilMonth: ok ? next.month + protectionMonths : next.policeProtectionUntilMonth,
      stats: {
        ...next.stats,
        wanted: clamp(next.stats.wanted + (ok ? -1 : 1), 0, 10),
      },
    }, action);
    return { state: withResult(addLog(next, ok ? 'Der Polizeichef nimmt den Umschlag und vergisst Deine Straßenecken.' : 'Der Umschlag verschwindet, aber nicht in der richtigen Schublade.'), ok ? 'Polizeischutz gekauft' : 'Bestechung gescheitert', ok ? [`Straßenkontrollen ausgesetzt bis ${formatGameDate(next.policeProtectionUntilMonth ?? next.month)}.`, 'Der Schupo wird freundlicher nicken.'] : ['Fahndung +1.', 'Kein Schutz aktiv.']) };
  }

  if (action.id === 'police-bribe') {
    const ok = success || next.stats.money > 5000;
    return { state: withResult(addLog(markMonthlyActivity({ ...next, stats: { ...next.stats, wanted: clamp(next.stats.wanted - (ok ? 2 : 0), 0, 10) } }, action), ok ? 'Die Akte wird dünner.' : 'Der Umschlag landet bei der falschen Person.'), ok ? 'Bestechung gelungen' : 'Bestechung gescheitert', [ok ? 'Fahndung -2.' : 'Keine Wirkung.']) };
  }

  if (action.id === 'steal-car') {
    const foundCar = success ? stolenCarCandidate(next) : undefined;
    const found = foundCar ? getCar(foundCar) : undefined;
    const current = getCar(next.car);
    const better = found ? found.movementPoints > current.movementPoints : false;
    const points = success && better ? awardRankPoints(next, action.pointEffect ?? 0, rankPointGroupForAction(action.id)) : undefined;
    next = points?.state ?? next;
    next = {
      ...next,
      car: better && foundCar ? foundCar : next.car,
      stats: { ...next.stats, wanted: clamp(next.stats.wanted + (success ? 1 : 2), 0, 10), reputation: clamp(next.stats.reputation + (success && better ? 1 : 0), 0, 99) },
    };
    next = markMonthlyActivity(next, action, !success);
    if (success && found && !better) {
      return { state: withResult(addLog(next, `Nur ein ${found.name}. Nicht besser als Dein aktueller Wagen.`), 'Kein besserer Wagen', [`Nur ein ${found.name}. Nicht besser als Dein aktueller Wagen.`, `Aktuell: ${current.name}.`, 'Fahndung +1.']) };
    }
    return { state: withResult(addLog(next, success && found ? `${found.name} gestohlen.` : 'Autodiebstahl scheitert.'), success ? 'Auto gestohlen' : 'Fehlschlag', success && found ? [`${found.name} ist jetzt aktiv.`, `Bewegung: ${found.movementPoints} Schritte pro Monat.`, `Rangpunkte +${points?.gained ?? 0}.`, points?.capped ? 'Mehr Ruhm holst Du diesen Monat nicht aus der Straße.' : `Monatslimit: ${next.monthlyPointGain}/${MONTHLY_POINT_CAP}.`] : ['Ein Wachmann schlägt Alarm.', 'Fahndung steigt.']) };
  }

  if (success) {
    const tip = tipForAction(next, action.id);
    const rewardRange = actionRewardRange(next, action);
    const baseReward = rewardRange ? rewardRange[0] + Math.floor(Math.random() * (rewardRange[1] - rewardRange[0] + 1)) : 0;
    const reward = Math.round(baseReward * (tip?.rewardModifier ?? 1));
    const wantedIncrease = successfulWantedIncrease(action, policeShift);
    const points = awardRankPoints(next, action.pointEffect ?? 0, rankPointGroupForAction(action.id), Boolean(tip && action.tipOnly));
    next = points.state;
    next = {
      ...next,
      shopProtections: action.id === 'blackmail'
        ? { ...next.shopProtections, [shopKeyAt(next)]: 'protectedByPlayer' }
        : next.shopProtections,
      stats: {
        ...next.stats,
        money: next.stats.money + reward,
        reputation: clamp(next.stats.reputation + action.reputationEffect, 0, 99),
        wanted: clamp(next.stats.wanted + wantedIncrease, 0, 10),
        danger: clamp(next.stats.danger + (action.danger ?? 0), 0, 10),
      },
    };
    next = markMonthlyActivity(next, action);
    next = withResult(addLog(next, `${action.name} gelingt. Beute: ${formatMoney(reward)}.`), 'Erfolg', [`${action.name} gelingt.`, tip?.rewardModifier ? `Tippbonus: ${tip.title}.` : '', `Beute: ${formatMoney(reward)}.`, `Rangpunkte +${points.gained}.`, points.capped ? 'Die Straße staunt nicht zweimal über denselben Trick.' : `Monatsruhm: ${next.monthlyPointGain}/${MONTHLY_POINT_CAP}.`, `Straßenruf ${action.reputationEffect >= 0 ? '+' : ''}${action.reputationEffect}.`, wantedIncrease ? `Fahndung +${wantedIncrease}.` : 'Keine zusätzliche Fahndung.'].filter(Boolean));
  } else {
    const damage = failedDamage(action);
    const wantedIncrease = failedWantedIncrease(action);
    const active = activeGang(next.gang);
    const unlucky = active.length && Math.random() < 0.45 ? active[Math.floor(Math.random() * active.length)] : undefined;
    next = {
      ...next,
      stats: {
        ...next.stats,
        health: clamp(next.stats.health - damage, 0, 100),
        wanted: clamp(next.stats.wanted + wantedIncrease, 0, 10),
        reputation: clamp(next.stats.reputation - (action.id === 'beg' ? 0 : 1), 0, 99),
      },
      gang: next.gang.map((member) => member.id === unlucky?.id ? { ...member, status: Math.random() < 0.25 ? 'verhaftet' : 'verletzt' } : member),
    };
    next = markMonthlyActivity(next, action, damage > 0);
    const scenario = failedActionCombatScenario(action);
    if (scenario && activeGang(next.gang).length > 0 && Math.random() < combatTriggerChance(action.risk)) {
      next = addLog(next, `${action.name} scheitert. Waffen werden gezogen.`);
      return { state: next, combat: makeCombat(next, 'rival', scenario) };
    }
    next = withResult(addLog(next, `${action.name} scheitert. ${action.failure}`), 'Fehlschlag', [action.failure, `Gesundheit -${damage}.`, wantedIncrease ? `Fahndung +${wantedIncrease}.` : 'Keine zusätzliche Fahndung.']);
  }

  if (next.stats.health <= 0) next = { ...next, screen: 'lost', gameOverReason: 'Du bist Deinen Verletzungen erlegen.' };
  if (next.points >= 120 && next.stats.money >= 50000 && activeGang(next.gang).length >= 5) next = { ...next, screen: 'won', gameOverReason: 'Du bist Der Pate geworden.' };
  return { state: next };
}

function combatTriggerChance(risk: ActionConfig['risk']): number {
  if (risk === 'mittel') return 0.15;
  if (risk === 'hoch') return 0.35;
  if (risk === 'sehr hoch') return 0.6;
  return 0;
}

function failedActionCombatScenario(action: ActionConfig): CombatScenarioId | undefined {
  if (action.id === 'bank-robbery' || action.id === 'safe-crack') return 'bank';
  if (action.id === 'train-robbery') return 'station';
  if (action.id === 'station-job') return 'station';
  if (action.id === 'harbor-heist') return 'harbor';
  if (action.id === 'villa-burglary') return 'villa';
  return undefined;
}

export function processMonth(state: GameState): GameState {
  const previousRank = getRank(state.points).name;
  const previousMonthlyPointGain = state.monthlyPointGain;
  const upkeep = state.gang.filter((member) => member.status !== 'tot').reduce((sum, member) => sum + member.upkeep, 0);
  const informantIncome = activeGang(state.gang).filter((member) => member.role === 'Informant').length * 180;
  const protectedShops = Object.entries(state.shopProtections ?? {}).filter(([, status]) => status === 'protectedByPlayer');
  const protectionIncome = protectedShops.reduce((sum, [key]) => sum + 100 + ((key.length * 37 + state.month * 19) % 401), 0);
  const creditRate = state.creditBusiness.owned ? 0.1 + Math.random() * 0.08 : 0;
  const creditIncome = Math.floor(state.creditBusiness.invested * creditRate);
  const passiveIncome = informantIncome + protectionIncome + creditIncome;
  const canPayUpkeep = state.stats.money + passiveIncome >= upkeep;
  const calmMonth = state.monthlyCrimeCount === 0;
  const hardMonth = state.monthlyMajorCrimeCount > 0 || state.monthlyInjured;
  const healthRecovery = hardMonth ? 5 : 10;
  const wantedDecay = (calmMonth ? 1 : 0) + (state.stats.passport ? 1 : 0);
  let next: GameState = {
    ...state,
    month: state.month + 1,
    stepsLeft: getCar(state.car).movementPoints,
    monthly: {},
    monthlyCrimeCount: 0,
    monthlyMajorCrimeCount: 0,
    monthlyQuietActions: 0,
    monthlyInjured: false,
    monthlyPointGain: 0,
    availableTips: [],
    activeTips: state.activeTips.filter((tip) => tip.expiresMonth >= state.month + 1),
    alcoholIncomeThisMonth: 0,
    creditBusiness: {
      ...state.creditBusiness,
      heat: clamp(state.creditBusiness.heat + (creditIncome > 0 ? 1 : -1), 0, 10),
    },
    protectionChallenge: undefined,
    actionCooldowns: Object.fromEntries(Object.entries(state.actionCooldowns ?? {}).filter(([, until]) => until > state.month + 1)),
    stats: {
      ...state.stats,
      money: Math.max(0, state.stats.money - upkeep + passiveIncome),
      health: clamp(state.stats.health + healthRecovery, 0, 100),
      wanted: clamp(state.stats.wanted - wantedDecay + (state.creditBusiness.heat >= 5 && Math.random() < 0.25 ? 1 : 0), 0, 10),
    },
    gang: state.gang.map((member) => {
      const recovered = member.status === 'verletzt' && Math.random() < 0.35;
      const loyaltyShift = canPayUpkeep ? 1 : -12;
      return {
        ...member,
        status: recovered ? 'aktiv' : member.status,
        health: recovered ? Math.max(member.health, 70) : member.status === 'verletzt' ? clamp(member.health + 12, 1, 100) : member.health,
        loyalty: clamp(member.loyalty + loyaltyShift, 0, 99),
      };
    }),
  };
  const events: string[] = [
    `Unterhalt: ${formatMoney(upkeep)}.`,
    `Informanten: ${formatMoney(informantIncome)}.`,
    `laufendes Schutzgeld: ${formatMoney(protectionIncome)}.`,
    `Kreditzinsen: ${formatMoney(creditIncome)}.`,
    state.alcoholIncomeThisMonth ? `Alkoholroute diesen Monat: ${formatMoney(state.alcoholIncomeThisMonth)}.` : 'Alkoholroute: keine Verkäufe.',
    `Netto: ${formatMoney(passiveIncome - upkeep)}.`,
    `Erholung: +${healthRecovery} Gesundheit.`,
    calmMonth ? `Ruhiger Monat: Fahndung -${wantedDecay}.` : `Monatsdruck: ${state.monthlyCrimeCount} Verbrechen, davon ${state.monthlyMajorCrimeCount} schwer.`,
  ];
  if (state.policeProtectionUntilMonth && state.policeProtectionUntilMonth > next.month) {
    events.push(`Polizeischutz aktiv bis ${formatGameDate(state.policeProtectionUntilMonth)}.`);
  }
  next = addLog(next, `Monat endet. Einnahmen: ${formatMoney(passiveIncome)}. Unterhalt: ${formatMoney(upkeep)}.`);
  if (!canPayUpkeep) {
    const beforeCount = next.gang.length;
    const betrayals = next.gang.filter((member) => member.status !== 'tot' && member.loyalty < 18 && Math.random() < 0.35).length;
    const loyalGang = next.gang.filter((member) => member.status === 'tot' || member.loyalty >= 12 || Math.random() < member.loyalty / 18);
    next = {
      ...next,
      stats: {
        ...next.stats,
        money: 0,
        reputation: clamp(next.stats.reputation - 2, 0, 99),
        wanted: clamp(next.stats.wanted + betrayals, 0, 10),
        danger: clamp(next.stats.danger + (betrayals ? 1 : 0), 0, 10),
      },
      gang: loyalGang,
      arsenal: next.arsenal.map((owned) => !owned.assignedTo || owned.assignedTo === 'player' || loyalGang.some((member) => member.id === owned.assignedTo) ? owned : { ...owned, assignedTo: undefined }),
    };
    next = addLog(next, 'Leere Kasse. Niedrige Loyalität wird plötzlich ehrlich.');
    events.push('Unterhalt nicht bezahlt: Loyalität -12.');
    if (beforeCount !== next.gang.length) events.push(`${beforeCount - next.gang.length} untreue Leute verschwinden.`);
    if (betrayals) events.push('Verrat: Informationen landen bei der Polizei.');
  } else if (state.gang.length > 0) {
    events.push('Unterhalt bezahlt: Loyalität +1.');
  }
  const eventRoll = Math.random();
  if (!calmMonth && next.stats.counterfeit > 0 && eventRoll < 0.14) {
    next = addLog({ ...next, stats: { ...next.stats, counterfeit: Math.max(0, next.stats.counterfeit - 1), wanted: clamp(next.stats.wanted + 1, 0, 10) } }, 'Ein Blütenschein fliegt auf.');
    events.push('Blütenrisiko fällt auf: Risiko -1, Fahndung +1.');
  } else if (!calmMonth && eventRoll < 0.26) {
    next = addLog({ ...next, stats: { ...next.stats, danger: clamp(next.stats.danger + 1, 0, 10) } }, 'Eine rivalisierende Bande markiert Dein Viertel.');
    events.push('Rivalen markieren Dein Viertel: Gefahr +1.');
  } else if (protectedShops.length > 0 && eventRoll < 0.34) {
    const [shopKey] = protectedShops[Math.floor(Math.random() * protectedShops.length)];
    next = {
      ...addLog(next, 'Rivalen wollen einen Deiner Schutzgeldläden übernehmen.'),
      protectionChallenge: { shopKey, label: shopLabel(shopKey) },
    };
    events.push(`${shopLabel(shopKey)}: Rivalen fordern Dich heraus.`);
  } else if (eventRoll < 0.45) {
    next = addLog({ ...next, stats: { ...next.stats, reputation: clamp(next.stats.reputation + 1, 0, 99) } }, 'Dein Name fällt in mehr Hinterzimmern.');
    events.push('Gerüchte: Straßenruf +1.');
  }

  if (next.month >= 36) next = { ...next, screen: 'lost', gameOverReason: '01/1928 ist erreicht. Die Stadt hat einen anderen Boss gefunden.' };
  if (next.stats.health <= 0) next = { ...next, screen: 'lost', gameOverReason: 'Du bist Deinen Verletzungen erlegen.' };
  if (next.points >= 120 && next.stats.money >= 50000 && activeGang(next.gang).length >= 5) next = { ...next, screen: 'won', gameOverReason: 'Du bist Der Pate geworden.' };
  const currentRank = getRank(next.points).name;
  const income = passiveIncome;
  const weapon = getPlayerWeapon(next);
  return withResult(next, `Steckbrief ${formatGameDate(next.month)}`, [
    '[||||]',
    `Name: ${next.playerName}`,
    `Rang: ${currentRank}${currentRank !== previousRank ? ` (Aufstieg von ${previousRank})` : ''}`,
    `Rangpunkte: ${next.points}`,
    `Monatsruhm: ${previousMonthlyPointGain}/${MONTHLY_POINT_CAP}`,
    `Geld: ${formatMoney(next.stats.money)}`,
    `Fahndung: ${next.stats.wanted}`,
    `Gesundheit: ${next.stats.health}`,
    `Waffe: ${weapon.name}`,
    `Auto: ${getCar(next.car).name}`,
    `Bande: ${next.gangName} (${activeGang(next.gang).length}/${next.gang.length} aktiv)`,
    `Monatliche Einnahmen: ${formatMoney(income)}`,
    `  Schutzgeld: ${formatMoney(protectionIncome)}`,
    `  Kreditgeschäft: ${formatMoney(creditIncome)}`,
    `  Informanten: ${formatMoney(informantIncome)}`,
    state.alcoholIncomeThisMonth ? `Alkohol verkauft: ${formatMoney(state.alcoholIncomeThisMonth)}` : 'Alkohol verkauft: $0',
    `Monatlicher Unterhalt: ${formatMoney(upkeep)}`,
    `Netto: ${formatMoney(income - upkeep)}`,
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
  const protectedOnStreet = isPoliceProtectionActive(next);
  const protectedRisk = protectedOnStreet ? rawPoliceCheckRisk(next) : 0;
  if (protectedOnStreet && Math.random() < protectedRisk) {
    return withResult(addLog(next, 'Der Schupo erkennt Dich und schaut woanders hin.'), 'Polizeischutz', ['Der Schupo erkennt Dich, tippt an die Mütze und lässt Dich weitergehen.']);
  }
  if (Math.random() < risk) {
    next = {
      ...next,
      monthly: { ...(next.monthly ?? {}), randomPoliceCheckDone: true },
      policeCheck: {
        risk,
        reason: 'Eine Streife mustert Dich an der Straßenecke.',
      },
    };
  }
  return next;
}

function isWalkable(tile: Tile): boolean {
  return tile.kind === 'road' || tile.kind === 'dock';
}

function policeCheckRisk(state: GameState): number {
  if (rankMeets(getRank(state.points).name, 'Bullenschreck')) return 0;
  if (state.month === 0) return 0;
  if (state.monthly?.randomPoliceCheckDone) return 0;
  if (state.policeCheckCooldownUntilMonth != null && state.month < state.policeCheckCooldownUntilMonth) return 0;
  if (isPoliceProtectionActive(state)) return 0;
  return rawPoliceCheckRisk(state);
}

function isPoliceProtectionActive(state: GameState): boolean {
  return Boolean(state.policeProtectionUntilMonth && state.month < state.policeProtectionUntilMonth);
}

function rawPoliceCheckRisk(state: GameState): number {
  const rankPressure = ranks.findIndex((rank) => rank.name === getRank(state.points).name) * 0.0012;
  const passportRelief = state.stats.passport ? -0.002 : 0;
  const carRelief = getCar(state.car).policeRiskModifier * 0.001;
  const counterfeitPressure = state.stats.counterfeit * 0.0015;
  const alcoholPressure = state.alcoholBarrels * 0.002;
  const creditPressure = state.creditBusiness.heat * 0.0008;
  return clamp(0.003 + state.stats.wanted * 0.0035 + state.stats.danger * 0.002 + rankPressure + counterfeitPressure + alcoholPressure + creditPressure + passportRelief + carRelief, 0, 0.04);
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
  if (option === 'flee' && activeGang(next.gang).length > 0 && Math.random() < 0.6) {
    const combat = makeCombat(next, 'police', 'police');
    return {
      ...addLog(next, 'Die Flucht eskaliert. Im Revier fallen Schüsse.'),
      screen: 'combat',
      combat,
    };
  }
  const jailMonths = option === 'flee' ? 2 : 1 + Math.floor(Math.random() * 2);
  const moneyLoss = Math.min(next.stats.money, 120 + next.stats.wanted * 80);
  const targetMonth = clamp(next.month + jailMonths, 0, 36);
  next = {
    ...next,
    month: targetMonth,
    position: { x: 26, y: 16 },
    stepsLeft: getCar(next.car).movementPoints,
    monthly: jailMonths > 0 ? {} : next.monthly,
    monthlyInjured: true,
    policeCheck: undefined,
    policeCheckCooldownUntilMonth: targetMonth + 1,
    points: clamp(next.points - (option === 'flee' ? 5 : 3), 0, 120),
    stats: {
      ...next.stats,
      money: next.stats.money - moneyLoss,
      counterfeit: Math.max(0, next.stats.counterfeit - 2),
      wanted: clamp(next.stats.wanted - 1, 0, 10),
    },
    gang: next.gang.map((member, index) => index === 0 && Math.random() < 0.25 ? { ...member, status: 'verhaftet' } : member),
  };
  if (next.month >= 36) next = { ...next, screen: 'lost', gameOverReason: 'Du hast zu viel Zeit im Gefängnis verloren. 01/1928 ist erreicht.' };
  return withResult(addLog(next, `Verhaftet: ${jailMonths} Monat(e) verloren.`), 'Verhaftet', [
    'Du kommst aus dem Polizeirevier. Für diesen Monat hältst Du besser den Kopf unten.',
    `Du verlierst ${jailMonths} Monat(e).`,
    `Geldverlust: ${formatMoney(moneyLoss)}.`,
    'Rangpunkte sinken leicht.',
    'Fahndung kühlt etwas ab.',
  ]);
}

export function resolveProtectionChallenge(state: GameState, option: 'ignore' | 'negotiate' | 'fight'): ActionResult {
  const challenge = state.protectionChallenge;
  if (!challenge) return { state };
  if (option === 'fight') {
    const next = addLog({ ...state, protectionChallenge: undefined }, `${challenge.label}: Du stellst Dich den Rivalen.`);
    return { state: next, combat: makeCombat(next, 'rival', 'rival', 'gang-war', challenge.shopKey) };
  }
  if (option === 'negotiate') {
    const effective = getEffectiveStats(state);
    const chance = clamp((effective.planning + effective.intimidation) / 140, 0.2, 0.75);
    const ok = Math.random() < chance;
    const next: GameState = {
      ...state,
      protectionChallenge: undefined,
      shopProtections: ok ? state.shopProtections : { ...state.shopProtections, [challenge.shopKey]: 'protectedByRival' },
      stats: {
        ...state.stats,
        money: clamp(state.stats.money - 450, 0, 999999),
        reputation: clamp(state.stats.reputation + (ok ? 1 : -2), 0, 99),
        danger: clamp(state.stats.danger + (ok ? 0 : 1), 0, 10),
      },
    };
    return { state: withResult(addLog(next, ok ? `${challenge.label}: Verhandlung hält die Rivalen fern.` : `${challenge.label}: Die Rivalen nehmen den Laden.`), ok ? 'Verhandelt' : 'Schutz verloren', ok ? ['Du zahlst $450 für Ruhe.', 'Schutz bleibt bestehen.', 'Straßenruf +1.'] : ['Du zahlst $450, aber die Rivalen übernehmen.', 'Straßenruf -2.', 'Gefahr +1.']) };
  }
  const next: GameState = {
    ...state,
    protectionChallenge: undefined,
    shopProtections: { ...state.shopProtections, [challenge.shopKey]: 'protectedByRival' },
    stats: { ...state.stats, reputation: clamp(state.stats.reputation - 2, 0, 99), danger: clamp(state.stats.danger + 1, 0, 10) },
  };
  return { state: withResult(addLog(next, `${challenge.label}: Du ignorierst die Rivalen. Der Laden ist weg.`), 'Schutz verloren', ['Rivalen übernehmen den Laden.', 'Straßenruf -2.', 'Gefahr +1.']) };
}

interface CombatScenarioConfig {
  id: CombatScenarioId;
  title: string;
  terrain: CombatState['terrain'];
  allySpawns: Array<{ x: number; y: number }>;
  enemySpawns: Array<{ x: number; y: number }>;
  enemyLabels: string[];
}

const combatScenarios: Record<CombatScenarioId, CombatScenarioConfig> = {
  police: {
    id: 'police',
    title: 'Schusswechsel im Polizeirevier',
    terrain: [
      ...terrainLine(4, 0, 4, 2, 'desk', '=='),
      ...terrainLine(7, 0, 7, 2, 'desk', '=='),
      ...terrainLine(5, 4, 8, 4, 'wall', '##'),
      { x: 10, y: 1, type: 'wall', icon: '##', blocks: true },
      { x: 10, y: 2, type: 'wall', icon: '##', blocks: true },
      { x: 3, y: 6, type: 'crate', icon: '[]', blocks: true },
      { x: 8, y: 6, type: 'crate', icon: '[]', blocks: true },
    ],
    allySpawns: leftSpawns(),
    enemySpawns: rightSpawns(),
    enemyLabels: ['Schupo', 'Kommissar', 'Wachmann', 'Schupo'],
  },
  bank: {
    id: 'bank',
    title: 'Schusswechsel in der Bank',
    terrain: [
      ...terrainLine(5, 1, 5, 6, 'counter', '=='),
      { x: 8, y: 3, type: 'wall', icon: '##', blocks: true },
      { x: 8, y: 4, type: 'wall', icon: '##', blocks: true },
      { x: 3, y: 2, type: 'desk', icon: '==', blocks: true },
      { x: 3, y: 5, type: 'desk', icon: '==', blocks: true },
    ],
    allySpawns: leftSpawns(),
    enemySpawns: rightSpawns(),
    enemyLabels: ['Bankwächter', 'Kassierer mit Colt', 'Wachmann', 'Bankwächter', 'Alarmmann'],
  },
  station: {
    id: 'station',
    title: 'Schusswechsel am Bahnhof',
    terrain: [
      ...terrainLine(0, 2, COMBAT_WIDTH - 1, 2, 'platform', '::', false),
      ...terrainLine(0, 5, COMBAT_WIDTH - 1, 5, 'platform', '::', false),
      { x: 4, y: 3, type: 'crate', icon: '[]', blocks: true },
      { x: 7, y: 4, type: 'crate', icon: '[]', blocks: true },
      { x: 9, y: 2, type: 'desk', icon: '==', blocks: true },
    ],
    allySpawns: leftSpawns(),
    enemySpawns: rightSpawns(),
    enemyLabels: ['Bahnpolizist', 'Gepäckwächter', 'Postbeamter', 'Bahnpolizist', 'Schaffner'],
  },
  harbor: {
    id: 'harbor',
    title: 'Schusswechsel im Hafenlager',
    terrain: [
      ...terrainLine(4, 1, 4, 6, 'crate', '[]'),
      ...terrainLine(8, 2, 8, 6, 'crate', '[]'),
      { x: 6, y: 0, type: 'wall', icon: '##', blocks: true },
      { x: 6, y: 7, type: 'wall', icon: '##', blocks: true },
    ],
    allySpawns: leftSpawns(),
    enemySpawns: rightSpawns(),
    enemyLabels: ['Hafenwächter', 'Lagerarbeiter', 'Schmuggler', 'Hafenwächter', 'Kranführer'],
  },
  villa: {
    id: 'villa',
    title: 'Schusswechsel in der Villa',
    terrain: [
      ...terrainLine(2, 0, 9, 0, 'wall', '##'),
      ...terrainLine(2, 7, 9, 7, 'wall', '##'),
      { x: 5, y: 3, type: 'desk', icon: '==', blocks: true },
      { x: 6, y: 3, type: 'desk', icon: '==', blocks: true },
      { x: 7, y: 5, type: 'crate', icon: '[]', blocks: true },
    ],
    allySpawns: leftSpawns(),
    enemySpawns: rightSpawns(),
    enemyLabels: ['Leibwächter', 'Hausdiener', 'Wachhund', 'Gärtner mit Flinte', 'Leibwächter'],
  },
  rival: {
    id: 'rival',
    title: 'Bandenkrieg im Hinterhof',
    terrain: [
      ...terrainLine(5, 0, 5, 2, 'wall', '##'),
      ...terrainLine(6, 5, 6, 7, 'wall', '##'),
      { x: 3, y: 3, type: 'crate', icon: '[]', blocks: true },
      { x: 4, y: 5, type: 'crate', icon: '[]', blocks: true },
      { x: 8, y: 2, type: 'crate', icon: '[]', blocks: true },
      { x: 9, y: 4, type: 'crate', icon: '[]', blocks: true },
    ],
    allySpawns: leftSpawns(),
    enemySpawns: rightSpawns(),
    enemyLabels: ['Rivale', 'Schläger', 'Schütze', 'Rivale', 'Messerkerl'],
  },
  alley: {
    id: 'alley',
    title: 'Schlägerei in der Gasse',
    terrain: [
      ...terrainLine(0, 0, COMBAT_WIDTH - 1, 0, 'wall', '##'),
      ...terrainLine(0, COMBAT_HEIGHT - 1, COMBAT_WIDTH - 1, COMBAT_HEIGHT - 1, 'wall', '##'),
      { x: 4, y: 2, type: 'crate', icon: '[]', blocks: true },
      { x: 5, y: 5, type: 'crate', icon: '[]', blocks: true },
      { x: 8, y: 3, type: 'wall', icon: '##', blocks: true },
    ],
    allySpawns: leftSpawns(),
    enemySpawns: rightSpawns(),
    enemyLabels: ['Schuldner', 'Kumpan', 'Gassenkerl', 'Schläger', 'Rivale'],
  },
};

function leftSpawns(): Array<{ x: number; y: number }> {
  return [1, 2, 3, 4, 5].map((y) => ({ x: 1, y }));
}

function rightSpawns(): Array<{ x: number; y: number }> {
  return [1, 2, 3, 4, 5, 6].map((y) => ({ x: COMBAT_WIDTH - 2, y }));
}

function terrainLine(x1: number, y1: number, x2: number, y2: number, type: CombatTerrain, icon: string, blocks = true): CombatState['terrain'] {
  const tiles: CombatState['terrain'] = [];
  const dx = Math.sign(x2 - x1);
  const dy = Math.sign(y2 - y1);
  let x = x1;
  let y = y1;
  tiles.push({ x, y, type, icon, blocks });
  while (x !== x2 || y !== y2) {
    if (x !== x2) x += dx;
    if (y !== y2) y += dy;
    tiles.push({ x, y, type, icon, blocks });
  }
  return tiles;
}

function findOpenSpawn(spawns: Array<{ x: number; y: number }>, occupied: Set<string>, terrain: CombatState['terrain']): { x: number; y: number } {
  return spawns.find((spawn) => !occupied.has(`${spawn.x}-${spawn.y}`) && !terrain.some((tile) => tile.blocks && tile.x === spawn.x && tile.y === spawn.y)) ?? spawns[0] ?? { x: 0, y: 0 };
}

function combatDistance(a: { x?: number; y?: number }, b: { x: number; y: number }): number {
  return Math.abs((a.x ?? 0) - b.x) + Math.abs((a.y ?? 0) - b.y);
}

function isCombatCellBlocked(combat: CombatState, x: number, y: number, ignoreId?: string): boolean {
  if (x < 0 || x >= COMBAT_WIDTH || y < 0 || y >= COMBAT_HEIGHT) return true;
  if (combat.terrain.some((tile) => tile.blocks && tile.x === x && tile.y === y)) return true;
  if (combat.allies.some((unit) => unit.id !== ignoreId && unit.x === x && unit.y === y)) return true;
  if (combat.enemies.some((unit) => unit.id !== ignoreId && unit.x === x && unit.y === y)) return true;
  return false;
}

function nextEnemyStep(combat: CombatState, enemies: CombatEnemy[], allies: CombatAlly[], enemy: CombatEnemy, target: CombatAlly): { x: number; y: number } | undefined {
  const candidates = [
    { x: enemy.x + Math.sign((target.x ?? 0) - enemy.x), y: enemy.y },
    { x: enemy.x, y: enemy.y + Math.sign((target.y ?? 0) - enemy.y) },
    { x: enemy.x + 1, y: enemy.y },
    { x: enemy.x - 1, y: enemy.y },
    { x: enemy.x, y: enemy.y + 1 },
    { x: enemy.x, y: enemy.y - 1 },
  ];
  return candidates
    .filter((candidate) => !isCombatCellBlocked({ ...combat, allies, enemies }, candidate.x, candidate.y, enemy.id))
    .sort((a, b) => combatDistance(a, { x: target.x ?? 0, y: target.y ?? 0 }) - combatDistance(b, { x: target.x ?? 0, y: target.y ?? 0 }))[0];
}

export function makeCombat(state: GameState, kind: 'police' | 'rival', scenarioId: CombatScenarioId = kind, sourceActionId?: ActionId, sourceShopKey?: string): CombatState {
  const scenario = combatScenarios[scenarioId];
  const occupied = new Set<string>();
  const playerSpawn = findOpenSpawn(scenario.allySpawns, occupied, scenario.terrain);
  occupied.add(`${playerSpawn.x}-${playerSpawn.y}`);
  const player: CombatAlly = {
    id: 'player',
    name: state.playerName,
    nickname: 'Du',
    role: 'Spieler',
    status: 'aktiv',
    health: state.stats.health,
    strength: state.stats.strength,
    intelligence: state.stats.intelligence,
    brutality: state.stats.brutality,
    shooting: Math.round((state.stats.intelligence + state.stats.brutality) / 2),
    driving: 0,
    loyalty: 99,
    weapon: getPlayerWeapon(state).id,
    isPlayer: true,
    x: playerSpawn.x,
    y: playerSpawn.y,
  };
  const allies: CombatAlly[] = [player, ...activeGang(state.gang).slice(0, 4).map((member, index) => {
    const spawn = findOpenSpawn(scenario.allySpawns.slice(index), occupied, scenario.terrain);
    occupied.add(`${spawn.x}-${spawn.y}`);
    return { ...member, x: spawn.x, y: spawn.y };
  })];
  const enemies = Array.from({ length: kind === 'police' ? 4 : 5 }, (_, index) => {
    const spawn = findOpenSpawn(scenario.enemySpawns.slice(index), occupied, scenario.terrain);
    const label = scenario.enemyLabels[index % scenario.enemyLabels.length];
    occupied.add(`${spawn.x}-${spawn.y}`);
    return {
    id: crypto.randomUUID(),
    name: `${label} ${index + 1}`,
    health: 42 + state.stats.danger * 7,
    strength: 4 + state.stats.danger,
    weapon: (index % 2 ? 'colt1911' : 'none') as WeaponId,
      x: spawn.x,
      y: spawn.y,
    };
  });
  return {
    kind,
    scenario: scenario.id,
    title: scenario.title,
    phase: 'player',
    selectedId: allies[0]?.id,
    sourceActionId,
    sourceShopKey,
    allies,
    enemies,
    terrain: scenario.terrain,
    message: 'Du und Deine Leute sind im Feuer. Bewege eine Einheit oder greife an.',
  };
}

export function combatMove(combat: CombatState, id: string, dx: number, dy: number): CombatState {
  const ally = combat.allies.find((unit) => unit.id === id);
  if (!ally || combat.phase !== 'player') return combat;
  const x = clamp((ally.x ?? 0) + dx, 0, COMBAT_WIDTH - 1);
  const y = clamp((ally.y ?? 0) + dy, 0, COMBAT_HEIGHT - 1);
  if (isCombatCellBlocked(combat, x, y, id)) return { ...combat, message: 'Feld blockiert.' };
  return {
    ...combat,
    fx: undefined,
    allies: combat.allies.map((unit) => unit.id === id ? { ...unit, x, y } : unit),
    phase: 'enemy',
    message: `${ally.nickname} bewegt sich in Deckung.`,
  };
}

export function combatAttack(combat: CombatState, attackerId: string, enemyId: string): CombatState {
  if (combat.phase !== 'player') return combat;
  const attacker = combat.allies.find((ally) => ally.id === attackerId);
  const enemy = combat.enemies.find((target) => target.id === enemyId);
  if (!attacker || !enemy) return combat;
  const weapon = getWeapon(attacker.weapon);
  const distance = combatDistance(attacker, enemy);
  if (distance > weapon.range) return { ...combat, message: `Ziel außer Reichweite. Entfernung ${distance}, Reichweite ${weapon.range}.` };
  const hit = Math.random() * 100 < clamp(weapon.accuracy + attacker.shooting * 0.35 + attacker.brutality * 0.12 - distance * 5, 5, 95);
  const damage = hit ? weapon.damage + attacker.strength * 2 : 0;
  const enemies = combat.enemies.map((target) => target.id === enemyId ? { ...target, health: target.health - damage } : target).filter((target) => target.health > 0);
  return { ...combat, enemies, fx: { attackerId, targetId: enemyId, hit }, phase: enemies.length ? 'enemy' : 'finished', message: hit ? `* ${attacker.nickname} trifft ${enemy.name} für ${damage}.` : `* ${attacker.nickname} verfehlt ${enemy.name}.` };
}

export function combatEnemyTurn(combat: CombatState): CombatState {
  let allies = [...combat.allies];
  let enemies = [...combat.enemies];
  const messages: string[] = [];
  let fx: CombatState['fx'];
  for (const enemy of enemies) {
    const target = allies
      .map((ally) => ({ ally, distance: combatDistance(enemy, { x: ally.x ?? 0, y: ally.y ?? 0 }) }))
      .sort((a, b) => a.distance - b.distance)[0]?.ally;
    if (!target) break;
    const weapon = getWeapon(enemy.weapon);
    const distance = combatDistance(enemy, { x: target.x ?? 0, y: target.y ?? 0 });
    if (distance <= weapon.range) {
      const damage = weapon.damage * 0.35 + enemy.strength;
      if (Math.random() * 100 < clamp(weapon.accuracy - distance * 5, 8, 75)) {
        allies = allies.map((ally) => ally.id === target.id ? { ...ally, health: ally.health - damage } : ally);
        messages.push(`${enemy.name} trifft ${target.nickname}.`);
        fx = { attackerId: enemy.id, targetId: target.id, hit: true };
      } else {
        messages.push(`${enemy.name} verfehlt.`);
        fx = { attackerId: enemy.id, targetId: target.id, hit: false };
      }
      continue;
    }
    const next = nextEnemyStep(combat, enemies, allies, enemy, target);
    if (next) {
      enemies = enemies.map((unit) => unit.id === enemy.id ? { ...unit, x: next.x, y: next.y } : unit);
      messages.push(`${enemy.name} rückt vor.`);
    } else {
      messages.push(`${enemy.name} findet keinen freien Weg.`);
    }
  }
  allies = allies.filter((ally) => ally.health > 0);
  return { ...combat, allies, enemies, fx, phase: allies.length ? 'player' : 'finished', selectedId: allies[0]?.id, message: allies.length ? messages.slice(0, 2).join(' ') || 'Der Gegner bewegt sich. Du bist dran.' : 'Du und Deine Leute liegen am Boden.' };
}

export function finishCombat(state: GameState, combat: CombatState): GameState {
  const won = combat.enemies.length === 0 && combat.allies.length > 0;
  const aliveIds = new Set(combat.allies.map((ally) => ally.id));
  const playerSurvived = aliveIds.has('player');
  const action = combat.sourceActionId ? getAction(combat.sourceActionId) : undefined;
  const tip = action ? tipForAction(state, action.id) : undefined;
  const rankPoints = won
    ? awardRankPoints(state, action?.pointEffect ?? (combat.kind === 'police' ? 2 : 3), action ? rankPointGroupForAction(action.id) : combat.scenario, Boolean(tip && action?.tipOnly))
    : { state: { ...state, points: clamp(state.points - 4, 0, 120) }, gained: 0, capped: false };
  const baseReward = won && action?.reward ? action.reward[0] + Math.floor(Math.random() * (action.reward[1] - action.reward[0] + 1)) : 0;
  const reward = Math.round(baseReward * (tip?.rewardModifier ?? 1));
  const sourceWanted = won && action ? Math.max(1, action.policeRisk) : 0;
  const sourceDanger = won && action ? action.danger ?? 1 : 0;
  let next: GameState = {
    ...rankPoints.state,
    screen: 'game',
    combat: undefined,
    gang: state.gang.map((member) => {
      if (member.status !== 'aktiv') return member;
      const survivor = combat.allies.find((ally) => ally.id === member.id);
      if (survivor) return { ...member, health: clamp(survivor.health, 1, 100), loyalty: clamp(member.loyalty + (won ? 2 : -2), 0, 99) };
      return { ...member, status: combat.kind === 'police' ? 'verhaftet' : 'verletzt', health: 25, loyalty: clamp(member.loyalty - 8, 0, 99) };
    }),
    stats: {
      ...rankPoints.state.stats,
      health: won && playerSurvived ? clamp(combat.allies.find((ally) => ally.id === 'player')?.health ?? state.stats.health, 1, 100) : clamp(state.stats.health - 25, 1, 100),
      money: clamp(state.stats.money + (won ? (action ? reward : 2200) : -1200), 0, 999999),
      reputation: clamp(state.stats.reputation + (won ? (action?.reputationEffect ?? 6) : -4), 0, 99),
      wanted: clamp(state.stats.wanted + (won ? (action ? sourceWanted : combat.kind === 'police' ? 2 : 1) : combat.kind === 'police' ? 2 : 1), 0, 10),
      danger: clamp(state.stats.danger + (won ? sourceDanger || 2 : 0), 0, 10),
    },
    shopProtections: combat.sourceShopKey
      ? { ...state.shopProtections, [combat.sourceShopKey]: won ? 'protectedByPlayer' : 'protectedByRival' }
      : state.shopProtections,
  };
  const wonLines = action
    ? [`${action.name} gelingt nach dem Kampf.`, tip?.rewardModifier ? `Tippbonus: ${tip.title}.` : '', reward ? `Beute: ${formatMoney(reward)}.` : 'Die Straße gehört Dir.', `Rangpunkte +${rankPoints.gained}.`, rankPoints.capped ? 'Die Straße staunt nicht zweimal über denselben Trick.' : `Monatsruhm: ${next.monthlyPointGain}/${MONTHLY_POINT_CAP}.`, `Straßenruf +${action.reputationEffect}.`, combat.sourceShopKey ? `${shopLabel(combat.sourceShopKey)} steht unter Deinem Schutz.` : `Fahndung +${sourceWanted}.`].filter(Boolean)
    : ['Die Bande gewinnt.', `Rangpunkte +${rankPoints.gained}.`, rankPoints.capped ? 'Mehr Ruhm holst Du diesen Monat nicht aus der Straße.' : `Monatslimit: ${next.monthlyPointGain}/${MONTHLY_POINT_CAP}.`, 'Straßenruf steigt, Gefahr steigt.'];
  const lostLines = action
    ? [`${action.name} scheitert im Kugelhagel.`, 'Keine Beute.', 'Geld, Straßenruf und Rangpunkte verloren.', combat.kind === 'police' ? 'Einige Leute können verhaftet werden.' : 'Einige Leute sind verletzt.']
    : ['Niederlage ist nicht das Ende.', 'Geld und Rangpunkte verloren.', combat.kind === 'police' ? 'Einige Leute können verhaftet werden.' : 'Einige Leute sind verletzt.'];
  next = addLog(next, won ? (action ? `${action.name} gelingt nach Kampf.` : 'Du gewinnst den Kampf. Die Straße merkt sich die Lektion.') : 'Niederlage. Geld, Straßenruf und Leute gehen verloren.');
  return withResult(next, won ? 'Kampf gewonnen' : 'Kampf verloren', won ? wonLines : lostLines);
}
