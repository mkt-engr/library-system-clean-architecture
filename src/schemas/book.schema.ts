import { z } from 'zod'

export const BookSchema = z.object({
  id: z.string().uuid(),
  isbn: z.string().regex(/^978-\d{1,5}-\d{1,7}-\d{1,7}-\d{1}$/),
  title: z.string().min(1).max(200),
  author: z.string().min(1).max(100),
  publisher: z.string().min(1).max(100),
  publishedDate: z.date(),
  category: z.enum(['Fiction', 'Non-Fiction', 'Science', 'Technology', 'History', 'Art', 'Other']),
  totalCopies: z.number().int().positive(),
  availableCopies: z.number().int().min(0),
  location: z.string().optional(),
})

export type Book = z.infer<typeof BookSchema>

export const CreateBookSchema = BookSchema.omit({ id: true, availableCopies: true })
export type CreateBook = z.infer<typeof CreateBookSchema>