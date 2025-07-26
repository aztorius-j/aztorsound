class SectionTitle extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    // Načítanie hodnôt z atribútov
    const title = this.getAttribute("title") || "Default Title";
    const number = this.getAttribute("subtitle") || "__000";

    this.shadowRoot.innerHTML = `
      <style>
        #title-border {
          display: grid;
          grid-template-columns: 4.2rem auto;
          width: 20rem;
          height: 6rem;
          white-space: nowrap;
        }

        #title-border svg {
          width: 1.75rem;
          stroke: var(--white-color, white);
        }

        .arrow {
          display: flex;
          justify-content: center;
          align-items: center;
          border: 2px solid var(--grey-color);
          border-radius: 1.5rem;
        }

        .headings {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding-left: 1rem;
          font-family: 'NeueHaasDisplayMedium';
        }

        h1, h2 {
          font-size: 2rem;
          margin: 0;
        }

        h1 {
          color: var(--grey-color);
        }

        h2 {
          color: var(--ivgi-red, red);
        }
      </style>

      <div id="title-border">
        <div class="arrow">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 6V18M12 18L7 13M12 18L17 13" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="headings">
          <h1>${title}</h1>
          <h2>${number}</h2>
        </div>
      </div>
    `;
  }
}

// Registrácia Web Componentu
customElements.define("section-title", SectionTitle);