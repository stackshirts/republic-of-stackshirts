import _uniqBy from 'lodash/uniqBy'
import { z } from 'zod'

export const TimestampSchema = z.object({
  seconds: z.number(),
  nanoseconds: z.number(),
})

export const LogoSchema = z.object({
  svg: z.string().optional(), // This is a sparse field (only used in updates)

  name: z.string().nonempty(),
  pathname: z.string(),
  src: z.string(),
  height: z.number(),
  width: z.number(),
})

export const ColorSchema = z.object({
  name: z.string().nonempty(),
  hex: z.string().nonempty(),
})
  .refine((v) => {
    return v.hex.startsWith('#')
  }, {
    message: 'Hex value must start with #'
  })

export const ProductSchema = z.object({
  id: z.string().nonempty(),
  type: z.literal('products'),
  attributes: z.object({
    name: z.string(),
    colors: z.array(ColorSchema).min(1),
    logos: z.array(LogoSchema).min(1)
      .refine((v) => {
        return _uniqBy(v, 'name').length === v.length
      }, {
        message: 'Logos must have unique names'
      }),
    package: z.object({
      manager: z.string().optional(),
      packageId: z.string().optional(),
    }),
    url: z.string(),
    githubUrl: z.string().optional(),
    updatedOn: TimestampSchema,
    createdOn: TimestampSchema,
  }),
  relationships: z.object({
    productLabels: z.record(z.object({
      id: z.string(),
      type: z.literal('productLabels'),
      addedOn: TimestampSchema
    }))
  }),
})
