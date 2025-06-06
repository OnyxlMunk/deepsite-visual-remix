
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Code, Palette, Zap, ArrowRight, Globe, LogIn } from 'lucide-react';
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { websiteService } from '@/services/websiteService';

const Index = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedSite, setGeneratedSite] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Please describe the website you want to create");
      return;
    }

    if (!user) {
      toast.error("Please log in to generate websites");
      navigate("/auth");
      return;
    }

    setIsGenerating(true);
    
    try {
      // Generate website using the service
      const websiteData = await websiteService.generateWebsite({ prompt });
      
      // Save the generated website to Supabase
      await websiteService.saveWebsite({
        ...websiteData,
        preview_image_url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"
      });

      setGeneratedSite({
        title: websiteData.title,
        description: websiteData.description,
        preview: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"
      });
      
      toast.success("Website generated successfully!");
    } catch (error) {
      console.error('Error:', error);
      toast.error("Failed to generate website. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const features = [
    {
      icon: Sparkles,
      title: "AI-Powered Generation",
      description: "Transform your ideas into beautiful websites instantly"
    },
    {
      icon: Code,
      title: "Clean Code Output",
      description: "Get production-ready code that follows best practices"
    },
    {
      icon: Palette,
      title: "Beautiful Designs",
      description: "Modern, responsive designs that look professional"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Generate complete websites in seconds, not hours"
    }
  ];

  const examples = [
    "A modern portfolio website for a UX designer with dark theme",
    "An e-commerce landing page for organic skincare products",
    "A tech startup homepage with animated hero section",
    "A restaurant website with online ordering system"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Globe className="w-8 h-8 text-purple-400" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                DeepSite
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-purple-500/20 text-purple-200 border-purple-500/30">
                AI-Powered
              </Badge>
              {user ? (
                <Button
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10"
                  onClick={() => navigate('/dashboard')}
                >
                  Dashboard
                </Button>
              ) : (
                <Button
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10"
                  onClick={() => navigate('/auth')}
                >
                  <LogIn className="mr-2 h-4 w-4" /> Sign In
                </Button>
              )}
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <main className="container mx-auto px-6 py-12">
          <div className="text-center mb-16">
            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
              Build Websites
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                with AI Magic
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Describe your vision and watch as AI transforms it into a stunning, 
              fully-functional website in seconds.
            </p>
          </div>

          {/* Generation Interface */}
          <div className="max-w-4xl mx-auto mb-16">
            <Card className="bg-white/10 backdrop-blur-lg border-white/20 p-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-3">
                    Describe your website
                  </label>
                  <Textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="e.g., A modern portfolio website for a photographer with a minimalist design, gallery section, and contact form..."
                    className="min-h-32 bg-white/5 border-white/20 text-white placeholder:text-gray-400 resize-none"
                  />
                </div>
                
                <div className="space-y-3">
                  <p className="text-sm text-gray-300">Try these examples:</p>
                  <div className="flex flex-wrap gap-2">
                    {examples.map((example, index) => (
                      <button
                        key={index}
                        onClick={() => setPrompt(example)}
                        className="text-xs bg-purple-500/20 hover:bg-purple-500/30 text-purple-200 px-3 py-1 rounded-full border border-purple-500/30 transition-all duration-200 hover:scale-105"
                      >
                        {example}
                      </button>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-medium py-3 transition-all duration-200"
                >
                  {isGenerating ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Generating your website...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Sparkles className="w-5 h-5" />
                      <span>Generate Website</span>
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  )}
                </Button>
              </div>
            </Card>
          </div>

          {/* Preview Section */}
          {generatedSite && (
            <div className="max-w-4xl mx-auto mb-16">
              <Card className="bg-white/10 backdrop-blur-lg border-white/20 p-8">
                <h3 className="text-2xl font-bold mb-4 text-center">Your Generated Website</h3>
                <div className="bg-white/5 rounded-lg p-4 aspect-video flex items-center justify-center border border-white/20">
                  <div className="text-center">
                    <Globe className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                    <p className="text-lg font-medium">{generatedSite.title}</p>
                    <p className="text-gray-400">{generatedSite.description}</p>
                  </div>
                </div>
                <div className="mt-4 flex space-x-4">
                  <Button variant="outline" className="flex-1 border-white/20 text-white hover:bg-white/10">
                    Preview
                  </Button>
                  <Link to="/dashboard">
                    <Button className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500">
                      View in Dashboard
                    </Button>
                  </Link>
                </div>
              </Card>
            </div>
          )}

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {features.map((feature, index) => (
              <Card key={index} className="bg-white/5 backdrop-blur-lg border-white/20 p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                <feature.icon className="w-10 h-10 text-purple-400 mb-4" />
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </Card>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <Card className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-lg border-purple-500/30 p-12 inline-block">
              <h2 className="text-3xl font-bold mb-4">Ready to build something amazing?</h2>
              <p className="text-gray-300 mb-6 max-w-lg">
                Join thousands of creators who are already building stunning websites with AI
              </p>
              {user ? (
                <Button 
                  onClick={() => navigate("/dashboard")} 
                  className="bg-white text-purple-900 hover:bg-gray-100 font-medium px-8 py-3"
                >
                  Go to Dashboard
                </Button>
              ) : (
                <Button 
                  onClick={() => navigate("/auth")} 
                  className="bg-white text-purple-900 hover:bg-gray-100 font-medium px-8 py-3"
                >
                  Start Creating Now
                </Button>
              )}
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
