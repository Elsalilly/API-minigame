import React from "react";
import { useEffect, useState } from "react";

import "../App.css";

//Function to extract the breed name from the image URL
const getBreedFromUrl = (url) => {
    const parts = url.split('/');
    const breedIndex = parts.findIndex(p => p === 'breeds') + 1;
    return parts[breedIndex].includes('-')
    ? parts[breedIndex].split('-').reverse().join('-') //Handles breeds with - in their url-name
    : parts[breedIndex];
};

const API = () => {
    //State hooks
    const [correctBreed, setCorrectBreed] = useState(); 
    const [imageUrl, setImageUrl] = useState("");
    const [options, setOptions] = useState([]);
    const [message, setMessage] = useState("");
    const [selectedGuess, setSelectedGuess] = useState(null);

    //Fetch a random dog image and extract the breed
    const fetchDogs = async () => {
        try {
            const response = await fetch(
                "https://dog.ceo/api/breeds/image/random"
            );
            const data = await response.json();
            const url = data.message; //Get image url
            const breed = getBreedFromUrl(url); //Extract breed from url
            setImageUrl(url);
            setCorrectBreed(breed);
            generateOptions(breed);
            //setCorrectBreed(data); //Alla data in the state variable
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const generateOptions = async (correct) => {
        const response = await fetch(
            "https://dog.ceo/api/breeds/list/all"
        );
        const data = await response.json();
        const allBreeds = Object.keys(data.message); //Extracting the keys of the object (breeds)

        //Remove the correct breed
        const removeBreeds = allBreeds.filter(breed => breed !== correct);
        //Shuffle the filtered list
        const shuffledBreeds = removeBreeds.sort(() => Math.random() -0.5);
        //Select the 2 first breeds as wrong options
        const wrongBreeds = shuffledBreeds.slice(0,2);

        const allOptions = [...wrongBreeds, correct].sort(() => 0.5 - Math.random());
        setOptions(allOptions);
    };

    const handleGuess = (guess) => {
        setSelectedGuess(guess);
        setMessage("");
    }

//Fetch the first dog image when the component mounts
    useEffect (() => {
        fetchDogs();
    }, []);

    return (
        <div className="container">
            <h1>
            🐾 Guess the dog breed 🐾
            </h1>
            <div className="box_dogs">
                {imageUrl && <img src={imageUrl} alt="dog" style={{ maxWidth: '500px', maxHeight: '300px' }}/>}
            </div>
            <div className="options">
                {options.map((breed, index) => (
                    <button
                    className={`options-btn ${selectedGuess === breed ? 'selected' : ''}`}
                    key={index}
                    onClick={() => handleGuess(breed)}
                    style={{ margin: '0.5rem',}}
                    >
                        {breed}
                    </button>
                ))}
            </div>

            {message && <h4>{message}</h4>}

            <button
                className="next-btn" 
                onClick={() => {
                    if (!selectedGuess) {
                        setMessage("Please make a guess!");
                        return;
                    }
                    if (selectedGuess === correctBreed) {
                        setMessage("Correct!");
                        setSelectedGuess(null);
                        fetchDogs();
                    } else {
                        setMessage("Wrong, try again!");
                    }     
            }}
            >
                Lock in answer
            </button>
        </div>
    )
}

export default API;