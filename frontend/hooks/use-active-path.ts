'use client'

import { usePathname } from 'next/navigation'

export function useActivePath() {
  const pathname = usePathname()

  return (path: string, exact = true) => {
    const normalizedPathname = pathname.endsWith('/') && pathname !== '/'
      ? pathname.slice(0, -1)
      : pathname
    const normalizedPath = path.endsWith('/') && path !== '/'
      ? path.slice(0, -1)
      : path

    if (exact) {
      return normalizedPathname === normalizedPath
    }

    return normalizedPathname === normalizedPath ||
           normalizedPathname.startsWith(normalizedPath + '/')
  }
}
