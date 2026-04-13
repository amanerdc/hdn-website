import Link from 'next/link';
import { Leaf } from 'lucide-react';
import { Navigation } from '../../components/navigation';
import { Footer } from '../../components/footer';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { getProducts } from '../../lib/site-content';
import { productCategories } from '../../lib/product-categories';

export const metadata = {
  title: 'Our Products - HDN Integrated Farm',
  description: 'Browse HDN Integrated Farm product categories.',
};

export default async function ProductsPage() {
  const products = await getProducts();
  return (
    <div className="page-shell">
      <Navigation />

      <section className="section-band">
        <div className="leaf-blob left-0 top-10 h-64 w-64" />
        <div className="section-shell relative">
          <div className="hero-card px-6 py-10 md:px-10 md:py-12">
            <span className="eyebrow">
              <Leaf size={14} />
              Our Products
            </span>
            <h1 className="mt-5 text-5xl font-semibold leading-[0.95] text-foreground md:text-6xl">Explore by Category</h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground md:text-lg">
              Select a category to view available products from HDN Integrated Farm.
            </p>
          </div>
        </div>
      </section>

      <section className="section-band-tinted">
        <div className="section-shell">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {productCategories.map((category) => {
              const availableCount = products.filter((product) => product.category === category.label).length;

              return (
                <Link key={category.slug} href={`/products/${category.slug}`}>
                  <Card className="h-full transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_rgba(33,74,52,0.14)]">
                    <CardHeader>
                      <CardTitle className="text-2xl">{category.label}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm leading-7 text-muted-foreground">{category.intro}</p>
                      <p className="mt-4 text-sm font-semibold text-primary">Available items: {availableCount}</p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
