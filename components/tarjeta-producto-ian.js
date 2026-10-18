const plantilla = document.createElement("template");
plantilla.innerHTML = `
  <style>
    :host {
      display: block;
      background: #ffffff;
      border: 2px solid var(--color-marca, #10b981);
      border-radius: 16px;
      padding: 20px;
      box-sizing: border-box;
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
      font-family: system-ui, Arial, sans-serif;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      max-width: 320px;
    }

    :host(:hover) {
      transform: translateY(-4px);
      box-shadow: 0 10px 22px rgba(0, 0, 0, 0.12);
    }

    /* RETO EXTRA · Atributo destacado */
    :host([destacado]) {
      border: 3px solid #3b82f6;
      box-shadow: 0 0 14px rgba(59, 130, 246, 0.4);
    }

    /* Contenedor de la foto adaptado para que luzca vertical y completa */
    .contenedor-foto {
      width: 100%;
      height: 270px;
      background: #0f172a;
      border-radius: 12px;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 16px;
    }

    ::slotted([slot="foto"]) {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center center;
      display: block;
      transition: transform 0.3s ease;
    }

    :host(:hover) ::slotted([slot="foto"]) {
      transform: scale(1.03);
    }

    ::slotted([slot="nombre"]) {
      margin: 0 0 8px 0;
      font-size: 1.3rem;
      font-weight: 700;
      color: var(--color-marca, #10b981);
    }

    .descripcion {
      font-size: 0.95rem;
      color: #475569;
      margin-bottom: 16px;
      line-height: 1.5;
    }

    .contenedor-precio {
      font-size: 1.35rem;
      font-weight: 800;
      color: var(--color-marca, #10b981);
      border-top: 1px solid #e2e8f0;
      padding-top: 12px;
      display: flex;
      align-items: center;
    }
  </style>

  <div class="contenedor-foto">
    <slot name="foto"></slot>
  </div>
  <slot name="nombre"></slot>
  <div class="descripcion">
    <slot>Sin descripción</slot>
  </div>
  <div class="contenedor-precio">
    $<span id="precio">0.00</span>
  </div>
`;

export class TarjetaProductoIan extends HTMLElement {
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
customElements.define("tarjeta-ian", TarjetaProductoIan);