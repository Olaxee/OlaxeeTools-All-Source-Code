# Serveur IP Privée - Localhost

Ce projet démarre un serveur HTTP local qui détecte et affiche ton adresse IP privée.

---

## Prérequis

- Python 3 installé et accessible via la commande `python` dans le terminal (ou PowerShell).
- Windows (pour utiliser les scripts `.bat` fournis).

---

## Fichiers importants

- `server.py` : script Python du serveur.
- `Launch.bat` : ouvre la page web dans le navigateur.
- `LaunchFull.bat` : lance le serveur Python puis ouvre la page web.

---

## Comment lancer le serveur et accéder à la page

### Option 1 : Lancer manuellement le serveur puis ouvrir la page

1. Ouvre un terminal (cmd, PowerShell) dans le dossier contenant `server.py`.
2. Lance le serveur avec la commande suivante : python server.py
3. Double-clique sur `Launch.bat` pour ouvrir la page dans ton navigateur à l'adresse : [http://localhost:8000](http://localhost:8000)
4. Pour arrêter le serveur, ferme la fenêtre terminal ou fais `Ctrl + C`.

### Option 2 : Lancer le serveur ET ouvrir la page automatiquement

1. Double-clique sur `LaunchFull.bat`.
2. Le script lance le serveur en arrière-plan, attend 2 secondes puis ouvre la page dans ton navigateur.
3. Pour arrêter le serveur, ferme la fenêtre terminal qui a été ouverte par le script.

---

## Fonctionnalités

- Affiche l'IP privée détectée via socket UDP.
- Bouton "Réessayer" pour rafraîchir la détection.
- Scroll désactivé pour éviter les défilements inutiles.
- Messages d’erreur clairs en cas de problème.
- Texte discret en bas à gauche et à droite avec infos supplémentaires.

---

## Remarques

- Ce serveur est prévu pour un usage local uniquement.
- `Launch.bat` ne lance pas le serveur, il ouvre simplement la page dans le navigateur.
- `LaunchFull.bat` lance le serveur en tâche de fond puis ouvre la page.
- Assure-toi que Python est installé et accessible dans le PATH.
- En cas de problème, lance le serveur manuellement via la ligne de commande.

---

## Contact

Créé par Olaxee.
