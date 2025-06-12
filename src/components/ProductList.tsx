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

    const productQuery = wixClient.products
        .queryProducts()
        .startsWith("name", searchParams?.name || "")
        .eq("collectionIds", categoryId)
        .hasSome(
            "productType",
            searchParams?.type ? [searchParams.type] : ["physical", "digital"]
        )
        .gt("priceData.price", searchParams?.min || 0)
        .lt("priceData.price", searchParams?.max || 999999)
        .limit(limit || PRODUCT_PER_PAGE)
        .skip(
            searchParams?.page
                ? parseInt(searchParams.page) * (limit || PRODUCT_PER_PAGE)
                : 0
        );

    if (searchParams?.sort) {
        const [sortType, sortBy] = searchParams.sort.split(" ");

        if (sortType === "asc") {
            productQuery.ascending(sortBy as SortableFields);
        }
        if (sortType === "desc") {
            productQuery.descending(sortBy as SortableFields);
        }
    }

    const res = await productQuery.find();

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
                            className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500"
                        />
                        {product.media?.items && (
                            <Image
                                src={product.media?.items[1]?.image?.url || "/product.png"}
                                alt=""
                                fill
                                sizes="25vw"
                                className="absolute object-cover rounded-md"
                            />
                        )}
                    </div>
                    <div className="flex justify-between">
                        <span className="font-medium">{product.name}</span>
                        <span className="font-semibold"> &#8377;{product.priceData?.price}</span>
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
                    <button className="rounded-2xl ring-1 ring-lama text-lama w-max py-2 px-4 text-xs hover:bg-[#68D335] hover:text-white">
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

//  const ProductList = () => {
//   return(
//   <div className="flex gap-x-8 gap-y-16 justify-between flex-wrap">
//   <Link href="/test" className="w-full flex flex-col gap-4">
//   <div className="relative w-full h-80">
//   <Image
//   src="https://images.pexels.com/photos/1583582/pexels-photo-1583582.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
//   alt="something"
//   fill
//   sizes="25vw"
//   className="absolute object-cover rounded-nd 2-10 hover:opacity-0 transition-opacity easy duration-500"
//   />
//   <Image
//   src="https://images.pexels.com/photos/1583582/pexels-photo-1583582.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
//   alt="something"
//   fill
//   sizes="25vw"
//   className="absolute object-cover rounded-md"
//   />
//   </div>
//   </Link>

//   </div>
// )}

// export default ProductList;
