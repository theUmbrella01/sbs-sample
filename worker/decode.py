"""Fictional worker for the SBS sample. Never run."""
import brotli


def decode(request_body):
    # Deliberate test issue: Brotli data from a request decompressed with an old decoder (CVE-2026-111497).
    return brotli.decompress(request_body)
