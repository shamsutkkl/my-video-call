import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Video, Users, Wifi } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-3xl shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl sm:text-4xl font-bold mb-2">
            P2P Conference
          </CardTitle>
          <CardDescription className="text-lg">
            Video conferencing without internet - connect directly via hotspot
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center space-y-8">
            <div className="relative w-full max-w-md">
              <img
                src="https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=800&q=80"
                alt="People in a video conference"
                className="w-full h-64 object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="font-medium">
                  Connect with others without internet connectivity
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md">
              <Link to="/create-room" className="w-full">
                <Button
                  variant="default"
                  size="lg"
                  className="w-full h-16 text-lg flex items-center justify-center gap-2"
                >
                  <Wifi className="h-5 w-5" />
                  Create Room
                </Button>
              </Link>
              <Link to="/join-room" className="w-full">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full h-16 text-lg flex items-center justify-center gap-2"
                >
                  <Users className="h-5 w-5" />
                  Join Room
                </Button>
              </Link>
            </div>

            <div className="flex items-center justify-center space-x-4 text-muted-foreground">
              <div className="flex items-center">
                <Wifi className="mr-2 h-4 w-4" />
                <span>No internet needed</span>
              </div>
              <div className="flex items-center">
                <Video className="mr-2 h-4 w-4" />
                <span>P2P video calls</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <footer className="mt-8 text-center text-sm text-muted-foreground">
        <p>P2P Conference - Connect directly via hotspot</p>
      </footer>
    </div>
  );
};

export default Home;
