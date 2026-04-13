export type ProductCategory = {
  slug: string;
  label: string;
  intro: string;
};

export const productCategories: ProductCategory[] = [
  {
    slug: 'fruits',
    label: 'Fruits',
    intro: 'Freshly harvested fruits grown with care and ready for your table.',
  },
  {
    slug: 'vegetables',
    label: 'Vegetables',
    intro: 'Nutritious farm vegetables for daily cooking and healthy meals.',
  },
  {
    slug: 'food-and-beverage',
    label: 'Food & Beverage',
    intro: 'Farm-sourced food and beverage selections crafted for quality and freshness.',
  },
  {
    slug: 'agri-products',
    label: 'Agri-products',
    intro: 'Agricultural products designed to support farmers and growers.',
  },
  {
    slug: 'nursery',
    label: 'Nursery',
    intro: 'Healthy seedlings and nursery items prepared for planting success.',
  },
  {
    slug: 'livestock',
    label: 'Livestock',
    intro: 'We implement precision breeding at HDN Integrated Farm, carefully selected elite genetics, for stronger herd performance, improved meat quality, and a more sustainable future for livestock in Bicol. ',
  },
];

export function getProductCategoryBySlug(slug: string): ProductCategory | undefined {
  return productCategories.find((category) => category.slug === slug);
}
