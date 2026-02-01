"use client";

import { EmptyState } from "@/components/shared/empty-state";
import { StatusBadge } from "@/components/shared/status-badge";
import { Timeline, type TimelineItem } from "@/components/shared/timeline";
import { WideCard, WideCardHeader, WideCardTitle, WideCardContent, WideCardFooter } from "@/components/desktop";
import { SidePanel, SidePanelSection, SidePanelItem } from "@/components/desktop";
import { MButton } from "@/components/material/m-button";
import { MBadge } from "@/components/material/m-badge";
import { Dialog, DialogContent } from "@/components/ui/dialog";
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
        <MButton variant="text" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </MButton>
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-8">
            <WideCard padding="md">
              <WideCardContent>
                <Skeleton className="h-6 w-48" />
                <div className="mt-4 space-y-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </WideCardContent>
            </WideCard>
          </div>
          <div className="col-span-12 lg:col-span-4">
            <WideCard padding="md">
              <WideCardContent>
                <Skeleton className="h-6 w-48" />
                <div className="mt-4 space-y-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </WideCardContent>
            </WideCard>
          </div>
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
        <MButton variant="text" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </MButton>
        {(booking.data.status === "pending" ||
          booking.data.status === "approved") && (
          <Link href={`/dashboard/bookings/edit/${booking.data.id}`}>
            <MButton variant="filled" className="w-full sm:w-auto">
              <Edit className="mr-2 h-4 w-4" />
              Edit Booking
            </MButton>
          </Link>
        )}
      </div>

      {/* Split View Layout - 12-Column Grid */}
      <div className="grid grid-cols-12 gap-6">
        {/* Left Column - Booking Information (8 columns) */}
        <div className="col-span-12 lg:col-span-8">
          <WideCard variant="elevated" padding="md">
            <WideCardHeader title="Booking Information" />
            <WideCardContent className="space-y-6">
              {/* Status */}
              <div className="flex items-center justify-between rounded-xl border border-subtle bg-surface-container-low p-4">
                <span className="text-body-sm font-medium">Status</span>
                <StatusBadge status={booking.data.status} />
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <Calendar className="mt-0.5 h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-label-md font-medium">Date</p>
                    <p className="text-body-sm text-muted-foreground">
                      {formatDate(booking.data.date)}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-label-md font-medium">Time</p>
                    <p className="text-body-sm text-muted-foreground">
                      {formatTime(booking.data.startTime)} -{" "}
                      {formatTime(booking.data.endTime)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <p className="text-label-md font-medium">Description</p>
                <p className="text-body-sm text-muted-foreground">
                  {booking.data.description}
                </p>
              </div>

              {/* Rejection Reason */}
              {booking.data.status === "rejected" &&
                booking.data.rejectionReason && (
                  <div className="rounded-xl border border-destructive/50 bg-destructive/10 p-4">
                    <p className="text-label-md font-medium text-destructive">
                      Rejection Reason
                    </p>
                    <p className="mt-1 text-body-sm text-destructive/90">
                      {booking.data.rejectionReason}
                    </p>
                  </div>
                )}

              {/* Timeline */}
              <div>
                <p className="mb-4 text-label-md font-medium">Booking Timeline</p>
                <Timeline items={getTimelineItems()} />
              </div>
            </WideCardContent>
          </WideCard>
        </div>

        {/* Right Column - Room Information (4 columns) */}
        <div className="col-span-12 lg:col-span-4">
          <WideCard variant="elevated" padding="md" className="sticky top-24">
            <WideCardHeader title="Room Information" />
            <WideCardContent className="space-y-6">
              {booking.data.room && (
                <>
                  {/* Cover Photo */}
                  {booking.data.room.coverPhoto && (
                    <div
                      className="group relative aspect-video cursor-pointer overflow-hidden rounded-xl border border-subtle"
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
                  <div className="space-y-4">
                    <div>
                      <p className="text-label-md font-medium">Room Name</p>
                      <p className="text-heading-lg font-semibold">
                        {booking.data.room.name}
                      </p>
                    </div>

                    <SidePanelItem
                      label="Location"
                      value={booking.data.room.location}
                      icon={<MapPin className="h-4 w-4" />}
                    />

                    <SidePanelItem
                      label="Capacity"
                      value={`${booking.data.room.capacity} people`}
                      icon={<Users className="h-4 w-4" />}
                    />

                    <div className="border-t border-subtle pt-4">
                      <p className="mb-3 text-label-md font-medium">Facilities</p>
                      <div className="flex flex-wrap gap-2">
                        {booking.data.room.facilities.map((facility, index) => (
                          <MBadge key={index} variant="surface" size="sm">
                            {facility}
                          </MBadge>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-label-md font-medium">Description</p>
                      <p className="text-body-sm text-muted-foreground">
                        {booking.data.room.description}
                      </p>
                    </div>
                  </div>

                  {/* Gallery */}
                  {allPhotos.length > 1 && (
                    <div className="border-t border-subtle pt-4">
                      <p className="mb-3 text-label-md font-medium">Gallery</p>
                      <div className="grid grid-cols-4 gap-2">
                        {allPhotos.slice(0, 4).map((photo, index) => (
                          <div
                            key={index}
                            className="group relative aspect-square cursor-pointer overflow-hidden rounded-lg border border-subtle"
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
                                <span className="text-heading-lg font-semibold text-white">
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
            </WideCardContent>
          </WideCard>
        </div>
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
