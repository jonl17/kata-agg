import { useRef, useEffect } from 'react'

export function useInView(
  onInView: () => void,
  onOutOfView: () => void
): React.MutableRefObject<null> {
  const element = useRef(null)

  useEffect(() => {
    if (element.current) {
      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              onInView()
            } else {
            }
          })
        },
        { threshold: [0.5] }
      )
      observer.observe(element.current)
      // @ts-ignore
      return () => observer.unobserve(element.current)
    }
  }, [])

  return element
}
