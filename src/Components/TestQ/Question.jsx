import React from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase'; // Adjust the import path based on your project structure

function Question() {
  const questionsToUpload = [
    { question: "What is the capital of France?", options: ["Paris", "Berlin", "Madrid", "Rome"], correctAnswer: "Paris" },
    { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], correctAnswer: "4" },
    { question: "What is the largest planet in our solar system?", options: ["Earth", "Mars", "Jupiter", "Saturn"], correctAnswer: "Jupiter" },
    { question: "What is the boiling point of water?", options: ["100°C", "90°C", "80°C", "110°C"], correctAnswer: "100°C" },
    { question: "Which element has the chemical symbol 'O'?", options: ["Oxygen", "Gold", "Silver", "Iron"], correctAnswer: "Oxygen" },
    { question: "What is the currency of Japan?", options: ["Yen", "Dollar", "Euro", "Won"], correctAnswer: "Yen" },
    { question: "Which is the smallest continent?", options: ["Asia", "Australia", "Europe", "Antarctica"], correctAnswer: "Australia" },
    { question: "Who wrote 'Romeo and Juliet'?", options: ["Charles Dickens", "Mark Twain", "William Shakespeare", "Jane Austen"], correctAnswer: "William Shakespeare" },
    { question: "What is the powerhouse of the cell?", options: ["Nucleus", "Ribosome", "Mitochondria", "Endoplasmic Reticulum"], correctAnswer: "Mitochondria" },
    { question: "What is the capital of Japan?", options: ["Beijing", "Seoul", "Tokyo", "Bangkok"], correctAnswer: "Tokyo" },
    // Add more questions as needed to reach 50 total
    { question: "What is the smallest prime number?", options: ["0", "1", "2", "3"], correctAnswer: "2" },
    { question: "Which gas is essential for breathing?", options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"], correctAnswer: "Oxygen" },
    { question: "What is the chemical formula for water?", options: ["H2O", "CO2", "NaCl", "O2"], correctAnswer: "H2O" },
    { question: "What is the longest river in the world?", options: ["Amazon", "Nile", "Yangtze", "Mississippi"], correctAnswer: "Nile" },
    { question: "Which planet is known as the Red Planet?", options: ["Earth", "Venus", "Mars", "Jupiter"], correctAnswer: "Mars" },
    { question: "What is the largest mammal in the world?", options: ["Elephant", "Blue Whale", "Giraffe", "Shark"], correctAnswer: "Blue Whale" },
    { question: "Who painted the Mona Lisa?", options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet"], correctAnswer: "Leonardo da Vinci" },
    { question: "What is the freezing point of water?", options: ["0°C", "32°F", "100°C", "212°F"], correctAnswer: "0°C" },
    { question: "What is the hardest natural substance on Earth?", options: ["Gold", "Iron", "Diamond", "Quartz"], correctAnswer: "Diamond" },
    { question: "What is the tallest mountain in the world?", options: ["K2", "Kangchenjunga", "Mount Everest", "Lhotse"], correctAnswer: "Mount Everest" },
    { question: "Who discovered penicillin?", options: ["Marie Curie", "Alexander Fleming", "Louis Pasteur", "Isaac Newton"], correctAnswer: "Alexander Fleming" },
    { question: "What is the capital of Italy?", options: ["Rome", "Milan", "Florence", "Venice"], correctAnswer: "Rome" },
    { question: "What is the main ingredient in guacamole?", options: ["Tomato", "Avocado", "Onion", "Pepper"], correctAnswer: "Avocado" },
    { question: "What is the square root of 64?", options: ["6", "7", "8", "9"], correctAnswer: "8" },
    { question: "What is the fastest land animal?", options: ["Cheetah", "Lion", "Tiger", "Horse"], correctAnswer: "Cheetah" },
    { question: "What is the capital of Australia?", options: ["Sydney", "Melbourne", "Canberra", "Brisbane"], correctAnswer: "Canberra" },
    { question: "What is the main language spoken in Brazil?", options: ["Spanish", "Portuguese", "English", "French"], correctAnswer: "Portuguese" },
    { question: "What is the currency of the United Kingdom?", options: ["Dollar", "Euro", "Pound Sterling", "Yen"], correctAnswer: "Pound Sterling" },
    { question: "Which animal is known as the King of the Jungle?", options: ["Tiger", "Lion", "Elephant", "Giraffe"], correctAnswer: "Lion" },
    { question: "What is the chemical symbol for gold?", options: ["Au", "Ag", "Pb", "Fe"], correctAnswer: "Au" },
    { question: "What is the capital of Canada?", options: ["Toronto", "Ottawa", "Vancouver", "Montreal"], correctAnswer: "Ottawa" },
    { question: "What is the largest ocean on Earth?", options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"], correctAnswer: "Pacific Ocean" },
    { question: "Which planet is known for its rings?", options: ["Mars", "Venus", "Saturn", "Jupiter"], correctAnswer: "Saturn" },
    { question: "What is the primary gas in the atmosphere?", options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Argon"], correctAnswer: "Nitrogen" },
    { question: "Who was the first person to walk on the Moon?", options: ["Yuri Gagarin", "Neil Armstrong", "Buzz Aldrin", "John Glenn"], correctAnswer: "Neil Armstrong" },
    { question: "What is the largest organ in the human body?", options: ["Heart", "Liver", "Skin", "Lungs"], correctAnswer: "Skin" },
    { question: "Which country is known as the Land of the Rising Sun?", options: ["China", "Japan", "Thailand", "South Korea"], correctAnswer: "Japan" },
    { question: "What is the most widely spoken language in the world?", options: ["English", "Mandarin", "Spanish", "Hindi"], correctAnswer: "Mandarin" },
    { question: "What is the hardest natural material?", options: ["Diamond", "Graphite", "Gold", "Iron"], correctAnswer: "Diamond" },
    { question: "What is the smallest country in the world?", options: ["Vatican City", "Monaco", "San Marino", "Liechtenstein"], correctAnswer: "Vatican City" },
    { question: "What is the capital of India?", options: ["Delhi", "Mumbai", "Kolkata", "Chennai"], correctAnswer: "Delhi" },
    { question: "Which instrument is used to measure atmospheric pressure?", options: ["Thermometer", "Barometer", "Hygrometer", "Anemometer"], correctAnswer: "Barometer" },
    { question: "Who is known as the Father of Geometry?", options: ["Euclid", "Pythagoras", "Newton", "Aristotle"], correctAnswer: "Euclid" },
    { question: "What is the process by which plants make their own food?", options: ["Photosynthesis", "Respiration", "Transpiration", "Fermentation"], correctAnswer: "Photosynthesis" },
    { question: "What is the capital of Germany?", options: ["Berlin", "Munich", "Frankfurt", "Hamburg"], correctAnswer: "Berlin" },
    { question: "Which planet is closest to the Sun?", options: ["Venus", "Earth", "Mercury", "Mars"], correctAnswer: "Mercury" },
    { question: "What is the primary source of energy for the Earth?", options: ["Wind", "Fossil Fuels", "Solar", "Geothermal"], correctAnswer: "Solar" },
    { question: "What is the largest desert in the world?", options: ["Sahara", "Arabian", "Gobi", "Kalahari"], correctAnswer: "Sahara" },
    { question: "What is the boiling point of water in Fahrenheit?", options: ["100°F", "212°F", "32°F", "0°F"], correctAnswer: "212°F" },
    { question: "What is the main ingredient in bread?", options: ["Flour", "Sugar", "Water", "Yeast"], correctAnswer: "Flour" },
    { question: "Who wrote '1984'?", options: ["George Orwell", "Aldous Huxley", "Ray Bradbury", "F. Scott Fitzgerald"], correctAnswer: "George Orwell" },
    { question: "What is the main component of steel?", options: ["Iron", "Copper", "Aluminum", "Zinc"], correctAnswer: "Iron" },
    { question: "Which country is known for the Great Wall?", options: ["India", "China", "Russia", "Egypt"], correctAnswer: "China" },
    { question: "What is the main function of red blood cells?", options: ["Transport Oxygen", "Fight Infection", "Clot Blood", "Digest Food"], correctAnswer: "Transport Oxygen" },
    { question: "What is the chemical symbol for sodium?", options: ["Na", "S", "K", "Ca"], correctAnswer: "Na" },
    { question: "What is the main gas found in natural gas?", options: ["Methane", "Ethane", "Propane", "Butane"], correctAnswer: "Methane" },
    { question: "What is the capital of Russia?", options: ["Moscow", "Saint Petersburg", "Novosibirsk", "Yekaterinburg"], correctAnswer: "Moscow" },
    { question: "Who is the author of 'Pride and Prejudice'?", options: ["Charlotte Brontë", "Jane Austen", "Emily Brontë", "Louisa May Alcott"], correctAnswer: "Jane Austen" },
    { question: "What is the capital of Egypt?", options: ["Cairo", "Alexandria", "Giza", "Luxor"], correctAnswer: "Cairo" },
    { question: "What is the square root of 81?", options: ["8", "7", "9", "6"], correctAnswer: "9" },
    { question: "What is the largest country in the world?", options: ["Canada", "USA", "China", "Russia"], correctAnswer: "Russia" },
    { question: "Which organ is responsible for pumping blood?", options: ["Brain", "Liver", "Heart", "Lungs"], correctAnswer: "Heart" },
    { question: "What is the main ingredient in chocolate?", options: ["Cocoa Beans", "Sugar", "Milk", "Vanilla"], correctAnswer: "Cocoa Beans" },
    { question: "What is the chemical symbol for silver?", options: ["Ag", "Au", "Pb", "Fe"], correctAnswer: "Ag" },
    { question: "Which planet is known for having a big red spot?", options: ["Mars", "Venus", "Jupiter", "Saturn"], correctAnswer: "Jupiter" },
    { question: "What is the name of the first artificial Earth satellite?", options: ["Apollo", "Sputnik", "Explorer", "Voyager"], correctAnswer: "Sputnik" },
    { question: "What is the capital of South Africa?", options: ["Cape Town", "Pretoria", "Johannesburg", "Durban"], correctAnswer: "Pretoria" },
  ];

  const uploadQuestions = async () => {
    const questionsCollectionRef = collection(db, 'questions'); // Adjust the collection name as needed

    for (const question of questionsToUpload) {
      try {
        await addDoc(questionsCollectionRef, question);
        console.log(`Uploaded question: ${question.question}`);
      } catch (error) {
        console.error('Error uploading question:', error);
      }
    }
    alert('All questions uploaded successfully!');
  };

  return (
    <div>
      <h2>Upload Questions</h2>
      <button onClick={uploadQuestions}>Upload Questions</button>
    </div>
  );
}

export default Question;
