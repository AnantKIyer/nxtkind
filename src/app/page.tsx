import Slider from "@/components/Slider";
import BlendShowcase from "@/components/BlendShowcase";
import ComparisonTable from "@/components/ComparisonTable";
import IngredientsSection from "@/components/Ingredients";
import ParallaxContainer from "@/components/ParallaxContainer";
import ReviewCarousel from "@/components/ReviewsCarousel";

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
            <ReviewCarousel reviews={[
  {
    image: "/mira.png",
    heading: "A DAILY RITUAL I LOVE",
    quote: "I was looking for something nourishing yet easy to prepare, and this has been a game-changer. Light on the stomach, but keeps me full and energized.",
    author: "Mira K."
  },
  {
    image: "/john.png",
    heading: "PERFECT START TO MY MORNINGS",
    quote: "This drink helps me stay focused and refreshed throughout the day. I actually look forward to it every morning.",
    author: "John D."
  },
  {
    image: "/raj.png",
    heading: "ENERGY WITHOUT THE CRASH",
    quote: "Gives me clean energy with no crashes. It fits right into my busy schedule and feels great.",
    author: "Raj P."
  }
]} />
        </main>
    )
}

export default HomePage;