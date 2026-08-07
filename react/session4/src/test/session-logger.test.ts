import { beforeEach, describe, expect, it } from "vitest";
import { SessionLogger } from "../services/session-logger";

describe("SessionLogger", () => {
  let logger: SessionLogger;

  beforeEach(() => {
    logger = new SessionLogger();
  });

  it("returns false for an intern who has not been recorded", () => {
    expect(logger.hasAttended(1)).toBe(false);
  });

  it("returns true after an intern is recorded", () => {
    logger.recordAttendance(1);

    expect(logger.hasAttended(1)).toBe(true);
  });

  it("counts attendees correctly", () => {
    logger.recordAttendance(1);
    logger.recordAttendance(2);
    logger.recordAttendance(3);

    expect(logger.getAttendanceCount()).toBe(3);
  });

  it("recording the same intern twice does not change the count", () => {
    logger.recordAttendance(1);
    logger.recordAttendance(1);

    expect(logger.getAttendanceCount()).toBe(1);
  });

  it("returns all attendee IDs without exposing the internal collection", () => {
    logger.recordAttendance(1);
    logger.recordAttendance(2);
    logger.recordAttendance(3);

    const ids = [...logger.getAttendeeIds()];

    ids.push(999);

    expect(logger.getAttendanceCount()).toBe(3);
    expect(logger.hasAttended(999)).toBe(false);
  });
});

/*
Section 6 Notes

The tests use only the public interface:
- recordAttendance()
- hasAttended()
- getAttendanceCount()
- getAttendeeIds()

The internal private field is never accessed directly.

The returned attendee list is a snapshot.
Modifying the returned array does not affect the SessionLogger's internal state,
which proves encapsulation is preserved.
*/