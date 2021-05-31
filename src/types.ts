import {
  ColorSchema,
  ProductSchema,
  LogoSchema,
  TimestampSchema
} from 'src/schemas';
import { z } from 'zod'

export type TimestampType = z.infer<typeof TimestampSchema>
export type ProductType = z.infer<typeof ProductSchema>
export type LogoType = z.infer<typeof LogoSchema>
export type UpdatedLogoType = z.infer<typeof LogoSchema>
export type ColorType = z.infer<typeof ColorSchema>

export type ProductIdsQueryType = string[]
