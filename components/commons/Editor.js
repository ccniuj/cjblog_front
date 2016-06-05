import { Editor, EditorState, Entity, RichUtils, AtomicBlockUtils } from 'draft-js'
import { stateToHTML } from 'draft-js-export-html'
import Dropzone from 'react-dropzone'
import hljs from 'highlight.js'
import config from 'Config'

export default class EditorBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty()
    };
    this.focus = () => this.refs.editor.focus();
    this.onChange = (editorState) => this.setState({editorState});
    this.logState = () => console.log(this.state.editorState.toJS());
    this.handleKeyCommand = (command) => this._handleKeyCommand(command);
    this.toggleBlockType = (type) => this._toggleBlockType(type);
    this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);
    this.handleDrop = (files) => this._handleDrop(files);
    this.debug = () => this._debug(this._exportContentToHtml());
    this.submit = () => this._submit();

    this.addMedia = () => this._addMedia();
    this.addAudio = () => this._addAudio();
    this.addImage = () => this._addImage();
    this.addVideo = () => this._addVideo();
  }
  _handleKeyCommand(command) {
    const {editorState} = this.state;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }
  _toggleBlockType(blockType) {
    this.onChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        blockType
      )
    );
  }
  _toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(
        this.state.editorState,
        inlineStyle
      )
    );
  }
  _addMedia(type) {
    const src = window.prompt('Enter a URL');
    if (!src) {
      return;
    }
    const entityKey = Entity.create(type, 'IMMUTABLE', {src});
    return AtomicBlockUtils.insertAtomicBlock(
      this.state.editorState,
      entityKey,
      ' '
    );
  }
  _addAudio() {
    this.onChange(this._addMedia('audio'));
  }
  _addImage() {
    this.onChange(this._addMedia('image'));
  }
  _addVideo() {
    this.onChange(this._addMedia('video'));
  }
  _exportContentToHtml() {
    var html = stateToHTML(this.state.editorState.getCurrentContent())
    html = html.split(';').map(function(str){
              return str.replace('&lt', '<').replace('&gt','>') 
            }).join('')
    return html;
  }
  _handleDrop(files) {
    var data = new FormData();
    $.each(files, function(key, value) {
      data.append(key, value);
    });
    $.ajax({
      url: config.domain + '/dashboard/upload.json',
      dataType: 'json',
      data: data,
      type: 'POST',
      processData: false,
      contentType: false,
      xhrFields: { withCredentials: true }
    }).
    done(function(data) {
      console.log(data)
      $(this.refs.url).html(data.url);
    }.bind(this)).
    fail(function(xhr) {
      console.log(xhr)
    }.bind(this))
  }
  _debug(html) {
    $(this.refs.debug).html(html)
    hljs.configure({
      languages: ['ruby']
    })
    $('pre code').each(function(i, block) {
      hljs.highlightBlock(block);
    });
  }
  _submit() {
    console.log(this._exportContentToHtml());
    this.props.onSubmit(this._exportContentToHtml());
  }
  render() {
    const {editorState} = this.state;
    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    let className = 'RichEditor-editor';
    var contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        className += ' RichEditor-hidePlaceholder';
      }
    }
    return (
      <div className="RichEditor-root">
        <Dropzone onDrop={this.handleDrop} style={{}}>
          <input type='submit' value='上傳圖片' />
        </Dropzone>
        <div className='upload-url' ref='url' />
        <BlockStyleControls
          editorState={editorState}
          onToggle={this.toggleBlockType}
        />
        <InlineStyleControls
          editorState={editorState}
          onToggle={this.toggleInlineStyle}
        />
        <button onMouseDown={this.addImage} style={{display: 'none'}}>
          Add Image
        </button>
        <div className={className} onClick={this.focus}>
          <Editor
            blockStyleFn={getBlockStyle}
            blockRendererFn={mediaBlockRenderer}
            customStyleMap={styleMap}
            editorState={editorState}
            handleKeyCommand={this.handleKeyCommand}
            onChange={this.onChange}
            ref="editor"
            spellCheck={true}
          />
        </div>
        <input
          onClick={this.debug}
          type="button"
          value="debug"
        />
        <input
          onClick={this.submit}
          type="button"
          value="submit"
        />
        <div ref='debug'></div>
      </div>
    );
  }
}
// Custom overrides for "code" style.
const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
};
function getBlockStyle(block) {
  switch (block.getType()) {
    case 'blockquote': return 'RichEditor-blockquote';
    default: return null;
  }
}
function mediaBlockRenderer(block) {
  if (block.getType() === 'atomic') {
    return {
      component: Media,
      editable: false,
    };
  }
  return null;
}
const Audio = (props) => {
  return <audio controls src={props.src} style={styles.media} />;
};
const Image = (props) => {
  return <img src={props.src} style={styles.media} />;
};
const Video = (props) => {
  return <video controls src={props.src} style={styles.media} />;
};
const Media = (props) => {
  const entity = Entity.get(props.block.getEntityAt(0));
  const {src} = entity.getData();
  const type = entity.getType();
  let media;
  if (type === 'audio') {
    media = <Audio src={src} />;
  } else if (type === 'image') {
    media = <Image src={src} />;
  } else if (type === 'video') {
    media = <Video src={src} />;
  }
  return media;
};
class StyleButton extends React.Component {
  constructor() {
    super();
    this.onToggle = (e) => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }
  render() {
    let className = 'RichEditor-styleButton';
    if (this.props.active) {
      className += ' RichEditor-activeButton';
    }
    return (
      <span className={className} onMouseDown={this.onToggle}>
        {this.props.label}
      </span>
    );
  }
}
const BLOCK_TYPES = [
  {label: 'H1', style: 'header-one'},
  {label: 'H2', style: 'header-two'},
  {label: 'H3', style: 'header-three'},
  {label: 'H4', style: 'header-four'},
  {label: 'H5', style: 'header-five'},
  {label: 'H6', style: 'header-six'},
  {label: 'Blockquote', style: 'blockquote'},
  {label: 'UL', style: 'unordered-list-item'},
  {label: 'OL', style: 'ordered-list-item'},
  {label: 'Code Block', style: 'code-block'},
];
const styles = {
  root: {
    fontFamily: '\'Georgia\', serif',
    padding: 20,
    width: 600,
  },
  buttons: {
    marginBottom: 10,
  },
  editor: {
    border: '1px solid #ccc',
    cursor: 'text',
    minHeight: 80,
    padding: 10,
  },
  button: {
    marginTop: 10,
    textAlign: 'center',
  },
  media: {
    width: '100%',
  },
};
const BlockStyleControls = (props) => {
  const {editorState} = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();
  return (
    <div className="RichEditor-controls">
      {BLOCK_TYPES.map((type) =>
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </div>
  );
};
var INLINE_STYLES = [
  {label: 'Bold', style: 'BOLD'},
  {label: 'Italic', style: 'ITALIC'},
  {label: 'Underline', style: 'UNDERLINE'},
  {label: 'Monospace', style: 'CODE'},
];
const InlineStyleControls = (props) => {
  var currentStyle = props.editorState.getCurrentInlineStyle();
  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map(type =>
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </div>
  );
};