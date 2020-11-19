import validate from 'validate.js';
import _, { map } from 'underscore';
export default function formsvalidate(fieldName, value) {
  validate.options = {fullMessages: false};
  validate.validators.presence.options = {message: 'не может быть пустым'};

  // Поля проверяем input name атрибут и required

  //Авторизация
  //USER_LOGIN
  //USER_PASSWORD ddff

  // регистрация
  //REGISTER[LOGIN]
  //REGISTER[EMAIL]
  //REGISTER[PASSWORD]
  //REGISTER[CONFIRM_PASSWORD]
  //iagree

  // забыл пароль
  //USER_EMAIL


  var avtoiz_data = {
    USER_LOGIN: {
      presence: true,
      length: {
        minimum: 4,
        message: 'Не меньше 4 символов в email'
      }
    },
    USER_PASSWORD: {
      // Password is also required
      presence: true,
      // And must be at least 5 characters long
      length: {
        minimum: 6,
        message: 'Минимум 6 символов'
      }
    },

  };
  var registration_data = {
    'REGISTER[LOGIN]': {
      presence: true,
      email: {
        message: 'Неправильный Email'
      },
      length: {
        minimum: 4,
        message: 'Не меньше 4 символов в email'
      }
    },
    'REGISTER[PASSWORD]': {
      // Password is also required
      presence: true,
      // And must be at least 5 characters long
      //format: {
      //   pattern: '(?=^.{6,}$)(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[^A-Za-z0-9]).*',
      //  message: 'Строка> 5 символов , содержит цифру и заглавную букву,строчную букву и символ, не являющийся буквенно-цифровым -.,</$%&*'
      //},
      length: {
        minimum: 6,
        message: 'Минимум 6 символов'
      }
    },
    'REGISTER[CONFIRM_PASSWORD]': {
      // You need to confirm your password
      presence: true,
      // and it needs to be equal to the other password
      equality: {
        attribute: 'REGISTER[PASSWORD]',
        message: '^Пароли не совпадают'
      }
    },
    iagree: {
      presence: {
        message: '^Нужно нажать'
      },
      inclusion: {
        within: [true],
        message: '^Нужно нажать'
      }
    },
  };
  var forgot_data = {
    USER_EMAIL:{
      presence: true,
      email: {
        message: 'Неправильный Email'
      },
      length: {
        minimum: 4,
        message: 'Не меньше 4 символов в email'
      }
    }
  };



  function validatorForms(selecror_form, form_data) {

    // Hook up the form so we can prevent it from being posted
    var form = document.querySelector(selecror_form);

    form.addEventListener('submit', function(ev) {
      ev.preventDefault();
      handleFormSubmit(form);
    });

    var inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
    for (var i = 0; i < inputs.length; ++i) {
      inputs.item(i).addEventListener('keyup', function(ev) {
        var errors = validate(form, form_data) || {};
        showErrorsForInput(this, errors[this.name]);
        //showErrors(form, errors || {});
      });
    }

    function handleFormSubmit(form, input) {
      var errors = validate(form, form_data);
      showErrors(form, errors || {});
      if (!errors) {
        showSuccess();
      } else {
        console.log(errors);
      }
    }
    function showErrors(form, errors) {
      _.each(form.querySelectorAll('input[name][required], select[name][required]'), function(input) {
        showErrorsForInput(input, errors && errors[input.name]);
        //console.log(errors)
      });
    }

    // Shows the errors for a specific input
    function showErrorsForInput(input, errors) {
      var formGroup = closestParent(input.parentNode, 'forms-group')
        , messages = formGroup.querySelector('.messages');
      resetFormGroup(formGroup);
      if (errors) {
        formGroup.classList.add('has-error');
        _.each(errors, function(error) {
          addError(messages, error);
        });
      } else {
        formGroup.classList.add('has-success');
      }
    }
    function closestParent(child, className) {
      if (!child || child === document) {
        return null;
      }
      if (child.classList.contains(className)) {
        return child;
      } else {
        return closestParent(child.parentNode, className);
      }
    }
    function resetFormGroup(formGroup) {
      // Remove the success and error classes
      formGroup.classList.remove('has-error');
      formGroup.classList.remove('has-success');
      // and remove any old messages
      _.each(formGroup.querySelectorAll('.help-block.error'), function(el) {
        el.parentNode.removeChild(el);
      });
    }

    // Adds the specified error with the following markup
    // <p class="help-block error">[message]</p>
    function addError(messages, error) {
      var block = document.createElement('p');
      block.classList.add('help-block');
      block.classList.add('error');
      block.innerText = error;
      messages.appendChild(block);
    }

    function showSuccess() {
      //console.log('успех!');
      //alert('Успешно');
      if(selecror_form === 'form#loginform') {
        // console.log(formData);
        // $.post('', $('#loginform').serialize(), function(response) {
        //   console.log('res : ' + response);
        //   if (response && response.STATUS) {  
        //     console.log('====== ');
        //     if (response.STATUS === 'OK') {
        //       console.log('Все ок, перегружаем страницу');
        //       window.location = window.location;
        //     } else {
        //       $('#loginform .forms-error').text(response.MESSAGES);
        //       console.log(response.MESSAGES);
        //     }
        //   }else {
        //     console.log('null response');
        //   }

        // }, 'json');


        console.log(' its form#loginform');
        let formData = $('#loginform').serialize();
        
        var request = $.ajax({
          url: '',
          method: 'POST',
          data: formData,
        });
              
        request.done(function( response, textStatus, errorThrown ) {
          console.log( typeof(response));
          //console.log( response );
          console.log( textStatus );
          console.log( errorThrown );
          if(response.STATUS === 'ERROR' ) {
            console.log( response.MESSAGES );
            $('#loginform .forms-error').text(response.MESSAGES);
          } else {
            console.log( 'status' + response.STATUS );
            console.log( 'вошел в систему' );
            window.location = window.location;
          }
          // if(response.STATUS === 'OK' ) {
          //   console.log( 'вошел в систему' );
          //   let htmls = document.querySelector('html');
          //   htmls.innerHTML = '';
          //   htmls.innerHTML = response;
          // }
        });
              
        request.fail(function( response, textStatus ) {
          alert( 'Request failed: ' + textStatus );
        });
      }
      if(selecror_form === 'form#regform') {
          
        let formData = $('form#regform').serialize();
              
        var request = $.ajax({
          url: '',
          method: 'POST',
          data: formData,
        });
                    
        request.done(function( response, textStatus, errorThrown ) {
          console.log( typeof(response));
          //console.log( response );
          console.log( textStatus );
          console.log( errorThrown );
          if (response && response.STATUS) {
            if (response.STATUS === 'OK') {
              $('#regform .forms-error').html(response.MESSAGES);
              $('.js_form-slider').html('<div class="ok-reg"><h3>Ваша регистрация успешно выполнена!</h3></div>');
              setTimeout(function() {
                window.location = window.location;
              }, 2000);
            } else {
              $('#regform .forms-error').html(response.MESSAGES);
            }
          }
          
        });
                    
        request.fail(function( response, textStatus ) {
          alert( 'Request failed: ' + textStatus );
        });
             
        // console.log('хотим зарегаться');
        // $.post('', $('#regform').serialize(), function(response) {
        //   console.log(response);
        //   if (response && response.STATUS) {
        //     if (response.STATUS === 'OK') {
        //       $('#regform .forms-error').html(response.MESSAGES);
        //       $('.js_form-slider').html('<div class="ok-reg"><h3>Ваша регистрация успешно выполнена!</h3></div>');
        //       setTimeout(function() {
        //         window.location = window.location;
        //       }, 2000);
        //     } else {
        //       $('#regform .forms-error').html(response.MESSAGES);
        //     }
        //   }

        // }, 'json');

        // return false;

        // alert(12);
      }
      if(selecror_form === 'form#fogetform') {
          
        let formData = $('form#fogetform').serialize();
              
        var request = $.ajax({
          url: '',
          method: 'POST',
          data: formData,
        });
                    
        request.done(function( response, textStatus, errorThrown ) {
          console.log( typeof(response));
          //console.log( response );
          console.log( textStatus );
          console.log( errorThrown );
          if (response && response.STATUS) {
            if (response.STATUS === 'OK') {
              $('#fogetform .alert-success').removeClass('hidden');
              $('#fogetform .alert-success').html(response.MESSAGES);
              //window.location = window.location;
            } else {
              $('#fogetform .forms-error').html(response.MESSAGES);
            }
          }
          
        });
                    
        request.fail(function( response, textStatus ) {
          alert( 'Request failed: ' + textStatus );
        });
             
        // console.log("aut submit")
        // $.post('', $("#fogetform").serialize(), function (response) {
        //     console.log(response);
        //     if (response && response.STATUS) {
        //         if (response.STATUS == 'OK') {
        //             $('#fogetform .alert-success').removeClass('hidden');
        //             $('#fogetform .alert-success').html(response.MESSAGES);
        //             window.location = window.location;
        //         } else {
        //             $('#fogetform .forms-error').html(response.MESSAGES)
        //         }
        //     }

        // }, 'json');


      }
    }
  };
  validatorForms('form#loginform', avtoiz_data);
  validatorForms('form#regform', registration_data);
  validatorForms('form#fogetform', forgot_data);

}
