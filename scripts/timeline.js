const template = document.createElement('template');
template.innerHTML = `
    <style>
        .timeline-container {
            display: inline-flex;
            align-items: center;
            justify-content: space-evenly;
            // width: 480px;
            // margin-inline: auto;
            position: relative;
            z-index: 2;
            margin-inline: 1rem;
        }
        .message-container {
            position: absolute;
            bottom: 200%;
            z-index: 9;
            transform: scale(0);
            transform-origin: bottom center;
            transition: transform .5s cubic-bezier(0.860, 0.000, 0.070, 1.000);
            width: 160px;
            height: 64px;
            // background: rgba(214, 254, 82, 0.8);
            box-shadow: 4px 8px 4px 2px rgba(0, 0, 0, 0.25);
            border-radius: 8px 16px;
            padding: 10px;
            display: flex;
            align-tems: center;
            font-size: 16px;
            // color: black;

        }
       svg {
            width: 40px;
            cursor: pointer;
        }
        .cancel {
            display: none;
        }
    </style>

    <div class='timeline-container'>
        <svg viewBox="0 0 14 14" id="node-alert" class="alert">
            <rect x="0.5" y="0.5" width="13" height="13" rx="6.5" fill="#37AD00" stroke="#37AD00"/>
        </svg>
        <svg viewBox="0 0 14 14" id="node-exit" class="cancel">
            <rect x="0.5" y="0.5" width="13" height="13" rx="6.5" fill="#D6FE52" stroke="#D6FE52"/>
        </svg>
        <div class="message-container">
            <slot name="message" />
        </div>
    </div>




`;


class Timeline extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    message(expandState) {
        const message = this.shadowRoot.querySelector('.message-container');
        const alert = this.shadowRoot.querySelector('.alert');
        const cancel = this.shadowRoot.querySelector('.cancel');

        if(expandState == true) {
            message.style.transform = 'scale(1)';
            alert.style.display = 'none';
            cancel.style.display = 'block';
            expandState = false;
        }   else {
                message.style.transform = 'scale(0)';
                cancel.style.display = 'none';
                alert.style.display = 'block';
        }   
    }
    connectedCallback() {
        this.shadowRoot.querySelector('.alert').addEventListener('click', () => {
            this.message(true);
        } );
        this.shadowRoot.querySelector('.cancel').addEventListener('click', () => {
            this.message(false);
        } );

        // configuration options: background-color and font-color
        if(this.getAttribute('message-bg')) {
            this.shadowRoot.querySelector('.message-container').style.backgroundColor = this.getAttribute('message-bg');
        }
        if(this.getAttribute('message-clr')) {
            this.shadowRoot.querySelector('.message-container').style.color = this.getAttribute('message-clr');
        }

    }
}

window.customElements.define('time-line', Timeline);