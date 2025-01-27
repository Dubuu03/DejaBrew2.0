import { ProductService } from './product.service';  // Adjust the path to your service

type CategoryMethods = 'getBestSellerProducts' | 'getHotProducts' | 'getColdProducts' | 'getNonCoffeeProducts' | 'getPastryProducts';

export const fetchAndMapProducts = (
  productService: ProductService,
  category: CategoryMethods,
  targetArray: any[],
  limit: number = 6,
  highestRatedProduct: { [key: string]: any } // Object to store highest rated product for each category
) => {
  productService[category]().subscribe({
    next: (products: any[]) => {
      targetArray.length = 0;  // Clear previous data in the target array

      targetArray.push(...products
        .map(product => ({
          productId: product._id,
          title: product.productName,
          price: product.price,
          rating: product.ratings.length > 0 
            ? (product.ratings.reduce((sum: number, r: any) => sum + r.rating, 0) / product.ratings.length).toFixed(1)
            : '0.0',
          productImageUrl: product.image || 'assets/images/default-image.png', 
          favorite: product.favorite || false,
          productPath: `/product-details/${product._id}`
        }))
        .slice(0, limit) // Limit to specified number of items
      );

      // Find the highest rated product in the current category
      const highestRated = targetArray.reduce((prev, current) => {
        return (parseFloat(prev.rating) > parseFloat(current.rating)) ? prev : current;
      }, targetArray[0]);

      // Store the highest rated product in the provided object
      highestRatedProduct[category] = highestRated;

      console.log(`Highest Rated ${category.charAt(0).toUpperCase() + category.slice(1)} Product:`, highestRated);
    },
    error: (error) => {
      console.error(`Error fetching ${category}:`, error);
    }
  });
};
