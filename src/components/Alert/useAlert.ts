import React, { useMemo, useReducer } from "react";

export interface IAlert {
    content: React.ReactNode,
    type?: 'success' | 'info' | 'warning' | 'error'
}
/**
 * Hook for alerts list
 * @param destroyTime Time (in miliseconds) to wait before destroy a created alert
 */
export default function useAlert(destroyTime = 3000) {
    const alerts: IAlert[] = useMemo(() => [], []);
    const [, update] = useReducer(x => (x + 1) % 7, 0);

    return {
        /**
         * Adds a new alert to the component and destroys it after some time
         * @param content Alert content
         * @param type Alert type
         */
        add(content: IAlert["content"], type?: IAlert["type"]) {
            const alert: IAlert = { content, type };
            alerts.push(alert);
            update();
            setTimeout(() => {
                const index = alerts.indexOf(alert);
                if (index == -1) return;
                alerts.splice(index, 1);
                update();
            }, destroyTime);
        },
        /**
         * Gets the list of active alerts
         */
        get() {
            return alerts;
        }
    };
}