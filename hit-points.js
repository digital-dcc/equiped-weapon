/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {LitElement, html, css} from 'lit';
import '@digital-dcc/stat-display';

/**
 * An example element.
 *
 * @fires count-changed - Indicates when the count changes
 * @slot - This element has a slot
 * @csspart button - The button
 */
export class HitPoints extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
      }
      ::part(value) {
        font-size: 1.2em;
      }
      ::part(name) {
        font-size: 0.8em;
      }
      button {
        background: none;
        border: none;
      }
      .buttons {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 2px;
      }
      .buttons button {
        width: 30px;
        padding: 5px;
        aspect-ratio: 1/1;
        border-radius: 5px;
      }
      .buttons button:hover {
        background-color: rgba(211, 211, 211, 0.5);
        cursor: pointer;
      }
      .buttons button:active {
        transform: translateY(1px);
      }
    `;
  }

  static get properties() {
    return {
      max: {type: Number},
      current: {type: Number, reflect: true},
    };
  }

  constructor() {
    super();
    this.max = null;
    this.current = this.max;
  }

  get modifier() {
    return this.current !== this.max && typeof this.current === 'number'
      ? this.current + '/'
      : '';
  }

  render() {
    return html`
      <stat-display
        name="Hit Points"
        value="${this.max}"
        modifier="${this.modifier}"
      ></stat-display>
      <div class="buttons">
        <button
          part="decrement-button"
          class="decrement-button"
          @click="${this._decrement}"
        >
          -
        </button>
        <button
          part="increment-button"
          class="increment-button"
          @click="${this._increment}"
        >
          +
        </button>
      </div>
    `;
  }

  _decrement() {
    if (!this.current && this.current !== 0) {
      this.current = this.max - 1;
      return;
    }
    if (this.current < 1) return;
    this.current--;
    this._dispatchCountChangedEvent();
  }

  _increment() {
    if (!this.current && this.current !== 0) {
      this.current = this.max + 1;
      return;
    }
    this.current++;
    this._dispatchCountChangedEvent();
  }

  _dispatchCountChangedEvent() {
    this.dispatchEvent(
      new CustomEvent('current-changed', {
        detail: {current: this.current},
        bubbles: true,
        composed: true,
      })
    );
  }
}

window.customElements.define('hit-points', HitPoints);
