/*
  View-ul controlează exclusiv partea de interfață: citește elementele din DOM,
  afișează expresia curentă, rezultatul și mesajele de eroare, plus feedback vizual
  pentru operatorul activ și pentru apăsarea butoanelor (mouse sau tastatură).
*/

export class CalculatorView {
  constructor() {
    this.expressionElement = document.getElementById("expression");
    this.resultElement = document.getElementById("result");
    this.keysContainer = document.querySelector(".keys");
    this.allButtons = Array.from(document.querySelectorAll(".btn"));
  }

  bindButtonClick(handler) {
    this.keysContainer.addEventListener("click", (event) => {
      const target = event.target.closest("button");
      if (!target) {
        return;
      }

      const action = target.dataset.action;
      const value = target.dataset.value || "";

      this.animatePress(target);
      handler({ action, value });
    });
  }

  bindKeyboard(handler) {
    window.addEventListener("keydown", (event) => {
      const keyMap = {
        "+": { action: "operator", value: "+" },
        "-": { action: "operator", value: "-" },
        "*": { action: "operator", value: "*" },
        "/": { action: "operator", value: "/" },
        Enter: { action: "equals", value: "=" },
        "=": { action: "equals", value: "=" },
        Escape: { action: "clear", value: "AC" },
        c: { action: "clear", value: "AC" },
        C: { action: "clear", value: "AC" },
      };

      const numericKey = /^\d$/.test(event.key)
        ? { action: "number", value: event.key }
        : null;

      const mapped = numericKey || keyMap[event.key];
      if (!mapped) {
        return;
      }

      event.preventDefault();
      this.flashButtonForAction(mapped.action, mapped.value);
      handler(mapped);
    });
  }

  render(expression, result, isError) {
    this.expressionElement.textContent = expression || "0";
    this.resultElement.textContent = result || "0";
    this.resultElement.classList.toggle("error", isError);
  }

  highlightOperator(operator) {
    this.clearOperatorHighlight();

    if (!operator) {
      return;
    }

    const activeButton = this.allButtons.find(
      (button) =>
        button.dataset.action === "operator" &&
        button.dataset.value === operator,
    );

    if (activeButton) {
      activeButton.classList.add("active");
    }
  }

  clearOperatorHighlight() {
    this.allButtons.forEach((button) => button.classList.remove("active"));
  }

  animatePress(button) {
    button.classList.add("is-pressed");
    window.setTimeout(() => button.classList.remove("is-pressed"), 120);
  }

  flashButtonForAction(action, value) {
    const matchingButton = this.allButtons.find((button) => {
      if (action === "number") {
        return (
          button.dataset.action === "number" && button.dataset.value === value
        );
      }
      if (action === "operator") {
        return (
          button.dataset.action === "operator" && button.dataset.value === value
        );
      }
      return button.dataset.action === action;
    });

    if (matchingButton) {
      this.animatePress(matchingButton);
    }
  }
}
