
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from "sonner";
import { Globe } from 'lucide-react';

const Auth = () => {
  const { user, signIn, signUp, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // If user is already logged in, redirect to dashboard
  if (user && !loading) {
    return <Navigate to="/dashboard" />;
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const { error } = await signIn(email, password);
    
    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Signed in successfully!');
    }
    
    setIsLoading(false);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      setIsLoading(false);
      return;
    }
    
    const { error } = await signUp(email, password);
    
    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Signed up successfully! Please check your email to confirm your account.');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col items-center justify-center p-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 mb-8 flex items-center space-x-2">
        <Globe className="w-8 h-8 text-purple-400" />
        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          DeepSite
        </h1>
      </div>

      <Card className="w-full max-w-md relative z-10 bg-white/10 backdrop-blur-lg border-white/20">
        <CardHeader>
          <CardTitle className="text-center text-white">Welcome</CardTitle>
          <CardDescription className="text-center text-gray-300">Sign in or create an account to continue</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value="signin">
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm text-gray-200" htmlFor="email-signin">Email</label>
                  <Input
                    id="email-signin"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white/5 border-white/20 text-white"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-200" htmlFor="password-signin">Password</label>
                  <Input
                    id="password-signin"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-white/5 border-white/20 text-white"
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-blue-600" disabled={isLoading}>
                  {isLoading ? 'Signing In...' : 'Sign In'}
                </Button>
              </form>
            </TabsContent>
            <TabsContent value="signup">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm text-gray-200" htmlFor="email-signup">Email</label>
                  <Input
                    id="email-signup"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white/5 border-white/20 text-white"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-200" htmlFor="password-signup">Password</label>
                  <Input
                    id="password-signup"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-white/5 border-white/20 text-white"
                    required
                  />
                  <p className="text-xs text-gray-400">Password must be at least 6 characters</p>
                </div>
                <Button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-blue-600" disabled={isLoading}>
                  {isLoading ? 'Signing Up...' : 'Sign Up'}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="text-center text-xs text-gray-400">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </CardFooter>
      </Card>
    </div>
  );
};

export default Auth;
