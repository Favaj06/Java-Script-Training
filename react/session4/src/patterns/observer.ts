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

  /*
   * notify is protected so that only Subject and its child classes
   * can trigger notifications.
   *
   * If notify were public, outside code could directly call:
   * store.notify(order)
   *
   * This would allow observers to receive notifications even when
   * no valid state change happened in the Subject.
   */
  protected notify(data: unknown): void {
    this.observers.forEach(o => o.update(data))
  }
}

type Order = {
  id: string
  customerEmail: string
  total: number
}

class OrderStore extends Subject {
  private orders: Order[] = []

  placeOrder(order: Order): void {
    this.orders.push(order)
    this.notify(order)
  }

  cancelOrder(id: string): void {
    const index = this.orders.findIndex(order => order.id === id)

    if (index === -1) {
      return
    }

    const [order] = this.orders.splice(index, 1)

    this.notify({
      cancelled: true,
      order
    })
  }

  getOrders(): Order[] {
    return [...this.orders]
  }
}

class ShipmentQueue implements Observer {
  update(data: unknown): void {
    const event = data as Order

    console.log(
      `[ShipmentQueue] scheduling delivery for ${event.id}`
    )
  }
}

class EmailService implements Observer {
  update(data: unknown): void {
    const event = data as Order

    console.log(
      `[EmailService] sending confirmation to ${event.customerEmail}`
    )
  }
}

class AuditLog implements Observer {
  update(data: unknown): void {
    const event = data as Order

    console.log(
      `[AuditLog] recorded order ${event.id} at ${new Date().toISOString()}`
    )
  }
}

class AnalyticsService implements Observer {
  update(data: unknown): void {
    const event = data as Order

    console.log(
      `[AnalyticsService] tracking purchase event for order ${event.id}, value: ${event.total}`
    )
  }
}


// -----------------------------
// Task 1.2 — Wire Observers
// -----------------------------

const store = new OrderStore()

const shipment = new ShipmentQueue()
const email = new EmailService()
const audit = new AuditLog()

store.subscribe(shipment)
store.subscribe(email)
store.subscribe(audit)

store.placeOrder({
  id: 'ORD-001',
  customerEmail: 'alice@example.com',
  total: 1500
})

store.placeOrder({
  id: 'ORD-002',
  customerEmail: 'bob@example.com',
  total: 800
})

/*
 * Adding AuditLog required 0 changes to OrderStore itself.
 * We only create the observer and subscribe it.
 *
 * This shows that Observer allows new requirements to be added
 * without modifying the existing Subject logic.
 */


// -----------------------------
// Task 1.3 — Unsubscribe
// -----------------------------

console.log('\n--- Unsubscribe AuditLog ---')

store.unsubscribe(audit)

store.placeOrder({
  id: 'ORD-003',
  customerEmail: 'carol@example.com',
  total: 200
})

// Expected:
// ShipmentQueue fires
// EmailService fires
// AuditLog does NOT fire

/*
 * Runtime unsubscribe examples:
 *
 * 1. When a user logs out, a user-specific notification observer
 *    can be unsubscribed so it no longer receives events.
 *
 * 2. When analytics tracking is temporarily disabled, the
 *    AnalyticsService observer can be unsubscribed.
 */


// Re-subscribe AuditLog

store.subscribe(audit)

store.placeOrder({
  id: 'ORD-004',
  customerEmail: 'david@example.com',
  total: 1200
})

// Expected:
// ShipmentQueue fires
// EmailService fires
// AuditLog fires


// -----------------------------
// Task 1.4 — Analytics Observer
// -----------------------------

const analytics = new AnalyticsService()

store.subscribe(analytics)

store.placeOrder({
  id: 'ORD-005',
  customerEmail: 'eve@example.com',
  total: 2500
})

/*
 * Observer Trade-off:
 *
 * From placeOrder() alone, we can only see:
 *
 *     this.notify(order)
 *
 * We cannot directly tell that four different services will run.
 *
 * This becomes a problem when the observer chain becomes very long.
 * It can make the execution flow difficult to understand and debug.
 *
 * A slow or failing observer can also affect the overall operation
 * because the observers are executed synchronously.
 *
 * As the number of observers increases, execution time and hidden
 * side effects can also increase.
 */