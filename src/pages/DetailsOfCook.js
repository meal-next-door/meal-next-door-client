import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { BsChatLeftText } from 'react-icons/bs';
import { RiArrowGoBackLine } from 'react-icons/ri';
import { GrFavorite } from 'react-icons/gr';
import { Container, Col, Row, Button } from "react-bootstrap";


function CookDetailsPage() {
    const [cook, setCook] = useState(null);
    const { user } = useContext(AuthContext);
    const { cookId } = useParams();
    let navigate = useNavigate();

    console.log(user)

    const storedToken = localStorage.getItem("authToken");


    // READ details of one cook
    const getCook = () => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/users/${cookId}`)
            .then((response) => {
                setCook(response.data);
            })
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        getCook();
    }, []);


    // ADD FAVORITES 
    const requestBody = { favorites: cookId }

    const addFavorite = () => {
        axios
            .put(`${process.env.REACT_APP_API_URL}/users/${user?._id}/favorites`, requestBody, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then(() => {
                return (
                    navigate(`/profile/${user?._id}`, { replace: true })
                )
            })
            .catch((error) => console.log(error));
    }



    return (
        <div className="CookDetails">

            <Container>
                <Row>
                    <Col>
                        {cook && (
                            <>
                                <img src={cook.image} style={{ maxHeight: '15rem', objectFit: 'cover', borderRadius: '50%' }} />
                                <h1 style={{ margin: '3rem 0 1rem 0' }} >{cook.username}</h1>
                                <p><strong>Location: </strong>{cook.address}</p>
                            </>
                        )}
                    </Col>
                </Row>

                <Row>
                    <Col>
                        {user != null
                            ? <NavLink to={`/profile/${user?._id}`} >
                                <Button
                                    onClick={() => { addFavorite(cookId) }}
                                    style={{
                                        padding: '0.2rem 1rem',
                                        backgroundColor: '#E8F2E8',
                                        borderColor: 'black',
                                        color: 'black'
                                    }}>
                                    <GrFavorite />
                                </Button>
                            </NavLink>
                            : <p></p>
                        }

                        {user?._id !== cook?._id && user != null
                            ? <NavLink to={`/new-comment/${cookId}`}>
                                <Button
                                    style={{
                                        padding: '0.2rem 1rem',
                                        margin: '0.5rem',
                                        backgroundColor: '#E8F2E8',
                                        borderColor: 'black',
                                        color: 'black'
                                    }}>
                                    <BsChatLeftText />
                                </Button>
                            </NavLink>
                            : <p></p>
                        }

                        <NavLink to="/cooks">
                            <Button
                                style={{
                                    padding: '0.2rem 1rem',
                                    backgroundColor: '#E8F2E8',
                                    borderColor: 'black',
                                    color: 'black'
                                }}>
                                <RiArrowGoBackLine />
                            </Button>
                        </NavLink>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <h3
                            style={{
                                margin: '3rem',
                                textTransform: 'uppercase',
                                letterSpacing: '1.5px',
                                fontSize: '24px'
                            }}>
                            Reviews
                        </h3>

                        {cook?.comments.length > 0
                            ? cook.comments?.map((comment) => (
                                <div style={{ margin: '1rem', border: '1px solid' }}>
                                    <h5 style={{ margin: '1rem' }}>{comment.title}</h5>
                                    <p>{comment.description}</p>
                                    <p><strong>Author: </strong> {comment.author.username}</p>
                                </div>
                            ))
                            : <p>No reviews yet for this cook</p>}
                    </Col>
                </Row>
            </Container>

        </div>
    );
}

export default CookDetailsPage;