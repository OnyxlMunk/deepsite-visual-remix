
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Code, Palette, Zap, Globe, LogIn } from 'lucide-react';
import { useAuth } from "@/contexts/AuthContext";
import WebsiteGenerator from "@/components/WebsiteGenerator";
import WebsiteViewer from "@/components/WebsiteViewer";
import FeatureCard from "@/components/FeatureCard";

const Index = () => {
  const [generatedSite, setGeneratedSite] = useState<any>(null);
  const { user } = useAuth();
  const navigate = useNavigate();

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
            <WebsiteGenerator onGenerate={setGeneratedSite} />
          </div>

          {/* Preview Section */}
          {generatedSite && (
            <div className="max-w-4xl mx-auto mb-16">
              <WebsiteViewer website={generatedSite} />
            </div>
          )}

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {features.map((feature, index) => (
              <FeatureCard 
                key={index} 
                icon={feature.icon} 
                title={feature.title} 
                description={feature.description} 
              />
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
