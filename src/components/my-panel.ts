import { createComponent } from "@lit/react";
import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { when } from "lit/directives/when.js";
import React from "react";

@customElement("my-panel")
export class MyPanel extends LitElement {

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
			background: var(--my-panel-primary-bg);
			color: var(--my-panel-primary-color);
			padding: 0.8rem;

		}

		.body {
			padding: 1rem;
			border: 1px solid var(--my-panel-primary-bg);
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

export const MyPanelReact = createComponent({
	tagName: 'my-panel',
	elementClass: MyPanel,
	react: React,
	events: {}

})

declare global {
	interface HTMLElementTagNameMap {
		'my-panel': MyPanel
	}
}

