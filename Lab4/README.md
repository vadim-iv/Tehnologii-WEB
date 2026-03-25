# 🧮 Calculator Web App (MVC)

## 📌 Descriere

Acest proiect constă în realizarea unei aplicații de tip **calculator** folosind doar:

* HTML
* CSS
* JavaScript (Vanilla)

Aplicația trebuie organizată conform principiilor **MVC (Model - View - Controller)**.

---

## 🎯 Cerințe funcționale

Calculatorul trebuie să permită efectuarea operațiilor de bază și să includă:

* 🔢 Cifrele: `0-9`
* ➕ Operații matematice:

  * Adunare (`+`)
  * Scădere (`-`)
  * Înmulțire (`*`)
  * Împărțire (`/`)
* 🟰 Buton pentru calcul rezultat (`=`)
* ❌ Buton de reset (`C` sau `AC`)
* 🖥️ Afișarea:

  * Expresiei curente
  * Rezultatului
* ⚠️ Tratarea erorilor (ex: împărțirea la 0)

---

## 🧱 Arhitectura MVC

Aplicația trebuie împărțită în trei componente principale:

### 🧠 Model (model.js)

Responsabil pentru logica aplicației.

**Conține:**

* Valorile curente:

  * `operand1`
  * `operand2`
  * `operator`
  * `displayValue`

**Funcționalități:**

* Metode pentru actualizarea valorilor
* Reguli de calcul
* Validare minimă (ex: prevenirea rezultatelor invalide)

---

### 🎨 View (view.js + HTML + CSS)

Responsabil pentru interfața utilizator.

**Include:**

* Structura HTML a calculatorului
* Stilizarea folosind CSS
* Afișarea rezultatului și a expresiei

---

### 🎮 Controller (controller.js)

Responsabil pentru interacțiunea utilizatorului.

**Funcționalități:**

* Ascultă acțiunile utilizatorului (click pe butoane)
* Decide ce metode din Model sunt apelate
* Actualizează View-ul în funcție de modificări

---

## 📁 Structura proiectului

Proiectul trebuie organizat în următoarele fișiere:

```
index.html
style.css
model.js
view.js
controller.js
```

---

## ✅ Obiectiv

Realizarea unei aplicații funcționale de calculator care:

* respectă arhitectura MVC
* are cod organizat și modular
* oferă o interfață clară și ușor de utilizat
* gestionează corect operațiile matematice și erorile

---

## 🚀 Opțional (bonus)

* Design modern și responsive
* Animații pentru butoane
* Suport pentru tastatură

---

## 📌 Observații

* Nu se folosesc librării externe
* Codul trebuie să fie clar și ușor de înțeles
* Se recomandă comentarea funcțiilor importante

---

## 🏁 Rezultat final

O aplicație de calculator complet funcțională, rulabilă direct în browser.
