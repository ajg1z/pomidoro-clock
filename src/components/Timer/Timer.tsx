import { PropsWithChildren, memo } from 'react';
import cls from './Timer.module.scss';
import classNames from 'classnames';
import { AppAction } from '../../app';
import { convertSecToHms } from '../../utils/convertSecToHms/convertSecToHms';
import { useTimer } from './useTimer';
import { AppStateSchema } from '../../app/app.types';
import { faPlay, faRefresh, faPause } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface TimerProps {
    className?: string;
    appState: AppStateSchema;
    dispatch: React.Dispatch<AppAction>;
}

export const Timer = memo((props: PropsWithChildren<TimerProps>) => {
    const { className, appState, dispatch } = props;
    const { timer } = useTimer(dispatch, appState);

    const periodTypeLabel = appState.periodType === 'session' ? 'Session' : 'Break';
    const timeLabel = convertSecToHms(appState.timer);

    const onToggleState = () => {
        const newState =
            appState.state === 'start' || appState.state === 'pause' ? 'active' : 'pause';

        dispatch({
            type: 'setted_state',
            state: newState,
        });

        timer({ ...appState, state: newState });
    };

    const onReset = () => {
        dispatch({
            type: 'setted_state',
            state: 'start',
        });

        dispatch({
            type: 'setted_period_type',
            period: 'session',
        });

        timer({ ...appState, state: 'start' });

        const time =
            appState.periodType === 'break' ? appState.durationBreak : appState.durationSession;

        dispatch({
            type: 'setted_timer',
            time,
        });
    };

    return (
        <div className={classNames(cls.Timer, className, cls[appState.periodType])}>
            <p className={cls.periodType}>{periodTypeLabel}</p>
            <div className={cls.time}>{timeLabel}</div>
            <div className={cls.actions}>
                <button
                    title={appState.state === 'active' ? 'pause' : 'start'}
                    onClick={onToggleState}
                    className={cls.toggleBtn}
                >
                    <FontAwesomeIcon icon={appState.state === 'active' ? faPause : faPlay} />
                </button>
                <button title={'reset'} onClick={onReset}>
                    <FontAwesomeIcon icon={faRefresh} />
                </button>
            </div>
        </div>
    );
});
