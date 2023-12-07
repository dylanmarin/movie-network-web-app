import {useParams} from "react-router";
import {useEffect, useState} from "react";
import db from "../Database"
import "./index.css"
import MovieDetailsReview from "./MovieDetailsReview";
import DetailsSidebar from "./DetailsSidebar";
import SimilarFilms from "./SimilarFilms";
import * as client from "./client";
import {Link} from "react-router-dom";

const MovieDetails = () => {
    const {movieId} = useParams();
    const [movie, setMovie] = useState({});
    const [credits, setCredits] = useState({});

    const IMAGE_URL_BASE = "https://image.tmdb.org/t/p/w500/";

    const fetchDetails = async (movieId) => {
        const movie = await client.getMovieDetails(movieId)
        setMovie(movie)
    }

    const fetchCredits = async (movieId) => {
        const credits = await client.getMovieCredits(movieId)
        setCredits(credits)
    }


    useEffect(() => {
        fetchDetails(movieId);

        fetchCredits(movieId);
    }, [movieId]);

    const {title, overview, poster_path, release_date} = movie;
    const release_year = release_date ? release_date.split("-")[0] : "";
    const {cast, crew} = credits;

    const topCast = cast && cast.slice(0, 6);

    return (
        <div className={"movie-details"}>
            <div className={"row"}>
                <div className={"col"}>
                    <div className={"row"}>

                        <div className={"col-4"}>
                            <img src={`${IMAGE_URL_BASE}${poster_path}`} alt={"poster"}
                                 className={"movie-poster"}/>
                        </div>

                        <div className={"col"}>

                            <div className={"mb-3"}>

                                <div className={"mb-3"}>
                                    <h1 className={"d-inline"}>{title}</h1>
                                    <p className={"d-inline ms-2"}>{release_year}</p>
                                </div>

                                <p className={"mt-0"}>{overview}</p>
                            </div>

                            <div>
                                <h3 className={""}>Movie Details</h3>
                                <p>
                                    Starring: {cast && topCast.map((actor) => actor.name).join(", ")}
                                </p>
                                <p>
                                    Directed
                                    by: {crew && crew.filter((member) => member.job === "Director").map((member) => member.name).join(", ")}
                                </p>
                                <p>
                                    Written
                                    by: {crew && crew.filter((member) => member.job === "Writer").map((member) => member.name).join(", ")}
                                </p>
                                <h4>
                                    Production Companies
                                </h4>
                                <div className={"list-group"}>
                                    {movie.production_companies &&
                                        movie.production_companies.map((company) => (
                                            <Link className={"list-group-item"} key={company.id}
                                                  to={`/companies/${company.id}`}>
                                                {company.logo_path &&

                                                    <img src={`${IMAGE_URL_BASE}${company.logo_path}`} alt={"logo"}
                                                         className={'company-logo me-3'}/>
                                                }
                                                {company.name}
                                            </Link>
                                        ))
                                    }
                                </div>
                            </div>

                        </div>
                    </div>
                </div>


                <div className={"col-4"}>
                    <DetailsSidebar/>
                </div>
            </div>

            <div className={"row"}>
                <SimilarFilms/>
            </div>

        </div>
    );

}


export default MovieDetails;
