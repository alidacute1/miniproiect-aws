
Variabile de mediu:

In radacina proiectului trebuie creat un fisier ".env" care sa contina:

-----------------------------------------------------------------------------
DATABASE_URL=postgresql://USER:PASSWORD@db:5432/DATABASE_NAME
SECRET_KEY=YOUR_SECRET_KEY
VITE_API_URL=http://YOUR_PUBLIC_IP:8000
FRONTEND_ORIGIN=http://YOUR_PUBLIC_IP:3000
-----------------------------------------------------------------------------

"YOUR_PUBLIC_IP" trebuie inlocuit cu IP-ul public sau Elastic IP-ul instantei EC2.

Valorile reale si cheia secreta nu trebuie publicate in repository.

-----------------------
Rulare pe AWS

-Intrati in folderul proiectului:
  cmd: 'cd miniproiect-aws'

-Porniti toate serviciile (frontend, backend, db, job) cu:
  cmd: 'docker compose up -d --build'

-Verificati serviciile cu:
  cmd: 'docker compose ps'

-Frontend-ul este disponibil la:
  'http://YOUR_PUBLIC_IP:3000'

-Backend-ul este disponibil la:
  'http://YOUR_PUBLIC_IP:8000'

-----------------------
Verificare job:

-Job-ul ruleaza automat la un interval de 5 minute si salveaza rezultatele in baza de date

-Rularile pot fi verificate prin:
  GET 'http://YOUR_PUBLIC_IP:8000/admin/job-status'

-Endpoint-ul necesita autentificare cu un token JWT valid

-Rezultatele pot fi vizualizate si in interfata aplicatiei, in sectiunea "Job Status" din pagina de profil
