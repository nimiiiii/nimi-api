def try_parse_int(s):
    try:
        parsed = int(s)
        return parsed
    except ValueError:
        return s

def clean_shared_cfg(decoded):
    return decoded.replace("return", "")[[i for i, l in enumerate(decoded) if l == "="][1] + 1:-1].strip()

def clean_game_cfg(decoded):
    return decoded.replace("return", "").strip()