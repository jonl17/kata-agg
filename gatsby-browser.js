import './src/styles/tailwind.css'

const shouldUpdateScroll = ({ routerProps: { location } }) => {
  if (location.pathname === '/') {
    return false
  }
  return true
}

export { shouldUpdateScroll }
