import { parseAsJson }    from 'nuqs'
import { parseAsArrayOf } from 'nuqs'
import { z }              from 'zod'

const sortingSchema = z.object({
  id: z.string(),
  desc: z.boolean(),
})

export const parseAsSortingState = parseAsArrayOf(parseAsJson(sortingSchema.parse)).withDefault([])
