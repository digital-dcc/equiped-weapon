/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {LitElement, html} from 'lit';
import '@digital-dcc/stat-display';
import {modifierFor} from './modifier.js';
import {diceChain, DiceRoll} from './dice.js';
import {weaponStatsFor, weapons} from './weapons.js';
// import {weapons, weaponStatsFor} from './weapons.js';
import {styles} from './styles.js';

const wielding = {
  ONE_HANDED: 'one-handed',
  TWO_HANDED: 'two-handed',
  DUAL_WIELD_MAIN_HAND: 'dual-wield-main-hand',
  DUAL_WIELD_OFF_HAND: 'dual-wield-off-hand',
};

const wieldingDisplayText = {
  'one-handed': 'One Handed',
  'two-handed': 'Two Handed',
  'dual-wield-main-hand': 'Dual Wield - Main Hand',
  'dual-wield-off-hand': 'Dual Wield - Off Hand',
};

export class MeleeWeapon extends LitElement {
  static get styles() {
    return [styles];
  }

  static get properties() {
    return {
      // attributes
      type: {
        type: String,
        required: true,
      },
      strength: {
        type: Number,
        required: true,
      },
      agility: {
        type: Number,
        required: true,
      },
      weapon: {
        type: String,
        reflect: true,
      },
      attackDie: {
        attribute: 'attack-die',
        type: String,
        reflect: true,
      },
      damageDie: {
        attribute: 'damage-die',
        type: String,
        reflect: true,
      },
      attackModifierAdjustment: {
        attribute: 'attack-modifier-adjustment',
        type: Number,
      },
      attackModifierOverride: {
        attribute: 'attack-modifier-override',
        type: Number,
      },
      damageModifierAdjustment: {
        attribute: 'damage-modifier-adjustment',
        type: Number,
      },
      damageModifierOverride: {
        attribute: 'damage-modifier-override',
        type: Number,
      },
      attackerInvisible: {
        attribute: 'attacker-invisible',
        type: Boolean,
      },
      attackerOnHigherGround: {
        attribute: 'attacker-on-higher-ground',
        type: Boolean,
      },
      attackerSqueezing: {
        attribute: 'attacker-squeezing',
        type: Boolean,
      },
      attackerEntangled: {
        attribute: 'attacker-entangled',
        type: Boolean,
      },
      attackerUntrained: {
        attribute: 'attacker-untrained',
        type: Boolean,
      },
      attackerMounted: {
        attribute: 'attacker-mounted',
        type: Boolean,
      },
      attackerCharging: {
        attribute: 'attacker-charging',
        type: Boolean,
      },
      attackerSneakAttacking: {
        attribute: 'attacker-sneak-attacking',
        type: Boolean,
      },
      opponentBehindCover: {
        attribute: 'opponent-behind-cover',
        type: Boolean,
      },
      opponentBlinded: {
        attribute: 'opponent-blinded',
        type: Boolean,
      },
      opponentEntangled: {
        attribute: 'opponent-entangled',
        type: Boolean,
      },
      opponentHelpless: {
        attribute: 'opponent-helpless',
        type: Boolean,
      },
      opponentProne: {
        attribute: 'opponent-prone',
        type: Boolean,
      },
      wielding: {
        type: String,
        reflect: true,
      },
      subdualDamage: {
        attribute: 'subdual-damage',
        type: Boolean,
        reflect: true,
      },
      range: {state: true},
      firingIntoMelee: {state: true},
      attackDieAdjustment: {state: true},
      damageDieAdjustment: {state: true},
    };
  }

  constructor() {
    super();
    this.type = null;
    this.strength = null;
    this.agility = null;
    this.weapon = null;
    this.attackDie = 'd20';
    this.wielding = wielding.ONE_HANDED;
    this.subdualDamage = undefined;
    this.damageDie = null;
    this.attackModifierAdjustment = 0;
    this.attackModifierOverride = null;
    this.damageModifierAdjustment = 0;
    this.damageModifierOverride = null;

    this.attackerInvisible = false;
    this.attackerOnHigherGround = false;
    this.attackerSqueezing = false;
    this.attackerEntangled = false;
    this.attackerUntrained = false;
    this.attackerMounted = false;
    this.attackerCharging = false;
    this.attackerSneakAttacking = false;
    this.opponentBehindCover = false;
    this.opponentBlinded = false;
    this.opponentEntangled = false;
    this.opponentHelpless = false;
    this.opponentProne = false;

    this.attackDieAdjustment = 0;
    this.firingIntoMelee = false;
    this.range = 'short';
  }

