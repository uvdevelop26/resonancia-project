import { isRef } from "vue"
import moment from "moment-timezone";


const Utilities = {

    close: (message) => {

        if (isRef(message)) {
            message.value = ""
        } else {
            console.log("mensaje inválido")
        }
    },

    cleanForm: (form) => {
        if (isRef(form)) {
            for (let clave in form.value) {
                if (clave !== 'role_id') {
                    form.value[clave] = "";
                }
            }
        }
    },

    slugify: (name, lastname) => {
        const fullName = `${name} ${lastname}`;

        const slug = fullName
            .toString()
            .toLowerCase()
            .trim()
            .replace(/\s+/g, "-")
            .replace(/[^\w\-]+/g, "")
            .replace(/\-\-+/g, "-");

        return slug;
    },

    getFormattedDate: (date) => {
        const formattedDate = moment(date).format("YYYY-MM-DD");
        return formattedDate;
    }

}

export { Utilities }