# Capital Cinema 🎬 - Proiect Final Tehnologii Web

**Capital Cinema** este o platformă web modernă destinată gestionării cinematografelor și rezervării biletelor de către clienți. Proiectul a fost dezvoltat ca o soluție completă ce îmbină un design premium de tip *glassmorphism* cu un sistem de administrare robust și securizat.

---

## 🚀 Instrucțiuni de Rulare

După ce ați descărcat proiectul de pe GitHub, urmați acești pași pentru a-l rula local. Aplicația necesită rularea simultană a backend-ului (PHP) și a frontend-ului (Vite/Dev Server).

1. **Instalare Dependențe Frontend:**
   Deschideți un terminal în rădăcina proiectului și rulați:
   ```bash
   npm install
   ```

2. **Pornire Backend (Terminal 1):**
   ```bash
   php -S localhost:8000
   ```

3. **Pornire Frontend (Terminal 2):**
   ```bash
   npm run dev
   ```

4. **Accesare:** Deschideți browser-ul la adresa afișată în Terminalul 2 (de regulă [http://localhost:5173](http://localhost:5173)).
   *Notă: Asigurați-vă că serverul PHP rulează pe portul 8000 pentru ca API-urile să fie funcționale.*

5. **Date de logare Admin (pentru testare):**
   - **Email:** `admin@cinema.com`
   - **Parolă:** `admin123`

---

## 📊 Îndeplinirea Cerințelor Proiectului

### 1. Operațiuni CRUD (Implementate în Panoul Admin)
Proiectul include funcționalități CRUD complete pentru patru entități majore, gestionate într-o interfață responsive:
- **Filme:** Adăugare, editare, ștergere și vizualizare catalog.
- **Programări (Show-times):** Gestionarea orelor de difuzare pentru fiecare film.
- **Utilizatori:** Administrarea conturilor, schimbarea rolurilor (Admin/User) și actualizarea datelor de profil.
- **Rezervări:** Vizualizarea centralizată a tuturor biletelor vândute și posibilitatea de anulare/ștergere.

### 2. Complexitatea Funcționalităților
- **Sistem de Rezervare Interactiv:** Utilizatorul poate selecta locurile dintr-o sală reprezentată grafic sub formă de romb (9 rânduri).
- **Harta Locurilor Dinamică:** Backend-ul generează și actualizează o hartă JSON pentru fiecare proiecție, asigurând sincronizarea în timp real a disponibilității.
- **Dashboard Admin Multi-Tab:** Trecere instantanee între secțiuni fără reîncărcarea paginii.

### 3. Calitatea Codului PHP
- **Arhitectură API:** Comunicarea între frontend și backend se face exclusiv prin endpoint-uri RESTful (`backend/api/`).
- **PDO & Prepared Statements:** Toate interogările către baza de date SQLite folosesc parametri pregătiți pentru a preveni orice tentativă de SQL Injection.
- **Tranzacții SQL:** Utilizate în procesul de rezervare și anulare pentru a asigura consistența datelor (ex: eliberarea locului în hartă simultan cu ștergerea rezervării).

### 4. Elemente de Securitate
- **Hashing Parole:** Utilizarea algoritmului `BCRYPT` pentru stocarea securizată a parolelor.
- **Validare Regex:** Verificarea riguroasă a numărului de telefon (10-15 cifre) și a parolelor (minim 8 caractere, obligatoriu o literă și o cifră).
- **Protecție Admin:** Contul de administrator principal este protejat împotriva ștergerii sau modificării rolului, atât din UI cât și din backend.
- **Restricții Admin:** Panoul de administrare este optimizat pentru Desktop și este restricționat pe dispozitivele mobile pentru a preveni erorile de operare.

### 5. AJAX (Asynchronous JavaScript and XML)
- Întreaga aplicație funcționează asincron. Folosirea funcției `fetch()` permite încărcarea filmelor, procesarea plăților fictive și actualizarea dashboard-ului fără a face refresh la pagină.

### 6. Utilizare Cookies & Sesiuni
- **Autentificare:** Gestionată prin `session_start()` și cookie-ul standard `PHPSESSID`.
- **Persistență:** Utilizatorul rămâne logat între navigări, iar datele de sesiune sunt stocate în siguranță pe server, nu în browser.

---

## 🛠️ Structură Proiect
- **`/backend`**: Logica server-side, conexiunea la baza de date și fișierul SQLite.
- **`/src/js`**: Module JavaScript pentru logica de interfață, AJAX și manipulare DOM.
- **`/src/styles`**: Design-ul aplicației (Vanilla CSS).
- **`index.html`**: Pagina principală a clienților.
- **`admin.html`**: Panoul de control (CRUD Dashboard).

---

## 👨‍💻 Autor
Proiect realizat pentru disciplina **Proiectarea Interfețelor Grafice**.
