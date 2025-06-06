
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Sparkles, ArrowRight } from 'lucide-react';
import { toast } from "sonner";
import { useNavigate } from 'react-router-dom';
import { websiteService } from '@/services/websiteService';
import { useAuth } from '@/contexts/AuthContext';

interface WebsiteGeneratorProps {
  onGenerate: (website: any) => void;
}

const WebsiteGenerator: React.FC<WebsiteGeneratorProps> = ({ onGenerate }) => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
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

      onGenerate({
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

  const examples = [
    "A modern portfolio website for a UX designer with dark theme",
    "An e-commerce landing page for organic skincare products",
    "A tech startup homepage with animated hero section",
    "A restaurant website with online ordering system"
  ];

  return (
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
  );
};

export default WebsiteGenerator;
