import Slider from "@/components/Slider";
import Hero from "@/components/Hero";
import BlendShowcase from "@/components/BlendShowcase";
import ComparisonTable from "@/components/ComparisonTable";
import Eden from "@/components/Eden";
import ProductList from "@/components/ProductList";

const HomePage =  async () => {

    // const wixClient = await wixClientServer();
    // const res = await wixClient.products.queryProducts().find();
    // console.log(res)

    return (
        <main>
            <Slider />
            <Hero/>
            <BlendShowcase/>
            <ComparisonTable/>
            <Eden/>
            {/*<div className='mt-24 px-4 lg:px-16 xl:32 2xl:px-64'>*/}
            {/*    <h2 className='text-2xl'>Products</h2>*/}
            {/*    <ProductList/>*/}
            {/*</div>*/}
        </main>
    )
}

export default HomePage