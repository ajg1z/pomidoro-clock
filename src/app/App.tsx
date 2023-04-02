import { Timer } from '../components/Timer';
import { DurationSettings } from '../components/DurationSettings';
import { useImmerReducer } from 'use-immer';
import { AppStateSchema } from './app.types';
import { appReducer } from './App.reducer';
import cls from './App.module.scss';

const initialState: AppStateSchema = {
    durationBreak: 300,
    durationSession: 300,
    periodType: 'session',
    state: 'start',
    timer: 300,
    stepDuration: 60,
};

export function App() {
    const [appState, dispatch] = useImmerReducer(appReducer, initialState);

    return (
        <div className='App'>
            <div className={cls.content}>
                <Timer dispatch={dispatch} appState={appState} />
                <DurationSettings dispatch={dispatch} appState={appState} />
            </div>
        </div>
    );
}
