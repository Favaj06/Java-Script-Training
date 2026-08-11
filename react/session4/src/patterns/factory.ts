/*
The caller only knows about the ReportGenerator interface and the
createReportGenerator() factory. It does not need to know which concrete
class is being created. Without a factory, the caller would need multiple
if/else or switch statements and directly create each report class.
*/

interface ReportGenerator {
  generate(data: Record<string, unknown>[]): string;
}

class CSVReportGenerator implements ReportGenerator {
  generate(data: Record<string, unknown>[]): string {
    if (data.length === 0) return "";

    const headers = Object.keys(data[0]).join(",");

    const rows = data.map((row) => Object.values(row).join(",")).join("\n");

    return `${headers}\n${rows}`;
  }
}

class JSONReportGenerator implements ReportGenerator {
  generate(data: Record<string, unknown>[]): string {
    return JSON.stringify(data, null, 2);
  }
}

class HTMLReportGenerator implements ReportGenerator {
  generate(data: Record<string, unknown>[]): string {
    if (data.length === 0) {
      return "<table></table>";
    }

    const headers =
      "<tr>" +
      Object.keys(data[0])
        .map((key) => `<th>${key}</th>`)
        .join("") +
      "</tr>";

    const rows = data
      .map(
        (row) =>
          "<tr>" +
          Object.values(row)
            .map((value) => `<td>${value}</td>`)
            .join("") +
          "</tr>"
      )
      .join("");

    return `<table>${headers}${rows}</table>`;
  }
}

function createReportGenerator(format: string): ReportGenerator {
  switch (format.toLowerCase()) {
    case "csv":
      return new CSVReportGenerator();

    case "json":
      return new JSONReportGenerator();

    case "html":
      return new HTMLReportGenerator();

    default:
      throw new Error(
        `createReportGenerator: unknown format '${format}', expected one of: csv, json, html`
      );
  }
}

const data = [
  { name: "Alice", score: 91, department: "Backend" },
  { name: "Bob", score: 84, department: "Frontend" },
];

const csv = createReportGenerator("csv");
const json = createReportGenerator("json");
const html = createReportGenerator("html");

console.log(csv.generate(data));
console.log(json.generate(data));
console.log(html.generate(data));

/*
The send() call is identical because every notifier implements the same
Notifier interface. Without the interface, the loop would need to know
about each concrete notifier class and call them separately.
*/

interface Notifier {
  send(recipient: string, message: string): void;
}

class EmailNotifier implements Notifier {
  send(recipient: string, message: string): void {
    console.log(`[Email] To: ${recipient} ΓÇö ${message}`);
  }
}

class SMSNotifier implements Notifier {
  send(recipient: string, message: string): void {
    console.log(`[SMS] To: ${recipient} ΓÇö ${message}`);
  }
}

class PushNotifier implements Notifier {
  send(recipient: string, message: string): void {
    console.log(`[Push] To: ${recipient} ΓÇö ${message}`);
  }
}

class SlackNotifier implements Notifier {
  send(recipient: string, message: string): void {
    console.log(`[Slack] To: ${recipient} ΓÇö ${message}`);
  }
}

function createNotifier(channel: string): Notifier {
  switch (channel.toLowerCase()) {
    case "email":
      return new EmailNotifier();

    case "sms":
      return new SMSNotifier();

    case "push":
      return new PushNotifier();

    case "slack":
      return new SlackNotifier();

    default:
      throw new Error(`Unknown notification channel: ${channel}`);
  }
}

const channels = ["email", "sms", "push", "slack"];

for (const channel of channels) {
  const notifier = createNotifier(channel);
  notifier.send("user@example.com", "Your order has been confirmed.");
}

/*
Only one existing line (the factory switch) and the channels array were
updated to support Slack. This shows the Factory pattern is easy to extend
with minimal changes to existing code.
*/
