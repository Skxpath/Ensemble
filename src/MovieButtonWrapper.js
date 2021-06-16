import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios';

export default function ButtonWrapper(props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [chars, setChars] = useState([]);
    const [planets, setPlanets] = useState([]);
    const [starships, setStarships] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [species, setSpecies] = useState([]);

    useEffect(() => {
        let charRequests = props.movie.characters.map(req => axios.get(req));
        let planetRequests = props.movie.planets.map(req => axios.get(req));
        let starshipRequests = props.movie.starships.map(req => axios.get(req));
        let vehicleRequests = props.movie.vehicles.map(req => axios.get(req));
        let specieRequests = props.movie.species.map(req => axios.get(req));

       /*  Logic can be made a lot cleaner with less reusable code but this is functional
        To display individual pages for each of these would be another component creation and refactored logic to handle data trickling down from App.js to each component
        Can also be handled with state management*/
        Promise.all(charRequests)
            .then(response => {
                response.forEach(resp => {
                    setChars(state => [...state, resp.data.name])
                })
            })
        Promise.all(planetRequests)
            .then(response => {
                response.forEach(resp => {
                    setPlanets(state => [...state, resp.data.name])
                })
            })
        Promise.all(starshipRequests)
            .then(response => {
                response.forEach(resp => {
                    setStarships(state => [...state, resp.data.name])
                })
            })
        Promise.all(vehicleRequests)
            .then(response => {
                response.forEach(resp => {
                    setVehicles(state => [...state, resp.data.name])
                })
            })
        Promise.all(specieRequests)
            .then(response => {
                response.forEach(resp => {
                    setSpecies(state => [...state, resp.data.name])
                })
            })
    }, []);

    //Characters, Planets, Starships, Vehicles, Species can all be expanded into their own categories of pages similar to MovieButtonWrapper but trickling down another level
    return (
        <>
            <Button variant="light" onClick={handleShow}>{props.movie.title}</Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{props.movie.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <b>Movie Number:</b> {props.movie.episode_id} <br />
                    <b>Opening Crawl:</b> {props.movie.opening_crawl} <br />
                    <b>Director:</b> {props.movie.director} <br />
                    <b>Producer:</b> {props.movie.producer} <br />
                    <b>Release Date:</b> {props.movie.release_date} <br />
                    <b>Characters:</b> {chars.toString()} <br />
                    <b>Planets:</b> {planets.toString()} <br />
                    <b>Starships:</b> {starships.toString()} <br />
                    <b>Vehicles:</b> {vehicles.toString()} <br />
                    <b>Species:</b> {species.toString()} <br />
                    <b>Created:</b> {props.movie.created} <br />
                    <b>Edited:</b> {props.movie.edited} <br />
                    <b>Url:</b> {props.movie.url} <br />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}



