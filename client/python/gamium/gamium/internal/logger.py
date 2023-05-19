class Logger:
    def __init__(self, some_duck: any):
        self.some_duck = some_duck
        pass

    def error(self, message):
        if self.some_duck.hasattr("error"):
            self.some_duck.error(message)

    def warn(self, message):
        if self.some_duck.hasattr("warn"):
            self.some_duck.warn(message)

    def info(self, message):
        if self.some_duck.hasattr("info"):
            self.some_duck.info(message)

    def debug(self, message):
        if self.some_duck.hasattr("debug"):
            self.some_duck.debug(message)

    def verbose(self, message):
        if self.some_duck.hasattr("verbose"):
            self.some_duck.verbose(message)


class DefaultLogger(Logger):
    def __init__(self):
        super().__init__(self)
        pass

    def error(self, message):
        print(f"ERROR: {message}")

    def warn(self, message):
        print(f"WARN: {message}")

    def info(self, message):
        print(f"INFO: {message}")

    def debug(self, message):
        print(f"DEBUG: {message}")

    def verbose(self, message):
        print(f"VERBOSE: {message}")
