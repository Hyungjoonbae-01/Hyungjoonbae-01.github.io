import { Elysia } from 'elysia'
import { supabase } from '../utils/db'

export const patientPlugin = new Elysia({ prefix: '/patients' }).get('/', async () => {
  const { data, error } = await supabase.from('patients').select()

  if (error) {
    console.error('Error fetching patients:', error)
    return new Response('Error fetching patients', { status: 500 })
  }

  return data
})
