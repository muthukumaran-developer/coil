import json
from collections import Counter


def extract_rows(obj):
    """
    Extract all row-like structures regardless of nesting.
    """
    if isinstance(obj, list):
        return obj

    if isinstance(obj, dict):
        for v in obj.values():
            if isinstance(v, list):
                return v

    return []


def canonical_row(row):
    """
    Convert row to comparable form.
    """
    if not isinstance(row, dict):
        return str(row)

    return tuple(
        (k, str(row[k]))
        for k in sorted(row.keys())
    )


def isLossless(original, decoded):
    """
    True semantic comparison (order-independent).
    """

    o_rows = extract_rows(original)
    d_rows = extract_rows(decoded)

    if not o_rows or not d_rows:
        return False

    o_set = Counter(canonical_row(r) for r in o_rows)
    d_set = Counter(canonical_row(r) for r in d_rows)

    return o_set == d_set
