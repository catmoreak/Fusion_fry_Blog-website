import React from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Save, ArrowLeft, Eye, Tag as TagIcon, X } from 'lucide-react';
import { ThemeToggle } from '../components/ThemeToggle';
import { authService } from '../services/authService';
import { blogService } from '../services/blogService';
import { Tag } from '../lib/supabase';

export const AdminBlogEditorPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);
  const [tags, setTags] = React.useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);
  const [newTag, setNewTag] = React.useState('');

  const [formData, setFormData] = React.useState({
    title: '',
    content: '',
    excerpt: '',
    slug: '',
    featured_image: '',
    published: false,
    meta_title: '',
    meta_description: ''
  });

  React.useEffect(() => {
    const checkUser = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        setUser(currentUser);
        if (currentUser) {
          await loadTags();
          if (id && id !== 'new') {
            await loadBlog();
          }
        }
      } catch (error) {
        console.error('Auth error:', error);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, [id]);

  const loadTags = async () => {
    try {
      const data = await blogService.getTags();
      setTags(data);
    } catch (error) {
      console.error('Error loading tags:', error);
    }
  };

  const loadBlog = async () => {
    if (!id || id === 'new') return;

    try {
      const blogs = await blogService.getAllBlogs();
      const blog = blogs.find(b => b.id === id);
      
      if (blog) {
        setFormData({
          title: blog.title,
          content: blog.content,
          excerpt: blog.excerpt,
          slug: blog.slug,
          featured_image: blog.featured_image || '',
          published: blog.published,
          meta_title: blog.meta_title || '',
          meta_description: blog.meta_description || ''
        });
        
        if (blog.tags) {
          setSelectedTags(blog.tags.map((tag: Tag) => tag.id));
        }
      }
    } catch (error) {
      console.error('Error loading blog:', error);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .trim();
  };

  const handleTitleChange = (title: string) => {
    setFormData(prev => ({
      ...prev,
      title,
      slug: prev.slug || generateSlug(title)
    }));
  };

  const handleAddTag = async () => {
    if (!newTag.trim()) return;

    try {
      const tag = await blogService.createTag(newTag.trim());
      setTags(prev => [...prev, tag]);
      setSelectedTags(prev => [...prev, tag.id]);
      setNewTag('');
    } catch (error) {
      console.error('Error creating tag:', error);
      alert('Failed to create tag');
    }
  };

  const handleRemoveTag = (tagId: string) => {
    setSelectedTags(prev => prev.filter(id => id !== tagId));
  };

  const handleSave = async (publish: boolean = false) => {
    if (!formData.title || !formData.content) {
      alert('Title and content are required');
      return;
    }

    setSaving(true);
    try {
      const blogData = {
        ...formData,
        published: publish,
        meta_title: formData.meta_title || formData.title,
        meta_description: formData.meta_description || formData.excerpt
      };

      if (id && id !== 'new') {
        await blogService.updateBlog(id, blogData, selectedTags);
      } else {
        await blogService.createBlog(blogData, selectedTags);
      }

      navigate('/admin/dashboard');
    } catch (error) {
      console.error('Error saving blog:', error);
      alert('Failed to save blog post');
    } finally {
      setSaving(false);
    }
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

  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['blockquote', 'code-block'],
      ['link', 'image'],
      ['clean']
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button
                onClick={() => navigate('/admin/dashboard')}
                className="flex items-center text-gray-600 hover:text-blue-600 transition-colors mr-4"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Dashboard
              </button>
              <h1 className="text-xl font-semibold text-gray-900">
                {id === 'new' ? 'New Blog Post' : 'Edit Blog Post'}
              </h1>
            </div>
            <div className="flex items-center space-x-3">
              <ThemeToggle />
              <button
                onClick={() => handleSave(false)}
                disabled={saving}
                className="flex items-center px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Draft
              </button>
              <button
                onClick={() => handleSave(true)}
                disabled={saving}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                <Eye className="h-4 w-4 mr-2" />
                {saving ? 'Publishing...' : 'Publish'}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter blog post title"
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              URL Slug *
            </label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="url-friendly-slug"
            />
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Excerpt *
            </label>
            <textarea
              value={formData.excerpt}
              onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Brief description of the blog post"
            />
          </div>

          {/* Featured Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Featured Image URL
            </label>
            <input
              type="url"
              value={formData.featured_image}
              onChange={(e) => setFormData(prev => ({ ...prev, featured_image: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://example.com/image.jpg"
            />
            {formData.featured_image && (
              <img
                src={formData.featured_image}
                alt="Featured"
                className="mt-2 w-32 h-20 object-cover rounded border"
              />
            )}
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Tags
            </label>
            
            {/* Selected Tags */}
            {selectedTags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {selectedTags.map(tagId => {
                  const tagObj = tags.find(t => t.id === tagId);
                  return tagObj ? (
                    <span
                      key={tagId}
                      className="flex items-center px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                    >
                      <TagIcon className="h-3 w-3 mr-1" />
                      {tagObj.name}
                      <button
                        onClick={() => handleRemoveTag(tagId)}
                        className="ml-2 text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-200"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ) : null;
                })}
              </div>
            )}

            {/* Available Tags */}
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                {tags
                  .filter(tagObj => !selectedTags.includes(tagObj.id))
                  .map(tagObj => (
                    <button
                      key={tagObj.id}
                      onClick={() => setSelectedTags(prev => [...prev, tagObj.id])}
                    className="px-3 py-1 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-700 rounded-full text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      + {tagObj.name}
                    </button>
                  ))}
              </div>

              {/* Add New Tag */}
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                  className="flex-1 px-3 py-1 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Add new tag"
                />
                <button
                  onClick={handleAddTag}
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  Add Tag
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Content *
            </label>
            <div className="border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900">
              <ReactQuill
                theme="snow"
                value={formData.content}
                onChange={(content) => setFormData(prev => ({ ...prev, content }))}
                modules={quillModules}
                style={{ minHeight: '300px' }}
              />
            </div>
          </div>

          {/* SEO Settings */}
          <div className="border-t dark:border-gray-700 pt-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">SEO Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Meta Title
                </label>
                <input
                  type="text"
                  value={formData.meta_title}
                  onChange={(e) => setFormData(prev => ({ ...prev, meta_title: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Leave blank to use post title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Meta Description
                </label>
                <textarea
                  value={formData.meta_description}
                  onChange={(e) => setFormData(prev => ({ ...prev, meta_description: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Leave blank to use excerpt"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};