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
      thesaurus: true,
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

    const thesaurusConfig = {
      url: 'https://www.thesaurus.com/browse/', 
      icon:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22" enable-background="new 0 0 24 24" width="24" height="24" class="selection__icon">'+
        '<path d="m16.68 24.604c-1.6277-0.2386-3.4716-1.1999-4.718-2.4596-0.92681-0.93675-1.5257-1.8075-2.041-2.9672-0.15998-0.36011-0.31788-0.67591-0.35088-0.70178-0.033-0.0259-0.1545-0.0329-0.26999-0.0156s-0.84448 '+
        '0.0749-1.62 0.12812c-0.77548 0.0532-2.2064 0.15611-3.1799 0.22868-0.97348 0.0726-2.2493 0.16512-2.8352 0.20567l-1.0653 '+
        '0.0737-0.23971-0.17311c-0.24845-0.17943-0.27114-0.24964-0.24578-0.76053 0.00626-0.12604 0.040146-0.2922 0.075312-0.36925 0.13713-0.30044 '+
        '0.060849-0.29036 4.6406-0.61314 1.023-0.0721 2.3961-0.16629 3.0514-0.20931 0.83731-0.055 1.1999-0.10236 1.22-0.15947 '+
        '0.01571-0.0447-0.0074-0.44329-0.05144-0.88578l-0.08001-0.80452-0.41999-0.10957c-0.231-0.0603-0.74398-0.19907-1.14-0.30845-0.82294-0.22732-3.231-0.87031-3.9899-1.0654-0.28049-0.0721-0.71248-0.18852-0.95998-0.25872-0.24749-0.0702-0.85498-0.23422-1.35-0.36449-0.49499-0.13027-0.94723-0.26375-1.005-0.29664-0.091095-0.0519-0.105-0.16351-0.105-0.84317 '+
        '0-0.76944 0.00241-0.78339 0.13539-0.78339 0.074467 0 0.7832 0.17481 1.575 0.38847 2.3501 0.63419 4.567 1.2268 5.3995 1.4434 0.42899 0.11162 0.98851 0.26072 1.2434 '+
        '0.33132 0.65175 0.18054 0.7658 0.17288 0.76968-0.0517 0.0017-0.099 0.06394-0.43806 0.13829-0.7534 0.07435-0.31534 0.1202-0.5971 '+
        '0.10189-0.62613-0.03442-0.0546-0.594-0.38019-3.0032-1.7475-4.1656-2.3641-4.5971-2.6108-5.8049-3.3191l-0.55499-0.32545v-0.87825c0-0.68202 0.017625-0.87826 '+
        '0.078882-0.87826 0.043385 0 0.40113 0.18684 0.79498 0.41519 0.39385 0.22835 1.9851 1.1386 3.536 2.0227 1.551 0.88416 3.0899 1.7623 3.4199 1.9514 1.4251 '+
        '0.81672 2.1045 1.1755 2.1721 1.1472 0.03982-0.0167 0.13134-0.15698 0.20336-0.31178 0.07203-0.1548 0.18124-0.35172 0.2427-0.43761 0.16743-0.23395 '+
        '0.13778-0.3606-0.14157-0.60465-0.13933-0.12172-0.44307-0.39917-0.67498-0.61655-0.23191-0.21738-0.67815-0.62122-0.99164-0.89743-0.75275-0.66323-1.0968-0.97537-1.5235-1.3821-0.19446-0.18537-0.41045-0.38001-0.47999-0.43254-0.14678-0.11089-0.96865-0.86474-1.1493-1.0542-0.06757-0.0709-0.20598-0.19475-0.30756-0.27529-0.10159-0.0805-0.50281-0.44108-0.89159-0.80119s-0.85342-0.78236-1.0325-0.93834c-0.3695-0.32181-0.52349-0.63913-0.46094-0.94988 0.064963-0.32277 0.19442-0.48614 '+
        '0.47929-0.60486 0.41351-0.17234 0.36376-0.20645 2.3945 1.6419 1.2956 1.1792 1.8358 1.6731 2.6116 2.3879 0.34649 0.31924 1.2217 1.1172 1.9449 1.7733 1.2136 1.1009 1.3246 1.1863 1.44 1.1077 0.17316-0.11791 0.99501-0.93479 0.99501-0.98899 '+
        '0-0.0426-0.60566-1.0637-1.0912-1.8397-1.0065-1.6086-1.8634-3.0689-1.9185-3.2691-0.13272-0.48244 0.14361-0.93733 0.60981-1.0038 0.41334-0.059 0.57649 0.0927 1.1765 '+
        '1.0934 2.1963 3.663 2.4897 4.1421 2.5511 4.1666 0.03123 0.0125 0.14352-0.0208 0.24951-0.0739 1.4515-0.72688 3.2238-1.0347 4.8265-0.83835 1.4774 0.18102 3.383 1.0116 4.426 1.9291 0.54837 0.4824 0.50999 0.36128 0.50999 1.6094 0 '+
        '0.61369-0.02025 1.1157-0.045 1.1156-0.02475-1.3e-4 -0.31593-0.28957-0.64708-0.6432-1.408-1.5037-3.0072-2.2677-4.9178-2.3495-2.2278-0.0954-4.1991 0.78108-5.7473 2.5555-0.98736 1.1316-1.6874 2.6383-1.9306 4.155-0.11512 0.71819-0.11828 2.109-0.0064 2.8029 0.55214 '+
        '3.4237 3.0066 6.1007 6.1228 6.6779 0.84733 0.15696 2.1708 0.0999 3.0015-0.12942 1.3795-0.38083 2.4089-1.017 3.4763-2.1482 0.332-0.35186 0.62388-0.64007 0.64863-0.64047 0.02475-3.9e-4 0.045 0.50492 0.045 '+
        '1.1229v1.1236l-0.225 0.22224c-0.58559 0.57844-1.7936 1.3234-2.7237 1.6797-1.3774 0.52759-2.8493 0.68219-4.3711 0.45912zm-0.86104-3.3759c-0.09482-0.0579-0.10398-0.12029-0.06893-0.46956 0.02223-0.22153 0.07765-0.59429 '+
        '0.12315-0.82837 0.0455-0.23407 0.20723-1.1916 0.35939-2.1279 0.15216-0.93628 0.35444-2.1738 0.44952-2.7499 0.09508-0.57618 0.20343-1.2538 0.24077-1.5059 0.03734-0.25207 0.09247-0.59972 0.12251-0.77254 0.10842-0.62384 '+
        '0.19017-0.57574-0.96278-0.56656-0.55957 4e-3 -1.0456-0.0109-1.08-0.0341s-0.06258-0.13283-0.06258-0.24358c0-0.43191 0.26703-1.9275 0.3678-2.06 0.1022-0.13438 6.9055-0.12973 7.0079 5e-3 0.05507 0.0724 0.02369 0.30158-0.14318 '+
        '1.0458-0.22816 1.0175-0.31321 1.2805-0.41726 1.29-0.03595 3e-3 -0.45734 1e-3 -0.93643-5e-3 -1.2318-0.0156-1.1508-0.0624-1.279 0.73909-0.05872 0.36722-0.13236 0.81498-0.16365 0.99504-0.03129 0.18005-0.17922 1.0934-0.32875 '+
        '2.0297-0.27048 1.6936-0.54526 3.3936-0.73025 4.5177-0.05334 0.3241-0.13494 0.63811-0.18135 0.69779-0.07263 0.0934-0.23216 0.10865-1.1459 0.10945-0.61177 5.3e-4 -1.1079-0.0274-1.1709-0.0658z" />'+
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

    function thesaurusButton() {
      const tbtn = new Button(thesaurusConfig.icon, function() {
        popupwindow(thesaurusConfig.url + encodeURIComponent(text), 'Thesaurus', 900, 540);
        return false;
      });
      return tbtn;
    }

    function IconStyle() {
      const style = document.createElement('style');
      style.innerHTML = `.selection__icon{fill:${iconcolor};}`;
      document.body.appendChild(style);
    }

    function appendIcons() {
      const myitems=[{feature:'twitter',call:twitterButton()},{feature:'facebook',call:facebookButton()},{feature:'search',call:searchButton()},{feature:'translate',call:translateButton()},
      {feature:'copy',call:copyButton()},{feature:'speak',call:speakButton()},{feature:'thesaurus',call:thesaurusButton()}]
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
      menu.thesaurus = options.thesaurus === undefined ? menu.thesaurus : options.thesaurus;
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
