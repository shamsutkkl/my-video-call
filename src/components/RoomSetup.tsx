import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Wifi, QrCode, Copy, CheckCircle, AlertCircle } from "lucide-react";

interface RoomSetupProps {
  isOpen?: boolean;
  onClose?: () => void;
  onCreateRoom?: (roomName: string) => void;
  onJoinRoom?: (roomCode: string) => void;
}

const RoomSetup = ({
  isOpen = true,
  onClose = () => {},
  onCreateRoom = () => {},
  onJoinRoom = () => {},
}: RoomSetupProps) => {
  const [activeTab, setActiveTab] = useState("create");
  const [roomName, setRoomName] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [generatedCode, setGeneratedCode] = useState("CONF-1234");
  const [copied, setCopied] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<
    "idle" | "connecting" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleCreateRoom = () => {
    if (!roomName.trim()) {
      setErrorMessage("Please enter a room name");
      return;
    }

    // Generate a random room code (in a real app, this would be more sophisticated)
    const newCode = `CONF-${Math.floor(1000 + Math.random() * 9000)}`;
    setGeneratedCode(newCode);
    setConnectionStatus("connecting");

    // Simulate hotspot activation and room creation
    setTimeout(() => {
      setConnectionStatus("success");
      onCreateRoom(roomName);
    }, 2000);
  };

  const handleJoinRoom = () => {
    if (!roomCode.trim()) {
      setErrorMessage("Please enter a room code");
      return;
    }

    setConnectionStatus("connecting");

    // Simulate connection attempt
    setTimeout(() => {
      // For demo purposes, let's say codes that don't start with CONF- will fail
      if (!roomCode.startsWith("CONF-")) {
        setConnectionStatus("error");
        setErrorMessage("Invalid room code or hotspot not found");
      } else {
        setConnectionStatus("success");
        onJoinRoom(roomCode);
      }
    }, 2000);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetStatus = () => {
    setConnectionStatus("idle");
    setErrorMessage("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-background">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Conference Room Setup
          </DialogTitle>
          <DialogDescription className="text-center">
            Create or join a conference room using local hotspot connection.
          </DialogDescription>
        </DialogHeader>

        <Tabs
          value={activeTab}
          onValueChange={(value) => {
            setActiveTab(value);
            resetStatus();
          }}
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="create">Create Room</TabsTrigger>
            <TabsTrigger value="join">Join Room</TabsTrigger>
          </TabsList>

          <TabsContent value="create" className="space-y-4 mt-4">
            {connectionStatus === "idle" ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="room-name">Room Name</Label>
                  <Input
                    id="room-name"
                    placeholder="Enter room name"
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)}
                  />
                </div>
                {errorMessage && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{errorMessage}</AlertDescription>
                  </Alert>
                )}
                <Button className="w-full" onClick={handleCreateRoom}>
                  Create Room & Activate Hotspot
                </Button>
              </div>
            ) : connectionStatus === "connecting" ? (
              <div className="text-center space-y-4 py-6">
                <div className="animate-pulse">
                  <Wifi className="h-16 w-16 mx-auto text-primary" />
                </div>
                <p className="text-lg font-medium">Activating Hotspot...</p>
                <p className="text-sm text-muted-foreground">
                  Please wait while we set up your conference room
                </p>
              </div>
            ) : connectionStatus === "success" ? (
              <div className="space-y-4">
                <div className="flex justify-center">
                  <CheckCircle className="h-16 w-16 text-green-500" />
                </div>
                <p className="text-center text-lg font-medium">
                  Room Created Successfully!
                </p>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex justify-center mb-4">
                      <div className="bg-gray-100 p-4 rounded-lg">
                        <QrCode className="h-32 w-32 mx-auto" />
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-2 bg-muted rounded-md">
                      <span className="font-mono text-lg">{generatedCode}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={copyToClipboard}
                      >
                        {copied ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>

                    <p className="mt-4 text-sm text-muted-foreground">
                      Share this code or QR with participants. Make sure your
                      hotspot is active and visible to others.
                    </p>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <div className="space-y-4 text-center">
                <AlertCircle className="h-16 w-16 mx-auto text-destructive" />
                <p className="text-lg font-medium text-destructive">
                  Error Creating Room
                </p>
                <p className="text-sm text-muted-foreground">
                  {errorMessage ||
                    "Failed to activate hotspot. Please check your device settings."}
                </p>
                <Button onClick={resetStatus}>Try Again</Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="join" className="space-y-4 mt-4">
            {connectionStatus === "idle" ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="room-code">Room Code</Label>
                  <Input
                    id="room-code"
                    placeholder="Enter room code (e.g., CONF-1234)"
                    value={roomCode}
                    onChange={(e) => setRoomCode(e.target.value)}
                  />
                </div>
                <div className="flex justify-center py-2">
                  <p className="text-sm text-muted-foreground">or</p>
                </div>
                <Button variant="outline" className="w-full">
                  <QrCode className="mr-2 h-4 w-4" />
                  Scan QR Code
                </Button>
                {errorMessage && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{errorMessage}</AlertDescription>
                  </Alert>
                )}
                <Button className="w-full" onClick={handleJoinRoom}>
                  Connect to Room
                </Button>
              </div>
            ) : connectionStatus === "connecting" ? (
              <div className="text-center space-y-4 py-6">
                <div className="animate-pulse">
                  <Wifi className="h-16 w-16 mx-auto text-primary" />
                </div>
                <p className="text-lg font-medium">Connecting to Hotspot...</p>
                <p className="text-sm text-muted-foreground">
                  Please make sure you're in range of the host's hotspot
                </p>
              </div>
            ) : connectionStatus === "success" ? (
              <div className="space-y-4 text-center">
                <CheckCircle className="h-16 w-16 mx-auto text-green-500" />
                <p className="text-lg font-medium">Connected Successfully!</p>
                <p className="text-sm text-muted-foreground">
                  Joining conference room...
                </p>
              </div>
            ) : (
              <div className="space-y-4 text-center">
                <AlertCircle className="h-16 w-16 mx-auto text-destructive" />
                <p className="text-lg font-medium text-destructive">
                  Connection Failed
                </p>
                <p className="text-sm text-muted-foreground">{errorMessage}</p>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Troubleshooting:</p>
                  <ul className="text-sm text-muted-foreground list-disc list-inside">
                    <li>Make sure you're connected to the host's hotspot</li>
                    <li>Verify the room code is correct</li>
                    <li>Ensure you're within range of the hotspot</li>
                  </ul>
                </div>
                <Button onClick={resetStatus}>Try Again</Button>
              </div>
            )}
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            disabled={connectionStatus === "connecting"}
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RoomSetup;
