import { describe, it, expect } from 'vitest'
import { BookSchema, CreateBookSchema } from './book.schema'

describe('BookSchema', () => {
  it('正しい書籍オブジェクトを検証できる', () => {
    const validBook = {
      id: '550e8400-e29b-41d4-a716-446655440000',
      isbn: '978-4-274-22629-7',
      title: 'Clean Architecture',
      author: 'Robert C. Martin',
      publisher: "O'Reilly Media",
      publishedDate: new Date('2017-09-20'),
      category: 'Technology',
      totalCopies: 5,
      availableCopies: 3,
      location: 'A-1-3',
    }

    const result = BookSchema.safeParse(validBook)
    expect(result.success).toBe(true)
  })

  it('無効なISBNフォーマットを拒否する', () => {
    const invalidBook = {
      id: '550e8400-e29b-41d4-a716-446655440000',
      isbn: '123-456-789',
      title: 'Test Book',
      author: 'Test Author',
      publisher: 'Test Publisher',
      publishedDate: new Date(),
      category: 'Fiction',
      totalCopies: 1,
      availableCopies: 1,
    }

    const result = BookSchema.safeParse(invalidBook)
    expect(result.success).toBe(false)
  })

  it('無効なカテゴリを拒否する', () => {
    const invalidBook = {
      id: '550e8400-e29b-41d4-a716-446655440000',
      isbn: '978-4-274-22629-7',
      title: 'Test Book',
      author: 'Test Author',
      publisher: 'Test Publisher',
      publishedDate: new Date(),
      category: 'InvalidCategory',
      totalCopies: 1,
      availableCopies: 1,
    }

    const result = BookSchema.safeParse(invalidBook)
    expect(result.success).toBe(false)
  })

  it('利用可能冊数が負の値を拒否する', () => {
    const invalidBook = {
      id: '550e8400-e29b-41d4-a716-446655440000',
      isbn: '978-4-274-22629-7',
      title: 'Test Book',
      author: 'Test Author',
      publisher: 'Test Publisher',
      publishedDate: new Date(),
      category: 'Fiction',
      totalCopies: 5,
      availableCopies: -1,
    }

    const result = BookSchema.safeParse(invalidBook)
    expect(result.success).toBe(false)
  })
})

describe('CreateBookSchema', () => {
  it('idとavailableCopiesなしで書籍作成を検証できる', () => {
    const newBook = {
      isbn: '978-4-274-22629-7',
      title: 'Domain-Driven Design',
      author: 'Eric Evans',
      publisher: 'Addison-Wesley',
      publishedDate: new Date('2003-08-22'),
      category: 'Technology',
      totalCopies: 3,
    }

    const result = CreateBookSchema.safeParse(newBook)
    expect(result.success).toBe(true)
  })

  it('CreateBookSchemaにidフィールドを含まない', () => {
    const newBook = {
      isbn: '978-4-274-22629-7',
      title: 'Test Book',
      author: 'Test Author',
      publisher: 'Test Publisher',
      publishedDate: new Date(),
      category: 'Fiction',
      totalCopies: 3,
    }

    const result = CreateBookSchema.safeParse(newBook)
    expect(result.success).toBe(true)
    
    // idフィールドは無視される（strictモードではない場合）
    const newBookWithId = {
      ...newBook,
      id: '550e8400-e29b-41d4-a716-446655440000',
    }
    
    const resultWithId = CreateBookSchema.safeParse(newBookWithId)
    expect(resultWithId.success).toBe(true)
  })
})