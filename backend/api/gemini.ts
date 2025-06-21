import { Elysia } from 'elysia'

export const geminiPlugin = new Elysia({ prefix: '/gemini' })
  .get('/', () => 'hello from gemini') 