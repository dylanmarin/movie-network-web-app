import {useParams} from "react-router";
import {useEffect, useState} from "react";
import * as client from "./client";
import MoviesTiled from "../Shared/MoviesTiled";
import {useNavigate} from "react-router-dom";

const ProductionCompany = () => {
    const {companyId} = useParams();
    const [companyDetails, setCompanyDetails] = useState({});
    const [movies, setMovies] = useState([]);
    const IMAGE_URL_BASE = "https://image.tmdb.org/t/p/w500/";
    const navigate = useNavigate();

    const fetchDetails = async (companyId) => {
        const details = await client.getCompanyDetails(companyId)

        if (!details.id) {
            navigate("/home")
        }

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

    return (
        <div className={"movie-details"}>
            <div className={"row"}>
                <div className={"col"}>
                    <div className={"row"}>
                        {
                            companyDetails.logo_path &&
                            <div className={"col-md-4 poster-container"}>
                                <img src={`${IMAGE_URL_BASE}${companyDetails.logo_path}`} alt={"poster"}
                                     className={"w-100"}/>
                            </div>
                        }
                        <div className={"col-md"}>

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

            {movies && movies.length > 1 &&
                <div className={"row mt-2"}>
                    <h2>Movies by {companyDetails.name}</h2>
                    <MoviesTiled movies={movies}/>
                </div>
            }

        </div>
    )
}

export default ProductionCompany
