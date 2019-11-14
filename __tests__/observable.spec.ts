import { Observable } from 'rxjs';

describe('observable', () => {
  it('subscribe next', () => {
    const observable = new Observable(subscriber => {
      subscriber.next(1);
      subscriber.next(2);
      subscriber.next(3);
      setTimeout(() => {
        subscriber.next(4);
        subscriber.complete();
      }, 1000);
    });

    console.log('just before subscribe');
    observable.subscribe((x: number) => console.log(x));
    console.log('just after subscribe');
    setTimeout(() => 0, 5000);
  });

  it('subscribe complete', () => {
    const observable = new Observable(subscriber => {
      subscriber.next(1);
      subscriber.next(2);
      subscriber.next(3);
      setTimeout(() => {
        subscriber.next(4);
        subscriber.complete();
      }, 1000);
    });

    console.log('just before subscribe');
    observable.subscribe(
      (x: number) => console.log(x),
      (error: any) => console.log(error),
      () => console.log('done')
      );
    console.log('just after subscribe');
    setTimeout(() => 0, 5000);
  });
});
