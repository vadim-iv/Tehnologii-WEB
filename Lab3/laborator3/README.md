# Laborator 3 - HTTP, Cookies și Sesiuni — Răspunsuri Teoretice

## Partea 1: Analiza Protocolului HTTP

### 1.1 Întrebări Teoretice

---

#### 1. Care sunt cele 4 metode HTTP principale și când se folosește fiecare?

| Metoda     | Scop                                           | Când se folosește                                                                                                                                                                                   |
| ---------- | ---------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **GET**    | Obținerea/citirea unei resurse de pe server    | Când se dorește accesarea unei pagini web, descărcarea unei imagini, citirea datelor dintr-un API. NU modifică datele de pe server. Parametrii sunt transmiși prin URL (query string).              |
| **POST**   | Crearea unei resurse noi pe server             | Când se trimite un formular de înregistrare, se încarcă un fișier, sau se creează o înregistrare nouă într-o bază de date. Datele sunt transmise în corpul (body) cererii.                          |
| **PUT**    | Actualizarea completă a unei resurse existente | Când se dorește înlocuirea integrală a unei resurse. De exemplu, actualizarea tuturor câmpurilor unui profil de utilizator. Este idempotent (poate fi apelat de mai multe ori cu același rezultat). |
| **DELETE** | Ștergerea unei resurse de pe server            | Când se dorește eliminarea unei resurse, precum ștergerea unui cont de utilizator sau a unui articol. Este de asemenea idempotent.                                                                  |

---

#### 2. Ce semnifică codurile de status: 200, 301, 400, 401, 403, 404, 500?

| Cod                           | Categorie               | Semnificație                                                                                                                                                           |
| ----------------------------- | ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **200 OK**                    | ✅ Succes (2xx)         | Cererea a fost procesată cu succes. Serverul returnează resursa solicitată.                                                                                            |
| **301 Moved Permanently**     | 🔄 Redirecționare (3xx) | Resursa a fost mutată permanent la o altă adresă URL. Browser-ul va redirecționa automat la noul URL și va reține acest lucru pentru cererile viitoare.                |
| **400 Bad Request**           | ❌ Eroare client (4xx)  | Cererea este malformată sau conține date invalide. Serverul nu poate procesa cererea din cauza unei greșeli din partea clientului (ex: JSON invalid, parametri lipsă). |
| **401 Unauthorized**          | 🔒 Eroare client (4xx)  | Clientul nu este autentificat. Cererea necesită credențiale valide (username/parolă, token). Utilizatorul trebuie să se autentifice pentru a accesa resursa.           |
| **403 Forbidden**             | 🚫 Eroare client (4xx)  | Clientul este autentificat, dar nu are permisiunea de a accesa resursa. Diferit de 401 — serverul știe cine ești, dar nu îți permite accesul.                          |
| **404 Not Found**             | 🔍 Eroare client (4xx)  | Resursa solicitată nu a fost găsită pe server. URL-ul nu corespunde niciunei resurse existente.                                                                        |
| **500 Internal Server Error** | 💥 Eroare server (5xx)  | A apărut o eroare neprevăzută pe server. Problema este de partea serverului, nu a clientului. Poate fi cauzată de bug-uri în cod, probleme de configurare, etc.        |

---

#### 3. Care este diferența între HTTP și HTTPS?

| Criteriu              | HTTP                                                                                 | HTTPS                                                                                              |
| --------------------- | ------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------- |
| **Denumire completă** | HyperText Transfer Protocol                                                          | HyperText Transfer Protocol **Secure**                                                             |
| **Port implicit**     | 80                                                                                   | 443                                                                                                |
| **Criptare**          | ❌ Datele sunt transmise în text clar (plaintext)                                    | ✅ Datele sunt criptate folosind TLS/SSL                                                           |
| **Certificate**       | Nu necesită certificat                                                               | Necesită certificat SSL/TLS emis de o Autoritate de Certificare (CA)                               |
| **Securitate**        | Vulnerabil la atacuri man-in-the-middle (MITM), interceptare, modificări ale datelor | Protejează împotriva interceptării și modificării datelor în tranzit                               |
| **Performanță**       | Ușor mai rapid (fără overhead de criptare)                                           | Overhead minim datorită criptării, dar neglijabil cu hardware modern                               |
| **Utilizare**         | Site-uri fără date sensibile (rar recomandat astăzi)                                 | Standard pentru toate site-urile moderne, obligatoriu pentru date sensibile (autentificare, plăți) |
| **Indicator browser** | ⚠️ Browserele marchează site-ul ca "Not Secure"                                      | 🔒 Browserele afișează iconița de lacăt și marchează conexiunea ca sigură                          |

**Pe scurt:** HTTPS = HTTP + criptare TLS/SSL. HTTPS asigură **confidențialitatea** (datele nu pot fi citite de terți), **integritatea** (datele nu pot fi modificate în tranzit) și **autentificarea** (confirmă identitatea serverului).

---

### 1.2 & 1.3 — Exerciții Practice

Aceste secțiuni necesită screenshot-uri din Developer Tools (F12 → Network) și din consolă.
Se vor atașa separat ca imagini.
