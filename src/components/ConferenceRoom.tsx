import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  PhoneOff,
  Users,
  Wifi,
  WifiOff,
} from "lucide-react";
import VideoTile from "./VideoTile";

interface Participant {
  id: string;
  name: string;
  videoEnabled: boolean;
  audioEnabled: boolean;
  isLocal: boolean;
  stream?: MediaStream;
}

interface ConferenceRoomProps {
  roomId?: string;
  isHost?: boolean;
  onLeaveCall?: () => void;
}

const ConferenceRoom = ({
  roomId = "room-123",
  isHost = true,
  onLeaveCall = () => {},
}: ConferenceRoomProps) => {
  const [participants, setParticipants] = useState<Participant[]>([
    {
      id: "local",
      name: "You",
      videoEnabled: true,
      audioEnabled: true,
      isLocal: true,
    },
    {
      id: "user1",
      name: "John Doe",
      videoEnabled: true,
      audioEnabled: true,
      isLocal: false,
    },
    {
      id: "user2",
      name: "Jane Smith",
      videoEnabled: true,
      audioEnabled: false,
      isLocal: false,
    },
    {
      id: "user3",
      name: "Alex Johnson",
      videoEnabled: false,
      audioEnabled: true,
      isLocal: false,
    },
  ]);

  const [localAudioEnabled, setLocalAudioEnabled] = useState(true);
  const [localVideoEnabled, setLocalVideoEnabled] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState<
    "connected" | "disconnected" | "reconnecting"
  >("connected");

  // Simulate getting local stream
  useEffect(() => {
    const getLocalStream = async () => {
      try {
        // In a real implementation, this would be actual WebRTC code
        // const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

        // For now, we'll just simulate having a stream
        console.log("Local media stream would be initialized here");

        // Update local participant with stream
        // setParticipants(prev =>
        //   prev.map(p => p.isLocal ? { ...p, stream } : p)
        // );
      } catch (error) {
        console.error("Error accessing media devices:", error);
      }
    };

    getLocalStream();

    // Cleanup function
    return () => {
      // Close all peer connections and release media streams
      console.log("Cleaning up WebRTC connections");
    };
  }, []);

  // Toggle local audio
  const toggleAudio = () => {
    setLocalAudioEnabled(!localAudioEnabled);
    setParticipants((prev) =>
      prev.map((p) =>
        p.isLocal ? { ...p, audioEnabled: !localAudioEnabled } : p,
      ),
    );
  };

  // Toggle local video
  const toggleVideo = () => {
    setLocalVideoEnabled(!localVideoEnabled);
    setParticipants((prev) =>
      prev.map((p) =>
        p.isLocal ? { ...p, videoEnabled: !localVideoEnabled } : p,
      ),
    );
  };

  // End call function
  const endCall = () => {
    // In a real implementation, this would close all connections
    onLeaveCall();
  };

  // Calculate grid layout based on number of participants
  const getGridClass = () => {
    const count = participants.length;
    if (count <= 1) return "grid-cols-1";
    if (count <= 2) return "grid-cols-1 md:grid-cols-2";
    if (count <= 4) return "grid-cols-1 md:grid-cols-2";
    if (count <= 6) return "grid-cols-2 md:grid-cols-3";
    return "grid-cols-2 md:grid-cols-3 lg:grid-cols-4";
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header with room info */}
      <div className="flex justify-between items-center p-4 bg-card">
        <div>
          <h2 className="text-xl font-semibold">Room: {roomId}</h2>
          <div className="flex items-center mt-1">
            <Badge
              variant={
                connectionStatus === "connected" ? "default" : "destructive"
              }
              className="mr-2"
            >
              {connectionStatus === "connected" ? (
                <Wifi className="h-3 w-3 mr-1" />
              ) : (
                <WifiOff className="h-3 w-3 mr-1" />
              )}
              {connectionStatus === "connected"
                ? "Connected"
                : connectionStatus === "reconnecting"
                  ? "Reconnecting..."
                  : "Disconnected"}
            </Badge>
            <Badge variant="outline">
              <Users className="h-3 w-3 mr-1" />
              {participants.length} participants
            </Badge>
          </div>
        </div>
        {isHost && <Badge variant="secondary">Host</Badge>}
      </div>

      <Separator />

      {/* Main video grid */}
      <div className="flex-1 p-4 overflow-auto">
        <div className={`grid ${getGridClass()} gap-4 auto-rows-fr h-full`}>
          {participants.map((participant) => (
            <VideoTile key={participant.id} participant={participant} />
          ))}
        </div>
      </div>

      {/* Call controls */}
      <div className="p-4 bg-card">
        <div className="flex justify-center space-x-4">
          <Button
            variant="outline"
            size="icon"
            className={`rounded-full h-12 w-12 ${!localAudioEnabled ? "bg-destructive text-destructive-foreground" : ""}`}
            onClick={toggleAudio}
          >
            {localAudioEnabled ? <Mic /> : <MicOff />}
          </Button>

          <Button
            variant="outline"
            size="icon"
            className={`rounded-full h-12 w-12 ${!localVideoEnabled ? "bg-destructive text-destructive-foreground" : ""}`}
            onClick={toggleVideo}
          >
            {localVideoEnabled ? <Video /> : <VideoOff />}
          </Button>

          <Button
            variant="destructive"
            size="icon"
            className="rounded-full h-12 w-12"
            onClick={endCall}
          >
            <PhoneOff />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConferenceRoom;
