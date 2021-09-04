import './styles/app.css';


import './bootstrap';
import noUiSlider from 'nouislider'
import Filter from './modules/Filter'

new Filter(document.getSelector('.js-filter'))

const slider = document.getElementById('price-slider');

if (slider) {
    const min = document.getElementById('min')
    const max = document.getElementById('max')
    const minvalue = Math.floor(parseInt(slider.dataset.min, 10) / 10) * 10
    const maxvalue = Math.ceil(parseInt(slider.dataset.max, 10) / 10) * 10
    const range = noUiSlider.create(slider, {
        start: [min.value || minvalue, max.value || maxvalue],
        connect: true,
        step: 10,
        range: {
            'min': minvalue,
            'max': maxvalue
        }
    });

    range.on('slide', function(values, handle) {
        if (handle === 0) {
            min.value = Math.round(values[0])
        }
        if (handle === 1) {
            max.value = Math.round(values[1])
        }
        //console.log(values, handle)
    })
    range.on('end', function(valuee, hanle) {
        min.dispatchEvent(new Event('change'))
    })
}