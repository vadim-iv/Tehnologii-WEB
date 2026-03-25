/*
  Modelul gestionează toată logica de business și starea internă a calculatorului.
  Păstrează operand1, operand2, operator și displayValue, validează operațiile
  (inclusiv împărțirea la 0), execută calculele și oferă metode clare pentru reset
  și pentru construirea expresiei afișate în interfață.
*/

export class CalculatorModel {
  constructor() {
    this.reset();
  }

  reset() {
    this.operand1 = null;
    this.operand2 = null;
    this.operator = null;
    this.displayValue = "0";
    this.resultValue = null;
    this.waitingForSecondOperand = false;
    this.errorMessage = "";
  }

  setNumber(digit) {
    if (this.errorMessage) {
      this.reset();
    }

    if (this.waitingForSecondOperand) {
      this.displayValue = digit;
      this.waitingForSecondOperand = false;
      return;
    }

    this.displayValue =
      this.displayValue === "0" ? digit : this.displayValue + digit;
  }

  setOperator(nextOperator) {
    if (this.errorMessage) {
      return;
    }

    const inputValue = Number(this.displayValue);

    if (this.operand1 === null) {
      this.operand1 = inputValue;
    } else if (this.operator && !this.waitingForSecondOperand) {
      this.operand2 = inputValue;
      const computation = this.compute(
        this.operand1,
        this.operand2,
        this.operator,
      );

      if (!computation.success) {
        this.errorMessage = computation.message;
        this.displayValue = "0";
        this.resultValue = null;
        return;
      }

      this.operand1 = computation.value;
      this.displayValue = this.formatNumber(computation.value);
      this.resultValue = this.displayValue;
    }

    this.operator = nextOperator;
    this.waitingForSecondOperand = true;
  }

  calculate() {
    if (
      this.errorMessage ||
      this.operator === null ||
      this.waitingForSecondOperand
    ) {
      return;
    }

    this.operand2 = Number(this.displayValue);
    const computation = this.compute(
      this.operand1,
      this.operand2,
      this.operator,
    );

    if (!computation.success) {
      this.errorMessage = computation.message;
      this.displayValue = "0";
      this.resultValue = null;
      return;
    }

    this.displayValue = this.formatNumber(computation.value);
    this.resultValue = this.displayValue;

    this.operand1 = computation.value;
    this.operand2 = null;
    this.operator = null;
    this.waitingForSecondOperand = true;
  }

  compute(firstValue, secondValue, operator) {
    if (operator === "/" && secondValue === 0) {
      return {
        success: false,
        message: "Eroare: Împărțire la 0",
      };
    }

    const operations = {
      "+": (a, b) => a + b,
      "-": (a, b) => a - b,
      "*": (a, b) => a * b,
      "/": (a, b) => a / b,
    };

    const operation = operations[operator];

    if (!operation) {
      return {
        success: false,
        message: "Eroare: Operator invalid",
      };
    }

    return {
      success: true,
      value: operation(firstValue, secondValue),
    };
  }

  getExpressionText() {
    if (this.errorMessage) {
      return "-";
    }

    if (this.operator) {
      return `${this.formatNumber(this.operand1)} ${this.operator} ${this.waitingForSecondOperand ? "" : this.displayValue}`.trim();
    }

    if (this.resultValue !== null) {
      return `Rezultat: ${this.resultValue}`;
    }

    return this.displayValue;
  }

  getResultText() {
    return this.errorMessage ? this.errorMessage : this.displayValue;
  }

  hasError() {
    return Boolean(this.errorMessage);
  }

  formatNumber(value) {
    if (value === null || value === undefined || Number.isNaN(value)) {
      return "0";
    }

    return Number.isInteger(value)
      ? String(value)
      : String(Number(value.toFixed(8)));
  }
}
