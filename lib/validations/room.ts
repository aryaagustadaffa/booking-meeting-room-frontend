import { z } from 'zod'

export const createRoomSchema = z.object({
  name: z.string().min(1, 'Room name is required').min(3, 'Room name must be at least 3 characters'),
  // description: z.string().min(1, 'Description is required').min(10, 'Description must be at least 10 characters'),
  capacity: z.coerce.number().min(1, 'Capacity must be at least 1'),
  location: z.string().min(1, 'Location is required'),
  // facilities: z.array(z.string()).min(1, 'At least one facility is required'),
})

export type CreateRoomFormData = z.infer<typeof createRoomSchema>

export const updateRoomSchema = createRoomSchema.partial()

export type UpdateRoomFormData = z.infer<typeof updateRoomSchema>
