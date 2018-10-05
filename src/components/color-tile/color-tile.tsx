import { Component, Prop, State } from '@stencil/core';

@Component({
  tag: 'color-tile',
  styleUrl: 'color-tile.css',
  shadow: true
})
export class colorTile {
  @Prop() tilecolor: string;
  @State() copied: string = '';
  
  copytext: string = 'copied!';

  hexToRgb(hex){
    let r, g, b: number;
    let result: string;

    hex = hex.replace('#','');
    r = parseInt(hex.substring(0,2), 16);
    g = parseInt(hex.substring(2,4), 16);
    b = parseInt(hex.substring(4,6), 16);

    result = 'rgb('+r+','+g+','+b+')';
    return result;
  }

  copyToClipboard(e) {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(e.target);
    selection.removeAllRanges();
    selection.addRange(range);

    document.execCommand('copy');
    selection.removeAllRanges();
    this.copied = e.target.dataset.color;

    setTimeout(() => {
      this.copied = '';
    }, 1200);

  }

  render() {
    return (
      <div class="color" style={{ backgroundColor: this.tilecolor }}>
        <p title="copy to clipboard" data-color="hex" class={this.copied === 'hex' ? 'color__text color__text--copied' : 'color__text'} onClick={e => this.copyToClipboard(e)}>
          {this.copied === 'hex' ? this.copytext : this.tilecolor }
        </p>
        <p title="copy to clipboard" data-color="rgb" class={this.copied === 'rgb' ? 'color__text color__text--copied' : 'color__text'} onClick={e => this.copyToClipboard(e)}>
          {this.copied === 'rgb' ? this.copytext : this.hexToRgb(this.tilecolor) }
        </p>
        <div class="color__content"><slot /></div>
      </div>
    );
  }
}
