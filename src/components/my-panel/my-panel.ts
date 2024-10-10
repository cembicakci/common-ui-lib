import React from "react";
import { createComponent } from "@lit/react";
import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { when } from "lit/directives/when.js";

@customElement("my-panel")
export class MyPanelElement extends LitElement {

	@property({ type: String })
	title = "Widget";

	@property({ type: Boolean })
	opened = false;

	@property({ type: String })
	icon = ""


	private onIconClickHandler(e: MouseEvent) {
		e.stopPropagation()
		this.dispatchEvent(new CustomEvent('icon-click', { bubbles: true }))
	}

	static styles = css`
		.title {
			background: lightgreen;
			color: #222;
			padding: 0.8rem;
			display: flex;
			gap: 12px;
			cursor: pointer;

		}

		.body {
			padding: 1rem;
			border: 1px solid lightgreen;
		}
	`

	render() {
		return html`
			<div>
				<div class="title" @click=${() => this.opened = !this.opened}>
					${this.title}

					<div @click=${this.onIconClickHandler}>${this.icon}</div>
				</div>

				${when(this.opened, () => html`<div class="body"><slot></slot></div>`)}
			</div>
		`
	}
}

export const MyPanel = createComponent({
	tagName: 'my-panel',
	elementClass: MyPanelElement,
	react: React,
	events: {}

})

declare global {
	interface HTMLElementTagNameMap {
		'my-panel': MyPanelElement
	}
}

