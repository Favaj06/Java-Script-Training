/*
Behavioral Pattern Audit

File reviewed: observer.ts

1. Is there any object that directly calls methods on multiple other objects
   in response to a state change?
   → Possible Observer problem? Yes — Reason:
   The OrderStore directly notifies multiple observers when an order
   is placed or cancelled. This is exactly the type of behaviour that
   Observer can separate from the main Subject.

2. Is there any function or method with a growing if/else block that selects
   different behaviour based on a type, mode, or string value?
   → Possible Strategy problem? No — Reason:
   The observer.ts file does not contain a growing if/else block for
   selecting different behaviours.

3. Rule of three check:
   - Observer: Yes. OrderStore has more than two different observers:
     ShipmentQueue, EmailService, AuditLog and AnalyticsService.
   - Strategy: Not applicable because there is no growing if/else
     behaviour-selection block.

4. If a pattern fits:
   The OrderStore behaviour can be separated into independent Observer
   classes that subscribe to the Subject and react to order events.

5. If no pattern fits:
   Strategy is unnecessary in this file because there is no behaviour
   selection that is expected to grow.
*/


// ==========================================
// Price Change Event
// ==========================================
interface Observer {
  update(data: unknown): void
}

class Subject {
  private observers: Observer[] = []

  subscribe(observer: Observer): void {
    this.observers.push(observer)
  }

  unsubscribe(observer: Observer): void {
    this.observers = this.observers.filter(o => o !== observer)
  }

  protected notify(data: unknown): void {
    this.observers.forEach(o => o.update(data))
  }
}
type PriceChangeEvent = {
  product: string
  oldPrice: number
  newPrice: number
}


// ==========================================
// PricingEngine — Subject
// ==========================================

class PricingEngine extends Subject {
  updatePrice(
    product: string,
    oldPrice: number,
    newPrice: number
  ): void {
    this.notify({
      product,
      oldPrice,
      newPrice
    })
  }
}


// ==========================================
// Discount Alert Observer
// ==========================================

class DiscountAlertObserver implements Observer {
  update(data: unknown): void {
    const event = data as PriceChangeEvent

    const percentageDrop =
      ((event.oldPrice - event.newPrice) / event.oldPrice) * 100

    if (percentageDrop > 10) {
      const pct = percentageDrop.toFixed(2)

      console.log(
        `[Discount] ${event.product} dropped by ${pct}% — alert sent`
      )
    }
  }
}


// ==========================================
// Price History Observer
// ==========================================

class PriceHistoryObserver implements Observer {
  update(data: unknown): void {
    const event = data as PriceChangeEvent

    console.log(
      `[History] ${event.product}: ${event.oldPrice} -> ${event.newPrice}`
    )
  }
}


// ==========================================
// Budget Tracker Observer
// ==========================================

class BudgetTrackerObserver implements Observer {
  private readonly budgetThreshold = 2000

  update(data: unknown): void {
    const event = data as PriceChangeEvent

    if (
      event.oldPrice >= this.budgetThreshold &&
      event.newPrice < this.budgetThreshold
    ) {
      console.log(
        `[Budget] ${event.product} is now under budget at ${event.newPrice}`
      )
    }
  }
}


// ==========================================
// Testing
// ==========================================

const engine = new PricingEngine()

engine.subscribe(new DiscountAlertObserver())
engine.subscribe(new PriceHistoryObserver())
engine.subscribe(new BudgetTrackerObserver())


engine.updatePrice(
  'Monitor',
  18999,
  14999
)

engine.updatePrice(
  'Keyboard',
  2499,
  1999
)

engine.updatePrice(
  'Mouse',
  899,
  849
)


/*
Output explanation:

1. Monitor: 18999 -> 14999
   - DiscountAlertObserver fires because the price dropped by more
     than 10%.
   - PriceHistoryObserver fires because it records every price change.
   - BudgetTrackerObserver does not fire because the new price
     14999 is still above the 2000 budget threshold.

2. Keyboard: 2499 -> 1999
   - DiscountAlertObserver fires because the price dropped by more
     than 10%.
   - PriceHistoryObserver fires because it records every price change.
   - BudgetTrackerObserver fires because the price crossed from
     above 2000 to below 2000.

3. Mouse: 899 -> 849
   - DiscountAlertObserver does not fire because the price drop is
     less than 10%.
   - PriceHistoryObserver fires because every price change is recorded.
   - BudgetTrackerObserver does not fire because the price was already
     below the 2000 threshold and did not cross the threshold.

The important point is that PricingEngine does not need to know what
each observer does. It only notifies them about the price change.
Each observer independently decides whether it should react.
*/