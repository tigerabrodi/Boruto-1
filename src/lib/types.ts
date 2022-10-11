import { z } from 'zod'

export type ArticleType = {
  uid: string
  text: string
  title: string
  subtitle: string
  readMin: string
  coverUrl: string
  articleId: string
  timestamp: {
    seconds: number
    nanoseconds: number
  }
}

export type UserType = {
  pin: string
  bio: string
  age: string
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

export type LikeType = {
  likeUid: string
  article: string
  likeId: string
}
