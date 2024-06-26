// @ts-nocheck
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {HitPoints} from '../hit-points.js';
import {fixture, assert} from '@open-wc/testing';
import {html} from 'lit/static-html.js';

suite('hit-points', () => {
  test('is defined', () => {
    const el = document.createElement('hit-points');
    assert.instanceOf(el, HitPoints);
  });

  test('renders with a set max', async () => {
    const el = await fixture(html`<hit-points max="9"></hit-points>`);
    assert.shadowDom.equal(
      el,
      `
      <stat-display name="Hit Points" value="9" modifier=""></stat-display>
			<div class="buttons">
				<button part="decrement-button" class="decrement-button">-</button>
				<button part="increment-button" class="increment-button">+</button>
			</div>
    `
    );
  });

  test('renders with a set max and current', async () => {
    const el = await fixture(
      html`<hit-points max="11" current="7"></hit-points>`
    );
    assert.shadowDom.equal(
      el,
      `
      <stat-display name="Hit Points" value="11" modifier="7/"></stat-display>
			<div class="buttons">
				<button part="decrement-button" class="decrement-button">-</button>
				<button part="increment-button" class="increment-button">+</button>
			</div>
    `
    );
  });

  test('handles a click', async () => {
    const el = await fixture(
      html`<hit-points max="11" current="7"></hit-points>`
    );
    const button = el.shadowRoot.querySelector('button.decrement-button');
    button.click();
    await el.updateComplete;
    assert.shadowDom.equal(
      el,
      `
      <stat-display name="Hit Points" value="11" modifier="6/"></stat-display>
			<div class="buttons">
				<button part="decrement-button" class="decrement-button">-</button>
				<button part="increment-button" class="increment-button">+</button>
			</div>
    `
    );
  });

  test('styling applied', async () => {
    const el = await fixture(html`<hit-points max="7"></hit-points>`);
    await el.updateComplete;
    assert.equal(getComputedStyle(el).paddingTop, '0px');
  });
});
