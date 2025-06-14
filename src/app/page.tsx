import Slider from "@/components/Slider";
import Hero from "@/components/Hero";
import BlendShowcase from "@/components/BlendShowcase";
import ComparisonTable from "@/components/ComparisonTable";
import Eden from "@/components/Eden";
import IngredientsSection from "@/components/Ingredients";

const HomePage = async () => {

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
            
            <div className='mt-24 px-4 lg:px-16 xl:32 2xl:px-64'>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-[#414143]">
            Formulated with the World&apos;s <br/>
            super Ingredients
                </h1>
               <IngredientsSection/>
            </div>
        </main>
    )
}

export default HomePage;