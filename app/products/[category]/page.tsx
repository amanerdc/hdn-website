import { notFound } from 'next/navigation';
import { Navigation } from '../../../components/navigation';
import { Footer } from '../../../components/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { DiamondMinus, DiamondPlus, Leaf } from 'lucide-react';
import { getProducts } from '../../../lib/site-content';
import { getProductCategoryBySlug, productCategories } from '../../../lib/product-categories';

type ProductCategoryPageProps = {
  params: Promise<{
    category: string;
  }>;
};

export function generateStaticParams() {
  return productCategories.map((category) => ({ category: category.slug }));
}

export default async function ProductCategoryPage({ params }: ProductCategoryPageProps) {
  const resolvedParams = await params;
  const category = getProductCategoryBySlug(resolvedParams.category);
  const products = await getProducts();

  if (!category) {
    notFound();
  }

  const items = products.filter((product) => product.category === category.label);

  const formatPrice = (price: string) => {
    const parsedPrice = Number(price);

    if (Number.isNaN(parsedPrice)) {
      return price;
    }

    const decimalPartLength = price.includes('.') ? price.split('.')[1].length : 0;

    return parsedPrice.toLocaleString('en-PH', {
      minimumFractionDigits: decimalPartLength,
      maximumFractionDigits: decimalPartLength,
    });
  };

  return (
    <div className="page-shell">
      <Navigation />

      <section className="section-band">
        <div className="leaf-blob left-0 top-10 h-64 w-64" />
        <div className="section-shell relative">
          <div className="hero-card px-6 py-10 md:px-10 md:py-12">
            <span className="eyebrow">
              <Leaf size={14} />
              Product Category
            </span>
            <h1 className="mt-5 text-5xl font-semibold leading-[0.95] text-foreground md:text-6xl">{category.label}</h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground md:text-lg">{category.intro}</p>
          </div>
        </div>
      </section>

      <section className="section-band-tinted">
        <div className="section-shell">
          {items.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {items.map((product) => (
                <Card key={product.id} className="flex flex-col overflow-hidden">
                  <div className="image-frame mx-6 mt-6 aspect-[4/3]">
                    <img src={product.image} alt={product.name} className="h-full w-full object-cover transition duration-500 hover:scale-105" />
                  </div>
                  <CardHeader className="flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <CardDescription className="text-primary">{product.category}</CardDescription>
                        <CardTitle className="mt-2 text-2xl">{product.name}</CardTitle>
                      </div>
                      <span
                        className={`inline-flex shrink-0 items-center gap-1 whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${
                          product.availability ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        {product.availability ? <DiamondPlus size={12} /> : <DiamondMinus size={12} />}
                        {product.availability ? 'Available' : 'Coming soon'}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="min-h-20 text-sm leading-7 text-muted-foreground">{product.description}</p>
                    <div className="mt-6 border-t border-border pt-5">
                      <div className="flex items-end justify-between gap-4">
                        <div>
                          <p className="text-3xl font-semibold text-primary">PHP {formatPrice(product.price)}</p>
                          <p className="text-sm text-muted-foreground">{product.unit}</p>
                        </div>
                        <p className="shrink-0 whitespace-nowrap text-sm text-muted-foreground">In stock: {product.inStock}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="hero-card p-8 text-center md:p-10">
              <p className="text-base leading-8 text-muted-foreground md:text-lg">No available products in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
