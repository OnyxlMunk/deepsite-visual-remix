
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
      // Get current session to extract the token
      const { data: { session } } = await supabase.auth.getSession();
      
      // Call our Supabase Edge Function to generate website content
      const response = await fetch(
        'https://qwlwkzpfaoydlufsrdau.supabase.co/functions/v1/generate-website',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session?.access_token || ''}`,
          },
          body: JSON.stringify({ prompt }),
        }
      );

      if (!response.ok) {
        throw new Error(`Error generating website: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error generating website:', error);
      
      // Fallback to mock data if the edge function fails
      console.log('Falling back to mock data');
      return {
        title: `Website about ${prompt.split(' ').slice(0, 3).join(' ')}`,
        description: `A beautiful website about ${prompt}`,
        html_content: `<div class="container"><h1>Hello World</h1><p>This is a website about ${prompt}</p></div>`,
        css_content: `.container { max-width: 1200px; margin: 0 auto; padding: 2rem; }`,
        js_content: `console.log('Website loaded');`,
      };
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
