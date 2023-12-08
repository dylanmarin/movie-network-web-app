import MovieStubSimple from "./MovieStubSimple";
import {FaChevronLeft, FaChevronRight} from "react-icons/fa6";
import "./index.css"
const HorizontalMovieScroller = ({movies}) => {

    return (
        <div className={"movie-scroller-container row"}>
            <button
                id={"scrollButton"}
                className={"btn cin-btn-secondary col-auto me-2"}
                onClick={() =>
                    document.getElementById('movieScroller').scrollLeft -= 150}>
                <FaChevronLeft/>
            </button>

            <div className={"movie-scroller col p-0"} id={"movieScroller"}>
                {
                    movies.map((movie, i) =>
                        <MovieStubSimple key={i} movie={movie}/>
                    )
                }
            </div>

            <button
                id={"scrollButton"}
                className={"btn cin-btn-secondary col-auto ms-2"}
                onClick={() => {
                    document.getElementById('movieScroller').scrollLeft += 150;
                }}>
                <FaChevronRight/>
            </button>
        </div>
    )

}

export default HorizontalMovieScroller;
