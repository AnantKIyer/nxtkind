import { wixClientServer } from "@/lib/wixClientServer";
import { products } from "@wix/stores";
import Image from "next/image";
import Link from "next/link";
import DOMPurify from "isomorphic-dompurify";
import Pagination from "./Pagination";

interface SearchParams {
    name?: string;
    type?: string;
    min?: number;
    max?: number;
    page?: string;
    sort?: string;
    cat?: string;
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
        .hasSome(
            "productType",
            searchParams?.type ? [searchParams.type] : ["physical", "digital"]
        )
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
        <div className="mt-12 pb-12 flex gap-x-8 gap-y-16 justify-between flex-wrap">
            {res.items.map((product: products.Product) => (
                <Link
                    href={"/" + product.slug}
                    className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]"
                    key={product._id}
                >
                    <div className="relative w-full h-80">
                        <Image
                            src={product.media?.mainMedia?.image?.url || "/product.png"}
                            alt=""
                            fill
                            sizes="25vw"
                            className="absolute object-cover rounded-md z-10 transition-transform duration-500 ease-in-out hover:scale-110"
                        />
                    </div>
                    <div className="flex justify-between">
                        <span className="font-bold text-xl">{product.name}</span>
                        <span className="font-semibold"> ₹{product.priceData?.price}</span>
                    </div>
                    {product.additionalInfoSections && (
                        <div
                            className="text-sm text-gray-500"
                            dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(
                                    product.additionalInfoSections.find(
                                        (section: products.AdditionalInfoSection) => section.title === "shortDesc"
                                    )?.description || ""
                                ),
                            }}
                        ></div>
                    )}
                    <button className=" rounded-lg w-full ring-2 py-2 px-4 text-md hover:bg-[#475A47] hover:text-white">
                        Add to Cart
                    </button>
                </Link>
            ))}
            {(searchParams?.cat || searchParams?.name) && (
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
