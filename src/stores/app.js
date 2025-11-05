import { defineStore } from 'pinia'
// importation de l'API
// import api from '@/plugins/axios'

export const useAppStore = defineStore('app', {
  state: () => ({
    isLoading: false,
    error: null,
    gods: [],
    heroes: [],
    titans: [],
    monsters: [],
  }),
  getters: {
    hasGods: state => state.gods.length > 0,
    totalGods: state => state.gods.length,
    hasHeroes: state => state.heroes.length > 0,
    totalHeroes: state => state.heroes.length,
    hasTitans: state => state.titans.length > 0,
    totalTitans: state => state.titans.length,
    hasMonsters: state => state.monsters.length > 0,
    totalMonsters: state => state.monsters.length,
  },
  actions: {
    // appelle à l'API
    // async fetchGods () {
    //   try {
    //     const response = await api.get('/gods')
    //     this.gods = response.data.Gods
    //   } catch (error) {
    //     this.error = error
    //   }
    // },
    // async fetchHeroes () {
    //   try {
    //     const response = await api.get('/heroes')
    //     this.heroes = response.data.Heroes
    //   } catch (error) {
    //     this.error = error
    //   }
    // },
    // async fetchTitans () {
    //   try {
    //     const response = await api.get('/titans')
    //     this.titans = response.data.Titans
    //   } catch (error) {
    //     this.error = error
    //   }
    // },
    // async fetchMonsters () {
    //   try {
    //     const response = await api.get('/monsters')
    //     this.monsters = response.data.Monsters
    //   } catch (error) {
    //     this.error = error
    //   }
    // },

    // appelle aux fichier JSON
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
    async init () {
      await this.fetchGods()
      await this.fetchHeroes()
      await this.fetchTitans()
      await this.fetchMonsters()
      await this.fetchGodsJSON()
      await this.fetchHeroesJSON()
      await this.fetchTitansJSON()
      await this.fetchMonstersJSON()
      console.log('Ressources intialisées')
    },
  },
})
