# PolyTrain

Web-Anwendung zum Planen und Speichern von Reisen mit ÖV, Übernachtungen, Sehenswürdigkeiten und Notizen.  
Nutzer können Verbindungen suchen (via [transport.opendata.ch](https://transport.opendata.ch)),
Reisen mit mehreren Etappen anlegen, speichern und verwalten.

Projekt im Rahmen von TEKO Webtechnologie.

## Tech Stack

| Bereich   | Technologie                                                        |
| --------- | ------------------------------------------------------------------ |
| Frontend  | React 19, Vite, Tailwind CSS, shadcn/ui, SWR, React Router         |
| Backend   | Node.js, Express 5, Mongoose                                       |
| Datenbank | MongoDB                                                            |
| Auth      | JWT, bcryptjs                                                      |
| Externe API | transport.opendata.ch (öV-Verbindungen & Haltestellen)          |

## Projektstruktur

```
poly-train/
├── client/   # React-Frontend (Vite)
├── server/   # Express-Backend + MongoDB
└── bruno/    # API-Collection für den Bruno API-Client
```

## Voraussetzungen

- Node.js 20+ und npm
- Eine MongoDB-Instanz (lokal oder z. B. MongoDB Atlas)

## Installation

Backend und Frontend haben je eigene Abhängigkeiten:

```bash
# Backend
cd server
npm install

# Frontend
cd ../client
npm install
```

## Konfiguration (.env)

### Server (`server/.env`)

| Variable      | Beschreibung                                        | Beispiel                                      |
| ------------- | --------------------------------------------------- | --------------------------------------------- |
| `PORT`        | Port des Backend-Servers (Standard: `3000`)         | `3000`                                        |
| `MONGODB_URI` | Verbindungs-String zur MongoDB                      | `mongodb://localhost:27017/polytrain`         |
| `JWT_SECRET`  | Geheimer Schlüssel zum Signieren der JWT-Tokens     | `ein-langer-zufälliger-string`                |

Beispiel `server/.env`:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/polytrain
JWT_SECRET=ein-langer-zufälliger-string
```

### Client (`client/.env`)

Der Client benötigt nur den Port des Backends, damit der Vite-Dev-Proxy die
Anfragen an `/api` und `/auth` weiterleiten kann. Der Wert muss mit `PORT` im
Server übereinstimmen.

| Variable | Beschreibung                                | Beispiel |
| -------- | ------------------------------------------- | -------- |
| `PORT`   | Port des Backends (für den Vite-Dev-Proxy)  | `3000`   |

Beispiel `client/.env`:

```env
PORT=3000
```

> Hinweis: `.env`-Dateien enthalten Geheimnisse und dürfen nicht ins Git-Repo
> eingecheckt werden. Wähle für `JWT_SECRET` einen langen, zufälligen Wert.

## Entwicklung starten

In zwei Terminals:

```bash
# Terminal 1 – Backend (mit Auto-Reload via nodemon)
cd server
npm run dev

# Terminal 2 – Frontend (Vite Dev-Server)
cd client
npm run dev
```

Das Frontend ist danach unter der von Vite ausgegebenen URL (Standard
`http://localhost:5173`) erreichbar. Anfragen an `/api` und `/auth` werden
automatisch an das Backend weitergeleitet.

## Produktion (Build)

```bash
# Frontend bauen
cd client
npm run build      # Ausgabe in client/dist

# Backend starten
cd ../server
npm start
```

## API-Überblick

Basis-Pfade: `/auth` (Authentifizierung) und `/api` (geschützt, JWT nötig).

| Methode | Endpoint                       | Beschreibung                         | Auth |
| ------- | ------------------------------ | ------------------------------------ | :--: |
| POST    | `/auth/register`               | Nutzer registrieren                  |  –   |
| POST    | `/auth/login`                  | Login, liefert JWT                   |  –   |
| POST    | `/auth/logout`                 | Logout                               |  –   |
| GET     | `/api/journeys`                | Alle Reisen des Nutzers              |  ✓   |
| GET     | `/api/journeys/:id`            | Einzelne Reise                       |  ✓   |
| POST    | `/api/journeys`                | Reise speichern                      |  ✓   |
| PUT     | `/api/journeys/:id`            | Reise aktualisieren                  |  ✓   |
| DELETE  | `/api/journeys/:id`            | Reise löschen                        |  ✓   |
| GET     | `/api/public-transport/stations`    | Haltestellen suchen (öV-API)    |  ✓   |
| GET     | `/api/public-transport/connections` | Verbindungen abfragen (öV-API)  |  ✓   |
| PUT     | `/api/user/avatar-style`       | Avatar-Stil des Nutzers ändern       |  ✓   |

Geschützte Endpoints erwarten den Header `Authorization: Bearer <token>`.

Die vollständige API-Collection liegt im Ordner `bruno/` und kann mit dem
[Bruno](https://www.usebruno.com/) API-Client geöffnet werden.

## Lizenz

MIT
