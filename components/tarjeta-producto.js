class tarjetaProducto extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    static get observedAttributes() {
        return ["foto", "nombre"];
    };
    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case "foto":
                this.foto = newValue;
                break;
            case "nombre":
                this.nombre = newValue;
                break;

        }

        if (this.isConnected) {
            this.render();
        }
    }
    getTemplate() {
        const template = document.createElement("template");
        template.innerHTML = `
        <slot name="foto"></slot>
        <h3><slot name="nombre"></slot></h3>
        <slot></slot>

       
      ${this.getStyles()}
    `;
        return template;
    }
    getStyles() {
        return `
                <style>
        :host {
            display: block;
            position: relative;
            overflow: hidden;
            border: 1.5px solid var(--borde, #cfe9ef);
            border-radius: 26px;
            background-color: #ffffff;
            box-shadow: 0 12px 32px color-mix(in srgb, var(--color-marca, #1aa6b7) 22%, transparent);
            transition: transform 0.35s ease, box-shadow 0.35s ease;
        }
        :host(:hover) {
            transform: translateY(-8px);
            box-shadow: 0 24px 46px color-mix(in srgb, var(--color-marca, #1aa6b7) 38%, transparent);
        }

        /* Fondo de agua: del blanco helado al turquesa, con brillo y burbujas */
        :host::before {
            content: "";
            position: absolute;
            inset: 0 0 auto 0;
            height: 255px;
            background:
                radial-gradient(circle at 50% 58%, rgb(255 255 255 / 0.95) 0, rgb(255 255 255 / 0) 52%),
                radial-gradient(circle at 14% 26%, rgb(255 255 255 / 0.70) 0 7px, transparent 8px),
                radial-gradient(circle at 86% 20%, rgb(255 255 255 / 0.60) 0 10px, transparent 11px),
                radial-gradient(circle at 24% 70%, rgb(255 255 255 / 0.55) 0 5px, transparent 6px),
                radial-gradient(circle at 90% 62%, rgb(255 255 255 / 0.65) 0 6px, transparent 7px),
                radial-gradient(circle at 70% 12%, rgb(255 255 255 / 0.50) 0 4px, transparent 5px),
                linear-gradient(165deg,
                    color-mix(in srgb, var(--color-marca, #1aa6b7) 8%, white),
                    color-mix(in srgb, var(--color-marca, #1aa6b7) 40%, white));
        }

        /* Curva tipo ola que une la foto con el texto */
        :host::after {
            content: "";
            position: absolute;
            top: 226px;
            left: -10%;
            width: 120%;
            height: 34px;
            background: #ffffff;
            border-radius: 50% 50% 0 0 / 100% 100% 0 0;
            z-index: 2;
        }

        ::slotted(img) {
            position: relative;
            z-index: 1;
            display: block;
            width: 100%;
            height: 255px;
            padding: 26px 26px 40px;
            box-sizing: border-box;
            object-fit: contain;
            filter: drop-shadow(0 16px 14px rgb(5 60 90 / 0.30));
            transition: transform 0.45s ease;
        }
        :host(:hover) ::slotted(img) {
            transform: scale(1.06) rotate(-2deg);
        }

        h3 {
            position: relative;
            z-index: 3;
            margin: 0;
            padding: 8px 26px 0;
            color: var(--titulo, #0a2f44);
            font-size: 1.5rem;
            font-weight: 700;
            line-height: 1.15;
            letter-spacing: -0.01em;
        }
        /* Línea de acento: rojo de la tapa de la botella */
        h3::after {
            content: "";
            display: block;
            width: 38px;
            height: 3px;
            margin-top: 12px;
            border-radius: 3px;
            background: var(--acento, #d62839);
        }
        ::slotted(h3) {
            margin: 0 !important;
            font: inherit;
            color: inherit;
        }

        /* !important: si tu página reinicia márgenes con "* { margin:0; padding:0 }",
           esos estilos le ganan a ::slotted y el texto se pega al borde */
        ::slotted(p) {
            position: relative;
            z-index: 3;
            margin: 0 !important;
            padding: 12px 26px 28px !important;
            color: #4d6572;
            font-size: 0.97rem;
            line-height: 1.6;
        }

        @media (prefers-reduced-motion: reduce) {
            :host, ::slotted(img) { transition: none; }
            :host(:hover), :host(:hover) ::slotted(img) { transform: none; }
        }
        </style>
    `;
    }
    get precio() {
        return Number(this.getAttribute("precio"));
    }

    set precio(v) {
        this.setAttribute("precio", v);
    }

    render() {
        if (this.shadowRoot.childElementCount > 0) {
            this.shadowRoot.innerHTML = "";
        }
        this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true));
    }

    connectedCallback() {
        this.render();
    }
}

customElements.define("tarjeta-producto", tarjetaProducto);