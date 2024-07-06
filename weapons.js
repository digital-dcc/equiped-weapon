export const weapons = new Map([
  [
    'Battleaxe',
    {
      damage: '1d10',
			twoHanded: true,
      cost: 7,
    },
  ],
  [
    'Blackjack',
    {
      damage: '1d3',
			sneakDamage: '2d6',
      cost: 3,
			subdualDamage: true,
    },
  ],
  [
    'Club',
    {
      damage: '1d4',
      cost: 3,
    },
  ],
  [
    'Dagger',
    {
      damage: '1d4',
      sneakDamage: '1d10',
      cost: 3,
    },
  ],
  [
    'Flail',
    {
      damage: '1d6',
      cost: 6,
    },
  ],
  [
    'Garrote',
    {
      damage: '1',
      sneakDamage: '3d4',
      cost: 2,
    },
  ],
  [
    'Handaxe',
    {
      damage: '1d6',
      cost: 4,
    },
  ],
  [
    'Javelin',
    {
      damage: '1d6',
      cost: 1,
    },
  ],
  [
    'Lance',
    {
      damage: '1d12',
      cost: 25,
			onlyUsableWhileMounted: true,
			doubleDamageMountedCharging: true,
    },
  ],
  [
    'Longsword',
    {
      damage: '1d8',
      cost: 10,
    },
  ],
  [
    'Mace',
    {
      damage: '1d6',
      cost: 5,
    },
  ],
  [
    'Polearm',
    {
      damage: '1d10',
      cost: 7,
			twoHanded: true,
    },
  ],
  [
    'Short sword',
    {
      damage: '1d6',
      cost: 7,
    },
  ],
  [
    'Spear',
    {
      damage: '1d8',
      cost: 3,
			doubleDamageMountedCharging: true,
    },
  ],
  [
    'Staff',
    {
      damage: '1d4',
      cost: 0.5,
    },
  ],
  [
    'Two-handed sword',
    {
      damage: '1d10',
      cost: 15,
			twoHanded: true,
    },
  ],
  [
    'Warhammer',
    {
      damage: '1d8',
      cost: 5,
    },
  ],
	[
    'Blowgun',
    {
      range: {short: 20, medium: 40, long: 60},
      damage: '1d3',
      sneakDamage: '1d5',
      cost: 6,
    },
  ],
  [
    'Crossbow',
    {
      range: {short: 80, medium: 160, long: 240},
      damage: '1d6',
      twoHanded: true,
      cost: 30,
    },
  ],
  [
    'Dagger',
    {
      range: {short: 10, medium: 20, long: 30},
      damage: '1d4',
      sneakDamage: '1d10',
      thrown: true,
      cost: 3,
      addStrengthToDamageAtShortRange: true,
    },
  ],
  [
    'Dart',
    {
      range: {short: 20, medium: 40, long: 60},
      damage: '1d3',
      thrown: true,
      cost: 0.5,
      addStrengthToDamageAtShortRange: true,
    },
  ],
  [
    'Handaxe',
    {
      range: {short: 10, medium: 20, long: 30},
      damage: '1d3',
      thrown: true,
      cost: 4,
      addStrengthToDamageAtShortRange: true,
    },
  ],
  [
    'Javelin',
    {
      range: {short: 30, medium: 60, long: 90},
      damage: '1d3',
      thrown: true,
      cost: 1,
      addStrengthToDamageAtShortRange: true,
    },
  ],
  [
    'Longbow',
    {
      range: {short: 70, medium: 140, long: 210},
      damage: '1d6',
      twoHanded: true,
      cost: 40,
    },
  ],
  [
    'Shortbow',
    {
      range: {short: 50, medium: 100, long: 150},
      damage: '1d6',
      twoHanded: true,
      cost: 25,
    },
  ],
  [
    'Sling',
    {
      range: {short: 40, medium: 80, long: 160},
      damage: '1d3',
      cost: 2,
      addStrengthToDamageAtShortRange: true,
    },
  ],
]);

export const weaponStatsFor = (weaponType) => {
	const weapon = weapons.get(weaponType);
	if (weapon) {
		return weapon;
	}
}