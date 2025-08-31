import React from 'react';

interface VideoModalProps {
    videoUrl: string;
    title: string;
    onClose: () => void;
}

const VideoModal: React.FC<VideoModalProps> = ({ videoUrl, title, onClose }) => {
    return (
        <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
            <h3>{title}</h3>
            <button className="close-btn" onClick={onClose}>✕</button>
            </div>
            <div className="video-container">
            <video
                controls
                autoPlay
                className="video-player"
                onError={() => console.error('Error: Video is not loading')}
            >
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support video playback.
            </video>
            </div>
        </div>
        </div>
    );
};

export default VideoModal;
