'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import copy from '../../../content/robo-ryan-ui.json';

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
  const utterance = useRef<SpeechSynthesisUtterance | null>(null);
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
    if (utterance.current) {
      utterance.current.onend = utterance.current.onerror = null;
      utterance.current = null;
    }
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    setSpeaking(false);
  }, []);

  const stopAll = useCallback(() => {
    stopListening(true);
    stopSpeaking();
  }, [stopListening, stopSpeaking]);

  const readAnswer = useCallback((text: string) => {
    stopAll();
    if (!('speechSynthesis' in window) || !('SpeechSynthesisUtterance' in window)) {
      setHelp(copy.voice.playbackUnavailable);
      return;
    }
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = 'en-US';
    speech.rate = 1;
    const voices = window.speechSynthesis.getVoices();
    const voice = voices.find(v => v.lang === 'en-US' && v.localService) ?? voices.find(v => v.lang.startsWith('en'));
    if (voice) speech.voice = voice;
    speech.onend = () => { if (utterance.current === speech) { utterance.current = null; setSpeaking(false); } };
    speech.onerror = event => {
      if (utterance.current !== speech) return;
      utterance.current = null;
      setSpeaking(false);
      if (event.error !== 'canceled' && event.error !== 'interrupted') setHelp(copy.voice.playbackBlocked);
    };
    utterance.current = speech;
    setSpeaking(true);
    try { window.speechSynthesis.speak(speech); } catch { utterance.current = null; setSpeaking(false); setHelp(copy.voice.playbackBlocked); }
  }, [stopAll]);

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
  }, [stopListening, stopSpeaking]);

  useEffect(() => {
    const onVisibility = () => { if (document.visibilityState !== 'visible') stopAll(); };
    document.addEventListener('visibilitychange', onVisibility);
    return () => { document.removeEventListener('visibilitychange', onVisibility); stopAll(); };
  }, [stopAll]);

  return { listening, readReplies, speaking, help, startListening, stopAll, stopSpeaking, toggleReadReplies, speakReply, readAnswer };
}
