
import { supabase } from '@/integrations/supabase/client';

interface GenerateWebsiteParams {
  prompt: string;
}

interface WebsiteData {
  title: string;
  description: string;
  html_content: string;
  css_content: string;
  js_content: string;
  preview_image_url?: string;
}

export const websiteService = {
  generateWebsite: async ({ prompt }: GenerateWebsiteParams) => {
    try {
      // This is a placeholder. In production, you'd call a Supabase edge function
      // that would use AI to generate website content based on the prompt
      
      // Simulating API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock response data
      return {
        title: `Website about ${prompt.split(' ').slice(0, 3).join(' ')}`,
        description: `A beautiful website about ${prompt}`,
        html_content: `<div class="container"><h1>Hello World</h1><p>This is a website about ${prompt}</p></div>`,
        css_content: `.container { max-width: 1200px; margin: 0 auto; padding: 2rem; }`,
        js_content: `console.log('Website loaded');`,
      };
    } catch (error) {
      console.error('Error generating website:', error);
      throw error;
    }
  },

  saveWebsite: async (websiteData: WebsiteData) => {
    try {
      const { data, error } = await supabase
        .from('websites')
        .insert([websiteData])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error saving website:', error);
      throw error;
    }
  },

  getWebsites: async () => {
    try {
      const { data, error } = await supabase
        .from('websites')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching websites:', error);
      throw error;
    }
  },

  getWebsiteById: async (id: string) => {
    try {
      const { data, error } = await supabase
        .from('websites')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching website:', error);
      throw error;
    }
  },
};
