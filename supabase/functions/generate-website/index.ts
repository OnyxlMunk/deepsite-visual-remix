
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: corsHeaders,
    });
  }

  try {
    const { prompt } = await req.json();

    // In a real implementation, you would use AI to generate website content
    // For now, we'll mock a response
    
    // Generate a title based on the prompt
    const titleWords = prompt.split(" ").slice(0, 3).join(" ");
    const title = `${titleWords} Website`;
    
    // Generate a simple description
    const description = `A beautiful website about ${prompt}`;
    
    // Generate placeholder HTML, CSS, and JS content
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header>
    <nav>
      <div class="logo">${title}</div>
      <ul class="nav-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  </header>
  
  <section id="hero">
    <div class="hero-content">
      <h1>Welcome to ${title}</h1>
      <p>${description}</p>
      <button class="cta-button">Get Started</button>
    </div>
  </section>
  
  <section id="about">
    <div class="container">
      <h2>About Us</h2>
      <p>We are a company dedicated to providing excellent services related to ${prompt}.</p>
    </div>
  </section>
  
  <section id="services">
    <div class="container">
      <h2>Our Services</h2>
      <div class="services-grid">
        <div class="service-card">
          <h3>Service 1</h3>
          <p>Description of service 1</p>
        </div>
        <div class="service-card">
          <h3>Service 2</h3>
          <p>Description of service 2</p>
        </div>
        <div class="service-card">
          <h3>Service 3</h3>
          <p>Description of service 3</p>
        </div>
      </div>
    </div>
  </section>
  
  <section id="contact">
    <div class="container">
      <h2>Contact Us</h2>
      <form>
        <div class="form-group">
          <label for="name">Name</label>
          <input type="text" id="name" name="name">
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" name="email">
        </div>
        <div class="form-group">
          <label for="message">Message</label>
          <textarea id="message" name="message"></textarea>
        </div>
        <button type="submit">Send Message</button>
      </form>
    </div>
  </section>
  
  <footer>
    <div class="container">
      <p>&copy; 2025 ${title}. All rights reserved.</p>
    </div>
  </footer>
  
  <script src="script.js"></script>
</body>
</html>
    `;
    
    const cssContent = `
/* Global Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Arial', sans-serif;
  line-height: 1.6;
  color: #333;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

/* Header */
header {
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: #5928e5;
}

.nav-links {
  display: flex;
  list-style: none;
}

.nav-links li {
  margin-left: 2rem;
}

.nav-links a {
  text-decoration: none;
  color: #333;
  font-weight: 500;
  transition: color 0.3s ease;
}

.nav-links a:hover {
  color: #5928e5;
}

/* Hero Section */
#hero {
  height: 100vh;
  background: linear-gradient(to right, #5928e5, #4285f4);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  padding: 2rem;
}

.hero-content {
  max-width: 800px;
}

.hero-content h1 {
  font-size: 3rem;
  margin-bottom: 1.5rem;
}

.hero-content p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
}

.cta-button {
  padding: 1rem 2rem;
  background: white;
  color: #5928e5;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
}

.cta-button:hover {
  background: rgba(255,255,255,0.9);
  transform: translateY(-2px);
}

/* About Section */
#about {
  padding: 8rem 0;
  background-color: #f9f9f9;
}

#about h2 {
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-align: center;
}

/* Services Section */
#services {
  padding: 8rem 0;
}

#services h2 {
  font-size: 2.5rem;
  margin-bottom: 3rem;
  text-align: center;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.service-card {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
}

.service-card:hover {
  transform: translateY(-10px);
}

.service-card h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #5928e5;
}

/* Contact Section */
#contact {
  padding: 8rem 0;
  background-color: #f9f9f9;
}

#contact h2 {
  font-size: 2.5rem;
  margin-bottom: 3rem;
  text-align: center;
}

form {
  max-width: 600px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

input, textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

textarea {
  height: 150px;
}

form button {
  padding: 1rem 2rem;
  background: #5928e5;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s ease;
}

form button:hover {
  background: #4920c5;
}

/* Footer */
footer {
  background: #333;
  color: white;
  text-align: center;
  padding: 2rem 0;
}

/* Responsive */
@media (max-width: 768px) {
  nav {
    flex-direction: column;
    padding: 1rem;
  }
  
  .nav-links {
    margin-top: 1rem;
  }
  
  .nav-links li {
    margin-left: 1rem;
    margin-right: 1rem;
  }
  
  .hero-content h1 {
    font-size: 2.5rem;
  }
}
    `;
    
    const jsContent = `
document.addEventListener('DOMContentLoaded', function() {
  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
  
  // Form submission
  const form = document.querySelector('form');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Thank you for your message. We will get back to you soon!');
      form.reset();
    });
  }
  
  // Add animation on scroll
  const sections = document.querySelectorAll('section');
  
  window.addEventListener('scroll', function() {
    const windowHeight = window.innerHeight;
    const scrollY = window.scrollY;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      
      if (scrollY > sectionTop - windowHeight + sectionHeight / 3) {
        section.classList.add('fade-in');
      }
    });
  });
  
  console.log('Website for ${prompt} loaded successfully');
});
    `;

    return new Response(
      JSON.stringify({
        title,
        description,
        html_content: htmlContent,
        css_content: cssContent,
        js_content: jsContent,
      }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error:", error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});
