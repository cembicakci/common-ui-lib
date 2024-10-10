import React from "react";
import { createComponent } from "@lit/react";
import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("my-button")
export class MyButtonElement extends LitElement {

	@property({ type: String }) label = "Button";

	@property({ type: String }) variant: 'primary' | 'secondary' | 'tertiary' = 'primary';


	private onClickHandler(e: MouseEvent) {
		e.stopPropagation();
		this.dispatchEvent(new CustomEvent('button-click', { bubbles: true }));
	}

	static styles = css`
    .button {
      padding: 0.6rem 1.2rem;
      border-radius: 4px;
      cursor: pointer;
      font-size: 1rem;
      border: none;
    }
    
    .primary {
      background-color: lightblue;
      color: #222;
    }

    .secondary {
      background-color: green;
      color: #fff;
    }

    .tertiary {
      background-color: white;
      color: #444;
    }
  `;

	render() {
		return html`
      <button class="button ${this.variant}" @click=${this.onClickHandler}>
        ${this.label}
      </button>
    `;
	}
}

export const MyButton = createComponent({
	tagName: 'my-button',
	elementClass: MyButtonElement,
	react: React,
	events: {
		onButtonClick: 'button-click'
	}
});

declare global {
	interface HTMLElementTagNameMap {
		'my-button': MyButtonElement;
	}
}
