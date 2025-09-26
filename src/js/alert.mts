interface AlertOptions {
    message: string;
    color?: string;
    backgroundColor?: string;
    duration?: number | 0;
    removeable?: boolean;
}
export default class Alert {
    static async init() {
        // show alerts from alerts.json on load
        const response = await fetch('/json/alerts.json');
        const alerts = await response.json();
        alerts.forEach((alert: AlertOptions) => {
            const newAlert = new Alert(alert);
            console.log(newAlert);
            newAlert.show();
        });
    }
    #el: HTMLElement;
    #ops: AlertOptions;
    static #queue: Alert[] = [];
    constructor(options: AlertOptions) {
        this.#el = document.createElement('div');
        this.#ops = options;
        return this;
    }
    show() {
        Alert.#queue.push(this);
        if (Alert.#queue.length == 1) {
            this.#show();
        }
    }
    #show() {
        this.#el = document.createElement('div');
        let innerHTML = `
            <style>
                .alert_mb_container {
                    position: fixed;
                    top: 30px;
                    left: 10px;
                    right: 10px;
                    border-radius: 5px;
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 10px 3px;
                    text-align: center;
                    z-index: 9999;
                    font-weight: bold;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
                    opacity: 0;
                    pointer-events: none;
                    transform: translateY(-30px);
                    transition: opacity 0.3s ease, transform 0.3s ease;
                }
                div.showing > .alert_mb_container {
                    pointer-events: all;
                    opacity: 0.9;
                    transform: translateY(0);
                }
                div.removing > .alert_mb_container {
                    pointer-events: all;
                    opacity: 0;
                    transform: translateY(30px);
                }
            </style>
            <div style="
                border: 2px solid ${this.#ops.color || 'green'};
                color: ${this.#ops.color || 'green'};
                background-color: ${this.#ops.backgroundColor || 'lightgreen'};
            " class="alert_mb_container">
                <div style="position: relative;">
        `;

        innerHTML += `<span>${this.#ops.message}</span>`;
        
        if (!(this.#ops.removeable===false)) {
            innerHTML += `<div
                    style="position: absolute; top: 0; right: 7px; cursor: pointer;"
                    onclick="this.parentElement.parentElement.parentElement.remove()"
                >&times</div>`;
        }
        
        this.#el.innerHTML = innerHTML + '</div></div>';
        document.body.appendChild(this.#el);

        const oldRemove = this.#el.remove;
        const removeMe = () => {
            this.#el.classList.add('removing');
            setTimeout(() => {
                oldRemove.call(this.#el);
            }, 300);
            Alert.#queue.shift();
            if (Alert.#queue.length > 0) {
                Alert.#queue[0].#show();
            }
        };
        this.#el.remove = removeMe.bind(this);

        setTimeout(() => {
            this.#el.classList.add('showing');
        }, 100);

        if (this.#ops.duration) {
            setTimeout(removeMe.bind(this), this.#ops.duration);
        }
    }
}