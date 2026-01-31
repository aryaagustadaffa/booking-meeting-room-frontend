'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import { createRoomSchema, type CreateRoomFormData } from '@/lib/validations/room'
import { roomService } from '@/services/room.service'
import type { CreateRoomRequest, Room, RoomPhoto, RoomPhotosResponse, UpdateRoomRequest } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  Building2,
  Camera,
  Edit,
  Image as ImageIcon,
  Loader2,
  MapPin,
  Plus,
  Star,
  Trash2,
  Upload,
  Users,
  X
} from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

export default function AdminRoomsPage() {
  const queryClient = useQueryClient()
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null)
  const [uploadingPhotos, setUploadingPhotos] = useState<string[]>([])

  const { data: roomsData, isLoading } = useQuery({
    queryKey: ['rooms'],
    queryFn: () => roomService.getRooms(),
  })

  const createMutation = useMutation({
    mutationFn: (data: CreateRoomRequest) => roomService.createRoom(data),
    onSuccess: () => {
      toast.success('Room created successfully!')
      setIsCreateDialogOpen(false)
      queryClient.invalidateQueries({ queryKey: ['rooms'] })
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create room')
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateRoomRequest }) =>
      roomService.updateRoom(id, data),
    onSuccess: () => {
      toast.success('Room updated successfully!')
      setIsEditDialogOpen(false)
      setSelectedRoom(null)
      queryClient.invalidateQueries({ queryKey: ['rooms'] })
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update room')
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => roomService.deleteRoom(id),
    onSuccess: () => {
      toast.success('Room deleted successfully!')
      setIsDeleteDialogOpen(false)
      setSelectedRoom(null)
      queryClient.invalidateQueries({ queryKey: ['rooms'] })
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete room')
    },
  })

  const uploadPhotoMutation = useMutation({
    mutationFn: ({ roomId, file, isCover }: { roomId: string; file: File; isCover: boolean }) =>
      roomService.uploadRoomPhoto(roomId, file, isCover),
    onSuccess: (_, variables) => {
      toast.success('Photo uploaded successfully!')
      setUploadingPhotos(prev => prev.filter(name => name !== variables.file.name))
      queryClient.invalidateQueries({ queryKey: ['rooms'] })
      queryClient.invalidateQueries({ queryKey: ['room-photos', variables.roomId] })
    },
    onError: (error: Error, variables) => {
      toast.error(error.message || 'Failed to upload photo')
      setUploadingPhotos(prev => prev.filter(name => name !== variables.file.name))
    },
  })

  const deletePhotoMutation = useMutation({
    mutationFn: ({ roomId, photoId }: { roomId: string; photoId: string }) =>
      roomService.deleteRoomPhoto(roomId, photoId),
    onSuccess: (_, variables) => {
      toast.success('Photo deleted successfully!')
      queryClient.invalidateQueries({ queryKey: ['rooms'] })
      queryClient.invalidateQueries({ queryKey: ['room-photos', variables.roomId] })
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete photo')
    },
  })

  const setCoverMutation = useMutation({
    mutationFn: (photoId: string) =>
      roomService.setCoverPhoto(photoId),
    onSuccess: () => {
      toast.success('Cover photo updated!')
      queryClient.invalidateQueries({ queryKey: ['rooms'] })
      queryClient.invalidateQueries({ queryKey: ['room-photos'] })
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to set cover photo')
    },
  })

  const handleCreateRoom = (data: CreateRoomFormData) => {
    createMutation.mutate(data)
  }

  const handleUpdateRoom = (data: CreateRoomFormData) => {
    if (selectedRoom) {
      updateMutation.mutate({
        id: selectedRoom.id,
        data: data,
      })
    }
  }

  const handleDeleteRoom = () => {
    if (selectedRoom) {
      deleteMutation.mutate(selectedRoom.id)
    }
  }

  // const handlePreviewAdd = async (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const files = Array.from(e.target.files || [])
  //   if (files.length === 0) return

  //   const newPreviews = await Promise.all(
  //     files.map(file => {
  //       return new Promise<string>((resolve) => {
  //         const reader = new FileReader()
  //         reader.onloadend = () => resolve(reader.result as string)
  //         reader.readAsDataURL(file)
  //       })
  //     })
  //   )

  //   setPreviewImages(prev => [...prev, ...newPreviews])
  // }

  // const handlePreviewRemove = (index: number) => {
  //   setPreviewImages(prev => prev.filter((_, i) => i !== index))
  // }

  // const handlePreviewClear = () => {
  //   setPreviewImages([])
  // }

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>, roomId: string, isCover: boolean = false) => {
    const files = Array.from(e.target.files || [])
    if (files.length === 0) return

    // Add to uploading state
    setUploadingPhotos(prev => [...prev, ...files.map(f => f.name)])

    // Upload each file
    files.forEach(file => {
      uploadPhotoMutation.mutate({ roomId, file, isCover })
    })
  }

  const handleDeletePhoto = (roomId: string, photoUrl: string) => {
    // Find photo ID from URL (this is a simplified approach)
    const photoId = photoUrl.split('/').pop() || ''
    if (photoId) {
      deletePhotoMutation.mutate({ roomId, photoId })
    }
  }

  const handleSetCover = (roomId: string, photoUrl: string) => {
    const photoId = photoUrl.split('/').pop() || ''
    if (photoId) {
      setCoverMutation.mutate(photoId)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Room Management</h1>
          <p className="text-muted-foreground">
            Manage meeting rooms and their facilities
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Room
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <RoomForm
              onSubmit={handleCreateRoom}
              isSubmitting={createMutation.isPending}
              submitLabel="Create Room"
              onPhotoUpload={handlePhotoUpload}
              onDeletePhoto={handleDeletePhoto}
              onSetCover={handleSetCover}
              uploadingPhotos={uploadingPhotos}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Rooms Grid */}
      {isLoading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i}>
              <Skeleton className="h-48 w-full" />
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : roomsData?.data?.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Building2 className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Rooms Found</h3>
            <p className="text-muted-foreground text-center mb-4">
              Get started by adding your first meeting room
            </p>
            <Button onClick={() => setIsCreateDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add First Room
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {roomsData?.data?.map((room: Room) => (
            <Card key={room.id} className="overflow-hidden">
              {/* Cover Photo */}
              {room.coverPhoto ? (
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={`${process.env.NEXT_PUBLIC_FILE_URL}${room.coverPhoto}`}
                    alt={room.name}
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              ) : (
                <div className="aspect-video bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                  <ImageIcon className="h-12 w-12 text-muted-foreground" />
                </div>
              )}

              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-xl">{room.name}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {room.description}
                    </p>
                  </div>
                  {room.photos && room.photos.length > 0 && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <ImageIcon className="h-3 w-3" />
                      {room.photos.length}
                    </Badge>
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Details */}
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {room.location}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="h-4 w-4" />
                    {room.capacity} people
                  </div>
                </div>

                {/* Facilities */}
                {room.facilities && room.facilities.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {room.facilities.slice(0, 3).map((facility, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {facility}
                      </Badge>
                    ))}
                    {room.facilities.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{room.facilities.length - 3}
                      </Badge>
                    )}
                  </div>
                )}

                {/* Mini Photo Gallery */}
                {room.photos && room.photos.length > 1 && (
                  <div className="grid grid-cols-4 gap-1">
                    {room.photos.slice(0, 4).map((photo, index) => (
                      <div
                        key={index}
                        className={`relative aspect-square rounded overflow-hidden ${
                          photo === room.coverPhoto ? 'ring-2 ring-primary' : ''
                        }`}
                      >
                        <Image
                          src={photo}
                          alt={`${room.name} photo ${index + 1}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 25vw, (max-width: 1200px) 12vw, 8vw"
                        />
                        {photo === room.coverPhoto && (
                          <div className="absolute top-0.5 left-0.5 bg-primary text-primary-foreground text-[8px] px-1 rounded-full">
                            <Star className="h-2 w-2 fill-current" />
                          </div>
                        )}
                      </div>
                    ))}
                    {room.photos.length > 4 && (
                      <div className="aspect-square bg-muted rounded flex items-center justify-center">
                        <span className="text-xs font-medium">+{room.photos.length - 4}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Dialog open={isEditDialogOpen && selectedRoom?.id === room.id} onOpenChange={(open) => {
                    setIsEditDialogOpen(open)
                    if (!open) setSelectedRoom(null)
                  }}>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => setSelectedRoom(room)}
                      >
                        <Edit className="mr-1 h-3 w-3" />
                        Edit
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                      <RoomForm
                        room={room}
                        onSubmit={handleUpdateRoom}
                        isSubmitting={updateMutation.isPending}
                        submitLabel="Update Room"
                        onPhotoUpload={handlePhotoUpload}
                        onDeletePhoto={handleDeletePhoto}
                        onSetCover={handleSetCover}
                        uploadingPhotos={uploadingPhotos}
                      />
                    </DialogContent>
                  </Dialog>
                  <Dialog open={isDeleteDialogOpen && selectedRoom?.id === room.id} onOpenChange={(open) => {
                    setIsDeleteDialogOpen(open)
                    if (!open) setSelectedRoom(null)
                  }}>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedRoom(room)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Delete Room</DialogTitle>
                        <DialogDescription>
                          Are you sure you want to delete `{room.name}`? This action cannot be undone.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button
                          variant="outline"
                          onClick={() => {
                            setIsDeleteDialogOpen(false)
                            setSelectedRoom(null)
                          }}
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={handleDeleteRoom}
                          disabled={deleteMutation.isPending}
                        >
                          {deleteMutation.isPending ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Deleting...
                            </>
                          ) : (
                            'Delete'
                          )}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

interface RoomFormProps {
  room?: Room
  onSubmit: (data: CreateRoomFormData) => void
  isSubmitting: boolean
  submitLabel: string
  onPhotoUpload?: (e: React.ChangeEvent<HTMLInputElement>, roomId: string, isCover?: boolean) => void
  onDeletePhoto?: (roomId: string, photoUrl: string) => void
  onSetCover?: (roomId: string, photoUrl: string) => void
  uploadingPhotos?: string[]
}

function RoomForm({ room, onSubmit, isSubmitting, submitLabel, onPhotoUpload, onDeletePhoto, onSetCover, uploadingPhotos }: RoomFormProps) {
  const [previewImages, setPreviewImages] = useState<string[]>(uploadingPhotos || [])

  // Fetch room photos when editing
  const { data: roomPhotos, isLoading: isLoadingPhotos } = useQuery({
    queryKey: ['room-photos', room?.id],
    queryFn: () => roomService.getRoomPhotos(room!.id),
    enabled: !!room?.id,
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateRoomFormData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(createRoomSchema) as any,
    defaultValues: room ? {
      name: room.name,
      // description: room.description,
      capacity: room.capacity,
      location: room.location,
      // facilities: room.facilities,
    } : undefined,
  })

  const onFormSubmit = (data: CreateRoomFormData) => {
    onSubmit(data)
  }

  const handlePreviewAdd = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length === 0) return

    const newPreviews = await Promise.all(
      files.map(file => {
        return new Promise<string>((resolve) => {
          const reader = new FileReader()
          reader.onloadend = () => resolve(reader.result as string)
          reader.readAsDataURL(file)
        })
      })
    )

    setPreviewImages(prev => [...prev, ...newPreviews])
  }

  const handlePreviewRemove = (index: number) => {
    setPreviewImages(prev => prev.filter((_, i) => i !== index))
  }

  const handlePreviewClear = () => {
    setPreviewImages([])
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>{room ? 'Edit Room' : 'Create New Room'}</DialogTitle>
        <DialogDescription>
          {room ? 'Update room details and facilities' : 'Add a new meeting room to the system'}
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Room Name *</Label>
          <Input
            id="name"
            placeholder="Conference Room A"
            {...register('name')}
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="capacity">Capacity *</Label>
            <Input
              id="capacity"
              type="number"
              placeholder="10"
              {...register('capacity', { valueAsNumber: true })}
            />
            {errors.capacity && (
              <p className="text-sm text-red-500">{errors.capacity.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location *</Label>
            <Input
              id="location"
              placeholder="Floor 1, Building A"
              {...register('location')}
            />
            {errors.location && (
              <p className="text-sm text-red-500">{errors.location.message}</p>
            )}
          </div>
        </div>

        {/* Photo Gallery Section */}
          <div className="space-y-4">
            <div>
              <Label>Photo Gallery</Label>
              <p className="text-xs text-muted-foreground mt-1">
                Manage room photos. The first photo is automatically set as cover.
              </p>
            </div>

            {/* Upload Button */}
            <div className="flex items-center gap-2">
              <Input
                id="photo-upload"
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) => {
                  handlePreviewAdd(e)
                  if (room && onPhotoUpload) {
                    onPhotoUpload(e, room.id)
                  }
                }}
                />
              <Label
                htmlFor="photo-upload"
                className="cursor-pointer"
                >
                <div className="flex items-center gap-2 px-4 py-2 border-2 border-dashed rounded-md hover:bg-accent transition-colors">
                  <Upload className="h-4 w-4" />
                  <span className="text-sm">Upload Photos</span>
                </div>
              </Label>
              {previewImages.length > 0 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handlePreviewClear}
                >
                  <X className="h-4 w-4 mr-1" />
                  Clear Previews
                </Button>
              )}
            </div>

            {/* Preview Images */}
            {previewImages.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium">Preview Images ({previewImages.length})</p>
                <div className="grid grid-cols-4 gap-3">
                  {previewImages.map((preview, index) => (
                    <div key={index} className="relative group aspect-square rounded-md overflow-hidden border">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handlePreviewRemove(index)}
                        >
                        <X className="h-3 w-3" />
                      </Button>
                      <div className="absolute bottom-1 left-1 bg-black/50 text-white text-xs px-2 py-0.5 rounded">
                        Preview {index + 1}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Existing Photos */}
            {/* {room && ( */}
            {roomPhotos?.data?.photos && roomPhotos.data.photos.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium">Uploaded Photos ({roomPhotos.data.photos.length})</p>
                <div className="grid grid-cols-4 gap-3">
                  {roomPhotos.data.photos.map((roomPhoto) => {
                    const isCover = roomPhoto.isCover
                    return (
                      <div key={roomPhoto.id} className="relative group aspect-square rounded-md overflow-hidden border">
                        <img
                          src={`${process.env.NEXT_PUBLIC_FILE_URL}${roomPhoto.photoUrl}`}
                          alt={`Room photo`}
                          className="object-cover"
                          sizes="(max-width: 768px) 25vw, (max-width: 1200px) 12vw, 8vw"
                        />
                        {isCover && (
                          <div className="absolute top-1 left-1 bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                            <Star className="h-3 w-3 fill-current" />
                            Cover
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          {!isCover && (
                            <Button
                              type="button"
                              variant="secondary"
                              size="sm"
                              className="h-8 px-2 text-xs"
                              onClick={() => room && onSetCover && onSetCover(room.id, roomPhoto.photoUrl)}
                            >
                              <Star className="h-3 w-3 mr-1" />
                              Set Cover
                            </Button>
                          )}
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            className="h-8 px-2 text-xs"
                            onClick={() => room && onDeletePhoto && onDeletePhoto(room.id, roomPhoto.photoUrl)}
                          >
                            <Trash2 className="h-3 w-3 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* No Photos State */}
            {(!roomPhotos?.data?.photos || roomPhotos.data.photos.length === 0) && previewImages.length === 0 && (
              <div className="flex flex-col items-center justify-center py-8 border-2 border-dashed rounded-md">
                <Camera className="h-12 w-12 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">No photos uploaded yet</p>
                <p className="text-xs text-muted-foreground">Click above to upload room photos</p>
              </div>
            )}
          </div>
        {/* )} */}

        <DialogFooter>
          <Button
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {submitLabel === 'Create Room' ? 'Creating...' : 'Updating...'}
              </>
            ) : (
              submitLabel
            )}
          </Button>
        </DialogFooter>
      </form>
    </>
  )
}
