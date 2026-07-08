import { useEffect, useMemo, useState } from 'react';
import {
  ActionConfig,
  ActionResult,
  BuildingConfig,
  CarId,
  GameState,
  Requirement,
  WeaponId,
  actions,
  activeGang,
  buildings,
  buyCar,
  buyWeapon,
  cars,
  actionAvailability,
  actionCost,
  assignmentLabel,
  checkRequirements,
  clearResult,
  combatAttack,
  combatEnemyTurn,
  combatMove,
  COMBAT_HEIGHT,
  COMBAT_WIDTH,
  describeAction,
  equipMember,
  equipPlayer,
  finishCombat,
  fireMember,
  formatMoney,
  formatGameDate,
  getAction,
  getBuilding,
  getCar,
  getEffectiveStats,
  getAssignedWeaponId,
  getPlayerWeapon,
  getWeapon,
  getRank,
  healMember,
  hireRecruit,
  loadGame,
  movePlayer,
  newGame,
  processMonth,
  recruitTemplates,
  rollStartingStats,
  resolvePoliceCheck,
  resolveProtectionChallenge,
  resolveAction,
  saveGame,
  sellValue,
  sellWeapon,
  statLabel,
  tileVisuals,
  trainMember,
  trainPlayer,
  weapons,
  MAP_WIDTH,
  MONTHLY_POINT_CAP,
  SAVE_KEY,
} from './game';

type Pending =
  { title: string; lines: string[]; danger?: string; confirmLabel?: string; onConfirm: (state: GameState) => GameState | ActionResult };

const statShort: Array<[string, string]> = [
  ['strength', 'ST'],
  ['intelligence', 'IN'],
  ['brutality', 'BR'],
  ['shooting', 'SCH'],
  ['driving', 'FA'],
  ['loyalty', 'LO'],
];

