import { Navigation } from '../../../components/navigation';
import { Footer } from '../../../components/footer';
import { Button } from '../../../components/ui/button';
import Link from 'next/link';
import { getBlogPostBySlug, getBlogPosts } from '../../../lib/site-content';
import { Calendar, ArrowLeft, ArrowRight, BookOpen } from 'lucide-react';
import { notFound } from 'next/navigation';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const [post, blogPosts] = await Promise.all([getBlogPostBySlug(slug), getBlogPosts()]);

  if (!post) {
    notFound();
  }

  const currentIndex = blogPosts.findIndex((p) => p.slug === slug);
  const previousPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;

  return (
    <div className="page-shell">
      <Navigation />

      <section className="section-band">
        <div className="section-shell">
          <div className="hero-card px-6 py-10 md:px-10 md:py-12">
            <Link href="/blog">
              <Button variant="ghost" className="mb-6">
                <ArrowLeft size={18} />
                Back to Blog
              </Button>
            </Link>

            <span className="eyebrow">Article</span>
            <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-[0.95] text-foreground md:text-6xl">{post.title}</h1>
            <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-2 text-primary">
                <Calendar size={16} />
                {post.date}
              </span>
              <span>by {post.author}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section-band-tinted">
        <div className="section-shell">
          <div className="mx-auto max-w-4xl">
            <div className="image-frame aspect-[16/9]">
              <img src={post.image} alt={post.title} className="h-full w-full object-cover" />
            </div>

            <div className="hero-card mt-8 p-8 md:p-10">
              <p className="text-lg leading-8 text-muted-foreground">{post.excerpt}</p>

              <div className="mt-8 rounded-[1.5rem] border border-primary/10 bg-white/72 p-6 md:p-8">
                <h2 className="text-3xl font-semibold text-foreground">Article Content</h2>
                <p className="mt-4 text-base leading-8 text-muted-foreground">{post.content}</p>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">This article content is managed from the admin dashboard and stored in Supabase.</p>
              </div>

              <div className="mt-8 border-t border-border pt-8">
                <h3 className="text-2xl font-semibold text-foreground">About the Author</h3>
                <div className="mt-5 flex gap-4">
                  <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <BookOpen className="text-primary/40" size={30} />
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-foreground">{post.author}</p>
                    <p className="mt-2 text-sm leading-7 text-muted-foreground">
                      Member of HDN Integrated Farm, writing about sustainable agriculture, farming practices, and farm life.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
              {previousPost ? (
                <Link href={`/blog/${previousPost.slug}`} className="glass-panel p-5 transition hover:-translate-y-1">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">Previous Article</p>
                  <p className="mt-3 text-2xl font-semibold text-foreground">{previousPost.title}</p>
                </Link>
              ) : (
                <div />
              )}

              {nextPost && (
                <Link href={`/blog/${nextPost.slug}`} className="glass-panel p-5 text-right transition hover:-translate-y-1">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">Next Article</p>
                  <p className="mt-3 inline-flex items-center gap-2 text-2xl font-semibold text-foreground">
                    {nextPost.title}
                    <ArrowRight size={18} />
                  </p>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
