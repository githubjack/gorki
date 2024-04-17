const template = document.createElement('template');
template.innerHTML = `
    <style>
        .timeline-container {
            display: inline-flex;
            align-items: center;
            justify-content: space-evenly;
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
            box-shadow: 4px 8px 4px 2px rgba(0, 0, 0, 0.25);
            border-radius: 8px 16px;
            padding: 10px;
            display: flex;
            align-tems: center;
            font-size: 12px;
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
        <svg viewBox="0 0 49 49" class="alert">
            <rect x="1.5" y="1.5" width="46" height="46" fill="#040B14" stroke="#37AD00" stroke-width="3"/>
            <rect x="19" y="19" width="12" height="12" fill="#37AD00"/>
        </svg>
        </svg>
        <svg viewBox="0 0 49 49" class="cancel">
            <rect x="1.5" y="1.5" width="46" height="46" fill="#37AD00" stroke="#37AD00" stroke-width="3"/>
            <rect x="17.7827" y="20.4038" width="3" height="16" transform="rotate(-45 17.7827 20.4038)" fill="#010F40"/>
            <rect width="3" height="16" transform="matrix(-0.707107 -0.707107 -0.707107 0.707107 31.2178 20.4038)" fill="#010F40"/>
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