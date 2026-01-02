'use client'

import { useEffect } from 'react'
import { trackEvent } from '@/lib/analytics'

export function Analytics() {
  useEffect(() => {
    // Track page view
    trackEvent('button_click', { action: 'page_view', page: '/' })
  }, [])

  return null
}

