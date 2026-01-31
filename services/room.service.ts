import type {
    CreateRoomRequest,
    Room,
    RoomPhoto,
    RoomPhotosResponse,
    UpdateRoomRequest
} from "@/types";
import { apiClient } from "./api";

export const roomService = {
  async getRooms() {
    return apiClient.get<Room[]>("/rooms");
  },

  async getRoomById(id: string) {
    return apiClient.get<Room>(`/rooms/${id}`);
  },

  async createRoom(data: CreateRoomRequest) {
    return apiClient.post<Room>("/rooms", data);
  },

  async updateRoom(id: string, data: UpdateRoomRequest) {
    return apiClient.put<Room>(`/rooms/${id}`, data);
  },

  async deleteRoom(id: string) {
    return apiClient.delete<{ message: string }>(`/rooms/${id}`);
  },

  async uploadRoomPhoto(roomId: string, file: File, isCover: boolean = false) {
    const formData = new FormData();
    formData.append("photos", file);
    formData.append("isCover", isCover.toString());
    return apiClient.upload<Room>(`/rooms/${roomId}/photos`, formData);
  },

  async deleteRoomPhoto(roomId: string, photoId: string) {
    return apiClient.delete<Room>(`/rooms/${roomId}/photos/${photoId}`);
  },

  async getRoomPhotos(id: string) {
    return apiClient.get<RoomPhotosResponse>(`/rooms/${id}/photos`);
  },

  async setCoverPhoto(photoId: string) {
    return apiClient.patch<Room>(`/rooms/photos/${photoId}/set-cover`);
  },
};
