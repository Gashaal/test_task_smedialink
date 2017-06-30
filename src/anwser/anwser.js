(function() {
  'use strict';
  
  document.querySelector('.send').addEventListener('click', (e) => {
    e.preventDefault();
    let valid = true;
    
    const willCome = document.querySelector('input[name=willCome]:checked');
    if (willCome === null) {
      valid = false;
      document.querySelector('#questionWillCome .invalid').style.display = 'inline';
    } else {
      document.querySelector('#questionWillCome .invalid').style.display = 'none';
    }
    
    const drinks = document.querySelectorAll('input[name=drinks]:checked');
    
    
    if (drinks.length > 0 && willCome.value === 'false') {
      valid = false;
      document.querySelector('#questionDrinks .invalid').textContent = 'Вы не можете выбрать напитки, т.к не идете на вечеринку.';
      document.querySelector('#questionDrinks .invalid').style.display = 'inline';
    } else if (drinks.length === 0 && willCome.value === 'true') {
      valid = false;
      document.querySelector('#questionDrinks .invalid').textContent = 'Пожалуйста, ответьте на вопрос.';
      document.querySelector('#questionDrinks .invalid').style.display = 'inline';
    } else {
      document.querySelector('#questionDrinks .invalid').style.display = 'none';
    }
    
    
    
    if (valid) {
      let anwser = {};
      anwser.willCome = willCome.value === 'true' ? true : false;
      anwser.drinks = [];
      drinks.forEach(drink => {
        anwser.drinks.push(drink.id);
      });
      
      fetch('/anwser', {
        method: 'POST',
        credentials: 'include',
        headers: {
          "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"  
        },
        body: `anwser=${JSON.stringify(anwser)}`
      }).then(response => { window.location.reload(); })
    }
  });
})();
