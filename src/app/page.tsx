import Slider from "@/components/Slider";
import BlendShowcase from "@/components/BlendShowcase";
import ComparisonTable from "@/components/ComparisonTable";
import IngredientsSection from "@/components/Ingredients";
import ParallaxContainer from "@/components/ParallaxContainer";

const HomePage = async () => {

    // const wixClient = await wixClientServer();
    // const res = await wixClient.products.queryProducts().find();
    // console.log(res)

    return (
        <main>
            <ParallaxContainer>
                <Slider />
                <BlendShowcase/>
            </ParallaxContainer> 
            <ComparisonTable/> 
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