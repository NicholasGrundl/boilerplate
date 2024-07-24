import React, { useState, useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faStop, faDownload } from '@fortawesome/free-solid-svg-icons';
import styles from './AudioRecorder.module.scss';

const AudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [filename, setFilename] = useState('audio_recording');
  const [microphoneAudioData, setMicrophoneAudioData] = useState([]);
  const [speakerAudioData, setSpeakerAudioData] = useState([]);
  const [audioLevel, setAudioLevel] = useState(0);

  const microphoneRecorderRef = useRef(null);
  const speakerRecorderRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const visualizationRef = useRef(null);

  useEffect(() => {
    if (isRecording) {
      const updateVisualization = () => {
        const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
        analyserRef.current.getByteFrequencyData(dataArray);
        const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
        setAudioLevel(average);
      };

      const intervalId = setInterval(updateVisualization, 100);
      return () => clearInterval(intervalId);
    }
  }, [isRecording]);

  useEffect(() => {
    if (visualizationRef.current) {
      const svg = d3.select(visualizationRef.current);
      svg.selectAll('*').remove();

      const width = 200;
      const height = 50;

      svg.attr('width', width).attr('height', height);

      const scale = d3.scaleLinear().domain([0, 255]).range([0, width]);

      svg.append('rect')
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', scale(audioLevel))
        .attr('height', height)
        .attr('fill', '#4CAF50');
    }
  }, [audioLevel]);

  const startRecording = async () => {
    try {
      const micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const speakerStream = await navigator.mediaDevices.getDisplayMedia({ audio: true });

      audioContextRef.current = new AudioContext();
      analyserRef.current = audioContextRef.current.createAnalyser();
      const source = audioContextRef.current.createMediaStreamSource(micStream);
      source.connect(analyserRef.current);

      microphoneRecorderRef.current = new MediaRecorder(micStream);
      speakerRecorderRef.current = new MediaRecorder(speakerStream);

      microphoneRecorderRef.current.ondataavailable = (event) => {
        setMicrophoneAudioData((prevData) => [...prevData, event.data]);
      };

      speakerRecorderRef.current.ondataavailable = (event) => {
        setSpeakerAudioData((prevData) => [...prevData, event.data]);
      };

      microphoneRecorderRef.current.start();
      speakerRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error starting recording:', error);
      alert('Failed to start recording. Please make sure you have granted the necessary permissions.');
    }
  };

  const stopRecording = () => {
    microphoneRecorderRef.current.stop();
    speakerRecorderRef.current.stop();
    setIsRecording(false);
  };

  const downloadAudio = (audioData, source) => {
    const blob = new Blob(audioData, { type: 'audio/wav' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = `${filename}_${source}.wav`;
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className={styles.audioRecorder}>
      <h2>Audio Recorder</h2>
      <div className={styles.controls}>
        <button
          className={`${styles.button} ${isRecording ? styles.recording : ''}`}
          onClick={isRecording ? stopRecording : startRecording}
        >
          <FontAwesomeIcon icon={isRecording ? faStop : faPlay} />
          {isRecording ? 'Stop Recording' : 'Start Recording'}
        </button>
        <input
          type="text"
          value={filename}
          onChange={(e) => setFilename(e.target.value)}
          placeholder="Enter filename"
          className={styles.input}
        />
      </div>
      <div className={styles.visualization}>
        <svg ref={visualizationRef}></svg>
      </div>
      <div className={styles.downloadButtons}>
        <button
          className={styles.button}
          onClick={() => downloadAudio(microphoneAudioData, 'microphone')}
          disabled={isRecording || microphoneAudioData.length === 0}
        >
          <FontAwesomeIcon icon={faDownload} />
          Download Microphone Audio
        </button>
        <button
          className={styles.button}
          onClick={() => downloadAudio(speakerAudioData, 'speaker')}
          disabled={isRecording || speakerAudioData.length === 0}
        >
          <FontAwesomeIcon icon={faDownload} />
          Download Speaker Audio
        </button>
      </div>
    </div>
  );
};

export default AudioRecorder;