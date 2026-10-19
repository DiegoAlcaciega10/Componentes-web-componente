const plantilla = document.createElement("template");
plantilla.innerHTML = `
  <style>
    :host {
      display: block;
      box-sizing: border-box;
      max-width: 320px;
      flex: 0 1 320px;
      padding: 20px;
      color: #54230e;
      background: #ff5a36;
      border: 2px solid #ff8a24;
      border-radius: 16px;
      box-shadow: 0 16px 32px rgb(169 67 20 / 20%);
      font-family: system-ui, Arial, sans-serif;
      transition: transform 200ms ease, box-shadow 200ms ease;
    }

    :host(:hover) {
      transform: translateY(-4px);
      box-shadow: 0 10px 22px rgb(169 67 20 / 24%);
    }

    :host([destacado]) {
      border-color: #ffbd2e;
    }

    .tarjeta {
      overflow: hidden;
      border-radius: 10px;
      background: #fff3d6;
    }

    .escenario {
      display: grid;
      height: 270px;
      place-items: center;
      overflow: hidden;
      border-radius: 8px;
      background: linear-gradient(145deg, #ffbd2e, #ff7139 58%, #f34843);
    }

    ::slotted([slot="foto"]) {
      display: block;
      width: 100%;
      height: 100%;
      padding: 12px 25px 16px;
      box-sizing: border-box;
      object-fit: contain;
      filter: drop-shadow(0 12px 8px rgb(115 48 15 / 25%));
      transition: transform 300ms ease;
    }

    :host(:hover) ::slotted([slot="foto"]) {
      transform: scale(1.06);
    }

    .contenido {
      padding-top: 16px;
    }

    ::slotted([slot="nombre"]) {
      display: block;
      margin: 0 0 8px;
      color: #54230e;
      font-size: 1.3rem;
      font-weight: 700;
    }

    .descripcion {
      margin: 0 0 16px;
      color: #80523a;
      font-size: 0.95rem;
      line-height: 1.5;
    }

    .pie {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: 14px;
      border-top: 1px solid #f2d3a4;
    }

    .precio {
      color: #e34b2f;
      font-size: 1.35rem;
      font-weight: 800;
      font-variant-numeric: tabular-nums;
      letter-spacing: -0.04em;
    }

    @media (prefers-reduced-motion: reduce) {
      :host,
      ::slotted([slot="foto"]) {
        transition: none;
      }

      :host(:hover) {
        transform: none;
      }
    }
  </style>

  <article class="tarjeta">
    <div class="escenario">
      <slot name="foto"></slot>
    </div>
    <section class="contenido">
      <slot name="nombre"></slot>
      <div class="descripcion">
        <slot>Sin descripción</slot>
      </div>
      <footer class="pie">
        <span class="precio">$<span id="precio">0.00</span></span>
      </footer>
    </section>
  </article>
`;

export class TarjetaProductoJosema extends HTMLElement {
  static get observedAttributes() {
    return ["precio"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    if (!this.shadowRoot.querySelector("#precio")) {
      this.shadowRoot.append(plantilla.content.cloneNode(true));
    }
    this.#actualizarPrecio();
  }

  attributeChangedCallback(nombre, anterior, valor) {
    if (nombre === "precio" && anterior !== valor) {
      this.#actualizarPrecio();
    }
  }

  #actualizarPrecio() {
    const spanPrecio = this.shadowRoot.querySelector("#precio");
    if (spanPrecio) {
      spanPrecio.textContent = Number(this.precio).toFixed(2);
    }
  }

  get precio() {
    return Number(this.getAttribute("precio") || 0);
  }

  set precio(valor) {
    this.setAttribute("precio", valor);
  }
}
customElements.define("tarjeta-josema", TarjetaProductoJosema);