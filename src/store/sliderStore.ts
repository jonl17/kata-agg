import create from 'zustand'

interface ISliderStore {
  focused?: number
  toggleFocused: (f: number) => void
}

const useSliderStore = create<ISliderStore>(set => ({
  toggleFocused: (f: number) =>
    set(() => ({
      focused: f,
    })),
}))

export { useSliderStore }
