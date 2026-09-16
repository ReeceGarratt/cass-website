---
summary: Symlink and text-encoding gotchas on the Windows dev machine.
updated: 2026-09-16
related: [agent-tooling.md]
decisions: [D-006]
---

# Windows dev environment

The main dev machine runs Windows 11. Claude Code there has both PowerShell 5.1 and Git Bash.

## Symlinks (`CLAUDE.md` → `AGENTS.md`)

**Requirements:**
- **Windows Developer Mode** must be on (Settings → System → For developers). It lets non-admin users create symlinks.
- **Git config** `core.symlinks=true`. It's already set in this repo's local config, but a fresh clone needs it set again, before checkout if possible.

**Gotcha: PowerShell 5.1 `New-Item` fails even with Developer Mode on.**
`New-Item -ItemType SymbolicLink` throws *"Administrator privilege required for this operation"*. Windows PowerShell 5.1 doesn't ask for unprivileged symlink creation. Use `mklink`, which does:

```bash
# from Git Bash (the doubled slash stops path conversion)
cmd //c "mklink CLAUDE.md AGENTS.md"
```

```powershell
# from PowerShell
cmd /c mklink CLAUDE.md AGENTS.md
```

**Verify:**
- `ls -la CLAUDE.md` should show `CLAUDE.md -> AGENTS.md`.
- `git ls-files -s CLAUDE.md` should show mode `120000` once the file is tracked.

**Keeping the link intact:**
- Always edit `AGENTS.md`, never `CLAUDE.md`. Editors and tools that save by writing a temp file and renaming it can replace the symlink with a regular file.
- After bulk edits, re-check with `ls -la CLAUDE.md`.
- A Windows clone without symlink support gets a plain `CLAUDE.md` that just contains the text `AGENTS.md`, so Claude doesn't get the real instructions.

## Text encoding

- The first `README.md` in this repo was UTF-16, probably written by PowerShell 5.1 output redirection. It was rewritten as UTF-8.
- Keep all text files **UTF-8**. In PowerShell 5.1, pass `-Encoding utf8` to `Out-File` or `Set-Content`, or write files with Git Bash or an editor instead.
- To check a file's encoding, run `file <path>` in Git Bash. It should report `ASCII text` or `UTF-8 Unicode text`.

## Shell notes

- Long heredocs with many quotes have failed to parse through Claude Code's Bash tool on this machine ("unexpected EOF while looking for matching `'`"). For multi-line docs, the Write tool is more reliable.
