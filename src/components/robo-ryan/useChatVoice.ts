'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import copy from '../../../content/robo-ryan-ui.json';
import speechCopy from '../../../content/robo-ryan-speech.json';

type RecognitionResult = { isFinal: boolean; [index: number]: { transcript: string } };
type Recognition = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  onstart: (() => void) | null;
  onresult: ((event: { results: ArrayLike<RecognitionResult> }) => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  onend: (() => void) | null;
  start(): void;
  stop(): void;
  abort(): void;
};
type VoiceWindow = Window & {
  SpeechRecognition?: new () => Recognition;
  webkitSpeechRecognition?: new () => Recognition;
};

export function useChatVoice(onTranscript: (text: string) => void) {
  const [listening, setListening] = useState(false);
  const [readReplies, setReadReplies] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [help, setHelp] = useState('');
  const recognition = useRef<Recognition | null>(null);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const audioContext = useRef<AudioContext | null>(null);
  const source = useRef<AudioBufferSourceNode | null>(null);
  const speechRequest = useRef<AbortController | null>(null);
  const speechCache = useRef(new Map<string, AudioBuffer>());
  const enabled = useRef(false);
  const receive = useRef(onTranscript);
  receive.current = onTranscript;

  const stopListening = useCallback((discard = false) => {
    if (timeout.current) clearTimeout(timeout.current);
    timeout.current = null;
    const active = recognition.current;
    if (!active) return;
    if (discard) {
      recognition.current = null;
      active.onresult = active.onend = active.onerror = active.onstart = null;
      try { active.abort(); } catch { /* Already stopped by the browser. */ }
      setListening(false);
      setHelp(previous => previous === copy.voice.listening ? copy.voice.stopped : previous);
    } else {
      try { active.stop(); } catch {
        recognition.current = null;
        setListening(false);
      }
    }
  }, []);

  const stopSpeaking = useCallback(() => {
    speechRequest.current?.abort();
    speechRequest.current = null;
    if (source.current) {
      source.current.onended = null;
      try { source.current.stop(); } catch { /* Already stopped. */ }
      source.current.disconnect();
      source.current = null;
    }
    setSpeaking(false);
    setHelp(previous => previous === speechCopy.loading ? speechCopy.disclosure : previous);
  }, []);

  // Resume inside the user's speaker/microphone gesture so later replies can
  // play on mobile without requiring a second tap after the network request.
  const unlockAudio = useCallback(() => {
    if (!audioContext.current || audioContext.current.state === 'closed') audioContext.current = new AudioContext();
    const context = audioContext.current;
    void context.resume().catch(() => {});
    return context;
  }, []);

  const stopAll = useCallback(() => {
    stopListening(true);
    stopSpeaking();
  }, [stopListening, stopSpeaking]);

  const readAnswer = useCallback(async (text: string) => {
    stopAll();
    if (!('AudioContext' in window)) {
      setHelp(copy.voice.playbackUnavailable);
      return;
    }
    const pending = new AbortController();
    speechRequest.current = pending;
    setSpeaking(true);
    setHelp(speechCopy.loading);
    try {
      const context = unlockAudio();
      let buffer = speechCache.current.get(text);
      if (!buffer) {
        const response = await fetch('/api/robo-ryan/speech', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({text}), signal: AbortSignal.any([pending.signal, AbortSignal.timeout(55000)])});
        if (!response.ok) throw new Error('Speech unavailable');
        buffer = await context.decodeAudioData(await response.arrayBuffer());
        if (pending.signal.aborted) return;
        // Keep only a few replies in browser memory; never persist speech audio.
        if (speechCache.current.size >= 3) speechCache.current.delete(speechCache.current.keys().next().value!);
        speechCache.current.set(text, buffer);
      }
      if (pending.signal.aborted) return;
      if (context.state !== 'running') {setHelp(copy.voice.playbackBlocked); setSpeaking(false); return}
      const playback = context.createBufferSource();
      playback.buffer = buffer;
      playback.connect(context.destination);
      playback.onended = () => {if (source.current === playback) {playback.disconnect(); source.current = null; setSpeaking(false)}};
      source.current = playback;
      setHelp(speechCopy.disclosure);
      playback.start();
    } catch {
      if (!pending.signal.aborted) {setSpeaking(false); setHelp(speechCopy.unavailable)}
    } finally {if (speechRequest.current === pending) speechRequest.current = null}
  }, [stopAll, unlockAudio]);

  const speakReply = useCallback((text: string) => {
    if (enabled.current && document.visibilityState === 'visible') readAnswer(text);
  }, [readAnswer]);

  const toggleReadReplies = useCallback(() => {
    enabled.current = !enabled.current;
    setReadReplies(enabled.current);
    if (enabled.current) {
      setHelp(copy.voice.disclosure);
      // A direct user gesture starts playback on mobile browsers.
      readAnswer(copy.voice.enabledAnnouncement);
    } else stopSpeaking();
  }, [readAnswer, stopSpeaking]);

  const startListening = useCallback((draft: string) => {
    if (recognition.current) { stopListening(); return; }
    stopSpeaking();
    try { unlockAudio(); } catch { /* Dictation still works without playback. */ }
    const Constructor = (window as VoiceWindow).SpeechRecognition ?? (window as VoiceWindow).webkitSpeechRecognition;
    if (!Constructor || !window.isSecureContext) { setHelp(copy.voice.unsupported); return; }
    let active: Recognition;
    try { active = new Constructor(); } catch { setHelp(copy.voice.unavailable); return; }
    active.lang = 'en-US';
    active.continuous = false;
    active.interimResults = true;
    active.maxAlternatives = 1;
    let heard = false;
    let failed = false;
    recognition.current = active;
    setListening(true);
    setHelp(copy.voice.listening);
    // Voice input opts into spoken replies; the speaker control can turn them off.
    enabled.current = true;
    setReadReplies(true);
    active.onstart = () => { if (recognition.current === active) setListening(true); };
    active.onresult = event => {
      if (recognition.current !== active) return;
      const text = Array.from(event.results).map(result => result[0].transcript).join(' ').trim();
      if (text) { heard = true; receive.current([draft.trim(), text].filter(Boolean).join(' ').slice(0,1500)); }
    };
    active.onerror = event => {
      if (recognition.current !== active) return;
      failed = true;
      const errors: Record<string, string> = {
        'not-allowed': copy.voice.denied,
        'service-not-allowed': copy.voice.denied,
        'audio-capture': copy.voice.noMicrophone,
        'no-speech': copy.voice.noSpeech,
        'network': copy.voice.network,
      };
      setHelp(errors[event.error] ?? copy.voice.unavailable);
      stopListening(true);
    };
    active.onend = () => {
      if (recognition.current !== active) return;
      recognition.current = null;
      if (timeout.current) clearTimeout(timeout.current);
      timeout.current = null;
      setListening(false);
      if (!failed) setHelp(heard ? copy.voice.review : copy.voice.noSpeech);
    };
    try {
      active.start();
      timeout.current = setTimeout(() => stopListening(), 30000);
    } catch { stopListening(true); setHelp(copy.voice.unavailable); }
  }, [stopListening, stopSpeaking, unlockAudio]);

  useEffect(() => {
    const onVisibility = () => { if (document.visibilityState !== 'visible') stopAll(); };
    document.addEventListener('visibilitychange', onVisibility);
    const cache = speechCache.current;
    return () => { document.removeEventListener('visibilitychange', onVisibility); stopAll(); void audioContext.current?.close().catch(() => {}); audioContext.current = null; cache.clear(); };
  }, [stopAll]);

  return { listening, readReplies, speaking, help, startListening, stopAll, stopSpeaking, toggleReadReplies, speakReply, readAnswer };
}
