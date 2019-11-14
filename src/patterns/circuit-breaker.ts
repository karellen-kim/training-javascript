enum State {
  Close,
  Open,
  HalfOpen,
}

export class CircuitBreaker {
  private failureCount: number;
  private failureThreshold: number;
  private resetTimeout: number;
  private lastFailureTime: number;

  constructor(failureThreshold?: number, resetTimeout?: number) {
    this.failureCount = 0;
    this.failureThreshold = failureThreshold || 10;
    this.resetTimeout = resetTimeout || 1000;
  }

  public call(command: Function) {
    switch (this.state()) {
      case State.HalfOpen :
        if (this.executeByRandom()) {
          try {
            command();
            this.resetFailure();
          } catch (e) {
            // Continue Error
          }
        } else {
          throw new Error("Error");
        }
        break;
      case State.Close :
        try {
          command();
        } catch (e) {
          this.recordFailure();
          throw e;
        }
        break;
      case State.Open :
        throw new Error("Error");
      default :
        throw new Error("Unknown State");
    }
  }

  private state() {
    if (this.failureCount >= this.failureThreshold) {
      if ((new Date().getTime() - this.lastFailureTime) > this.resetTimeout){
        return State.HalfOpen;
      } else {
        return State.Open;
      }
    } else {
      return State.Close;
    }
  }

  private recordFailure() {
    this.failureCount = this.failureCount + 1;
    this.lastFailureTime = new Date().getTime();
  }

  private resetFailure() {
    this.failureCount = 0;
  }

  private executeByRandom() {
    return true;
  }
}
