---
layout: page.11ty.cjs
title: <melee-weapon> ⌲ Home
---

# &lt;melee-weapon>

`<melee-weapon>` is an awesome element. It's a great introduction to building web components with LitElement, with nice documentation site as well.

## As easy as HTML

<section class="columns">
  <div>

`<melee-weapon>` is just an HTML element. You can it anywhere you can use HTML!

```html
<melee-weapon></melee-weapon>
```

  </div>
  <div>

<melee-weapon></melee-weapon>

  </div>
</section>

## Configure with attributes

<section class="columns">
  <div>

`<melee-weapon>` can be configured with attributed in plain HTML.

```html
<melee-weapon name="HTML"></melee-weapon>
```

  </div>
  <div>

<melee-weapon name="HTML"></melee-weapon>

  </div>
</section>

## Declarative rendering

<section class="columns">
  <div>

`<melee-weapon>` can be used with declarative rendering libraries like Angular, React, Vue, and lit-html

```js
import {html, render} from 'lit-html';

const name = 'lit-html';

render(
  html`
    <h2>This is a &lt;melee-weapon&gt;</h2>
    <melee-weapon .name=${name}></melee-weapon>
  `,
  document.body
);
```

  </div>
  <div>

<h2>This is a &lt;melee-weapon&gt;</h2>
<melee-weapon name="lit-html"></melee-weapon>

  </div>
</section>
