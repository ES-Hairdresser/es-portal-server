# APP STRUCTURE

## ENV SETUP

- [x] Database setup
- [x] Server setup

## MODELLI

### Modello appuntamento

- [ ] data
- [ ] trattamento -> seleziona da modello trattamenti
- [ ] note
- [ ] utente -> - seleziona da lista utenti se admin, dati utente pre caricati se customer

### Modello utente

- [x] admin/customer
- [x] foto profilo
- [x] nome, cognome, email, password
- [x] note sull'utente (visibile solo agli admin)

### Modello trattamento

- [x] nome trattamento
- [x] tipologia (uomo, donna, bambino)
- [x] prezzo
- [x] categoria
- [x] target

### Modello categoria ? -> da aggiungere

## SCHEMI/RESOLVERS

### Resolvers utente

- [x] login utente
- [x] registra utente  
- [ ] aggiungi utente (manuale)
- [ ] modifica utente
- [ ] cancella utente
- [x] visualizza dettagli utente
- [x] visualizza tutti gli utenti

### Resolvers appuntamento

- [ ] nuovo appuntamento
- [ ] modifica appuntamento
- [ ] cancella appuntamento
- [ ] tutti gli appuntamenti
- [ ] dettagli appuntamento

### Resolvers trattamento

- [x] nuovo
- [ ] modifica
- [ ] cancella
- [x] tutti
- [x] dettagli

## DASHBOARD CUSTOMER

- [ ] Main
- [ ] prossimo appuntamento
- [ ] statistiche appuntamenti
- [ ] storico appuntamenti

### Customer Sidebar

- [ ] discovery ( vedi sopra )
- [ ] nuovo appuntamento

Impostazioni utente

- [ ] dati
- [ ] modifica dati
- [ ] preferiti -> lista appuntamenti preferiti, accesso rapido

## DASHBOARD ADMIN

- [ ] statistiche trattamenti
- [ ] lista appuntamenti

### Admin Sidebar

- [ ] discovery ( vedi sopra)
- [ ] lista trattamenti
- [ ] ordina per categorie

Aggiungi

- [ ] appuntamento
- [ ] trattamento
- [ ] utente

Impostazioni utente

- [ ] dati
- [ ] modifica dati
