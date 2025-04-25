import React, { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MicOff, Wifi, WifiOff } from "lucide-react";

interface VideoTileProps {
  stream?: MediaStream;
  name?: string;
  isMuted?: boolean;
  isConnectionWeak?: boolean;
  isVideoEnabled?: boolean;
}

const VideoTile = ({
  stream = null,
  name = "User",
  isMuted = false,
  isConnectionWeak = false,
  isVideoEnabled = true,
}: VideoTileProps) => {
  const [videoRef, setVideoRef] = useState<HTMLVideoElement | null>(null);
  const [initials, setInitials] = useState<string>("");

  // Calculate initials from name
  useEffect(() => {
    if (name) {
      const nameParts = name.split(" ");
      if (nameParts.length >= 2) {
        setInitials(`${nameParts[0][0]}${nameParts[1][0]}`);
      } else if (nameParts.length === 1) {
        setInitials(nameParts[0][0]);
      }
    }
  }, [name]);

  // Attach stream to video element when stream changes
  useEffect(() => {
    if (videoRef && stream) {
      videoRef.srcObject = stream;
    }
  }, [stream, videoRef]);

  return (
    <div className="relative rounded-lg overflow-hidden bg-slate-900 h-full w-full flex items-center justify-center">
      {isVideoEnabled && stream ? (
        <video
          ref={setVideoRef}
          autoPlay
          playsInline
          muted
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex items-center justify-center h-full w-full">
          <Avatar className="h-24 w-24">
            <AvatarFallback className="text-2xl bg-slate-700 text-slate-200">
              {initials}
            </AvatarFallback>
          </Avatar>
        </div>
      )}

      {/* Name label */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-2 flex justify-between items-center">
        <span className="text-white text-sm font-medium truncate">{name}</span>
        <div className="flex items-center space-x-2">
          {isMuted && (
            <Badge variant="destructive" className="flex items-center gap-1">
              <MicOff className="h-3 w-3" />
              <span className="text-xs">Muted</span>
            </Badge>
          )}

          {isConnectionWeak && (
            <Badge
              variant="outline"
              className="bg-yellow-500/20 border-yellow-500 text-yellow-500 flex items-center gap-1"
            >
              <WifiOff className="h-3 w-3" />
              <span className="text-xs">Weak</span>
            </Badge>
          )}

          {!isConnectionWeak && (
            <Badge
              variant="outline"
              className="bg-green-500/20 border-green-500 text-green-500 flex items-center gap-1"
            >
              <Wifi className="h-3 w-3" />
              <span className="text-xs">Good</span>
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoTile;
