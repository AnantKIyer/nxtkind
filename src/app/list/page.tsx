import Image from "next/image";
import Filter from "@/components/Filter";
import ProductList from "@/components/ProductList";
import {wixClientServer} from "@/lib/wixClientServer";

type SearchParams = Promise<{
    cat?: string;
    name?: string;
    type?: string;
    min?: number;
    max?: number;
    page?: string;
    sort?: string;
}>

const ListPage = async ({ searchParams }: { searchParams: SearchParams }) => {
    const catParams = await searchParams; 
    const wixClient = await wixClientServer();

    const cat = await wixClient.collections.getCollectionBySlug(
        catParams.cat || "all-products"
    );

    return (
        <div className='px-4 md:px-8 lg:px-16 xl:32 2xl:px-64 relative'>
           <div className='hidden bg-green-50 px-4 sm:flex justify-between h-64'>
               <div className='w-2/3 flex flex-col justify-center items-center gap-8'>
                   <h1 className='text-4xl font-semibold leading-[48px] text-gray-700'>A Balanced meal, <br />
                       Inspired by nature.</h1>
               </div>
               <div className='relative w-1/3'>
                   <Image src='/woman.png' fill alt='List Landing' className='object-contain' />
               </div>
           </div>
            <Filter/>
            <ProductList
                categoryId={
                    cat.collection?._id || "00000000-000000-000000-000000000001"
                }
                searchParams={catParams}
            />
        </div>
    )
}

export default ListPage