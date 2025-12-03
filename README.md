// ...existing code...

# Mini API Catalogue — mode d'emploi pour le professeur

Ce dépôt contient :
- une petite API Node.js (point d'entrée : `server.js`, routes dans `routes/`)
- un dossier de tests Python : `python-tests/` (tests unitaires pour `operation.py`)

Objectif : permettre au professeur d'installer, lancer l'API localement et vérifier que les tests Python passent.

## Prérequis (Windows)
- Node.js + npm (https://nodejs.org/)
- Python 3.x (https://www.python.org/)
- pip (fourni avec Python)
- PowerShell ou Windows Terminal
- (Optionnel) Visual Studio Code

## Structure principale
- server.js — point d'entrée de l'API Node.js
- routes/ — routes de l'API
- package.json — dépendances et scripts Node
- python-tests/
  - operation.py — fonctions testées (addition, maximum, format_nom)
  - test.py — tests unitaires (renommer en `test_operation.py` pour pytest)

## Installation (depuis la racine du projet)
Ouvrir PowerShell et se placer dans le dossier du projet :
```powershell
cd C:\Users\T-Plug\Desktop\mini-api-catalogue

Lancement de l'API Node.js
Depuis la racine du projet :

# si [package.json](http://_vscodecontentref_/0) définit "start"
npm start

# ou si vous avez nodemon et un script dev
npm run dev
L'API sera accessible à l'adresse indiquée dans server.js (par défaut : http://localhost:3000).

Endpoints principaux
GET /api/categories - liste des catégories

GET /api/categories/:id - récupérer une catégorie

POST /api/categories - créer une catégorie (body: { name })

PUT /api/categories/:id - modifier une catégorie

DELETE /api/categories/:id - supprimer une catégorie

GET /api/products - liste produits (option: ?category=ID)

GET /api/products/:id - récupérer un produit

POST /api/products - créer un produit (body: { name, price, categoryId })

PUT /api/products/:id - modifier un produit

DELETE /api/products/:id - supprimer un produit

Exécuter les tests Python (méthode recommandée : pytest)
Aller dans le dossier des tests :
cd C:\Users\T-Plug\Desktop\mini-api-catalogue\python-tests

Installer pytest (global ou dans un virtualenv) :

python -m pip install --user -U pytest

Lancer pytest :
python -m pytest -q

Remarque : pytest détecte par défaut les fichiers test_*.py ou *_test.py. Si le fichier s'appelle test.py, soit l'exécuter directement (python test.py), soit le renommer en test_operation.py.

Exécuter les tests sans pytest
Depuis python-tests :
python test.py

Sortie attendue (si tout passe) :
Tous les tests passent

Problèmes courants et solutions rapides
"Missing script: test" avec npm : vérifier package.json ou utiliser npm start.
pytest ne trouve pas test.py : renommer le fichier en test_operation.py.
Erreur d'import Python : assurez-vous d'être dans le dossier python-tests ou d'avoir le bon PYTHONPATH.
