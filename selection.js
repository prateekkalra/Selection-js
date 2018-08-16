const Selection = (function() {
  function copyTextToClipboard(text) {
    let textArea = document.createElement('textarea');
    textArea.style.position = 'fixed';
    textArea.style.top = 0;
    textArea.style.left = 0;
    textArea.style.width = '2em';
    textArea.style.height = '2em';
    textArea.style.padding = 0;
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';
    textArea.style.background = 'transparent';
    textArea.value = text;

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      let successful = document.execCommand('copy');
      let msg = successful ? 'successful' : 'unsuccessful';
      console.log('Copying text command was ' + msg);
    } catch (err) {
      console.log('Oops, unable to copy');
    }

    document.body.removeChild(textArea);
  }

  function popupwindow(url, title, w, h) {
    let left = screen.width / 2 - w / 2;
    let top = screen.height / 2 - h / 2;
    return window.open(
      url,
      title,
      'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' +
        w +
        ', height=' +
        h +
        ', top=' +
        top +
        ', left=' +
        left
    );
  }

  function getBrowserLanguage(){ 
    let language = navigator.language || navigator.userLanguage || function (){ 
      const languages = navigator.languages; 
      if (navigator.languages.length > 0){ 
        return navigator.languages[0]; 
      } 
    }() || 'en'; 
    return language.split('-')[0]; 
  } 

  function _selection() {
    const menu = {
      twitter: true,
      facebook: true,
      search: true,
      copy: true,
      speak: true,
      translate: true,
      disable: false
    };
    const twitterConfig = {
      url: 'https://twitter.com/intent/tweet?text=',
      icon:
        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="selection__icon"><path d="M8.2,20.2c6.5,0,11.7-5.2,11.8-11.6c0-0.1,0-0.1,0-0.2c0-0.2,0-0.4,0-0.5c0.8-0.6,1.5-1.3,2.1-2.2c-0.8,0.3-1.6,0.6-2.4,0.7c0.9-0.5,1.5-1.3,1.8-2.3c-0.8,0.5-1.7,0.8-2.6,1c-1.6-1.7-4.2-1.7-5.9-0.1c-1.1,1-1.5,2.5-1.2,3.9C8.5,8.7,5.4,7.1,3.3,4.6c-1.1,1.9-0.6,4.3,1.3,5.5c-0.7,0-1.3-0.2-1.9-0.5l0,0c0,2,1.4,3.7,3.3,4.1c-0.6,0.2-1.2,0.2-1.9,0.1c0.5,1.7,2.1,2.8,3.9,2.9c-1.7,1.4-3.9,2-6.1,1.7C3.8,19.5,6,20.2,8.2,20.2"/></svg>'
    };
    const facebookConfig = {
      url: 'https://www.facebook.com/sharer/sharer.php?quote=',
      icon:
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" enable-background="new 0 0 24 24" width="24" height="24" class="selection__icon"><path d="M20,2H4C2.9,2,2,2.9,2,4v16c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V4C22,2.9,21.1,2,20,2z M18.4,7.4H17c-0.9,0-1,0.3-1,1l0,1.3 h2.1L18,12h-1.9v7h-3.2v-7h-1.2V9.6h1.2V8.1c0-2,0.8-3.1,3.1-3.1h2.4V7.4z"/></svg>'
    };
    const searchConfig = {
      url: 'https://www.google.co.in/search?q=',
      icon:
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" enable-background="new 0 0 24 24" width="24" height="24" class="selection__icon"><path d="M23.111 20.058l-4.977-4.977c.965-1.52 1.523-3.322 1.523-5.251 0-5.42-4.409-9.83-9.829-9.83-5.42 0-9.828 4.41-9.828 9.83s4.408 9.83 9.829 9.83c1.834 0 3.552-.505 5.022-1.383l5.021 5.021c2.144 2.141 5.384-1.096 3.239-3.24zm-20.064-10.228c0-3.739 3.043-6.782 6.782-6.782s6.782 3.042 6.782 6.782-3.043 6.782-6.782 6.782-6.782-3.043-6.782-6.782zm2.01-1.764c1.984-4.599 8.664-4.066 9.922.749-2.534-2.974-6.993-3.294-9.922-.749z"/></svg>'
    };
    const copyConfig = {
      icon:
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" enable-background="new 0 0 24 24" width="24" height="24" class="selection__icon"><path d="M18 6v-6h-18v18h6v6h18v-18h-6zm-12 10h-4v-14h14v4h-10v10zm16 6h-14v-14h14v14z"/></svg>'
    };
    const speakConfig = {
      icon:
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" enable-background="new 0 0 24 24" width="24" height="24" class="selection__icon"><path d="M16 11c0 2.209-1.791 4-4 4s-4-1.791-4-4v-7c0-2.209 1.791-4 4-4s4 1.791 4 4v7zm4-2v2c0 4.418-3.582 8-8 8s-8-3.582-8-8v-2h2v2c0 3.309 2.691 6 6 6s6-2.691 6-6v-2h2zm-7 13v-2h-2v2h-4v2h10v-2h-4z"/></svg>'
    };
    const translateConfig = {
      url:'https://translate.google.com/#auto/',
      icon:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" enable-background="new 0 0 24 24" width="24" height="24" class="selection__icon">'+
        '<path id="svg_3" d="m17,20l-14.5,0c-1.378,0 -2.5,-1.122 -2.5,-2.5l0,-15c0,-1.378 1.122,-2.5 2.5,-2.5l8,0c0.214,0 0.404,0.136 0.473,0.338l6.5,19c0.052,0.152 0.027,0.321 -0.066,0.452c-0.094,0.132 -0.245,0.21 -0.407,0.21zm-14.5,-19c-0.827,0 -1.5,0.673 -1.5,1.5l0,15c0,0.827 0.673,1.5 1.5,1.5l13.8,0l-6.157,-18l-7.643,0z"/>'+
        '<path id="svg_5" d="m21.5,24l-8,0c-0.208,0 -0.395,-0.129 -0.468,-0.324l-1.5,-4c-0.097,-0.259 0.034,-0.547 0.292,-0.644c0.259,-0.096 0.547,0.034 0.644,0.292l1.379,3.676l7.653,0c0.827,0 1.5,-0.673 1.5,-1.5l0,-15c0,-0.827 -0.673,-1.5 -1.5,-1.5l-9.5,0c-0.276,0 -0.5,-0.224 -0.5,-0.5s0.224,-0.5 0.5,-0.5l9.5,0c1.378,0 2.5,1.122 2.5,2.5l0,15c0,1.378 -1.122,2.5 -2.5,2.5z"/>'+
        '<path id="svg_7" d="m13.5,24c-0.117,0 -0.234,-0.041 -0.329,-0.124c-0.208,-0.182 -0.229,-0.498 -0.047,-0.706l3.5,-4c0.182,-0.209 0.498,-0.229 0.706,-0.047c0.208,0.182 0.229,0.498 0.047,0.706l-3.5,4c-0.1,0.113 -0.238,0.171 -0.377,0.171z"/>'+
        '<path id="svg_9" d="m9.5,14c-0.206,0 -0.398,-0.127 -0.471,-0.332l-2.029,-5.681l-2.029,5.681c-0.093,0.26 -0.38,0.396 -0.639,0.303c-0.26,-0.093 -0.396,-0.379 -0.303,-0.639l2.5,-7c0.142,-0.398 0.8,-0.398 0.941,0l2.5,7c0.093,0.26 -0.042,0.546 -0.303,0.639c-0.054,0.02 -0.111,0.029 -0.167,0.029z"/>'+
        '<path id="svg_11" d="m8,11l-2,0c-0.276,0 -0.5,-0.224 -0.5,-0.5s0.224,-0.5 0.5,-0.5l2,0c0.276,0 0.5,0.224 0.5,0.5s-0.224,0.5 -0.5,0.5z"/>'+
        '<path id="svg_13" d="m21.5,11l-7,0c-0.276,0 -0.5,-0.224 -0.5,-0.5s0.224,-0.5 0.5,-0.5l7,0c0.276,0 0.5,0.224 0.5,0.5s-0.224,0.5 -0.5,0.5z"/>'+
        '<path id="svg_15" d="m17.5,11c-0.276,0 -0.5,-0.224 -0.5,-0.5l0,-1c0,-0.276 0.224,-0.5 0.5,-0.5s0.5,0.224 0.5,0.5l0,1c0,0.276 -0.224,0.5 -0.5,0.5z"/>'+
        '<path id="svg_17" d="m16,17c-0.157,0 -0.311,-0.073 -0.408,-0.21c-0.16,-0.225 -0.107,-0.537 0.118,-0.697c2.189,-1.555 3.79,-4.727 3.79,-5.592c0,-0.276 0.224,-0.5 0.5,-0.5s0.5,0.224 0.5,0.5c0,1.318 -1.927,4.785 -4.21,6.408c-0.088,0.061 -0.189,0.091 -0.29,0.091z"/>'+
        '<path id="svg_19" d="m20,18c-0.121,0 -0.242,-0.043 -0.337,-0.131c-0.363,-0.332 -3.558,-3.283 -4.126,-4.681c-0.104,-0.256 0.02,-0.547 0.275,-0.651c0.253,-0.103 0.547,0.019 0.651,0.275c0.409,1.007 2.936,3.459 3.875,4.319c0.204,0.187 0.217,0.502 0.031,0.707c-0.099,0.107 -0.234,0.162 -0.369,0.162z"/>'+
        '</svg>'
    };

    let selection = '';
    let text = '';
    let bgcolor = 'crimson';
    let iconcolor = '#fff';

    let _icons = {};
    let arrowsize = 5;
    let buttonmargin = 7 * 2;
    let iconsize = 24 + buttonmargin;
    let top = 0;
    let left = 0;

    function facebookButton() {
      const fbbtn = new Button(facebookConfig.icon, function() {
        let sharelink = window.location.href;
        let finalurl = facebookConfig.url;
        if (sharelink.substring(0, 4) !== 'http') {
          sharelink = 'http://www.demourl.com';
        }
        finalurl += text + '&u=' + sharelink;
        popupwindow(finalurl, 'Share', 600, 500);
      });
      return fbbtn;
    }

    function twitterButton() {
      const url = window.location.href;
      const twbtn = new Button(twitterConfig.icon, function() {
        popupwindow(twitterConfig.url + encodeURIComponent(text) + ' ' + url, 'Share', 550, 295);
        return false;
      });

      return twbtn;
    }

    function searchButton() {
      const searchbtn = new Button(searchConfig.icon, function() {
        popupwindow(searchConfig.url + encodeURIComponent(text), 'Search', 900, 540);
        return false;
      });

      return searchbtn;
    }

    function copyButton() {
      const cbtn = new Button(copyConfig.icon, function() {
        copyTextToClipboard(text);
      });
      return cbtn;
    }

    function speakButton() {
      const spbtn = new Button(speakConfig.icon, function() {
        let speech = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(speech);
      });
      return spbtn;
    }

    function translateButton() {
      const tsbtn = new Button(translateConfig.icon, function() {
        popupwindow(translateConfig.url + getBrowserLanguage() + '/' + text, 'Translate', 900, 540);
        return false;
      });
      return tsbtn;
    }

    function IconStyle() {
      const style = document.createElement('style');
      style.innerHTML = `.selection__icon{fill:${iconcolor};}`;
      document.body.appendChild(style);
    }

    function appendIcons() {
      const myitems=[{feature:'twitter',call:twitterButton()},{feature:'facebook',call:facebookButton()},{feature:'search',call:searchButton()},{feature:'translate',call:translateButton()},
      {feature:'copy',call:copyButton()},{feature:'speak',call:speakButton()}]
      const div = document.createElement('div');
      let count = 0;
      myitems.forEach((item)=>{
        if(menu[item.feature]){
          div.appendChild(item.call);
          count++;
        }
      })
      return {
        icons: div,
        length: count
      };
    }

    function setTooltipPosition() {
      const position = selection.getRangeAt(0).getBoundingClientRect();
      const DOCUMENT_SCROLL_TOP =
        window.pageXOffset || document.documentElement.scrollTop || document.body.scrollTop;
      top = position.top + DOCUMENT_SCROLL_TOP - iconsize - arrowsize;
      left = position.left + (position.width - iconsize * _icons.length) / 2;
    }

    function moveTooltip() {
      setTooltipPosition();
      let tooltip = document.querySelector('.selection');
      tooltip.style.top = `${top}px`;
      tooltip.style.left = `${left}px`;
    }

    function drawTooltip() {
      _icons = appendIcons();
      setTooltipPosition();

      const div = document.createElement('div');
      div.className = 'selection';
      div.style =
        'line-height:0;' +
        'position:absolute;' +
        'background-color:' +
        bgcolor +
        ';' +
        'border-radius:20px;' +
        'top:' +
        top +
        'px;' +
        'left:' +
        left +
        'px;' +
        'transition:all .2s ease-in-out;' +
        'box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);' +
        'z-index:99999;';

      div.appendChild(_icons.icons);

      const arrow = document.createElement('div');
      arrow.style =
        'position:absolute;' +
        'border-left:' +
        arrowsize +
        'px solid transparent;' +
        'border-right:' +
        arrowsize +
        'px solid transparent;' +
        'border-top:' +
        arrowsize +
        'px solid ' +
        bgcolor +
        ';' +
        'bottom:-' +
        (arrowsize - 1) +
        'px;' +
        'left:' +
        (iconsize * _icons.length / 2 - arrowsize) +
        'px;' +
        'width:0;' +
        'height:0;';

      if (!menu.disable) {
        div.appendChild(arrow);
      }

      document.body.appendChild(div);
    }

    function attachEvents() {
      function hasSelection() {
        return !!window.getSelection().toString();
      }

      function hasTooltipDrawn() {
        return !!document.querySelector('.selection');
      }

      window.addEventListener(
        'mouseup',
        function() {
          setTimeout(function mouseTimeout() {
            if (hasTooltipDrawn()) {
              if (hasSelection()) {
                selection = window.getSelection();
                text = selection.toString();
                moveTooltip();
                return;
              } else {
                document.querySelector('.selection').remove();
              }
            }
            if (hasSelection()) {
              selection = window.getSelection();
              text = selection.toString();
              drawTooltip();
            }
          }, 10);
        },
        false
      );
    }

    function config(options) {
      menu.twitter = options.twitter === undefined ? menu.twitter : options.twitter;
      menu.facebook = options.facebook === undefined ? menu.facebook : options.facebook;
      menu.search = options.search === undefined ? menu.search : options.search;
      menu.translate = options.translate === undefined ? menu.translate : options.translate;
      menu.copy = options.copy === undefined ? menu.copy : options.copy;
      menu.speak = options.speak === undefined ? menu.speak : options.speak;
      menu.disable = options.disable === undefined ? menu.disable : options.disable;

      bgcolor = options.backgroundColor || '#333';
      iconcolor = options.iconColor || '#fff';
      return this;
    }

    function init() {
      IconStyle();
      attachEvents();
      return this;
    }

    return {
      config: config,
      init: init
    };
  }

  function Button(icon, clickFn) {
    const btn = document.createElement('div');
    btn.style = 'display:inline-block;' + 'margin:7px;' + 'cursor:pointer;' + 'transition:all .2s ease-in-out;';
    btn.innerHTML = icon;
    btn.onclick = clickFn;
    btn.onmouseover = function() {
      this.style.transform = 'scale(1.2)';
    };
    btn.onmouseout = function() {
      this.style.transform = 'scale(1)';
    };
    return btn;
  }

  return _selection;
})();
