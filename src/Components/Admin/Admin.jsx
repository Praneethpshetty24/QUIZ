import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../Firebase'; // Ensure that db is imported
import './Admin.css';

function Admin() {
  const [videos, setVideos] = useState([]);
  
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const videoCollectionRef = collection(db, 'video');
        const videoSnapshot = await getDocs(videoCollectionRef);
        const videoList = videoSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setVideos(videoList);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="admin-container">
      <h2>Uploaded Videos</h2>
      <div className="video-list">
        {videos.length > 0 ? (
          videos.map(video => {
            const videoURL = video.videoURL;

            // Debug: Log the video URL to the console
            console.log('Video URL:', videoURL);

            return (
              <div key={video.id} className="video-item">
                <h4>{video.uuiId}</h4>
                <video width="320" height="240" controls>
                  <source src={videoURL} type="video/webm" />
                  Your browser does not support the video tag.
                </video>
                <p>Uploaded on: {video.timestamp.toDate().toLocaleString()}</p>
              </div>
            );
          })
        ) : (
          <p>No videos uploaded yet.</p>
        )}
      </div>
    </div>
  );
}

export default Admin;