  // if weapon is two handed, default wielding to two handed and disable changing
  // if weapon is subdual only, check subdual and disable changing
  // if a shield is equiped, disable selecting two handed
  // if class === halfling
  // 		agility is considered minimum 16 for dual wielding
  // 		if agility over 16, use normal rules
  // 		can use 2 equal size one handed weapons
  // 		crits on 16s
  // 		only fumbles when both results come up 1s

  render() {
    const weaponIsTwoHanded = weapons.get(this.weapon || 'Dagger')?.twoHanded;
    let isSubdual = !!weapons.get(this.weapon || 'Dagger')?.subdualDamage;
    if (this.subdualDamage === false) {
      isSubdual = false;
    } else if (this.subdualDamage === true) {
      isSubdual = true;
    }

    return html`
      <div class="wrapper" part="wrapper">
        <header part="header">
          <div class="text">
            <h1 part="title">Melee</h1>
            <h2 part="subtitle">${this.weapon}</h2>
            ${this.weaponRangeSelector}
          </div>
          <div class="buttons">
            <div class="wielding-and-subdual" part="wielding-and-subdual">
              <select @change="${this.handleWieldingChange}">
                <option value="${wielding.ONE_HANDED}">
                  ${wieldingDisplayText[wielding.ONE_HANDED]}
                </option>
                <option
                  value="${wielding.TWO_HANDED}"
                  ?selected="${weaponIsTwoHanded}"
                >
                  ${wieldingDisplayText[wielding.TWO_HANDED]}
                </option>
                <option value="${wielding.DUAL_WIELD_MAIN_HAND}">
                  ${wieldingDisplayText[wielding.DUAL_WIELD_MAIN_HAND]}
                </option>
                <option value="${wielding.DUAL_WIELD_OFF_HAND}">
                  ${wieldingDisplayText[wielding.DUAL_WIELD_OFF_HAND]}
                </option>
              </select>
              <label>
                <input
                  type="checkbox"
                  name="subdual-damage"
                  .checked="${isSubdual}"
                  @change="${this.handleSubdualDamageChange}"
                />
                subdual
              </label>
            </div>
            <div class="attack" part="attack">
              <div class="dice-chain-adjustment-buttons">
                <button
                  id="increment-dice-chain"
                  @click="${this.adjustAttackDieUp}"
                >
                  +
                </button>
                <button
                  id="decrement-dice-chain"
                  @click="${this.adjustAttackDieDown}"
                >
                  -
                </button>
              </div>
              <button
                class="attack-display-button"
                @click="${this._attackRoll}"
              >
                <h2 part="subtitle">Attack</h2>
                ${this.attackDisplay}
              </button>
            </div>
            <div class="damage" part="damage">
              <button
                class="damage-display-button"
                @click="${this._damageRoll}"
              >
                <h2 part="subtitle">Damage</h2>
                ${this.damageDisplay}
              </button>
            </div>
          </div>
        </header>
      </div>
    `;
  }

  get weaponRangeSelector() {
    if (this.type !== 'missile') return html``;
    const weaponStats = weaponStatsFor(this.weapon);
    return html`
      <div class="range" part="range">
        <ul>
          <li>
            <label>
              <input
                id="range-short"
                type="radio"
                name="range"
                value="short"
                .checked="${this.range === 'short'}"
                @change="${this.handleRangeChange}"
              />
              Short (${weaponStats?.range?.short})
            </label>
          </li>
          <li>
            <label>
              <input
                id="range-medium"
                type="radio"
                name="range"
                value="medium"
                .checked="${this.range === 'medium'}"
                @change="${this.handleRangeChange}"
              />
              Medium (${weaponStats?.range?.medium})
            </label>
          </li>
          <li>
            <label>
              <input
                id="range-long"
                type="radio"
                name="range"
                value="long"
                .checked="${this.range === 'long'}"
                @change="${this.handleRangeChange}"
              />
              Long (${weaponStats?.range?.long})
            </label>
          </li>
        </ul>
      </div>
    `;
  }

