Estimare costuri AWS

1. Link public AWS Pricing Calculator:
https://calculator.aws/#/estimate?id=6a2ff2612aa88c583bd0186b334197ab5820aacf 


2.  Tabel estimarea osturilor
Serviciu Local |          	Ipoteza |                               Cost estimat/luna
AWS Fargate Backend     	0.25 vCPU / 0.5 GB x 730h       	10.37 $/mo 
AWS Fargate Job         	0.25 vCPU / 0.5 GB x 2920 min/mo	1.66 $/mo
Amazon ECR(1GB data storage)    1 GB storage                            0.10 $/mo    
|no inbound|no outbound data
Amazon CloudWatch       	1 GB logs persistent data/mo    	0.63 $/mo
AWS Secrets Manager     	2 secrets                       	0.85 $/mo     
Application Load Balancer      (assuming about 10000 api calls/mo)
(Elastic Load Balancing)	Trafic redus, deme(0.01 GB/h)    	19.77 $/mo
Total	                                                        	33.38 $/mo

3. Intrebari
1).De ce nu costă la fel „mereu pornit" și „pornit periodic"? 
Backend-ul costă mai mult pentru că rulează tot timpul, aproximativ 730 de ore pe luna, iar AWS taxează resursele folosite pe perioada
în care containerul este pornit. Job-ul rulează doar 2 minute la fiecare 15 minute deci este pornit doar pentru timpul necesar de lucru
și în rest nu consumă resurse plătite.
Funcția sleep() nu eliberează resursele alocate așa că costul va rămâne constant.

2).De ce Postgres și frontend-ul nu sunt neapărat pe AWS.
PostgreSQL și frontend-ul nu trebuie neapărat să fie pe AWS, deoarece pot fi găzduite și pe alte servicii și pot comunica cu backend-ul
prin internet. Pentru un demo, servicii precum Supabase pentru baza de date și Vercel sau Netlify pentru frontend pot fi mai simplu 
de configurat și mai ieftine. Mutarea lor pe AWS ar avea mai mult sens dacă aplicația ar crește și s-ar dori ca toate componentele 
aplicației să fie în aceeași infrastructură și să fie administrate mai ușor. Spre exemplu aceste servicii de hostare pot cădea 
din anumite motive. Având toate componentele într-un singur ecosystem, reducem riscul de a întâmpina probleme precum un serviciu să 
fie down/ indisponibil (baza de date) și altul să fie up/ disponibil (frontend-ul), caz în care aplicația se încarcă, dar anumite 
funcționalități nu pot fi utilizare.

Exemplu cost:
Supabase Free:  0$/mo, include o bază PostgreSQL de până la 500 MB, o instanță până la 500 MB RAM și trafic inclus. 
Suficient pentru un proiect mic.

Amazon RDS for PostgrSQL: costul depinde de configurația aleasă. O configurație enterprise poate ajunge la aproximativ 
1,493.93 USD / mo, inclusiv 20GB storage Enterprise level.


