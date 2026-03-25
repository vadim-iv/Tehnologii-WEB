/*
  Controller-ul conectează Modelul cu View-ul și gestionează toată interacțiunea.
  Primește input din click-uri și tastatură, decide ce acțiune execută în model,
  apoi sincronizează imediat interfața cu starea nouă pentru un flux clar, predictibil
  și ușor de extins în aplicații MVC mai mari.
*/

import { CalculatorModel } from "./model.js";
import { CalculatorView } from "./view.js";

class CalculatorController {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.view.bindButtonClick(this.handleInput.bind(this));
    this.view.bindKeyboard(this.handleInput.bind(this));

    this.updateView();
  }

  handleInput({ action, value }) {
    switch (action) {
      case "number":
        this.model.setNumber(value);
        break;
      case "operator":
        this.model.setOperator(value);
        break;
      case "equals":
        this.model.calculate();
        break;
      case "clear":
        this.model.reset();
        break;
      default:
        break;
    }

    this.updateView();
  }

  updateView() {
    this.view.render(
      this.model.getExpressionText(),
      this.model.getResultText(),
      this.model.hasError(),
    );

    if (this.model.hasError()) {
      this.view.clearOperatorHighlight();
    } else {
      this.view.highlightOperator(this.model.operator);
    }
  }
}

const model = new CalculatorModel();
const view = new CalculatorView();

new CalculatorController(model, view);
