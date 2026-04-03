import icons from 'url:../../img/icons.svg';

export default class Views {
  _data;
  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    // Get recipe data from controller
    this._data = data;

    // Generate Markup of the show recipe
    const markup = this._generateMarkup();

    // Clear the html of the recipe
    this._clear();

    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    // Get recipe data from controller
    this._data = data;
    // Generate Markup of the show recipe
    const newMarkup = this._generateMarkup();

    // This code will create a virtual DOM so we can track the change
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    // New DOM
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    // Cur DOM
    const curElement = Array.from(this._parentElement.querySelectorAll('*'));

    // Compare the Cur DOM to the Old DOM
    newElements.forEach((newEl, i) => {
      const curEl = curElement[i];
      // console.log(curEl, newEl.isEqualNode(curEl));

      // If the Node of CurEl != New El ( )
      if (!newEl.isEqualNode(curEl)) {
        curEl.innerHTML = newEl.innerHTML;
      }
    });
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  ////////////////////////////////////////

  // This function will render the Spinner.The sipnner runs under the parrent Element

  renderSpinner() {
    this._parentElement.innerHTML = ' ';

    const markup = `
            <div class="spinner">
              <svg>
                <use href="${icons}.svg#icon-loader"></use>
              </svg>
            </div> `;

    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `
        <div class="error">
          <div>
            <svg>
              <use href="${icons}#icon-alert-triangle"></use>
            </svg>
          </div>
          <p>${message}</p>
        </div>`;

    // Clear the HTML before add markup into recipe view
    this._parentElement.innerHTML = '';

    // add Err markup into recipe view
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message) {
    const markup = `
        <div class="message">
          <div>
            <svg>
              <use href="${icons}#icon-smile"></use>
            </svg>
          </div>
          <p>${message}</p>
        </div>`;

    // Clear the HTML before add markup into recipe view
    this._parentElement.innerHTML = '';

    // add Err markup into recipe view
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
