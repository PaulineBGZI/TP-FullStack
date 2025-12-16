# Contexte du projet – Le Paradis des Cookies

Le Paradis des Cookies est une entreprise artisanale spécialisée dans la fabrication de cookies moelleux faits maison et personnalisables. Dans un marché où les grandes chaînes comme **La Mie Câline** ou **Paul** ainsi que les pâtisseries locales proposent des produits souvent standardisés ou peu personnalisables, l’objectif du projet est de se démarquer grâce à **l’originalité**, **la personnalisation** et **la fidélisation client**.

Le site web devient alors un élément important pour proposer une expérience moderne et accessible. Il met en avant un concept unique : offrir des cookies personnalisés mais aussi une expérience inédite grâce aux **pépites colorées** cachées dans certains cookies qui permettent d’obtenir des réductions.

# Fonctionnalité principale du projet

La fonctionnalité principale du site web est la **personnalisation complète des cookies et de leurs boîtes** directement en ligne.

Les utilisateurs peuvent :  
- Choisir un cookie artisanal
- Sélectionner des décorations ou des motifs personnalisés
- Personnaliser l’emballage avec un message ou un design
- Commander en ligne avec une livraison rapide grâce aux partenaires locaux

# Schéma d'architecture
![Architecture de l'application](./images/schema_architecture.drawio.png)

# Répartition des services

Le projet est organisé en plusieurs blocs :

- **API Gateway** : Sert de point d’entrée pour toutes les requêtes externes. Elle redirige les requêtes vers les services appropriés et gère la sécurité, le routage et l’agrégation des réponses.
- **User Service** : Gère tout ce qui concerne les utilisateurs : création de compte, authentification... Il interagit directement avec la base de données des utilisateurs.
- **Commands Service** : Prend en charge la gestion des commandes : création, suivi, historique... Il est responsable des commandes des clients.
- **Front-app** : Application React qui gère l’interface utilisateur. Elle communique avec l’API Gateway pour toutes les opérations : authentification, gestion des commandes, personnalisation des cookies...

# Choix technologiques

- **Base de données** : Nous avons choisi PostgreSQL afin de gérer de manière fiable les données liées aux commandes personnalisées, aux clients et aux éléments de fidélisation (pépites colorées, réductions, historiques d’achats). La gestion des identifiants via des UUID permet l’unicité des commandes et des utilisateurs. De plus, l’utilisation de types comme citext permet d’éviter les doublons comme les adresses e-mail ce qui améliore la cohérence des données clients.

- **Accès aux données** : Nous avons utilisé le module natif `PG` de Node.js afin de garder un contrôle total sur nos requêtes SQL pour gérer des cas métiers spécifiques comme la personnalisation des cookies, l’association des décorations ou encore l’attribution des réductions via les pépites colorées. Cela offre de meilleures performances et une plus grande flexibilité qu’un ORM en particulier pour faire évoluer le schéma de la base de données en fonction des nouvelles fonctionnalités du site.

- **Frontend** : Nous avons choisi React pour créer une interface interactive et fluide afin d'accompagner l’utilisateur tout au long du processus de personnalisation des cookies et des boîtes. L’utilisation de Chakra UI et TailwindCSS permet de concevoir une interface moderne, cohérente et responsive tout en facilitant le visuel des produits et des options de personnalisation.

# Guide d'installation

Pour l'installation du projet, il est nécessaire d'avoir Docker d'installer sur votre ordinateur.

Une fois le prochain en local, lancez les commandes suivantes pour initialiser les containeurs.

```docker
docker compose up --build
```

# Exportation des données

Pour exporter les données de la base, il est nécessaire d'employer des commandes qui requêtent aux bases d'exporter les données, nous allons cible un fichier SQL qui sera créer à l'exécution de la commande.

```cmd
docker exec -t postgres_user pg_dump -U postgres userdb > userdb_export.sql
```
```powershell
docker exec -t postgres_commands pg_dump -U postgres commandsdb > commandsdb_export.sql
```
