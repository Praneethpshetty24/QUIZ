import React, { useEffect, useState } from 'react';
import { collection, addDoc, getDocs, deleteDoc } from 'firebase/firestore';
import { db } from '../../Firebase'; // Adjust the import path based on your project structure
import './Question.css';

function Question() {
  const [questionCount, setQuestionCount] = useState(0);
  /*const questionsToUpload = [
    { question: "What is the capital of France?", options: ["Paris", "Berlin", "Madrid", "Rome"], correctAnswer: "Paris" },
    { question: "Who wrote 'Romeo and Juliet'?", options: ["Mark Twain", "William Shakespeare", "Charles Dickens", "Leo Tolstoy"], correctAnswer: "William Shakespeare" },
    { question: "What is the largest ocean on Earth?", options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"], correctAnswer: "Pacific Ocean" },
    { question: "What year did the Titanic sink?", options: ["1912", "1905", "1920", "1898"], correctAnswer: "1912" },
    { question: "Who painted the Mona Lisa?", options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet"], correctAnswer: "Leonardo da Vinci" },
    { question: "What is the chemical symbol for water?", options: ["O2", "CO2", "H2O", "NaCl"], correctAnswer: "H2O" },
    { question: "How many bones are in the adult human body?", options: ["206", "215", "198", "212"], correctAnswer: "206" },
    { question: "What planet is known as the Red Planet?", options: ["Venus", "Mars", "Jupiter", "Saturn"], correctAnswer: "Mars" },
    { question: "What gas do plants absorb from the atmosphere?", options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"], correctAnswer: "Carbon Dioxide" },
    { question: "What is the powerhouse of the cell?", options: ["Nucleus", "Mitochondria", "Ribosome", "Endoplasmic Reticulum"], correctAnswer: "Mitochondria" },
    { question: "Which country is the largest by land area?", options: ["Canada", "China", "United States", "Russia"], correctAnswer: "Russia" },
    { question: "What is the longest river in the world?", options: ["Amazon", "Nile", "Yangtze", "Mississippi"], correctAnswer: "Nile" },
    { question: "Which continent is known as the 'Dark Continent'?", options: ["Asia", "Africa", "South America", "Australia"], correctAnswer: "Africa" },
    { question: "What mountain range separates Europe and Asia?", options: ["Himalayas", "Rockies", "Andes", "Ural"], correctAnswer: "Ural" },
    { question: "In which country would you find the Great Pyramid of Giza?", options: ["Greece", "Egypt", "Iraq", "Mexico"], correctAnswer: "Egypt" },
    { question: "Who was the first President of the United States?", options: ["George Washington", "Thomas Jefferson", "Abraham Lincoln", "John Adams"], correctAnswer: "George Washington" },
    { question: "What year did World War II begin?", options: ["1939", "1941", "1945", "1914"], correctAnswer: "1939" },
    { question: "Who discovered America?", options: ["Christopher Columbus", "Ferdinand Magellan", "Leif Erikson", "James Cook"], correctAnswer: "Christopher Columbus" },
    { question: "What was the name of the ship that brought the Pilgrims to America?", options: ["Mayflower", "Santa Maria", "Titanic", "Nina"], correctAnswer: "Mayflower" },
    { question: "Who was known as the Iron Lady?", options: ["Margaret Thatcher", "Angela Merkel", "Golda Meir", "Indira Gandhi"], correctAnswer: "Margaret Thatcher" },
    { question: "What is the title of the first Harry Potter book?", options: ["Harry Potter and the Goblet of Fire", "Harry Potter and the Philosopher's Stone", "Harry Potter and the Chamber of Secrets", "Harry Potter and the Order of the Phoenix"], correctAnswer: "Harry Potter and the Philosopher's Stone" },
    { question: "Who wrote 'Pride and Prejudice'?", options: ["Jane Austen", "Charlotte Brontë", "Emily Brontë", "Virginia Woolf"], correctAnswer: "Jane Austen" },
    { question: "What is the main theme of '1984' by George Orwell?", options: ["Freedom", "Control", "Love", "War"], correctAnswer: "Control" },
    { question: "Who is the author of 'The Great Gatsby'?", options: ["F. Scott Fitzgerald", "Ernest Hemingway", "John Steinbeck", "Mark Twain"], correctAnswer: "F. Scott Fitzgerald" },
    { question: "What novel begins with the line 'Call me Ishmael'?", options: ["Moby Dick", "1984", "The Catcher in the Rye", "The Great Gatsby"], correctAnswer: "Moby Dick" },
    { question: "What is the value of π (pi) to two decimal places?", options: ["3.12", "3.14", "3.16", "3.18"], correctAnswer: "3.14" },
    { question: "What is the square root of 144?", options: ["10", "11", "12", "13"], correctAnswer: "12" },
    { question: "How many sides does a hexagon have?", options: ["5", "6", "7", "8"], correctAnswer: "6" },
    { question: "What is 7 times 8?", options: ["54", "56", "58", "60"], correctAnswer: "56" },
    { question: "What is the perimeter of a rectangle with length 5 and width 3?", options: ["16", "20", "18", "15"], correctAnswer: "16" },
    { question: "What does HTTP stand for?", options: ["Hypertext Transfer Protocol", "High Transfer Text Protocol", "Hyper Transfer Text Protocol", "Hypertext Transmission Protocol"], correctAnswer: "Hypertext Transfer Protocol" },
    { question: "What is the name of the first artificial satellite?", options: ["Sputnik", "Apollo 11", "Voyager", "Hubble"], correctAnswer: "Sputnik" },
    { question: "What programming language is known for its use in web development?", options: ["Python", "Java", "C++", "JavaScript"], correctAnswer: "JavaScript" },
    { question: "Who is the co-founder of Microsoft?", options: ["Steve Jobs", "Bill Gates", "Larry Page", "Mark Zuckerberg"], correctAnswer: "Bill Gates" },
    { question: "What device is used to access the internet wirelessly?", options: ["Router", "Modem", "Switch", "Hub"], correctAnswer: "Router" },
    { question: "What is the national sport of Canada?", options: ["Lacrosse", "Hockey", "Soccer", "Baseball"], correctAnswer: "Lacrosse" },
    { question: "Who holds the record for the most goals in World Cup history?", options: ["Pele", "Ronaldo", "Diego Maradona", "Gerd Müller"], correctAnswer: "Marta" },
    { question: "In which sport would you perform a slam dunk?", options: ["Soccer", "Basketball", "Baseball", "Tennis"], correctAnswer: "Basketball" },
    { question: "What country won the FIFA World Cup in 2018?", options: ["France", "Germany", "Brazil", "Argentina"], correctAnswer: "France" },
    { question: "Who is known as the fastest man in the world?", options: ["Usain Bolt", "Carl Lewis", "Tyson Gay", "Michael Johnson"], correctAnswer: "Usain Bolt" },
    { question: "Who is the lead singer of the band U2?", options: ["Bono", "Sting", "Chris Martin", "Robert Plant"], correctAnswer: "Bono" },
    { question: "What musical instrument has keys, pedals, and strings?", options: ["Piano", "Guitar", "Violin", "Drum"], correctAnswer: "Piano" },
    { question: "What genre of music did Beethoven compose in?", options: ["Classical", "Jazz", "Rock", "Pop"], correctAnswer: "Classical" },
    { question: "Who is known as the King of Pop?", options: ["Elvis Presley", "Michael Jackson", "Prince", "Justin Bieber"], correctAnswer: "Michael Jackson" },
    { question: "What is the name of the famous music festival held in California?", options: ["Coachella", "Lollapalooza", "Glastonbury", "Woodstock"], correctAnswer: "Coachella" },
    { question: "Who directed 'Jurassic Park'?", options: ["Steven Spielberg", "James Cameron", "George Lucas", "Peter Jackson"], correctAnswer: "Steven Spielberg" },
    { question: "What is the name of the hobbit played by Elijah Wood in 'The Lord of the Rings'?", options: ["Frodo", "Sam", "Bilbo", "Gandalf"], correctAnswer: "Frodo" },
    { question: "Which film won the Academy Award for Best Picture in 1994?", options: ["Forrest Gump", "Pulp Fiction", "The Shawshank Redemption", "The Lion King"], correctAnswer: "Forrest Gump" },
    { question: "Who played Jack Dawson in 'Titanic'?", options: ["Leonardo DiCaprio", "Brad Pitt", "Johnny Depp", "Tom Cruise"], correctAnswer: "Leonardo DiCaprio" },
    { question: "What is the highest-grossing film of all time?", options: ["Avatar", "Titanic", "Star Wars: The Force Awakens", "Avengers: Endgame"], correctAnswer: "Avatar" },
    { question: "Who is the artist behind 'The Starry Night'?", options: ["Vincent van Gogh", "Claude Monet", "Pablo Picasso", "Henri Matisse"], correctAnswer: "Vincent van Gogh" },
    { question: "What art movement is Salvador Dalí associated with?", options: ["Impressionism", "Cubism", "Surrealism", "Abstract Expressionism"], correctAnswer: "Surrealism" },
    { question: "Which artist is known for his large-scale balloon animals?", options: ["Jeff Koons", "Damien Hirst", "Banksy", "Yayoi Kusama"], correctAnswer: "Jeff Koons" },
    { question: "What is the primary medium used in oil painting?", options: ["Watercolor", "Acrylic", "Pastel", "Oil"], correctAnswer: "Oil" },
    { question: "Who painted the ceiling of the Sistine Chapel?", options: ["Michelangelo", "Raphael", "Leonardo da Vinci", "Caravaggio"], correctAnswer: "Michelangelo" },
    { question: "What fruit is known as the 'king of fruits'?", options: ["Mango", "Durian", "Apple", "Banana"], correctAnswer: "Durian" },
    { question: "What is the main ingredient in guacamole?", options: ["Tomato", "Avocado", "Onion", "Pepper"], correctAnswer: "Avocado" },
    { question: "In which country did sushi originate?", options: ["Japan", "China", "Korea", "Thailand"], correctAnswer: "Japan" },
    { question: "What is the name of the Italian dish made of thinly sliced raw meat or fish?", options: ["Carpaccio", "Bruschetta", "Lasagna", "Risotto"], correctAnswer: "Carpaccio" },
    { question: "Which spice is derived from the flower of the saffron crocus?", options: ["Cinnamon", "Saffron", "Nutmeg", "Cloves"], correctAnswer: "Saffron" },
    { question: "What is the largest land animal?", options: ["Elephant", "Giraffe", "Hippopotamus", "Rhino"], correctAnswer: "Elephant" },
    { question: "What process do plants use to make their food?", options: ["Respiration", "Photosynthesis", "Digestion", "Transpiration"], correctAnswer: "Photosynthesis" },
    { question: "What is the fastest land animal?", options: ["Cheetah", "Lion", "Horse", "Gazelle"], correctAnswer: "Cheetah" },
    { question: "What is the largest mammal in the ocean?", options: ["Shark", "Dolphin", "Blue Whale", "Orca"], correctAnswer: "Blue Whale" },
    { question: "How many continents are there in the world?", options: ["5", "6", "7", "8"], correctAnswer: "7" },
    { question: "Who is the Greek god of war?", options: ["Zeus", "Apollo", "Ares", "Hades"], correctAnswer: "Ares" },
    { question: "What is the name of Thor's hammer?", options: ["Mjolnir", "Stormbreaker", "Excalibur", "Glamdring"], correctAnswer: "Mjolnir" },
    { question: "Who is the Roman goddess of love?", options: ["Venus", "Athena", "Diana", "Juno"], correctAnswer: "Venus" },
    { question: "In Norse mythology, what is the name of the world tree?", options: ["Yggdrasil", "Ginnungagap", "Midgard", "Asgard"], correctAnswer: "Yggdrasil" },
    { question: "Who is the ruler of the underworld in Greek mythology?", options: ["Zeus", "Hades", "Poseidon", "Ares"], correctAnswer: "Hades" },
    { question: "What is the term for a phobia of spiders?", options: ["Acrophobia", "Arachnophobia", "Claustrophobia", "Agoraphobia"], correctAnswer: "Arachnophobia" },
    { question: "Who is known as the father of psychoanalysis?", options: ["Carl Jung", "Sigmund Freud", "B.F. Skinner", "Ivan Pavlov"], correctAnswer: "Sigmund Freud" },
    { question: "What psychological condition is characterized by extreme mood swings?", options: ["Depression", "Bipolar Disorder", "Anxiety", "Schizophrenia"], correctAnswer: "Bipolar Disorder" },
    { question: "What is the term for the fear of public speaking?", options: ["Acrophobia", "Glossophobia", "Social Phobia", "Agoraphobia"], correctAnswer: "Glossophobia" },
    { question: "What does IQ stand for?", options: ["Intelligence Quotient", "Intellectual Quality", "Information Quantity", "Intuition Quotient"], correctAnswer: "Intelligence Quotient" },
    { question: "Who is the current President of the United States?", options: ["Joe Biden", "Donald Trump", "Barack Obama", "George W. Bush"], correctAnswer: "Joe Biden" },
    { question: "What global event was caused by the COVID-19 pandemic?", options: ["Economic Crisis", "Health Crisis", "Political Crisis", "Environmental Crisis"], correctAnswer: "Health Crisis" },
    { question: "What is the name of the international organization that promotes peace?", options: ["NATO", "UN", "EU", "WHO"], correctAnswer: "UN" },
    { question: "Who won the Nobel Peace Prize in 2021?", options: ["Abiy Ahmed", "Malala Yousafzai", "Barack Obama", "Ales Bialiatski"], correctAnswer: "Ales Bialiatski" },
    { question: "What is the capital city of Australia?", options: ["Sydney", "Melbourne", "Canberra", "Brisbane"], correctAnswer: "Canberra" },
    { question: "What is the most widely spoken language in the world?", options: ["Spanish", "English", "Mandarin", "Hindi"], correctAnswer: "Mandarin" },
    { question: "What is the smallest country in the world?", options: ["Monaco", "Vatican City", "San Marino", "Nauru"], correctAnswer: "Vatican City" },
    { question: "What is the tallest building in the world?", options: ["Burj Khalifa", "Shanghai Tower", "One World Trade Center", "Taipei 101"], correctAnswer: "Burj Khalifa" },
    { question: "What color is the star on the United States flag?", options: ["Red", "White", "Blue", "Yellow"], correctAnswer: "White" },
    { question: "What is the main ingredient in traditional hummus?", options: ["Chickpeas", "Lentils", "Beans", "Peas"], correctAnswer: "Chickpeas" },
    { question: "In what year did man first land on the moon?", options: ["1969", "1971", "1967", "1970"], correctAnswer: "1969" },
    { question: "What is the largest desert in the world?", options: ["Sahara", "Gobi", "Antarctic", "Arabian"], correctAnswer: "Antarctic" },
    { question: "Who was the first woman to win a Nobel Prize?", options: ["Marie Curie", "Rosalind Franklin", "Ada Lovelace", "Jane Addams"], correctAnswer: "Marie Curie" },
    { question: "What is the currency used in Japan?", options: ["Yen", "Won", "Dollar", "Rupee"], correctAnswer: "Yen" },
    { question: "What is the largest species of shark?", options: ["Great White", "Hammerhead", "Tiger", "Whale Shark"], correctAnswer: "Whale Shark" },
]; */


  const fetchQuestionCount = async () => {
    const questionsCollectionRef = collection(db, 'questions');
    const snapshot = await getDocs(questionsCollectionRef);
    setQuestionCount(snapshot.size); // Set the count to the state
  };

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
    fetchQuestionCount(); // Update the count after uploading
  };

  const deleteAllQuestions = async () => {
    const questionsCollectionRef = collection(db, 'questions');
    const snapshot = await getDocs(questionsCollectionRef);

    const deletePromises = snapshot.docs.map((doc) => deleteDoc(doc.ref)); // Create an array of delete promises

    try {
      await Promise.all(deletePromises); // Wait for all delete operations to complete
      console.log('All questions deleted successfully!');
      alert('All questions deleted successfully!');
      setQuestionCount(0); // Update the question count
    } catch (error) {
      console.error('Error deleting questions:', error);
    }
  };

  useEffect(() => {
    fetchQuestionCount(); // Fetch question count when the component mounts
  }, []);

  return (
    <div className="question-container">
      <h2>Upload Questions</h2>
      <p>There are currently {questionCount} questions in the database.</p>
      <p>
        If you have contacted the team, the questions will be updated here. 
        Click the button below to upload the latest questions.
      </p>
      <button className="upload-button" onClick={uploadQuestions}>Upload Latest Questions</button>
      {/* <button className="delete-button" onClick={deleteAllQuestions}>
        Delete All Questions
      </button> */}
    </div>
  );
}

export default Question;
