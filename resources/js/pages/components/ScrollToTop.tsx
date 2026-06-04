import { router } from '@inertiajs/react'
import { useEffect } from 'react'

export default function ScrollToTop() {
  useEffect(() => {
    const removeListener = router.on('navigate', () => {
      window.scrollTo({ top: 0, behavior: 'instant' })
    })

    return removeListener
  }, [])

  return null
}
