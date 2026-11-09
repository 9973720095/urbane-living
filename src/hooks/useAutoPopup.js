import { useEffect, useRef } from 'react';
import { autoPopup } from '../data/autoPopup';
import { leadSentWithinDays } from '../utils/leadStatus';

// sessionStorage = this tab's visit only (cleared when the tab/browser closes)
const START_KEY = 'ul_popup_visit_start';
const SHOWN_KEY = 'ul_popup_shown_steps';
const RETRY_MS = 15000; // if the moment is bad (form already open, user typing), try again in 15 sec

const readShown = () => {
  try { return JSON.parse(sessionStorage.getItem(SHOWN_KEY) || '[]'); } catch (e) { return []; }
};
const saveShown = (list) => {
  try { sessionStorage.setItem(SHOWN_KEY, JSON.stringify(list)); } catch (e) { /* storage blocked */ }
};
const visitStart = () => {
  try {
    const saved = Number(sessionStorage.getItem(START_KEY));
    if (saved) return saved;
    const now = Date.now();
    sessionStorage.setItem(START_KEY, String(now));
    return now;
  } catch (e) {
    return Date.now();
  }
};

// Opens the inquiry form at autoPopup.delays during a visit (5 sec, 5 min, 10 min by default).
// Refresh / page changes keep the same visit clock, so it never shows twice for the same step.
export default function useAutoPopup({ isOpen, open, pathname }) {
  const isOpenRef = useRef(isOpen);
  const pathRef = useRef(pathname);
  isOpenRef.current = isOpen;
  pathRef.current = pathname;

  useEffect(() => {
    const { enabled, delays, skipPaths, stopAfterLeadDays } = autoPopup;
    if (!enabled || typeof window === 'undefined') return undefined;
    if (leadSentWithinDays(stopAfterLeadDays)) return undefined;

    const start = visitStart();
    const timers = [];

    const badMoment = () => {
      if (isOpenRef.current) return true; // form already open
      if (skipPaths.some((p) => pathRef.current.startsWith(p))) return true;
      const el = document.activeElement;
      return Boolean(el && ['INPUT', 'TEXTAREA', 'SELECT'].includes(el.tagName)); // user is typing in another form
    };

    const tryShow = (step) => {
      if (readShown().includes(step)) return;
      if (leadSentWithinDays(stopAfterLeadDays)) return;
      if (badMoment()) {
        timers.push(setTimeout(() => tryShow(step), RETRY_MS));
        return;
      }
      saveShown([...readShown(), step]);
      open();
    };

    const shown = readShown();
    delays.forEach((sec, step) => {
      if (shown.includes(step)) return;
      const wait = Math.max(start + sec * 1000 - Date.now(), 1000);
      timers.push(setTimeout(() => tryShow(step), wait));
    });

    return () => timers.forEach(clearTimeout);
    // runs once per visit; open() / path are read through refs
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}