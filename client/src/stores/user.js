
import create from 'zustand'

export const useUserStore = create((set) => ({
  name: 'Rodny',
  email: 'r@g.com',
  coins: 0,
  
  setName: name => set({name}),
  setEmail: name => set({email}),
  setCoins: coins => set({coins}),
}));