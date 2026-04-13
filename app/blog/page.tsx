import { Navigation } from '../../components/navigation';
import { Footer } from '../../components/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import Link from 'next/link';
import { getBlogPosts } from '../../lib/site-content';
import { ArrowRight, Calendar } from 'lucide-react';

export const metadata = {
  title: 'Blog - HDN Integrated Farm',
  description: 'Read articles about organic farming, seasonal produce, recipes, and farm life.',
};

export default async function BlogPage() {
  const blogPosts = await getBlogPosts();
  const featuredPost = blogPosts[0];

  return (
    <div className="page-shell">
      <Navigation />

      <section className="section-band">
        <div className="section-shell">
          <div className="hero-card px-6 py-10 md:px-10 md:py-12">
            <span className="eyebrow">HDN Integrated Farm Blog</span>
            <div className="mt-5 grid gap-8 md:grid-cols-[1fr_0.9fr] md:items-center">
              <div>
                <h1 className="text-5xl font-semibold leading-[0.95] text-foreground md:text-6xl">Find stories, recipes, and farm insights here.</h1>
                <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">
                  Our blog is where we share the heart and soul of HDN Integrated Farm. We hope to inspire and connect you with the rhythms of farm life. Whether you&apos;re a seasoned gardener, a food enthusiast, or just curious about sustainable agriculture, there&apos;s something here for everyone.
                </p>
              </div>
              <div className="image-frame aspect-[4/3]">
                <img src={featuredPost?.image} alt={featuredPost?.title} className="h-full w-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-band">
        <div className="section-shell">
          <div className="mb-12 flex items-end justify-between gap-4">
            <div>
              <span className="eyebrow">All Articles</span>
              <h2 className="mt-4 text-4xl font-semibold text-foreground md:text-5xl">Recent writing from the farm</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <Card key={post.id} className="flex flex-col overflow-hidden">
                <div className="image-frame mx-6 mt-6 aspect-[4/3]">
                  <img src={post.image} alt={post.title} className="h-full w-full object-cover" />
                </div>
                <CardHeader className="flex-1">
                  <div className="flex items-center gap-2 text-xs text-primary">
                    <Calendar size={14} />
                    {post.date}
                  </div>
                  <CardTitle className="text-2xl leading-tight">{post.title}</CardTitle>
                  <CardDescription className="text-sm leading-7">{post.excerpt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href={`/blog/${post.slug}`}>
                    <Button variant="ghost" className="group px-0">
                      Read more
                      <ArrowRight size={14} className="transition group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {featuredPost && (
        <section className="section-band-tinted">
          <div className="section-shell">
            <div className="mb-8">
              <span className="eyebrow">Featured Article</span>
            </div>
            <Card className="overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-[0.9fr_1.1fr]">
                <div className="image-frame m-6 aspect-[4/3] md:aspect-auto">
                  <img src={featuredPost.image} alt={featuredPost.title} className="h-full w-full object-cover" />
                </div>
                <CardContent className="flex flex-col justify-center pb-6 pt-0 md:pb-8 md:pt-8">
                  <div className="flex items-center gap-2 text-sm text-primary">
                    <Calendar size={16} />
                    {featuredPost.date}
                  </div>
                  <CardTitle className="mt-4 text-4xl">{featuredPost.title}</CardTitle>
                  <p className="mt-4 text-base leading-8 text-muted-foreground">{featuredPost.excerpt}</p>
                  <div className="mt-8">
                    <Link href={`/blog/${featuredPost.slug}`}>
                      <Button>
                        Read Article
                        <ArrowRight size={16} />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </div>
            </Card>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
