export type ClockPeriodType = 'session' | 'break';
export type ClockState = 'active' | 'pause' | 'start';

export interface AppStateSchema {
    periodType: ClockPeriodType;
    state: ClockState;
    durationSession: number;
    durationBreak: number;
    timer: number;
    stepDuration: number;
}

export interface SetSessionDuration {
    type: 'setted_session_duration';
    duration: number;
}

export interface SetBreakDuration {
    type: 'setted_break_duration';
    duration: number;
}

export interface SetState {
    type: 'setted_state';
    state: ClockState;
}

export interface SetPeriodType {
    type: 'setted_period_type';
    period: ClockPeriodType;
}

export interface SetTimer {
    type: 'setted_timer';
    time: number;
}

export interface SetStepDuration {
    type: 'setted_step_duraion';
    step: number;
}

export type AppAction =
    | SetSessionDuration
    | SetBreakDuration
    | SetState
    | SetPeriodType
    | SetTimer
    | SetStepDuration;
