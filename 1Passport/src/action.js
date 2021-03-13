(function(){
  function $(id){
    return document.getElementById(id);
  }
  var type = $('type');
  var length = $('length');
  var hmac = $('hmac');
  var content = $('content');
  function getLen(){
    return Math.max(parseInt(length.value) || 14, 4);
  }
  window.gen = function(){
    var t = type.value;
    if(typeof Hashes[t] === 'function'){
      var encrpty = new Hashes[t];
      var str = (content.value || '').trim().toLowerCase();
      if(str){
        var value = getLen();
        var key = (hmac.value || '').trim();
        if(key){
          var pwd = encrpty.b64_hmac(key, str);
          $('result').innerHTML = pwd.replace(/\W/g, '').substring(0, value);
          localStorage.setItem('_1pwd_type_', t);
          localStorage.setItem('_1pwd_leng_', value);
        } else {
          alert('缺少哈希盐值！');
          hmac.focus();
          hmac.select();
        }
      } else {
        alert('缺少原始密码！');
        content.focus();
        content.select();
      }
    } else {
      alert('非法内容格式！');
    }
  };
  window.range = function(){
    $('length-show').innerHTML = getLen();
  }
  try {
    var lastType = localStorage.getItem('_1pwd_type_');
    if(lastType){
      var options = document.getElementsByTagName('option');
      for(var i = 0, len = options.length; i < len; i++){
        var opt = options[i];
        if(opt.value === lastType){
          opt.setAttribute('selected', 'selected');
        }
      }
    }
    var lastLength = localStorage.getItem('_1pwd_leng_');
    if(lastLength){
      length.value = lastLength;
      range();
    }
  } catch(e) {}
})();