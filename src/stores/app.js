import { defineStore } from 'pinia'
// importation de l'API
import api from '@/plugins/axios'

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
    hasHeroes: state => state.heros.length > 0,
    totalHeroes: state => state.heros.length,
    hasTitans: state => state.titans.length > 0,
    totalTitans: state => state.titans.length,
    hasMonsters: state => state.monsters.length > 0,
    totalMonsters: state => state.monsters.length,
  },
  actions: {
    async fetchGods () {
      try {
        const response = await api.get('/gods')
        this.gods = response.data.Gods
      } catch (error) {
        this.error = error
      }
    },
    async fetchHeroes () {
      try {
        const response = await api.get('/heroes')
        this.heroes = response.data.Heroes
      } catch (error) {
        this.error = error
      }
    },
    async fetchTitans () {
      try {
        const response = await api.get('/titans')
        this.titans = response.data.Titans
      } catch (error) {
        this.error = error
      }
    },
    async init () {
      await this.fetchGods()
      await this.fetchHeroes()
      await this.fetchTitans()
      console.log('Ressources intialisées')
    },
  },
})
