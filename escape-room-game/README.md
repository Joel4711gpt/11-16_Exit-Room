# Escape Room Browser-Spiel

Dieses Mini-Projekt ist ein prototypisches Escape-Room-Spiel für den Browser. Die Spielerin bzw. der Spieler muss fünf Rätsel in nur 60 Sekunden lösen, indem verschiedene Objekte im Raum in der richtigen Reihenfolge angeklickt werden. Sobald alle Hinweise entschlüsselt wurden, öffnet sich die Tür und der Raum ist geschafft.

## Verwendete Technologien
- HTML5 für die Struktur der Benutzeroberfläche
- CSS3 für Layout und visuelle Darstellung
- Vanilla JavaScript für Spiel-Logik, Timer und Audio-Steuerung
- JSON für die Szenenbeschreibung (Objekte, Positionen und Rätsel)

## Einrichtung & Nutzung
1. Lade oder klone dieses Repository.
2. Ersetze die Platzhalterbilder und -audiodateien im Ordner `assets/` durch echte Medien.
3. Öffne `index.html` in einem modernen Browser – es wird kein zusätzlicher Build-Schritt benötigt.
4. Starte das Spiel und versuche, die Rätsel innerhalb von 60 Sekunden zu lösen!

## Projektstruktur
```
escape-room-game/
├── assets/
│   ├── audio/
│   └── images/
├── scenes/
│   └── scene1.json
├── app.js
├── index.html
├── style.css
└── README.md
```

## Erweiterungsideen
- Weitere Szenen mit anderen Objekt-Anordnungen und Rätseln hinzufügen.
- Animierte Übergänge oder Partikeleffekte beim Lösen von Rätseln integrieren.
- Inventarsystem ausbauen, sodass mehrere Gegenstände kombiniert werden können.
- Zusätzliche Timer oder Schwierigkeitsgrade (z. B. mehr Zeit im Einsteiger-Modus) anbieten.
- Mobile-Responsiveness verbessern und Touch-Steuerung optimieren.
