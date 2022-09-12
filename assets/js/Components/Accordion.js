class Accordion {
    /**
     * @param {HTMLElement} accordion
     */
    constructor(accordion) {
        this.accordion = accordion;
        this.btn = this.accordion.querySelector('.accordion-btn');
        this.btnIcon = this.btn.querySelector('.btn-icon');
        this.panel = this.accordion.querySelector('.panel-wrapper');
        this.panelTransitionDuration = this._getTransitionDuration(this.panel);
        this.isStartOpen = this.accordion.getAttribute('data-acc-init') === 'show';

        this.btn.addEventListener('click', this.handleClick.bind(this))
    }

    handleClick() {
        if (this.isStartOpen) {
            this._toggleAccordionStartOpen()
        } else {
            this._toggleAccordionStartClose()
        }
    }

    /**
     * Accordion is open by default
     */
    _toggleAccordionStartOpen() {
        if (this.panel.style.maxHeight) {
            // open panel (Redefine max-height with JS)
            this.panel.style.maxHeight = this.panel.scrollHeight + "px";
            // remove style to arrow and btn
            this.btn.style.borderRadius = null;
            this.btnIcon.style = null;
            // transition end (max-height)
            setTimeout(() => {
                // After transition, remove max-height added by JS and use default style from css
                this.panel.style.maxHeight = null;
            }, this.panelTransitionDuration)
        } else {
            // Override css max-height value. Define max-height value in PIXEL with JS
            this.panel.style.maxHeight = this.panel.scrollHeight + "px";
            // force repaint to apply the previous value of max-height in pixel
            // 100% -> 0px (transition not working)
            // 550px -> 0px (transition working)
            this.panel.offsetWidth;
            // close panel with transition
            this.panel.style.maxHeight = `0px`;
            this.btn.style.borderRadius = ".375rem";
            this.btnIcon.style.transform = "rotate(0deg)";
        }
    }

    /**
     * Accordion is close by default
     */
    _toggleAccordionStartClose() {
        if (this.panel.style.maxHeight) {
            // remove all style added from JS
            this.panel.style = null;
            this.btn.style = null;
            this.btnIcon.style = null;
        } else {
            this.panel.style.maxHeight = this.panel.scrollHeight + "px";
            this.panel.style.borderRadius = "0 0 .375rem .375rem";
            this.btn.style.borderRadius = ".375rem .375rem 0 0";
            this.btnIcon.style.transform = "rotate(180deg)";
        }
    }

    _getTransitionDuration(element) {
        return parseFloat(window.getComputedStyle(element).transitionDuration) * 1000
    }
}

export default Accordion