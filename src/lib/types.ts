import { z } from 'zod'

export type ArticleType = {
  uid: string
  text: string
  title: string
  subtitle: string
  readMin: string
  coverUrl: string
  articleId: string
}

export type UserType = {
  bio: string
  age: string
  uid: string
  fullname: string
  location: string
  username: string
  avatarUrl: string
  profileId: string
  createdAt: {
    seconds: number
    nanoseconds: number
  }
}

export type ParamsType = {
  id: string | undefined
}

export const TimestampSchema = z.object({
  seconds: z.number(),
  nanoseconds: z.number(),
})
export type Timestamp = z.infer<typeof TimestampSchema>
