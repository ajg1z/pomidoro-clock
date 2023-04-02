import { AppAction, AppStateSchema } from './app.types';

export const appReducer = (state: AppStateSchema, action: AppAction) => {
    switch (action.type) {
        case 'setted_state': {
            state.state = action.state;
            break;
        }
        case 'setted_break_duration': {
            state.durationBreak = action.duration;
            break;
        }
        case 'setted_period_type': {
            state.periodType = action.period;
            break;
        }
        case 'setted_session_duration': {
            state.durationSession = action.duration;
            break;
        }
        case 'setted_timer': {
            state.timer = action.time;
            break;
        }
        case 'setted_step_duraion': {
            state.stepDuration = action.step;
            break;
        }
        default:
            throw Error('Unknown action.');
    }
};
