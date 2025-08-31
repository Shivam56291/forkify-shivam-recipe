import View from './View';
import icons from 'url:../../img/icons.svg';

class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _message = 'Recipe was succefully uploaded :)';

  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');

  constructor() {
    super();
    this._originalMarkup = this._parentElement.innerHTML; // cache initial form
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }

  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');

    // When opening the modal, re-render the default form
    const isOpening = !this._window.classList.contains('hidden');
    if (isOpening) {
      this._resetForm();
    }
  }

  _resetForm() {
    // Replace modal content with original HTML
    this._parentElement.innerHTML = this._originalMarkup;

    // Reattach submit handler for upload after reset
    if (this._uploadHandler) this.addHandlerUpload(this._uploadHandler);
  }

  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }

  _addHandlerHideWindow() {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }

  // PUBLIC: call this from controller (note: no underscore)
  addHandlerUpload(handler) {
    this._uploadHandler = handler;
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }

  _generateMarkup() {}
}

export default new AddRecipeView();
