import create from 'zustand'

export type ContentType = JSX.Element | string

interface IFooterStore {
  content: ContentType
  toggleContent: (c: ContentType) => void
}

const useFooterStore = create<IFooterStore>(set => ({
  content: '',
  toggleContent: (c: ContentType) =>
    set(() => ({
      content: c,
    })),
}))

export { useFooterStore }
export type { IFooterStore }
