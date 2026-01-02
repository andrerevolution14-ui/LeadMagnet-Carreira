// Custom analytics tracking
// Logs to console in dev, stores in localStorage in production

export type AnalyticsEvent = 
  | 'button_click'
  | 'modal_open'
  | 'email_submit'
  | 'kit_sent'
  | 'conversion'

export interface AnalyticsData {
  [key: string]: any
}

export function trackEvent(event: AnalyticsEvent, data?: AnalyticsData) {
  const timestamp = new Date().toISOString()
  const eventData = {
    event,
    timestamp,
    ...data,
  }

  // In development, log to console
  if (process.env.NODE_ENV === 'development') {
    console.log('[Analytics]', eventData)
  }

  // In production, store in localStorage
  if (typeof window !== 'undefined') {
    try {
      const existingEvents = JSON.parse(
        localStorage.getItem('analytics_events') || '[]'
      )
      existingEvents.push(eventData)
      
      // Keep only last 100 events
      const recentEvents = existingEvents.slice(-100)
      localStorage.setItem('analytics_events', JSON.stringify(recentEvents))
    } catch (error) {
      console.error('Error storing analytics event:', error)
    }
  }
}

export function getAnalyticsEvents(): Array<{ event: AnalyticsEvent; timestamp: string; [key: string]: any }> {
  if (typeof window === 'undefined') return []
  
  try {
    return JSON.parse(localStorage.getItem('analytics_events') || '[]')
  } catch {
    return []
  }
}

export function clearAnalytics() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('analytics_events')
  }
}

