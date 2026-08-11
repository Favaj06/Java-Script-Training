/*
If the constructor is not private, anyone can create multiple Logger objects
using `new Logger()`. This breaks the Singleton pattern because multiple
Logger instances would exist. We can detect the problem by checking that
Logger.getInstance() !== new Logger().
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

  // Used only for testing
  public clearLogs(): void {
    this.logs = [];
  }
}

const a = Logger.getInstance();
const b = Logger.getInstance();

a.log("system started");
b.log("request received");

console.log(a === b);
console.log(a.getLogs().length);

/*
Returning an empty string for a missing key is a silent failure because
the error is hidden. Throwing an error is safer because it follows the
Fail Fast principle and immediately alerts the developer.
*/

class ConfigManager {
  private static instance: ConfigManager | null = null;

  private config: Record<string, string> = {};

  private constructor() {
    this.config["env"] = "development";
    this.config["port"] = "3000";
    this.config["database"] = "mysql";
  }

  public static getInstance(): ConfigManager {
    if (ConfigManager.instance === null) {
      ConfigManager.instance = new ConfigManager();
    }
    return ConfigManager.instance;
  }

  public set(key: string, value: string): void {
    this.config[key] = value;
  }

  public get(key: string): string {
    if (!(key in this.config)) {
      throw new Error(`Missing configuration: ${key}`);
    }
    return this.config[key];
  }
}

const config = ConfigManager.getInstance();
config.set("apiUrl", "http://localhost:3001");

const sameConfig = ConfigManager.getInstance();

console.log(sameConfig.get("apiUrl"));
console.log(config === sameConfig);

/*
The second test gets the wrong result because Logger is a Singleton and
both tests share the same Logger instance. The logs created in the first
test remain for the second test, breaking test isolation. In a real test
suite, add a clearLogs() or reset() method and call it before each test.
*/

function testLoggerStartsEmpty() {
  const logger = Logger.getInstance();
  logger.log("left over from a previous operation");

  const fresh = Logger.getInstance();
  console.log("Logs should be empty:", fresh.getLogs());
}

function testLoggerCountsCorrectly() {
  const logger = Logger.getInstance();
  logger.log("entry one");

  console.log("Expected 1 log, got:", logger.getLogs().length);
}

testLoggerStartsEmpty();
testLoggerCountsCorrectly();
