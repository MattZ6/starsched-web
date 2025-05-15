export class EventUtils {
  subscribe(
    eventName: string,
    listener: EventListenerOrEventListenerObject,
  ) {
    document.addEventListener(eventName, listener)
  }

  unsubscribe(
    eventName: string,
    listener: EventListenerOrEventListenerObject,
  ) {
    document.removeEventListener(eventName, listener)
  }

  isCustomEvent<Detail = unknown>(
    event: Event,
  ): event is CustomEvent<Detail> {
    return event instanceof CustomEvent
  }

  emit<Payload = unknown>(
    eventName: string,
    payload?: Payload,
  ) {
    const event = new CustomEvent<Payload>(eventName, { detail: payload })

    document.dispatchEvent(event)
  }
}
