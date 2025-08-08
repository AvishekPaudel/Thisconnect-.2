import React, { useState, useEffect } from 'react';
import { ArrowRight, Users, MessageCircle, Heart, Share2, Star, Play, Menu, X, Zap, Globe, Shield } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import Navbar from '../components/navbar';

const ThisConnectLanding = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="w-screen min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute -top-1/2 -right-1/2 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/2 -left-1/2 w-96 h-96 bg-gradient-to-tr from-blue-300/20 to-blue-500/20 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8 inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-lg rounded-full border border-white/20">
            <Star className="w-4 h-4 mr-2 text-yellow-400" />
            <span className="text-sm">Join 2M+ users already connecting</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Connect
            <span className="block bg-gradient-to-r from-blue-400 via-blue-300 to-white bg-clip-text text-transparent">
              Authentically
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            The next-generation social platform that puts meaningful connections first. 
            Built with AI, powered by community, protected by privacy.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <NavLink to="./userLogin"> 
            <button className="group bg-gradient-to-r from-blue-500 to-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105 flex items-center">
              Start Connecting
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            </NavLink>
            <NavLink to="./userRegister"> 
            <button className="group flex items-center px-8 py-4 rounded-full border border-white/30 hover:border-white/50 transition-all backdrop-blur-sm">
              <Play className="mr-2 w-5 h-5" />
              Join Us
            </button>
            </NavLink>
          </div>

          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-400">2M+</div>
              <div className="text-gray-400">Active Users</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-300">50M+</div>
              <div className="text-gray-400">Messages Sent</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-200">99.9%</div>
              <div className="text-gray-400">Uptime</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">4.9★</div>
              <div className="text-gray-400">User Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 relative">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-6">
            Ready to 
            <span className="bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent"> Connect</span>?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join millions of users who have already discovered a better way to connect online
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <button className="group bg-gradient-to-r from-blue-500 to-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105 flex items-center">
              Get Started Free
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <p className="text-gray-400 text-sm">
            No credit card required • Free forever • Premium features available
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-lg font-bold">T</span>
              </div>
              <span className="text-xl font-bold">ThisConnect</span>
            </div>
            
            <div className="flex space-x-6 text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Support</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-white/10 text-center text-gray-400">
            <p>&copy; 2025 ThisConnect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ThisConnectLanding;