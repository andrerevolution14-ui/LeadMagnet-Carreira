export interface Lead {
  id: string
  email: string
  created_at: string
  status: 'pending' | 'completed' | 'failed'
  kit_sent: boolean
  download_count: number
}

export interface Database {
  public: {
    Tables: {
      leads: {
        Row: Lead
        Insert: Omit<Lead, 'id' | 'created_at'>
        Update: Partial<Omit<Lead, 'id' | 'created_at'>>
      }
    }
  }
}

