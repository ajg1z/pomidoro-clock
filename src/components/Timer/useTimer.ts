import { useRef, useEffect } from 'react';
import { AppAction } from '../../app';
import { AppStateSchema, ClockPeriodType } from '../../app/app.types';
import startBreakTrack from '../../shared/assets/start-break.mp3';
import startSessionTrack from '../../shared/assets/start-session.mp3';

export const useTimer = (dispatch: React.Dispatch<AppAction>, appState: AppStateSchema) => {
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const appStateRef = useRef<AppStateSchema>(appState);

    const soundNotification = (period: ClockPeriodType) => {
        const audioSrc = period === 'break' ? startBreakTrack : startSessionTrack;

        const audio = new Audio(audioSrc);
        audioRef.current = audio;
        audio.style.position = 'absolute';
        audio.style.opacity = '0';
        document.body.appendChild(audio);
        audio.play();

        setTimeout(() => {
            audio.pause();
            audio.remove();
        }, 8000);

        timeoutRef.current = setTimeout(() => {
            timer(appStateRef.current);
        }, 8000);
    };

    const timer = (stateApp: AppStateSchema) => {
        let seconds = stateApp.timer;
        let period = stateApp.periodType;

        if (intervalRef.current) clearInterval(intervalRef.current);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        if (stateApp.state !== 'active') {
            if (audioRef.current) audioRef.current.pause();
            return;
        }

        intervalRef.current = setInterval(() => {
            seconds--;

            if (seconds === 0) {
                period = period === 'session' ? 'break' : 'session';
                dispatch({
                    type: 'setted_period_type',
                    period,
                });

                seconds =
                    period === 'break'
                        ? appStateRef.current.durationBreak
                        : appStateRef.current.durationSession;

                if (intervalRef.current) clearInterval(intervalRef.current);

                soundNotification(period);
            }

            dispatch({
                type: 'setted_timer',
                time: seconds,
            });
        }, 1000);
    };

    useEffect(() => {
        appStateRef.current = appState;
    }, [appState]);

    return {
        timer,
    };
};
