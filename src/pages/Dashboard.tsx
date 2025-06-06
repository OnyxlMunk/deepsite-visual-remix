
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Globe, Plus, Sparkles, PanelLeft, LogOut } from 'lucide-react';
import { toast } from 'sonner';

type Website = {
  id: string;
  title: string;
  description: string;
  preview_image_url: string | null;
  created_at: string;
};

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const [websites, setWebsites] = useState<Website[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWebsites = async () => {
      try {
        const { data, error } = await supabase
          .from('websites')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setWebsites(data || []);
      } catch (error) {
        console.error('Error fetching websites:', error);
        toast.error('Failed to load your websites');
      } finally {
        setIsLoading(false);
      }
    };

    fetchWebsites();
  }, []);

  const handleCreateNew = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Globe className="w-8 h-8 text-purple-400" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              DeepSite
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-300">
              {user?.email}
            </div>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => signOut()}
              className="text-gray-300 hover:text-white hover:bg-white/10"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="relative z-10 container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Your Websites</h2>
          <Button 
            onClick={handleCreateNew}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500"
          >
            <Plus className="mr-2 h-4 w-4" /> Create New Website
          </Button>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : websites.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {websites.map((website) => (
              <Card key={website.id} className="bg-white/10 backdrop-blur-lg border-white/20 overflow-hidden hover:bg-white/15 transition-all duration-300">
                <CardHeader className="pb-2">
                  <CardTitle className="line-clamp-1">{website.title}</CardTitle>
                </CardHeader>
                <CardContent className="pb-4">
                  {website.preview_image_url ? (
                    <div className="aspect-video rounded-md overflow-hidden mb-3 bg-black/30">
                      <img 
                        src={website.preview_image_url} 
                        alt={website.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="aspect-video rounded-md overflow-hidden mb-3 bg-black/30 flex items-center justify-center">
                      <Globe className="w-12 h-12 text-gray-500" />
                    </div>
                  )}
                  <p className="text-sm text-gray-300 line-clamp-2">{website.description || 'No description'}</p>
                </CardContent>
                <CardFooter className="pt-0 flex space-x-2">
                  <Button className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500">
                    View Website
                  </Button>
                  <Button variant="outline" className="border-white/20 hover:bg-white/10">
                    Edit
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
            <Sparkles className="mx-auto h-12 w-12 text-purple-400 mb-4" />
            <h3 className="text-2xl font-bold mb-2">No websites yet</h3>
            <p className="text-gray-300 mb-6">Create your first AI-powered website</p>
            <Button 
              onClick={handleCreateNew}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500"
            >
              <Plus className="mr-2 h-4 w-4" /> Create New Website
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
