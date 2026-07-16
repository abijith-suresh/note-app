import { defaultKeymap, history, historyKeymap } from "@codemirror/commands";
import { markdown } from "@codemirror/lang-markdown";
import type { Extension } from "@codemirror/state";
import { EditorView, keymap, placeholder } from "@codemirror/view";
import { GFM } from "@lezer/markdown";
import { renderBlockquotes } from "./decorations/blockquotes";
import { renderCodeBlocks } from "./decorations/code-blocks";
import { renderEmphasis } from "./decorations/emphasis";
import { renderHeadings } from "./decorations/headings";
import { renderHorizontalRules } from "./decorations/hr";
import { renderInlineCode } from "./decorations/inline-code";
import { renderLinks } from "./decorations/links";
import { renderLists } from "./decorations/lists";
import { interleafSyntaxHighlighting } from "./syntax";
import { interleafTheme } from "./theme";
import { insertLink, toggleBold, toggleItalic } from "./utils/commands";

export interface InterleafExtensionOptions {
  onChange: (value: string) => void;
}

/**
 * Assembles all CodeMirror extensions for the interleaf markdown editor.
 * Returns a flat Extension array ready to pass to EditorState.create().
 */
export function createInterleafExtensions(opts: InterleafExtensionOptions): Extension[] {
  return [
    // ── Language & parsing ────────────────────────────────────────────────
    markdown({ extensions: [GFM] }),

    // ── Visual theme & syntax colours ─────────────────────────────────────
    interleafTheme,
    interleafSyntaxHighlighting,

    // ── Editor behaviour ──────────────────────────────────────────────────
    EditorView.lineWrapping,
    EditorView.contentAttributes.of({ spellcheck: "true" }),
    placeholder("Start writing…"),

    // ── History (undo/redo) ───────────────────────────────────────────────
    history(),

    // ── Keybindings ───────────────────────────────────────────────────────
    keymap.of([
      ...defaultKeymap,
      ...historyKeymap,
      { key: "Mod-b", run: toggleBold },
      { key: "Mod-i", run: toggleItalic },
      { key: "Mod-l", run: insertLink },
    ]),

    // ── Bear-style markdown decorations ───────────────────────────────────
    renderHeadings,
    renderEmphasis,
    renderInlineCode,
    renderLinks,
    renderHorizontalRules, // StateField — block-level
    renderBlockquotes,
    renderLists,
    renderCodeBlocks,

    // ── Save callback ─────────────────────────────────────────────────────
    EditorView.updateListener.of((update) => {
      if (update.docChanged) {
        opts.onChange(update.state.doc.toString());
      }
    }),
  ];
}
