import { PropsWithChildren, memo, useMemo, ChangeEvent } from 'react';
import cls from './DurationSettings.module.scss';
import classNames from 'classnames';
import { AppAction } from '../../app';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { convertSecToBeautifulDigit } from '../../utils/convertSecToBeautifulDigit/convertSecToBeautifulDigit';
import { SecondsInHour, SecondsInMinute } from '../../shared/const/time';
import { AppStateSchema, ClockPeriodType } from '../../app/app.types';

interface DurationSettingsProps {
    className?: string;
    appState: AppStateSchema;
    dispatch: React.Dispatch<AppAction>;
}

export const DurationSettings = memo((props: PropsWithChildren<DurationSettingsProps>) => {
    const { className, dispatch, appState } = props;
    const { durationBreak, durationSession, stepDuration, state } = appState;

    const durationBreakLabel = useMemo(
        () => convertSecToBeautifulDigit(durationBreak),
        [durationBreak],
    );

    const durationSessionLabel = useMemo(
        () => convertSecToBeautifulDigit(durationSession),
        [durationSession],
    );

    const updateTimer = (newDuration: number) => {
        if (state === 'start') {
            dispatch({
                type: 'setted_timer',
                time: newDuration,
            });
        }
    };

    const onChangeDuration = (type: ClockPeriodType, less?: boolean) => {
        const duration = type === 'break' ? durationBreak : durationSession;

        if (
            (duration - stepDuration < SecondsInMinute && less) ||
            (duration + stepDuration >= 24 * SecondsInHour && !less)
        )
            return;

        const newDuration = duration + (less ? -stepDuration : stepDuration);
        updateTimer(newDuration);

        dispatch({
            type: 'setted_session_duration',
            duration: newDuration,
        });
    };

    const onChangeStepDuration = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch({
            type: 'setted_step_duraion',
            step: parseInt(e.target.value),
        });
    };

    return (
        <div className={classNames(cls.DurationSettings, className)}>
            <div className={cls.stepTimeChange}>
                <p>Step duration</p>
                <select value={stepDuration} onChange={onChangeStepDuration}>
                    <option value={SecondsInMinute}>1 min</option>
                    <option value={SecondsInMinute * 5}>5 min</option>
                    <option value={SecondsInMinute * 30}>30 min</option>
                    <option value={SecondsInHour}>1 hour</option>
                    <option value={SecondsInHour * 5}>5 hour</option>
                </select>
            </div>
            <div className={cls.footer}>
                <div className={cls.session}>
                    <p>Session Length</p>
                    <div className={cls.timeInput}>
                        <button onClick={() => onChangeDuration('session')}>
                            <FontAwesomeIcon icon={faArrowUp} />
                        </button>
                        <div className={cls.time}>{durationSessionLabel}</div>
                        <button onClick={() => onChangeDuration('session', true)}>
                            <FontAwesomeIcon icon={faArrowDown} />
                        </button>
                    </div>
                </div>
                <div className={cls.break}>
                    <p>Break length</p>
                    <div className={cls.timeInput}>
                        <button onClick={() => onChangeDuration('break')}>
                            <FontAwesomeIcon icon={faArrowUp} />
                        </button>
                        <div className={cls.time}>{durationBreakLabel}</div>
                        <button onClick={() => onChangeDuration('break', true)}>
                            <FontAwesomeIcon icon={faArrowDown} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
});
