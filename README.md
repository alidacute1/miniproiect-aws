Mini Project – FastAPI + React + PostgreSQL



Dependențe necesare pt rularea proiectului:

\- Python 3.13.15: necesar pt rularea backend-ului realizat cu FastAPI

\- Node.js LTS: necesar pt instalarea dependentelor frontend-ului si pt rularea aplicatiei React/Vite

\- PostgreSQL: sistemul de gestiune a bazei de date utilizat pt stocarea datelor aplicatiei, inclusiv a info despre utilizatori



Variabile de mediu



In folderul "backend" trebuie creat un fisier ".env" care trebuie sa contina:

\-----------------------------------------------------------------------------

DATABASE\_URL=postgresql://USER:PASSWORD@localhost:5432/DATABASE\_NAME

SECRET\_KEY=YOUR\_SECRET\_KEY

\-----------------------------------------------------------------------------



Valorile reale pentru utilizator, parola, baza de date si cheia secreta nu trebuie publicate in repository.



\------------------------

Pornirea backend-ului



\-Deschideti un terminal si intrati in folderul "backend":

&#x20; cmd : 'cd backend'



\-Activati mediul virtual:

&#x20; cmd: 'venv\\Scripts\\activate'



\-Porniti backend-ul:

&#x20; cmd: 'uvicorn main:app --reload'



\-Backend-ul va rula la: 'http://localhost:8000'



\-------------------------

Pornirea frontend-ului



\-Deschideti un al doilea terminal si intrati in folderul "frontend":

&#x20; cmd: 'cd frontend'



\-Instalati dependentele, daca este prima rulare:

&#x20; cmd: 'npm install'



\-Porniti frontend-ul:

&#x20; cmd: 'npm run dev'



\-Frontend-ul va rula la: 'http://localhost:5173'

\------------------------



Backend-ul si frontend-ul trebuie sa ruleze simultan, in terminale separate.

