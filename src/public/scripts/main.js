document.addEventListener('DOMContentLoaded', () => {
    console.log('Loaded!')

    const btn = document.getElementById('add');
    const steps = document.getElementById('steps');


    btn.addEventListener('click', () => {
        console.log('click');
        addStep();
    });

    function addStep() {
        let input = document.getElementById('step').value;
        console.log(input)
        let li = document.createElement('li');
        li.className = 'step';
        li.innerHTML = `${input} <input type="hidden" name="steps" value="${input}">`;
        steps.appendChild(li);
    };


});