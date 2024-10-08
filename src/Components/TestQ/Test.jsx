import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../Firebase'; // Ensure that storage is imported
import './Test.css';

function Test() {
    const { state } = useLocation();
    const { email, uuiId, name } = state || {};
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [totalTimeTaken, setTotalTimeTaken] = useState(0);
    const [videoURL, setVideoURL] = useState(null); // To store video URL for preview
    const startTimeRef = useRef(Date.now());
    const timeoutRef = useRef(null);
    const webcamRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const recordedChunks = useRef([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const questionsCollectionRef = collection(db, 'questions');
                const questionSnapshot = await getDocs(questionsCollectionRef);
                const allQuestions = questionSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                const selectedQuestions = getRandomQuestions(allQuestions, 10);
                setQuestions(selectedQuestions);
            } catch (error) {
                console.error('Error fetching questions:', error);
            }
        };

        fetchQuestions();
        alert('Switching tabs will automatically submit your test! and recording is mandatory for valid test ! ');

        timeoutRef.current = setInterval(() => {
            setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
        }, 1000);

        const handleVisibilityChange = () => {
            if (document.hidden) {
                handleSubmit(); // Auto-submit if the tab is hidden
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            clearInterval(timeoutRef.current);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            stopRecording();
        };
    }, []);

    
    const getRandomQuestions = (questions, num) => {
        // Use a spread operator to avoid mutating the original array
        const shuffled = [...questions].sort(() => Math.random() - 0.5); 
        return shuffled.slice(0, num); // Return the first `num` unique questions
    };
    
    const startRecording = () => {
        alert("Recording will start now!"); // Alert message
        const videoStream = webcamRef.current.video.srcObject;
    
        if (videoStream) {
            mediaRecorderRef.current = new MediaRecorder(videoStream, {
                mimeType: 'video/webm; codecs=vp8',
            });
    
            recordedChunks.current = []; // Clear previous chunks
            mediaRecorderRef.current.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    recordedChunks.current.push(event.data);
                    console.log("Data available size:", event.data.size); // Log data available size
                }
            };
    
            mediaRecorderRef.current.start();
            console.log("Recording started.");
        } else {
            console.error("Webcam stream is not available.");
        }
    };
    
    const stopRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
            console.log("Recording stopped.");
        }
    };

    const handleAnswerChange = (questionId, selectedOption) => {
        setAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questionId]: selectedOption,
        }));
    };

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();
        clearInterval(timeoutRef.current);
        stopRecording();
    
        let correctAnswers = 0;
        questions.forEach((question) => {
            if (answers[question.id] === question.correctAnswer) {
                correctAnswers += 1;
            }
        });
    
        const endTime = Date.now();
        const totalTimeTakenInSeconds = Math.floor((endTime - startTimeRef.current) / 1000);
        setTotalTimeTaken(totalTimeTakenInSeconds);
        setScore(correctAnswers);
        setSubmitted(true);
    
        // Log to see the calculated score before saving
        console.log("Calculated Score:", correctAnswers); 
    
        // Save test results to the 'userTestResults' collection immediately after scoring
        try {
            const testResultsRef = collection(db, 'userTestResults');
            await addDoc(testResultsRef, {
                name,
                email,
                uuiId,
                score: correctAnswers, // Directly using correctAnswers for score
                totalQuestions: questions.length,
                timeTaken: totalTimeTakenInSeconds,
                timestamp: new Date(),
            });
    
            console.log('Test results saved successfully');
    
            // Now proceed to upload the video
            const blob = new Blob(recordedChunks.current, { type: 'video/webm' });
            console.log("Blob size before upload:", blob.size);
            
            if (blob.size === 0) {
                console.error("Blob size is 0. Cannot upload.");
                return;
            }
    
            const videoRef = ref(storage, `test-videos/${name}_${uuiId}_${Date.now()}.webm`); // Include user name in the video name
            const uploadTask = uploadBytesResumable(videoRef, blob);
    
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(`Upload is ${progress}% done`);
                },
                (error) => {
                    console.error('Error uploading video:', error.message);
                },
                async () => {
                    const videoURL = await getDownloadURL(uploadTask.snapshot.ref);
                    console.log("Video URL:", videoURL);
                    setVideoURL(videoURL); // Store the video URL for preview
    
                    // Save video URL to the 'video' Firestore collection
                    const videoCollectionRef = collection(db, 'video');
                    await addDoc(videoCollectionRef, {
                        name, // Include user's name
                        uuiId,
                        videoURL,
                        timestamp: new Date(),
                    });
    
                    console.log('Video URL saved successfully');
                }
            );
        } catch (error) {
            console.error('Error saving test results or video:', error.message);
        }
    };
    

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    };

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handlePrev = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const handleBackToHome = () => {
        navigate('/home');
    };

    return (
        <div className="test-container">
            <h2 className="title">Take Your Test</h2>
            <div className="header">
                <div className="timer">Time Left: {formatTime(timeLeft)}</div>
                <div className="webcam-container">
                    <Webcam
                        className="webcam-feed"
                        ref={webcamRef}
                        videoConstraints={{ width: 150, height: 150, facingMode: 'user' }}
                    />
                </div>
            </div>

            {submitted ? (
                <div className="result-container">
                    <h3>{name}, Your Score: {score} out of {questions.length}</h3>
                    <p>Time Taken: {Math.floor(totalTimeTaken / 60)} minutes and {totalTimeTaken % 60} seconds</p>

                    {/* Video Preview */}
                    {videoURL ? (
                        <div className="video-preview">
                            <h4>Your Video Recording:</h4>
                            <video width="400" controls>
                                <source src={videoURL} type="video/webm" />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    ) : (
                        <p>Loading video preview...</p> // Show loading text until videoURL is set
                    )}

                    <button className="back-button" onClick={handleBackToHome}>Back to Home</button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="test-form">
                    {questions.length > 0 && (
                        <div className="question-card">
                            <h4>{currentQuestionIndex + 1}. {questions[currentQuestionIndex].question}</h4>
                            {questions[currentQuestionIndex].options.map((option, index) => (
                                <div key={index}>
                                    <label>
                                        <input
                                            type="radio"
                                            name={`question-${currentQuestionIndex}`}
                                            value={option}
                                            checked={answers[questions[currentQuestionIndex].id] === option}
                                            onChange={() => handleAnswerChange(questions[currentQuestionIndex].id, option)}
                                        />
                                        {option}
                                    </label>
                                </div>
                            ))}
                        </div>
                    )}
                    <div className="navigation-buttons">
                        <button
                            type="button"
                            onClick={handlePrev}
                            disabled={currentQuestionIndex === 0}
                        >
                            Previous
                        </button>
                        <button
                            type="button"
                            onClick={handleNext}
                            disabled={currentQuestionIndex === questions.length - 1}
                        >
                            Next
                        </button>
                        <button type="button" onClick={startRecording}>Start Recording</button>

                        <button type="submit">Submit</button>
                    </div>
                </form>
            )}
        </div>
    );
}

export default Test;