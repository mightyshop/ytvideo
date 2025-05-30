import React, { useState } from 'react';
import { Bold, Italic, Underline, List, ListOrdered, Link, Image, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minHeight?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder = 'Write your content...',
  minHeight = '200px'
}) => {
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [linkText, setLinkText] = useState('');

  const handleBold = () => {
    onChange(`${value}**Bold text**`);
  };

  const handleItalic = () => {
    onChange(`${value}*Italic text*`);
  };

  const handleUnderline = () => {
    onChange(`${value}<u>Underlined text</u>`);
  };

  const handleBulletList = () => {
    onChange(`${value}\n- List item 1\n- List item 2\n- List item 3`);
  };

  const handleNumberedList = () => {
    onChange(`${value}\n1. List item 1\n2. List item 2\n3. List item 3`);
  };

  const handleLink = () => {
    if (linkUrl && linkText) {
      onChange(`${value}[${linkText}](${linkUrl})`);
      setLinkUrl('');
      setLinkText('');
      setShowLinkInput(false);
    }
  };

  const handleImage = () => {
    const imageUrl = prompt('Enter image URL:');
    if (imageUrl) {
      onChange(`${value}![Image](${imageUrl})`);
    }
  };

  const handleAlignLeft = () => {
    onChange(`${value}<div style="text-align: left;">Left aligned text</div>`);
  };

  const handleAlignCenter = () => {
    onChange(`${value}<div style="text-align: center;">Center aligned text</div>`);
  };

  const handleAlignRight = () => {
    onChange(`${value}<div style="text-align: right;">Right aligned text</div>`);
  };

  return (
    <div className="bg-gray-700 rounded-lg border border-gray-600 overflow-hidden">
      <div className="flex flex-wrap items-center gap-1 p-2 bg-gray-800 border-b border-gray-600">
        <button
          type="button"
          onClick={handleBold}
          className="p-2 hover:bg-gray-700 rounded transition-colors"
          title="Bold"
        >
          <Bold className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={handleItalic}
          className="p-2 hover:bg-gray-700 rounded transition-colors"
          title="Italic"
        >
          <Italic className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={handleUnderline}
          className="p-2 hover:bg-gray-700 rounded transition-colors"
          title="Underline"
        >
          <Underline className="w-4 h-4" />
        </button>
        <div className="h-6 border-r border-gray-600 mx-1"></div>
        <button
          type="button"
          onClick={handleBulletList}
          className="p-2 hover:bg-gray-700 rounded transition-colors"
          title="Bullet List"
        >
          <List className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={handleNumberedList}
          className="p-2 hover:bg-gray-700 rounded transition-colors"
          title="Numbered List"
        >
          <ListOrdered className="w-4 h-4" />
        </button>
        <div className="h-6 border-r border-gray-600 mx-1"></div>
        <button
          type="button"
          onClick={() => setShowLinkInput(!showLinkInput)}
          className="p-2 hover:bg-gray-700 rounded transition-colors"
          title="Insert Link"
        >
          <Link className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={handleImage}
          className="p-2 hover:bg-gray-700 rounded transition-colors"
          title="Insert Image"
        >
          <Image className="w-4 h-4" />
        </button>
        <div className="h-6 border-r border-gray-600 mx-1"></div>
        <button
          type="button"
          onClick={handleAlignLeft}
          className="p-2 hover:bg-gray-700 rounded transition-colors"
          title="Align Left"
        >
          <AlignLeft className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={handleAlignCenter}
          className="p-2 hover:bg-gray-700 rounded transition-colors"
          title="Align Center"
        >
          <AlignCenter className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={handleAlignRight}
          className="p-2 hover:bg-gray-700 rounded transition-colors"
          title="Align Right"
        >
          <AlignRight className="w-4 h-4" />
        </button>
      </div>

      {showLinkInput && (
        <div className="p-2 bg-gray-800 border-b border-gray-600 flex flex-wrap gap-2">
          <input
            type="text"
            value={linkText}
            onChange={(e) => setLinkText(e.target.value)}
            placeholder="Link text"
            className="flex-1 min-w-[150px] bg-gray-700 rounded px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <input
            type="url"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            placeholder="URL"
            className="flex-1 min-w-[150px] bg-gray-700 rounded px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <button
            type="button"
            onClick={handleLink}
            className="px-3 py-1 bg-blue-500 hover:bg-blue-600 rounded text-sm transition-colors"
          >
            Insert
          </button>
        </div>
      )}

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-gray-700 p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        placeholder={placeholder}
        style={{ minHeight }}
      />
    </div>
  );
};

export default RichTextEditor;