import { wixClientServer } from "@/lib/wixClientServer";
import { products } from "@wix/stores";
import Image from "next/image";
import Link from "next/link";
import DOMPurify from "isomorphic-dompurify";
import Pagination from "./Pagination";
import ClientAddToCartButton from './ClientAddToCartButton';

interface SearchParams {
    name?: string;
    min?: number;
    max?: number;
    page?: string;
    sort?: string;
}

type SortableFields = "_id" | "name" | "slug" | "sku" | "productType" | "price" | "priceData.price" | "numericId" | "lastUpdated";

const PRODUCT_PER_PAGE = 4;

const ProductList = async ({
    categoryId,
    limit,
    searchParams,
}: {
    categoryId: string;
    limit?: number;
    searchParams: SearchParams;
}) => {
    const wixClient = await wixClientServer();

    // Build base query without search filter
    const productQuery = wixClient.products
        .queryProducts()
        .eq("collectionIds", categoryId)
        .gt("priceData.price", searchParams?.min || 0)
        .lt("priceData.price", searchParams?.max || 999999);

    // If search term is provided, fetch more products for partial matching
    const searchTerm = searchParams?.name?.trim();
    let res;
    
    if (searchTerm && searchTerm !== "") {
        // Fetch more products to allow for partial matching
        const searchQuery = productQuery
            .limit(50) // Fetch more products for partial matching
            .skip(
                searchParams?.page
                    ? parseInt(searchParams.page) * (limit || PRODUCT_PER_PAGE)
                    : 0
            );
        
        const searchResults = await searchQuery.find();
        
        // Filter products for partial matches (case-insensitive)
        const filteredItems = searchResults.items.filter((product: products.Product) =>
            product.name?.toLowerCase().includes(searchTerm.toLowerCase())
        );
        
        // Create a new result object with filtered items
        res = {
            ...searchResults,
            items: filteredItems.slice(0, limit || PRODUCT_PER_PAGE),
            totalCount: filteredItems.length,
            hasPrev: () => searchParams?.page ? parseInt(searchParams.page) > 0 : false,
            hasNext: () => filteredItems.length > (limit || PRODUCT_PER_PAGE),
            currentPage: searchParams?.page ? parseInt(searchParams.page) : 0
        };
    } else {
        // No search term, use normal pagination
        const paginatedQuery = productQuery
            .limit(limit || PRODUCT_PER_PAGE)
            .skip(
                searchParams?.page
                    ? parseInt(searchParams.page) * (limit || PRODUCT_PER_PAGE)
                    : 0
            );
        
        res = await paginatedQuery.find();
    }

    if (searchParams?.sort) {
        const [sortType, sortBy] = searchParams.sort.split(" ");

        if (sortType === "asc") {
            productQuery.ascending(sortBy as SortableFields);
        }
        if (sortType === "desc") {
            productQuery.descending(sortBy as SortableFields);
        }
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {res.items.map((product: products.Product) => (
                <div
                    key={product._id}
                    className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group"
                >
                    <Link href={"/" + product.slug}>
                        <div className="relative w-full h-72 p-4">
                            <div className="relative w-full h-full rounded-2xl overflow-hidden">
                                <Image
                                    src={product.media?.mainMedia?.image?.url || "/product.png"}
                                    alt={product.name || "Product"}
                                    fill
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                    className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                        </div>
                    </Link>
                    
                    <div className="px-6 pb-6">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="font-bold text-lg text-gray-900 line-clamp-2 flex-1 mr-4">{product.name}</h3>
                            <span className="font-bold text-xl text-green-600 flex-shrink-0">₹{product.priceData?.price}</span>
                        </div>
                        
                        {product.additionalInfoSections && (
                            <div
                                className="text-sm text-gray-600 mb-6 line-clamp-3 leading-relaxed"
                                dangerouslySetInnerHTML={{
                                    __html: DOMPurify.sanitize(
                                        product.additionalInfoSections.find(
                                            (section: products.AdditionalInfoSection) => section.title === "shortDesc"
                                        )?.description || ""
                                    ),
                                }}
                            ></div>
                        )}
                        
                        <div className="transform group-hover:scale-105 transition-transform duration-300">
                            <ClientAddToCartButton 
                                productId={product._id || ""}
                                variantId={product.variants?.[0]?._id || "00000000-0000-0000-0000-000000000000"}
                                stockNumber={product.variants?.[0]?.stock?.quantity || product.stock?.quantity || 0}
                            />
                        </div>
                    </div>
                </div>
            ))}
            {(searchParams?.name || searchParams?.min || searchParams?.max) && (
                <Pagination
                    currentPage={res.currentPage || 0}
                    hasPrev={res.hasPrev()}
                    hasNext={res.hasNext()}
                />
            )}
        </div>
    );
};

export default ProductList;
