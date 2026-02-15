/**
 * Custom hook to manage event stream
 */

import { useEffect, useRef } from 'react';
import { eventService } from '../services/opencode/event';

type EventCallback = (event: unknown) => void;

export const useEventStream = (
  eventType: string,
  callback: EventCallback,
  enabled = true
) => {
  const callbackRef = useRef(callback);

  // Update callback ref without re-subscribing
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    // Subscribe to event
    const handler = (event: unknown) => {
      callbackRef.current(event);
    };

    eventService.on(eventType, handler);

    // Cleanup
    return () => {
      eventService.off(eventType, handler);
    };
  }, [eventType, enabled]);
};

export const useEventConnection = (enabled = true) => {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    // Connect to event stream
    eventService.connect().catch(err => {
      console.error('Failed to connect to event stream:', err);
    });

    // Disconnect on unmount
    return () => {
      eventService.disconnect();
    };
  }, [enabled]);
};
