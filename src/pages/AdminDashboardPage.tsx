import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Plus, Edit, Trash2, Eye, LogOut, BarChart3, Users, FileText } from 'lucide-react';
import { ThemeToggle } from '../components/ThemeToggle';
import { authService } from '../services/authService';
import { blogService } from '../services/blogService';
import { Blog } from '../lib/supabase';

// Simulated online user count hook (replace with real logic as needed)
const useOnlineUsers = () => {
  const [count, setCount] = React.useState(1);
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCount(Math.floor(Math.random() * 10) + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  return count;
};

export const AdminDashboardPage: React.FC = () => {
  const [user, setUser] = React.useState<any>(null);
  const [blogs, setBlogs] = React.useState<Blog[]>([]);
  const [loading, setLoading] = React.useState(true);
  const onlineUsers = useOnlineUsers();

  React.useEffect(() => {
    const checkUser = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        setUser(currentUser);
        if (currentUser) {
          fetchBlogs();
        }
      } catch (error) {
        console.error('Auth error:', error);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, []);

  const fetchBlogs = async () => {
    try {
      const data = await blogService.getAllBlogs();
      setBlogs(data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await authService.signOut();
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleDeleteBlog = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this blog post?')) {
      return;
    }

    try {
      await blogService.deleteBlog(id);
      fetchBlogs();
    } catch (error) {
      console.error('Error deleting blog:', error);
      alert('Failed to delete blog post');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin" replace />;
  }

  const publishedBlogs = blogs.filter(blog => blog.published);
  const draftBlogs = blogs.filter(blog => !blog.published);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Admin Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              {/* Professional, simple online users badge in navbar */}
              <span className="inline-flex items-center gap-1 px-2 py-0.5 border border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-900 text-green-700 dark:text-green-200 rounded-2xl text-xs font-medium shadow-none">
                <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-1"></span>
                {onlineUsers} online{onlineUsers !== 1 ? ' users' : ' user'}
              </span>
              <ThemeToggle />
              <Link
                to="/"
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <Eye className="h-5 w-5" />
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors"
              >
                <LogOut className="h-5 w-5 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Posts</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">{blogs.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <BarChart3 className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Published</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">{publishedBlogs.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Drafts</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">{draftBlogs.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Blog Posts</h2>
          <Link
            to="/admin/blog/new"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center"
          >
            <Plus className="h-5 w-5 mr-2" />
            New Post
          </Link>
        </div>

        {/* Blog Posts Table */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
          {blogs.length === 0 ? (
            <div className="text-center py-8 sm:py-12 px-4 bg-white dark:bg-gray-800">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-base sm:text-lg font-medium text-gray-900 dark:text-white mb-2">No blog posts yet</h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4">Get started by creating your first blog post.</p>
              <Link
                to="/admin/blog/new"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm sm:text-base"
              >
                Create First Post
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-900 hidden sm:table-header-group">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {blogs.map((blog) => (
                    <tr key={blog.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 block sm:table-row border-b sm:border-b-0">
                      <td className="px-4 sm:px-6 py-4 block sm:table-cell">
                        <div className="sm:hidden text-xs font-medium text-gray-500 uppercase mb-1">Title</div>
                        <div>
                          <div className="text-sm sm:text-base font-medium text-gray-900 dark:text-white line-clamp-2">{blog.title}</div>
                          <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-300 line-clamp-2 mt-1">{blog.excerpt}</div>
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-2 sm:py-4 block sm:table-cell">
                        <div className="sm:hidden text-xs font-medium text-gray-500 uppercase mb-1">Status</div>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          blog.published 
                            ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' 
                            : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                        }`}>
                          {blog.published ? 'Published' : 'Draft'}
                        </span>
                      </td>
                      <td className="px-4 sm:px-6 py-2 sm:py-4 text-xs sm:text-sm text-gray-500 dark:text-gray-300 block sm:table-cell">
                        <div className="sm:hidden text-xs font-medium text-gray-500 uppercase mb-1">Created</div>
                        {formatDate(blog.created_at)}
                      </td>
                      <td className="px-4 sm:px-6 py-2 sm:py-4 block sm:table-cell">
                        <div className="sm:hidden text-xs font-medium text-gray-500 uppercase mb-1">Actions</div>
                        <div className="flex items-center space-x-3">
                          {blog.published && (
                            <Link
                              to={`/blog/${blog.slug}`}
                              className="text-gray-600 hover:text-blue-600 transition-colors p-1"
                              title="View"
                            >
                              <Eye className="h-4 w-4" />
                            </Link>
                          )}
                          <Link
                            to={`/admin/blog/edit/${blog.id}`}
                            className="text-gray-600 hover:text-blue-600 transition-colors p-1"
                            title="Edit"
                          >
                            <Edit className="h-4 w-4" />
                          </Link>
                          <button
                            onClick={() => handleDeleteBlog(blog.id)}
                            className="text-gray-600 hover:text-red-600 transition-colors p-1"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};