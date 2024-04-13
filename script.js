document.addEventListener('DOMContentLoaded', function() {
    const factorDescriptions = [
        "1. Suvokimas kaip aš kontaktuoju/bendrauju/susiduriu su kitais",
        "2. Supratimas, kad aš ne vienintelis turiu tokio pobūdžio problemų; 'Mes visi esame toje pačioje valtyje'",
      "3. Buvimas grupėje buvo, tam tikra prasme, kaip buvimas šeimoje, tik šį kartą, labiau priimančioje ir suprantančioje šeimoje",
      "4.	Suvokimas, kad aš kartais trikdau žmones, nesakydamas ką aš iš tiesų galvoju"
        // Įtraukite visus 60 faktorių aprašymus čia
    ];

    const categoryDescriptions = {
        1: 'Labiausiai man naudingi 2 faktoriai',
        2: 'Ypatingai naudingi 6 faktoriai',
        3: 'Labai naudingi 12 faktorių',
      4: 'Naudingi 20 faktorių'
        // Įtraukite visas kategorijas čia
    };

    const initialLimits = {1: 2, 2: 6, 3: 12, 4: 20, 5: 12, 6: 6, 7: 2};
    let currentLimits = {...initialLimits};
    const factorsContainer = document.querySelector('.factors');

    factorDescriptions.forEach((description, index) => {
        const div = document.createElement('div');
        const label = document.createElement('label');
        label.textContent = `${description}: `;
        const select = document.createElement('select');
        select.name = `factor${index + 1}`;
        select.options.add(new Option('Pasirinkite kategoriją', ''));
        Object.entries(categoryDescriptions).forEach(([key, value]) => {
            select.options.add(new Option(value, key));
        });
        select.addEventListener('change', function(event) {
            handleSelectionChange(this, currentLimits, initialLimits);
        });
        div.appendChild(label);
        div.appendChild(select);
        factorsContainer.appendChild(div);
    });
});

function handleSelectionChange(select, currentLimits, initialLimits) {
    const previousValue = select.dataset.previous || '';
    const selectedValue = select.value;

    if (previousValue) {
        currentLimits[previousValue]++;
    }
    if (selectedValue) {
        currentLimits[selectedValue]--;
    }

    if (currentLimits[selectedValue] < 0) {
        alert(`Viršijote maksimalų leistiną pasirinkimų skaičių kategorijai ${categoryDescriptions[selectedValue]}`);
        select.value = previousValue;
        currentLimits[selectedValue]++;
        if (previousValue) {
            currentLimits[previousValue]--;
        }
    } else {
        select.dataset.previous = selectedValue;
    }

    updateOptionsAvailability(currentLimits);
}

function updateOptionsAvailability(currentLimits) {
    document.querySelectorAll('select').forEach(select => {
        const selectedValue = select.value;
        Array.from(select.options).forEach(option => {
            if (option.value && option.value !== selectedValue) {
                option.disabled = currentLimits[option.value] <= 0;
            }
        });
    });
}

function submitForm() {
    alert('Forma pateikta!');
}