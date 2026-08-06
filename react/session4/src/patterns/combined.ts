/*
Pattern Recognition Audit

File reviewed: src/services/api.ts

1. Is there any object that is created more than once but should be shared?
   → Possible Singleton? Yes
   Reason: A Logger or API client could be shared across the application.

2. Is there any conditional block (if/else or switch) that creates different
   objects based on a type or string value?
   → Possible Factory? Yes
   Reason: Different report generators can be created using a factory.

3. If a pattern applies: what would the refactored structure look like in one sentence?
   → Use a Singleton for Logger and a Factory to create report generators.

4. If no pattern applies: what is missing that would make the pattern unnecessary complexity here?
   → If there is only one object type and no shared state, these patterns are unnecessary.
*/

/*
Without Singleton, we would have to create a Logger object and pass it into
every report generator through the constructor or method parameters so that
all generators write to the same log.
*/

class Logger {
  private static instance: Logger | null = null;

  private logs: string[] = [];

  private constructor() {}

  public static getInstance(): Logger {
    if (Logger.instance === null) {
      Logger.instance = new Logger();
    }

    return Logger.instance;
  }

  public log(message: string): void {
    const entry = `[${new Date().toISOString()}] ${message}`;
    this.logs.push(entry);
    console.log(entry);
  }

  public getLogs(): string[] {
    return [...this.logs];
  }
}

interface ReportGenerator {
  generate(data: Record<string, unknown>[]): string;
}

class CSVReportGenerator implements ReportGenerator {
  generate(data: Record<string, unknown>[]): string {
    Logger.getInstance().log(
      `CSVReportGenerator: generated report with ${data.length} rows`
    );

    if (data.length === 0) return "";

    const headers = Object.keys(data[0]).join(",");
    const rows = data.map((row) => Object.values(row).join(",")).join("\n");

    return `${headers}\n${rows}`;
  }
}

class JSONReportGenerator implements ReportGenerator {
  generate(data: Record<string, unknown>[]): string {
    Logger.getInstance().log(
      `JSONReportGenerator: generated report with ${data.length} rows`
    );

    return JSON.stringify(data, null, 2);
  }
}

class HTMLReportGenerator implements ReportGenerator {
  generate(data: Record<string, unknown>[]): string {
    Logger.getInstance().log(
      `HTMLReportGenerator: generated report with ${data.length} rows`
    );

    if (data.length === 0) return "<table></table>";

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
      throw new Error(`Unknown report format: ${format}`);
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

console.log("\n===== Logger Output =====");
console.log(Logger.getInstance().getLogs());