  handleSubdualDamageChange() {
    this.subdualDamage = !this.subdualDamage;
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: {
          subdualDamage: this.subdualDamage,
        },
      })
    );
  }

  handleWieldingChange(event) {
    this.wielding = event.target.value;
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: {
          wielding: this.wielding,
        },
      })
    );
  }

  handleRangeChange(event) {
    this.range = event.target.value;
  }

  adjustAttackDieUp() {
    if (this._attackDie === 'd30') return;
    this.attackDieAdjustment++;
  }

  adjustAttackDieDown() {
    if (this._attackDie === 'd3') return;
    this.attackDieAdjustment--;
  }

  _attackRoll() {
    const dr = new DiceRoll();
    dr.name = 'Missile Attack';
    dr.description = `A missile attack roll was made with a ${this.weapon?.toLowerCase()}`;
    dr.type = 'attack';

    dr.weapon.type = this.type;
    dr.weapon.name = this.weapon;
    dr.weapon.wielding = this.wielding;
    dr.weapon.subdualDamage = this.subdualDamage;
    dr.weapon.range = this.range;

    const [qty, die] = this._attackDie.split('d');
    dr.roll.qty = Number(qty || 1);
    dr.roll.die = Number(die || 20);
    dr.roll.mod = this._attackModifier;
    dr.roll.attackDieAdjustment = this.attackDieAdjustment;

    dr.conditions.attacker.charging = this.attackerCharging;
    dr.conditions.attacker.entangled = this.attackerCharging;
    dr.conditions.attacker.firingIntoMelee = this.firingIntoMelee;
    dr.conditions.attacker.invisible = this.attackerInvisible;
    dr.conditions.attacker.mounted = this.attackerMounted;
    dr.conditions.attacker.onHigherGround = this.attackerOnHigherGround;
    dr.conditions.attacker.sneakAttacking = this.attackerSneakAttacking;
    dr.conditions.attacker.squeezing = this.attackerSqueezing;
    dr.conditions.attacker.untrained = this.attackerUntrained;

    this.dispatchEvent(new CustomEvent('dice-roll', {detail: {diceRoll: dr}}));

    // reset attack die adjustment back to 0 after each roll
    this.attackDieAdjustment = 0;
  }

  _damageRoll() {
    const dr = new DiceRoll();
    dr.name = 'Missile Damage';
    dr.description = `A missile damage roll was made with a ${this.weapon?.toLowerCase()}`;

    dr.weapon.type = this.type;
    dr.weapon.name = this.weapon;
    dr.weapon.wielding = this.wielding;
    dr.weapon.subdualDamage = this.subdualDamage;
    dr.weapon.range = this.range;

    const [qty, die] = this._damageDie.split('d');
    dr.roll.qty = Number(qty || 1);
    dr.roll.die = Number(die || 4);
    dr.roll.mod = this._damageModifier;

    dr.conditions.attacker.charging = this.attackerCharging;
    dr.conditions.attacker.entangled = this.attackerCharging;
    dr.conditions.attacker.firingIntoMelee = this.firingIntoMelee;
    dr.conditions.attacker.invisible = this.attackerInvisible;
    dr.conditions.attacker.mounted = this.attackerMounted;
    dr.conditions.attacker.onHigherGround = this.attackerOnHigherGround;
    dr.conditions.attacker.sneakAttacking = this.attackerSneakAttacking;
    dr.conditions.attacker.squeezing = this.attackerSqueezing;
    dr.conditions.attacker.untrained = this.attackerUntrained;

    this.dispatchEvent(new CustomEvent('dice-roll', {detail: {diceRoll: dr}}));
  }

  incrementDiceChain(die, steps = 1) {
    for (let i = steps; i > 0; i--) {
      if (diceChain[diceChain.indexOf(die) + 1]) {
        die = diceChain[diceChain.indexOf(die) + 1];
      }
    }
    return die;
  }

  decrementDiceChain(die, steps = 1) {
    for (let i = steps; i > 0; i--) {
      if (diceChain[diceChain.indexOf(die) - 1]) {
        die = diceChain[diceChain.indexOf(die) - 1];
      }
    }
    return die;
  }

  get _attackDie() {
    // start with the attackDie that may have been passed in as an attribute (or the default)
    let [qty, die] = this.attackDie.split('d');
    die = `d${die}`;
    qty = qty || '1';

    if (this.attackerSqueezing) {
      die = this.decrementDiceChain(die);
    }
    if (this.attackerEntangled) {
      die = this.decrementDiceChain(die);
    }
    if (this.attackerUntrained) {
      die = this.decrementDiceChain(die);
    }

    if (this.opponentEntangled) {
      die = this.incrementDiceChain(die);
    }
    if (this.opponentHelpless) {
      die = this.incrementDiceChain(die);
    }

    if (this.type === 'melee') {
      // dual weapon fighting
      if (this.wielding === wielding.DUAL_WIELD_MAIN_HAND) {
        if (this.agility <= 8) {
          die = this.decrementDiceChain(die, 3);
        }
        if (this.agility >= 9 && this.agility <= 11) {
          die = this.decrementDiceChain(die, 2);
        }
        if (this.agility >= 12 && this.agility <= 15) {
          die = this.decrementDiceChain(die);
        }
        if (this.agility >= 16 && this.agility <= 17) {
          die = this.decrementDiceChain(die);
        }
      }

      if (this.wielding === wielding.DUAL_WIELD_OFF_HAND) {
        if (this.agility <= 8) {
          die = this.decrementDiceChain(die, 4);
        }
        if (this.agility >= 9 && this.agility <= 11) {
          die = this.decrementDiceChain(die, 3);
        }
        if (this.agility >= 12 && this.agility <= 15) {
          die = this.decrementDiceChain(die, 2);
        }
        if (this.agility >= 16 && this.agility <= 17) {
          die = this.decrementDiceChain(die);
        }
        if (this.agility >= 18) {
          die = this.decrementDiceChain(die);
        }
      }
    }

    if (this.type === 'missile') {
      // if the range is long, it's minus 1 die
      if (this.range === 'long') {
        die = this.decrementDiceChain(die);
      }
    }

    // if the plus/minus buttons have been used to adjust the dice chain manually
    // iterate until all increments or decrements have been used to move the dice chain up or down
    let i = this.attackDieAdjustment;
    while (i !== 0) {
      if (i < 0) {
        if (die === 'd3') {
          i = 0;
          continue;
        }
        die = diceChain[diceChain.indexOf(die) - 1];
        i++;
      } else {
        if (die === 'd30') {
          i = 0;
          continue;
        }
        die = diceChain[diceChain.indexOf(die) + 1];
        i--;
      }
    }

    return `${qty}${die}`;
  }

  get _attackModifier() {
    let modifier = modifierFor(this.strength);
    if (this.attackModifierAdjustment)
      modifier += this.attackModifierAdjustment;

    if (this.opponentBehindCover) modifier -= 2;
    if (this.opponentBlinded) modifier += 2;

    if (this.type === 'melee') {
      if (this.attackerInvisible) modifier += 2;
      if (this.attackerOnHigherGround) modifier += 1;
      if (this.opponentProne) modifier += 2;
    }

    if (this.type === 'missile') {
      if (this.range === 'medium') modifier -= 2;
      if (this.firingIntoMelee) modifier -= 1;
      if (this.opponentProne) modifier -= 2;
    }

    if (this.attackModifierOverride) modifier = this.attackModifierOverride;
    return modifier;
  }

  get attackDisplay() {
    const die = this._attackDie;
    const mod = this._attackModifier;
    return `${die}${mod ? (mod > 0 ? `+${mod}` : mod) : ''}`;
  }

  get _damageDie() {
    const weaponStats = weapons.get(this.weapon);

    let die = null;

    // set the die to the weapon's normal damage die
    if (weaponStats?.damage) die = weaponStats.damage;

    // if the character is performing a sneak attack and has a weapon that uses a higher die for sneak attacks, use that
    if (this.attackerSneakAttacking && weaponStats?.sneakDamage)
      die = weaponStats?.sneakDamage;

    // allow override via attributes
    if (this.damageDie) die = this.damageDie;

    return die;
  }

  get _damageModifier() {
    // start with zero modifier
    let modifier = modifierFor(this.strength);

    // apply any attribute based adjustment
    if (this.damageModifierAdjustment)
      modifier += this.damageModifierAdjustment;

    // allow complete override
    if (this.damageModifierOverride) modifier = this.damageModifierOverride;
    return modifier;
  }

  get damageDisplay() {
    const mod = this._damageModifier;
    return `${this._damageDie}${mod ? (mod > 0 ? `+${mod}` : mod) : ''}`;
  }
}

window.customElements.define('melee-weapon', MeleeWeapon);
