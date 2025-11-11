READ ME
[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/EBdR9AYf)
# 🌐 Mon Projet Vue.js & Vuetify

## 1. 🎨 Présentation du projet

### Concept
- API choisie et pourquoi : 
	- Nom de l'API : Greek Myth API
	- Pourquoi cette API : j'aime les anciennes religions polythéisme
- Public cible : les personnes qui aime cette religion ou qui veulent en savoir plus 
- Objectifs de l’application : afficher les différents dieux, héros (demi-dieux), titans, monstres et donner une description si possible 

### Fonctionnalités principales
- Affichage d’une liste d’éléments (via API ou les JSON)
- Recherche
- Vue détail
- Fonctionnalité interactive (favoris)
- Persistance locale (favoris ou préférences)

### Aperçu visuel
_(Capture d’écran de l’application)_  
`![Screenshot de l’application](img/screenshot.png)`

---

## 2. 📚 Parcours d'apprentissage

### Ressources utilisées
#### Documentation & tutos
- [Vue 3 Docs](https://vuejs.org/guide/introduction.html)
- [Vuetify Docs](https://vuetifyjs.com/en/components/all/)
- [Pinia Docs](https://pinia.vuejs.org/)
- [Public APIs List](https://github.com/public-apis/public-apis)

#### Progression
- Semaine 1 : création du dépôt GitHub, prise en main de celui-ci, teste de l'API, implémentation de l'API dans le projet
- Semaine 2 : vacances
- Semaine 3 : vacances
- Semaine 4 : affichage des noms des dieux, des héros, des titans et des monstres + supposition que les images ne sont plus disponibles
- Semaine 5 : création des pages pour les divinités + limite d'affichage à 4 divinité dans le menu
- Semaine 6 : ajout des fichier JSON + implémentation de ceux-ci dans le code + ajout des différentes pages + changement du style de la barre de recherche et de l'emplacement des boutons + ajout d'un peu de CSS + local Storage utilisé pour les favoris
- Semaine 7 : mise en place de la vue détaillé des différentes divinités

---

## 3. 🛠️ Outils et méthodologie

### Environnement de développement
- **IDE** : WebStorm
- **Versioning** : Git + GitHub
- **Dépendances principales** : Vue 3, Vuetify 3, Pinia, Axios/Fetch
- **Gestion API Keys** : `.env` + `.env.example`

### Installation & Run
- Cloner le repo : cloner le repo : Git clone https://github.com/divtec-cejef/m294-projet-vuetify-YuriAyato144
- Installer : install npm
- Lancer : npm run dev
- Variables d’environnement : copier `.env.example` → `.env` et compléter les clés nécessaires  

### Méthodologie
- Découpage en composants réutilisables
- Props & Emits clairs
- Store global avec Pinia
- Commits réguliers
- Tests manuels (UI, persistance, erreurs API)

- Nom des variables / constantes clairs

### Choix techniques
- API sélectionnée : Greek Myth API (https://thegreekmythapi.vercel.app/)
- Justification du choix : la mytholigie m'interesse 
- Endpoints utilisés : 
- Limites/quotas connus : ~400 requêtes possible 

### Architecture (Descriptif + schéma simple + data-flow)
- `App.vue` : layout principal  
- `views/` : pages (liste, détail, favoris)  
- Outils utiles : Draw.io

**Data-flow résumé :**  
- Vue déclenche un **event utilisateur** → composant appelle une fonction du **store** →  elles sont repris dans index.vue → depuis index.vue on peut voir les détails.vue, favoris.vue ou les divinités 

---

## 4. 🧪 Tests et validation

### Tests techniques
- ✅ Appels API fonctionnels (si l'on a des requêtes)
- ✅ Persistance vérifiée après refresh (localStorage)  
- ✅ Navigation entre les vues OK  
- ✅ La page dynamique [Details].vue affiche les bonne informations
- ✅ Le fichier JSON fonctionne

### Tests d’UX
- Navigation intuitive  
- Recherche/filtre/tri faciles à comprendre  
- Feedback utilisateur (vide)  

### Tests d’accessibilité
- Contraste couleurs (Vuetify par défaut)  
- Labels et placeholders corrects  
- Navigation clavier possible  

### Tests d’erreurs & fallback
- API down → fichier .JSON intégré en cas de problème 
- Liste vide → message clair affiché  
- Recherche sans résultat → affichage “Aucun élément trouvé”  
- ...

---

## 5. 🤖 Usage d’intelligence artificielle

**⚠️ TRANSPARENCE OBLIGATOIRE** : Si vous utilisez une IA, vous DEVEZ :

### IA utilisée
- **Nom** : ChatGPT / Claude  
- **Version** : GPT-5 / Sonnet 4.5  
- **Contexte** : Aide ponctuelle / Génération de code / Debugging  

### Utilisation détaillée
**Domaines d'aide :**
- Aide au code général : 50%
- Génération de snippets Vue/Vuetify : 50%  
- Aide à la structuration du projet : 60%
- Debugging : 70%  
- Recherche d’idées : 0%  

**Compréhension et adaptation**
- Expliquer ce que fait le code généré  
- Dire comment il a été adapté au projet  

### Parties codées manuellement
- Composants principaux : 70% personnel  
- Store & persistance : 50% personnel  
- Routing & navigation : 50% personnel  
- Tests & validation : 100% personnel  

### Apprentissage personnel
- Ce que j’ai appris grâce à l’IA : 
	-  comment faire pour ajouter certaine fonctionnalité (ex: v-if) 
- Comment elle m’a aidé à progresser :
	- debugging lorsque j'étais bloqué

---

## 6. 🎯 Bilan personnel

### Ce que j’ai appris
- Compétences techniques acquises : 
	- comment faire appelle à une API
- Découvertes surprenantes :
	- Vuetify a déjà des icônes intégré 
- Concepts difficiles maîtrisés : 
	- la syntaxe du VueJS

### Difficultés rencontrées
- Problèmes techniques et solutions trouvées :
	- l'API est en anglais j'ai du donc mettre certaines chose en anglais pour une cohérence personnel
- Moments de blocage et dépassement :
	- l'appel à certaine données qui était "un dossier" plus bas
- Aide reçue et sources :
	- Mr. Tirole pour la compréhension de certain problème et son support de cours  

### Réussites et fiertés
- Aspects du projet dont je suis fier :
	- il est dynamique
- Progrès constatés depuis le début :
	- moins de difficulté à réaliser des choses dites simples
- Envies de développement futur :
	- pas encore trouver mais cela ne serait tarder

### Améliorations possibles
- Ce que j’ajouterais avec plus de temps :
	- les images des divinités 
- Fonctionnalités bonus envisagées :
	- voir la descendance sous forme d'arbre 
- Compétences à approfondir :
	- la syntaxe du code

---

## 7. 📚 Références & Sources
- Documentation de l’API : [Greek Myth API](https://thegreekmythapi.vercel.app/)   
- Usage de l’IA : voir section ci-dessus
