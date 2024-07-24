import React from 'react';
import AudioRecorder from '../components/AudioRecorder/AudioRecorder';
import styles from './SummarizeStudio.module.scss';

const SummarizeStudio = () => {
  return (
    <div className={styles.summarizeStudio}>
      <h1 className={styles.title}>Summarize Studio</h1>
      <p className={styles.description}>
        Welcome to Summarize Studio, your all-in-one solution for audio transcription and summarization.
        Record your audio, and we'll help you transcribe and summarize it efficiently.
      </p>
      <div className={styles.instructions}>
        <h2>How to use:</h2>
        <ol>
          <li>Use the audio recorder below to capture your audio.</li>
          <li>Download the recorded audio file.</li>
          <li>Soon, you'll be able to upload the file for transcription and summarization!</li>
        </ol>
      </div>
      <div className={styles.recorderContainer}>
        <AudioRecorder />
      </div>
      <div className={styles.comingSoon}>
        <h2>Coming Soon:</h2>
        <ul>
          <li>Automatic audio transcription</li>
          <li>AI-powered summarization</li>
          <li>Multi-language support</li>
        </ul>
      </div>
    </div>
  );
};

export default SummarizeStudio;