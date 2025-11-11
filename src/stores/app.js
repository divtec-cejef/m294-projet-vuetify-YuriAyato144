import { defineStore } from 'pinia'
// import api from '@/plugins/axios.js' // Optionnel : pour appeler une API externe

export const useAppStore = defineStore('app', {
  // État (state)
  state: () => ({
    isLoading: false, // Booléen pour indiquer le chargement des données
    error: null, // Stocke une erreur éventuelle
    gods: [], // Tableau des dieux
    heroes: [], // Tableau des héros
    titans: [], // Tableau des titans
    monsters: [], // Tableau des monstres
    favorites: JSON.parse(localStorage.getItem('favorites')) || [], // Favoris persistés
  }),

  // Getters (propriétés calculées)
  getters: {
    hasGods: state => state.gods.length > 0, // Vérifie si des dieux sont chargés
    totalGods: state => state.gods.length, // Compte des dieux
    hasHeroes: state => state.heroes.length > 0, // Vérifie si des héros sont chargés
    totalHeroes: state => state.heroes.length, // Compte des héros
    hasTitans: state => state.titans.length > 0, // Vérifie si des titans sont chargés
    totalTitans: state => state.titans.length, // Compte des titans
    hasMonsters: state => state.monsters.length > 0, // Vérifie si des monstres sont chargés
    totalMonsters: state => state.monsters.length, // Compte des monstres

    // Récupérer tous les favoris avec leurs données complètes
    getFavorites () {
      return this.favorites
        .map(fav => {
          let item = null
          // Selon le type, on récupère l'objet complet
          switch (fav.type) {
            case 'god': {
              item = this.gods.find(g => g.id === fav.id)
              break
            }
            case 'hero': {
              item = this.heroes.find(h => h.id === fav.id)
              break
            }
            case 'titan': {
              item = this.titans.find(t => t.id === fav.id)
              break
            }
            case 'monster': {
              item = this.monsters.find(m => m.id === fav.id)
              break
            }
          }
          // Si trouvé, ajouter le type
          return item ? { ...item, type: fav.type } : null
        })
        .filter(item => item !== null) // Supprimer les éléments non trouvés
    },

    // Vérifier si un élément est favori
    isFavorite: state => (id, type) => {
      return state.favorites.some(fav => fav.id === id && fav.type === type)
    },
  },

  // Actions (méthodes)

  actions: {
    // Charger les données depuis JSON
    async fetchGodsJSON () {
      this.error = null
      try {
        const response = await fetch('src/data/gods.json')
        const data = await response.json()
        let godsArray = []
        if (Array.isArray(data)) {
          godsArray = data
        } else if (data && Array.isArray(data.results)) {
          godsArray = data.results
        } else {
          godsArray = data
        }
        this.gods = godsArray
        console.log('Gods chargés depuis le JSON :', this.gods)
      } catch (error) {
        this.error = error
        console.log('Erreur fetchGodsJSON :', error)
      }
    },

    async fetchHeroesJSON () {
      this.error = null
      try {
        const response = await fetch('src/data/heroes.json')
        const data = await response.json()
        let heroesArray = []
        if (Array.isArray(data)) {
          heroesArray = data
        } else if (data && Array.isArray(data.results)) {
          heroesArray = data.results
        } else {
          heroesArray = data
        }
        this.heroes = heroesArray
        console.log('Heroes chargés depuis le JSON :', this.heroes)
      } catch (error) {
        this.error = error
        console.log('Erreur fetchHeroesJSON :', error)
      }
    },

    async fetchTitansJSON () {
      this.error = null
      try {
        const response = await fetch('src/data/titans.json')
        const data = await response.json()
        let titansArray = []
        if (Array.isArray(data)) {
          titansArray = data
        } else if (data && Array.isArray(data.results)) {
          titansArray = data.results
        } else {
          titansArray = data
        }
        this.titans = titansArray
        console.log('Titans chargés depuis le JSON :', this.titans)
      } catch (error) {
        this.error = error
        console.log('Erreur fetchTitansJSON :', error)
      }
    },

    async fetchMonstersJSON () {
      this.error = null
      try {
        const response = await fetch('src/data/monsters.json')
        const data = await response.json()
        let monstersArray = []
        if (Array.isArray(data)) {
          monstersArray = data
        } else if (data && Array.isArray(data.results)) {
          monstersArray = data.results
        } else {
          monstersArray = data
        }
        this.monsters = monstersArray
        console.log('Monsters chargés depuis le JSON :', this.monsters)
      } catch (error) {
        this.error = error
        console.log('Erreur fetchMonstersJSON :', error)
      }
    },

    // Initialiser toutes les ressources
    async init () {
      // Pour appeler depuis l'API (commenté pour l'instant)
      // await this.fetchGods()
      // await this.fetchHeroes()
      // await this.fetchTitans()
      // await this.fetchMonsters()

      // Appel des fichiers JSON
      await this.fetchGodsJSON()
      await this.fetchHeroesJSON()
      await this.fetchTitansJSON()
      await this.fetchMonstersJSON()
      console.log('Ressources initialisées')
    },

    // Gérer les favoris
    toggleFavorite (id, type) {
      const index = this.favorites.findIndex(
        fav => fav.id === id && fav.type === type,
      )
      if (index === -1) {
        // Ajouter aux favoris
        this.favorites.push({ id, type })
      } else {
        // Retirer des favoris
        this.favorites.splice(index, 1)
      }
      // Sauvegarder dans localStorage
      localStorage.setItem('favorites', JSON.stringify(this.favorites))
    },

    // Optionnel : vider tous les favoris
    // clearAllFavorites() {
    //   this.favorites = []
    //   localStorage.setItem('favorites', JSON.stringify([]))
    // },
  },
})
