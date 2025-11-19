import React, { useState, useEffect } from 'react';
import { User, Post, ViewState, Stain } from './types';
import { Onboarding } from './views/Onboarding';
import { PostBlock } from './components/PostBlock';
import { ComposeModal } from './components/ComposeModal';
import { Navigation } from './components/Navigation';
import { generateHex } from './utils/colorUtils';
import { Trash2 } from 'lucide-react';

// Mock initial data for a populated feed
const INITIAL_POSTS: Post[] = [
  {
    id: 'init-1',
    authorHex: '#FF4500',
    content: "I AM BURNING IN ORANGE SILENCE.",
    timestamp: Date.now() - 100000,
    stains: []
  },
  {
    id: 'init-2',
    authorHex: '#4B0082',
    content: "THE VOID STARES BACK.",
    timestamp: Date.now() - 200000,
    stains: []
  },
  {
    id: 'init-3',
    authorHex: '#00FF7F',
    content: "DIGITAL MOSS GROWS ON STATIC.",
    timestamp: Date.now() - 300000,
    stains: []
  }
];

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [view, setView] = useState<ViewState>(ViewState.ONBOARDING);
  const [isComposeOpen, setIsComposeOpen] = useState(false);

  // Load data on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('chroma_user');
    const storedPosts = localStorage.getItem('chroma_posts');

    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setView(ViewState.SPECTRUM);
    }

    if (storedPosts) {
      setPosts(JSON.parse(storedPosts));
    } else {
      setPosts(INITIAL_POSTS);
    }
  }, []);

  // Persistence effect
  useEffect(() => {
    if (posts.length > 0) {
      localStorage.setItem('chroma_posts', JSON.stringify(posts));
    }
  }, [posts]);

  const handleOnboardingComplete = (hex: string) => {
    const newUser: User = {
      chroma_id: hex,
      joinedAt: Date.now(),
    };
    setUser(newUser);
    localStorage.setItem('chroma_user', JSON.stringify(newUser));
    setView(ViewState.SPECTRUM);
  };

  const handleComposeSubmit = (content: string) => {
    if (!user) return;
    
    const newPost: Post = {
      id: crypto.randomUUID(),
      authorHex: user.chroma_id,
      content,
      timestamp: Date.now(),
      stains: []
    };

    setPosts(prev => [newPost, ...prev]);
  };

  const handleStain = (postId: string, stain: Stain) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          stains: [...post.stains, stain]
        };
      }
      return post;
    }));
  };

  const handleClearData = () => {
      if(window.confirm("SEVER CONNECTION PERMANENTLY?")) {
          localStorage.clear();
          window.location.reload();
      }
  }

  if (!user || view === ViewState.ONBOARDING) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  return (
    <div className="min-h-screen bg-black text-neutral-200 pb-24">
      
      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-40 px-6 py-4 flex justify-between items-center bg-gradient-to-b from-black/90 to-transparent pointer-events-none">
        <h1 className="text-xl font-bold tracking-tighter pointer-events-auto mix-blend-difference">CHROMA</h1>
        <div className="flex items-center gap-2 pointer-events-auto">
             <div className="w-3 h-3 rounded-full animate-pulse" style={{ backgroundColor: user.chroma_id }}></div>
             <span className="text-[10px] tracking-widest font-mono text-neutral-500">{user.chroma_id}</span>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="w-full max-w-4xl mx-auto min-h-screen pt-20">
        
        {view === ViewState.SPECTRUM && (
          <div className="flex flex-col gap-0 divide-y-0">
             {/* Start of Feed Message */}
             <div className="py-12 text-center text-neutral-800 text-xs tracking-[1em] select-none">
                THE SPECTRUM
             </div>
             
             {posts.map(post => (
               <PostBlock 
                  key={post.id} 
                  post={post} 
                  currentUserHex={user.chroma_id} 
                  onStain={handleStain}
                />
             ))}

             {posts.length === 0 && (
               <div className="text-center py-32 text-neutral-700 tracking-widest">
                 SILENCE...
               </div>
             )}
          </div>
        )}

        {view === ViewState.MONOLITH && (
          <div className="p-6 space-y-12 animate-in fade-in duration-500">
            <div className="w-full aspect-square md:aspect-[21/9] flex flex-col items-center justify-center relative group overflow-hidden">
              <div className="absolute inset-0 transition-transform duration-1000 group-hover:scale-110" style={{ backgroundColor: user.chroma_id }}></div>
              <div className="relative z-10 text-center bg-black/20 backdrop-blur-sm p-8">
                <h2 className="text-4xl md:text-6xl font-bold tracking-wider text-white mix-blend-overlay">{user.chroma_id}</h2>
                <p className="mt-4 text-xs tracking-[0.5em] text-white/80">IDENTITY ESTABLISHED</p>
                <p className="mt-2 text-[10px] text-white/50">{new Date(user.joinedAt).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="space-y-8">
              <div className="flex items-center justify-between border-b border-neutral-900 pb-4">
                <h3 className="text-sm tracking-[0.3em] text-neutral-500">ARCHIVE</h3>
                <button onClick={handleClearData} className="text-red-900 hover:text-red-500 transition-colors text-xs flex items-center gap-2">
                    <Trash2 size={12} /> SEVER
                </button>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
                {posts.filter(p => p.authorHex === user.chroma_id).map(post => (
                   <div key={post.id} className="aspect-square relative group cursor-pointer" style={{ backgroundColor: post.authorHex }}>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/50 transition-opacity">
                          <span className="text-[10px] text-white px-2 text-center">{post.content.substring(0, 20)}...</span>
                      </div>
                      {post.stains.length > 0 && (
                          <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-white mix-blend-difference" />
                      )}
                   </div>
                ))}
                {posts.filter(p => p.authorHex === user.chroma_id).length === 0 && (
                  <div className="col-span-full py-12 text-center text-neutral-800 text-xs tracking-widest">
                    NO ECHOS YET
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

      </main>

      <Navigation 
        currentView={view} 
        onNavigate={setView} 
        onCompose={() => setIsComposeOpen(true)}
        userHex={user.chroma_id}
      />

      <ComposeModal 
        isOpen={isComposeOpen} 
        onClose={() => setIsComposeOpen(false)}
        onSubmit={handleComposeSubmit}
        userHex={user.chroma_id}
      />
    </div>
  );
};

export default App;