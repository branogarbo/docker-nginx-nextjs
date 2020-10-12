let qs = sel => document.querySelector(sel); 

qs('#nameInp').onkeypress =  event => (event.key == 'Enter' && qs('#nameInp').value != "" ? submit() : {});

qs('#nameInp').focus();

async function submit() {
  let options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: qs('#nameInp').value,
      time: new Date()
    })
  }
  
  await fetch('/db/all',options);
  
  qs('#label').style.animation = "fadein 0.4s ease-out 0.1s reverse both";
  qs('#nameInp').style.animation = "fadein 0.43s ease-out 0.1s reverse both";
  qs('#nameInp').blur();
  setTimeout(()=>{qs('#inpCont').style.display = "none"}, 600);
}