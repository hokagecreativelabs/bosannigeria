import * as React from "react"

const MOBILE_BREAKPOINT = 768

// Keep the original function for backward compatibility
export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}

// Add the function that is being imported in other components
export function useMediaQuery(query: string) {
  const [matches, setMatches] = React.useState<boolean>(false)

  React.useEffect(() => {
    const mediaQuery = window.matchMedia(query)
    const updateMatches = () => setMatches(mediaQuery.matches)
    
    // Set initial value
    updateMatches()
    
    // Listen for changes
    mediaQuery.addEventListener("change", updateMatches)
    
    // Cleanup
    return () => mediaQuery.removeEventListener("change", updateMatches)
  }, [query])

  return matches
}
