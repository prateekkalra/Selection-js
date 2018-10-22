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
      definition: true,
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
    const definitionConfig = {
      url: 'https://www.dictionary.com/browse/',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" enable-background="new 0 0 24 24" width="24" height="24" class="selection__icon">' +
      '<path d="m17.048 23.584c-1.3282-0.69249-3.2941-3.0529-3.8125-4.5776l-0.38248-1.1249-1.0265 0.15515c-0.56456 0.0853-2.3284 0.23846-3.9196 0.34027-2.5879 ' +
      '0.16559-2.9068 0.13787-3.0228-0.26275-0.27163-0.93876 0.23912-1.1685 3.0188-1.3577 1.4816-0.10088 3.1149-0.25259 3.6296-0.33712 0.92418-0.15178 0.93425-0.16426 ' +
      '0.80566-0.99808l-0.13022-0.84437-5.3161-1.7121c-5.4071-1.7414-5.9585-2.0476-5.2885-2.9361 0.23222-0.30797 1.0739-0.10838 5.3208 1.2617 2.7747 0.89515 5.1648 ' +
      '1.6276 5.3113 1.6276s0.29538-0.3338 0.33078-0.74178c0.06217-0.71661-0.14434-0.88741-6.0882-5.0353-5.384-3.7572-6.1525-4.3721-6.1525-4.9227 0-0.47506 ' +
      '0.11209-0.62718 0.45763-0.62103 0.25169 4e-3 3.1119 1.8714 6.3559 4.1488 5.1918 3.6447 5.9288 4.0899 6.1525 3.7166 0.13983-0.23323 0.25424-0.51354 ' +
      '0.25424-0.62292 0-0.10939-1.4644-1.813-3.2542-3.7859-1.7898-1.9729-3.2542-3.7173-3.2542-3.8765 0-0.33463 0.41448-0.93686 0.64479-0.93686 0.08616 0 1.2348 ' +
      '1.1856 2.5525 2.6347 4.6046 5.0636 4.1589 4.6741 4.6926 4.1003l0.46625-0.50124-1.3558-2.7006c-1.3654-2.7197-1.5272-3.5332-0.70285-3.5332 0.29566 0 0.78925 ' +
      '0.75136 1.7475 2.6602l1.3355 2.6602 0.85206-0.42366c0.52067-0.25889 1.5264-0.42785 2.5858-0.43442 1.5603-0.01 1.8706 0.0786 3.1017 0.88236 1.2924 0.8438 ' +
      '1.368 0.94431 1.368 1.8203 0 1.0968-0.08986 1.1234-1.0206 0.30256-1.1975-1.0561-2.0732-1.3987-3.5557-1.3911-6.5269 0.0335-8.5281 11.681-2.6647 15.509 1.2073 ' +
      '0.78824 1.454 0.85291 2.9156 0.76438 1.2499-0.0757 1.8309-0.25782 2.6747-0.83848 0.59289-0.40797 1.2129-0.74177 1.3778-0.74177 0.20709 0 0.27992 0.22943 0.23547 ' +
      '0.74177-0.05252 0.60532-0.28885 0.89064-1.2847 1.551-1.6322 1.0823-4.285 1.2521-5.9554 0.38121zm0.4466-4.9293c-0.0927-0.32036 0.77534-7.5943 1.0586-8.8712 ' +
      '0.08826-0.39779 0.35642-0.47204 1.7049-0.47204 1.9482 0 2.5191 0.26292 3.0606 1.4094 0.63404 1.3425 0.50098 4.5557-0.25107 6.0628-0.78882 1.5808-1.9337 ' +
      '2.2383-3.8976 2.2383-1.1363 0-1.5986-0.10133-1.6755-0.36722zm3.6439-2.0727c0.88404-0.92222 1.2423-3.6293 ' +
      '0.63307-4.783-0.23199-0.43924-0.5216-0.59949-1.0835-0.59949h-0.76684l-0.25536 2.2253c-0.14045 1.2239-0.30501 2.5591-0.3657 2.9671-0.10345 0.69546-0.06602 ' +
      '0.74177 0.59952 0.74177 0.40715 0 0.9354-0.23528 1.2388-0.55174zm3.0157 1.9004c0-0.37089 0.04617-0.52262 0.10259-0.33717 0.05642 0.18544 0.05642 0.48889 0 ' +
      '0.67434-0.05642 0.18544-0.10259 0.0337-0.10259-0.33717z" />' +
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

    function definitionButton() {
      const dbtn = new Button(definitionConfig.icon, function() {
        let firstWord = text.trim().toLowerCase().replace(/\s.*$/, '');
        popupwindow(definitionConfig.url + firstWord, 'Definition', 900, 540);
        return false;
      });
      return dbtn;
    }

    function IconStyle() {
      const style = document.createElement('style');
      style.innerHTML = `.selection__icon{fill:${iconcolor};}`;
      document.body.appendChild(style);
    }

    function appendIcons() {
      const myitems=[{feature:'twitter',call:twitterButton()},{feature:'facebook',call:facebookButton()},{feature:'search',call:searchButton()},{feature:'translate',call:translateButton()},
      {feature:'copy',call:copyButton()},{feature:'speak',call:speakButton()},{feature:'definition',call:definitionButton()}]
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
      menu.definition = options.definition === undefined ? menu.definition : options.definition;
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
