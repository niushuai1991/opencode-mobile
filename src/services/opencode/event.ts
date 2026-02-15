/**
 * Event service
 * Handles Server-Sent Events (SSE) for real-time updates
 */

import { opencodeService } from './client';
import { logger } from '../../utils/logger';
import { CONFIG } from '../../constants/config';

type EventHandler = (event: unknown) => void;

class EventService {
  private eventController: AbortController | null = null;
  private eventHandlers: Map<string, EventHandler[]> = new Map();
  private reconnectAttempts = 0;
  private isConnecting = false;
  private isConnected = false;

  /**
   * Subscribe to specific event type
   */
  on(eventType: string, handler: EventHandler): void {
    if (!this.eventHandlers.has(eventType)) {
      this.eventHandlers.set(eventType, []);
    }
    this.eventHandlers.get(eventType)!.push(handler);

    logger.debug('Event handler registered', { eventType });
  }

  /**
   * Unsubscribe from event type
   */
  off(eventType: string, handler: EventHandler): void {
    const handlers = this.eventHandlers.get(eventType);
    if (handlers) {
      const index = handlers.indexOf(handler);
      if (index > -1) {
        handlers.splice(index, 1);
        logger.debug('Event handler removed', { eventType });
      }
    }
  }

  /**
   * Connect to SSE event stream
   */
  async connect(_directory?: string): Promise<void> {
    if (this.isConnecting || this.isConnected) {
      logger.warn('Event stream already connected or connecting');
      return;
    }

    this.isConnecting = true;

    try {
      const client = opencodeService.getClient();
      this.eventController = new AbortController();

      await client.global.event({
        onSseEvent: (event: unknown) => {
          this.handleEvent(event);
        },
        onSseError: (error: unknown) => {
          this.handleError(error);
        },
      });

      this.isConnected = true;
      this.isConnecting = false;
      this.reconnectAttempts = 0;

      logger.info('Event stream connected');
    } catch (error) {
      this.isConnecting = false;
      this.isConnected = false;

      logger.error('Failed to connect to event stream', error);

      // Attempt to reconnect
      this.scheduleReconnect(_directory);
      throw error;
    }
  }

  /**
   * Disconnect from event stream
   */
  disconnect(): void {
    if (this.eventController) {
      this.eventController.abort();
      this.eventController = null;
    }

    this.isConnected = false;
    this.isConnecting = false;
    this.reconnectAttempts = 0;

    logger.info('Event stream disconnected');
  }

  /**
   * Handle incoming event
   */
  private handleEvent(event: unknown): void {
    const payload = event as { payload?: { type?: string } };
    const eventType = payload.payload?.type;

    if (!eventType) {
      logger.warn('Received event without type', event);
      return;
    }

    // Log all events for debugging
    logger.debug('Event received', { type: eventType });

    // Call registered handlers
    const handlers = this.eventHandlers.get(eventType);
    if (handlers) {
      handlers.forEach(handler => {
        try {
          handler(payload.payload);
        } catch (error) {
          logger.error('Error in event handler', {
            eventType,
            error,
          });
        }
      });
    }

    // Call wildcard handlers
    const wildcardHandlers = this.eventHandlers.get('*');
    if (wildcardHandlers) {
      wildcardHandlers.forEach(handler => {
        try {
          handler(payload.payload);
        } catch (error) {
          logger.error('Error in wildcard handler', error);
        }
      });
    }
  }

  /**
   * Handle connection error
   */
  private handleError(error: unknown): void {
    logger.error('Event stream error', error);
    this.isConnected = false;
  }

  /**
   * Schedule reconnection attempt
   */
  private scheduleReconnect(directory?: string): void {
    if (this.reconnectAttempts >= CONFIG.SSE_MAX_RECONNECT_ATTEMPTS) {
      logger.error('Max reconnection attempts reached');
      return;
    }

    this.reconnectAttempts++;
    const delay =
      CONFIG.SSE_RECONNECT_DELAY * Math.pow(2, this.reconnectAttempts - 1);

    logger.info(`Scheduling reconnection attempt ${this.reconnectAttempts}`, {
      delay,
    });

    setTimeout(() => {
      this.connect(directory).catch(error => {
        logger.error('Reconnection failed', error);
      });
    }, delay);
  }

  /**
   * Check if connected
   */
  connected(): boolean {
    return this.isConnected;
  }
}

// Export singleton instance
export const eventService = new EventService();
