import { isRef } from "vue"
import moment from "moment-timezone";
import { Constants } from "./Contants";

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
                if (Array.isArray(form.value[clave])) {
                    form.value[clave] = [];
                } else {
                    form.value[clave] = "";
                }
            }
        } else {
            console.error("Error al limpiar el formulario");
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
    },

    absolutePath: (path) => {
        return `${Constants.serverPath + path}`
    },

    shortingString: (textstring) => {
        let substring;

        if (textstring.length > 30) {
            substring = textstring.substring(0, 30);

            return `${substring} ...ver más`;
        } else {
            substring = textstring;

            return substring;
        }


    }

}

export { Utilities }