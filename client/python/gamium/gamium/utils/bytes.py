def bytes_to_str_recursive(any):
    if isinstance(any, bytes):
        return any.decode("utf-8")
    if hasattr(any, "__dict__"):
        for key, value in any.__dict__.items():
            any.__dict__[key] = bytes_to_str_recursive(value)
    if isinstance(any, dict):
        for key, value in any.items():
            any[key] = bytes_to_str_recursive(value)
    if isinstance(any, list):
        for i, value in enumerate(any):
            any[i] = bytes_to_str_recursive(value)
    return any
