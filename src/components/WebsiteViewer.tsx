
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

interface WebsiteViewerProps {
  website: {
    title: string;
    description: string;
    preview?: string;
  };
}

const WebsiteViewer: React.FC<WebsiteViewerProps> = ({ website }) => {
  return (
    <Card className="bg-white/10 backdrop-blur-lg border-white/20 p-8">
      <CardHeader className="px-0">
        <CardTitle className="text-2xl font-bold mb-4 text-center">Your Generated Website</CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        <div className="bg-white/5 rounded-lg p-4 aspect-video flex items-center justify-center border border-white/20">
          {website.preview ? (
            <img
              src={website.preview}
              alt={website.title}
              className="max-w-full max-h-full object-contain"
            />
          ) : (
            <div className="text-center">
              <Globe className="w-16 h-16 text-purple-400 mx-auto mb-4" />
              <p className="text-lg font-medium">{website.title}</p>
              <p className="text-gray-400">{website.description}</p>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex space-x-4 px-0">
        <Button variant="outline" className="flex-1 border-white/20 text-white hover:bg-white/10">
          Preview
        </Button>
        <Link to="/dashboard" className="flex-1">
          <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500">
            View in Dashboard
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default WebsiteViewer;
