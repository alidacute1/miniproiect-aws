\# Mini Project – FastAPI + React + PostgreSQL



Aplicație full-stack realizată cu FastAPI, React și PostgreSQL, care permite înregistrarea utilizatorilor, autentificarea cu JWT, accesarea unei pagini protejate și logout.



\## 1. Dependențe necesare



Pentru rularea proiectului sunt necesare:



\- Python 3.11 sau mai nou

\- Node.js LTS

\- PostgreSQL



Versiunile instalate pot fi verificate cu:



```cmd

python --version

node --version

psql --version

```



\## 2. Configurarea backend-ului



Deschideți un terminal și intrați în folderul backend:



```cmd

cd backend

```



Dacă mediul virtual nu există, creați-l:



```cmd

python -m venv venv

```



Activați mediul virtual:



```cmd

venv\\Scripts\\activate

```



Instalați dependențele necesare:



```cmd

pip install fastapi uvicorn sqlalchemy psycopg2-binary "passlib\[bcrypt]" "python-jose\[cryptography]" python-dotenv

```



Pentru compatibilitatea cu `passlib`:



```cmd

pip uninstall bcrypt -y

pip install bcrypt==4.0.1

```



\## 3. Configurarea PostgreSQL



PostgreSQL trebuie să fie instalat și pornit.



Conexiunea poate fi verificată cu:



```cmd

psql -h localhost -U postgres

```



Baza de date utilizată de aplicație trebuie să existe înainte de pornirea backend-ului.



\## 4. Variabile de mediu



În folderul `backend` creați un fișier numit:



```text

.env

```



Acesta trebuie să conțină variabilele de mediu necesare proiectului, fără a publica valorile reale:



```env

DATABASE\_URL=postgresql://USER:PASSWORD@localhost:5432/DATABASE\_NAME

SECRET\_KEY=YOUR\_SECRET\_KEY

```



Înlocuiți:



\- `USER` cu utilizatorul PostgreSQL;

\- `PASSWORD` cu parola PostgreSQL;

\- `DATABASE\_NAME` cu numele bazei de date;

\- `YOUR\_SECRET\_KEY` cu o cheie secretă proprie.



Fișierul `.env` nu trebuie publicat în repository.



\## 5. Pornirea backend-ului



Din folderul `backend`, cu mediul virtual activat, executați:



```cmd

uvicorn main:app --reload

```



Backend-ul va rula la:



```text

http://localhost:8000

```



\## 6. Configurarea frontend-ului



Deschideți un al doilea terminal și intrați în folderul frontend:



```cmd

cd frontend

```



Instalați dependențele:



```cmd

npm install

```



Comanda `npm install` instalează automat dependențele frontend-ului definite în `package.json`, inclusiv React Router.



\## 7. Pornirea frontend-ului



Din folderul `frontend` executați:



```cmd

npm run dev

```



Frontend-ul va fi disponibil, în mod normal, la:



```text

http://localhost:5173

```



Backend-ul și frontend-ul trebuie să ruleze simultan, în două terminale separate.



\## 8. Utilizarea aplicației



După pornirea backend-ului și frontend-ului, accesați:



```text

http://localhost:5173

```



Aplicația permite:



\- crearea unui cont nou;

\- autentificarea utilizatorului;

\- accesarea profilului utilizatorului autentificat;

\- menținerea autentificării cât timp token-ul JWT este valid;

\- logout și revenirea la pagina de autentificare.



\## Pornire rapidă



\### Backend



Deschideți primul terminal:



```cmd

cd backend

venv\\Scripts\\activate

uvicorn main:app --reload

```



\### Frontend



Deschideți un al doilea terminal:



```cmd

cd frontend

npm install

npm run dev

```



Apoi accesați aplicația la:



```text

http://localhost:5173

```

