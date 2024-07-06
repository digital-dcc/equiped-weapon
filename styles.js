import {css} from 'lit';

export const styles = css`
  :host {
    display: block;
    padding: 0px;
    font-family: var(--main-font, 'Arial', sans-serif);
    font-size: 1em;
  }
  .wrapper {
    border: 1px black solid;
    padding: 10px;
    border-radius: 10px;
    min-width: 390px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .buttons {
    display: flex;
    gap: 5px;
    justify-content: center;
  }
  button.attack-display-button,
  button.damage-display-button {
    aspect-ratio: 1 / 1;
    border-radius: 5px;
    border: 1px black solid;
    cursor: pointer;
    background: none;
    min-width: 50px;
    min-height: 50px;
    margin: 0;
    padding: 0;
    color: black;
  }
  button:hover {
    background-color: rgba(211, 211, 211, 0.5);
  }
  button:active {
    transform: translateY(1px);
  }
	.wielding-and-subdual {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
  .dice-chain-adjustment-buttons {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  .dice-chain-adjustment-buttons button {
    margin: 0;
    padding: 0px;
    aspect-ratio: 1/1;
    width: 22px;
    border: 1px black solid;
    cursor: pointer;
    border-radius: 50%;
  }
  .wrapper header .text {
    display: flex;
    flex-direction: column;
    justify-content: center;
		min-width: fit-content;
		text-align: left;
  }
  h1 {
    margin: 0;
    padding: 0;
    font-size: 0.8em;
  }
  h2 {
    margin: 0;
    padding: 0;
    font-size: 0.6em;
  }
  .range {
    font-size: 0.8em;
  }
  ul {
    font-size: 0.8em;
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  .checkboxes {
    margin: 0;
    padding: 0;
  }
  .checkboxes li {
    display: flex;
    gap: 5px;
    align-items: center;
  }
  header {
    display: flex;
    justify-content: space-between;
  }
  input[type='checkbox'],
  input[type='radio'] {
    margin: 0;
  }
  .range ul {
    display: flex;
    gap: 5px;
  }
  .range label {
    display: flex;
    gap: 5px;
    flex-direction: row;
    align-items: center;
  }
  .attack {
    display: flex;
    gap: 5px;
  }
  .damage {
    display: flex;
    gap: 5px;
  }
`;
