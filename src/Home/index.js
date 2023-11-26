import SearchBar from "../Search/SearchBar";
import PopularMovies from "../Shared/PopularMovies";

const Home = () => {
    return (
        <div>
            <SearchBar/>
            <PopularMovies timeRange={"week"}/>
        </div>
    );
}

export default Home;
