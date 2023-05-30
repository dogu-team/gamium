class Logger:
    def __init__(self):
        self._printable = ConsolePrintable()

    def set_handler(self, handler):
        self._printable = handler

    def error(self, message):
        if hasattr(self._printable, "error"):
            self._printable.error(message)

    def warn(self, message):
        if hasattr(self._printable, "warn"):
            self._printable.warn(message)

    def info(self, message):
        if hasattr(self._printable, "info"):
            self._printable.info(message)

    def debug(self, message):
        if hasattr(self._printable, "debug"):
            self._printable.debug(message)

    def verbose(self, message):
        if hasattr(self._printable, "verbose"):
            self._printable.verbose(message)


class ConsolePrintable:
    def __init__(self):
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
