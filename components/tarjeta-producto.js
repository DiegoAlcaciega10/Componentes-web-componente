class tarjetaProducto extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    static get observedAttributes() {
        return ["foto", "nombre", 'precio'];
    };
    attributeChangedCallback(name, oldValue, newValue) {
        console.log(`¡Atributo cambiado! El atributo "${name}" pasó de "${oldValue}" a "${newValue}"`);
        switch (name) {
            case "foto":
                this.foto = newValue;
                break;
            case "nombre":
                this.nombre = newValue;
                break;
            case "precio":
                this.precio = newValue;
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
        <slot>Descripción no disponible</slot>
        <label>Precio ${this.precio} $</label>


       
      ${this.getStyles()}
    `;
        return template;
    }
    getStyles() {
        return `
                <style>
    /* Sin caja: la tarjeta no tiene borde, fondo ni sombra.
       El producto y el texto flotan sobre la página. */

    :host {
        display: block;
        position: relative;
        padding-bottom: 6px;
        background: transparent;
        cursor: pointer;
        -webkit-tap-highlight-color: transparent;
    }
 
    /* Disco de color plano detrás del producto.
       Es más ancho que alto en su recorte y queda por debajo de la botella,
       así la botella "rompe" el círculo por arriba. */
       
    :host::before {
        content: "";
        position: absolute;
        top: 64px;
        left: 50%;
        width: 78%;
        aspect-ratio: 1;
        translate: -50% 0;
        border-radius: 50%;
        background: color-mix(in srgb, var(--color-marca, #1aa6b7) 13%, white);
        transition: scale 0.6s cubic-bezier(.2,.7,.2,1), background-color 0.4s ease;
    }
 
    /* Anillo fino que acompaña al disco */
    :host::after {
        content: "";
        position: absolute;
        top: 44px;
        left: 50%;
        width: 92%;
        aspect-ratio: 1;
        translate: -50% 0;
        border-radius: 50%;
        border: 1px solid color-mix(in srgb, var(--color-marca, #1aa6b7) 35%, white);
        opacity: 0.7;
        transition: scale 0.8s cubic-bezier(.2,.7,.2,1), opacity 0.4s ease;
    }
 
    :host(:hover)::before { scale: 1.04; background: color-mix(in srgb, var(--color-marca, #1aa6b7) 20%, white); }
    :host(:hover)::after  { scale: 1.06; opacity: 1; }
 
    /* Producto: grande, sobresale del disco */
    ::slotted(img) {
        position: relative;
        z-index: 1;
        display: block;
        width: 100%;
        height: 330px;
        padding: 0 12%;
        box-sizing: border-box;
        object-fit: contain;
        filter: drop-shadow(0 22px 18px rgb(8 50 70 / 0.22));
        transition: transform 0.6s cubic-bezier(.2,.7,.2,1);
    }
    :host(:hover) ::slotted(img) {
        transform: translateY(-10px) rotate(-3deg);
    }
 
    /* Título: alineado a la izquierda, tipografía limpia y ajustada */
    h3 {
        font-family: 'Playfair Display', Georgia, serif;
        position: relative;
        z-index: 3;
        margin: 0;
        padding: 30px 4px 0;
        color: var(--titulo, #0a2f44);
        font-size: 1.6rem;
        font-weight: 600;
        line-height: 1.12;
        letter-spacing: -0.02em;
    }
    /* Acento rojo de la tapa: línea corta que se alarga al pasar el cursor */
    h3::after {
        content: "";
        display: block;
        width: 22px;
        height: 2px;
        margin-top: 14px;
        background: var(--acento, #d62839);
        transition: width 0.5s cubic-bezier(.2,.7,.2,1);
        
    }
    :host(:hover) h3::after { width: 56px; }
 
    ::slotted(h3) {
        margin: 0 !important;
        font: inherit;
        color: inherit ;
    }
 
    /* !important: si tu página reinicia márgenes con "* { margin:0; padding:0 }",
       esos estilos le ganan a ::slotted y el texto se pega al borde */
    ::slotted(p) {
        position: relative;
        z-index: 3;
        margin: 0 !important;
        padding: 12px 4px 22px !important;
        max-width: 34ch;
        color: #5b7280;
        font-size: 0.95rem;
        line-height: 1.65;
        font-weight: 400;
        font-family: 'Montserrat', sans-serif;
        
    }
 
    /* Precio: sin cápsula, separado por una línea fina */
    label {
        position: relative;
        z-index: 3;
        display: flex;
        align-items: baseline;
        margin: 0 4px;
        padding: 16px 0 4px;
        border-top: 1px solid var(--borde, #cfe9ef);
        background: none;
        color: var(--titulo, #0a2f44);
        font-size: 1.4rem;
        font-weight: 600;
        letter-spacing: -0.01em;
        font-variant-numeric: tabular-nums;
        font-family: 'Playfair Display', Georgia, serif;
        line-height: 1;
    }
 
    /* Foco visible si el componente se hace enfocable (tabindex) */
    :host(:focus-visible) {
        outline: 2px solid var(--color-marca, #1aa6b7);
        outline-offset: 8px;
        border-radius: 12px;
    }
 
    @media (max-width: 480px) {
        ::slotted(img) { height: 280px; }
        :host::before { top: 54px; }
        :host::after  { top: 36px; }
    }
 
    @media (prefers-reduced-motion: reduce) {
        :host::before, :host::after, ::slotted(img), h3::after { transition: none; }
        :host(:hover)::before, :host(:hover)::after, :host(:hover) ::slotted(img) { scale: 1; transform: none; }
    }
</style>
    `;
    }
    get precio() {
        return Number(this.getAttribute("precio"));
    }

    set precio(v) {
        const valorNumerico = Number(v);
        if (this.getAttribute("precio") !== String(valorNumerico)) {
            this.setAttribute("precio", valorNumerico);
        }
    }

    render() {
        const content = this.getTemplate().content.cloneNode(true);

        this.shadowRoot.replaceChildren(content);

    }
    connectedCallback() {

        this.render();
    }
}

customElements.define("tarjeta-producto", tarjetaProducto);