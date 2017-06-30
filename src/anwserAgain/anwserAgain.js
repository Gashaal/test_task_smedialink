(function() {
  'use strict';
  
  document.querySelector('#anwser').addEventListener('click', (e) => {
    fetch('/anwser', {
      method: 'DELETE',
      credentials: 'include'
    }).then(response => { window.location.reload(); });
  });
})();
