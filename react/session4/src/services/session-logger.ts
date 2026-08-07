// Section 5 — Design the Public Interface First
interface ISessionLogger {
  recordAttendance(internId: number): void;
  hasAttended(internId: number): boolean;
  getAttendanceCount(): number;
  getAttendeeIds(): readonly number[];
}

class SessionLogger implements ISessionLogger {
  #attendees: Set<number> = new Set();

  recordAttendance(internId: number): void {
    this.#attendees.add(internId);
  }

  hasAttended(internId: number): boolean {
    return this.#attendees.has(internId);
  }

  getAttendanceCount(): number {
    return this.#attendees.size;
  }

  getAttendeeIds(): readonly number[] {
    return [...this.#attendees];
  }
}

export type { ISessionLogger };
export { SessionLogger };

/*
Section 5 Answers

1. Yes. The internal storage can be changed from Set<number> to
   Map<number, Date> without changing the public interface.
   Callers continue using the same public methods, so encapsulation
   is maintained.

2. If the raw Set were exposed, callers could directly call methods
   such as add(), delete(), and clear(), bypassing the SessionLogger
   interface and modifying the internal state.
*/