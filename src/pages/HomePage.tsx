import React from 'react';
import { useLoader } from '../components/GlobalLoaderContext';
// import { CircleLoader } from '../components/CircleLoader';
import { useSearchParams } from 'react-router-dom';
import { BlogCard } from '../components/BlogCard';
import { SEO } from '../components/SEO';
import { blogService } from '../services/blogService';
import { Blog, supabase } from '../lib/supabase';
import { Clock, Tag, X } from 'lucide-react';

export const HomePage: React.FC = () => {
  // TTS state for pause/resume per homepage
  const [isSpeaking, setIsSpeaking] = React.useState(false);
  const [isPaused, setIsPaused] = React.useState(false);
  const [currentUtterId, setCurrentUtterId] = React.useState<string | null>(null);
  const utterRef = React.useRef<SpeechSynthesisUtterance | null>(null);
  // Scroll to articles section
  const handleExploreArticles = () => {
    const section = document.getElementById('articles-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const [searchParams, setSearchParams] = useSearchParams();
  const [blogs, setBlogs] = React.useState<Blog[]>([]);
  const [searchQuery, setSearchQuery] = React.useState('');
  // Filter blogs by search query (title or content)
  const filteredBlogs = React.useMemo(() => {
    if (!searchQuery.trim()) return blogs;
    const q = searchQuery.toLowerCase();
    return blogs.filter((blog: Blog) =>
      blog.title?.toLowerCase().includes(q) ||
      blog.content?.toLowerCase().includes(q)
    );
  }, [blogs, searchQuery]);
  const { showMacbookLoader, setShowMacbookLoader } = useLoader();
  const [loading, setLoading] = React.useState(true);
  // const [showCircleLoader, setShowCircleLoader] = React.useState(false);
  const selectedTag = searchParams.get('tag');





  React.useEffect(() => {
    const fetchBlogs = async () => {
      const start = Date.now();
      try {
        if (!supabase) {
          setBlogs([]);
        } else {
          const data = await blogService.getPublishedBlogs();
          // Filter by tag if selected
          if (selectedTag) {
            const filteredBlogs = data.filter((blog: Blog) => 
              blog.tags?.some((tag: { slug: string }) => tag.slug === selectedTag)
            );
            setBlogs(filteredBlogs);
          } else {
            setBlogs(data);
          }
        }
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        const elapsed = Date.now() - start;
        const minDelay = 6000;
        if (elapsed < minDelay) {
          setTimeout(() => {
            setLoading(false);
            setShowMacbookLoader(false);
          }, minDelay - elapsed);
        } else {
          setLoading(false);
          setShowMacbookLoader(false);
        }
      }
    };
    fetchBlogs();
  }, [selectedTag, setShowMacbookLoader]);

  const clearTagFilter = () => {
    setSearchParams({});
  };

  const getTagName = () => {
    if (!selectedTag || blogs.length === 0) return '';
    const firstBlog = blogs[0];
    const tag = firstBlog.tags?.find(t => t.slug === selectedTag);
    return tag?.name || selectedTag;
  };

  if (showMacbookLoader && loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 dark:from-gray-900 dark:via-blue-900 dark:to-gray-900">
        <div className="macbook-responsive flex items-center justify-center w-full h-full">
          <div className="macbook mx-auto">
            <div className="inner">
              <div className="screen">
                <div className="face-one">
                  <div className="camera"></div>
                  <div className="display">
                    <div className="shade"></div>
                  </div>
                  <span>MacBook Air</span>
                </div>
              </div>
              <div className="macbody">
                <div className="face-one">
                  <div className="touchpad"></div>
                  <div className="keyboard">
                    {Array.from({ length: 48 }).map((_, i) => (
                      <div key={i} className={`key${i === 12 ? ' space' : ''}${i >= 36 ? ' f' : ''}`}></div>
                    ))}
                  </div>
                </div>
                <div className="pad one"></div>
                <div className="pad two"></div>
                <div className="pad three"></div>
                <div className="pad four"></div>
              </div>
            </div>
            <div className="shadow"></div>
          </div>
        </div>
        {/* Loading text removed as requested */}
        <style>{`
          .macbook-responsive {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100vw;
            height: 100vh;
            min-width: 100vw;
            min-height: 100vh;
            overflow: hidden;
            margin: 0;
            padding: 0;
          }
          .macbook {
            width: 150px;
            height: 96px;
            perspective: 500px;
            display: flex;
            align-items: center;
            justify-content: center;
            position: static;
            margin: 0 auto;
          }
          @media (max-width: 600px) {
            .macbook {
              width: 80vw;
              height: 52vw;
              max-width: 120px;
              max-height: 70px;
              min-width: 70px;
              min-height: 40px;
            }
            .macbook-responsive {
              width: 100vw;
              height: 100vh;
              min-width: 100vw;
              min-height: 100vh;
              padding: 0;
              margin: 0;
            }
          }
          @media (max-width: 400px) {
            .macbook {
              width: 60vw;
              height: 38vw;
              max-width: 90px;
              max-height: 55px;
              min-width: 50px;
              min-height: 30px;
            }
          }
          .shadow {
            position: absolute;
            width: 60px;
            height: 0px;
            left: 40px;
            top: 160px;
            transform: rotateX(80deg) rotateY(0deg) rotateZ(0deg);
            box-shadow: 0 0 60px 40px rgba(0,0,0,0.3);
            animation: shadow infinite 7s ease;
          }
          .inner {
            z-index: 20;
            position: absolute;
            width: 150px;
            height: 96px;
            left: 0;
            top: 0;
            transform-style: preserve-3d;
            transform: rotateX(-20deg) rotateY(0deg) rotateZ(0deg);
            animation: rotate infinite 7s ease;
          }
          .screen {
            width: 150px;
            height: 96px;
            position: absolute;
            left: 0;
            bottom: 0;
            border-radius: 7px;
            background: #ddd;
            transform-style: preserve-3d;
            transform-origin: 50% 93px;
            transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
            animation: lid-screen infinite 7s ease;
            background-image: linear-gradient(45deg, rgba(0,0,0,0.34) 0%,rgba(0,0,0,0) 100%);
            background-position: left bottom;
            background-size: 300px 300px;
            box-shadow: inset 0 3px 7px rgba(255,255,255,0.5);
          }
          .screen .face-one {
            width: 150px;
            height: 96px;
            position: absolute;
            left: 0;
            bottom: 0;
            border-radius: 7px;
            background: #d3d3d3;
            transform: translateZ(2px);
            background-image: linear-gradient(45deg,rgba(0,0,0,0.24) 0%,rgba(0,0,0,0) 100%);
          }
          .screen .face-one .camera {
            width: 3px;
            height: 3px;
            border-radius: 100%;
            background: #000;
            position: absolute;
            left: 50%;
            top: 4px;
            margin-left: -1.5px;
          }
          .screen .face-one .display {
            width: 130px;
            height: 74px;
            margin: 10px;
            background-color: #000;
            background-size: 100% 100%;
            border-radius: 1px;
            position: relative;
            box-shadow: inset 0 0 2px rgba(0,0,0,1);
          }
          .screen .face-one .display .shade {
            position: absolute;
            left: 0;
            top: 0;
            width: 130px;
            height: 74px;
            background: linear-gradient(-135deg, rgba(255,255,255,0) 0%,rgba(255,255,255,0.1) 47%,rgba(255,255,255,0) 48%);
            animation: screen-shade infinite 7s ease;
            background-size: 300px 200px;
            background-position: 0px 0px;
          }
          .screen .face-one span {
            position: absolute;
            top: 85px;
            left: 57px;
            font-size: 6px;
            color: #666;
          }
          .macbody {
            width: 150px;
            height: 96px;
            position: absolute;
            left: 0;
            bottom: 0;
            border-radius: 7px;
            background: #cbcbcb;
            transform-style: preserve-3d;
            transform-origin: 50% bottom;
            transform: rotateX(-90deg);
            animation: lid-macbody infinite 7s ease;
            background-image: linear-gradient(45deg, rgba(0,0,0,0.24) 0%,rgba(0,0,0,0) 100%);
          }
          .macbody .face-one {
            width: 150px;
            height: 96px;
            position: absolute;
            left: 0;
            bottom: 0;
            border-radius: 7px;
            transform-style: preserve-3d;
            background: #dfdfdf;
            animation: lid-keyboard-area infinite 7s ease;
            transform: translateZ(-2px);
            background-image: linear-gradient(30deg, rgba(0,0,0,0.24) 0%,rgba(0,0,0,0) 100%);
          }
          .macbody .touchpad {
            width: 40px;
            height: 31px;
            position: absolute;
            left: 50%;
            top: 50%;
            border-radius: 4px;
            margin: -44px 0 0 -18px;
            background: #cdcdcd;
            background-image: linear-gradient(30deg, rgba(0,0,0,0.24) 0%,rgba(0,0,0,0) 100%);
            box-shadow: inset 0 0 3px #888;
          }
          .macbody .keyboard {
            width: 130px;
            height: 45px;
            position: absolute;
            left: 7px;
            top: 41px;
            border-radius: 4px;
            transform-style: preserve-3d;
            background: #cdcdcd;
            background-image: linear-gradient(30deg, rgba(0,0,0,0.24) 0%,rgba(0,0,0,0) 100%);
            box-shadow: inset 0 0 3px #777;
            padding: 0 0 0 2px;
          }
          .keyboard .key {
            width: 6px;
            height: 6px;
            background: #444;
            float: left;
            margin: 1px;
            transform: translateZ(-2px);
            border-radius: 2px;
            box-shadow: 0 -2px 0 #222;
            animation: keys infinite 7s ease;
          }
          .key.space {
            width: 45px;
          }
          .key.f {
            height: 3px;
          }
          .macbody .pad {
            width: 5px;
            height: 5px;
            background: #333;
            border-radius: 100%;
            position: absolute;
          }
          .pad.one { left: 20px; top: 20px; }
          .pad.two { right: 20px; top: 20px; }
          .pad.three { right: 20px; bottom: 20px; }
          .pad.four { left: 20px; bottom: 20px; }
          @keyframes rotate {
            0% { transform: rotateX(-20deg) rotateY(0deg) rotateZ(0deg); }
            5% { transform: rotateX(-20deg) rotateY(-20deg) rotateZ(0deg); }
            20% { transform: rotateX(30deg) rotateY(200deg) rotateZ(0deg); }
            25% { transform: rotateX(-60deg) rotateY(150deg) rotateZ(0deg); }
            60% { transform: rotateX(-20deg) rotateY(130deg) rotateZ(0deg); }
            65% { transform: rotateX(-20deg) rotateY(120deg) rotateZ(0deg); }
            80% { transform: rotateX(-20deg) rotateY(375deg) rotateZ(0deg); }
            85% { transform: rotateX(-20deg) rotateY(357deg) rotateZ(0deg); }
            87% { transform: rotateX(-20deg) rotateY(360deg) rotateZ(0deg); }
            100% { transform: rotateX(-20deg) rotateY(360deg) rotateZ(0deg); }
          }
          @keyframes lid-screen {
            0% { transform: rotateX(0deg); background-position: left bottom; }
            5% { transform: rotateX(50deg); background-position: left bottom; }
            20% { transform: rotateX(-90deg); background-position: -150px top; }
            25% { transform: rotateX(15deg); background-position: left bottom; }
            30% { transform: rotateX(-5deg); background-position: right top; }
            38% { transform: rotateX(5deg); background-position: right top; }
            48% { transform: rotateX(0deg); background-position: right top; }
            90% { transform: rotateX(0deg); background-position: right top; }
            100% { transform: rotateX(0deg); background-position: right center; }
          }
          @keyframes lid-macbody {
            0% { transform: rotateX(-90deg); }
            50% { transform: rotateX(-90deg); }
            100% { transform: rotateX(-90deg); }
          }
          @keyframes lid-keyboard-area {
            0% { background-color: #dfdfdf; }
            50% { background-color: #bbb; }
            100% { background-color: #dfdfdf; }
          }
          @keyframes screen-shade {
            0% { background-position: -20px 0px; }
            5% { background-position: -40px 0px; }
            20% { background-position: 200px 0; }
            50% { background-position: -200px 0; }
            80% { background-position: 0px 0px; }
            85% { background-position: -30px 0; }
            90% { background-position: -20px 0; }
            100% { background-position: -20px 0px; }
          }
          @keyframes keys {
            0% { box-shadow: 0 -2px 0 #222; }
            5% { box-shadow: 1 -1px 0 #222; }
            20% { box-shadow: -1px 1px 0 #222; }
            25% { box-shadow: -1px 1px 0 #222; }
            60% { box-shadow: -1px 1px 0 #222; }
            80% { box-shadow: 0 -2px 0 #222; }
            85% { box-shadow: 0 -2px 0 #222; }
            87% { box-shadow: 0 -2px 0 #222; }
            100% { box-shadow: 0 -2px 0 #222; }
          }
          @keyframes shadow {
            0% { transform: rotateX(80deg) rotateY(0deg) rotateZ(0deg); box-shadow: 0 0 60px 40px rgba(0,0,0,0.3); }
            5% { transform: rotateX(80deg) rotateY(10deg) rotateZ(0deg); box-shadow: 0 0 60px 40px rgba(0,0,0,0.3); }
            20% { transform: rotateX(30deg) rotateY(-20deg) rotateZ(-20deg); box-shadow: 0 0 50px 30px rgba(0,0,0,0.3); }
            25% { transform: rotateX(80deg) rotateY(-20deg) rotateZ(50deg); box-shadow: 0 0 35px 15px rgba(0,0,0,0.1); }
            60% { transform: rotateX(80deg) rotateY(0deg) rotateZ(-50deg) translateX(30px); box-shadow: 0 0 60px 40px rgba(0,0,0,0.3); }
            100% { box-shadow: 0 0 60px 40px rgba(0,0,0,0.3); }
          }
        `}</style>
      </div>
    );
  }

  // Show CircleLoader for navigation (2s) only, not on first load


  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 dark:from-gray-900 dark:via-blue-900 dark:to-gray-900">
      <SEO 
        title="FusionFry - Science and Technology Blog"
        description="Explore cutting-edge science and technology insights at FusionFry. Get the latest trends in AI, biotechnology, quantum computing, and scientific discoveries."
        keywords="science blog, technology news, artificial intelligence, biotechnology, quantum computing, scientific research, tech trends, innovation"
      />
      {/* Hero Section */}
      <section className="bg-white dark:bg-gray-800 py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
            FusionFry
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-blue-600 dark:text-blue-400 font-medium mb-4 sm:mb-6">
            Tech, Trends & Taste—All in One Fry
          </p>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
            Explore cutting-edge scientific research and technological innovations
          </p>
          <button
            className="bg-primary-600 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg hover:bg-primary-700 transition-colors font-medium text-base sm:text-lg"
            onClick={handleExploreArticles}
          >
            Explore Articles
          </button>
        </div>
      </section>

      {/* Articles Section */}
      <section id="articles-section" className="py-8 sm:py-12 lg:py-16 flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8 lg:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              {selectedTag ? `Articles in "${getTagName()}"` : 'Latest Articles'}
            </h2>
            <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search articles..."
                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                style={{ minWidth: 200 }}
              />
              {selectedTag && (
                <button
                  onClick={clearTagFilter}
                  className="flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm"
                >
                  <X className="h-4 w-4 mr-2" />
                  Clear filter
                </button>
              )}
            </div>
          </div>

          {selectedTag && filteredBlogs.length === 0 && !loading && (
            <div className="text-center py-8 sm:py-12 lg:py-16 bg-white dark:bg-gray-800 rounded-lg mb-8">
              <Tag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No articles found
              </h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4">
                No articles found for the category "{getTagName()}"
              </p>
              <button
                onClick={clearTagFilter}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
              >
                View all articles
              </button>
            </div>
          )}

          {filteredBlogs.length === 0 && !selectedTag ? (
            <div className="text-center py-8 sm:py-12 lg:py-16 bg-white dark:bg-gray-800 rounded-lg">
              <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No articles yet
              </h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                Check back soon for new content
              </p>
            </div>
          ) : filteredBlogs.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {filteredBlogs.map((blog: Blog) => (
                <div key={blog.id} className="relative group">
                  <BlogCard blog={blog} />
                  <div className="absolute top-2 right-2 z-10 flex gap-2">
                    <button
                      className={`bg-blue-600 text-white rounded-full p-2 shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition`}
                      title={isSpeaking && currentUtterId === blog.id ? 'Restart reading' : 'Listen to article summary'}
                      onClick={() => {
                        if ('speechSynthesis' in window && 'SpeechSynthesisUtterance' in window) {
                          window.speechSynthesis.cancel();
                          const utter = new window.SpeechSynthesisUtterance();
                          utter.text = `${blog.title}. Article excerpt: ${(blog.content || '').replace(/\s+/g, ' ').slice(0, 220)}${blog.content && blog.content.length > 220 ? '...' : ''}`;
                          utter.lang = 'en-US';
                          utter.rate = 1;
                          // Select a female voice if available
                          const voices = window.speechSynthesis.getVoices();
                          const femaleVoice =
                            voices.find(v => v.lang.startsWith('en') && v.name.toLowerCase().includes('female'))
                            || voices.find(v => v.lang.startsWith('en') && v.name.toLowerCase().includes('woman'))
                            || voices.find(v => v.lang.startsWith('en') && v.name.toLowerCase().includes('girl'))
                            || voices.find(v => v.lang.startsWith('en') && v.name.toLowerCase().includes('zira'))
                            || voices.find(v => v.lang.startsWith('en') && v.name.toLowerCase().includes('susan'))
                            || voices.find(v => v.lang.startsWith('en'));
                          if (femaleVoice) {
                            utter.voice = femaleVoice;
                          }
                          utter.onend = () => { setIsSpeaking(false); setIsPaused(false); setCurrentUtterId(null); utterRef.current = null; };
                          utter.onerror = () => { setIsSpeaking(false); setIsPaused(false); setCurrentUtterId(null); utterRef.current = null; };
                          utterRef.current = utter;
                          window.speechSynthesis.speak(utter);
                          setIsSpeaking(true);
                          setIsPaused(false);
                          setCurrentUtterId(blog.id);
                        } else {
                          alert('Sorry, your browser does not support text-to-speech.');
                        }
                      }}
                    >
                      <span role="img" aria-label="Listen">🔊</span>
                    </button>
                    {isSpeaking && currentUtterId === blog.id && (
                      <button
                        className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 rounded-full px-3 py-1 text-xs font-semibold hover:bg-blue-200 dark:hover:bg-blue-800 transition border border-blue-200 dark:border-blue-700"
                        onClick={() => {
                          if (isPaused) {
                            window.speechSynthesis.resume();
                            setIsPaused(false);
                          } else {
                            window.speechSynthesis.pause();
                            setIsPaused(true);
                          }
                        }}
                        title={isPaused ? 'Resume reading' : 'Pause reading'}
                      >
                        {isPaused ? (
                          <span className="flex items-center gap-1"><span role="img" aria-label="Resume">▶️</span> Resume</span>
                        ) : (
                          <span className="flex items-center gap-1"><span role="img" aria-label="Pause">⏸️</span> Pause</span>
                        )}
                      </button>
                    )}
                    {isSpeaking && currentUtterId === blog.id && (
                      <button
                        className="bg-gray-100 dark:bg-gray-800 text-blue-700 dark:text-blue-200 rounded-full px-3 py-1 text-xs font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition border border-blue-200 dark:border-blue-700"
                        onClick={() => {
                          window.speechSynthesis.cancel();
                          setIsSpeaking(false);
                          setIsPaused(false);
                          setCurrentUtterId(null);
                          utterRef.current = null;
                        }}
                        title="Stop reading"
                      >
                        <span className="font-bold">✖</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </section>
      {/* <Footer /> removed to prevent duplicate footers; Footer is rendered globally in App.tsx */}
    </div>
  );
};

export default HomePage;