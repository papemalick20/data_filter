/**
 * @property {HTMLElement} pagination
 * @property {HTMLElement} sorting
 * @property {HTMLFormElement} form
 * @property {HTMLElement} content
 */

export default class Filer {

    /**
     *@param {HTMLElement|null} element
     */
    constructor(element) {
        if (element === null) {
            return
        }
        this.pagination = element.querySelector('.js-filter-pagination')
        this.sorting = element.querySelector('.js-filter-sorting')
        this.form = element.querySelector('.js-filter-form')
        this.content = element.querySelector('.js-filter-content')
            //console.log('je me construis')
        this.bindEvents()
    }

    /**
     * ajouter les comportements aux différents elements
     */
    bindEvents() {
        this.sorting.addEventListener('click', e => {
            if (e.target.tagName === 'A') {
                e.preventDefault()
                this.loadUrl(e.target.getAttribute('href'))
            }


        })
        this.form.querySelectorAll('input').forEach(input => {
            input.addEventListener('change', e => {
                console.log('Change', this.loadForm.bind(this))
            })
        })


    }
    async loadForm() {
        const data = new FormData(this.form)
        const url = new URL(this.form.getAttribute('action') || window.location.href)
        const params = new URLSearchParams()
        data.forEach((value, key) => {
            params.append(key, value)

        })
        return this.loadUrl(url.pathname + '?' + params.toString())
    }


    async loadUrl() {
        const response = await fetch('url', {
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
        if (response.status >= 100 && response.status < 300) {
            const data = response.json()
            this.content.innerHTML = data.content
            this.sorting.innerHTML = data.sorting
            history.replaceState({}, '', url)
                //this.form.innerHTML = data.form
        } else {
            console.error(response)
        }
    }

}