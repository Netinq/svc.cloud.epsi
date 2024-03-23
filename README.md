# Atelier service cloub EPSI i1
## Prérequis
- NodeJS (version >= 18)
- NPM
- Base de données MongoDB avec le jeu de données "sample_mflix"
## Installation de l'application next
Clone du dépôt git en local
```shell
git clone https://github.com/Netinq/svc.cloud.epsi
```
Aller dans le dépôt local
```shell
cd svc.cloud.epsi
```
Installation des dépendances
```shell
npm i
```
> [!TIP]
> Vous pouvez utiliser les jeux de données de test fourni par MongoDB atlas !
Mise en place des variables d'environnement dans un fichier `.env`
```shell
MONGODB_URI=mongodb+srv://[user]:[password]@[adress]/?retryWrites=true&w=majority
```
Lancement de l'application en mode développement
```shell
npm run dev
```
# Conception
## Services `./core/services/*`
Deux services ont été créé pour ce projet : un pour les films et un autre pour les commentaires. Ces services servent à récupérer les données depuis la base de données.

## Utilitaires `./core/utils/*`
Un util assez simple a été créé afin d'établir la connexion à la base de données. Il est consommé par les deux services.

## Routes `./pages/*`
### Swagger
Un Swagger a été réalisé afin de pouvoir tester et documenter l'ensemble des routes de l'application. Lorsque vous lancez le projet next, vous pouvez accéder au swagger via la route http://localhost:3000/swagger.

### Les routes api
Différentes routes ont été créé selon le standard OpenAPI permettant d'avoir un CRUD complet pour les films et les commentaires.