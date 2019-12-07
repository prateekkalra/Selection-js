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
      gmail: true,
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

    const gmailConfig = {
      url: 'https://mail.google.com/mail/?view=cm&fs=1&body=',
      icon: '<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">' +
     '<path fill="#ffffff" stroke="null" id="svg_23" d="m22.146296,3.632703l-20.033333,0c-0.614651,0 -1.112963,0.498269 -1.112963,1.112963l0,14.839492c0,0.614651 0.498269,1.112963 1.112963,1.112963l20.033333,0c0.614651,0 1.112963,-0.498269 1.112963,-1.112963l0,-14.839492c0,-0.614651 -0.498269,-1.112963 -1.112963,-1.112963zm0.370973,15.952501c0,0.204898 -0.166075,0.37097 -0.370973,0.37097l-20.033333,0c-0.204898,0 -0.370973,-0.166072 -0.370973,-0.37097l0,-14.839538c0,-0.204898 0.166075,-0.370973 0.370973,-0.370973l20.033333,0c0.204898,0 0.370973,0.166075 0.370973,0.370973l0,14.839538z"/>'+
     '<path fill="#ffffff" stroke="null" id="svg_24" d="m21.436607,5.11803c-0.098035,-0.008562 -0.195464,0.022174 -0.270804,0.085473l-8.558731,7.189698c-0.276024,0.232027 -0.678907,0.232027 -0.954931,0l-8.558639,-7.189741c-0.101514,-0.08521 -0.240809,-0.109817 -0.365366,-0.064515c-0.124557,0.045299 -0.215506,0.153641 -0.238549,0.284196s0.025302,0.263458 0.126817,0.348668l8.558685,7.18935c0.551615,0.464444 1.357467,0.464444 1.909125,0l8.558642,-7.189305c0.075386,-0.063256 0.122511,-0.15386 0.131077,-0.251896c0.008565,-0.098035 -0.022174,-0.195464 -0.085473,-0.270807c-0.063213,-0.075428 -0.153815,-0.122557 -0.251853,-0.131122z"/>'+
     '<path fill="#ffffff" stroke="null" id="svg_25" d="m8.135309,12.910164c-0.131339,-0.029303 -0.268197,0.01478 -0.357755,0.115208l-5.193841,5.564815c-0.093995,0.096255 -0.128512,0.235896 -0.090168,0.364845c0.038344,0.128988 0.143511,0.227069 0.274807,0.256372c0.131336,0.029303 0.268197,-0.014783 0.357755,-0.115208l5.193841,-5.564815c0.093995,-0.096255 0.128512,-0.235896 0.090168,-0.364845c-0.038347,-0.128948 -0.143469,-0.227069 -0.274807,-0.256372z"/>'+
     '<path fill="#ffffff" stroke="null" id="svg_26" d="m16.481705,13.025373c-0.089516,-0.100429 -0.226416,-0.144511 -0.357755,-0.115208c-0.131339,0.029303 -0.23646,0.127424 -0.274807,0.256372c-0.038344,0.128991 -0.003827,0.26859 0.090168,0.364845l5.193841,5.564815c0.140858,0.144249 0.371105,0.14964 0.518528,0.012084c0.147423,-0.137553 0.158032,-0.367625 0.023866,-0.518135l-5.193841,-5.564772z"/>'+
     '</svg>'
    }
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

    function gmailButton() {
      const url = window.location.href;
      const gmlbtl = new Button(gmailConfig.icon, function() {
        popupwindow(gmailConfig.url + encodeURIComponent(text) + ' ' + url , 'Email', 550, 295);
        return false;
      });

      return gmlbtl;
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
      const myitems=[{feature:'twitter',call:twitterButton()},{feature:'facebook',call:facebookButton()},{feature:'gmail',call:gmailButton()},{feature:'search',call:searchButton()},{feature:'translate',call:translateButton()},
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
      menu.gmail = options.gmail === undefined ? menu.gmail : options.gmail;
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
