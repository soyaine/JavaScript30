  var oNav = document.getElementById('main');
  var changePoint = oNav.offsetTop;
  var oLogo = document.getElementById('logo');

  function adjustNav(){
    if(window.scrollY >= changePoint){
        oNav.className = 'fixed-nav';
        oLogo.style['max-width'] = '200px';

    }else{
        oNav.className = '';
        oLogo.style['max-width'] = '0';
    }
  }
  //把调整函数绑定至页面滚动事件
  window.addEventListener('scroll',adjustNav);
