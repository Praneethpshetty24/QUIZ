import React, { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../Firebase'; // Ensure that db and storage are imported
import './Admin.css';

function Admin() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const videoCollectionRef = collection(db, 'video');
        const videoSnapshot = await getDocs(videoCollectionRef);
        const videoList = videoSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // Check each video in Storage and filter out those that do not exist
        const existingVideos = await Promise.all(videoList.map(async (video) => {
          try {
            const videoRef = ref(storage, video.videoURL);
            const downloadURL = await getDownloadURL(videoRef);
            return { ...video, downloadURL }; // Attach the download URL to the video object
          } catch (error) {
            console.error('Video not found in storage, deleting from Firestore:', video.videoURL);
            await deleteDoc(doc(db, 'video', video.id)); // Delete from Firestore if not found
            return null; // Return null for videos that don't exist
          }
        }));

        // Filter out null values (videos that were deleted)
        setVideos(existingVideos.filter(video => video !== null));
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
          videos.map(video => (
            <div key={video.id} className="video-item">
              <h4>{video.uuiId}</h4>
              <video width="320" height="240" controls>
                <source src={video.downloadURL} type="video/webm" />
                Your browser does not support the video tag.
              </video>
              <p>Uploaded on: {video.timestamp.toDate().toLocaleString()}</p>
            </div>
          ))
        ) : (
          <p>No videos uploaded yet.</p>
        )}
      </div>
    </div>
  );
}

export default Admin;
