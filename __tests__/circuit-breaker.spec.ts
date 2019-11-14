import {CircuitBreaker} from "../src/patterns/circuit-breaker";

describe('Circuit Breakr', () => {
  it('정상적으로 동작한다', () => {
    const circuitBreaker = new CircuitBreaker();

    let count = 0;
    function func() {
      count = count + 1;
    }
    circuitBreaker.call(func);
    expect(count).toBe(1);
  });

  it('오류가 발생하면 동작하지 않는다', () => {
    const circuitBreaker = new CircuitBreaker(2);

    let count = 0;
    function func() {
      count = count + 1;
      throw new Error();
    }

    expect(() => { circuitBreaker.call(func) }).toThrow();
    expect(count).toBe(1);
    expect(() => { circuitBreaker.call(func) }).toThrow();
    expect(count).toBe(2);
    expect(() => { circuitBreaker.call(func) }).toThrow();
    expect(count).toBe(2);
  });
});
