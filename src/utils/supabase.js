import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL, 
    import.meta.env.VITE_SUPABASE_ANON_KEY,
)


export { supabase }


export const formActionDefault = {
    formProcess: false,
    formStatus: 200,
    formErrorMessage: '',
    formSuccessMessage: ''
}

export const isAuthenticated = () => {
    const { data, error } = supabase.auth.getSession()
  
    if (error) {
      console.error('Error getting session:', error.message)
      return false
    }
    return !!data.session
  }