import { useEffect, useState } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { TextStyle } from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color'
import Highlight from '@tiptap/extension-highlight'
import { Box, IconButton, Divider, Tooltip, Paper } from '@mui/material'
import FormatBoldIcon from '@mui/icons-material/FormatBold'
import FormatItalicIcon from '@mui/icons-material/FormatItalic'
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined'
import FormatStrikethroughIcon from '@mui/icons-material/FormatStrikethrough'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered'
import FormatQuoteIcon from '@mui/icons-material/FormatQuote'
import Underline from '@tiptap/extension-underline'

interface Props {
  content: string
  onChange: (html: string) => void
}

interface ToolbarButtonProps {
  onClick: () => void
  active?: boolean
  title: string
  children: React.ReactNode
}

const ToolbarButton: React.FC<ToolbarButtonProps> = ({ onClick, active, title, children }) => (
  <Tooltip title={title}>
    <IconButton
      size="small"
      onMouseDown={e => e.preventDefault()}
      onClick={onClick}
      sx={{
        backgroundColor: active ? 'primary.main' : 'transparent',
        color: active ? 'white' : 'text.primary',
        borderRadius: 1,
        '&:hover': { backgroundColor: active ? 'primary.dark' : 'action.hover' },
      }}
    >
      {children}
    </IconButton>
  </Tooltip>
)

const RichTextEditor: React.FC<Props> = ({ content, onChange }) => {
  const [, forceUpdate] = useState(0)

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
    ],
    content,
    onUpdate({ editor }) {
      onChange(editor.getHTML())
      forceUpdate(n => n + 1)
    },
    onSelectionUpdate() {
      forceUpdate(n => n + 1)
    },
  })

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content)
    }
  }, [content, editor])

  if (!editor) return null

  return (
    <Paper variant="outlined" sx={{ borderRadius: 2, overflow: 'hidden' }}>
      {/* Toolbar */}
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 0.5,
          padding: 1,
          borderBottom: '1px solid',
          borderColor: 'divider',
          backgroundColor: 'background.default',
        }}
      >
        <ToolbarButton
          title="Heading 1"
          active={editor.isActive('heading', { level: 1 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        >
          <strong style={{ fontSize: 12 }}>H1</strong>
        </ToolbarButton>

        <ToolbarButton
          title="Heading 2"
          active={editor.isActive('heading', { level: 2 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        >
          <strong style={{ fontSize: 12 }}>H2</strong>
        </ToolbarButton>

        <ToolbarButton
          title="Heading 3"
          active={editor.isActive('heading', { level: 3 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        >
          <strong style={{ fontSize: 12 }}>H3</strong>
        </ToolbarButton>

        <Divider orientation="vertical" flexItem />

        <ToolbarButton
          title="Bold"
          active={editor.isActive('bold')}
          onClick={() => {
            editor.commands.toggleBold()
            forceUpdate(n => n + 1)
          }}
        >
          <FormatBoldIcon fontSize="small" />
        </ToolbarButton>

        <ToolbarButton
          title="Italic"
          active={editor.isActive('italic')}
          onClick={() => {
            editor.commands.toggleItalic()
            forceUpdate(n => n + 1)
          }}
        >
          <FormatItalicIcon fontSize="small" />
        </ToolbarButton>

        <ToolbarButton
          title="Underline"
          active={editor.isActive('underline')}
          onClick={() => {
            editor.commands.toggleUnderline()
            forceUpdate(n => n + 1)
          }}
        >
          <FormatUnderlinedIcon fontSize="small" />
        </ToolbarButton>

        <ToolbarButton
          title="Strikethrough"
          active={editor.isActive('strike')}
          onClick={() => {
            editor.commands.toggleStrike()
            forceUpdate(n => n + 1)
          }}
        >
          <FormatStrikethroughIcon fontSize="small" />
        </ToolbarButton>

        <Divider orientation="vertical" flexItem />

        <Tooltip title="Text color">
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <input
              type="color"
              onChange={e => editor.chain().focus().setColor(e.target.value).run()}
              style={{ width: 28, height: 28, border: 'none', cursor: 'pointer', borderRadius: 4 }}
              title="Text color"
            />
          </Box>
        </Tooltip>

        <Tooltip title="Highlight color">
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <input
              type="color"
              defaultValue="#ffff00"
              onChange={e => editor.chain().focus().setHighlight({ color: e.target.value }).run()}
              style={{ width: 28, height: 28, border: 'none', cursor: 'pointer', borderRadius: 4 }}
              title="Highlight"
            />
          </Box>
        </Tooltip>

        <Divider orientation="vertical" flexItem />

        <ToolbarButton
          title="Bullet list"
          active={editor.isActive('bulletList')}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <FormatListBulletedIcon fontSize="small" />
        </ToolbarButton>

        <ToolbarButton
          title="Numbered list"
          active={editor.isActive('orderedList')}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <FormatListNumberedIcon fontSize="small" />
        </ToolbarButton>

        <ToolbarButton
          title="Blockquote"
          active={editor.isActive('blockquote')}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        >
          <FormatQuoteIcon fontSize="small" />
        </ToolbarButton>
      </Box>

      {/* Editor area */}
      <Box
        sx={{
          padding: 2,
          minHeight: 150,
          '& .ProseMirror': { outline: 'none', minHeight: 120 },
          '& .ProseMirror table': { borderCollapse: 'collapse', width: '100%' },
          '& .ProseMirror td, & .ProseMirror th': {
            border: '1px solid',
            borderColor: 'divider',
            padding: '4px 8px',
            minWidth: 60,
          },
          '& .ProseMirror th': { backgroundColor: 'action.hover', fontWeight: 'bold' },
        }}
      >
        <EditorContent editor={editor} />
      </Box>
    </Paper>
  )
}

export default RichTextEditor
