#!/usr/bin/env bash

set -euo pipefail

usage() {
  cat <<'EOF'
Usage: ./compare.sh same|diff [path]

Modes:
  same  List relative paths that exist in both repos and are the same after
        normalizing BOM/CRLF/trailing whitespace/blank lines/EOF noise.
  diff  Print the full list of normalized-different files, prompt for a
        folder/file substring filter, then show git-style colored diffs for
        matching files.

Notes:
  - Only files visible to `git ls-files -co --exclude-standard` are compared.
  - Files that exist in only one repo are ignored.
  - Optional [path] limits comparison to that relative file or folder.
  - The default comparison target is ../../repos/barebone-next relative to
    this script. Override with BAREBONE_NEXT_DIR if needed.
EOF
}

if [[ $# -lt 1 || $# -gt 2 ]]; then
  usage >&2
  exit 1
fi

MODE="$1"
SCOPE_PATH="${2:-}"
if [[ "$MODE" != "same" && "$MODE" != "diff" ]]; then
  usage >&2
  exit 1
fi

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
LEFT_REPO="$SCRIPT_DIR"
RIGHT_REPO="${BAREBONE_NEXT_DIR:-"$SCRIPT_DIR/../../repos/barebone-next"}"

if [[ ! -d "$RIGHT_REPO" ]]; then
  echo "Target repo not found: $RIGHT_REPO" >&2
  exit 1
fi

IGNORE_FILES=(
  "package-lock.json"
)

should_ignore() {
  local rel="$1"
  local ignored
  for ignored in "${IGNORE_FILES[@]}"; do
    if [[ "$rel" == "$ignored" ]]; then
      return 0
    fi
  done
  return 1
}

matches_scope() {
  local rel="$1"

  if [[ -z "$SCOPE_PATH" ]]; then
    return 0
  fi

  [[ "$rel" == "$SCOPE_PATH" || "$rel" == "$SCOPE_PATH/"* ]]
}

list_repo_files() {
  local repo="$1"
  git -C "$repo" ls-files -co --exclude-standard | LC_ALL=C sort -u
}

normalize_file() {
  local file="$1"
  perl -ne '
    BEGIN {
      binmode STDIN;
      binmode STDOUT;
    }
    if ($. == 1) {
      s/^\x{FEFF}//;
    }
    s/\r$//;
    s/[ \t]+$//;
    next if /^\s*$/;
    print;
  ' "$file"
}

normalized_same() {
  local left="$1"
  local right="$2"
  cmp -s <(normalize_file "$left") <(normalize_file "$right")
}

emit_normalized_diff() {
  local rel="$1"
  local left="$2"
  local right="$3"
  local tmp_root="$4"
  local left_tmp="$tmp_root/barebone-next/$rel"
  local right_tmp="$tmp_root/airdev-next-js/$rel"

  mkdir -p "$(dirname "$left_tmp")" "$(dirname "$right_tmp")"
  normalize_file "$right" > "$left_tmp"
  normalize_file "$left" > "$right_tmp"

  git diff --no-index --color=always \
    --src-prefix="a/" \
    --dst-prefix="b/" \
    -- "$left_tmp" "$right_tmp" || true
}

view_diff() {
  local rel="$1"
  local left="$2"
  local right="$3"
  local tmp_root="$4"

  if command -v less >/dev/null 2>&1; then
    emit_normalized_diff "$rel" "$left" "$right" "$tmp_root" | less -R
  else
    emit_normalized_diff "$rel" "$left" "$right" "$tmp_root"
  fi
}

TMP_ROOT=""
cleanup() {
  if [[ -n "$TMP_ROOT" && -d "$TMP_ROOT" ]]; then
    rm -rf "$TMP_ROOT"
  fi
}
trap cleanup EXIT

if [[ "$MODE" == "diff" ]]; then
  TMP_ROOT="$(mktemp -d)"
fi

COMMON_FILES=()
while IFS= read -r rel; do
  [[ -z "$rel" ]] && continue
  if should_ignore "$rel"; then
    continue
  fi
  if ! matches_scope "$rel"; then
    continue
  fi
  COMMON_FILES+=("$rel")
done < <(
  LC_ALL=C comm -12 \
    <(list_repo_files "$LEFT_REPO") \
    <(list_repo_files "$RIGHT_REPO")
)

SAME_FILES=()
DIFF_FILES=()

for rel in "${COMMON_FILES[@]}"; do
  left_file="$LEFT_REPO/$rel"
  right_file="$RIGHT_REPO/$rel"

  if normalized_same "$left_file" "$right_file"; then
    SAME_FILES+=("$rel")
  else
    DIFF_FILES+=("$rel")
  fi
done

if [[ "$MODE" == "same" ]]; then
  printf '%s\n' "${SAME_FILES[@]}"
  exit 0
fi

if [[ -n "$SCOPE_PATH" ]]; then
  printf 'Diff scope: %s\n' "$SCOPE_PATH"
fi
printf 'Different files (%d):\n' "${#DIFF_FILES[@]}"
printf '%s\n' "${DIFF_FILES[@]}"

if [[ ${#DIFF_FILES[@]} -eq 0 ]]; then
  exit 0
fi

printf '\n'
read -r -p "Filter by folder/file substring (blank for all): " FILTER

MATCHED=0
FIRST_MATCH=1
for rel in "${DIFF_FILES[@]}"; do
  if [[ -n "$FILTER" && "$rel" != *"$FILTER"* ]]; then
    continue
  fi
  MATCHED=1

  if [[ "$FIRST_MATCH" -eq 0 ]]; then
    while true; do
      read -r -p "View diff for next file ($rel)? (y=show / n=skip / q=quit): " CONTINUE
      case "$CONTINUE" in
        [Yy])
          break
          ;;
        [Nn])
          continue 2
          ;;
        [Qq])
          exit 0
          ;;
      esac
    done
  fi

  view_diff "$rel" "$LEFT_REPO/$rel" "$RIGHT_REPO/$rel" "$TMP_ROOT"
  FIRST_MATCH=0
done

if [[ "$MATCHED" -eq 0 ]]; then
  echo "No diff files matched filter: $FILTER"
fi
