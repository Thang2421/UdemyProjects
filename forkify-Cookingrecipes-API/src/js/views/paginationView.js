import Views from './View';
import icons from 'url:../../img/icons.svg';

class PaginationView extends Views {
  _parentElement = document.querySelector('.pagination');

  addHanderCick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');

      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    // Calculate the number of pages base on Results length and results per page
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultPerPage,
    );
    // Page 1, and there are other pages
    if (curPage === 1 && numPages > 1) {
      console.log('Page 1 and others');
      return `
      <button data-goto="${curPage + 1}" class="btn--inline pagination__btn--next">
         <span>Page ${curPage + 1}</span>
         <svg class="search__icon">
           <use href="${icons}#icon-arrow-right"></use>
         </svg>
      </button>`;
    }

    // Last page
    if (curPage === numPages && numPages > 1) {
      console.log('Last page');
      return `
      <button data-goto="${curPage - 1}" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${curPage - 1}</span>
      </button>`;
    }

    // Other page
    if (curPage < numPages) {
      console.log('Other page');
      return `
      <button data-goto="${curPage - 1}" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${curPage - 1}</span>
      </button>
      
      <button data-goto="${curPage + 1}" class="btn--inline pagination__btn--next">
         <span>Page ${curPage + 1}</span>
         <svg class="search__icon">
           <use href="${icons}#icon-arrow-right"></use>
         </svg>
      </button>`;
    }

    // Page 1, and there are NO other pages

    return '';
  }
}

export default new PaginationView();
