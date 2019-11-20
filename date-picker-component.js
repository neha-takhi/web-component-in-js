'use strict';

(function() {
    class DatePickerRange extends HTMLElement {
        constructor() {
            super();

            // attaches shadow tree and returns shadow root reference
            const shadow = this.attachShadow({ mode: 'open' });

            // creating a container for the date range picker component
            const dateRangePickerContainer = document.createElement('form');

            // get attribute values from getters
            const title = this.title;
            this.dateOptions = [];

            // adding a class to our container for the sake of clarity
            dateRangePickerContainer.classList.add('date-picker-range');

            // creating the inner HTML of the editable list element
            dateRangePickerContainer.innerHTML = `
                <style>
                        @import './dateRangeCSS.css';
                </style>				
                        <form class="form">
                      <fieldset>
                        <legend>${title}</legend>
                        <select class="selectTag"><option value=0>Select Date Range</option></select>
                        <div class="form-wrap">
                          <input class="datepicker1" type="date" />
                          <input class="datepicker2" type="date" />
                        </div>
                        <p class="support-browsers">Supported in Chrome, Opera, Firefox or Edge browser</p>
                      </fieldset>
                    </form>
               `;

            // binding methods
            this.handleChangeDate = this.handleChangeDate.bind(this);
            this.handleRemoveItemListeners = this.handleRemoveItemListeners.bind(this);

            // appending the container to the shadow DOM
            shadow.appendChild(dateRangePickerContainer);
        }

        // add the date picker change action
        handleChangeDate(e) {
            e.preventDefault;
            const datepicker1 = this.shadowRoot.querySelector('.datepicker1');
            const datepicker2 = this.shadowRoot.querySelector('.datepicker2');
            const selectTag = this.shadowRoot.querySelector('.selectTag');



            // checking value is selected or not. if selected then proceed with if otherwise alert the error
            if (datepicker1.value && datepicker2.value) {

                // checking both date value should not be same
                if (datepicker1.value !== datepicker2.value) {

                    // checking left date should be less than right date
                    if (datepicker1.value < datepicker2.value) {
                        const valueToBeInserted = `${dateFormat(datepicker1.value)} - ${dateFormat(datepicker2.value)}`;
                        const isUnique = this.dateOptions.indexOf(valueToBeInserted) === -1;

                        // checking value is unique or not. If unique then proceed with if otherwise alert the message of already selected
                        if (isUnique) {
                            this.dateOptions.push(valueToBeInserted);
                            var opt = document.createElement('option');
                            opt.value = this.dateOptions.length;
                            opt.innerHTML = valueToBeInserted;
                            opt.defaultSelected = true;
                            selectTag.add(opt);
                        } else {
                            alert("OOPS!!! Range already selected. Try new one.");
                            this.resetDate
                        }
                    } else {
                        alert("OOPS!!! please select the correct dates.")
                        this.resetDate
                    }
                } else {
                    alert("OOPS!!! dates are same. please select the different date for range.")
                    this.resetDate
                }
            } else {
                alert("Please select date range.");
                this.resetDate
            }
        }

        get resetDate() {
            const datepicker1 = this.shadowRoot.querySelector('.datepicker1');
            const datepicker2 = this.shadowRoot.querySelector('.datepicker2');

            datepicker1.value = "";
            datepicker2.value = "";
        }

        // fires after the element has been attached to the DOM
        connectedCallback() {
            const datepicker2 = this.shadowRoot.querySelector('.datepicker2');

            // you can add remove listener here for removing the events
            //this.handleRemoveItemListeners([datepicker2]);
            datepicker2.addEventListener('change', this.handleChangeDate, false);
        }

        // gathering data from element attributes
        get title() {
            return this.getAttribute('title') || '';
        }

        // for removing listeners
        handleRemoveItemListeners(arrayOfElements) {
            arrayOfElements.forEach(element => {
                element.addEventListener('change', this.removeListItem, false);
            });
        }

        removeListItem(e) {
            e.target.parentNode.remove();
        }
    }

    // let the browser know about the custom element
    customElements.define('date-picker-range', DatePickerRange);
})();

// common Utilities Function
function dateFormat(dateVal) {
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var now = new Date(dateVal);
    return now.getDate() + ' ' + months[now.getMonth()] + ' ' + now.getFullYear();
}