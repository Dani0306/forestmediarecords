#!/usr/bin/env python3
"""Read-only health check for an Obsidian vault. Usage: check_vault.py <vault_dir>"""
import re
import sys
from pathlib import Path

ALLOWED_STATUS = {
    "feature": {"planned", "building", "built"},
    "decision": {"proposed", "accepted", "superseded"},
    "index": {"active", "open"},
    "reference": {"active", "open"},
    "roadmap": {"active", "open"},
    "daily": None,  # daily notes carry no status
}
REQUIRED = ("type", "date", "tags")
SKIP_DIRS = {".obsidian", ".trash"}
NOT_NOTES = {"CLAUDE.md"}  # agent rules, not a vault note
NO_FM_CHECK_DIRS = {"Templates"}  # template frontmatter holds tokens
NO_ORPHAN_CHECK = {"Home"}
WIKILINK = re.compile(r"!?\[\[([^\]|#^]*)(?:[#^][^\]|]*)?(?:\|[^\]]*)?\]\]")
CODE_PATH = re.compile(r"`((?:app|components|data|lib|public|hooks|styles)/[^`\s]+)`")


def frontmatter(text):
    if not text.startswith("---\n"):
        return None
    end = text.find("\n---", 4)
    if end == -1:
        return None
    fm, key = {}, None
    for line in text[4:end].splitlines():
        m = re.match(r"^([A-Za-z_][\w-]*):\s*(.*)$", line)
        if m:
            key = m.group(1)
            fm[key] = m.group(2).strip().strip('"')
        elif key and line.strip().startswith("- "):
            fm[key] = (fm[key] + " " if fm[key] else "") + line.strip()[2:]
    return fm


def strip_code(text):
    text = re.sub(r"```.*?```", "", text, flags=re.S)
    return re.sub(r"`[^`\n]*`", "", text)


def main():
    vault = Path(sys.argv[1] if len(sys.argv) > 1 else "docs").resolve()
    repo = vault.parent
    notes, files = {}, set()
    for p in vault.rglob("*"):
        if not p.is_file() or any(part in SKIP_DIRS for part in p.relative_to(vault).parts):
            continue
        files.add(p.name.lower())
        files.add(p.stem.lower())
        if p.suffix == ".md" and str(p.relative_to(vault)) not in NOT_NOTES:
            notes[p] = p.read_text(encoding="utf-8")
    names = {p.stem.lower(): p for p in notes}

    broken, inbound, fm_issues, stale = [], {p: 0 for p in notes}, [], []
    for p, text in notes.items():
        rel = p.relative_to(vault)
        for target in WIKILINK.findall(strip_code(text)):
            t = target.strip()
            if not t:
                continue
            key = Path(t).name.lower()
            if key.endswith(".md"):
                key = key[:-3]
            if key in names:
                if names[key] != p:
                    inbound[names[key]] += 1
            elif key not in files:
                broken.append(f"{rel}: [[{t}]]")

        if rel.parts[0] in NO_FM_CHECK_DIRS:
            continue
        fm = frontmatter(text)
        if fm is None:
            fm_issues.append(f"{rel}: no frontmatter")
            continue
        missing = [k for k in REQUIRED if k not in fm]
        if missing:
            fm_issues.append(f"{rel}: missing {', '.join(missing)}")
        ntype = fm.get("type")
        if ntype and ntype not in ALLOWED_STATUS:
            fm_issues.append(f"{rel}: unknown type '{ntype}'")
        allowed = ALLOWED_STATUS.get(ntype)
        if allowed and fm.get("status") not in allowed:
            fm_issues.append(f"{rel}: status '{fm.get('status')}' not in {sorted(allowed)}")
        if ntype == "feature":
            if "code" not in fm:
                fm_issues.append(f"{rel}: feature missing code:")
            for path in CODE_PATH.findall(text):
                if not (repo / path.rstrip("/.,")).exists() and not re.search(r"[*{}–]", path):
                    stale.append(f"{rel}: `{path}`")

    orphans = [
        str(p.relative_to(vault)) for p, n in inbound.items()
        if n == 0 and p.stem not in NO_ORPHAN_CHECK
        and p.relative_to(vault).parts[0] not in {"Daily", *NO_FM_CHECK_DIRS}
    ]
    inbox = [str(p.relative_to(vault)) for p in notes if p.relative_to(vault).parts[0] == "Inbox"]

    sections = [
        ("Broken links", broken), ("Orphans", orphans), ("Frontmatter", fm_issues),
        ("Stale code paths", stale), ("Inbox", inbox),
    ]
    print(f"Vault: {vault} ({len(notes)} notes)")
    for title, items in sections:
        print(f"\n## {title} ({len(items)})")
        for item in sorted(items):
            print(f"- {item}")
    sys.exit(1 if broken or fm_issues else 0)


if __name__ == "__main__":
    main()
