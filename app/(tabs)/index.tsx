import { HomeProvider, useHome } from "@/context/home/HomeState";
import { HomeComp } from "@/components/home/homecomp";

const Home = () => {
    return (
        <HomeProvider>
            <HomeComp />
        </HomeProvider>
    )
};

export default Home;