function App() {
  const [game, setGame] = useState<GameState>(() => loadGame() ?? { ...newGame(), screen: 'menu' });
  const [pending, setPending] = useState<Pending | null>(null);
  const [storyId, setStoryId] = useState<string | null>(null);
  const [startingStats, setStartingStats] = useState(() => rollStartingStats());
  const [recruitSearch, setRecruitSearch] = useState<string | null>(null);
  const [hasSave, setHasSave] = useState(() => Boolean(localStorage.getItem(SAVE_KEY)));
  const currentTile = useMemo(
    () => game.map.find((tile) => tile.x === game.position.x && tile.y === game.position.y),
    [game.map, game.position.x, game.position.y],
  );
  const currentBuilding = currentTile?.entranceFor ? getBuilding(currentTile.entranceFor) : undefined;
  const effective = getEffectiveStats(game);
  const rank = getRank(game.points);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (pending) {
        if (event.code === 'Escape') setPending(null);
        return;
      }

      if (game.screen === 'combat' && game.combat?.selectedId) {
        const selectedId = game.combat.selectedId;
        const delta = keyDelta(event.code);
        if (delta) {
          event.preventDefault();
          setGame((prev) => prev.combat ? { ...prev, combat: combatMove(prev.combat, selectedId, delta[0], delta[1]) } : prev);
        }
        return;
      }

      if (game.screen !== 'game' && game.screen !== 'gang') return;
      const delta = keyDelta(event.code);
      if (delta && game.screen === 'game') {
        event.preventDefault();
        setGame((prev) => movePlayer(prev, delta[0], delta[1]));
      }
      if (event.code === 'KeyB') setGame((prev) => ({ ...prev, screen: prev.screen === 'gang' ? 'game' : 'gang' }));
      if (event.code === 'KeyE') askEndMonth();
      if (event.code === 'KeyQ') saveGame(game);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [game, pending]);

  const startNew = () => {
    localStorage.removeItem(SAVE_KEY);
    setGame(newGame(startingStats));
  };

  const confirm = (nextPending: Pending) => setPending(nextPending);

  const runPending = () => {
    if (!pending) return;
    setGame((prev) => {
      const result = pending.onConfirm(prev);
      if (isActionResult(result)) return result.combat ? { ...result.state, screen: 'combat', combat: result.combat } : result.state;
      return result;
    });
    setPending(null);
  };

  const askAction = (action: ActionConfig) => {
    const blocked = actionAvailability(game, action);
    confirm({
      title: `${action.name}?`,
      lines: [
        ...describeAction(game, action),
        blocked.length ? `Status: ${blocked.join(', ')}` : 'Status: ausführbar',
      ],
      danger: action.failure,
      confirmLabel: blocked.length ? 'Nicht möglich' : 'Bestätigen',
      onConfirm: (state) => blocked.length ? state : resolveAction(state, action.id),
    });
  };

  const askWeapon = (weaponId: WeaponId) => {
    const weapon = getWeapon(weaponId);
    const blocked = checkRequirements(game, weapon.requiredStats);
    const cannotAfford = game.stats.money < weapon.price;
    confirm({
      title: `${weapon.name} kaufen?`,
      lines: [
        `Preis: ${formatMoney(weapon.price)}`,
        `Aktuelles Geld: ${formatMoney(game.stats.money)}`,
        `Danach: ${formatMoney(game.stats.money - weapon.price)}`,
        `Reichweite: ${weapon.range}, Genauigkeit: ${weapon.accuracy}%, Schaden: ${weapon.damage}`,
        `Anforderungen: ${formatRequirements(weapon.requiredStats)}`,
        `Seltenheit: ${weapon.rarity}`,
        weapon.description,
        blocked.length ? `Fehlt: ${blocked.join(', ')}` : cannotAfford ? 'Fehlt: zu wenig Geld' : 'Status: kaufbar',
      ],
      confirmLabel: blocked.length || cannotAfford ? 'Nicht möglich' : 'Kaufen',
      onConfirm: (state) => blocked.length || cannotAfford ? state : buyWeapon(state, weaponId),
    });
  };

  const askSellWeapon = (ownedWeaponId: string) => {
    const owned = game.arsenal.find((item) => item.id === ownedWeaponId);
    if (!owned) return;
    const weapon = getWeapon(owned.weaponId);
    confirm({
      title: `${weapon.name} verkaufen?`,
      lines: [
        `Status: ${assignmentLabel(game, owned)}`,
        `Neupreis: ${formatMoney(weapon.price)}`,
        `Erlös: ${formatMoney(sellValue(owned.weaponId))}`,
        owned.assignedTo ? 'Ausgerüstete Waffen müssen zuerst abgelegt werden.' : 'Waffe liegt frei und kann verkauft werden.',
      ],
      confirmLabel: owned.assignedTo ? 'Nicht möglich' : 'Verkaufen',
      onConfirm: (state) => owned.assignedTo ? state : sellWeapon(state, ownedWeaponId),
    });
  };

  const askCar = (carId: CarId) => {
    const car = getCar(carId);
    const blocked = checkRequirements(game, [{ stat: 'reputation', min: car.reputationRequirement }, ...car.requiredStats]);
    const owned = game.car === carId;
    confirm({
      title: `${car.name} kaufen?`,
      lines: [
        `Preis: ${formatMoney(car.price)}`,
        `Bewegung danach: ${car.movementPoints} Schritte pro Monat`,
        `Anforderung: Straßenruf ${car.reputationRequirement}${car.requiredStats.length ? ', weitere Werte' : ''}`,
        `Polizeirisiko: ${car.policeRiskModifier}`,
        `Effekt: ${car.specialEffect}`,
        car.description,
        owned ? 'Status: bereits aktiv' : blocked.length ? `Fehlt: ${blocked.join(', ')}` : `Danach: ${formatMoney(game.stats.money - car.price)}`,
      ],
      confirmLabel: owned || blocked.length ? 'Nicht möglich' : 'Kaufen',
      onConfirm: (state) => owned || blocked.length ? state : buyCar(state, carId),
    });
  };

  const askRecruit = (templateId: string) => {
    const recruit = recruitTemplates.find((item) => item.templateId === templateId);
    if (!recruit) return;
    const blocked = checkRequirements(game, recruit.requirements);
    const hired = game.gang.some((member) => member.templateId === templateId && member.status !== 'tot');
    confirm({
      title: `${recruit.nickname} aufnehmen?`,
      lines: [
        `${recruit.name} / ${recruit.role}`,
        `Geschlecht: ${recruit.sex}, Startwaffe: ${getWeapon(recruit.weapon).name}`,
        `Handgeld: ${formatMoney(recruit.cost)}, Unterhalt: ${formatMoney(recruit.upkeep)} pro Monat`,
        `Werte: ST ${recruit.strength}, IN ${recruit.intelligence}, BR ${recruit.brutality}, SCH ${recruit.shooting}, FA ${recruit.driving}, LO ${recruit.loyalty}`,
        `Spezial: ${recruit.special}`,
        `Schwäche: ${recruit.weakness}`,
        recruit.story,
        hired ? 'Status: bereits in Deiner Bande' : blocked.length ? `Fehlt: ${blocked.join(', ')}` : 'Status: anwerbbar',
      ],
      confirmLabel: hired || blocked.length ? 'Nicht möglich' : 'Aufnehmen',
      onConfirm: (state) => hired || blocked.length ? state : hireRecruit(state, templateId),
    });
  };

  const searchRecruit = (templateId: string) => {
    const lines = [
      'Du schaust Dich in der Kneipe um...',
      'Der Wirt nickt Dir kaum merklich zu...',
      Math.random() < 0.5 ? 'Da scheint sich eine Dame für Dich zu interessieren...' : 'Ein finsterer Kerl beobachtet Dich aus der Ecke...',
    ];
    setRecruitSearch(lines.join('\n'));
    window.setTimeout(() => {
      setRecruitSearch(null);
      askRecruit(templateId);
    }, 650);
  };

  const askTrainPlayer = (stat: 'strength' | 'intelligence' | 'brutality') => {
    const nextStrength = Math.min(99, game.stats.strength + (stat === 'strength' ? 4 : 1));
    const nextIntelligence = Math.min(99, game.stats.intelligence + (stat === 'intelligence' ? 4 : 1));
    const nextBrutality = Math.min(99, game.stats.brutality + (stat === 'brutality' ? 4 : 1));
    confirm({
      title: `${stat === 'strength' ? 'Stärke' : stat === 'intelligence' ? 'Intelligenz' : 'Brutalität'} trainieren?`,
      lines: [
        'Kosten: $600',
        'Schrittkosten: 2',
        `${statLabel(stat)} +4, andere Grundwerte +1.`,
        `Stärke: ${game.stats.strength} -> ${nextStrength}`,
        `Intelligenz: ${game.stats.intelligence} -> ${nextIntelligence}`,
        `Brutalität: ${game.stats.brutality} -> ${nextBrutality}`,
        'Schaltet bessere Waffen leichter frei.',
      ],
      confirmLabel: 'Trainieren',
      onConfirm: (state) => trainPlayer(state, stat),
    });
  };

  const askEquipPlayer = (ownedWeaponId: string) => {
    const owned = game.arsenal.find((item) => item.id === ownedWeaponId);
    const weapon = ownedWeaponId === 'none' ? getWeapon('none') : getWeapon(owned?.weaponId ?? 'none');
    confirm({
      title: ownedWeaponId === 'none' ? 'Spieler entwaffnen?' : `${weapon.name} selbst ausrüsten?`,
      lines: [
        `Neue Waffe: ${weapon.name}`,
        `Reichweite ${weapon.range}, Genauigkeit ${weapon.accuracy}%, Schaden ${weapon.damage}`,
        owned && owned.assignedTo ? `Status: ${assignmentLabel(game, owned)}` : 'Status: frei',
      ],
      confirmLabel: owned && owned.assignedTo && owned.assignedTo !== 'player' ? 'Nicht möglich' : 'Ausrüsten',
      onConfirm: (state) => owned && owned.assignedTo && owned.assignedTo !== 'player' ? state : equipPlayer(state, ownedWeaponId),
    });
  };

  const askEquip = (memberId: string, ownedWeaponId: string) => {
    const member = game.gang.find((item) => item.id === memberId);
    const owned = game.arsenal.find((item) => item.id === ownedWeaponId);
    const weapon = ownedWeaponId === 'none' ? getWeapon('none') : getWeapon(owned?.weaponId ?? 'none');
    if (!member) return;
    confirm({
      title: `${member.nickname} ausrüsten?`,
      lines: [
        `Neue Waffe: ${weapon.name}`,
        `Reichweite ${weapon.range}, Genauigkeit ${weapon.accuracy}%, Schaden ${weapon.damage}`,
        owned && owned.assignedTo ? `Status: ${assignmentLabel(game, owned)}` : 'Status: frei',
        `Anforderungen: ${formatRequirements(weapon.requiredStats)}`,
        'Verbessert Kämpfe und riskante Überfälle im Hintergrund.',
        'Ändert die Kampfkraft sofort.',
      ],
      confirmLabel: owned && owned.assignedTo && owned.assignedTo !== memberId ? 'Nicht möglich' : 'Ausrüsten',
      onConfirm: (state) => owned && owned.assignedTo && owned.assignedTo !== memberId ? state : equipMember(state, memberId, ownedWeaponId),
    });
  };

  const askTrain = (memberId: string, stat: 'strength' | 'intelligence' | 'brutality' | 'shooting' | 'driving') => {
    const member = game.gang.find((item) => item.id === memberId);
    if (!member) return;
    const label = trainingLabel(stat);
    confirm({
      title: `${member.nickname} trainieren?`,
      lines: ['Kosten: $750', 'Schrittkosten: 2', `Verbessert ${label} um +5.`, trainingExplanation(stat), `Aktuelles Geld: ${formatMoney(game.stats.money)}`],
      confirmLabel: 'Trainieren',
      onConfirm: (state) => trainMember(state, memberId, stat),
    });
  };

  const askFire = (memberId: string) => {
    const member = game.gang.find((item) => item.id === memberId);
    if (!member) return;
    confirm({
      title: `${member.nickname} feuern?`,
      lines: [`${member.name} verlässt die Bande.`, `Du sparst ${formatMoney(member.upkeep)} Unterhalt pro Monat.`],
      danger: 'Das kann später fehlen.',
      confirmLabel: 'Feuern',
      onConfirm: (state) => fireMember(state, memberId),
    });
  };

  const askHealMember = (memberId: string) => {
    const member = game.gang.find((item) => item.id === memberId);
    if (!member) return;
    confirm({
      title: `${member.nickname} behandeln lassen?`,
      lines: ['Kosten: $900', 'Status wird wieder aktiv.', `Aktuelles Geld: ${formatMoney(game.stats.money)}`],
      confirmLabel: 'Behandeln',
      onConfirm: (state) => healMember(state, memberId),
    });
  };

  const askEndMonth = () => confirm({
    title: 'Monat beenden?',
    lines: [
      `Nächster Monat: ${formatGameDate(game.month + 1)}`,
      `Bewegung wird auf ${getCar(game.car).movementPoints} zurückgesetzt.`,
      `Unterhalt: ${formatMoney(game.gang.reduce((sum, member) => sum + (member.status !== 'tot' ? member.upkeep : 0), 0))}`,
      'Am Monatsende werden Unterhalt, laufende Einnahmen, Erholung, Fahndung und Ereignisse berechnet.',
    ],
    confirmLabel: 'Monat beenden',
    onConfirm: processMonth,
  });

  const handleSave = () => {
    saveGame(game);
    setHasSave(true);
    setGame((prev) => ({
      ...prev,
      result: {
        title: 'Spiel gespeichert',
        lines: [
          'Spiel gespeichert.',
          `Zeitpunkt: ${new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })}.`,
        ],
      },
    }));
  };

  const handleProtectionChallenge = (option: 'ignore' | 'negotiate' | 'fight') => {
    setGame((prev) => {
      const result = resolveProtectionChallenge(prev, option);
      return result.combat ? { ...result.state, screen: 'combat', combat: result.combat } : result.state;
    });
  };

  if (game.screen === 'menu') {
    const loaded = loadGame();
    return (
      <main className="shell menuShell">
        <section className="titleBlock">
          <p className="kicker">C64 CRIME MANAGEMENT</p>
          <h1>UNTERWELT 1929</h1>
          <p>Chicago, 1925. Straßen, Blüten, Fluchtwagen und Leute, die teuer werden, wenn sie loyal bleiben.</p>
          <div className="rollBox">
            <h2>Startwerte</h2>
            <p>Intelligenz {startingStats.intelligence} / Stärke {startingStats.strength} / Brutalität {startingStats.brutality}</p>
            <button onClick={() => setStartingStats(rollStartingStats())}>Neu würfeln</button>
          </div>
        </section>
        <div className="menuButtons">
          <button onClick={startNew}>Neues Spiel</button>
          <button disabled={!loaded} onClick={() => loaded && setGame(loaded)}>Spiel laden</button>
        </div>
      </main>
    );
  }

  if (game.screen === 'won' || game.screen === 'lost') {
    return (
      <main className="shell menuShell">
        <section className="titleBlock">
          <p className="kicker">{game.screen === 'won' ? 'SIEG' : 'ENDE'}</p>
          <h1>{game.screen === 'won' ? 'BOSS DER UNTERWELT' : 'DIE STADT HAT GEWONNEN'}</h1>
          <p>{game.gameOverReason ?? (game.screen === 'won' ? 'Geld, Straßenruf und Bande reichen. Die Stadt gehört Dir.' : 'Ein klarer Grund fehlt. Das sollte nicht passieren.')}</p>
        </section>
        <button onClick={startNew}>Neu beginnen</button>
      </main>
    );
  }

  if (game.screen === 'combat' && game.combat) {
    const selected = game.combat.allies.find((ally) => ally.id === game.combat?.selectedId);
    return (
      <main className="shell">
        <header className="topbar">
          <strong>{game.combat.title}</strong>
          <button onClick={() => setGame((prev) => prev.combat ? finishCombat(prev, prev.combat) : prev)}>Kampf beenden</button>
        </header>
        <section className="combatLayout">
          <div className="combatGrid" style={{ gridTemplateColumns: `repeat(${COMBAT_WIDTH}, minmax(0, 1fr))` }}>
            {Array.from({ length: COMBAT_WIDTH * COMBAT_HEIGHT }, (_, index) => {
              const x = index % COMBAT_WIDTH;
              const y = Math.floor(index / COMBAT_WIDTH);
              const ally = game.combat?.allies.find((unit) => unit.x === x && unit.y === y);
              const enemy = game.combat?.enemies.find((unit) => unit.x === x && unit.y === y);
              const terrain = game.combat?.terrain.find((item) => item.x === x && item.y === y);
              const fx = combatFxClass(game.combat, x, y);
              return (
                <button key={`${x}-${y}`} className={`combatCell terrain-${terrain?.type ?? 'floor'} ${terrain?.blocks ? 'obstacle' : ''} ${ally ? 'ally' : ''} ${enemy ? 'enemy' : ''} ${fx}`} onClick={() => ally && setGame((prev) => prev.combat ? { ...prev, combat: { ...prev.combat, selectedId: ally.id } } : prev)}>
                  {fx === 'fxMuzzle' ? '✹' : fx === 'fxHit' ? '××' : fx === 'fxTrail' ? '--' : ally ? ally.nickname.slice(0, 2).toUpperCase() : enemy ? '!!' : terrain ? terrain.icon : '..'}
                </button>
              );
            })}
          </div>
          <aside className="panel">
            <h2>Kommando</h2>
            <p>{game.combat.message}</p>
            {selected && (
              <p className="combatWeapon">
                {getWeapon(selected.weapon).name}: Reichweite {getWeapon(selected.weapon).range}, Genauigkeit {getWeapon(selected.weapon).accuracy}%, Schaden {getWeapon(selected.weapon).damage}
              </p>
            )}
            <div className="unitList">
              {game.combat.allies.map((ally) => (
                <button key={ally.id} className={ally.id === game.combat?.selectedId ? 'selectedRow' : ''} onClick={() => setGame((prev) => prev.combat ? { ...prev, combat: { ...prev.combat, selectedId: ally.id } } : prev)}>
                  {ally.nickname} / HP {Math.ceil(ally.health)} / {getWeapon(ally.weapon).name}
                </button>
              ))}
            </div>
            <h3>Ziele</h3>
            <div className="unitList">
              {game.combat.enemies.map((enemy) => (
                <button key={enemy.id} disabled={!selected || game.combat?.phase !== 'player'} onClick={() => selected && setGame((prev) => prev.combat ? { ...prev, combat: combatAttack(prev.combat, selected.id, enemy.id) } : prev)}>
                  {enemyTargetLabel(selected, enemy)}
                </button>
              ))}
            </div>
            {game.combat.phase === 'enemy' && <button onClick={() => setGame((prev) => prev.combat ? { ...prev, combat: combatEnemyTurn(prev.combat) } : prev)}>Gegnerzug</button>}
            {game.combat.phase === 'finished' && <button onClick={() => setGame((prev) => prev.combat ? finishCombat(prev, prev.combat) : prev)}>Ausgang abrechnen</button>}
          </aside>
        </section>
      </main>
    );
  }

  const buildingActions = currentBuilding ? actions.filter((action) => currentBuilding.actions.includes(action.id)) : [];

  return (
    <main className="shell">
      <header className="topbar">
        <div>
          <strong>Unterwelt 1929</strong>
          <span> {formatGameDate(game.month)} / {rank.name} / Rangpunkte {game.points} / Bewegung {game.stepsLeft}/{getCar(game.car).movementPoints}</span>
        </div>
        <div className="topActions">
          <button onClick={() => setGame((prev) => ({ ...prev, screen: prev.screen === 'gang' ? 'game' : 'gang' }))}>{game.screen === 'gang' ? 'Karte' : 'Bande'}</button>
          <button onClick={handleSave}>Speichern</button>
          <button disabled={!hasSave} onClick={() => setGame(loadGame() ?? game)}>Laden</button>
          <button onClick={askEndMonth}>Monat beenden</button>
        </div>
      </header>

      {game.screen === 'gang' ? (
        <GangScreen
          game={game}
          storyId={storyId}
          setStoryId={setStoryId}
          askEquipPlayer={askEquipPlayer}
          askEquip={askEquip}
          askTrain={askTrain}
          askFire={askFire}
          askHealMember={askHealMember}
        />
      ) : (
        <>
          <section className="dashboard">
            <div className="mapPanel">
              <div className="cityGrid" style={{ gridTemplateColumns: `repeat(${MAP_WIDTH}, 1fr)` }}>
                {game.map.map((tile) => {
                  const building = tile.entranceFor ? getBuilding(tile.entranceFor) : tile.buildingVisualFor ? getBuilding(tile.buildingVisualFor) : undefined;
                  const playerHere = tile.x === game.position.x && tile.y === game.position.y;
                  const visual = tileVisuals[tile.kind];
                  const adjacentReachable = Math.abs(tile.x - game.position.x) + Math.abs(tile.y - game.position.y) === 1 && (tile.kind === 'road' || tile.kind === 'entrance');
                  return (
                    <button
                      key={tile.id}
                      className={`tile district-${districtClass(tile.district)} kind-${tile.kind} ${tile.building ? 'buildingFootprintTile' : ''} ${tile.buildingVisualFor ? 'buildingBlockTile' : ''} ${tile.entranceFor ? 'entranceTile' : ''} ${adjacentReachable ? 'reachableTile' : ''} ${playerHere ? 'playerTile' : ''}`}
                      onClick={() => {
                        const distance = Math.abs(tile.x - game.position.x) + Math.abs(tile.y - game.position.y);
                        if (distance === 1) setGame(movePlayer(game, tile.x - game.position.x, tile.y - game.position.y));
                      }}
                      title={`${building?.name ?? visual.name} / ${tile.district}`}
                    >
                      <span>{playerHere ? '@' : tile.entranceFor ? '▮' : tile.buildingVisualFor ? getBuilding(tile.buildingVisualFor).mapLabel : tile.building ? '▓' : tile.kind === 'road' ? '' : visual.icon}</span>
                      <small>{tile.entranceFor ? 'TÜR' : ''}</small>
                    </button>
                  );
                })}
              </div>
              <MapLegend />
              <div className="bottomStatus">
                <span>Spieler: Anfänger</span>
                <span>Monat: {formatGameDate(game.month)}</span>
                <span>Rang: {rank.name}</span>
                <span>Geld: {formatMoney(game.stats.money)}</span>
                <span>Schritte: {game.stepsLeft}</span>
                <span>Fahndung: {game.stats.wanted}</span>
                <span>Auto: {getCar(game.car).name}</span>
                <span>Waffe: {getPlayerWeapon(game).name}</span>
              </div>
              <div className="hint">Tasten: WASD/Pfeile bewegen, B Bande, E Monat beenden, Q speichern.</div>
            </div>

            <aside className="panel actionPanel">
              <p className="kicker">{currentTile?.district ?? 'Stadt'}</p>
              <h2>{locationTitle(currentTile, game.map)}</h2>
              <p>{currentBuilding?.description ?? 'Gassen, Mauern, Laternen. Nicht jeder Ort ist ein Geschäft, aber jeder Ort erzählt etwas.'}</p>
              <ActionList actions={buildingActions} game={game} askAction={askAction} />
              {currentBuilding?.id === 'weapons' && <WeaponShop game={game} askWeapon={askWeapon} askSellWeapon={askSellWeapon} askTrainPlayer={askTrainPlayer} />}
              {currentBuilding?.id === 'cars' && <CarShop game={game} askCar={askCar} />}
              {currentBuilding?.id === 'kneipe' && <RecruitList game={game} askRecruit={searchRecruit} premium={game.hotelRoom} />}
              {currentBuilding?.id === 'hotel' && <RecruitList game={game} askRecruit={askRecruit} premium />}
            </aside>

            <aside className="panel statsPanel">
              <h2>Status</h2>
              <p className="statHelp">Rangpunkte bestimmen Deinen Rang. Straßenruf beeinflusst Respekt, Preise und Erfolgschancen.</p>
              <dl>
                <dt>Geld</dt><dd>{formatMoney(game.stats.money)}</dd>
                <dt>Monat</dt><dd>{formatGameDate(game.month)}</dd>
                <dt>Rang</dt><dd>{rank.name}</dd>
                <dt>Rangpunkte</dt><dd title="Rangpunkte bestimmen Deinen langfristigen Rang.">{game.points}{rank.next ? ` / ${rank.next.points}` : ''}</dd>
                <dt>Monatsruhm</dt><dd>{game.monthlyPointGain}/{MONTHLY_POINT_CAP}</dd>
                <dt>Blütenrisiko</dt><dd>{game.stats.counterfeit}/10</dd>
                <dt>Gesundheit</dt><dd>{game.stats.health}</dd>
                <dt>Stärke</dt><dd>{game.stats.strength}</dd>
                <dt>Intelligenz</dt><dd>{game.stats.intelligence}</dd>
                <dt>Straßenruf</dt><dd title="Straßenruf beeinflusst Respekt, Preise und Erfolgschancen.">{game.stats.reputation} ({effective.reputation} effektiv)</dd>
                <dt>Brutalität</dt><dd>{game.stats.brutality} ({effective.brutality} effektiv)</dd>
                <dt>Kampfwert</dt><dd title="Stärke + Brutalität + Waffen + Bande">{Math.round(effective.combat)}</dd>
                <dt>Einschüchterung</dt><dd title="Brutalität + Straßenruf + passende Bande/Waffe">{Math.round(effective.intimidation)}</dd>
                <dt>Fahndung</dt><dd>{game.stats.wanted}</dd>
                <dt>Gefahr</dt><dd>{game.stats.danger}</dd>
                <dt>Pass</dt><dd>{game.stats.passport ? 'Ja' : 'Nein'}</dd>
                <dt>Hotelzimmer</dt><dd>{game.hotelRoom ? 'Ja' : 'Nein'}</dd>
                <dt>Bande</dt><dd>{game.gangFounded ? 'Gegründet' : 'Nein'}</dd>
              </dl>
            </aside>
          </section>

          <section className="lowerGrid">
            <MiniGang game={game} />
            <LogPanel game={game} />
          </section>
        </>
      )}

      {game.policeCheck && (
        <div className="modalBackdrop" role="presentation">
          <section className="modal" role="dialog" aria-modal="true" aria-labelledby="police-title">
            <h2 id="police-title">Polizeikontrolle</h2>
            <div className="modalLines">
              <p>{game.policeCheck.reason}</p>
              <p>Risiko: {Math.round(game.policeCheck.risk * 100)}%</p>
              <p>Fahndung: {game.stats.wanted}, Blütenrisiko: {game.stats.counterfeit}/10, Pass: {game.stats.passport ? 'Ja' : 'Nein'}</p>
            </div>
            <div className="modalButtons">
              <button onClick={() => setGame((prev) => resolvePoliceCheck(prev, 'calm'))}>Ruhig bleiben</button>
              <button onClick={() => setGame((prev) => resolvePoliceCheck(prev, 'bribe'))}>Bestechen</button>
              <button onClick={() => setGame((prev) => resolvePoliceCheck(prev, 'flee'))}>Fliehen</button>
              <button disabled={!game.stats.passport} onClick={() => setGame((prev) => resolvePoliceCheck(prev, 'passport'))}>Falschen Pass zeigen</button>
            </div>
          </section>
        </div>
      )}

      {recruitSearch && (
        <div className="modalBackdrop" role="presentation">
          <section className="modal" role="dialog" aria-modal="true">
            <h2>Kneipe</h2>
            <div className="modalLines">
              {recruitSearch.split('\n').map((line) => <p key={line}>{line}</p>)}
            </div>
          </section>
        </div>
      )}

      {game.protectionChallenge && !game.policeCheck && (
        <div className="modalBackdrop" role="presentation">
          <section className="modal" role="dialog" aria-modal="true" aria-labelledby="protection-title">
            <h2 id="protection-title">Rivalen am Laden</h2>
            <div className="modalLines">
              <p>{game.protectionChallenge.label} steht unter Druck.</p>
              <p>Eine fremde Bande will Dein Schutzgeld übernehmen.</p>
            </div>
            <div className="modalButtons">
              <button onClick={() => handleProtectionChallenge('ignore')}>Ignorieren</button>
              <button onClick={() => handleProtectionChallenge('negotiate')}>Verhandeln</button>
              <button onClick={() => handleProtectionChallenge('fight')}>Kämpfen</button>
            </div>
          </section>
        </div>
      )}

      {game.result && !game.policeCheck && !game.protectionChallenge && (
        <div className="modalBackdrop" role="presentation">
          <section className={`modal ${game.result.title.startsWith('Steckbrief') ? 'wantedPoster' : ''}`} role="dialog" aria-modal="true" aria-labelledby="result-title">
            <h2 id="result-title">{game.result.title}</h2>
            <div className="modalLines">
              {game.result.lines.map((line) => <p key={line}>{line}</p>)}
            </div>
            <div className="modalButtons">
              <button onClick={() => setGame((prev) => clearResult(prev))}>Weiter</button>
            </div>
          </section>
        </div>
      )}

      {pending && !game.result && !game.policeCheck && (
        <div className="modalBackdrop" role="presentation">
          <section className="modal" role="dialog" aria-modal="true" aria-labelledby="confirm-title">
            <h2 id="confirm-title">{pending.title}</h2>
            <div className="modalLines">
              {pending.lines.map((line) => <p key={line}>{line}</p>)}
            </div>
            {pending.danger && <p className="dangerText">{pending.danger}</p>}
            <div className="modalButtons">
              <button onClick={() => setPending(null)}>Abbrechen</button>
              <button disabled={pending.confirmLabel === 'Nicht möglich'} onClick={runPending}>{pending.confirmLabel ?? 'Bestätigen'}</button>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}

function keyDelta(code: string): [number, number] | undefined {
  return {
    ArrowUp: [0, -1],
    KeyW: [0, -1],
    ArrowDown: [0, 1],
    KeyS: [0, 1],
    ArrowLeft: [-1, 0],
    KeyA: [-1, 0],
    ArrowRight: [1, 0],
    KeyD: [1, 0],
  }[code] as [number, number] | undefined;
}

function districtClass(district: string): string {
  return district.toLowerCase().replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss');
}

function formatRequirements(requirements: Requirement[]): string {
  if (!requirements.length) return 'keine';
  return requirements.map((requirement) => {
    if (requirement.rank) return `Rang ${requirement.rank}`;
    if (requirement.stat && requirement.min != null) return `${statLabel(requirement.stat)} ${requirement.min}`;
    if (requirement.stat && requirement.max != null) return `${statLabel(requirement.stat)} höchstens ${requirement.max}`;
    if (requirement.activeGang != null) return `${requirement.activeGang} aktive Gangmitglieder`;
    if (requirement.hotelRoom) return 'Hotelzimmer';
    if (requirement.gangFounded) return 'Bande gegründet';
    if (requirement.role) return requirement.role;
    return 'Sonderbedingung';
  }).join(', ');
}

function trainingExplanation(stat: 'strength' | 'intelligence' | 'brutality' | 'shooting' | 'driving'): string {
  if (stat === 'shooting') return 'Schießen: verbessert Trefferchance im Kampf.';
  if (stat === 'driving') return 'Fahren: verbessert Flucht, Fahrzeugjobs und Bank/Zug/Hafen-Abgänge.';
  if (stat === 'intelligence') return 'Planung: verbessert komplexe Coups wie Bank, Tresor, Villa und Zug.';
  if (stat === 'strength') return 'Stärke: erhöht Nahkampfschaden und hilft beim Handling schwerer Waffen.';
  return 'Brutalität: verbessert Einschüchterung und gewalttätige Jobs.';
}

function trainingLabel(stat: 'strength' | 'intelligence' | 'brutality' | 'shooting' | 'driving'): string {
  if (stat === 'shooting') return 'Schießen';
  if (stat === 'driving') return 'Fahren';
  if (stat === 'intelligence') return 'Planung';
  return statLabel(stat);
}

function isActionResult(value: GameState | ActionResult): value is ActionResult {
  return 'state' in value;
}

function enemyTargetLabel(selected: NonNullable<GameState['combat']>['allies'][number] | undefined, enemy: NonNullable<GameState['combat']>['enemies'][number]): string {
  if (!selected) return `${enemy.name} HP ${Math.ceil(enemy.health)}`;
  const weapon = getWeapon(selected.weapon);
  const distance = Math.abs((selected.x ?? 0) - enemy.x) + Math.abs((selected.y ?? 0) - enemy.y);
  return `${enemy.name} HP ${Math.ceil(enemy.health)} / Entfernung ${distance} / ${distance <= weapon.range ? 'in Reichweite' : 'zu weit'}`;
}

function combatFxClass(combat: GameState['combat'], x: number, y: number): string {
  if (!combat?.fx) return '';
  const attacker = combat.allies.find((unit) => unit.id === combat.fx?.attackerId) ?? combat.enemies.find((unit) => unit.id === combat.fx?.attackerId);
  const target = combat.allies.find((unit) => unit.id === combat.fx?.targetId) ?? combat.enemies.find((unit) => unit.id === combat.fx?.targetId);
  if (!attacker || !target) return '';
  const attackerX = attacker.x ?? 0;
  const attackerY = attacker.y ?? 0;
  const targetX = target.x ?? 0;
  const targetY = target.y ?? 0;
  if (attackerX === x && attackerY === y) return 'fxMuzzle';
  if (targetX === x && targetY === y) return combat.fx.hit ? 'fxHit' : 'fxMiss';
  const sameRow = attackerY === targetY && y === attackerY && x > Math.min(attackerX, targetX) && x < Math.max(attackerX, targetX);
  const sameColumn = attackerX === targetX && x === attackerX && y > Math.min(attackerY, targetY) && y < Math.max(attackerY, targetY);
  return sameRow || sameColumn ? 'fxTrail' : '';
}

function locationTitle(tile: GameState['map'][number] | undefined, map: GameState['map']): string {
  if (!tile) return 'Straße';
  if (tile.entranceFor) return `Vor ${getBuilding(tile.entranceFor).name}`;
  const adjacentEntrance = map.find((other) => (
    other.entranceFor &&
    Math.abs(other.x - tile.x) + Math.abs(other.y - tile.y) === 1
  ));
  if (adjacentEntrance?.entranceFor) return `Vor ${getBuilding(adjacentEntrance.entranceFor).name}`;
  return tile.kind === 'road'
    ? `Straße im ${tile.district}`
    : `${tileVisuals[tile.kind].name} im ${tile.district}`;
}

function MapLegend() {
  const groups: Array<BuildingConfig['category']> = ['Unterkunft', 'Geschäfte', 'Risiko', 'Stadt'];
  return (
    <div className="legend">
      {groups.map((group) => (
        <div className="legendGroup" key={group}>
          <strong>{group}</strong>
          {buildings.filter((building) => building.category === group).map((building) => (
            <span key={building.id}><b>{building.mapLabel}</b> {building.name}</span>
          ))}
        </div>
      ))}
    </div>
  );
}

function ActionList({ actions: list, game, askAction }: { actions: ActionConfig[]; game: GameState; askAction: (action: ActionConfig) => void }) {
  if (!list.length) return null;
  return (
    <div className="cardGrid">
      {list.map((action) => {
        const blocked = actionAvailability(game, action);
        const cost = actionCost(game, action);
        return (
          <article className="choiceCard" key={action.id}>
            <h3>{action.name}</h3>
            <p>{action.effect}</p>
            <ul>
              <li>{cost ? `Kosten ${formatMoney(cost)}` : 'Keine Kosten'}, Schritte {action.stepCost ?? 1}</li>
              <li>{action.reward ? `Beute ${formatMoney(action.reward[0])}-${formatMoney(action.reward[1])}` : `Effekt: ${action.effect}`}</li>
              <li>Risiko {action.risk}, Polizei {action.policeRisk >= 0 ? '+' : ''}{action.policeRisk}</li>
              <li>Rang {action.rank ?? 'Anfänger'}, Rangpunkte +{Math.min(action.pointEffect ?? 0, Math.max(0, MONTHLY_POINT_CAP - game.monthlyPointGain))}</li>
              <li>{blocked.length ? blocked[0] : 'Anforderungen erfüllt'}</li>
            </ul>
            <button disabled={blocked.length > 0} onClick={() => askAction(action)}>{blocked.length ? blocked[0] : 'Auswählen'}</button>
          </article>
        );
      })}
    </div>
  );
}

function WeaponShop({
  game,
  askWeapon,
  askSellWeapon,
  askTrainPlayer,
}: {
  game: GameState;
  askWeapon: (weaponId: WeaponId) => void;
  askSellWeapon: (ownedWeaponId: string) => void;
  askTrainPlayer: (stat: 'strength' | 'intelligence' | 'brutality') => void;
}) {
  return (
    <>
      <h3>Training</h3>
      <p className="inlineHelp">Stärke hilft bei Nahkampf und schweren Waffen. Brutalität hilft bei Einschüchterung. Intelligenz hilft bei Planung, Dokumenten und komplexen Coups.</p>
      <div className="trainingRow">
        <button disabled={game.stepsLeft < 2} onClick={() => askTrainPlayer('strength')}>Stärke trainieren</button>
        <button disabled={game.stepsLeft < 2} onClick={() => askTrainPlayer('brutality')}>Brutalität trainieren</button>
        <button disabled={game.stepsLeft < 2} onClick={() => askTrainPlayer('intelligence')}>Intelligenz trainieren</button>
      </div>
      <h3>Kaufen</h3>
      <div className="cardGrid">
        {weapons.filter((weapon) => weapon.id !== 'none').map((weapon) => {
          const blocked = checkRequirements(game, weapon.requiredStats);
          const ownedCount = game.arsenal.filter((owned) => owned.weaponId === weapon.id).length;
          return (
            <article className="choiceCard" key={weapon.id}>
              <h3>{weapon.name}</h3>
              <p>{weapon.description}</p>
              <ul>
                <li>Preis {formatMoney(weapon.price)}</li>
                <li>Reichweite {weapon.range}, Genauigkeit {weapon.accuracy}%, Schaden {weapon.damage}</li>
                <li>Anforderung: {formatRequirements(weapon.requiredStats)}</li>
                <li>Seltenheit: {weapon.rarity}</li>
                <li>Besitz: {ownedCount}</li>
                <li>{blocked.length ? blocked[0] : 'Kaufbar'}</li>
              </ul>
              <button disabled={blocked.length > 0} onClick={() => askWeapon(weapon.id)}>{blocked.length ? blocked[0] : 'Kaufen'}</button>
            </article>
          );
        })}
      </div>
      <h3>Waffenschrank</h3>
      <div className="inventoryList">
        {game.arsenal.length === 0 && <p>Keine gekauften Waffen. Hände zählen nicht als Inventar.</p>}
        {game.arsenal.map((owned) => {
          const weapon = getWeapon(owned.weaponId);
          return (
            <article className="inventoryRow" key={owned.id}>
              <span>{weapon.name}</span>
              <span>{assignmentLabel(game, owned)}</span>
              <span>Verkauf {formatMoney(sellValue(owned.weaponId))}</span>
              <button disabled={Boolean(owned.assignedTo)} onClick={() => askSellWeapon(owned.id)}>{owned.assignedTo ? 'Ausgerüstet' : 'Verkaufen'}</button>
            </article>
          );
        })}
      </div>
    </>
  );
}

function CarShop({ game, askCar }: { game: GameState; askCar: (carId: CarId) => void }) {
  return (
    <>
      <h3>Fuhrpark</h3>
      <div className="cardGrid">
        {cars.filter((car) => car.id !== 'foot').map((car) => {
          const blocked = checkRequirements(game, [{ stat: 'reputation', min: car.reputationRequirement }, ...car.requiredStats]);
          const owned = game.car === car.id;
          return (
            <article className="choiceCard" key={car.id}>
              <h3>{car.name}</h3>
              <p>{car.description}</p>
              <ul>
                <li>Preis {formatMoney(car.price)}</li>
                <li>{car.movementPoints} Schritte pro Monat</li>
                <li>{car.specialEffect}</li>
                <li>{owned ? 'Aktiv' : blocked.length ? blocked[0] : 'Kaufbar'}</li>
              </ul>
              <button disabled={owned || blocked.length > 0} onClick={() => askCar(car.id)}>{owned ? 'Aktiv' : blocked.length ? blocked[0] : 'Kaufen'}</button>
            </article>
          );
        })}
      </div>
    </>
  );
}

function RecruitList({ game, askRecruit, premium }: { game: GameState; askRecruit: (templateId: string) => void; premium: boolean }) {
  const options = recruitTemplates.filter((recruit) => premium || recruit.cost <= 3500);
  return (
    <>
      <h3>{premium ? 'Diskrete Hotelkontakte' : 'Leute am Tresen'}</h3>
      <div className="cardGrid">
        {options.map((recruit) => {
          const blocked = checkRequirements(game, recruit.requirements);
          const hired = game.gang.some((member) => member.templateId === recruit.templateId && member.status !== 'tot');
          return (
            <article className="choiceCard recruitCard" key={recruit.templateId}>
              <h3>{recruit.name} <span>"{recruit.nickname}"</span></h3>
              <p>{recruit.role}: {recruit.special}</p>
              <ul>
                <li>{recruit.sex}, Startwaffe {getWeapon(recruit.weapon).name}</li>
                <li>Handgeld {formatMoney(recruit.cost)}, Unterhalt {formatMoney(recruit.upkeep)}</li>
                <li>ST {recruit.strength} IN {recruit.intelligence} BR {recruit.brutality} SCH {recruit.shooting} FA {recruit.driving} LO {recruit.loyalty}</li>
                <li>{hired ? 'Bereits dabei' : blocked.length ? blocked[0] : 'Anwerbbar'}</li>
              </ul>
              <button disabled={hired || blocked.length > 0} onClick={() => askRecruit(recruit.templateId)}>{hired ? 'In Bande' : blocked.length ? blocked[0] : 'Ansprechen'}</button>
            </article>
          );
        })}
      </div>
    </>
  );
}

function MiniGang({ game }: { game: GameState }) {
  return (
    <div className="panel gangPanel">
      <h2>Bande ({activeGang(game.gang).length} aktiv)</h2>
      <div className="gangRows">
        {game.gang.length === 0 && <p>Noch niemand folgt Dir. Kneipen und Hotels ändern das.</p>}
        {game.gang.slice(0, 4).map((member) => (
          <article key={member.id} className="memberRow">
            <div className="portrait">{member.nickname.slice(0, 2).toUpperCase()}</div>
            <div>
              <strong>{member.name} "{member.nickname}"</strong>
              <span>{member.role} / {member.status} / {getWeapon(member.weapon).name}</span>
              <span>Unterhalt {formatMoney(member.upkeep)} / Loyalität {member.loyalty}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function LogPanel({ game }: { game: GameState }) {
  return (
    <div className="panel logPanel">
      <h2>Chronik</h2>
      {game.log.map((entry, index) => <p key={`${entry.month}-${index}`}><span>M{entry.month}</span> {entry.text}</p>)}
    </div>
  );
}

function GangScreen({
  game,
  storyId,
  setStoryId,
  askEquipPlayer,
  askEquip,
  askTrain,
  askFire,
  askHealMember,
}: {
  game: GameState;
  storyId: string | null;
  setStoryId: (id: string | null) => void;
  askEquipPlayer: (ownedWeaponId: string) => void;
  askEquip: (memberId: string, ownedWeaponId: string) => void;
  askTrain: (memberId: string, stat: 'strength' | 'intelligence' | 'brutality' | 'shooting' | 'driving') => void;
  askFire: (memberId: string) => void;
  askHealMember: (memberId: string) => void;
}) {
  const playerWeaponId = getAssignedWeaponId(game, 'player');
  return (
    <section className="gangScreen">
      <div className="panel gangManagement">
        <h2>Bandenverwaltung</h2>
        <article className="gangCard playerCard">
          <div className="portrait large">DU</div>
          <div className="gangDetails">
            <h3>Unbekannter aus Chicago <span>"Du"</span></h3>
            <p>Spieler / Status: aktiv / Waffe: {getPlayerWeapon(game).name}</p>
            <div className="statStrip">
              <span>ST {game.stats.strength}</span>
              <span>IN {game.stats.intelligence}</span>
              <span>BR {game.stats.brutality}</span>
              <span>GES {game.stats.health}</span>
            </div>
            <div className="gangActions">
              <select value={playerWeaponId} onChange={(event) => askEquipPlayer(event.target.value)}>
                <option value="none">Hände</option>
                {game.arsenal
                  .filter((owned) => !owned.assignedTo || owned.assignedTo === 'player')
                  .map((owned) => <option value={owned.id} key={owned.id}>{getWeapon(owned.weaponId).name} ({assignmentLabel(game, owned)})</option>)}
              </select>
            </div>
          </div>
        </article>
        <p className="inlineHelp">Schießen erhöht Trefferchancen. Fahren hilft Flucht, Fahrzeugjobs und Bank/Zug/Hafen. Planung hilft Bank, Tresor, Villa und Zug. Loyalität entscheidet, wer schlechte Monate übersteht.</p>
        {game.gang.length === 0 && <p>Keine Bande. Rekrutiere in Kneipe oder Hotel.</p>}
        {game.gang.map((member) => (
          <article key={member.id} className="gangCard">
            <div className="portrait large">{member.nickname.slice(0, 2).toUpperCase()}</div>
            <div className="gangDetails">
              <h3>{member.name} <span>"{member.nickname}"</span></h3>
              <p>{member.role} / Status: {member.status} / Gesundheit {Math.round(member.health)} / Unterhalt {formatMoney(member.upkeep)}</p>
              <div className="statStrip">
                {statShort.map(([key, label]) => <span key={key}>{label} {memberStat(member, key)}</span>)}
              </div>
              <p><b>Spezial:</b> {member.special}</p>
              <p><b>Schwäche:</b> {member.weakness}</p>
              {storyId === member.id && <p className="storyText">{member.story}</p>}
              <div className="gangActions">
                <select value={getAssignedWeaponId(game, member.id)} onChange={(event) => askEquip(member.id, event.target.value)}>
                  <option value="none">Hände</option>
                  {game.arsenal
                    .filter((owned) => !owned.assignedTo || owned.assignedTo === member.id)
                    .map((owned) => <option value={owned.id} key={owned.id}>{getWeapon(owned.weaponId).name} ({assignmentLabel(game, owned)})</option>)}
                </select>
                <button title={trainingExplanation('shooting')} onClick={() => askTrain(member.id, 'shooting')}>Schießen trainieren</button>
                <button title={trainingExplanation('driving')} onClick={() => askTrain(member.id, 'driving')}>Fahren trainieren</button>
                <button title={trainingExplanation('intelligence')} onClick={() => askTrain(member.id, 'intelligence')}>Planung trainieren</button>
                <button title={trainingExplanation('strength')} onClick={() => askTrain(member.id, 'strength')}>Stärke trainieren</button>
                <button title={trainingExplanation('brutality')} onClick={() => askTrain(member.id, 'brutality')}>Brutalität trainieren</button>
                <button disabled={member.status !== 'verletzt'} onClick={() => askHealMember(member.id)}>Heilen</button>
                <button onClick={() => setStoryId(storyId === member.id ? null : member.id)}>Geschichte</button>
                <button onClick={() => askFire(member.id)}>Feuern</button>
              </div>
            </div>
          </article>
        ))}
      </div>
      <LogPanel game={game} />
    </section>
  );
}

function memberStat(member: GameState['gang'][number], key: string): number {
  if (key === 'strength') return member.strength;
  if (key === 'intelligence') return member.intelligence;
  if (key === 'brutality') return member.brutality;
  if (key === 'shooting') return member.shooting;
  if (key === 'driving') return member.driving;
  return member.loyalty;
}

export default App;
