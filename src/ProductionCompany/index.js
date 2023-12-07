import {useParams} from "react-router";
import {useEffect, useState} from "react";
import * as client from "./client";
import {Link} from "react-router-dom";
import DetailsSidebar from "../Movies/DetailsSidebar";
import SimilarFilms from "../Movies/SimilarFilms";
import MoviesTiled from "../Shared/MoviesTiled";

const ProductionCompany = () => {
    const {companyId} = useParams();
    const [companyDetails, setCompanyDetails] = useState({});
    const [movies, setMovies] = useState([]);
    const IMAGE_URL_BASE = "https://image.tmdb.org/t/p/w500/";

    const fetchDetails = async (companyId) => {
        const details = await client.getCompanyDetails(companyId)
        setCompanyDetails(details);
    }

    const fetchMoviesByCompany = async (companyId) => {
        const movies = await client.getMoviesByCompany(companyId);
        setMovies(movies);
    }

    useEffect(() => {
        fetchDetails(companyId);
        fetchMoviesByCompany(companyId);
    }, [companyId]);

    console.log(companyDetails)

    return (

        <div className={"movie-details"}>
            <div className={"row"}>
                <div className={"col"}>
                    <div className={"row"}>
                        <div className={"col-4"}>
                            <img src={`${IMAGE_URL_BASE}${companyDetails.logo_path}`} alt={"poster"}
                                 className={"movie-poster"}/>




                        </div>
                        <div className={"col"}>

                            <div className={"mb-3"}>

                                <div className={"mb-3"}>
                                    <h1 className={"d-inline"}>{companyDetails.name}</h1>
                                </div>

                            </div>
                            <div>
                                {
                                    companyDetails.headquarters &&
                                    <>
                                        <h3 className={"d-inline"}>HQ:</h3> {companyDetails.headquarters}
                                    </>
                                }
                            </div>

                            <div>
                                {
                                    companyDetails.description &&
                                    <>
                                        <h3 className={""}>Description</h3>
                                        <p>
                                            {companyDetails.description}
                                        </p>
                                    </>
                                }
                            </div>

                        </div>
                    </div>
                </div>

            </div>

            {movies !== [] &&
                <div className={"row mt-2"}>
                    <h2>Movies by {companyDetails.name}</h2>
                    <MoviesTiled movies={movies}/>
                </div>
            }

        </div>
    )


}

export default ProductionCompany
