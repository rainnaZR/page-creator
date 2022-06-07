import { request } from "~/static/utils";

const onGetMenuInfoXhr = () => request.get('/menu')

export {
    onGetMenuInfoXhr
}
