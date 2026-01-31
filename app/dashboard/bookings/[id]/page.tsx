"use client";

import { EmptyState } from "@/components/shared/empty-state";
import { StatusBadge } from "@/components/shared/status-badge";
import { Timeline, type TimelineItem } from "@/components/shared/timeline";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDate, formatDateTime, formatTime } from "@/lib/utils";
import { bookingService } from "@/services/booking.service";
import { useQuery } from "@tanstack/react-query";
import {
  AlertCircle,
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Clock,
  Edit,
  Image as ImageIcon,
  MapPin,
  Users,
  X,
  XCircle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function BookingDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const { data: booking, isLoading } = useQuery({
    queryKey: ["booking", params.id],
    queryFn: () => bookingService.getBookingById(params.id),
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-48" />
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-48" />
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!booking?.data) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <EmptyState
          icon={XCircle}
          title="Booking Not Found"
          description="The booking you're looking for doesn't exist or you don't have access to it."
          onAction={() => router.back()}
        />
      </div>
    );
  }

  const getTimelineItems = (): TimelineItem[] => {
    const items: TimelineItem[] = [
      {
        id: "created",
        title: "Booking Created",
        timestamp: formatDateTime(booking?.data?.createdAt || ""),
        status: "completed",
        icon: <Calendar className="h-4 w-4" />,
      },
    ];

    if (booking && booking?.data?.status === "approved") {
      items.push({
        id: "approved",
        title: "Booking Approved",
        timestamp: formatDateTime(booking.data.updatedAt),
        status: "completed",
        icon: <CheckCircle2 className="h-4 w-4" />,
      });
    } else if (booking?.data?.status === "rejected") {
      items.push({
        id: "rejected",
        title: "Booking Rejected",
        description: booking.data.rejectionReason,
        timestamp: formatDateTime(booking.data.updatedAt),
        status: "error",
        icon: <XCircle className="h-4 w-4" />,
      });
    } else if (booking?.data?.status === "cancelled") {
      items.push({
        id: "cancelled",
        title: "Booking Cancelled",
        timestamp: formatDateTime(booking.data.updatedAt),
        status: "error",
        icon: <X className="h-4 w-4" />,
      });
    } else if (booking?.data?.status === "pending") {
      items.push({
        id: "pending",
        title: "Waiting for Approval",
        description: "Your booking is being reviewed by an administrator",
        status: "current",
        icon: <AlertCircle className="h-4 w-4" />,
        timestamp: formatDateTime(booking.data.updatedAt),
      });
    }

    return items;
  };

  const allPhotos = booking.data.room?.photos || [];
  if (
    booking.data.room?.coverPhoto &&
    !allPhotos.includes(booking.data.room.coverPhoto)
  ) {
    allPhotos.unshift(booking.data.room.coverPhoto);
  }

  const openGallery = (index: number) => {
    setSelectedImageIndex(index);
    setGalleryOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        {(booking.data.status === "pending" ||
          booking.data.status === "approved") && (
          <Link href={`/dashboard/bookings/edit/${booking.data.id}`}>
            <Button className="w-full sm:w-auto">
              <Edit className="mr-2 h-4 w-4" />
              Edit Booking
            </Button>
          </Link>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Booking Info */}
        <Card>
          <CardHeader>
            <CardTitle>Booking Information</CardTitle>
            <CardDescription>
              Details about your booking request
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Status */}
            <div className="flex items-center justify-between rounded-lg border p-4">
              <span className="text-sm font-medium">Status</span>
              <StatusBadge status={booking.data.status} />
            </div>

            {/* Date & Time */}
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Calendar className="mt-0.5 h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Date</p>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(booking.data.date)}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="mt-0.5 h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Time</p>
                  <p className="text-sm text-muted-foreground">
                    {formatTime(booking.data.startTime)} -{" "}
                    {formatTime(booking.data.endTime)}
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <p className="text-sm font-medium">Description</p>
              <p className="text-sm text-muted-foreground">
                {booking.data.description}
              </p>
            </div>

            {/* Rejection Reason */}
            {booking.data.status === "rejected" &&
              booking.data.rejectionReason && (
                <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4">
                  <p className="text-sm font-medium text-destructive">
                    Rejection Reason
                  </p>
                  <p className="mt-1 text-sm text-destructive/90">
                    {booking.data.rejectionReason}
                  </p>
                </div>
              )}

            {/* Timeline */}
            <div>
              <p className="mb-4 text-sm font-medium">Booking Timeline</p>
              <Timeline items={getTimelineItems()} />
            </div>
          </CardContent>
        </Card>

        {/* Room Info */}
        <Card>
          <CardHeader>
            <CardTitle>Room Information</CardTitle>
            <CardDescription>Details about the booked room</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {booking.data.room && (
              <>
                {/* Cover Photo */}
                {booking.data.room.coverPhoto && (
                  <div
                    className="group relative aspect-video cursor-pointer overflow-hidden rounded-lg border"
                    onClick={() => openGallery(0)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        openGallery(0);
                      }
                    }}
                  >
                    <Image
                      src={booking.data.room.coverPhoto}
                      alt={booking.data.room.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/20">
                      <ImageIcon className="h-8 w-8 text-white opacity-0 transition-opacity group-hover:opacity-100" />
                    </div>
                  </div>
                )}

                {/* Room Details */}
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium">Room Name</p>
                    <p className="text-lg font-semibold">
                      {booking.data.room.name}
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Location</p>
                      <p className="text-sm text-muted-foreground">
                        {booking.data.room.location}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Users className="mt-0.5 h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Capacity</p>
                      <p className="text-sm text-muted-foreground">
                        {booking.data.room.capacity} people
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <p className="text-sm font-medium">Facilities</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {booking.data.room.facilities.map((facility, index) => (
                        <div
                          key={index}
                          className="rounded-full border bg-muted px-3 py-1 text-xs font-medium"
                        >
                          {facility}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium">Description</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {booking.data.room.description}
                    </p>
                  </div>
                </div>

                {/* Gallery */}
                {allPhotos.length > 1 && (
                  <div>
                    <p className="mb-2 text-sm font-medium">Gallery</p>
                    <div className="grid grid-cols-4 gap-2">
                      {allPhotos.slice(0, 4).map((photo, index) => (
                        <div
                          key={index}
                          className="group relative aspect-square cursor-pointer overflow-hidden rounded border"
                          onClick={() => openGallery(index)}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              openGallery(index);
                            }
                          }}
                        >
                          <Image
                            src={photo}
                            alt={`Gallery photo ${index + 1}`}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          {index === 3 && allPhotos.length > 4 && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                              <span className="text-lg font-semibold text-white">
                                +{allPhotos.length - 4}
                              </span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Gallery Dialog */}
      <Dialog open={galleryOpen} onOpenChange={setGalleryOpen}>
        <DialogContent className="max-w-4xl p-0">
          <div className="relative aspect-video">
            <Image
              src={allPhotos[selectedImageIndex]}
              alt="Gallery image"
              fill
              className="object-contain"
              priority
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
